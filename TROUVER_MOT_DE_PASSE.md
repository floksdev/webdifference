# 🔑 Trouver ou Réinitialiser le Mot de Passe Supabase

## Option 1 : Réinitialiser le mot de passe (Recommandé)

1. **Dans Supabase** :
   - Allez sur votre projet
   - **Settings** → **Database**
   - Scroll jusqu'à **"Database password"** ou **"Reset database password"**
   - Cliquez sur **"Reset database password"** ou **"Generate new password"**
   - ⚠️ **Copiez le nouveau mot de passe immédiatement** (il ne sera plus visible après)

2. **Utilisez ce nouveau mot de passe** dans votre `DATABASE_URL`

## Option 2 : Si vous avez déjà le mot de passe

Si vous avez créé le projet récemment, le mot de passe peut être :
- Celui que vous avez défini lors de la création du projet
- Dans un fichier de notes ou un gestionnaire de mots de passe
- Dans les variables d'environnement d'un autre projet

## Option 3 : Vérifier dans Vercel (si déjà configuré)

Si vous avez déjà déployé sur Vercel avec Supabase :
- Vercel → Votre projet → Settings → Environment Variables
- Regardez si `DATABASE_URL` existe déjà
- Le mot de passe sera dans cette variable

## ⚠️ Important

Après avoir réinitialisé le mot de passe :
1. **Mettez à jour `.env.local`** avec le nouveau mot de passe
2. **Mettez à jour Vercel** (Environment Variables) avec le nouveau mot de passe
3. **Testez la connexion** avec `npm run db:push`

---

**Astuce** : Après réinitialisation, copiez le mot de passe dans un gestionnaire de mots de passe pour ne pas le perdre ! 🔐

