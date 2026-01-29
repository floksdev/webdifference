import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos projets",
};

export default function ProjetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

