import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Log pour debug (uniquement en développement)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL configuré:', !!supabaseUrl);
  console.log('Service Role Key configuré:', !!supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl) {
      console.error("NEXT_PUBLIC_SUPABASE_URL n'est pas défini");
      return NextResponse.json(
        { error: "NEXT_PUBLIC_SUPABASE_URL n'est pas défini dans les variables d'environnement" },
        { status: 500 }
      );
    }
    
    if (!supabaseServiceKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY n'est pas défini");
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY n'est pas défini dans les variables d'environnement. Consultez SUPABASE_SERVICE_ROLE_KEY.md pour les instructions." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const clientId = formData.get("clientId") as string;

    if (!file || !clientId) {
      return NextResponse.json(
        { error: "Fichier et clientId sont requis" },
        { status: 400 }
      );
    }

    // Créer un client Supabase avec la service role key (bypass RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const bucket = "client-documents";
    const fileId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${clientId}/${fileId}-${sanitizedName}`;

    // Upload vers Supabase Storage avec la service role key
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type || "application/pdf",
      });

    if (uploadError) {
      console.error("Erreur Supabase Storage:", uploadError);
      return NextResponse.json(
        { error: `Erreur lors de l'upload: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Obtenir l'URL publique
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({
      fileUrl: publicUrl,
      path,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Erreur inconnue lors de l'upload";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

