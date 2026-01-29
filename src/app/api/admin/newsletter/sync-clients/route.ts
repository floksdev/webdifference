import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Synchronise tous les emails des clients vers la newsletter.
 * Chaque client existant est ajouté à la newsletter (upsert, sans doublon).
 */
export async function POST() {
  try {
    const clients = await prisma.client.findMany({
      select: { email: true },
    });

    let synced = 0;
    for (const { email } of clients) {
      const normalized = email.toLowerCase().trim();
      await prisma.newsletter.upsert({
        where: { email: normalized },
        create: { email: normalized },
        update: {},
      });
      synced += 1;
    }

    return NextResponse.json({ synced });
  } catch (error) {
    console.error("Erreur lors de la synchronisation clients → newsletter:", error);
    return NextResponse.json(
      { error: "Erreur lors de la synchronisation" },
      { status: 500 }
    );
  }
}
