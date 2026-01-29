import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Retourne le prochain numéro de devis disponible pour l'année en cours.
 * Format: WD-D-YYYY-XXX (ex: WD-D-2026-007)
 *
 * On calcule ce numéro à partir des documents de type QUOTE déjà enregistrés
 * en base (table `Document`), en analysant `fileName`.
 */
export async function GET() {
  try {
    const year = new Date().getFullYear();
    const prefix = `WD-D-${year}-`;

    // On récupère les devis existants de cette année (documents de type QUOTE)
    const existingQuotes = await prisma.document.findMany({
      where: {
        documentType: "QUOTE",
        fileName: {
          startsWith: prefix,
        },
      },
      select: { fileName: true },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    let maxSuffix = 0;

    for (const doc of existingQuotes) {
      const match = doc.fileName.match(/^WD-D-\d{4}-(\d{3})/);
      if (match) {
        const value = parseInt(match[1], 10);
        if (!Number.isNaN(value) && value > maxSuffix) {
          maxSuffix = value;
        }
      }
    }

    const nextIndex = maxSuffix + 1;
    const nextNumber = `${prefix}${String(nextIndex).padStart(3, "0")}`;

    return NextResponse.json({ nextNumber, nextIndex });
  } catch (error) {
    console.error("Erreur lors du calcul du prochain numéro de devis:", error);
    return NextResponse.json(
      { error: "Erreur lors du calcul du prochain numéro de devis" },
      { status: 500 }
    );
  }
}

