import { Resend } from "resend";
import { generateLetterPDF } from "@/lib/pdf/generator";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { recipientEmail, text, senderName, senderAddress, typeName } = await req.json();

    if (!recipientEmail || !text || !senderName) {
      return Response.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Générer le PDF
    const pdfBytes = await generateLetterPDF({ text, senderName, senderAddress, typeName });
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
    const fileName = `lettre-${typeName.toLowerCase().replace(/\s+/g, "-")}-lettreMagique.pdf`;

    // Envoyer via Resend
    const { error } = await resend.emails.send({
      from: "LettreMagique <noreply@lettre-magique.com>",
      to: [recipientEmail],
      subject: `Votre courrier — ${typeName}`,
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #0d0d0d;">
          <div style="background: #0d0d0d; padding: 20px 28px; margin-bottom: 32px;">
            <span style="font-size: 18px; font-weight: 900; color: #fff; letter-spacing: -0.5px;">Lettre</span><span style="font-size: 18px; font-weight: 900; color: #c84b2f;">Magique</span>
          </div>
          <div style="padding: 0 28px 32px;">
            <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">Bonjour,</p>
            <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Votre courrier <strong>${typeName}</strong> généré avec LettreMagique est joint à cet email en PDF.</p>
            <p style="font-size: 12px; color: #888; margin: 0; line-height: 1.6;">LettreMagique · Outil d'aide à la rédaction, ne constitue pas un conseil juridique.<br>lettre-magique.com</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Email error:", message);
    return Response.json({ error: "Erreur lors de l'envoi", detail: message }, { status: 500 });
  }
}
