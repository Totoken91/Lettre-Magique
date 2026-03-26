import { Resend } from "resend";
import { generateLetterPDF } from "@/lib/pdf/generator";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY non configurée");
  return new Resend(key);
}

function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { recipientEmail, text, senderName, senderAddress, senderPhone, senderEmail, typeName } = await req.json();

    if (!recipientEmail || !text) {
      return Response.json({ error: "Email et texte requis" }, { status: 400 });
    }

    // Generate PDF
    const pdfBytes = await generateLetterPDF({
      text,
      senderName: senderName || "",
      senderAddress: senderAddress || "",
      senderPhone,
      senderEmail,
      typeName: typeName || "Courrier",
    });

    const typeLabel = capitalize(typeName || "Courrier");
    const senderBlock = senderEmail
      ? `
        <tr>
          <td style="padding: 16px 24px; background: #f9f6f1; border-top: 1px solid #e8e0d4;">
            <p style="margin: 0; font-size: 13px; color: #555;">
              L'expéditeur souhaite être recontacté :
              <a href="mailto:${senderEmail}" style="color: #c84b2f; font-weight: 600;">${senderEmail}</a>
            </p>
          </td>
        </tr>`
      : "";

    // Send via Resend
    const sendOptions: Parameters<ReturnType<typeof getResend>["emails"]["send"]>[0] = {
      from: process.env.RESEND_FROM_EMAIL_COURRIER
        ? `LM Mail <${process.env.RESEND_FROM_EMAIL_COURRIER}>`
        : "onboarding@resend.dev",
      to: recipientEmail,
      subject: `LM Mail › ${typeLabel}`,
      ...(senderEmail ? { replyTo: senderEmail } : {}),
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; color: #1d1d1b; max-width: 600px; margin: 0 auto;">
          <!-- Header -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #1d1d1b; border-radius: 4px 4px 0 0;">
            <tr>
              <td style="padding: 20px 24px;">
                <span style="font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #fff; text-transform: uppercase;">LM Mail</span>
                <span style="color: #c84b2f; margin: 0 8px;">›</span>
                <span style="font-size: 13px; color: #ccc; letter-spacing: 1px;">${typeLabel}</span>
              </td>
            </tr>
          </table>

          <!-- Body -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8e0d4; border-top: none;">
            <tr>
              <td style="padding: 32px 24px;">
                <p style="margin: 0 0 16px; font-size: 15px; color: #1d1d1b;">Bonjour,</p>
                <p style="margin: 0; font-size: 15px; color: #1d1d1b; line-height: 1.6;">
                  Veuillez trouver ci-joint un courrier de <strong>${typeLabel}</strong>
                  ${senderName ? ` adressé par <strong>${senderName}</strong>` : ""}.
                </p>
              </td>
            </tr>
            ${senderBlock}
            <!-- Footer -->
            <tr>
              <td style="padding: 16px 24px; border-top: 1px solid #e8e0d4;">
                <p style="margin: 0; font-size: 11px; color: #aaa;">
                  Ce courrier a été généré et envoyé depuis
                  <a href="https://lettre-magique.com" style="color: #c84b2f;">lettre-magique.com</a>
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
      attachments: [
        {
          filename: `lettre-${typeName?.toLowerCase().replace(/\s+/g, "-") || "courrier"}.pdf`,
          content: Buffer.from(pdfBytes).toString("base64"),
        },
      ],
    };

    const { error } = await getResend().emails.send(sendOptions);

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return Response.json({ error: "Erreur d'envoi", detail: error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Send letter error:", err);
    return Response.json({ error: "Erreur serveur", detail: String(err) }, { status: 500 });
  }
}
