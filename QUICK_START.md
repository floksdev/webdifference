# ⚡ Quick Start - Configuration Database

## ✅ Vous avez le Session Pooler sélectionné - Parfait !

### 📋 Connection String à copier

Dans Supabase, vous voyez :
```
postgresql://postgres.tzozancftxmwboxjaiyj: [YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
```

### 🔧 À faire maintenant

1. **Copiez cette connection string** (remplacez `[YOUR-PASSWORD]` par votre mot de passe)

2. **Ajoutez dans `.env.local`** avec les paramètres Prisma :
   ```env
   DATABASE_URL="postgresql://postgres.tzozancftxmwboxjaiyj:[VOTRE-MOT-DE-PASSE]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
   ```
   
   ⚠️ **Important** : 
   - Remplacez `[VOTRE-MOT-DE-PASSE]` par votre vrai mot de passe
   - Ajoutez `?pgbouncer=true&connection_limit=1` à la fin

3. **Appliquez le schéma** :
   ```bash
   npm run db:push
   ```

4. **C'est tout !** 🎉

### 🚀 Pour Vercel

N'oubliez pas d'ajouter la même `DATABASE_URL` dans :
- Vercel → Votre projet → Settings → Environment Variables
- (Remplacez `[VOTRE-MOT-DE-PASSE]` par le vrai mot de passe aussi)

---

**Résumé** : Copiez la connection string, ajoutez les paramètres Prisma, et faites `npm run db:push` ! ✅

