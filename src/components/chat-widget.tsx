"use client";

import {
  authenticateAdmin,
  createAdminSession,
  isAdminAuthenticated as checkAdminAuth,
  logoutAdmin,
  onAuthStateChange,
} from "@/lib/admin-auth";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "webdifference.chat-widget.open";
const ADMIN_TRIGGER = "admin access 2025";

// Type modifié pour inclure éventuellement des actions CTA
type ChatEntry = {
  role: "user" | "assistant";
  content: string;
  actions?: { label: string; href: string }[];
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isAttention, setIsAttention] = useState(false);
  const [attentionCounter, setAttentionCounter] = useState(0);
  const [pendingMessage, setPendingMessage] = useState("");
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      role: "assistant",
      content:
        "Bonjour 👋 Je suis disponible pour avancer sur votre projet ou répondre à vos questions.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);

  // Chargement de l'état ouvert/fermé depuis localStorage
  useEffect(() => {
    setHasMounted(true);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setOpen(true);
    }
  }, []);

  // Sauvegarde de l'état ouvert/fermé
  useEffect(() => {
    if (!hasMounted) return;
    window.localStorage.setItem(STORAGE_KEY, open ? "true" : "false");
  }, [open, hasMounted]);

  // Animation du halo
  useEffect(() => {
    if (open) {
      setIsAttention(false);
      return;
    }
    const triggerAttention = () => {
      setIsAttention(true);
      setAttentionCounter((count) => count + 1);
    };
    const interval = window.setInterval(triggerAttention, 6500);
    const timeout = window.setTimeout(triggerAttention, 1200);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    if (!isAttention) return;
    const timeout = window.setTimeout(() => setIsAttention(false), 1600);
    return () => clearTimeout(timeout);
  }, [isAttention]);

  const badgeVisible = useMemo(
    () => !open && attentionCounter > 0,
    [open, attentionCounter],
  );

  useEffect(() => {
    setIsAdminAuthenticated(checkAdminAuth());
    const unsubscribe = onAuthStateChange((authenticated) => {
      setIsAdminAuthenticated(authenticated);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setAdminMenuOpen(isAdminAuthenticated);
  }, [isAdminAuthenticated]);

  // Défilement automatique lorsque messages ou état de frappe change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop =
        messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping, open]);

  // Prompt système pour GPT (inchangé)
  const systemPrompt = {
    role: "system",
    content:
      "Tu es un assistant virtuel et closer pour l'agence Web Difference. " +
      "Tu parles toujours en français au nom de l'agence et ne révèles jamais que tu es un modèle OpenAI. " +
      "Si l'utilisateur demande qui tu es, ne réponds jamais que tu es ChatGPT, GPT ou un modèle OpenAI. " +
      "Présente-toi plutôt comme l'assistant virtuel de l'agence Web Difference, prêt à accompagner dans leurs projets digitaux. " +
      "Ta mission est d'accompagner les visiteurs dans la définition et la réalisation de leurs projets web et mobiles, " +
      "et de les amener à devenir clients, en utilisant des techniques de vente éthiques. " +
      "Structure tes réponses selon la méthode AIDA : commence par attirer l'attention (présentation claire et accrocheuse), " +
      "puis crée l'intérêt en soulignant les bénéfices de nos services, éveille le désir en montrant l'impact positif pour leur projet, " +
      "et termine par une incitation à l'action (proposer un rendez-vous, un devis, un appel ou un formulaire de contact). " +
      "Adapte ton argumentaire avec la méthode SONCAS selon les motivations perçues : " +
      "rassure sur la sécurité (qualité, fiabilité) ; valorise leur fierté (image de marque) ; propose des solutions innovantes ; " +
      "met en avant le confort et la simplicité de nos services ; explique le retour sur investissement (gain de temps, d'argent) ; " +
      "et adopte un ton chaleureux et empathique. " +
      "Si l'utilisateur demande à contacter Tristan, donne son numéro (+33600000000) et propose trois options : planifier un rendez-vous (https://cal.com/), appeler (tel:+33600000000) ou remplir le formulaire de contact (/contact). " +
      "Si l'utilisateur demande si quelque chose est possible, réponds toujours positivement et encourage-le à donner plus de détails. " +
      "Si l'utilisateur demande où trouver une section du site, fournis l'URL correspondante. " +
      "Si la demande sort du périmètre (ex. recettes de cuisine), recadre gentiment vers nos expertises digitales. " +
      "Reste professionnel, chaleureux et orienté client, et incite à l'action sans jamais être intrusif.",
  };

  // Appel à l'API OpenAI
  async function callOpenAIApi(
    currentMessages: ChatEntry[],
  ): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Aucune clé API définie. Ajoutez NEXT_PUBLIC_OPENAI_API_KEY dans votre .env.",
      );
    }
    const apiMessages = [
      systemPrompt,
      ...currentMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4", // ou "gpt-5" si disponible
          messages: apiMessages,
          max_tokens: 200,
          temperature: 0.7,
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      throw new Error(data.error?.message || "Erreur OpenAI");
    }
    return data.choices[0].message.content as string;
  }

  // Envoi du message utilisateur et traitement (CTA ou API)
  async function sendMessage() {
    const trimmed = pendingMessage.trim();
    if (!trimmed) return;

    // Ajoute le message utilisateur
    const userEntry: ChatEntry = { role: "user", content: trimmed };
    const updated: ChatEntry[] = [...messages, userEntry];
    setMessages(updated);
    setPendingMessage("");

    if (trimmed.toLowerCase() === ADMIN_TRIGGER) {
      setShowAdminModal(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ouverture du portail administrateur sécurisée. Veuillez vous authentifier.",
        },
      ]);
      return;
    }

    // Détecte une demande de contact
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("contact") ||
      lower.includes("contacter") ||
      lower.includes("joindre")
    ) {
      // Répond avec les CTA sans appel à GPT
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Choisissez l'option qui vous convient pour nous joindre :",
          actions: [
            {
              label: "📅 Planifier un rendez-vous",
              href: "https://cal.com/",
            },
            {
              label: "📞 Appeler Tristan",
              href: "tel:+33600000000",
            },
            {
              label: "✉️ Remplir le formulaire",
              href: "/contact",
            },
          ],
        },
      ]);
      return;
    }

    // Sinon, appel à l'API
    setIsTyping(true);
    try {
      const assistantReply = await callOpenAIApi(updated);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantReply.trim() },
      ]);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je ne parviens pas à obtenir de réponse pour l'instant.",
        },
      ]);
    }
  }

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
      setIsAdminAuthenticated(true);
      setShowAdminModal(false);
      setAdminEmail("");
      setAdminPassword("");
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

  async function handleAdminLogout() {
    logoutAdmin();
    setIsAdminAuthenticated(false);
    setAdminMenuOpen(false);
  }

  return (
    <>
      <aside className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", stiffness: 210, damping: 24 }}
              className="flex flex-col h-[420px] w-[360px] overflow-hidden rounded-[28px] border border-white/12 bg-white/8 p-5 text-white shadow-[0_40px_140px_-80px_rgba(21,94,239,0.55)] backdrop-blur-2xl"
            >
              {/* En-tête */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/10">
                    <Image
                      src="/test.jpg"
                      alt="Portrait de Tristan"
                      fill
                      className="object-cover"
                      sizes="40px"
                      priority
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Chat en direct
                    </h3>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-emerald-300">
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                      En ligne
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-2 py-1 text-xs text-white/60 transition hover:text-white/85"
                  aria-label="Réduire le chat"
                >
                  Fermer
                </button>
              </div>

              {/* Messages */}
              <div
                ref={messagesRef}
                className="mt-5 flex-1 space-y-3 text-sm text-white/80 overflow-y-auto pr-1 no-scrollbar"
              >
                {messages.map((msg, index) => {
                  if (msg.role === "user") {
                    return (
                      <div
                        key={index}
                        className="ml-auto max-w-[85%] w-fit rounded-2xl bg-[color:var(--color-primary)]/90 px-4 py-3 text-sm text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)]"
                      >
                        {msg.content.split("\n").map((line, i) => (
                          <p key={i} className="whitespace-pre-wrap">
                            {line}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  // Messages du bot
                  return (
                    <div
                      key={index}
                      className="max-w-[90%] w-fit rounded-2xl bg-white/10 px-4 py-3 text-white shadow-[0_6px_24px_rgba(148,163,184,0.15)]"
                    >
                      {msg.content.split("\n").map((line, i) => (
                        <p key={i} className="whitespace-pre-wrap">
                          {line}
                        </p>
                      ))}
                      {/* Affiche les CTA s'ils existent */}
                      {msg.actions && (
                        <div className="mt-3 flex flex-col gap-2">
                          {msg.actions.map((action) => (
                            <a
                              key={action.href + action.label}
                              href={action.href}
                              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/12"
                            >
                              <span>{action.label}</span>
                              <span
                                className="text-base text-white/70"
                                aria-hidden
                              >
                                ↗
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Indicateur de frappe */}
                {isTyping && (
                  <div className="max-w-[90%] w-fit rounded-2xl bg-white/10 px-4 py-3 text-white shadow-[0_6px_24px_rgba(148,163,184,0.15)]">
                    <TypingIndicator />
                  </div>
                )}
              </div>

              {/* Zone de saisie */}
              <form
                className="mt-5 flex items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_10px_36px_rgba(14,116,255,0.18)]"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <textarea
                  name="message"
                  placeholder="Écrire un message…"
                  className="max-h-32 min-h-[56px] flex-1 resize-none rounded-xl border border-transparent bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-white/30 focus:outline-none no-scrollbar"
                  autoComplete="off"
                  value={pendingMessage}
                  onChange={(e) =>
                    setPendingMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      (e.metaKey || e.ctrlKey) &&
                      e.key === "Enter"
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="submit"
                  className="inline-flex h-12 w-12 items-center justify-center self-center rounded-xl bg-[color:var(--color-primary)] text-white shadow-[0_12px_30px_rgba(59,130,246,0.35)] transition hover:scale-[1.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                  aria-label="Envoyer le message"
                >
                  <SendIcon className="h-5 w-5" />
                </button>
              </form>
              {isAdminAuthenticated && (
                <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-white/90">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Portail administrateur
                      </p>
                      <p className="text-xs text-white/70">
                        Accès exclusif Web Difference confirmé.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAdminLogout}
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                    >
                      Se déconnecter
                    </button>
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-left text-sm font-semibold text-white transition hover:border-white/20"
                    onClick={() => setAdminMenuOpen((prev) => !prev)}
                  >
                    <span>{isAdminMenuOpen ? "Masquer le menu admin" : "Afficher le menu admin"}</span>
                    <span aria-hidden>{isAdminMenuOpen ? "−" : "+"}</span>
                  </button>
                  {isAdminMenuOpen && (
                    <div className="mt-3 grid gap-2 text-sm">
                      <button
                        type="button"
                        className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-left font-semibold text-white transition hover:border-white/20 hover:bg-white/12"
                      >
                        📊 Vue analytique interne
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-left font-semibold text-white transition hover:border-white/20 hover:bg-white/12"
                      >
                        🧠 Scripts IA & prompts
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-left font-semibold text-white transition hover:border-white/20 hover:bg-white/12"
                      >
                        🛠️ Configuration CTA
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar flottant (mode réduit) */}
        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          whileTap={{ scale: 0.94 }}
          className="relative inline-flex h-16 w-16 items-center justify-center"
          aria-expanded={open}
          aria-label={
            open
              ? "Réduire la fenêtre de chat"
              : "Ouvrir la fenêtre de chat"
          }
        >
          <span
            className={`absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.55),_rgba(59,130,246,0))] blur-md transition-opacity duration-500 ${
              open ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          />
          <span className="relative inline-flex h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-white/10">
            <Image
              src="/test.jpg"
              alt="Portrait de Tristan"
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          </span>
          {badgeVisible && (
            <span className="absolute -top-1 -right-1 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[color:var(--color-primary)] px-1 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,0.45)]">
              1
            </span>
          )}
        </motion.button>
      </aside>

      {showAdminModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#0f172a]/95 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Accès administrateur</p>
                <p className="text-sm text-white/70">
                  Authentifiez-vous pour déverrouiller le menu caché.
                </p>
              </div>
              <button
                type="button"
                aria-label="Fermer la fenêtre d'authentification"
                className="text-white/60 transition hover:text-white"
                onClick={() => setShowAdminModal(false)}
              >
                ✕
              </button>
            </div>
            <form className="mt-5 space-y-4" onSubmit={handleAdminLogin}>
              <label className="space-y-2 text-sm text-white/80">
                <span>Adresse e-mail</span>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-white/40"
                  placeholder="admin@webdifference.fr"
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-white/80">
                <span>Mot de passe</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-white/40"
                  placeholder="********"
                  required
                />
              </label>
              {adminError && (
                <p className="text-sm text-rose-300">{adminError}</p>
              )}
              <button
                type="submit"
                disabled={isAdminLoading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400/90 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:opacity-70"
              >
                {isAdminLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Styles pour cacher les scrollbars */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

// Indicateur visuel de frappe (3 points animés)
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" />
    </div>
  );
}

type IconProps = {
  className?: string;
};

function SendIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.75 12.75 3 6l18 6-18 6 1.75-6.75L14 12l-9.25.75Z"
      />
    </svg>
  );
}
