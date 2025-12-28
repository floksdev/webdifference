# 🚀 Configuration Database pour Vercel

## ⚠️ Important : Utilisez le Session Pooler !

Pour Vercel (serverless), vous devez utiliser le **Session Pooler** et non la "Direct connection".

### Pourquoi ?
- ✅ Vercel utilise des fonctions serverless avec des connexions courtes
- ✅ Le pooler gère mieux les connexions multiples
- ✅ Plus performant pour les déploiements serverless
- ✅ Évite les erreurs de connexion

## 📋 Étapes dans Supabase

1. **Dans l'interface Supabase** (celle que vous voyez) :
   - Laissez "Type" = **URI**
   - Laissez "Source" = **Primary Database**
   - **Changez "Method" de "Direct connection" à "Session Pooler"** ⬅️ IMPORTANT

2. **Copiez la connection string** qui apparaît
   - Format affiché : `postgresql://postgres.tzozancftxmwboxjaiyj:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres`
   - ⚠️ Remplacez `[YOUR-PASSWORD]` par votre vrai mot de passe

3. **Ajoutez dans `.env.local`** avec les paramètres Prisma :
   ```env
   DATABASE_URL="postgresql://postgres.tzozancftxmwboxjaiyj:[VOTRE-MOT-DE-PASSE]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
   ```
   
   **Important** : Ajoutez `?pgbouncer=true&connection_limit=1` à la fin pour Prisma

4. **Pour Vercel** (variables d'environnement) :
   - Allez dans Vercel → Votre projet → Settings → Environment Variables
   - Ajoutez `DATABASE_URL` avec la même valeur
   - ⚠️ Remplacez `[VOTRE-MOT-DE-PASSE]` par votre vrai mot de passe

## ✅ Après configuration

```bash
# Appliquer le schéma
npm run db:push
```

## 🔍 Vérification

Si vous voyez "Not IPv4 compatible", c'est normal avec le pooler. Le pooler gère ça automatiquement.

---

**Résumé** : Changez "Method" → "Session Pooler" et copiez la connection string ! 🎯

