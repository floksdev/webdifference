import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos offres",
};

export default function OffresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

