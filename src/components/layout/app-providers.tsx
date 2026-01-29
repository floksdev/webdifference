"use client";

import type { PropsWithChildren } from "react";
import { AdminShortcut } from "@/components/admin/admin-shortcut";

/**
 * Wrapper pour injecter les providers côté client.
 *
 * NOTE IMPORTANTE :
 * -----------------
 * L'intégration Clerk provoquait un runtime error
 * ("Cannot read properties of undefined (reading 'call')")
 * lié à la détection du router Pages vs App Router.
 *
 * En attendant de reconfigurer correctement Clerk pour l'App Router,
 * on désactive le `ClerkProvider` et on garde uniquement le raccourci admin.
 * L'auth Clerk côté front n'est donc plus active tant que cette intégration
 * n'est pas revue.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <AdminShortcut />
    </>
  );
}
