"use client";

import { useEffect, useState } from "react";

type NewsletterEmail = {
  id: string;
  email: string;
  createdAt: string;
};

export function NewsletterListSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [emails, setEmails] = useState<NewsletterEmail[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<NewsletterEmail[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    syncClientsThenFetch();
  }, []);

  async function syncClientsThenFetch() {
    try {
      setIsLoading(true);
      setError(null);
      // Synchroniser les clients existants vers la newsletter (chaque client est ajouté automatiquement)
      await fetch("/api/admin/newsletter/sync-clients", { method: "POST" });
      await fetchEmails();
    } catch {
      await fetchEmails();
    }
  }

  async function fetchEmails() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/admin/newsletter", {
        cache: "no-store",
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des emails");
      }
      
      const data = await response.json();
      setEmails(data);
      setFilteredEmails(data);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de charger la liste des emails");
    } finally {
      setIsLoading(false);
    }
  }

  // Filtrer les emails selon la recherche
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEmails(emails);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredEmails(
        emails.filter((email) =>
          email.email.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, emails]);

  async function handleUnsubscribe(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir désinscrire cet email ?")) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/admin/newsletter/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la désinscription");
      }

      // Mettre à jour la liste
      setEmails(emails.filter((email) => email.id !== id));
      setFilteredEmails(filteredEmails.filter((email) => email.id !== id));
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur lors de la désinscription. Veuillez réessayer.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Newsletter</h1>
        <div className="text-sm text-white/60">
          {filteredEmails.length} / {emails.length} {emails.length === 1 ? "email" : "emails"}
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-white/60">Chargement...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      ) : emails.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/60">Aucun email inscrit pour le moment</p>
        </div>
      ) : filteredEmails.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/60">Aucun résultat pour "{searchQuery}"</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmails.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleUnsubscribe(item.id)}
                        disabled={deletingId === item.id}
                        className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === item.id ? "Suppression..." : "Désinscrire"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

