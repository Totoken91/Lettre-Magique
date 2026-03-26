import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id || !token) {
    return new Response(page("Lien invalide", "Ce lien de confirmation est incomplet."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const admin = getSupabaseAdmin();

  // Verify: token = first 16 chars of letter ID + user_id (simple HMAC-less verification)
  const { data: letter } = await (admin.from("letters") as any)
    .select("id, user_id, status")
    .eq("id", id)
    .single();

  if (!letter || !letter.user_id) {
    return new Response(page("Courrier introuvable", "Ce courrier n'existe pas ou a été supprimé."), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Simple token check: token must match first 8 chars of user_id
  const expectedToken = letter.user_id.slice(0, 8);
  if (token !== expectedToken) {
    return new Response(page("Lien invalide", "Ce lien de confirmation n'est pas valide."), {
      status: 403,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (letter.status === "resolved") {
    return new Response(page("Déjà marqué", "Ce courrier est déjà marqué comme résolu. Aucune action nécessaire."), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Mark as resolved — stops all future reminders
  await (admin.from("letters") as any)
    .update({ status: "resolved", reminder_count: 2 })
    .eq("id", id);

  return new Response(
    page("Courrier résolu", "Votre courrier a été marqué comme résolu. Vous ne recevrez plus de rappel pour celui-ci."),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function page(title: string, message: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://lettre-magique.com";
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — LM Legal</title></head>
<body style="font-family:Helvetica,Arial,sans-serif;background:#f5f0e8;color:#1d1d1b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;">
  <div style="max-width:420px;text-align:center;">
    <div style="font-size:15px;font-weight:700;margin-bottom:24px;">
      <span style="color:#1d1d1b;">LM</span><span style="color:#c84b2f;">Legal</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;">${title}</h1>
    <p style="font-size:15px;color:#555;line-height:1.6;margin:0 0 24px;">${message}</p>
    <a href="${base}/mes-courriers" style="display:inline-block;padding:12px 24px;background:#c84b2f;color:#fff;text-decoration:none;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
      Voir mes courriers →
    </a>
  </div>
</body>
</html>`;
}
