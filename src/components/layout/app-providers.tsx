"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
  );
}
