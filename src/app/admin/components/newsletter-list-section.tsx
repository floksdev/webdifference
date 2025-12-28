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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  async function fetchEmails() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/admin/newsletter");
      
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des emails");
      }
      
      const data = await response.json();
      setEmails(data);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de charger la liste des emails");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Newsletter</h1>
        <div className="text-sm text-white/60">
          {emails.length} {emails.length === 1 ? "email" : "emails"}
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
      ) : emails.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/60">Aucun email inscrit pour le moment</p>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {emails.map((item) => (
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

