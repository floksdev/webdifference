import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, fileName, fileUrl, fileType, fileSize, documentType } = body;

    // Validation
    if (!clientId || !fileName || !fileUrl) {
      return NextResponse.json(
        { error: "clientId, fileName et fileUrl sont requis" },
        { status: 400 }
      );
    }

    // Vérifier que le client existe
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client introuvable" },
        { status: 404 }
      );
    }

    // Créer le document
    const document = await prisma.document.create({
      data: {
        clientId,
        fileName: fileName.trim(),
        fileUrl: fileUrl.trim(),
        fileType: fileType || "application/pdf",
        fileSize: fileSize || 0,
        documentType: documentType || "OTHER",
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du document:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Erreur inconnue lors de la création du document";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

