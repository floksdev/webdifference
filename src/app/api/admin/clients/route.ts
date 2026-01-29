import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, address, postalCode, city, country, status, paymentStatus, totalRevenue, depositAmount, salesRep, createdAt } = body;

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Le prénom, le nom et l'email sont requis" },
        { status: 400 }
      );
    }

    const normalizedEmail = (email as string).toLowerCase().trim();

    // Vérifier si l'email existe déjà
    const existing = await prisma.client.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un client avec cet email existe déjà" },
        { status: 409 }
      );
    }

    const deposit = typeof depositAmount === "number" ? Math.max(0, depositAmount) : 0;
    const total = typeof totalRevenue === "number" ? Math.max(0, totalRevenue) : 0;

    // Créer le client (totalRevenue = total gagné, peut inclure l'acompte si envoyé ainsi par le front)
    const client = await prisma.client.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        postalCode: postalCode?.trim() || null,
        city: city?.trim() || null,
        country: country?.trim() || null,
        totalRevenue: total,
        depositAmount: deposit,
        status: status ?? "TODO",
        paymentStatus: paymentStatus ?? "PENDING",
        salesRep: salesRep ?? null,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
      },
    });

    // Ajouter l'email du client à la newsletter (inscription automatique)
    await prisma.newsletter.upsert({
      where: { email: normalizedEmail },
      create: { email: normalizedEmail },
      update: {},
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du client:", error);

    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Un client avec cet email existe déjà" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la création du client" },
      { status: 500 }
    );
  }
}

