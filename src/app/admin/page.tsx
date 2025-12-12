"use client";

import {
  getAdminEmail,
  isAdminAuthenticated,
  logoutAdmin,
  onAuthStateChange,
} from "@/lib/admin-auth";
import { ClientCrmSection } from "@/components/admin/client-crm-section";
import { useRouter } from "next/navigation";
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
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteForm>(createQuoteState());
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(6);
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
    fetch("/assets/main/logo-sm.png")
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

  const subtotal = useMemo(
    () => quote.items.reduce((a, i) => a + i.quantity * i.unitPrice, 0),
    [quote.items]
  );

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

  const startNewQuote = () => {
    setQuote(createQuoteState());
    setIsCreatingQuote(true);
    setQuoteError(null);
  };

  const cancelQuoteCreation = () => {
    setIsCreatingQuote(false);
    setQuoteError(null);
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

    try {
      if (!previewRef.current) {
        setQuoteError("Impossible de trouver l’aperçu du devis.");
        return;
      }

      const filename = `${quoteNumber}.pdf`;

      const blob = await pdf(
        <QuotePdfDocument
          quote={quote}
          subtotal={subtotal}
          quoteNumber={quoteNumber}
          logoDataUrl={logoDataUrl}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      setQuoteIndex((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setQuoteError("Erreur lors de la génération du PDF.");
    } finally {
      setIsExporting(false);
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
    <main className="w-full px-6 py-10 text-white">
      <header className="mb-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Portail administrateur
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            Tableau de bord Web Difference
          </h1>
          <p className="text-sm text-white/70">
            Connecté en tant que {adminEmail}.
          </p>
        </div>
        <button
          onClick={() => {
            logoutAdmin();
            router.push("/");
          }}
          className="rounded-full border border-white/20 px-5 py-2 text-sm hover:border-white/40 hover:bg-white/10"
        >
          Se déconnecter
        </button>
      </header>

      {!isCreatingQuote && (
        <section className="mb-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:w-1/2">
            <button
              onClick={startNewQuote}
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-left text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-sky-500/5"
            >
              Nouveau devis
            </button>
          </div>
        </section>
      )}

      {isCreatingQuote ? (
        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          {/* --- FORM --- */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateQuotePdf();
            }}
            className="space-y-6"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={cancelQuoteCreation}
                className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-wide text-white/70 hover:border-white/40"
              >
                Fermer
              </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#060913] p-6 space-y-4">
              <h2 className="text-xl font-semibold">Client & projet</h2>
            <input
              placeholder="Nom complet du client"
              value={quote.clientName}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientName: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
            <input
              placeholder="Entreprise du client"
              value={quote.clientCompany}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientCompany: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
            <textarea
              placeholder="Adresse du client"
              rows={2}
              value={quote.clientAddress}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientAddress: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Téléphone du client"
                value={quote.clientPhone}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientPhone: e.target.value }))
                }
                className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
              />
              <input
                type="email"
                placeholder="Email du client"
                value={quote.clientEmail}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientEmail: e.target.value }))
                }
                className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
              />
            </div>
            <input
              type="date"
              value={quote.dueDate}
              onChange={(e) =>
                setQuote((p) => ({ ...p, dueDate: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
            <textarea
              rows={3}
              placeholder="Résumé du projet"
              value={quote.executiveSummary}
              onChange={(e) =>
                setQuote((p) => ({
                  ...p,
                  executiveSummary: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#060913] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Prestations</h2>
              <button
                type="button"
                onClick={addItem}
                className="rounded-full border border-white/15 px-3 py-1 text-sm text-white hover:border-white/40"
              >
                Ajouter une ligne
              </button>
            </div>
            <div className="space-y-4">
              {quote.items.map((item, index) => {
                const itemKey = item.id || `line-${index}`;
                return (
                  <div
                    key={itemKey}
                    className="rounded-xl border border-white/10 bg-[#0b1120] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>Ligne {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-wide hover:border-rose-400 hover:text-rose-300 disabled:opacity-40"
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
                      className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="number"
                        min={1}
                        placeholder="Quantité"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, {
                            quantity: Math.max(
                              1,
                              Number(e.target.value) || 0
                            ),
                          })
                        }
                        className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                      />
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="Prix unitaire (€)"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(index, {
                            unitPrice: Math.max(
                              0,
                              Number(e.target.value) || 0
                            ),
                          })
                        }
                        className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#060913] p-6 space-y-4">
            <h2 className="text-xl font-semibold">Conditions</h2>
            <textarea
              rows={3}
              placeholder="Conditions de paiement"
              value={quote.paymentTerms}
              onChange={(e) =>
                setQuote((p) => ({ ...p, paymentTerms: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
          </div>

          <button
            type="submit"
            disabled={isExporting}
            className="w-full rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {isExporting ? "Génération…" : "Télécharger le devis PDF"}
          </button>
          {quoteError && (
            <p className="text-sm text-rose-400">{quoteError}</p>
          )}
        </form>

        {/* --- LIVE PREVIEW --- */}
        <div
          ref={previewRef}
          className="mx-auto max-w-[794px] rounded-[32px] border border-white/20 bg-[#0b0f1c] p-10 shadow-[0_25px_80px_rgba(0,0,0,0.45)] print:bg-transparent"
        >
          <header className="rounded-3xl bg-gradient-to-br from-white/90 to-white/60 px-8 py-6 text-slate-900 shadow-inner relative overflow-hidden">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-4">
                {logoDataUrl ? (
                  <img
                    src={logoDataUrl}
                    alt="Logo Web Difference"
                    className="h-10 w-auto"
                  />
                ) : (
                  <h2 className="text-lg font-semibold uppercase tracking-[0.2em]">
                    WEB DIFFERENCE
                  </h2>
                )}
                <div className="text-sm text-slate-500">
                  <p className="font-semibold text-slate-700">
                    Devis n° {quoteNumber}
                  </p>
                  <p>Date : {formatDate(new Date())}</p>
                  <p>Validité : {formatDisplayDate(quote.dueDate)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    À l’intention de
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {quote.clientName || "Nom du client"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Total estimé
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {subtotal.toFixed(2)} €
                  </p>
                </div>
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-white backdrop-blur md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Émetteur
              </p>
              <p className="mt-3 text-base font-semibold">
                {providerInfo.name}
              </p>
              <p>{providerInfo.company}</p>
              <p>{providerInfo.address}</p>
              <p>{providerInfo.phone}</p>
              <p>{providerInfo.email}</p>
              <p>{providerInfo.website}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                SIRET {providerInfo.siret}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                À l’intention de
              </p>
              <p className="mt-3 text-base font-semibold">
                {quote.clientName || "Nom du client"}
              </p>
              <p>{quote.clientCompany || "Entreprise non renseignée"}</p>
              <p>{quote.clientAddress || "Adresse à préciser"}</p>
              <p>{quote.clientPhone || "Téléphone à préciser"}</p>
              <p>{quote.clientEmail || "Email à préciser"}</p>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-white/5 bg-white/5 p-8 text-sm text-slate-200 backdrop-blur">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">
              Résumé
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white">
              {quote.executiveSummary || "Aucun résumé pour le moment."}
            </p>
          </section>

          <section className="mt-8 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
              <p>Prestations</p>
              <p>Montant</p>
            </div>
            <div className="mt-6 space-y-4">
              {quote.items.map((item, index) => {
                const itemKey = item.id || `preview-${index}`;
                const lineTotal = item.quantity * item.unitPrice;
                return (
                  <div
                    key={itemKey}
                    className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-5 py-4 text-white"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {item.description}
                      </p>
                      <p className="text-xs text-white/60">
                        {item.quantity} × {item.unitPrice.toFixed(2)} €
                      </p>
                    </div>
                    <p className="text-base font-semibold">
                      {lineTotal.toFixed(2)} €
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-white/5 bg-white px-8 py-6 text-slate-900 shadow-inner">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <p>Sous-total</p>
              <p>{subtotal.toFixed(2)} €</p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <p>TVA</p>
              <p>Non applicable (art. 293 B CGI)</p>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-900/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Total à régler
              </p>
              <p className="text-2xl font-semibold text-slate-900">
                {subtotal.toFixed(2)} €
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">
              Conditions
            </h3>
            <div className="mt-3 text-xs leading-relaxed text-white/80">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em]">
                Conditions de paiement
              </p>
              <p>{quote.paymentTerms || "À définir avec le client."}</p>
            </div>
          </section>

          <section className="mt-8 flex flex-col gap-3 rounded-3xl border border-dashed border-white/20 p-8 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Signature
            </p>
            <div className="h-12 border-b border-white/20" />
            <p>Signature du client</p>
          </section>

          <p className="text-center text-sm text-white/40 mt-14">
            Merci pour votre confiance.
          </p>
        </div>
      </section>
      ) : null}

      <ClientCrmSection />
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
  clientPhone: string;
  clientEmail: string;
  dueDate: string;
  executiveSummary: string;
  notes: string;
  items: QuoteItem[];
  paymentTerms: string;
};

const providerInfo = {
  name: "Mr Tristan Wehrle",
  company: "Web Difference",
  address: "7 rue Valette, 75005 Paris",
  phone: "06 38 72 30 38",
  email: "tristanwehrle1@gmail.com",
  website: "tristan-wehrle.com",
  siret: "939 093 068 00012",
};

const defaultQuote: QuoteForm = {
  clientName: "",
  clientCompany: "",
  clientAddress: "",
  clientPhone: "",
  clientEmail: "",
  dueDate: "",
  executiveSummary: "",
  notes: "",
  paymentTerms: "",
  items: [],
};

function createQuoteState(): QuoteForm {
  return {
    ...defaultQuote,
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

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
};

function QuotePdfDocument({
  quote,
  subtotal,
  quoteNumber,
  logoDataUrl,
}: QuotePdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* HEADER */}
        <View style={pdfStyles.header}>
          {/* Titre à gauche */}
          <View>
            <Text style={pdfStyles.quoteTitle}>Devis</Text>
            <Text style={pdfStyles.quoteTitle}>WebDifference</Text>
          </View>

          {/* Bloc logo + infos à droite */}
          <View style={pdfStyles.headerRight}>
            {logoDataUrl ? (
              <PdfImage src={logoDataUrl} style={pdfStyles.logo} />
            ) : (
              <Text style={pdfStyles.brandFallback}>WEB DIFFERENCE</Text>
            )}
            <View style={pdfStyles.headerRightText}>
              <Text style={pdfStyles.headerDevis}>Devis n° {quoteNumber}</Text>
              <Text style={pdfStyles.metaLine}>
                Date : {formatDate(new Date())}
              </Text>
              <Text style={pdfStyles.metaLine}>
                Validité : {formatDisplayDate(quote.dueDate)}
              </Text>
            </View>
          </View>
        </View>

        {/* INFOS CLIENT / ÉMETTEUR */}
        <View style={pdfStyles.infoGrid}>
          <View style={[pdfStyles.card, pdfStyles.infoCard, { marginRight: 10 }]}>
            <Text style={pdfStyles.cardLabel}>Émetteur</Text>
            <Text style={pdfStyles.cardTitle}>{providerInfo.name}</Text>
            <Text style={pdfStyles.cardText}>{providerInfo.company}</Text>
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
              {quote.clientAddress || "Adresse à préciser"}
            </Text>
            <Text style={pdfStyles.cardText}>
              {quote.clientPhone || "Téléphone à préciser"}
            </Text>
            <Text style={pdfStyles.cardText}>
              {quote.clientEmail || "Email à préciser"}
            </Text>
          </View>
        </View>

        {/* RÉSUMÉ */}
        <View style={[pdfStyles.card, pdfStyles.summaryCard]}>
          <Text style={pdfStyles.cardLabel}>Résumé du projet</Text>
          <Text style={pdfStyles.summaryText}>
            {quote.executiveSummary ||
              "Conception d’un site web sur mesure, design épuré et orienté expérience utilisateur."}
          </Text>
        </View>

        {/* PRESTATIONS */}
        <View style={[pdfStyles.card, pdfStyles.servicesCard]}>
          <View style={pdfStyles.servicesHeader}>
            <Text style={pdfStyles.servicesHeaderLabel}>Prestations</Text>
            <Text style={pdfStyles.servicesHeaderLabel}>Montant</Text>
          </View>

          {quote.items.map((item, index) => {
            const mapKey = item.id || `pdf-${index}`;
            const total = (item.quantity * item.unitPrice).toFixed(2);

            return (
              <View key={mapKey} style={pdfStyles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={pdfStyles.itemTitle}>{item.description}</Text>
                  <Text style={pdfStyles.itemMeta}>
                    {item.quantity} × {item.unitPrice.toFixed(2)} €
                  </Text>
                </View>
                <Text style={pdfStyles.itemAmount}>{total} €</Text>
              </View>
            );
          })}
        </View>

        {/* TOTAUX */}
        <View style={[pdfStyles.card, pdfStyles.totalCard]}>
          <View style={pdfStyles.totalLine}>
            <Text style={pdfStyles.totalLabel}>Sous-total</Text>
            <Text style={pdfStyles.totalValue}>{subtotal.toFixed(2)} €</Text>
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
            </Text>
          </View>
        </View>

        {/* CONDITIONS */}
        <View style={[pdfStyles.card, pdfStyles.conditionsCard]}>
          <Text style={pdfStyles.cardLabel}>Conditions de paiement</Text>
          <Text style={pdfStyles.conditionsText}>
            {quote.paymentTerms || "À définir avec le client."}
          </Text>
        </View>

        {/* SIGNATURE */}
        <View style={pdfStyles.signatureBlock}>
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
    alignItems: "center",
  },
  logo: {
    height: 26, // ratio respecté
    marginRight: 8,
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
