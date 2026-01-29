/**
 * Template email pour l'invitation à signer un devis (Yousign).
 * Mise en page alignée sur la DA du site : #71DDAE (primaire), #1C1C1C (texte/footer).
 * Une seule image : le logo du site (public/assets/main/fond-vert/logo-full.png).
 */
export function getSignatureQuoteEmailHtml(params: {
  signatureLink: string;
  clientFirstName?: string;
  quoteNumber: string;
  /** URL de base du site (ex. https://webdifference.fr) pour le logo */
  baseUrl: string;
}): string {
  const { signatureLink, clientFirstName, quoteNumber, baseUrl } = params;
  const greeting = clientFirstName ? `Bonjour ${clientFirstName},` : "Bonjour,";
  const logoUrl = `${baseUrl.replace(/\/$/, "")}/assets/main/fond-vert/logo-full.png`;

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #71DDAE; color: #1C1C1C; font-family: arial, helvetica, sans-serif; }
    table, td, tr { border-collapse: collapse; vertical-align: top; }
    a { color: #1C1C1C; text-decoration: underline; }
    img { border: 0; outline: none; -ms-interpolation-mode: bicubic; max-width: 100%; height: auto; }
    @media only screen and (max-width: 620px) {
      .u-row { width: 100% !important; }
      .u-row .u-col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #71DDAE; color: #1C1C1C;">
  <table role="presentation" style="border-collapse: collapse; table-layout: fixed; min-width: 320px; margin: 0 auto; background-color: #71DDAE; width: 100%;" cellpadding="0" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td style="word-break: break-word; vertical-align: top; padding: 24px 16px;">
          <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden;" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td style="padding: 32px 40px 24px 40px; font-family: arial, helvetica, sans-serif; text-align: center;">
                  <a href="${baseUrl}" target="_blank" style="text-decoration: none;">
                    <img src="${logoUrl}" alt="Web Difference" width="160" style="display: inline-block; max-width: 160px; height: auto;" />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 40px 32px 40px; font-family: arial, helvetica, sans-serif;">
                  <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #1C1C1C;">${greeting}</p>
                  <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.5; color: #1C1C1C;">Web Difference vous envoie un devis à signer électroniquement.</p>
                  <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.5; color: #1C1C1C;"><strong>Devis n° ${quoteNumber}</strong></p>
                  <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #1C1C1C;">Cliquez sur le bouton ci-dessous pour accéder au document et apposer votre signature. Ce lien est valide 48 heures.</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 40px 40px 40px; font-family: arial, helvetica, sans-serif;" align="left">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left">
                    <tbody>
                      <tr>
                        <td style="border-radius: 6px; background-color: #71DDAE; text-align: center;">
                          <a href="${signatureLink}" target="_blank" style="display: inline-block; padding: 16px 32px; font-size: 16px; font-weight: 600; color: #1C1C1C; text-decoration: none; line-height: 1.2;">Signer le document</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table role="presentation" style="width: 100%; max-width: 600px; margin: 16px auto 0 auto; border-collapse: collapse; background-color: #1C1C1C; border-radius: 8px;" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td style="padding: 24px 40px; font-size: 14px; color: #ffffff; text-align: center;">
                  En cas de question, répondez à cet email.<br/>
                  Merci pour votre confiance,<br/>
                  <strong>L’équipe Web Difference</strong><br/><br/>
                  <a href="mailto:contact@webdifference.fr" style="color: #71DDAE; text-decoration: underline;">contact@webdifference.fr</a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;
}
