import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Vérifier que le client existe
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client introuvable" },
        { status: 404 }
      );
    }

    // Supprimer le client (les documents seront supprimés automatiquement grâce à onDelete: Cascade)
    await prisma.client.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du client" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { firstName, lastName, email, company, phone, address, postalCode, city, country, status, paymentStatus, totalRevenue, depositAmount, salesRep } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Le prénom, le nom et l'email sont requis" },
        { status: 400 }
      );
    }

    const existing = await prisma.client.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: "Un client avec cet email existe déjà" },
        { status: 409 }
      );
    }

    const current = await prisma.client.findUnique({ where: { id } });
    const newDepositAmount = typeof depositAmount === "number" ? Math.max(0, depositAmount) : (current?.depositAmount ?? 0);
    const oldDepositAmount = current?.depositAmount ?? 0;
    const oldTotalRevenue = current?.totalRevenue ?? 0;
    const newTotalRevenue =
      typeof totalRevenue === "number"
        ? Math.max(0, totalRevenue)
        : oldTotalRevenue - oldDepositAmount + newDepositAmount;

    const updated = await prisma.client.update({
      where: { id },
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        postalCode: postalCode?.trim() || null,
        city: city?.trim() || null,
        country: country?.trim() || null,
        totalRevenue: newTotalRevenue,
        depositAmount: newDepositAmount,
        status: status ?? undefined,
        paymentStatus: paymentStatus ?? undefined,
        salesRep: salesRep ?? null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du client" },
      { status: 500 }
    );
  }
}

