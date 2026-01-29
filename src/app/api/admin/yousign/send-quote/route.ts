import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSignatureQuoteEmailHtml } from "@/lib/email-templates/signature-quote";

// Par défaut : sandbox (clé d’essai). En production, définir YOUSIGN_BASE_URL=https://api.yousign.app/v3
const YOUSIGN_BASE =
  process.env.YOUSIGN_BASE_URL || "https://api-sandbox.yousign.app/v3";

const FROM_EMAIL =
  process.env.SMTP_FROM || "Web Difference <contact@webdifference.fr>";

/**
 * Crée une signature request Yousign pour un devis PDF, puis envoie le lien
 * de signature au client depuis contact@webdifference.fr (SMTP / Zimbra).
 * 1. Crée la SR avec delivery_mode: none (Yousign n’envoie pas d’email)
 * 2. Upload le PDF, ajoute le signataire, active
 * 3. Récupère signature_link et envoie un email au client via SMTP
 *
 * Body: FormData avec pdf (File), clientName (string), clientEmail (string), quoteNumber (string)
 */
export async function POST(request: NextRequest) {
  const apiKey = process.env.YOUSIGN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUSIGN_API_KEY non configurée" },
      { status: 500 }
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpHost || !smtpUser || !smtpPassword) {
    return NextResponse.json(
      {
        error:
          "SMTP non configuré. Ajoutez SMTP_HOST, SMTP_USER et SMTP_PASSWORD dans .env.local (ex. boîte Zimbra).",
      },
      { status: 500 }
    );
  }

  let pdfFile: File;
  let clientName: string;
  let clientEmail: string;
  let quoteNumber: string;

  try {
    const formData = await request.formData();
    pdfFile = formData.get("pdf") as File;
    clientName = (formData.get("clientName") as string) || "";
    clientEmail = (formData.get("clientEmail") as string) || "";
    quoteNumber = (formData.get("quoteNumber") as string) || "Devis";

    if (!pdfFile || !clientEmail) {
      return NextResponse.json(
        { error: "Fichier PDF et email client requis" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Données invalides (FormData attendu)" },
      { status: 400 }
    );
  }

  const srName = `Devis ${quoteNumber} - ${(clientName || "Client").trim()}`.slice(0, 255);
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    // 1. Créer la signature request (delivery_mode: none → on envoie nous-mêmes l’email)
    const createRes = await fetch(`${YOUSIGN_BASE}/signature_requests`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: srName,
        delivery_mode: "none",
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error("Yousign create SR:", createRes.status, errText);
      return NextResponse.json(
        { error: "Échec création demande de signature", details: errText },
        { status: createRes.status >= 500 ? 502 : 400 }
      );
    }

    const sr = (await createRes.json()) as { id: string };

    // 2. Upload du document (multipart)
    const uploadForm = new FormData();
    uploadForm.append("file", pdfFile, pdfFile.name || "devis.pdf");
    uploadForm.append("nature", "signable_document");

    const uploadRes = await fetch(
      `${YOUSIGN_BASE}/signature_requests/${sr.id}/documents`,
      {
        method: "POST",
        headers: { Authorization: headers.Authorization },
        body: uploadForm,
      }
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("Yousign upload doc:", uploadRes.status, errText);
      return NextResponse.json(
        { error: "Échec envoi du document", details: errText },
        { status: uploadRes.status >= 500 ? 502 : 400 }
      );
    }

    const doc = (await uploadRes.json()) as { id: string };
    const documentId = doc.id;

    const nameParts = (clientName || "Client").trim().split(/\s+/);
    const firstName = nameParts[0] || "Client";
    const lastName = nameParts.slice(1).join(" ") || "—";

    // 3. Ajouter le signataire + champ signature
    const signerRes = await fetch(
      `${YOUSIGN_BASE}/signature_requests/${sr.id}/signers`,
      {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          info: {
            first_name: firstName,
            last_name: lastName,
            email: clientEmail.trim().toLowerCase(),
            locale: "fr",
          },
          signature_level: "electronic_signature",
          signature_authentication_mode: "no_otp",
          fields: [
            {
              type: "signature",
              document_id: documentId,
              page: 1,
              x: 80,
              y: 750,
              width: 180,
              height: 37,
            },
          ],
        }),
      }
    );

    if (!signerRes.ok) {
      const errText = await signerRes.text();
      console.error("Yousign add signer:", signerRes.status, errText);
      return NextResponse.json(
        { error: "Échec ajout du signataire", details: errText },
        { status: signerRes.status >= 500 ? 502 : 400 }
      );
    }

    // 4. Activer la SR → on récupère le signature_link dans la réponse
    const activateRes = await fetch(
      `${YOUSIGN_BASE}/signature_requests/${sr.id}/activate`,
      { method: "POST", headers }
    );

    if (!activateRes.ok) {
      const errText = await activateRes.text();
      console.error("Yousign activate:", activateRes.status, errText);
      return NextResponse.json(
        { error: "Échec activation de la demande", details: errText },
        { status: activateRes.status >= 500 ? 502 : 400 }
      );
    }

    const activateData = (await activateRes.json()) as {
      signers?: Array<{ signature_link?: string | null }>;
    };
    const signatureLink =
      activateData.signers?.[0]?.signature_link?.trim() || null;

    if (!signatureLink) {
      return NextResponse.json(
        { error: "Lien de signature introuvable après activation" },
        { status: 500 }
      );
    }

    // 5. Envoyer l’email au client depuis contact@webdifference.fr (SMTP / Zimbra)
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === "true";

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure,
      auth: { user: smtpUser, pass: smtpPassword },
      ...(port === 587 && !secure && { tls: { rejectUnauthorized: true } }),
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof request.url === "string" ? new URL(request.url).origin : "") ||
      "https://webdifference.fr";

    const html = getSignatureQuoteEmailHtml({
      signatureLink,
      clientFirstName: clientName ? firstName : undefined,
      quoteNumber,
      baseUrl,
    });

    try {
      await transporter.sendMail({
        from: FROM_EMAIL,
        to: clientEmail.trim().toLowerCase(),
        subject: `Devis ${quoteNumber} – Signature requise`,
        html,
      });
    } catch (smtpError) {
      console.error("SMTP send:", smtpError);
      return NextResponse.json(
        {
          error:
            "Demande de signature créée mais l’email n’a pas pu être envoyé (SMTP).",
          details: smtpError instanceof Error ? smtpError.message : String(smtpError),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      signatureRequestId: sr.id,
      message:
        "Demande de signature créée et email envoyé au client depuis contact@webdifference.fr.",
    });
  } catch (err) {
    console.error("Yousign send-quote:", err);
    return NextResponse.json(
      {
        error: "Erreur lors de l’envoi à Yousign",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
