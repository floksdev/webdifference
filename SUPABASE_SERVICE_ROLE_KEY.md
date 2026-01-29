# Configuration de la clé de service Supabase

Pour permettre l'upload de fichiers vers Supabase Storage sans erreur de politique RLS (Row Level Security), vous devez ajouter la **Service Role Key** de Supabase dans votre fichier `.env.local`.

## Étapes

1. **Connectez-vous à votre projet Supabase** : https://supabase.com/dashboard

2. **Allez dans Settings > API**

3. **Copiez la "service_role" key** (⚠️ **NE JAMAIS** exposer cette clé publiquement - elle bypass toutes les politiques de sécurité)

4. **Ajoutez-la dans votre `.env.local`** :

```env
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
```

5. **Redémarrez votre serveur de développement** (`npm run dev`)

## ⚠️ Sécurité importante

- La **Service Role Key** ne doit **JAMAIS** être utilisée côté client
- Elle est uniquement utilisée dans les API routes côté serveur
- Ne commitez **JAMAIS** cette clé dans Git (elle doit rester dans `.env.local` qui est dans `.gitignore`)

## Pourquoi cette clé est nécessaire ?

Les politiques RLS (Row Level Security) de Supabase empêchent l'upload direct depuis le client. En utilisant la Service Role Key dans une API route côté serveur, nous pouvons bypasser ces politiques de manière sécurisée, car la clé n'est jamais exposée au client.

