"use client";

import { useEffect, useState } from "react";
import { AdminLoginModal } from "./admin-login-modal";
import { isAdminAuthenticated as checkAdminAuth, onAuthStateChange } from "@/lib/admin-auth";

export function AdminShortcut() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setIsAdminAuthenticated(checkAdminAuth());
    const unsubscribe = onAuthStateChange((authenticated) => {
      setIsAdminAuthenticated(authenticated);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Raccourci clavier secret : Ctrl+Shift+E (fonctionne sur Mac et Windows)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+E (fonctionne sur Mac avec Cmd et Windows avec Ctrl)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "e"
      ) {
        e.preventDefault();
        e.stopPropagation();
        
        // Vérifier l'état d'authentification à chaque fois (au cas où l'utilisateur s'est déconnecté)
        const isCurrentlyAuthenticated = checkAdminAuth();
        
        if (isCurrentlyAuthenticated) {
          console.log("Vous êtes déjà connecté en tant qu'admin.");
          return;
        }
        
        console.log("Raccourci admin détecté ! Ouverture du modal...");
        setShowAdminModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return (
    <AdminLoginModal
      isOpen={showAdminModal}
      onClose={() => setShowAdminModal(false)}
      onSuccess={() => {
        setIsAdminAuthenticated(true);
        window.location.reload();
      }}
    />
  );
}

