import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation de l'email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'adresse email est requise." },
        { status: 400 }
      );
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Le format de l'adresse email est invalide." },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existing = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Cette adresse email est déjà inscrite à notre newsletter." },
        { status: 409 }
      );
    }

    // Enregistrer l'email
    await prisma.newsletter.create({
      data: {
        email: email.toLowerCase().trim(),
      },
    });

    return NextResponse.json(
      { message: "Inscription réussie ! Vous recevrez bientôt nos actualités." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription à la newsletter:", error);
    
    // Gestion des erreurs Prisma
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Cette adresse email est déjà inscrite à notre newsletter." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}

