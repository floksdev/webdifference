import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID de l'email requis" },
        { status: 400 }
      );
    }

    // Supprimer l'email de la newsletter
    await prisma.newsletter.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Email désinscrit avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'email:", error);
    
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json(
        { error: "Email introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la désinscription" },
      { status: 500 }
    );
  }
}

