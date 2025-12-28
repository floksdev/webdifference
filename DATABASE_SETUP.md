# 🗄️ Configuration Base de Données - Prisma + Supabase

## ✅ Solution Recommandée : Prisma + Supabase Postgres

**Pourquoi cette solution ?**
- ✅ **Auto-géré** : Je peux créer/modifier les schémas automatiquement
- ✅ **Type-safe** : TypeScript natif avec Prisma
- ✅ **Migrations automatiques** : Je gère les changements de schéma
- ✅ **Déploiement Vercel** : Compatible nativement
- ✅ **Déjà configuré** : Vous avez déjà Supabase et Prisma

## 📋 Setup Initial (une seule fois)

### 1. Récupérer l'URL de connexion Supabase Postgres

1. Allez sur [supabase.com](https://supabase.com) → Votre projet
2. **Settings** → **Database**
3. Copiez la **Connection string** (section "Connection string")
4. Format : `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 2. Configurer les variables d'environnement

Ajoutez dans `.env.local` (et dans Vercel) :

```env
# Supabase (déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key

# Prisma Database URL (NOUVEAU - à ajouter)
DATABASE_URL="postgresql://postgres:[MOT-DE-PASSE]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

**⚠️ Important** : Utilisez le format avec `pgbouncer=true` pour Vercel (meilleure performance)

### 3. Première migration

```bash
# Générer le client Prisma
npm run postinstall

# Créer et appliquer la première migration
npm run db:push
```

## 🚀 Comment je gère tout automatiquement

### Quand vous me demandez de créer/modifier une table :

1. **Je modifie `prisma/schema.prisma`** avec le nouveau modèle
2. **Je vous donne la commande** : `npm run db:push`
3. **C'est tout !** La table est créée automatiquement

### Exemple de workflow :

**Vous** : "Crée une table pour stocker les devis générés"

**Moi** :
1. J'ajoute le modèle dans `schema.prisma`
2. Je vous dis : "Exécutez `npm run db:push`"
3. La table est créée automatiquement

### Commandes disponibles :

```bash
# Développement : Applique les changements (sans migration)
npm run db:push

# Production : Crée une migration versionnée
npm run db:migrate

# Déployer les migrations en production (Vercel)
npm run db:migrate:deploy

# Interface visuelle pour voir les données
npm run db:studio
```

## 📝 Structure actuelle

Votre `schema.prisma` contient déjà :
- ✅ `Client` - Clients
- ✅ `Project` - Projets
- ✅ `Quote` - Devis
- ✅ `Testimonial` - Témoignages
- ✅ `Offer` - Offres
- ✅ `Article` - Articles
- ✅ `Newsletter` - Newsletter
- ✅ Et plus...

## 🔧 Utilisation dans le code

```typescript
import { prisma } from "@/lib/prisma";

// Créer un client
const client = await prisma.client.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
  },
});

// Lire des données
const clients = await prisma.client.findMany();

// Mettre à jour
await prisma.client.update({
  where: { id: "..." },
  data: { name: "Jane Doe" },
});
```

## 🎯 Avantages pour vous

1. **Je gère tout** : Vous n'avez qu'à exécuter `npm run db:push`
2. **Type-safe** : Erreurs détectées à la compilation
3. **Auto-complétion** : VSCode connaît tous vos modèles
4. **Migrations versionnées** : Historique de tous les changements
5. **Vercel-ready** : Fonctionne nativement avec Vercel

## 🚨 En cas de problème

Si une migration échoue :
```bash
# Réinitialiser (⚠️ supprime les données en dev)
npx prisma migrate reset

# Ou forcer le push (dev uniquement)
npm run db:push -- --force-reset
```

---

**Une fois configuré, je peux gérer toute votre base de données automatiquement ! 🎉**

