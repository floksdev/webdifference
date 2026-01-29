# Configuration Supabase Storage pour les documents clients

Pour que la fonctionnalité d'upload de documents fonctionne, vous devez créer un bucket dans Supabase Storage.

## Étapes

1. Connectez-vous à votre projet Supabase
2. Allez dans **Storage** dans le menu de gauche
3. Cliquez sur **New bucket**
4. Créez un bucket nommé : `client-documents`
5. Configurez le bucket :
   - **Public bucket** : Activé (pour permettre l'accès aux fichiers)
   - **File size limit** : 10 MB (ou plus selon vos besoins)
   - **Allowed MIME types** : Laissez vide pour autoriser tous les types, ou spécifiez : `application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png`

## Variables d'environnement requises

Assurez-vous d'avoir ces variables dans votre `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
```

## Types de documents supportés

- PDF (`.pdf`)
- Word (`.doc`, `.docx`)
- Excel (`.xls`, `.xlsx`)
- Images (`.jpg`, `.jpeg`, `.png`)

Les documents sont automatiquement catégorisés selon leur nom :
- **QUOTE** : fichiers contenant "devis" ou "quote"
- **INVOICE** : fichiers contenant "facture" ou "invoice"
- **CONTRACT** : fichiers contenant "contrat" ou "contract"
- **OTHER** : tous les autres fichiers

