import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json({ features: [] });
    }

    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
      {
        headers: {
          Accept: "application/json",
        },
        // Timeout après 5 secondes
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      // Retourner un tableau vide au lieu d'une erreur
      return NextResponse.json({ features: [] });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // En cas d'erreur, retourner un tableau vide pour ne pas bloquer l'interface
    console.error("Erreur lors de la recherche d'adresse:", error);
    return NextResponse.json({ features: [] });
  }
}

