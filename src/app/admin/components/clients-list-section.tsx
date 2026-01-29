"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ClientDocuments } from "./client-documents";
import { ClientDocumentsForm } from "./client-documents-form";
import { supabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { AddressAutocomplete } from "./address-autocomplete";

type Client = {
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
  status: "TODO" | "IN_PROGRESS" | "DONE";
  paymentStatus: "PENDING" | "DEPOSIT_PAID" | "PAID";
  totalRevenue: number | null;
  depositAmount: number | null;
  salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE" | null;
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
};

type Document = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  documentType: string;
  createdAt: string;
};

export function ClientsListSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [createdClientId, setCreatedClientId] = useState<string | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"" | "TODO" | "IN_PROGRESS" | "DONE">("");
  const [filterPayment, setFilterPayment] = useState<"" | "PENDING" | "DEPOSIT_PAID" | "PAID">("");
  const [filterSalesRep, setFilterSalesRep] = useState<"" | "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE" | "NONE">("");
  const [editClient, setEditClient] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    phoneCountryCode: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    paymentStatus: "PENDING" | "DEPOSIT_PAID" | "PAID";
    totalRevenue: number;
    depositAmount: number;
    salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE" | null;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    phoneCountryCode: "+33",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    status: "TODO",
    paymentStatus: "PENDING",
    totalRevenue: 0,
    depositAmount: 0,
    salesRep: null,
  });
  const [newClient, setNewClient] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    phoneCountryCode: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    paymentStatus: "PENDING" | "DEPOSIT_PAID" | "PAID";
    totalRevenue: number;
    depositAmount: number;
    salesRep: "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE" | null;
    createdAt: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    phoneCountryCode: "+33", // Code pays par défaut (France)
    address: "",
    postalCode: "",
    city: "",
    country: "France",
    status: "TODO",
    paymentStatus: "PENDING",
    totalRevenue: 0,
    depositAmount: 0,
    salesRep: null,
    createdAt: new Date().toISOString().split("T")[0], // Date d'aujourd'hui au format YYYY-MM-DD
  });

  useEffect(() => {
    fetchClients();
  }, []);

  // Filtrer les clients selon la recherche
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredClients(clients);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredClients(
        clients.filter(
          (client) =>
            client.firstName.toLowerCase().includes(query) ||
            client.lastName.toLowerCase().includes(query) ||
            `${client.firstName} ${client.lastName}`.toLowerCase().includes(query) ||
            client.email.toLowerCase().includes(query) ||
            (client.company && client.company.toLowerCase().includes(query))
        )
      );
    }
  }, [searchQuery, clients]);

  async function fetchClients() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/admin/clients", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des clients");
      }

      const data = await response.json();
      // Charger les documents pour chaque client
      const clientsWithDocs = await Promise.all(
        data.map(async (client: Client) => {
          try {
            const docsResponse = await fetch(`/api/admin/clients/${client.id}/documents`, {
              cache: "no-store",
            });
            const documents = docsResponse.ok ? await docsResponse.json() : [];
            return { ...client, documents };
          } catch {
            return { ...client, documents: [] };
          }
        })
      );
      setClients(clientsWithDocs);
      setFilteredClients(clientsWithDocs);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de charger la liste des clients");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteClient(clientId: string, clientName: string) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le client "${clientName}" ?\n\nCette action supprimera également tous les documents associés et ne peut pas être annulée.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du client");
      }

      // Recharger la liste
      await fetchClients();
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur lors de la suppression du client. Veuillez réessayer.");
    }
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

  const getStatusMeta = (status: Client["status"]) => {
    if (status === "DONE") {
      return {
        label: "Terminé",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        row: "bg-emerald-50/40",
      };
    }
    if (status === "IN_PROGRESS") {
      return {
        label: "En cours",
        badge: "bg-amber-100 text-amber-800 border-amber-200",
        row: "bg-amber-50/40",
      };
    }
    return {
      label: "À faire",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      row: "bg-slate-50/40",
    };
  };

  const getPaymentMeta = (status: Client["paymentStatus"]) => {
    if (status === "PAID") {
      return {
        label: "Total payé",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    }
    if (status === "DEPOSIT_PAID") {
      return {
        label: "Acompte payé",
        badge: "bg-sky-100 text-sky-800 border-sky-200",
      };
    }
    return {
      label: "En attente",
      badge: "bg-rose-100 text-rose-800 border-rose-200",
    };
  };

  const getSalesRepBadge = (salesRep: Client["salesRep"]) => {
    if (salesRep === "TRISTAN_WEHRLE") {
      return {
        label: "TW",
        className: "bg-emerald-400 text-emerald-950",
      };
    }
    if (salesRep === "FREDERIC_WEHRLE") {
      return {
        label: "FW",
        className: "bg-amber-300 text-amber-950",
      };
    }
    return {
      label: "N/A",
      className: "bg-pink-300 text-pink-950",
    };
  };

  const sortedClients = useMemo(() => {
    const collator = new Intl.Collator("fr", { sensitivity: "base" });

    const data = filteredClients.filter((client) => {
      if (filterStatus && client.status !== filterStatus) return false;
      if (filterPayment && client.paymentStatus !== filterPayment) return false;
      if (filterSalesRep === "NONE" && client.salesRep) return false;
      if (
        filterSalesRep &&
        filterSalesRep !== "NONE" &&
        client.salesRep !== filterSalesRep
      ) {
        return false;
      }
      return true;
    });
    data.sort((a, b) => {
      const nameA = `${a.lastName} ${a.firstName}`.trim();
      const nameB = `${b.lastName} ${b.firstName}`.trim();
      return collator.compare(nameA, nameB);
    });

    return data;
  }, [filteredClients, filterPayment, filterSalesRep, filterStatus]);

  const startEditClient = (client: Client) => {
    const { countryCode, phoneNumber } = parsePhone(client.phone);
    setExpandedClient(client.id);
    setEditingClientId(client.id);
    setEditClient({
      firstName: client.firstName || "",
      lastName: client.lastName || "",
      email: client.email || "",
      company: client.company || "",
      phone: phoneNumber,
      phoneCountryCode: countryCode,
      address: client.address || "",
      postalCode: client.postalCode || "",
      city: client.city || "",
      country: client.country || "",
      status: client.status || "TODO",
      paymentStatus: client.paymentStatus || "PENDING",
      totalRevenue: client.totalRevenue ?? 0,
      depositAmount: client.depositAmount ?? 0,
      salesRep: client.salesRep ?? null,
    });
  };

  const cancelEditClient = () => {
    setEditingClientId(null);
  };

  async function handleUpdateClient(clientId: string) {
    if (!editClient.firstName || !editClient.lastName || !editClient.email) {
      alert("Le prénom, le nom et l'email sont requis");
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: editClient.firstName,
          lastName: editClient.lastName,
          email: editClient.email,
          company: editClient.company || null,
          phone: editClient.phone
            ? `${editClient.phoneCountryCode} ${editClient.phone}`.trim()
            : null,
          address: editClient.address || null,
          postalCode: editClient.postalCode || null,
          city: editClient.city || null,
          country: editClient.country || null,
          status: editClient.status,
          paymentStatus: editClient.paymentStatus,
          totalRevenue: typeof editClient.totalRevenue === "number" ? editClient.totalRevenue : 0,
          depositAmount: typeof editClient.depositAmount === "number" ? editClient.depositAmount : 0,
          salesRep: editClient.salesRep ?? null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erreur lors de la mise à jour du client");
      }

      await fetchClients();
      setEditingClientId(null);
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur lors de la mise à jour du client. Veuillez réessayer.");
    }
  }

  async function uploadPendingFiles(clientId: string, files: File[]) {
    if (!isSupabaseConfigured) {
      console.warn("Supabase n'est pas configuré. Les fichiers ne seront pas uploadés.");
      return;
    }

    try {
      const uploadPromises = files.map(async (file) => {
        // Déterminer le type de document
        let documentType = "OTHER";
        const fileName = file.name.toLowerCase();
        if (fileName.includes("devis") || fileName.includes("quote")) {
          documentType = "QUOTE";
        } else if (fileName.includes("facture") || fileName.includes("invoice")) {
          documentType = "INVOICE";
        } else if (fileName.includes("contrat") || fileName.includes("contract")) {
          documentType = "CONTRACT";
        }

        // Upload vers Supabase Storage via API route (bypass RLS)
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("clientId", clientId);

        const uploadResponse = await fetch("/api/admin/clients/documents/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Erreur lors de l'upload vers Supabase");
        }

        const { fileUrl: publicUrl } = await uploadResponse.json();

        // Enregistrer dans la base de données
        const response = await fetch("/api/admin/clients/documents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId,
            fileName: file.name,
            fileUrl: publicUrl,
            fileType: file.type || "application/pdf",
            fileSize: file.size,
            documentType,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'enregistrement du document");
        }
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Erreur lors de l'upload des fichiers en attente:", error);
      alert("Certains fichiers n'ont pas pu être uploadés. Vous pourrez les ajouter manuellement.");
    }
  }

  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault();

    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      alert("Le prénom, le nom et l'email sont requis");
      return;
    }

    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: newClient.firstName,
          lastName: newClient.lastName,
          email: newClient.email,
          company: newClient.company || null,
          phone: newClient.phone ? `${newClient.phoneCountryCode} ${newClient.phone}` : null,
          address: newClient.address || null,
          postalCode: newClient.postalCode || null,
          city: newClient.city || null,
          country: newClient.country || null,
          status: newClient.status,
          paymentStatus: newClient.paymentStatus,
          totalRevenue: typeof newClient.totalRevenue === "number" ? newClient.totalRevenue : 0,
          depositAmount: typeof newClient.depositAmount === "number" ? newClient.depositAmount : 0,
          salesRep: newClient.salesRep ?? null,
          createdAt: newClient.createdAt ? new Date(newClient.createdAt) : new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du client");
      }

      const createdClient = await response.json();
      setCreatedClientId(createdClient.id);

      // Uploader les fichiers en attente si il y en a
      if (pendingFiles.length > 0) {
        await uploadPendingFiles(createdClient.id, pendingFiles);
        setPendingFiles([]);
      }

      // Recharger la liste
      await fetchClients();
      
      // Ne pas fermer le formulaire, juste réinitialiser les champs pour permettre l'ajout de documents
      setNewClient({ firstName: "", lastName: "", email: "", company: "", phone: "", phoneCountryCode: "+33", address: "", postalCode: "", city: "", country: "France", status: "TODO", paymentStatus: "PENDING", totalRevenue: 0, depositAmount: 0, salesRep: null, createdAt: new Date().toISOString().split("T")[0] });
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur lors de la création du client. Veuillez réessayer.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Clients</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white/60">
            {filteredClients.length} / {clients.length}{" "}
            {clients.length === 1 ? "client" : "clients"}
          </div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-white/40 hover:bg-white/10"
          >
            + Nouveau client
          </button>
        </div>
      </div>

      {/* Formulaire de création */}
      {isCreating && (
        <div className="mb-6 rounded-xl border border-white/20 bg-white/5 p-4">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Nouveau client
          </h2>
          <form onSubmit={handleCreateClient} className="space-y-3">
            <div className="grid gap-2 grid-cols-2">
              <input
                type="text"
                placeholder="Prénom"
                value={newClient.firstName}
                onChange={(e) =>
                  setNewClient({ ...newClient, firstName: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Nom"
                value={newClient.lastName}
                onChange={(e) =>
                  setNewClient({ ...newClient, lastName: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email du client"
              value={newClient.email}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              required
            />
            <div className="grid gap-2 grid-cols-2">
              <input
                type="text"
                placeholder="Entreprise"
                value={newClient.company}
                onChange={(e) =>
                  setNewClient({ ...newClient, company: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <div className="flex gap-1">
                <select
                  value={newClient.phoneCountryCode}
                  onChange={(e) =>
                    setNewClient({ ...newClient, phoneCountryCode: e.target.value })
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
                  type="tel"
                  placeholder="Téléphone"
                  value={newClient.phone}
                  onChange={(e) =>
                    setNewClient({ ...newClient, phone: e.target.value })
                  }
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
            <AddressAutocomplete
              value={newClient.address}
              onChange={(address) =>
                setNewClient({ ...newClient, address })
              }
              onSelect={(addressData) => {
                setNewClient({
                  ...newClient,
                  address: addressData.address,
                  postalCode: addressData.postalCode,
                  city: addressData.city,
                  country: addressData.country,
                });
              }}
              placeholder="Adresse (commencez à taper pour l'autocomplétion)"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <div className="grid gap-2 grid-cols-3">
              <input
                type="text"
                placeholder="Code postal"
                value={newClient.postalCode}
                onChange={(e) =>
                  setNewClient({ ...newClient, postalCode: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Ville"
                value={newClient.city}
                onChange={(e) =>
                  setNewClient({ ...newClient, city: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              <select
                value={newClient.country}
                onChange={(e) =>
                  setNewClient({ ...newClient, country: e.target.value })
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
            <div className="grid gap-2 grid-cols-2">
              <select
                value={newClient.status}
                onChange={(e) =>
                  setNewClient({ ...newClient, status: e.target.value as "TODO" | "IN_PROGRESS" | "DONE" })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                <option value="TODO">À faire</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="DONE">Terminé</option>
              </select>
              <select
                value={newClient.paymentStatus}
                onChange={(e) =>
                  setNewClient({ ...newClient, paymentStatus: e.target.value as "PENDING" | "DEPOSIT_PAID" | "PAID" })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                <option value="PENDING">En attente de paiement</option>
                <option value="DEPOSIT_PAID">Acompte payé</option>
                <option value="PAID">Total payé</option>
              </select>
              {newClient.paymentStatus === "DEPOSIT_PAID" && (
                <input
                  type="number"
                  min={0}
                  step="1"
                  placeholder="Montant acompte (€)"
                  value={newClient.depositAmount}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    setNewClient((prev) => ({
                      ...prev,
                      depositAmount: v,
                      totalRevenue: (prev.totalRevenue ?? 0) - (prev.depositAmount ?? 0) + v,
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 col-span-2"
                />
              )}
            </div>
            <select
              value={newClient.salesRep ?? ""}
              onChange={(e) =>
                setNewClient({
                  ...newClient,
                  salesRep: e.target.value
                    ? (e.target.value as "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE")
                    : null,
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            >
              <option value="">Aucun commercial</option>
              <option value="TRISTAN_WEHRLE">Tristan Wehrle</option>
              <option value="FREDERIC_WEHRLE">Fréderic Wehrle</option>
            </select>
            <input
              type="number"
              min={0}
              step="1"
              placeholder="Total gagné (€)"
              value={newClient.totalRevenue}
              onChange={(e) =>
                setNewClient({ ...newClient, totalRevenue: Number(e.target.value) || 0 })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="date"
              placeholder="Date d'ajout"
              value={newClient.createdAt}
              onChange={(e) =>
                setNewClient({ ...newClient, createdAt: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            
            {/* Zone de drag & drop pour les documents */}
            <ClientDocumentsForm
              pendingFiles={pendingFiles}
              onFilesChange={setPendingFiles}
            />
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-gradient-to-r from-[#71DDAE] via-[#5BCA9D] to-[#2A9D7A] px-4 py-2 text-xs font-bold text-[#1C1C1C] transition hover:shadow-lg"
              >
                Créer
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setCreatedClientId(null);
                  setPendingFiles([]);
                  setNewClient({ firstName: "", lastName: "", email: "", company: "", phone: "", phoneCountryCode: "+33", address: "", postalCode: "", city: "", country: "France", status: "TODO", paymentStatus: "PENDING", totalRevenue: 0, depositAmount: 0, salesRep: null, createdAt: new Date().toISOString().split("T")[0] });
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          </form>

          {/* Section documents après création du client */}
          {createdClientId && (() => {
            const createdClient = clients.find(c => c.id === createdClientId);
            return (
            <div className="mt-4 border-t border-white/10 pt-4">
              <ClientDocuments
                clientId={createdClientId}
                clientName={createdClient ? `${createdClient.firstName} ${createdClient.lastName}` : "Nouveau client"}
                documents={createdClient?.documents || []}
                onDocumentsUpdate={async () => {
                  await fetchClients();
                }}
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setCreatedClientId(null);
                  setNewClient({ firstName: "", lastName: "", email: "", company: "", phone: "", phoneCountryCode: "+33", address: "", postalCode: "", city: "", country: "France", status: "TODO", paymentStatus: "PENDING", totalRevenue: 0, depositAmount: 0, salesRep: null, createdAt: new Date().toISOString().split("T")[0] });
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Fermer
                </button>
              </div>
            </div>
            );
          })()}
        </div>
      )}

      {/* Barre de recherche */}
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[220px] rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="rounded-lg border border-white/10 bg-[#1C1C1C] px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
            style={{ colorScheme: "dark" }}
          >
            <option value="">Statut (tous)</option>
            <option value="TODO">À faire</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="DONE">Terminé</option>
          </select>
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value as typeof filterPayment)}
            className="rounded-lg border border-white/10 bg-[#1C1C1C] px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
            style={{ colorScheme: "dark" }}
          >
            <option value="">Paiement (tous)</option>
            <option value="PENDING">En attente</option>
            <option value="DEPOSIT_PAID">Acompte payé</option>
            <option value="PAID">Total payé</option>
          </select>
          <select
            value={filterSalesRep}
            onChange={(e) => setFilterSalesRep(e.target.value as typeof filterSalesRep)}
            className="rounded-lg border border-white/10 bg-[#1C1C1C] px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
            style={{ colorScheme: "dark" }}
          >
            <option value="">Commercial (tous)</option>
            <option value="TRISTAN_WEHRLE">Tristan Wehrle</option>
            <option value="FREDERIC_WEHRLE">Fréderic Wehrle</option>
            <option value="NONE">N/A</option>
          </select>
          <button
            type="button"
            onClick={() => {
              setFilterStatus("");
              setFilterPayment("");
              setFilterSalesRep("");
            }}
            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/20"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-white/60">Chargement...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/60">Aucun client pour le moment</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/60">Aucun résultat pour "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedClients.map((client) => {
            const statusMeta = getStatusMeta(client.status);
            const paymentMeta = getPaymentMeta(client.paymentStatus);
            const isExpanded = expandedClient === client.id;
            return (
              <div
                key={client.id}
                className={`rounded-2xl border border-white/10 bg-white/5 p-4 transition ${statusMeta.row}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {client.firstName} {client.lastName}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusMeta.badge}`}
                      >
                        {statusMeta.label}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${paymentMeta.badge}`}
                      >
                        {paymentMeta.label}
                      </span>
                    </div>
                    <p className="text-sm text-white/70">{client.company || "Entreprise non renseignée"}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-white/60">
                      <span>{client.email}</span>
                      <span>{client.phone || "-"}</span>
                      <span>
                        Créé le{" "}
                        {new Date(client.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/80">
                      Total gagné{" "}
                      <span className="font-semibold text-white">
                        {(client.totalRevenue ?? 0).toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    {client.paymentStatus === "DEPOSIT_PAID" && (client.depositAmount ?? 0) > 0 && (
                      <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white/70">
                        Acompte{" "}
                        <span className="font-semibold text-white">
                          {(client.depositAmount ?? 0).toLocaleString("fr-FR")} €
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        setExpandedClient(isExpanded ? null : client.id)
                      }
                      className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/20"
                    >
                      {isExpanded ? "Masquer" : "Voir"} documents ({client.documents?.length || 0})
                    </button>
                    <button
                      onClick={() => startEditClient(client)}
                      className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/20"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id, `${client.firstName} ${client.lastName}`)}
                      className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/20"
                    >
                      Supprimer
                    </button>
                    <span
                      className={`ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${getSalesRepBadge(client.salesRep).className}`}
                      title={
                        client.salesRep === "TRISTAN_WEHRLE"
                          ? "Tristan Wehrle"
                          : client.salesRep === "FREDERIC_WEHRLE"
                            ? "Fréderic Wehrle"
                            : "Non assigné"
                      }
                    >
                      {getSalesRepBadge(client.salesRep).label}
                    </span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_2fr]">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <h4 className="text-sm font-semibold text-white mb-3">
                        Infos client
                      </h4>
                      {(editingClientId === client.id ? (
                        <div className="space-y-3">
                          {editClient ? (
                          <>
                          <div className="grid gap-2 grid-cols-2">
                            <input
                              placeholder="Prénom"
                              value={editClient.firstName}
                              onChange={(e) =>
                                setEditClient({ ...editClient, firstName: e.target.value })
                              }
                              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            />
                            <input
                              placeholder="Nom"
                              value={editClient.lastName}
                              onChange={(e) =>
                                setEditClient({ ...editClient, lastName: e.target.value })
                              }
                              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            />
                          </div>
                          <input
                            type="email"
                            placeholder="Email"
                            value={editClient.email}
                            onChange={(e) =>
                              setEditClient({ ...editClient, email: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                          />
                          <input
                            placeholder="Entreprise"
                            value={editClient.company}
                            onChange={(e) =>
                              setEditClient({ ...editClient, company: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                          />
                          <div className="flex gap-1">
                            <select
                              value={editClient.phoneCountryCode}
                              onChange={(e) =>
                                setEditClient({ ...editClient, phoneCountryCode: e.target.value })
                              }
                              className="w-20 rounded-lg border border-white/10 bg-white/10 px-2 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
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
                              value={editClient.phone}
                              onChange={(e) =>
                                setEditClient({ ...editClient, phone: e.target.value })
                              }
                              className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            />
                          </div>
                          <AddressAutocomplete
                            value={editClient.address}
                            onChange={(address) =>
                              setEditClient({ ...editClient, address })
                            }
                            onSelect={(addressData) => {
                              setEditClient({
                                ...editClient,
                                address: addressData.address,
                                postalCode: addressData.postalCode,
                                city: addressData.city,
                                country: addressData.country,
                              });
                            }}
                            placeholder="Adresse"
                            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                          />
                          <div className="grid gap-2 grid-cols-3">
                            <input
                              placeholder="Code postal"
                              value={editClient.postalCode}
                              onChange={(e) =>
                                setEditClient({ ...editClient, postalCode: e.target.value })
                              }
                              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            />
                            <input
                              placeholder="Ville"
                              value={editClient.city}
                              onChange={(e) =>
                                setEditClient({ ...editClient, city: e.target.value })
                              }
                              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            />
                            <select
                              value={editClient.country}
                              onChange={(e) =>
                                setEditClient({ ...editClient, country: e.target.value })
                              }
                              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            >
                              <option value="">Pays</option>
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
                          <div className="grid gap-2 grid-cols-2">
                            <select
                              value={editClient.status}
                              onChange={(e) =>
                                setEditClient({ ...editClient, status: e.target.value as "TODO" | "IN_PROGRESS" | "DONE" })
                              }
                              className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                              style={{ colorScheme: "dark" }}
                            >
                              <option value="TODO">À faire</option>
                              <option value="IN_PROGRESS">En cours</option>
                              <option value="DONE">Terminé</option>
                            </select>
                            <select
                              value={editClient.paymentStatus}
                              onChange={(e) =>
                                setEditClient({ ...editClient, paymentStatus: e.target.value as "PENDING" | "DEPOSIT_PAID" | "PAID" })
                              }
                              className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                              style={{ colorScheme: "dark" }}
                            >
                              <option value="PENDING">En attente de paiement</option>
                              <option value="DEPOSIT_PAID">Acompte payé</option>
                              <option value="PAID">Total payé</option>
                            </select>
                            {editClient.paymentStatus === "DEPOSIT_PAID" && (
                              <input
                                type="number"
                                min={0}
                                step="1"
                                placeholder="Montant acompte (€)"
                                value={editClient.depositAmount}
                                onChange={(e) => {
                                  const v = Number(e.target.value) || 0;
                                  setEditClient((prev) => ({
                                    ...prev,
                                    depositAmount: v,
                                    totalRevenue: (prev.totalRevenue ?? 0) - (prev.depositAmount ?? 0) + v,
                                  }));
                                }}
                                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                              />
                            )}
                          </div>
                          <select
                            value={editClient.salesRep ?? ""}
                            onChange={(e) =>
                              setEditClient({
                                ...editClient,
                                salesRep: e.target.value
                                  ? (e.target.value as "TRISTAN_WEHRLE" | "FREDERIC_WEHRLE")
                                  : null,
                              })
                            }
                            className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-3 py-2 text-xs text-white outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                            style={{ colorScheme: "dark" }}
                          >
                            <option value="">Aucun commercial</option>
                            <option value="TRISTAN_WEHRLE">Tristan Wehrle</option>
                            <option value="FREDERIC_WEHRLE">Fréderic Wehrle</option>
                          </select>
                          <input
                            type="number"
                            min={0}
                            step="1"
                            placeholder="Total gagné (€)"
                            value={editClient.totalRevenue}
                            onChange={(e) =>
                              setEditClient({ ...editClient, totalRevenue: Number(e.target.value) || 0 })
                            }
                            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-1 focus:ring-white/20"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateClient(client.id)}
                              className="flex-1 rounded-lg bg-[#71DDAE] px-3 py-2 text-xs font-semibold text-[#1C1C1C] transition hover:bg-[#5BCA9D]"
                            >
                              Enregistrer
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditClient}
                              className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10"
                            >
                              Annuler
                            </button>
                          </div>
                          </>
                      ) : (
                        <div className="space-y-2 text-sm text-white/80">
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Nom</span>
                            <span className="font-medium">
                              {client.firstName} {client.lastName}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Email</span>
                            <span className="font-medium">{client.email}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Téléphone</span>
                            <span className="font-medium">{client.phone || "-"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Entreprise</span>
                            <span className="font-medium">{client.company || "-"}</span>
                          </div>
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-white/50">Adresse</span>
                            <span className="text-right font-medium">
                              {client.address || "-"}
                              {(client.postalCode || client.city || client.country) && (
                                <>
                                  <br />
                                  <span className="text-xs text-white/60">
                                    {[client.postalCode, client.city, client.country]
                                      .filter(Boolean)
                                      .join(" ")}
                                  </span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                      ) : (
                        <div className="space-y-2 text-sm text-white/80">
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Nom</span>
                            <span className="font-medium">
                              {client.firstName} {client.lastName}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Email</span>
                            <span className="font-medium">{client.email}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Téléphone</span>
                            <span className="font-medium">{client.phone || "-"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50">Entreprise</span>
                            <span className="font-medium">{client.company || "-"}</span>
                          </div>
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-white/50">Adresse</span>
                            <span className="text-right font-medium">
                              {client.address || "-"}
                              {(client.postalCode || client.city || client.country) && (
                                <>
                                  <br />
                                  <span className="text-xs text-white/60">
                                    {[client.postalCode, client.city, client.country]
                                      .filter(Boolean)
                                      .join(" ")}
                                  </span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <ClientDocuments
                        clientId={client.id}
                        clientName={`${client.firstName} ${client.lastName}`}
                        documents={client.documents || []}
                        onDocumentsUpdate={async () => {
                          await fetchClients();
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

