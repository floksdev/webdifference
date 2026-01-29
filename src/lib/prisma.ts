import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Client Prisma singleton (réutilisé en dev pour éviter trop de connexions).
 * Après une longue inactivité (nuit, veille), le pooler DB peut fermer les connexions :
 * tu verras "Error in PostgreSQL connection: Error { kind: Closed }".
 * → Redémarrer le serveur de dev (Ctrl+C puis npm run dev) pour repartir sur des connexions fraîches.
 */
export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
