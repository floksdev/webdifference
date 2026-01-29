# Intégration Yousign – Devis à la signature

Les devis générés dans l’admin peuvent être envoyés directement au client pour signature électronique via Yousign. **L’email est envoyé depuis contact@webdifference.fr** via votre serveur SMTP (ex. Zimbra), et non depuis les serveurs Yousign.

## Variables d’environnement

À ajouter dans `.env.local` (ou `.env`) :

```env
# Clé API Yousign (obligatoire)
YOUSIGN_API_KEY=your_api_key_here

# SMTP – boîte mail (Zimbra, etc.) pour envoyer depuis contact@webdifference.fr
SMTP_HOST=mail.webdifference.fr
SMTP_PORT=587
SMTP_USER=contact@webdifference.fr
SMTP_PASSWORD=votre_mot_de_passe
# Optionnel : expéditeur affiché (défaut : "Web Difference <contact@webdifference.fr>")
# SMTP_FROM=Web Difference <contact@webdifference.fr>
# Optionnel : true si le serveur utilise le port 465 (SSL), sinon 587 avec STARTTLS
# SMTP_SECURE=false

# Optionnel : URL de l’API Yousign (par défaut = sandbox)
# YOUSIGN_BASE_URL=https://api.yousign.app/v3
```

- **YOUSIGN_API_KEY** : à récupérer dans votre [espace Yousign](https://app.yousign.com) (Paramètres → API / Intégrations).
- **SMTP_HOST** : serveur SMTP (ex. `mail.webdifference.fr` pour Zimbra).
- **SMTP_PORT** : en général **587** (STARTTLS) ou **465** (SSL). Si 465, mettre `SMTP_SECURE=true`.
- **SMTP_USER** / **SMTP_PASSWORD** : identifiants de la boîte mail (ex. contact@webdifference.fr).
- **YOUSIGN_BASE_URL** : par défaut = sandbox. En production : `YOUSIGN_BASE_URL=https://api.yousign.app/v3`.

## Utilisation dans l’admin

1. Remplir le formulaire du devis (nom et email du client obligatoires).
2. Cliquer sur **« Envoyer pour signature (Yousign) »**.
3. Le PDF du devis est généré, envoyé à Yousign, et une demande de signature est créée.
4. Yousign envoie un email au client avec un lien pour signer le document.
5. Le champ de signature est positionné en bas de la première page du PDF (coordonnées configurables dans `src/app/api/admin/yousign/send-quote/route.ts` si besoin).

## Expéditeur des emails (contact@webdifference.fr)

L’app n’utilise **pas** les emails Yousign. Elle crée la signature request avec `delivery_mode: none`, récupère le lien de signature, puis envoie elle-même un email au client **depuis contact@webdifference.fr** via SMTP (votre serveur Zimbra ou autre). Le client reçoit donc un email dont l’expéditeur est **Web Difference &lt;contact@webdifference.fr&gt;**.

**Zimbra :** utilisez le même serveur et les mêmes identifiants que pour votre client mail (souvent port 587 avec STARTTLS, ou 465 en SSL). En cas d’erreur d’envoi, vérifiez que le serveur autorise l’authentification SMTP pour l’utilisateur configuré.

## Webhooks (optionnel)

Pour être notifié quand un client a signé (mise à jour du statut, envoi du PDF signé, etc.), vous pouvez configurer des webhooks Yousign vers une route de votre app (ex. `POST /api/webhooks/yousign`). Voir la [doc Yousign sur les webhooks](https://developers.yousign.com/docs/webhooks).
