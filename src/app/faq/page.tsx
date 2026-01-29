import { FaqSection } from "@/components/sections/faq-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <>
      <FaqSection />
    </>
  );
}



