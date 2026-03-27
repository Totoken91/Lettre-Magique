import { getResend, fromNoreply } from "@/lib/resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return Response.json({ error: "Non authentifié" }, { status: 401 });

    // Only send welcome email for accounts created in the last 5 minutes (new signups only)
    const createdAt = new Date(user.created_at);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (createdAt < fiveMinutesAgo) {
      return Response.json({ ok: true, skipped: "not a new account" });
    }

    // Check we haven't already sent a welcome email (check letters count as proxy)
    const admin = getSupabaseAdmin();
    const { count } = await (admin.from("letters") as any)
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    if ((count ?? 0) > 0) {
      return Response.json({ ok: true, skipped: "user already active" });
    }

    const { error } = await getResend().emails.send({
      from: fromNoreply(),
      to: user.email,
      subject: "Bienvenue sur LettreMagique — votre compte est prêt",
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; color: #1d1d1b; max-width: 560px; margin: 0 auto;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #1d1d1b; border-radius: 4px 4px 0 0;">
            <tr>
              <td style="padding: 20px 24px;">
                <span style="font-size: 15px; font-weight: 700; color: #fff;">Lettre</span><span style="font-size: 15px; font-weight: 700; color: #c84b2f;">Magique</span>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8e0d4; border-top: none;">
            <tr>
              <td style="padding: 32px 24px;">
                <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; color: #1d1d1b;">
                  Bienvenue sur LettreMagique
                </h1>
                <p style="margin: 0 0 20px; font-size: 15px; color: #444; line-height: 1.7;">
                  Votre compte est maintenant actif. Vous pouvez générer des courriers juridiquement solides en quelques clics : résiliation, mise en demeure, réclamation, contestation…
                </p>

                <table cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                  <tr>
                    <td style="background: #c84b2f; border-radius: 2px;">
                      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/generateur" style="display: inline-block; padding: 14px 28px; font-size: 13px; font-weight: 700; color: #fff; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase;">
                        Générer mon premier courrier →
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0 0 12px; font-size: 13px; color: #888; line-height: 1.6;">
                  <strong style="color: #1d1d1b;">Ce que vous pouvez faire :</strong>
                </p>
                <ul style="margin: 0 0 20px; padding-left: 18px; font-size: 13px; color: #555; line-height: 1.8;">
                  <li>Générer un courrier formel en 2 minutes</li>
                  <li>Télécharger en PDF professionnel (format A4)</li>
                  <li>Envoyer directement par email au destinataire</li>
                  <li>Articles de loi et références juridiques inclus</li>
                </ul>

                <p style="margin: 0; font-size: 13px; color: #888; line-height: 1.6;">
                  Vous avez un code promo ? Rendez-vous dans
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/compte" style="color: #c84b2f; font-weight: 600;">votre espace compte</a>
                  pour l'activer.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding: 16px 24px; border-top: 1px solid #e8e0d4; background: #f9f6f1;">
                <p style="margin: 0; font-size: 11px; color: #aaa;">
                  Vous recevez cet email car vous venez de créer un compte sur
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #c84b2f;">LettreMagique</a>.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Welcome email error:", error);
      return Response.json({ error: "Erreur envoi" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Welcome email error:", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
