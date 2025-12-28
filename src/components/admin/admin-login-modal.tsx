"use client";

import {
  authenticateAdmin,
  createAdminSession,
} from "@/lib/admin-auth";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminLoginModalProps) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  async function handleAdminLogin(event: FormEvent) {
    event.preventDefault();
    setAdminError(null);
    setIsAdminLoading(true);
    try {
      const isValid = authenticateAdmin(adminEmail, adminPassword);
      if (!isValid) {
        throw new Error("Email ou mot de passe incorrect.");
      }
      createAdminSession(adminEmail);
      setAdminEmail("");
      setAdminPassword("");
      onSuccess();
      onClose();
    } catch (error) {
      setAdminError(
        error instanceof Error
          ? error.message
          : "Connexion impossible pour le moment.",
      );
    } finally {
      setIsAdminLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-1/2 top-1/2 z-[10000] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[color:var(--color-background-strong)] p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Connexion administrateur
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[color:var(--color-surface)]/80 px-4 py-3 text-sm text-white outline-none transition focus:border-[#71DDAE]/60 focus:ring-2 focus:ring-[#71DDAE]/20"
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[color:var(--color-surface)]/80 px-4 py-3 text-sm text-white outline-none transition focus:border-[#71DDAE]/60 focus:ring-2 focus:ring-[#71DDAE]/20"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {adminError && (
                <div className="rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm text-red-300">
                  {adminError}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isAdminLoading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#71DDAE] to-[#2A9D7A] px-4 py-3 text-sm font-extrabold text-[#1C1C1C] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isAdminLoading ? "Connexion..." : "se connecter"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

