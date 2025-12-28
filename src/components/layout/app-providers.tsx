"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { AdminShortcut } from "@/components/admin/admin-shortcut";

export function AppProviders({ children }: PropsWithChildren) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <>
        {children}
        <AdminShortcut />
      </>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
      <AdminShortcut />
    </ClerkProvider>
  );
}
