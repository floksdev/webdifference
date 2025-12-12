"use client";

const ADMIN_SESSION_KEY = "webdifference.admin.session";

export interface AdminSession {
  email: string;
  timestamp: number;
}

/**
 * Vérifie les identifiants admin contre les variables d'environnement
 */
export function authenticateAdmin(email: string, password: string): boolean {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error(
      "Variables d'environnement admin manquantes. Ajoutez NEXT_PUBLIC_ADMIN_EMAIL et NEXT_PUBLIC_ADMIN_PASSWORD dans votre .env.local"
    );
    return false;
  }

  return (
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
    password === adminPassword
  );
}

/**
 * Crée une session admin et la stocke dans localStorage
 */
export function createAdminSession(email: string): void {
  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    timestamp: Date.now(),
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

/**
 * Vérifie si une session admin valide existe
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return false;

    const session: AdminSession = JSON.parse(stored);
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!adminEmail) return false;

    // Vérifie que l'email correspond et que la session n'est pas trop ancienne (30 jours)
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 jours
    const isValid =
      session.email === adminEmail.trim().toLowerCase() &&
      Date.now() - session.timestamp < maxAge;

    if (!isValid) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }

    return isValid;
  } catch {
    return false;
  }
}

/**
 * Récupère l'email de la session admin actuelle
 */
export function getAdminEmail(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return null;

    const session: AdminSession = JSON.parse(stored);
    return session.email;
  } catch {
    return null;
  }
}

/**
 * Déconnecte l'admin (supprime la session)
 */
export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

/**
 * Hook pour écouter les changements d'authentification
 */
export function onAuthStateChange(
  callback: (isAuthenticated: boolean) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  // Vérification initiale
  callback(isAdminAuthenticated());

  // Écoute des changements de localStorage (pour synchroniser entre onglets)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === ADMIN_SESSION_KEY) {
      callback(isAdminAuthenticated());
    }
  };

  window.addEventListener("storage", handleStorageChange);

  // Polling pour détecter les changements dans le même onglet
  const interval = setInterval(() => {
    callback(isAdminAuthenticated());
  }, 1000);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    clearInterval(interval);
  };
}

