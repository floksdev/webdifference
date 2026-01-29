"use client";

import {
  getAdminEmail,
  isAdminAuthenticated,
  logoutAdmin,
  onAuthStateChange,
} from "@/lib/admin-auth";
import { useRouter } from "next/navigation";
import { NewsletterListSection } from "./components/newsletter-list-section";
import { ClientsListSection } from "./components/clients-list-section";
import { AddressAutocomplete } from "./components/address-autocomplete";
import {
  Document,
  Image as PdfImage,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { useEffect, useMemo, useRef, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSendingSignature, setIsSendingSignature] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteForm>(createQuoteState());
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "overview" | "overview-tristan" | "overview-frederic" | "quotes" | "newsletter" | "clients"
  >("overview");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteClients, setQuoteClients] = useState<ClientOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState("new");
  const [paymentPresetKey, setPaymentPresetKey] = useState<PaymentPresetId>("acompte_30");
  const [paymentCustomDepositAmount, setPaymentCustomDepositAmount] = useState<number>(0);
  const [paymentSchedule3, setPaymentSchedule3] = useState<{ amount: string; date: string }[]>([
    { amount: "", date: "" },
    { amount: "", date: "" },
    { amount: "", date: "" },
  ]);
  const [paymentScheduleN, setPaymentScheduleN] = useState<{ amount: string; date: string }[]>([
    { amount: "", date: "" },
    { amount: "", date: "" },
  ]);
  const [quoteType, setQuoteType] = useState<"maintenance" | "classic">("classic");
  const [showQuoteTypeModal, setShowQuoteTypeModal] = useState(false);
  const [maintenanceDurationMonths, setMaintenanceDurationMonths] = useState(12);
  const [maintenanceDayOfMonth, setMaintenanceDayOfMonth] = useState(5);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState<string | null>(null);
  const [overviewClients, setOverviewClients] = useState<OverviewClient[]>([]);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [commissionPayments, setCommissionPayments] = useState<CommissionPayment[]>([]);
  const [commissionLoading, setCommissionLoading] = useState(false);
  const [commissionError, setCommissionError] = useState<string | null>(null);
  const quoteNumber = useMemo(
    () => `WD-D-${new Date().getFullYear()}-${String(quoteIndex).padStart(3, "0")}`,
    [quoteIndex]
  );

  // --- Auth Admin ---
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    setAdminEmail(getAdminEmail());
    setIsLoading(false);

    const unsubscribe = onAuthStateChange((authenticated) => {
      setIsAuthenticated(authenticated);
      setAdminEmail(getAdminEmail());
      if (!authenticated) {
        router.push("/");
      }
    });

    return unsubscribe;
  }, [router]);

  // --- Logo ---
  useEffect(() => {
    fetch("/assets/main/fond-vert/logo-full.png")
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoDataUrl(reader.result as string);
        reader.readAsDataURL(blob);
      });
  }, []);

  useEffect(() => {
    setQuote((prev) => {
      const needsIds = prev.items.some((item) => !item.id);
      if (!needsIds) return prev;
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id
            ? item
            : createQuoteItem({
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
              })
        ),
      };
    });
  }, []);

  useEffect(() => {
    if (activeSection !== "quotes") return;
    fetchQuoteClients();

    // Récupère le prochain numéro de devis disponible côté serveur
    (async () => {
      try {
        const res = await fetch("/api/admin/quotes/next-number");
        if (!res.ok) return;
        const data = (await res.json()) as { nextIndex?: number };
        if (typeof data.nextIndex === "number" && data.nextIndex > 0) {
          setQuoteIndex(data.nextIndex);
        }
      } catch {
        // En cas d'erreur, on laisse quoteIndex tel quel (fallback local)
      }
    })();
  }, [activeSection]);

  useEffect(() => {
    if (!activeSection.startsWith("overview")) return;
    fetchOverviewClients();
  }, [activeSection]);

  useEffect(() => {
    if (activeSection !== "overview-frederic") return;
    fetchCommissionPayments();
  }, [activeSection]);

  

  const subtotal = useMemo(
    () => quote.items.reduce((a, i) => a + i.quantity * i.unitPrice, 0),
    [quote.items]
  );

  // Synchroniser le texte des conditions de paiement avec le preset et le sous-total
  useEffect(() => {
    if (activeSection !== "quotes") return;
    if (paymentPresetKey === "custom") return;
    const text = buildPaymentTermsFromPreset(paymentPresetKey, subtotal, {
      customDepositAmount: paymentCustomDepositAmount,
      schedule3: paymentSchedule3,
      scheduleN: paymentScheduleN,
      maintenanceDurationMonths: maintenanceDurationMonths,
      maintenanceDayOfMonth: maintenanceDayOfMonth,
    });
    setQuote((p) => (p.paymentTerms === text ? p : { ...p, paymentTerms: text }));
  }, [
    activeSection,
    paymentPresetKey,
    subtotal,
    paymentCustomDepositAmount,
    paymentSchedule3,
    paymentScheduleN,
    maintenanceDurationMonths,
    maintenanceDayOfMonth,
  ]);

  const overviewStats = useMemo(() => {
    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    const withinDays = (date: string, days: number) =>
      now.getTime() - new Date(date).getTime() <= days * dayMs;

    const totals = overviewClients.reduce(
      (acc, client) => {
        const revenue = client.totalRevenue ?? 0;
        acc.total += revenue;
        if (withinDays(client.createdAt, 365)) acc.year += revenue;
        if (withinDays(client.createdAt, 30)) acc.month += revenue;
        if (withinDays(client.createdAt, 7)) acc.week += revenue;
        if (withinDays(client.createdAt, 30)) acc.newClientsMonth += 1;
        acc.status[client.status] += 1;
        acc.payment[client.paymentStatus] += 1;
        const repKey = client.salesRep ?? "NONE";
        acc.salesRep[repKey] = (acc.salesRep[repKey] ?? 0) + 1;
        return acc;
      },
      {
        total: 0,
        year: 0,
        month: 0,
        week: 0,
        newClientsMonth: 0,
        status: { TODO: 0, IN_PROGRESS: 0, DONE: 0 },
        payment: { PENDING: 0, DEPOSIT_PAID: 0, PAID: 0 },
        salesRep: {} as Record<string, number>,
      }
    );

    const totalClients = overviewClients.length;
    const completionRate = totalClients
      ? Math.round((totals.status.DONE / totalClients) * 100)
      : 0;

    return {
      totalClients,
      completionRate,
      totals,
    };
  }, [overviewClients]);

  const buildOverviewStats = useMemo(() => {
    return (
      salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE" | null,
      revenueMultiplier = 1
    ) => {
      const now = new Date();
      const dayMs = 24 * 60 * 60 * 1000;
      const withinDays = (date: string, days: number) =>
        now.getTime() - new Date(date).getTime() <= days * dayMs;

      const scopedClients = overviewClients.filter(
        (client) => client.salesRep === salesRep
      );

      const totals = scopedClients.reduce(
        (acc, client) => {
          const revenue = (client.totalRevenue ?? 0) * revenueMultiplier;
          acc.total += revenue;
          if (withinDays(client.createdAt, 365)) acc.year += revenue;
          if (withinDays(client.createdAt, 30)) acc.month += revenue;
          if (withinDays(client.createdAt, 7)) acc.week += revenue;
          if (withinDays(client.createdAt, 30)) acc.newClientsMonth += 1;
          acc.status[client.status] += 1;
          acc.payment[client.paymentStatus] += 1;
          const repKey = client.salesRep ?? "NONE";
          acc.salesRep[repKey] = (acc.salesRep[repKey] ?? 0) + 1;
          return acc;
        },
        {
          total: 0,
          year: 0,
          month: 0,
          week: 0,
          newClientsMonth: 0,
          status: { TODO: 0, IN_PROGRESS: 0, DONE: 0 },
          payment: { PENDING: 0, DEPOSIT_PAID: 0, PAID: 0 },
          salesRep: {} as Record<string, number>,
        }
      );

      const totalClients = scopedClients.length;
      const completionRate = totalClients
        ? Math.round((totals.status.DONE / totalClients) * 100)
        : 0;

      return {
        totalClients,
        completionRate,
        totals,
      };
    };
  }, [overviewClients]);

  const fredMonthly = useMemo(() => {
    const monthlyTotals = groupRevenueByMonth(overviewClients, "FREDERIC_WEHRLE", 0.3);
    const paidMap = commissionPayments.reduce<Record<string, CommissionPayment>>((acc, item) => {
      acc[item.month] = item;
      return acc;
    }, {});

    return monthlyTotals.map((entry) => ({
      ...entry,
      isPaid: paidMap[entry.month]?.isPaid ?? false,
      storedAmount: paidMap[entry.month]?.amount ?? entry.amount,
    }));
  }, [commissionPayments, overviewClients]);

  const updateItem = (index: number, changes: Partial<QuoteItem>) => {
    setQuote((prev) => {
      const items = prev.items.map((item, i) =>
        i === index ? { ...item, ...changes } : item
      );
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setQuote((prev) => ({
      ...prev,
      items: [...prev.items, createQuoteItem()],
    }));
  };

  const removeItem = (index: number) => {
    setQuote((prev) => {
      if (prev.items.length === 1) return prev;
      return { ...prev, items: prev.items.filter((_, i) => i !== index) };
    });
  };

  const startNewQuote = (type: "maintenance" | "classic" = "classic") => {
    setQuoteType(type);
    const initial = createQuoteState(type);
    setQuote(initial);
    if (type === "maintenance") {
      setPaymentPresetKey("maintenance");
      setMaintenanceDurationMonths(12);
      setMaintenanceDayOfMonth(5);
      const initialSubtotal = initial.items.reduce((a, i) => a + i.quantity * i.unitPrice, 0);
      const initialTerms = buildPaymentTermsFromPreset("maintenance", initialSubtotal, {
        maintenanceDurationMonths: 12,
        maintenanceDayOfMonth: 5,
      });
      setQuote((q) => ({ ...initial, paymentTerms: initialTerms }));
    } else {
      setPaymentPresetKey("acompte_30");
      setPaymentCustomDepositAmount(0);
      setPaymentSchedule3([
        { amount: "", date: "" },
        { amount: "", date: "" },
        { amount: "", date: "" },
      ]);
      setPaymentScheduleN([
        { amount: "", date: "" },
        { amount: "", date: "" },
      ]);
      const initialSubtotal = initial.items.reduce((a, i) => a + i.quantity * i.unitPrice, 0);
      const initialTerms = buildPaymentTermsFromPreset("acompte_30", initialSubtotal, {});
      setQuote((q) => ({ ...initial, paymentTerms: initialTerms }));
    }
    setIsCreatingQuote(true);
    setSelectedClientId("new");
    setQuoteError(null);
    setQuoteSuccess(null);
  };

  const cancelQuoteCreation = () => {
    setIsCreatingQuote(false);
    setQuoteError(null);
    setQuoteSuccess(null);
  };

  // --- Génération du PDF ---
  async function generateQuotePdf() {
    if (!quote.clientName || !quote.clientEmail) {
      setQuoteError(
        "Complétez les informations essentielles avant de générer le devis."
      );
      return;
    }

    setIsExporting(true);
    setQuoteError(null);
    setQuoteSuccess(null);

    try {
      if (!previewRef.current) {
        setQuoteError("Impossible de trouver l’aperçu du devis.");
        return;
      }

      let targetClientId = selectedClientId;
      if (selectedClientId === "new") {
        targetClientId = await createClientFromQuote();
        await fetchQuoteClients();
      }

      const filename = `${quoteNumber}.pdf`;

      const blob = await pdf(
        <QuotePdfDocument
          quote={quote}
          subtotal={subtotal}
          quoteNumber={quoteNumber}
          logoDataUrl={logoDataUrl}
          quoteType={quoteType}
          maintenanceDurationMonths={maintenanceDurationMonths}
          maintenanceDayOfMonth={maintenanceDayOfMonth}
        />
      ).toBlob();

      if (targetClientId) {
        try {
          const fileUrl = await uploadQuoteAsDocument(targetClientId, blob, filename);
          try {
            await createClientQuoteRecord(targetClientId, fileUrl);
          } catch (recordError) {
            // L’enregistrement “quote record” (métadonnées) peut échouer si la route n’existe pas encore.
            // Le document est déjà en base et visible côté client, on ne bloque pas l’utilisateur.
            console.warn("Enregistrement des métadonnées devis (optionnel):", recordError);
          }
        } catch (uploadError) {
          console.error(uploadError);
          setQuoteError("Le devis a été généré mais l'upload a échoué.");
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      setQuoteIndex((prev) => prev + 1);
      setQuoteSuccess("Le devis a été généré et enregistré avec succès.");
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message) {
        // Affiche le message précis (ex : "Un client avec cet email existe déjà")
        setQuoteError(err.message);
      } else {
        setQuoteError("Erreur lors de la génération du PDF.");
      }
    } finally {
      setIsExporting(false);
    }
  }

  /** Envoie le devis à Yousign pour signature : génère le PDF puis crée une signature request envoyée au client par email. */
  async function sendQuoteForSignature() {
    if (!quote.clientName || !quote.clientEmail) {
      setQuoteError("Complétez le nom et l’email du client avant d’envoyer pour signature.");
      return;
    }

    setIsSendingSignature(true);
    setQuoteError(null);
    setQuoteSuccess(null);

    try {
      const filename = `${quoteNumber}.pdf`;
      const blob = await pdf(
        <QuotePdfDocument
          quote={quote}
          subtotal={subtotal}
          quoteNumber={quoteNumber}
          logoDataUrl={logoDataUrl}
          quoteType={quoteType}
          maintenanceDurationMonths={maintenanceDurationMonths}
          maintenanceDayOfMonth={maintenanceDayOfMonth}
        />
      ).toBlob();

      const formData = new FormData();
      formData.append("pdf", new File([blob], filename, { type: "application/pdf" }));
      formData.append("clientName", quote.clientName);
      formData.append("clientEmail", quote.clientEmail);
      formData.append("quoteNumber", quoteNumber);

      const res = await fetch("/api/admin/yousign/send-quote", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { error?: string; message?: string; success?: boolean };

      if (!res.ok) {
        setQuoteError(data.error || "Erreur lors de l’envoi pour signature.");
        return;
      }

      setQuoteSuccess(data.message || "Demande de signature envoyée au client par email.");
    } catch (err) {
      console.error(err);
      setQuoteError("Erreur lors de l’envoi pour signature.");
    } finally {
      setIsSendingSignature(false);
    }
  }

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    if (clientId === "new") {
      setQuote((prev) => ({
        ...prev,
        clientName: "",
        clientCompany: "",
        clientAddress: "",
        clientPostalCode: "",
        clientCity: "",
        clientCountry: "France",
        clientPhone: "",
        clientPhoneCountryCode: "+33",
        clientEmail: "",
      }));
      return;
    }

    const selected = quoteClients.find((client) => client.id === clientId);
    if (!selected) return;

    const addressLine = [selected.address, selected.postalCode, selected.city, selected.country]
      .filter(Boolean)
      .join(" ");

    const { countryCode, phoneNumber } = parsePhone(selected.phone);

    setQuote((prev) => ({
      ...prev,
      clientName: `${selected.firstName} ${selected.lastName}`.trim(),
      clientCompany: selected.company ?? "",
      clientAddress: addressLine,
      clientPostalCode: selected.postalCode ?? "",
      clientCity: selected.city ?? "",
      clientCountry: selected.country ?? "France",
      clientPhoneCountryCode: countryCode,
      clientPhone: phoneNumber,
      clientEmail: selected.email ?? "",
    }));
  };

  async function fetchQuoteClients() {
    try {
      setClientsLoading(true);
      setClientsError(null);
      const response = await fetch("/api/admin/clients", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des clients");
      }
      const data = await response.json();
      setQuoteClients(data);
    } catch (error) {
      console.error(error);
      setClientsError("Impossible de charger les clients");
    } finally {
      setClientsLoading(false);
    }
  }

  async function fetchOverviewClients() {
    try {
      setOverviewLoading(true);
      setOverviewError(null);
      const response = await fetch("/api/admin/clients", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des clients");
      }
      const data = await response.json();
      setOverviewClients(data);
    } catch (error) {
      console.error(error);
      setOverviewError("Impossible de charger les données");
    } finally {
      setOverviewLoading(false);
    }
  }

  async function fetchCommissionPayments() {
    try {
      setCommissionLoading(true);
      setCommissionError(null);
      const response = await fetch("/api/admin/commissions", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des commissions");
      }
      const data = await response.json();
      setCommissionPayments(data);
    } catch (error) {
      console.error(error);
      setCommissionError("Impossible de charger les commissions");
    } finally {
      setCommissionLoading(false);
    }
  }

  async function toggleCommissionPaid(month: string, amount: number, isPaid: boolean) {
    try {
      const response = await fetch("/api/admin/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salesRep: "FREDERIC_WEHRLE",
          month,
          amount,
          isPaid,
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la commission");
      }
      await fetchCommissionPayments();
    } catch (error) {
      console.error(error);
      setCommissionError("Impossible de mettre à jour la commission");
    }
  }

  async function createClientFromQuote(): Promise<string> {
    const trimmedName = quote.clientName.trim();
    const parts = trimmedName.split(/\s+/).filter(Boolean);
    const firstName = parts[0] || "Client";
    const lastName = parts.slice(1).join(" ") || "Inconnu";

    const response = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email: quote.clientEmail.trim(),
        company: quote.clientCompany || null,
        phone: quote.clientPhone
          ? `${quote.clientPhoneCountryCode} ${quote.clientPhone}`.trim()
          : null,
        address: quote.clientAddress || null,
        postalCode: quote.clientPostalCode || null,
        city: quote.clientCity || null,
        country: quote.clientCountry || null,
        createdAt: new Date(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Erreur lors de la création du client");
    }

    const created = await response.json();
    return created.id;
  }

  async function uploadQuoteAsDocument(
    clientId: string,
    blob: Blob,
    filename: string
  ): Promise<string> {
    const file = new File([blob], filename, { type: "application/pdf" });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("clientId", clientId);

    const uploadResponse = await fetch("/api/admin/clients/documents/upload", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      throw new Error(errorData.error || "Erreur lors de l'upload du devis");
    }

    const { fileUrl } = await uploadResponse.json();
    if (!fileUrl) {
      throw new Error("Impossible d'obtenir l'URL du devis");
    }

    const documentResponse = await fetch("/api/admin/clients/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        fileName: filename,
        fileUrl,
        fileType: "application/pdf",
        fileSize: file.size,
        documentType: "QUOTE",
      }),
    });

    if (!documentResponse.ok) {
      throw new Error("Erreur lors de l'enregistrement du devis");
    }

    return fileUrl;
  }

  async function createClientQuoteRecord(clientId: string, fileUrl: string) {
    const response = await fetch(`/api/admin/clients/${clientId}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: quoteNumber,
        total: Math.round(subtotal),
        status: "SENT",
        pdfUrl: fileUrl,
        items: quote.items,
        terms: quote.paymentTerms,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Erreur lors de l'enregistrement du devis");
    }
  }

  // --- UI principale ---
  if (isLoading)
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        Chargement du portail sécurisé…
      </main>
    );

  if (!isAuthenticated)
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p>Accès refusé. Connectez-vous depuis le chatbot.</p>
      </main>
    );

  return (
    <main className="flex min-h-screen text-white">
      {/* Sidebar fixe à gauche */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r border-white/10 bg-[color:var(--color-background-strong)] px-6 pt-6 pb-6 flex flex-col z-40">
        <div className="mb-6">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5">
            <span className="text-xs font-medium text-white/80">Admin</span>
            <button
              onClick={() => {
                logoutAdmin();
                router.push("/");
              }}
              className="text-xs font-medium text-white/60 hover:text-white/80 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => {
              setActiveSection("overview");
              setIsCreatingQuote(false);
            }}
            className={`w-full rounded-xl border p-4 text-left transition ${
              activeSection === "overview"
                ? "border-[#71DDAE]/40 bg-[#71DDAE]/10"
                : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-bold text-white mb-1">Vue d'ensemble</div>
            <div className="text-xs text-white/60">Performance & suivi</div>
          </button>
          <button
            onClick={() => {
              setActiveSection("quotes");
              setShowQuoteTypeModal(true);
            }}
            className={`w-full rounded-xl border p-4 text-left transition ${
              activeSection === "quotes" && isCreatingQuote
                ? "border-[#71DDAE]/40 bg-[#71DDAE]/10"
                : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-bold text-white mb-1">Nouveau devis</div>
            <div className="text-xs text-white/60">Créer un nouveau devis PDF</div>
          </button>

          <button
            onClick={() => {
              setActiveSection("clients");
              setIsCreatingQuote(false);
            }}
            className={`w-full rounded-xl border p-4 text-left transition ${
              activeSection === "clients"
                ? "border-[#71DDAE]/40 bg-[#71DDAE]/10"
                : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-bold text-white mb-1">Clients</div>
            <div className="text-xs text-white/60">Gérer tous les clients</div>
          </button>

          <button
            onClick={() => {
              setActiveSection("newsletter");
              setIsCreatingQuote(false);
            }}
            className={`w-full rounded-xl border p-4 text-left transition ${
              activeSection === "newsletter"
                ? "border-[#71DDAE]/40 bg-[#71DDAE]/10"
                : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-bold text-white mb-1">Newsletter list</div>
            <div className="text-xs text-white/60">Voir tous les emails inscrits</div>
          </button>

          <div className="pt-4">
            <div className="mb-3 border-t border-white/10" />
            <div className="mb-2 text-[10px] uppercase tracking-widest text-white/40">
              Suivi perso
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveSection("overview-tristan");
                  setIsCreatingQuote(false);
                }}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  activeSection === "overview-tristan"
                    ? "border-[#71DDAE]/40 bg-[#71DDAE]/10"
                    : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                <div className="text-lg font-bold text-white mb-1">Tristan</div>
                <div className="text-xs text-white/60">Performance Tristan</div>
              </button>
              <button
                onClick={() => {
                  setActiveSection("overview-frederic");
                  setIsCreatingQuote(false);
                }}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  activeSection === "overview-frederic"
                    ? "border-[#71DDAE]/40 bg-[#71DDAE]/10"
                    : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                <div className="text-lg font-bold text-white mb-1">Frédéric</div>
                <div className="text-xs text-white/60">Performance Frédéric</div>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Contenu principal à droite */}
      <div className="ml-64 flex-1 px-6 py-6 mt-20">
        {activeSection === "overview" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Vue d'ensemble</h1>
                <p className="text-sm text-white/60">
                  Tu avances. Voici une vision claire de ta progression.
                </p>
              </div>
            </div>

            {overviewLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-white/60">Chargement des indicateurs…</p>
              </div>
            ) : overviewError ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                {overviewError}
              </div>
            ) : (
              <OverviewPanel stats={overviewStats} />
            )}
          </section>
        )}

        {activeSection === "overview-tristan" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Tristan</h1>
                <p className="text-sm text-white/60">Tous les gains sur ses clients.</p>
              </div>
            </div>

            {overviewLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-white/60">Chargement des indicateurs…</p>
              </div>
            ) : overviewError ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                {overviewError}
              </div>
            ) : (
              <PersonalOverviewPanel
                stats={buildOverviewStats("TRISTAN_WEHRLE", 1)}
                totalLabel="Gains personnels"
              />
            )}
          </section>
        )}

        {activeSection === "overview-frederic" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Frédéric</h1>
                <p className="text-sm text-white/60">
                  30% des revenus des clients assignés.
                </p>
              </div>
            </div>

            {overviewLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-white/60">Chargement des indicateurs…</p>
              </div>
            ) : overviewError ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                {overviewError}
              </div>
            ) : (
              <div className="space-y-6">
                <PersonalOverviewPanel
                  stats={buildOverviewStats("FREDERIC_WEHRLE", 0.3)}
                  totalLabel="Gains personnels (30%)"
                />
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wider text-white/60">
                      Calendrier des paiements
                    </p>
                    {commissionLoading && (
                      <span className="text-xs text-white/50">Synchronisation…</span>
                    )}
                  </div>
                  {commissionError && (
                    <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                      {commissionError}
                    </div>
                  )}
                  <div className="mt-4 grid gap-3">
                    {fredMonthly.map((entry) => (
                      <div
                        key={entry.month}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {formatMonthLabel(entry.month)}
                          </p>
                          <p className="text-xs text-white/60">
                            {formatCurrency(entry.storedAmount)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            toggleCommissionPaid(
                              entry.month,
                              entry.storedAmount,
                              !entry.isPaid
                            )
                          }
                          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                            entry.isPaid
                              ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                              : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20"
                          }`}
                        >
                          {entry.isPaid ? "Payé" : "À payer"}
                        </button>
                      </div>
                    ))}
                    {fredMonthly.length === 0 && (
                      <p className="text-xs text-white/60">
                        Aucun revenu attribué pour le moment.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {activeSection === "newsletter" && (
          <NewsletterListSection />
        )}

        {activeSection === "clients" && (
          <ClientsListSection />
        )}

        {activeSection === "quotes" && showQuoteTypeModal && (
          <section className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[40vh]">
            <div className="rounded-2xl border border-white/20 bg-white/5 p-6 w-full space-y-4">
              <h2 className="text-lg font-bold text-white text-center">
                Type de devis
              </h2>
              <p className="text-xs text-white/60 text-center">
                Choisissez le type de devis à créer.
              </p>
              <div className="grid gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuoteTypeModal(false);
                    startNewQuote("maintenance");
                  }}
                  className="w-full rounded-xl border border-[#71DDAE]/40 bg-[#71DDAE]/10 px-4 py-3 text-left transition hover:border-[#71DDAE] hover:bg-[#71DDAE]/20"
                >
                  <span className="font-semibold text-white block">Maintenance</span>
                  <span className="text-xs text-white/70">Abonnement mensuel, prélèvement tous les X du mois.</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowQuoteTypeModal(false);
                    startNewQuote("classic");
                  }}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-left transition hover:border-white/40 hover:bg-white/10"
                >
                  <span className="font-semibold text-white block">Devis classique</span>
                  <span className="text-xs text-white/70">Acompte, échelonné ou totalité à la commande.</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowQuoteTypeModal(false)}
                className="w-full mt-2 text-xs text-white/50 hover:text-white/80"
              >
                Annuler
              </button>
            </div>
          </section>
        )}

        {isCreatingQuote && (
          <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr] max-w-7xl mx-auto">
          {/* --- FORM --- */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateQuotePdf();
            }}
            className="space-y-4"
          >
            <button
              type="button"
              onClick={cancelQuoteCreation}
              className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-[0_8px_32px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_40px_rgba(239,68,68,0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95"
              style={{
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              Fermer
            </button>
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Client & projet</h2>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-gray-500">
                  Client existant
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleSelectClient(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                >
                  <option value="new">Nouveau client</option>
                  {quoteClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.firstName} {client.lastName} — {client.email}
                    </option>
                  ))}
                </select>
                {clientsLoading && (
                  <p className="text-[10px] text-gray-400">Chargement des clients…</p>
                )}
                {clientsError && (
                  <p className="text-[10px] text-rose-400">{clientsError}</p>
                )}
                <p className="text-[10px] text-gray-400">
                  Sélectionner un client remplit automatiquement les champs.
                </p>
              </div>
            <input
              placeholder="Nom complet du client"
              value={quote.clientName}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientName: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <input
              placeholder="Entreprise du client"
              value={quote.clientCompany}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientCompany: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <AddressAutocomplete
              value={quote.clientAddress}
              onChange={(address) =>
                setQuote((p) => ({ ...p, clientAddress: address }))
              }
              onSelect={(addressData) => {
                setQuote((p) => ({
                  ...p,
                  clientAddress: addressData.address,
                  clientPostalCode: addressData.postalCode,
                  clientCity: addressData.city,
                  clientCountry: addressData.country,
                }));
              }}
              placeholder="Adresse (commencez à taper pour l'autocomplétion)"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <div className="grid gap-2 grid-cols-3">
              <input
                placeholder="Code postal"
                value={quote.clientPostalCode}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientPostalCode: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <input
                placeholder="Ville"
                value={quote.clientCity}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientCity: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <select
                value={quote.clientCountry}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientCountry: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                <option value="France">🇫🇷 France</option>
                <option value="Belgique">🇧🇪 Belgique</option>
                <option value="Suisse">🇨🇭 Suisse</option>
                <option value="Royaume-Uni">🇬🇧 Royaume-Uni</option>
                <option value="Allemagne">🇩🇪 Allemagne</option>
                <option value="Italie">🇮🇹 Italie</option>
                <option value="Espagne">🇪🇸 Espagne</option>
                <option value="Pays-Bas">🇳🇱 Pays-Bas</option>
                <option value="États-Unis">🇺🇸 États-Unis</option>
                <option value="Portugal">🇵🇹 Portugal</option>
                <option value="Maroc">🇲🇦 Maroc</option>
                <option value="Algérie">🇩🇿 Algérie</option>
                <option value="Autre">🌍 Autre</option>
              </select>
            </div>
            <div className="flex gap-1">
              <select
                value={quote.clientPhoneCountryCode}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientPhoneCountryCode: e.target.value }))
                }
                className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                <option value="+33">🇫🇷 +33</option>
                <option value="+32">🇧🇪 +32</option>
                <option value="+41">🇨🇭 +41</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+31">🇳🇱 +31</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+351">🇵🇹 +351</option>
                <option value="+212">🇲🇦 +212</option>
                <option value="+213">🇩🇿 +213</option>
              </select>
              <input
                placeholder="Téléphone"
                value={quote.clientPhone}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientPhone: e.target.value }))
                }
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={quote.clientEmail}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientEmail: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="date"
              value={quote.dueDate}
              onChange={(e) =>
                setQuote((p) => ({ ...p, dueDate: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <textarea
              rows={2}
              placeholder="Résumé du projet"
              value={quote.executiveSummary}
              onChange={(e) =>
                setQuote((p) => ({
                  ...p,
                  executiveSummary: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-900">Prestations</h2>
              <button
                type="button"
                onClick={addItem}
                className="rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                + Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {quote.items.map((item, index) => {
                const itemKey = item.id || `line-${index}`;
                return (
                  <div
                    key={itemKey}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-gray-500">Ligne {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-[10px] font-medium text-red-600 hover:text-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={quote.items.length === 1}
                      >
                        Supprimer
                      </button>
                    </div>
                    <input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, { description: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    />
                    <div className="grid gap-2 grid-cols-2">
                      <input
                        type="number"
                        min={1}
                        placeholder="Qté"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, {
                            quantity: Math.max(
                              1,
                              Number(e.target.value) || 0
                            ),
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                      />
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder={quoteType === "maintenance" ? "Prix (€/mois)" : "Prix (€)"}
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(index, {
                            unitPrice: Math.max(
                              0,
                              Number(e.target.value) || 0
                            ),
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Conditions de paiement</h2>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">Présélection</label>
              <select
                value={paymentPresetKey}
                onChange={(e) => {
                  const id = e.target.value as PaymentPresetId;
                  setPaymentPresetKey(id);
                  if (id !== "custom") {
                    const text = buildPaymentTermsFromPreset(id, subtotal, {
                      customDepositAmount: paymentCustomDepositAmount,
                      schedule3: paymentSchedule3,
                      scheduleN: paymentScheduleN,
                      maintenanceDurationMonths: maintenanceDurationMonths,
                      maintenanceDayOfMonth: maintenanceDayOfMonth,
                    });
                    setQuote((p) => ({ ...p, paymentTerms: text }));
                  }
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                {(quoteType === "maintenance"
                  ? PAYMENT_PRESETS.filter((p) => p.id === "maintenance" || p.id === "custom")
                  : PAYMENT_PRESETS.filter((p) => p.id !== "maintenance")
                ).map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            {paymentPresetKey === "maintenance" && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">Durée (mois)</label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={maintenanceDurationMonths || ""}
                      onChange={(e) => {
                        const v = Math.max(1, Math.min(120, Number(e.target.value) || 1));
                        setMaintenanceDurationMonths(v);
                        const text = buildPaymentTermsFromPreset("maintenance", subtotal, {
                          maintenanceDurationMonths: v,
                          maintenanceDayOfMonth: maintenanceDayOfMonth,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      placeholder="12"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">Jour du prélèvement (1-31)</label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={maintenanceDayOfMonth || ""}
                      onChange={(e) => {
                        const v = Math.max(1, Math.min(31, Number(e.target.value) || 1));
                        setMaintenanceDayOfMonth(v);
                        const text = buildPaymentTermsFromPreset("maintenance", subtotal, {
                          maintenanceDurationMonths: maintenanceDurationMonths,
                          maintenanceDayOfMonth: v,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      placeholder="5"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500">
                  En février, si le jour choisi est supérieur à 28, le prélèvement aura lieu le 28.
                </p>
              </div>
            )}

            {paymentPresetKey === "acompte_custom" && (
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">Montant acompte (€)</label>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={paymentCustomDepositAmount || ""}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    setPaymentCustomDepositAmount(v);
                    const text = buildPaymentTermsFromPreset("acompte_custom", subtotal, {
                      customDepositAmount: v,
                    });
                    setQuote((p) => ({ ...p, paymentTerms: text }));
                  }}
                  placeholder="Ex: 1500"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                />
              </div>
            )}

            {paymentPresetKey === "x3" && (
              <div className="space-y-2">
                <span className="block text-xs font-medium text-gray-600">Calendrier 3 échéances</span>
                {paymentSchedule3.map((row, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500 w-24">
                      {i === 0 ? "1er" : i === 1 ? "2ème" : "3ème"}
                    </span>
                    <input
                      type="text"
                      value={row.amount}
                      onChange={(e) => {
                        const next = [...paymentSchedule3];
                        next[i] = { ...next[i]!, amount: e.target.value };
                        setPaymentSchedule3(next);
                        const text = buildPaymentTermsFromPreset("x3", subtotal, {
                          schedule3: next,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      placeholder="Montant ou %"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) => {
                        const next = [...paymentSchedule3];
                        next[i] = { ...next[i]!, date: e.target.value };
                        setPaymentSchedule3(next);
                        const text = buildPaymentTermsFromPreset("x3", subtotal, {
                          schedule3: next,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      placeholder="JJ/MM/AAAA ou libellé"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {paymentPresetKey === "xechelon" && (
              <div className="space-y-2">
                <span className="block text-xs font-medium text-gray-600">Échéances (montant + date)</span>
                {paymentScheduleN.map((row, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500 w-16">Éch. {i + 1}</span>
                    <input
                      type="text"
                      value={row.amount}
                      onChange={(e) => {
                        const next = [...paymentScheduleN];
                        next[i] = { ...next[i]!, amount: e.target.value };
                        setPaymentScheduleN(next);
                        const text = buildPaymentTermsFromPreset("xechelon", subtotal, {
                          scheduleN: next,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      placeholder="Montant"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) => {
                        const next = [...paymentScheduleN];
                        next[i] = { ...next[i]!, date: e.target.value };
                        setPaymentScheduleN(next);
                        const text = buildPaymentTermsFromPreset("xechelon", subtotal, {
                          scheduleN: next,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      placeholder="Date"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs"
                    />
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...paymentScheduleN, { amount: "", date: "" }];
                      setPaymentScheduleN(next);
                      const text = buildPaymentTermsFromPreset("xechelon", subtotal, {
                        scheduleN: next,
                      });
                      setQuote((p) => ({ ...p, paymentTerms: text }));
                    }}
                    className="text-xs text-[#2A9D7A] hover:underline"
                  >
                    + Ajouter une échéance
                  </button>
                  {paymentScheduleN.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const next = paymentScheduleN.slice(0, -1);
                        setPaymentScheduleN(next);
                        const text = buildPaymentTermsFromPreset("xechelon", subtotal, {
                          scheduleN: next,
                        });
                        setQuote((p) => ({ ...p, paymentTerms: text }));
                      }}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      Supprimer la dernière
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600">
                Texte final (éditable)
              </label>
              <textarea
                rows={8}
                placeholder="Conditions de paiement"
                value={quote.paymentTerms}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, paymentTerms: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isExporting || isSendingSignature}
              className="w-full rounded-2xl bg-gradient-to-r from-[#71DDAE] via-[#5BCA9D] to-[#2A9D7A] px-4 py-2.5 text-xs font-bold text-[#1C1C1C] transition-all shadow-[0_8px_32px_rgba(113,221,174,0.4)] hover:shadow-[0_12px_40px_rgba(113,221,174,0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-translate-y-0"
              style={{
                boxShadow: '0 8px 32px rgba(113, 221, 174, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              {isExporting ? "Génération…" : "Télécharger le devis PDF"}
            </button>
            <button
              type="button"
              onClick={sendQuoteForSignature}
              disabled={isExporting || isSendingSignature}
              className="w-full rounded-2xl border-2 border-[#2A9D7A] bg-transparent px-4 py-2.5 text-xs font-bold text-[#2A9D7A] transition-all hover:bg-[#2A9D7A]/10 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSendingSignature ? "Envoi…" : "Envoyer pour signature (Yousign)"}
            </button>
          </div>
          {quoteError && (
            <p className="text-sm text-rose-400">{quoteError}</p>
          )}
          {quoteSuccess && !quoteError && (
            <p className="text-sm text-emerald-500">{quoteSuccess}</p>
          )}
        </form>

        {/* --- LIVE PREVIEW --- */}
        <div className="space-y-4">
          <div
            ref={previewRef}
            className="sticky top-6 h-fit w-full max-w-[210mm] mx-auto rounded-lg border border-gray-200 bg-[#f9fafb] p-10 shadow-lg print:bg-transparent"
          >
          {/* HEADER */}
          <div className="flex items-start justify-between mb-5">
            <div className="text-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Devis</h2>
              <p className="text-xs font-semibold text-slate-700 mb-0.5">
                N° {quoteNumber}
              </p>
              <p className="text-xs text-gray-500">Date : {formatDate(new Date())}</p>
              <p className="text-xs text-gray-500">Validité : {formatDisplayDate(quote.dueDate)}</p>
            </div>
            {logoDataUrl ? (
              <img
                src={logoDataUrl}
                alt="Logo Web Difference"
                className="h-[60px] w-auto -mt-2.5"
              />
            ) : (
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                WEB DIFFERENCE
              </h2>
            )}
          </div>

          {/* INFOS CLIENT / ÉMETTEUR */}
          <div className="flex gap-2.5 mb-3">
            <div className="flex-1 rounded-xl bg-white border border-gray-200 p-4">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1.5">Émetteur</p>
              <p className="text-xs font-semibold text-slate-900 mb-0.5">{providerInfo.company}</p>
              <p className="text-[10px] text-gray-600 mb-0.5">{providerInfo.address}</p>
              <p className="text-[10px] text-gray-600 mb-0.5">{providerInfo.phone}</p>
              <p className="text-[10px] text-gray-600 mb-0.5">{providerInfo.email}</p>
              <p className="text-[10px] text-gray-600 mb-0.5">{providerInfo.website}</p>
              <p className="text-[9px] text-gray-400 mt-1">SIRET {providerInfo.siret}</p>
            </div>
            <div className="flex-1 rounded-xl bg-white border border-gray-200 p-4">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1.5">À l'intention de</p>
              <p className="text-xs font-semibold text-slate-900 mb-0.5">
                {quote.clientName || "Nom du client"}
              </p>
              <p className="text-[10px] text-gray-600 mb-0.5">
                {quote.clientCompany || "Entreprise non renseignée"}
              </p>
              <p className="text-[10px] text-gray-600 mb-0.5">
                {buildClientAddress(
                  quote.clientAddress,
                  quote.clientPostalCode,
                  quote.clientCity,
                  quote.clientCountry
                ) || "Adresse à préciser"}
              </p>
              <p className="text-[10px] text-gray-600 mb-0.5">
                {formatClientPhone(quote.clientPhoneCountryCode, quote.clientPhone) ||
                  "Téléphone à préciser"}
              </p>
              <p className="text-[10px] text-gray-600 mb-0.5">
                {quote.clientEmail || "Email à préciser"}
              </p>
            </div>
          </div>

          {/* RÉSUMÉ */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-3">
            <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1.5">Résumé du projet</p>
            <p className="text-[10px] leading-relaxed text-gray-700">
              {quote.executiveSummary || "Aucun résumé pour le moment."}
            </p>
          </div>

          {/* PRESTATIONS */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-3">
            <div className="flex justify-between mb-2">
              <p className="text-[9px] uppercase tracking-wider text-gray-400">Prestations</p>
              <p className="text-[9px] uppercase tracking-wider text-gray-400">
                {quoteType === "maintenance" ? "€/mois" : "Montant"}
              </p>
            </div>
            <div className="space-y-2">
              {quote.items.map((item, index) => {
                const itemKey = item.id || `preview-${index}`;
                const lineMonthly = item.quantity * item.unitPrice;
                return (
                  <div key={itemKey} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-[10px] font-medium text-slate-900">
                        {item.description}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {item.quantity} × {item.unitPrice.toFixed(2)} €
                        {quoteType === "maintenance" ? " / mois" : ""}
                      </p>
                    </div>
                    <p className="text-[10px] font-medium text-slate-900">
                      {lineMonthly.toFixed(2)} €
                      {quoteType === "maintenance" ? "/mois" : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOTAUX */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-3">
            <div className="flex justify-between text-[10px] text-gray-600 mb-1">
              <p>{quoteType === "maintenance" ? "Total" : "Sous-total"}</p>
              <p>
                {subtotal.toFixed(2)} €
                {quoteType === "maintenance" ? "/mois" : ""}
              </p>
            </div>
            <div className="flex justify-between text-[10px] text-gray-600 mb-2">
              <p>TVA</p>
              <p>Non applicable (art. 293 B CGI)</p>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-700">
                Total à régler
              </p>
              <p className="text-base font-semibold text-slate-900">
                {subtotal.toFixed(2)} €
                {quoteType === "maintenance" ? "/mois" : ""}
              </p>
            </div>
          </div>

          {/* CONDITIONS */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-3">
            <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1.5">Conditions de paiement</p>
            <p className="text-[10px] text-gray-700">
              {quote.paymentTerms || "À définir avec le client."}
            </p>
          </div>

          {/* COORDONNÉES BANCAIRES */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-3">
            <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1.5">Coordonnées bancaires</p>
            <p className="text-[10px] text-gray-700 mb-1">IBAN : {paymentInfo.iban}</p>
            <p className="text-[10px] text-gray-700 mb-1">BIC / SWIFT : {paymentInfo.bic}</p>
            <p className="text-[10px] text-gray-700 mb-1">Domiciliation : {paymentInfo.bankName}</p>
            <p className="text-[10px] text-gray-700">Titulaire du compte : {paymentInfo.accountHolder}</p>
          </div>

          {/* SIGNATURE */}
          <div className="flex flex-col gap-2 mb-8">
            <p className="text-[9px] uppercase tracking-wider text-gray-400">Signature</p>
            <div className="h-8 border-b border-gray-300" />
            <p className="text-[10px] text-gray-600">Signature du client</p>
          </div>

          <p className="text-center text-[10px] text-gray-500">
            Merci pour votre confiance.
          </p>
          </div>
        </div>
        </section>
        )}
      </div>
    </main>
  );
}

/* ----------------------------- TYPES ---------------------------- */

type QuoteItem = {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

type QuoteForm = {
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  clientPostalCode: string;
  clientCity: string;
  clientCountry: string;
  clientPhoneCountryCode: string;
  clientPhone: string;
  clientEmail: string;
  dueDate: string;
  executiveSummary: string;
  notes: string;
  items: QuoteItem[];
  paymentTerms: string;
};

type ClientOption = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  phone: string | null;
  address: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
};

type OverviewClient = {
  id: string;
  createdAt: string;
  totalRevenue: number | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  paymentStatus: "PENDING" | "DEPOSIT_PAID" | "PAID";
  salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE" | null;
};

type OverviewStats = {
  totalClients: number;
  completionRate: number;
  totals: {
    total: number;
    year: number;
    month: number;
    week: number;
    newClientsMonth: number;
    status: Record<"TODO" | "IN_PROGRESS" | "DONE", number>;
    payment: Record<"PENDING" | "DEPOSIT_PAID" | "PAID", number>;
    salesRep: Record<string, number>;
  };
};

type CommissionPayment = {
  id: string;
  salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE";
  month: string;
  amount: number;
  isPaid: boolean;
};

const providerInfo = {
  name: "webdifference",
  company: "Web Difference",
  address: "7 rue Valette, 75005 Paris",
  phone: "06 38 72 30 38",
  email: "contact@webdifference.fr",
  website: "webdifference.fr",
  siret: "939 093 068 00012",
};

/** Coordonnées bancaires pour les devis (à remplir depuis iban_fr.pdf) */
const paymentInfo = {
  iban: "FR76 1695 8000 0153 8524 2732 404", // ex. FR76 1234 5678 9012 3456 7890 123
  bic: "QNTOFRP1XXX", // ex. BNPAFRPP
  bankName: "Qonto (Olinda SAS), 18 rue de Navarin, 75009 Paris, France",
  accountHolder: "WebDifference",
};

const defaultQuote: QuoteForm = {
  clientName: "",
  clientCompany: "",
  clientAddress: "",
  clientPostalCode: "",
  clientCity: "",
  clientCountry: "France",
  clientPhoneCountryCode: "+33",
  clientPhone: "",
  clientEmail: "",
  dueDate: "",
  executiveSummary: "",
  notes: "",
  paymentTerms: "",
  items: [],
};

function getDefaultValidityDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toISOString().slice(0, 10);
}

function createQuoteState(type: "maintenance" | "classic" = "classic"): QuoteForm {
  const base = { ...defaultQuote, dueDate: getDefaultValidityDate() };
  if (type === "maintenance") {
    return {
      ...base,
      items: [
        createQuoteItem({
          description: "Maintenance site web (mise à jour, suivi, sauvegardes)",
          quantity: 1,
          unitPrice: 150,
        }),
      ],
    };
  }
  return {
    ...base,
    items: [
      createQuoteItem({
        description: "Accompagnement stratégique + conception UX/UI",
        quantity: 1,
        unitPrice: 2800,
      }),
    ],
  };
}

function createQuoteItem(
  overrides?: Partial<Omit<QuoteItem, "id">>
): QuoteItem {
  return {
    id: Math.random().toString(36).slice(2, 10),
    description: "",
    quantity: 1,
    unitPrice: 0,
    ...overrides,
  };
}

/* ---------------------- PRÉSÉLECTIONS CONDITIONS DE PAIEMENT ---------------------- */

type PaymentPresetId =
  | "acompte_30"
  | "acompte_50"
  | "acompte_custom"
  | "totalite"
  | "x3"
  | "xechelon"
  | "maintenance"
  | "custom";

const PAYMENT_PRESETS: { id: PaymentPresetId; label: string }[] = [
  { id: "acompte_30", label: "Acompte 30 %" },
  { id: "acompte_50", label: "Acompte 50 %" },
  { id: "acompte_custom", label: "Acompte personnalisé (montant €)" },
  { id: "totalite", label: "Totalité à la commande" },
  { id: "x3", label: "Paiement en 3 fois (calendrier)" },
  { id: "xechelon", label: "Paiement échelonné (X fois)" },
  { id: "maintenance", label: "Abonnement maintenance (tous les X du mois)" },
  { id: "custom", label: "Texte libre" },
];

const FOOTER_CONDITIONS =
  "Paiement par virement bancaire ou facture électronique.";

function buildPaymentTermsFromPreset(
  presetId: PaymentPresetId,
  subtotal: number,
  options: {
    customDepositAmount?: number;
    schedule3?: { amount: string; date: string }[];
    scheduleN?: { amount: string; date: string }[];
    maintenanceDurationMonths?: number;
    maintenanceDayOfMonth?: number;
  }
): string {
  switch (presetId) {
    case "maintenance": {
      const months = options.maintenanceDurationMonths ?? 12;
      const day = Math.min(31, Math.max(1, options.maintenanceDayOfMonth ?? 5));
      const febText =
        day > 28
          ? " Le prélèvement a lieu le 28 février lorsque le jour choisi est supérieur à 28."
          : "";
      return `Abonnement d'une durée de ${months} mois.\n\nPaiement mensuel : le montant de ${subtotal.toFixed(2)} € est prélevé tous les ${day} du mois.${febText}\n\n${FOOTER_CONDITIONS}`;
    }
    case "acompte_30": {
      const ac = (subtotal * 0.3).toFixed(2);
      const solde = (subtotal * 0.7).toFixed(2);
      return `Un acompte de 30 % du montant total (${ac} €) est demandé à la commande afin de démarrer la prestation.\n\nLe solde de 70 % (${solde} €) est à régler à la livraison du projet.\n\n${FOOTER_CONDITIONS}`;
    }
    case "acompte_50": {
      const ac = (subtotal * 0.5).toFixed(2);
      const solde = (subtotal * 0.5).toFixed(2);
      return `Un acompte de 50 % du montant total (${ac} €) est demandé à la commande afin de démarrer la prestation.\n\nLe solde de 50 % (${solde} €) est à régler à la livraison du projet.\n\n${FOOTER_CONDITIONS}`;
    }
    case "acompte_custom": {
      const amount = options.customDepositAmount ?? 0;
      const amountStr = amount > 0 ? `${amount.toFixed(2)} €` : "[montant €]";
      return `Un acompte de ${amountStr} est demandé à la commande afin de démarrer la prestation.\n\nLe solde restant est à régler à la livraison du projet.\n\n${FOOTER_CONDITIONS}`;
    }
    case "totalite":
      return `La totalité du montant de la prestation est à régler à la commande avant le démarrage des travaux.\n\n${FOOTER_CONDITIONS}`;
    case "x3": {
      const s = options.schedule3 ?? [
        { amount: "", date: "" },
        { amount: "", date: "" },
        { amount: "", date: "" },
      ];
      const l1 = s[0]?.amount && s[0]?.date ? `– 1er paiement : ${s[0].amount} le ${s[0].date}` : "– 1er paiement : [montant ou %] à la commande";
      const l2 = s[1]?.amount && s[1]?.date ? `– 2ème paiement : ${s[1].amount} le ${s[1].date}` : "– 2ème paiement : [montant ou %] le [date]";
      const l3 = s[2]?.amount && s[2]?.date ? `– 3ème paiement : ${s[2].amount} le ${s[2].date}` : "– 3ème paiement : [montant ou %] le [date]";
      return `Le paiement de la prestation est échelonné en 3 fois :\n\n${l1}\n${l2}\n${l3}\n\n${FOOTER_CONDITIONS}`;
    }
    case "xechelon": {
      const rows = options.scheduleN ?? [];
      const lines =
        rows.length > 0
          ? rows
              .map(
                (r, i) =>
                  `– Échéance ${i + 1} : ${r.amount || "[montant]"} le ${r.date || "[date]"}`
              )
              .join("\n")
          : "– Échéance 1 : [montant] le [date]\n– Échéance 2 : [montant] le [date]";
      return `Le paiement de la prestation est échelonné en ${rows.length || "X"} fois selon le calendrier suivant :\n\n${lines}\n\n${FOOTER_CONDITIONS}`;
    }
    case "custom":
    default:
      return "";
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function parsePhone(phone: string | null) {
  if (!phone) {
    return { countryCode: "+33", phoneNumber: "" };
  }
  const match = phone.trim().match(/^(\+\d+)\s*(.*)$/);
  if (match) {
    return { countryCode: match[1], phoneNumber: match[2] ?? "" };
  }
  return { countryCode: "+33", phoneNumber: phone };
}

function buildClientAddress(
  address: string,
  postalCode: string,
  city: string,
  country: string
) {
  const parts = [address, postalCode, city, country].filter(Boolean);
  return parts.join(" ");
}

function formatClientPhone(countryCode: string, phone: string) {
  const trimmedPhone = phone?.trim();
  if (!trimmedPhone) return "";
  return `${countryCode} ${trimmedPhone}`.trim();
}

function formatCurrency(value: number) {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function groupRevenueByMonth(
  clients: OverviewClient[],
  salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE",
  multiplier: number
) {
  const map = new Map<string, number>();
  clients.forEach((client) => {
    if (client.salesRep !== salesRep) return;
    const month = client.createdAt.slice(0, 7);
    const revenue = (client.totalRevenue ?? 0) * multiplier;
    map.set(month, (map.get(month) ?? 0) + revenue);
  });

  return Array.from(map.entries())
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => (a.month < b.month ? 1 : -1));
}

function formatMonthLabel(month: string) {
  const [year, monthValue] = month.split("-");
  const date = new Date(Number(year), Number(monthValue) - 1, 1);
  return date.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

type PieChartItem = {
  label: string;
  value: number;
  color: string;
};

function PieChart({ data }: { data: PieChartItem[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center text-xs text-white/50">
        Aucune donnée
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <g transform="rotate(-90 60 60)">
          {data.map((item) => {
            const value = item.value;
            const stroke = (value / total) * circumference;
            const strokeDasharray = `${stroke} ${circumference - stroke}`;
            const currentOffset = offset;
            offset += stroke;
            return (
              <circle
                key={item.label}
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="18"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-currentOffset}
              />
            );
          })}
        </g>
        <circle cx="60" cy="60" r="28" fill="#0f172a" />
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fontSize="12"
          fill="#fff"
          fontWeight="600"
        >
          {total}
        </text>
      </svg>
      <div className="space-y-1 text-xs text-white/70">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
            <span className="ml-auto text-white/50">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonalOverviewPanel({
  stats,
  totalLabel,
}: {
  stats: OverviewStats;
  totalLabel: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-wider text-white/60">{totalLabel}</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {formatCurrency(stats.totals.total)}
        </p>
        <p className="text-xs text-white/50">Cumul</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-wider text-white/60">Ce mois-ci</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {formatCurrency(stats.totals.month)}
        </p>
        <p className="text-xs text-white/50">Derniers 30 jours</p>
      </div>
    </div>
  );
}

function OverviewPanel({
  stats,
  totalLabel = "Total généré",
}: {
  stats: OverviewStats;
  totalLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Clients actifs</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats.totalClients}</p>
          <p className="text-xs text-white/50">+{stats.totals.newClientsMonth} ce mois-ci</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">{totalLabel}</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCurrency(stats.totals.total)}
          </p>
          <p className="text-xs text-white/50">Cumul à vie</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Sur 12 mois</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCurrency(stats.totals.year)}
          </p>
          <p className="text-xs text-white/50">Tendance annuelle</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Ce mois-ci</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCurrency(stats.totals.month)}
          </p>
          <p className="text-xs text-white/50">
            Derniers 30 jours · {formatCurrency(stats.totals.week)} cette semaine
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">Statuts clients</p>
            <p className="text-sm text-white/70">{stats.completionRate}% terminés</p>
          </div>
          {(["TODO", "IN_PROGRESS", "DONE"] as const).map((status) => {
            const count = stats.totals.status[status];
            const total = stats.totalClients || 1;
            const pct = Math.round((count / total) * 100);
            const label =
              status === "TODO" ? "À faire" : status === "IN_PROGRESS" ? "En cours" : "Terminé";
            return (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>{label}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#71DDAE]" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">Paiements</p>
            <p className="text-sm text-white/70">Suivi des encaissements</p>
          </div>
          {(["PENDING", "DEPOSIT_PAID", "PAID"] as const).map((payment) => {
            const count = stats.totals.payment[payment];
            const total = stats.totalClients || 1;
            const pct = Math.round((count / total) * 100);
            const label =
              payment === "PENDING"
                ? "En attente"
                : payment === "DEPOSIT_PAID"
                  ? "Acompte payé"
                  : "Total payé";
            const color =
              payment === "PAID"
                ? "bg-emerald-400"
                : payment === "DEPOSIT_PAID"
                  ? "bg-sky-400"
                  : "bg-rose-400";
            return (
              <div key={payment} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>{label}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Statuts</p>
          <div className="mt-4">
            <PieChart
              data={[
                { label: "À faire", value: stats.totals.status.TODO, color: "#94a3b8" },
                { label: "En cours", value: stats.totals.status.IN_PROGRESS, color: "#fbbf24" },
                { label: "Terminé", value: stats.totals.status.DONE, color: "#34d399" },
              ]}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Paiement</p>
          <div className="mt-4">
            <PieChart
              data={[
                { label: "En attente", value: stats.totals.payment.PENDING, color: "#fb7185" },
                { label: "Acompte payé", value: stats.totals.payment.DEPOSIT_PAID, color: "#38bdf8" },
                { label: "Total payé", value: stats.totals.payment.PAID, color: "#34d399" },
              ]}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Commerciaux</p>
          <div className="mt-4">
            <PieChart
              data={[
                {
                  label: "Tristan Wehrle",
                  value: stats.totals.salesRep.TRISTAN_WEHRLE ?? 0,
                  color: "#34d399",
                },
                {
                  label: "Fréderic Wehrle",
                  value: stats.totals.salesRep.FREDERIC_WEHRLE ?? 0,
                  color: "#fbbf24",
                },
                {
                  label: "Non assigné",
                  value: stats.totals.salesRep.NONE ?? 0,
                  color: "#f9a8d4",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-wider text-white/60">Commerciaux</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { key: "TRISTAN_WEHRLE", label: "Tristan Wehrle" },
            { key: "FREDERIC_WEHRLE", label: "Fréderic Wehrle" },
            { key: "NONE", label: "Non assigné" },
          ].map((rep) => (
            <div key={rep.key} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-sm text-white">{rep.label}</p>
              <p className="text-xs text-white/60">
                {stats.totals.salesRep[rep.key] ?? 0} clients
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDisplayDate(value: string): string {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "—" : formatDate(parsed);
}

/* ---------------------- PDF RENDERER COMPONENT --------------------- */

type QuotePdfDocumentProps = {
  quote: QuoteForm;
  subtotal: number;
  quoteNumber: string;
  logoDataUrl: string | null;
  quoteType: "maintenance" | "classic";
  maintenanceDurationMonths: number;
  maintenanceDayOfMonth: number;
};

function QuotePdfDocument({
  quote,
  subtotal,
  quoteNumber,
  logoDataUrl,
  quoteType,
  maintenanceDurationMonths,
  maintenanceDayOfMonth,
}: QuotePdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* HEADER — ne pas couper entre deux pages */}
        <View style={pdfStyles.header} wrap={false}>
          {/* Infos à gauche */}
          <View>
            <Text style={pdfStyles.quoteTitle}>Devis</Text>
            <Text style={pdfStyles.headerDevis}>N° {quoteNumber}</Text>
            <Text style={pdfStyles.metaLine}>
              Date : {formatDate(new Date())}
            </Text>
            <Text style={pdfStyles.metaLine}>
              Validité : {formatDisplayDate(quote.dueDate)}
            </Text>
          </View>

          {/* Logo à droite (plus gros) */}
          <View style={pdfStyles.headerRight}>
            {logoDataUrl ? (
              <PdfImage src={logoDataUrl} style={pdfStyles.logoLarge} />
            ) : (
              <Text style={pdfStyles.brandFallback}>WEB DIFFERENCE</Text>
            )}
          </View>
        </View>

        {/* INFOS CLIENT / ÉMETTEUR — bloc gardé ensemble */}
        <View style={pdfStyles.infoGrid} wrap={false}>
          <View style={[pdfStyles.card, pdfStyles.infoCard, { marginRight: 10 }]}>
            <Text style={pdfStyles.cardLabel}>Émetteur</Text>
            <Text style={pdfStyles.cardTitle}>{providerInfo.company}</Text>
            <Text style={pdfStyles.cardText}>{providerInfo.address}</Text>
            <Text style={pdfStyles.cardText}>{providerInfo.phone}</Text>
            <Text style={pdfStyles.cardText}>{providerInfo.email}</Text>
            <Text style={pdfStyles.cardText}>{providerInfo.website}</Text>
            <Text style={[pdfStyles.cardText, pdfStyles.cardSmall]}>
              SIRET {providerInfo.siret}
            </Text>
          </View>

          <View style={[pdfStyles.card, pdfStyles.infoCard]}>
            <Text style={pdfStyles.cardLabel}>À l’intention de</Text>
            <Text style={pdfStyles.cardTitle}>
              {quote.clientName || "Nom du client"}
            </Text>
            <Text style={pdfStyles.cardText}>
              {quote.clientCompany || "Entreprise non renseignée"}
            </Text>
            <Text style={pdfStyles.cardText}>
              {buildClientAddress(
                quote.clientAddress,
                quote.clientPostalCode,
                quote.clientCity,
                quote.clientCountry
              ) || "Adresse à préciser"}
            </Text>
            <Text style={pdfStyles.cardText}>
              {formatClientPhone(quote.clientPhoneCountryCode, quote.clientPhone) ||
                "Téléphone à préciser"}
            </Text>
            <Text style={pdfStyles.cardText}>
              {quote.clientEmail || "Email à préciser"}
            </Text>
          </View>
        </View>

        {/* RÉSUMÉ — bloc gardé ensemble */}
        <View style={[pdfStyles.card, pdfStyles.summaryCard]} wrap={false}>
          <Text style={pdfStyles.cardLabel}>Résumé du projet</Text>
          <Text style={pdfStyles.summaryText}>
            {quote.executiveSummary ||
              "Conception d’un site web sur mesure, design épuré et orienté expérience utilisateur."}
          </Text>
        </View>

        {/* PRESTATIONS — chaque ligne reste entière (pas coupée) */}
        <View style={[pdfStyles.card, pdfStyles.servicesCard]}>
          <View style={pdfStyles.servicesHeader} wrap={false}>
            <Text style={pdfStyles.servicesHeaderLabel}>Prestations</Text>
            <Text style={pdfStyles.servicesHeaderLabel}>
              {quoteType === "maintenance" ? "€/mois" : "Montant"}
            </Text>
          </View>

          {quote.items.map((item, index) => {
            const mapKey = item.id || `pdf-${index}`;
            const lineMonthly = item.quantity * item.unitPrice;

            return (
              <View key={mapKey} style={pdfStyles.itemRow} wrap={false}>
                <View style={{ flex: 1 }}>
                  <Text style={pdfStyles.itemTitle}>{item.description}</Text>
                  <Text style={pdfStyles.itemMeta}>
                    {item.quantity} × {item.unitPrice.toFixed(2)} €
                    {quoteType === "maintenance" ? " / mois" : ""}
                  </Text>
                </View>
                <Text style={pdfStyles.itemAmount}>
                  {lineMonthly.toFixed(2)} €
                  {quoteType === "maintenance" ? "/mois" : ""}
                </Text>
              </View>
            );
          })}
        </View>

        {/* TOTAUX — bloc gardé ensemble */}
        <View style={[pdfStyles.card, pdfStyles.totalCard]} wrap={false}>
          <View style={pdfStyles.totalLine}>
            <Text style={pdfStyles.totalLabel}>
              {quoteType === "maintenance" ? "Total" : "Sous-total"}
            </Text>
            <Text style={pdfStyles.totalValue}>
              {subtotal.toFixed(2)} €
              {quoteType === "maintenance" ? "/mois" : ""}
            </Text>
          </View>
          <View style={pdfStyles.totalLine}>
            <Text style={pdfStyles.totalLabel}>TVA</Text>
            <Text style={pdfStyles.totalSubInfo}>
              Non applicable (art. 293 B CGI)
            </Text>
          </View>
          <View style={pdfStyles.totalLineStrong}>
            <Text style={pdfStyles.totalStrongLabel}>Total à régler</Text>
            <Text style={pdfStyles.totalStrongValue}>
              {subtotal.toFixed(2)} €
              {quoteType === "maintenance" ? "/mois" : ""}
            </Text>
          </View>
        </View>

        {/* CONDITIONS — bloc gardé ensemble */}
        <View style={[pdfStyles.card, pdfStyles.conditionsCard]} wrap={false}>
          <Text style={pdfStyles.cardLabel}>Conditions de paiement</Text>
          <Text style={pdfStyles.conditionsText}>
            {quote.paymentTerms || "À définir avec le client."}
          </Text>
        </View>

        {/* INFORMATIONS DE PAIEMENT — coordonnées bancaires */}
        <View style={[pdfStyles.card, pdfStyles.paymentInfoCard]} wrap={false}>
          <Text style={pdfStyles.cardLabel}>Coordonnées bancaires</Text>
          <Text style={pdfStyles.paymentInfoText}>IBAN : {paymentInfo.iban}</Text>
          <Text style={pdfStyles.paymentInfoText}>BIC / SWIFT : {paymentInfo.bic}</Text>
          <Text style={pdfStyles.paymentInfoText}>Domiciliation : {paymentInfo.bankName}</Text>
          <Text style={pdfStyles.paymentInfoText}>Titulaire du compte : {paymentInfo.accountHolder}</Text>
        </View>

        {/* SIGNATURE — bloc gardé ensemble */}
        <View style={pdfStyles.signatureBlock} wrap={false}>
          <Text style={pdfStyles.cardLabel}>Signature</Text>
          <View style={pdfStyles.signatureLine} />
          <Text style={pdfStyles.signatureCaption}>Signature du client</Text>
        </View>

        {/* FOOTER FIXE EN BAS */}
        <Text style={pdfStyles.footerText}>Merci pour votre confiance.</Text>
      </Page>
    </Document>
  );
}

const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#f9fafb",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    color: "#0f172a",
    position: "relative",
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -10,
  },
  logo: {
    height: 26, // ratio respecté
    marginRight: 8,
  },
  logoLarge: {
    height: 60, // logo plus gros
    width: "auto",
  },
  brandFallback: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#6b7280",
    marginRight: 8,
  },
  headerRightText: {
    alignItems: "flex-start",
  },
  headerDevis: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 2,
  },
  metaLine: {
    fontSize: 11,
    color: "#6b7280",
  },

  /* CARDS GÉNÉRIQUES */

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 10,
  },

  /* INFOS */

  infoGrid: {
    flexDirection: "row",
    marginTop: 10,
  },
  infoCard: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9ca3af",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 2,
  },
  cardText: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 2,
  },
  cardSmall: {
    marginTop: 4,
    fontSize: 9,
    color: "#9ca3af",
  },

  /* RÉSUMÉ */

  summaryCard: {
    marginTop: 12,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },

  /* PRESTATIONS */

  servicesCard: {
    marginTop: 12,
  },
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  servicesHeaderThree: {
    gap: 8,
  },
  pdfAmountCol: {
    width: 58,
    textAlign: "right",
  },
  servicesHeaderLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9ca3af",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  itemRowThree: {
    gap: 8,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 500,
  },
  itemMeta: {
    fontSize: 9,
    color: "#9ca3af",
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 11,
    fontWeight: 600,
    marginLeft: 8,
  },

  /* TOTAUX */

  totalCard: {
    marginTop: 12,
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 10,
    color: "#6b7280",
  },
  totalValue: {
    fontSize: 11,
    fontWeight: 600,
  },
  totalSubInfo: {
    fontSize: 9,
    color: "#9ca3af",
  },
  totalLineStrong: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  totalStrongLabel: {
    fontSize: 10,
    fontWeight: 600,
  },
  totalStrongValue: {
    fontSize: 13,
    fontWeight: 700,
  },

  /* CONDITIONS */

  conditionsCard: {
    marginTop: 12,
  },
  conditionsText: {
    fontSize: 10,
    color: "#4b5563",
    lineHeight: 1.5,
  },
  paymentInfoCard: {
    marginTop: 10,
  },
  paymentInfoText: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 4,
    lineHeight: 1.4,
  },

  /* SIGNATURE */

  signatureBlock: {
    marginTop: 14,
  },
  signatureLine: {
    marginTop: 10,
    height: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  signatureCaption: {
    marginTop: 4,
    fontSize: 9,
    color: "#9ca3af",
    textAlign: "right",
  },

  /* FOOTER ABSOLUTE */

  footerText: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 24,
    textAlign: "center",
    fontSize: 9,
    color: "#9ca3af",
  },
});
