"use client";

import { useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabaseClient } from "@/lib/supabase-client";

type ClientRecord = {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  phone: string | null;
  notes: string | null;
  lastInteraction: string | null;
  invoiceLink: string | null;
  quoteFileUrl: string | null;
};

type SupabaseClient = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  email: string;
  phone: string | null;
  notes: string | null;
  last_interaction: string | null;
  invoice_link: string | null;
  quote_file_url: string | null;
};

type ClientForm = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

const defaultForm: ClientForm = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

export function ClientCrmSection() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<ClientForm>(defaultForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInteractionDrafts, setLastInteractionDrafts] = useState<Record<string, string>>({});
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});
  const [invoiceDrafts, setInvoiceDrafts] = useState<Record<string, string>>({});
  const [savingClient, setSavingClient] = useState<string | null>(null);
  const [uploadingQuoteFor, setUploadingQuoteFor] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    if (!isSupabaseConfigured) {
      setError("Supabase n'est pas configuré. Le CRM nécessite NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    const { data, error } = await supabaseClient
      .from("clients")
      .select(
        "id, first_name, last_name, company, email, phone, notes, last_interaction, invoice_link, quote_file_url"
      )
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Impossible de récupérer les clients", error);
      setError("Erreur de chargement : vérifie Supabase.");
      setIsLoading(false);
      return;
    }

    const normalized: ClientRecord[] =
      data?.map((client: SupabaseClient) => ({
        id: client.id,
        firstName: client.first_name ?? "",
        lastName: client.last_name ?? "",
        company: client.company ?? null,
        email: client.email ?? "",
        phone: client.phone ?? null,
        notes: client.notes ?? null,
        lastInteraction: client.last_interaction ?? null,
        invoiceLink: client.invoice_link ?? null,
        quoteFileUrl: client.quote_file_url ?? null,
      })) ?? [];

    setClients(normalized);
    setLastInteractionDrafts(
      normalized.reduce<Record<string, string>>((acc, client) => {
        acc[client.id] = client.lastInteraction?.slice(0, 10) ?? "";
        return acc;
      }, {})
    );
    setNotesDrafts(
      normalized.reduce<Record<string, string>>((acc, client) => {
        acc[client.id] = client.notes ?? "";
        return acc;
      }, {})
    );
    setInvoiceDrafts(
      normalized.reduce<Record<string, string>>((acc, client) => {
        acc[client.id] = client.invoiceLink ?? "";
        return acc;
      }, {})
    );
    setIsLoading(false);
  }

  async function handleAddClient(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setError("Supabase n'est pas configuré.");
      return;
    }

    if (!form.firstName || !form.lastName || !form.email) {
      setError("Prénom, nom et email obligatoires.");
      return;
    }

    setIsAdding(true);
    setError(null);

    const payload = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      company: form.company.trim() || null,
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      notes: form.notes.trim() || null,
    };

    const { error } = await supabaseClient.from("clients").insert(payload);

    if (error) {
      console.error("Impossible d'ajouter", error);
      setError("Ajout impossible (voir console). ");
    } else {
      setForm(defaultForm);
      fetchClients();
    }

    setIsAdding(false);
  }

  async function handleSaveClient(clientId: string) {
    if (!isSupabaseConfigured) {
      setError("Supabase n'est pas configuré.");
      return;
    }

    setSavingClient(clientId);
    setError(null);

    const payload = {
      last_interaction: lastInteractionDrafts[clientId]
        ? new Date(lastInteractionDrafts[clientId]).toISOString()
        : null,
      notes: notesDrafts[clientId]?.trim() || null,
      invoice_link: invoiceDrafts[clientId]?.trim() || null,
    };

    const { error } = await supabaseClient
      .from("clients")
      .update(payload)
      .eq("id", clientId);

    if (error) {
      console.error("Impossible de mettre à jour", error);
      setError("Sauvegarde impossible (voir console).");
    } else {
      fetchClients();
    }

    setSavingClient(null);
  }

  async function handleQuoteUpload(clientId: string, file?: File | null) {
    if (!file) return;
    if (!isSupabaseConfigured) {
      setStorageError("Supabase n'est pas configuré.");
      return;
    }

    setUploadingQuoteFor(clientId);
    setStorageError(null);

    try {
      const bucket = "client-quotes";
      const ext = file.name.split(".").pop();
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${clientId}/${timestamp}-${sanitizedName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from(bucket)
        .upload(path, file, {
          upsert: true,
          cacheControl: "3600",
          contentType: file.type || "application/pdf",
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabaseClient.storage.from(bucket).getPublicUrl(path);

      const { error } = await supabaseClient
        .from("clients")
        .update({ quote_file_url: publicUrl })
        .eq("id", clientId);

      if (error) {
        throw error;
      }

      fetchClients();
    } catch (err) {
      console.error("Impossible d’uploader le devis", err);
      setStorageError(
        "Upload devis impossible : vérifie le bucket Supabase « client-quotes »."
      );
    } finally {
      setUploadingQuoteFor(null);
    }
  }

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;
    return clients.filter((client) =>
      [client.firstName, client.lastName, client.company, client.email]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [clients, search]);

  return (
    <section className="mt-12 rounded-3xl border border-white/10 bg-[#050713] px-6 py-8 text-white">
     <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">CRM</p>
          <h2 className="text-2xl font-semibold">Clients rapides</h2>
          <p className="text-sm text-white/70">
            Liste minimale pour retrouver un client, prendre des notes, et suivre le
            dernier échange.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Rechercher "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm outline-none focus:border-white/40"
          />
          <button
            onClick={fetchClients}
            className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/40"
          >
            Rafraîchir
          </button>
        </div>
      </header>

      {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
      {storageError && (
        <p className="mt-2 text-sm text-amber-300">{storageError}</p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {isLoading && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              Chargement des clients…
            </div>
          )}
          {!isLoading && filteredClients.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              Aucun client pour le moment.
            </div>
          )}
          {!isLoading &&
            filteredClients.map((client) => {
              const lastInteraction = client.lastInteraction
                ? new Date(client.lastInteraction).toLocaleDateString("fr-FR")
                : "N/A";
              return (
                <article
                  key={client.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold">
                        {client.firstName} {client.lastName}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {client.company || "Freelance / Particulier"}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                      Dernier échange : {lastInteraction}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-white/80 md:grid-cols-2">
                    <p>
                      <span className="text-white/50">Email :</span> {client.email}
                    </p>
                    <p>
                      <span className="text-white/50">Téléphone :</span> {client.phone || "—"}
                    </p>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[160px_1fr]">
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Dernier contact
                      </label>
                      <input
                        type="date"
                        value={lastInteractionDrafts[client.id] ?? ""}
                        onChange={(e) =>
                          setLastInteractionDrafts((prev) => ({
                            ...prev,
                            [client.id]: e.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-3 py-2 text-sm outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Notes / actions
                      </label>
                      <textarea
                        rows={2}
                        value={notesDrafts[client.id] ?? ""}
                        onChange={(e) =>
                          setNotesDrafts((prev) => ({
                            ...prev,
                            [client.id]: e.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-3 py-2 text-sm outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Lien facture (Qonto / PDF)
                      </label>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                        <input
                          placeholder="https://..."
                          value={invoiceDrafts[client.id] ?? ""}
                          onChange={(e) =>
                            setInvoiceDrafts((prev) => ({
                              ...prev,
                              [client.id]: e.target.value,
                            }))
                          }
                          className="flex-1 rounded-xl border border-white/15 bg-[#0f172a]/70 px-3 py-2 text-sm outline-none focus:border-white/40"
                        />
                        {client.invoiceLink && (
                          <a
                            href={client.invoiceLink}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/80 hover:border-white/40 text-center"
                          >
                            Voir
                          </a>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Devis PDF
                      </label>
                      <div className="mt-2 flex flex-col gap-2">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) =>
                            handleQuoteUpload(client.id, e.target.files?.[0])
                          }
                          className="text-xs text-white/70 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white hover:file:bg-white/20"
                        />
                        {client.quoteFileUrl && (
                          <a
                            href={client.quoteFileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-sky-300 underline"
                          >
                            Télécharger le devis
                          </a>
                        )}
                        {uploadingQuoteFor === client.id && (
                          <p className="text-xs text-white/60">
                            Upload en cours…
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleSaveClient(client.id)}
                      disabled={savingClient === client.id}
                      className="rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/80 hover:border-white/40 disabled:opacity-50"
                    >
                      {savingClient === client.id ? "Sauvegarde…" : "Sauvegarder"}
                    </button>
                  </div>
                </article>
              );
            })}
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold">Ajouter un client</h3>
          <p className="text-sm text-white/60">
            Le strict nécessaire pour rattacher un nouveau contact.
          </p>
          <form className="mt-4 space-y-3" onSubmit={handleAddClient}>
            <div className="grid gap-3 md:grid-cols-2">
              <input
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))
                }
                className="rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-2 text-sm outline-none focus:border-white/40"
              />
              <input
                placeholder="Nom"
                value={form.lastName}
                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className="rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-2 text-sm outline-none focus:border-white/40"
              />
            </div>
            <input
              placeholder="Société"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-2 text-sm outline-none focus:border-white/40"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-2 text-sm outline-none focus:border-white/40"
            />
            <input
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-2 text-sm outline-none focus:border-white/40"
            />
            <textarea
              rows={3}
              placeholder="Notes / contexte"
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-[#0f172a]/70 px-4 py-2 text-sm outline-none focus:border-white/40"
            />
            <button
              type="submit"
              disabled={isAdding}
              className="w-full rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {isAdding ? "Ajout…" : "Ajouter"}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
