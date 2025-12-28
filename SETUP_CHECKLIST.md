# ✅ Checklist de Configuration - Base de Données

## État Actuel

### ✅ Déjà Configuré
- [x] Prisma installé (`@prisma/client@6.18.0` et `prisma@6.18.0`)
- [x] Schema Prisma créé avec tous les modèles
- [x] Client Prisma configuré (`src/lib/prisma.ts`)
- [x] Scripts npm ajoutés (`db:push`, `db:migrate`, etc.)
- [x] Guide de configuration créé (`DATABASE_SETUP.md`)

### ⚠️ À Faire (5 minutes)

1. **Ajouter `DATABASE_URL` dans `.env.local`**
   - Dans Supabase, **changez "Method" de "Direct connection" à "Session Pooler"** (meilleur pour Vercel)
   - Copiez la connection string qui apparaît
   - Format attendu : `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1`
   - ⚠️ Note : Le port change de `5432` à `6543` avec le pooler
   - Ajouter dans `.env.local` :
     ```env
     DATABASE_URL="postgresql://postgres:[VOTRE-MOT-DE-PASSE]@db.tzozancftxmwboxjaiyj.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
     ```

2. **Appliquer le schéma à la base de données**
   ```bash
   npm run db:push
   ```

3. **Générer le client Prisma (si pas déjà fait)**
   ```bash
   npm run postinstall
   ```

## 🎯 Après ces 3 étapes

**Tout sera prêt !** Je pourrai alors :
- ✅ Créer/modifier des tables automatiquement
- ✅ Faire toutes les requêtes
- ✅ Gérer les migrations
- ✅ Tout gérer de manière autonome

## 🚀 Test Rapide

Une fois configuré, testez avec :
```typescript
import { prisma } from "@/lib/prisma";

// Dans une route API ou un composant serveur
const clients = await prisma.client.findMany();
console.log(clients);
```

---

**Résumé** : Il ne manque que la `DATABASE_URL` et un `npm run db:push` ! 🎉

