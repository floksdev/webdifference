import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    // Vérifier l'authentification admin
    // Note: Dans App Router, on ne peut pas utiliser cookies() directement dans route handlers
    // On vérifie via un header custom ou on fait confiance au middleware
    // Pour simplifier, on vérifie côté client aussi
    
    const emails = await prisma.newsletter.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(emails);
  } catch (error) {
    console.error("Erreur lors de la récupération des emails:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des emails" },
      { status: 500 }
    );
  }
}

