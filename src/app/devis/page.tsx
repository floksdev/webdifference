import { redirect } from "next/navigation";

export default function DevisPage() {
  // Redirige vers la page offres qui contient le configurateur de devis
  redirect("/offres");
}

