import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer le document
    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document introuvable" },
        { status: 404 }
      );
    }

    // Supprimer le fichier de Supabase Storage si configuré
    if (isSupabaseConfigured && document.fileUrl) {
      try {
        // Extraire le chemin du fichier depuis l'URL
        const url = new URL(document.fileUrl);
        const pathParts = url.pathname.split("/");
        const bucket = pathParts[1]; // "client-documents"
        const filePath = pathParts.slice(2).join("/"); // reste du chemin

        await supabaseClient.storage.from(bucket).remove([filePath]);
      } catch (storageError) {
        console.error("Erreur lors de la suppression du fichier:", storageError);
        // On continue quand même pour supprimer l'entrée en base
      }
    }

    // Supprimer l'entrée en base de données
    await prisma.document.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du document" },
      { status: 500 }
    );
  }
}

