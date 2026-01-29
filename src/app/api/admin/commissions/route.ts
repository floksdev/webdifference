import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.commissionPayment.findMany({
      orderBy: [{ month: "desc" }],
    });
    return NextResponse.json(payments);
  } catch (error) {
    console.error("Erreur lors de la récupération des commissions:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commissions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { salesRep, month, amount, isPaid } = body;

    if (!salesRep || !month) {
      return NextResponse.json(
        { error: "Le commercial et le mois sont requis" },
        { status: 400 }
      );
    }

    const payment = await prisma.commissionPayment.upsert({
      where: {
        salesRep_month: {
          salesRep,
          month,
        },
      },
      update: {
        amount: typeof amount === "number" ? amount : undefined,
        isPaid: typeof isPaid === "boolean" ? isPaid : undefined,
      },
      create: {
        salesRep,
        month,
        amount: typeof amount === "number" ? amount : 0,
        isPaid: Boolean(isPaid),
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commission:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la commission" },
      { status: 500 }
    );
  }
}
