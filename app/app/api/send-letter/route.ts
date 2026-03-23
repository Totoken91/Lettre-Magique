import { Resend } from "resend";
import { generateLetterPDF } from "@/lib/pdf/generator";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send via Resend
    const { error } = await resend.emails.send({
      from: `LettreMagique <${process.env.RESEND_FROM_EMAIL || "courrier@lettre-magique.fr"}>`,
      to: recipientEmail,
      subject: `${typeName || "Courrier"} — envoyé via LettreMagique`,
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; color: #1d1d1b; max-width: 580px;">
          <p>Bonjour,</p>
          <p>Veuillez trouver ci-joint un courrier de <strong>${typeName?.toLowerCase() || "correspondance"}</strong> envoyé par <strong>${senderName || "un utilisateur"}</strong> via LettreMagique.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999;">Ce courrier a été généré et envoyé depuis <a href="https://lettre-magique.fr" style="color: #c84b2f;">lettre-magique.fr</a></p>
        </div>
      `,
      attachments: [
        {
          filename: `lettre-${typeName?.toLowerCase().replace(/\s+/g, "-") || "courrier"}.pdf`,
          content: Buffer.from(pdfBytes).toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Erreur d'envoi" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Send letter error:", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
