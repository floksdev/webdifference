"use client";

import {
  getAdminEmail,
  isAdminAuthenticated,
  logoutAdmin,
  onAuthStateChange,
} from "@/lib/admin-auth";
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
    <main className="w-full px-6 py-6 text-white">
      <header className="mb-6 flex justify-end">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5">
          <span className="text-xs font-medium text-white/80">Admin</span>
          <button
            onClick={() => {
              logoutAdmin();
              router.push("/");
            }}
            className="text-xs font-medium text-white/60 transition hover:text-white/80"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {!isCreatingQuote && (
        <section className="mb-10">
          <button
            onClick={startNewQuote}
            className="w-full max-w-md mx-auto rounded-2xl border border-white/20 bg-white/5 p-8 text-center transition hover:border-[#71DDAE]/40 hover:bg-[#71DDAE]/10 hover:shadow-lg hover:shadow-[rgba(113,221,174,0.15)]"
          >
            <div className="text-2xl font-bold text-white mb-2">Nouveau devis</div>
            <div className="text-sm text-white/60">Créer un nouveau devis PDF</div>
          </button>
        </section>
      )}

      {isCreatingQuote ? (
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
            <textarea
              placeholder="Adresse du client"
              rows={2}
              value={quote.clientAddress}
              onChange={(e) =>
                setQuote((p) => ({ ...p, clientAddress: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none"
            />
            <div className="grid gap-2 grid-cols-2">
              <input
                placeholder="Téléphone"
                value={quote.clientPhone}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientPhone: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={quote.clientEmail}
                onChange={(e) =>
                  setQuote((p) => ({ ...p, clientEmail: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
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
                        placeholder="Prix (€)"
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
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Conditions</h2>
            <textarea
              rows={9}
              placeholder="Conditions de paiement"
              value={quote.paymentTerms}
              onChange={(e) =>
                setQuote((p) => ({ ...p, paymentTerms: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isExporting}
            className="w-full rounded-2xl bg-gradient-to-r from-[#71DDAE] via-[#5BCA9D] to-[#2A9D7A] px-4 py-2.5 text-xs font-bold text-[#1C1C1C] transition-all shadow-[0_8px_32px_rgba(113,221,174,0.4)] hover:shadow-[0_12px_40px_rgba(113,221,174,0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-translate-y-0"
            style={{
              boxShadow: '0 8px 32px rgba(113, 221, 174, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
          >
            {isExporting ? "Génération…" : "Télécharger le devis PDF"}
          </button>
          {quoteError && (
            <p className="text-sm text-rose-400">{quoteError}</p>
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
                {quote.clientAddress || "Adresse à préciser"}
              </p>
              <p className="text-[10px] text-gray-600 mb-0.5">
                {quote.clientPhone || "Téléphone à préciser"}
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
              <p className="text-[9px] uppercase tracking-wider text-gray-400">Montant</p>
            </div>
            <div className="space-y-2">
              {quote.items.map((item, index) => {
                const itemKey = item.id || `preview-${index}`;
                const lineTotal = item.quantity * item.unitPrice;
                return (
                  <div
                    key={itemKey}
                    className="flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-[10px] font-medium text-slate-900">
                        {item.description}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {item.quantity} × {item.unitPrice.toFixed(2)} €
                      </p>
                    </div>
                    <p className="text-[10px] font-medium text-slate-900">
                      {lineTotal.toFixed(2)} €
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOTAUX */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 mb-3">
            <div className="flex justify-between text-[10px] text-gray-600 mb-1">
              <p>Sous-total</p>
              <p>{subtotal.toFixed(2)} €</p>
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
      ) : null}
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
  name: "webdifference",
  company: "Web Difference",
  address: "7 rue Valette, 75005 Paris",
  phone: "06 38 72 30 38",
  email: "contact@webdifference.fr",
  website: "webdifference.fr",
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

        {/* INFOS CLIENT / ÉMETTEUR */}
        <View style={pdfStyles.infoGrid}>
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
