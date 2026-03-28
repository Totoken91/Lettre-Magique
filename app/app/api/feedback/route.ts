import { getResend, fromNoreply } from "@/lib/resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { type, message, email, pageUrl } = await req.json();

    if (!type || !message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Type et message requis" }, { status: 400 });
    }
    if (!["bug", "suggestion", "autre"].includes(type)) {
      return Response.json({ error: "Type invalide" }, { status: 400 });
    }
    if (message.length > 1000) {
      return Response.json({ error: "Message trop long (max 1000 caractères)" }, { status: 400 });
    }

    // Get user if logged in
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    const admin = getSupabaseAdmin();
    const { error: dbError } = await (admin.from("feedback") as any).insert({
      user_id: user?.id ?? null,
      email: email || user?.email || null,
      type,
      message: message.trim(),
      page_url: pageUrl || null,
    });

    if (dbError) {
      console.error("Feedback insert error:", dbError);
      return Response.json({ error: "Erreur sauvegarde" }, { status: 500 });
    }

    // Send notification email to support (fire-and-forget)
    const typeLabels: Record<string, string> = { bug: "🐛 Bug", suggestion: "💡 Suggestion", autre: "📝 Autre" };
    const contactEmail = email || user?.email || "Anonyme";

    getResend().emails.send({
      from: fromNoreply(),
      to: "kennydsf91@gmail.com",
      subject: `${typeLabels[type] || type} — Feedback LettreMagique`,
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; color: #1d1d1b; max-width: 560px;">
          <h2 style="margin: 0 0 16px; font-size: 18px;">${typeLabels[type] || type}</h2>
          <p style="margin: 0 0 8px; font-size: 13px; color: #888;">Page : ${pageUrl || "—"}</p>
          <p style="margin: 0 0 8px; font-size: 13px; color: #888;">Email : ${contactEmail}</p>
          <p style="margin: 0 0 8px; font-size: 13px; color: #888;">User ID : ${user?.id || "anonyme"}</p>
          <hr style="border: none; border-top: 1px solid #e8e0d4; margin: 16px 0;" />
          <p style="margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message.trim()}</p>
        </div>
      `,
    }).catch((err) => console.error("Feedback email error:", err));

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
