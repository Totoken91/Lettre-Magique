import { getResend, fromNoreply } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lm-justice.com";

  // Find users created 7 days ago (±12h window to avoid duplicates with daily cron)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const windowStart = new Date(sevenDaysAgo.getTime() - 12 * 60 * 60 * 1000).toISOString();
  const windowEnd = new Date(sevenDaysAgo.getTime() + 12 * 60 * 60 * 1000).toISOString();

  // Get users in the 7-day window
  const { data: authUsers } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const targetUsers = (authUsers?.users ?? []).filter((u) => {
    const created = u.created_at;
    return created >= windowStart && created <= windowEnd && u.email;
  });

  if (targetUsers.length === 0) {
    return Response.json({ ok: true, sent: 0 });
  }

  // Get their profiles to check credits
  const userIds = targetUsers.map((u) => u.id);
  const { data: profiles } = await (admin.from("profiles") as any)
    .select("id, credits, is_pro, is_admin")
    .in("id", userIds);

  const profileMap: Record<string, { credits: number; is_pro: boolean; is_admin: boolean }> = {};
  for (const p of profiles ?? []) {
    profileMap[p.id] = { credits: p.credits ?? 0, is_pro: p.is_pro, is_admin: p.is_admin };
  }

  // Check how many letters each user generated
  const { data: letterCounts } = await (admin.from("letters") as any)
    .select("user_id")
    .in("user_id", userIds);

  const lettersPerUser: Record<string, number> = {};
  for (const l of letterCounts ?? []) {
    if (l.user_id) lettersPerUser[l.user_id] = (lettersPerUser[l.user_id] ?? 0) + 1;
  }

  const resend = getResend();
  let sent = 0;

  for (const user of targetUsers) {
    const profile = profileMap[user.id];
    if (!profile || profile.is_admin || profile.is_pro) continue;

    const credits = profile.credits;
    const lettersGenerated = lettersPerUser[user.id] ?? 0;

    // Build personalized email content
    let subject: string;
    let mainMessage: string;
    let ctaText: string;
    let ctaUrl: string;

    if (credits > 0) {
      subject = `Vous avez encore ${credits} crédit${credits > 1 ? "s" : ""} sur LM Justice`;
      mainMessage = `Vous avez <strong>${credits} crédit${credits > 1 ? "s" : ""}</strong> disponible${credits > 1 ? "s" : ""} sur votre compte. ${lettersGenerated > 0 ? `Vous avez déjà généré ${lettersGenerated} courrier${lettersGenerated > 1 ? "s" : ""} — ` : ""}N'hésitez pas à les utiliser pour vos démarches administratives.`;
      ctaText = "Utiliser mes crédits →";
      ctaUrl = `${baseUrl}/generateur`;
    } else if (lettersGenerated === 0) {
      subject = "Vous n'avez pas encore généré de courrier sur LM Justice";
      mainMessage = "Vous avez créé votre compte il y a 7 jours mais vous n'avez pas encore généré de courrier. Résiliation, réclamation, mise en demeure… notre outil fait le travail en 2 minutes.";
      ctaText = "Générer mon premier courrier →";
      ctaUrl = `${baseUrl}/generateur`;
    } else {
      subject = "Besoin d'un autre courrier ? LM Justice est là";
      mainMessage = `Vous avez déjà généré ${lettersGenerated} courrier${lettersGenerated > 1 ? "s" : ""}. Besoin d'une autre démarche ? Résiliation, contestation d'amende, mise en demeure — tout est prêt.`;
      ctaText = "Générer un courrier →";
      ctaUrl = `${baseUrl}/generateur`;
    }

    try {
      await resend.emails.send({
        from: fromNoreply(),
        to: user.email!,
        subject,
        html: `
          <div style="font-family: Helvetica, Arial, sans-serif; color: #1d1d1b; max-width: 560px; margin: 0 auto;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1d1d1b; border-radius: 4px 4px 0 0;">
              <tr>
                <td style="padding: 20px 24px;">
                  <span style="font-size: 15px; font-weight: 700; color: #fff;">LM</span>
                  <span style="font-size: 15px; font-weight: 700; color: #c84b2f;">Legal</span>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8e0d4; border-top: none;">
              <tr>
                <td style="padding: 32px 24px;">
                  <p style="margin: 0 0 20px; font-size: 15px; color: #444; line-height: 1.7;">
                    ${mainMessage}
                  </p>

                  <table cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                    <tr>
                      <td style="background: #c84b2f; border-radius: 2px;">
                        <a href="${ctaUrl}" style="display: inline-block; padding: 14px 28px; font-size: 13px; font-weight: 700; color: #fff; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase;">
                          ${ctaText}
                        </a>
                      </td>
                    </tr>
                  </table>

                  ${credits > 0 ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f6f1; border: 1px solid #e8e0d4;">
                    <tr>
                      <td style="padding: 14px 20px; text-align: center;">
                        <span style="font-size: 24px; font-weight: 700; color: #1d1d1b;">${credits}</span>
                        <span style="font-size: 12px; color: #888; display: block; margin-top: 2px;">crédit${credits > 1 ? "s" : ""} restant${credits > 1 ? "s" : ""}</span>
                      </td>
                    </tr>
                  </table>
                  ` : ""}
                </td>
              </tr>

              <tr>
                <td style="padding: 16px 24px; border-top: 1px solid #e8e0d4; background: #f9f6f1;">
                  <p style="margin: 0; font-size: 11px; color: #aaa;">
                    <a href="${baseUrl}" style="color: #c84b2f;">LM Justice</a> · Courriers administratifs générés par IA
                  </p>
                </td>
              </tr>
            </table>
          </div>
        `,
      });
      sent++;
    } catch (err) {
      console.error(`Reminder email failed for ${user.email}:`, err);
    }
  }

  return Response.json({ ok: true, sent, total: targetUsers.length });
}
