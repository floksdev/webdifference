# Configuration Google Places API pour l'autocomplétion d'adresse

Pour que l'autocomplétion d'adresse fonctionne, vous devez configurer l'API Google Places.

## Étapes

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet ou sélectionnez un projet existant
3. Activez l'API "Places API" :
   - Allez dans **APIs & Services** > **Library**
   - Recherchez "Places API"
   - Cliquez sur **Enable**
4. Créez une clé API :
   - Allez dans **APIs & Services** > **Credentials**
   - Cliquez sur **Create Credentials** > **API Key**
   - Copiez la clé API générée
5. (Optionnel) Restreignez la clé API pour la sécurité :
   - Cliquez sur la clé API créée
   - Dans **API restrictions**, sélectionnez "Restrict key"
   - Choisissez "Places API"
   - Dans **Application restrictions**, vous pouvez restreindre par domaine si nécessaire

## Variable d'environnement

Ajoutez la clé API dans votre `.env.local` :

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=votre-clé-api-ici
```

## Limites et coûts

- **Gratuit** : 1000 requêtes/jour
- **Payant** : À partir de $0.017 par requête après la limite gratuite
- L'autocomplétion est gratuite jusqu'à 1000 requêtes/jour

## Alternative gratuite (France uniquement)

Si vous ne voulez pas utiliser Google Places, vous pouvez utiliser l'API Adresse du gouvernement français (gratuite) :
- Documentation : https://adresse.data.gouv.fr/api-doc/adresse
- Pas de clé API requise
- Limité à la France uniquement

