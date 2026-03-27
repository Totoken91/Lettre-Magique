import { getResend, fromNoreply } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getEscalationAuthorities } from "@/data/escalation-authorities";
import type { EscalationAuthority } from "@/data/escalation-authorities";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lettre-magique.com";

// Buffer: send reminder 2 days after deadline (not the same day)
const BUFFER_DAYS = 2;
// Second reminder: 15 days after the first
const SECOND_REMINDER_DAYS = 15;

function buildEmailHtml(
  letter: { id: string; user_id: string; type_name: string; form_data: Record<string, string>; created_at: string; deadline_at: string },
  authorities: EscalationAuthority[],
  isSecondReminder: boolean,
): string {
  const resolveUrl = `${BASE_URL}/api/letter/resolve?id=${letter.id}&token=${letter.user_id.slice(0, 8)}`;
  const destinataire = letter.form_data?.destinataire || letter.form_data?.creancier || letter.form_data?.employeur || "le destinataire";
  const dateEnvoi = new Date(letter.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const dateDeadline = new Date(letter.deadline_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const title = isSecondReminder
    ? "Toujours pas de réponse — il est temps d'agir"
    : "Le délai de réponse est écoulé";

  const intro = isSecondReminder
    ? `Nous vous avions prévenu il y a 15 jours : le délai pour votre courrier de <strong>${letter.type_name}</strong> adressé à <strong>${destinataire}</strong> est passé depuis le ${dateDeadline}. Si vous n'avez toujours pas obtenu de réponse satisfaisante, voici les démarches à engager.`
    : `Votre courrier de <strong>${letter.type_name}</strong> adressé à <strong>${destinataire}</strong> le ${dateEnvoi} avait un délai de réponse fixé au ${dateDeadline}. Ce délai est désormais dépassé.`;

  const authoritiesHtml = authorities.map((a) => `
    <tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid #e8e0d4;">
        <strong style="color: #1d1d1b; font-size: 14px;">${a.name}</strong>
        <p style="margin: 4px 0 0; font-size: 13px; color: #555; line-height: 1.5;">${a.description}</p>
        ${a.url ? `<a href="${a.url}" style="font-size: 12px; color: #c84b2f; margin-top: 4px; display: inline-block;">${a.url.replace("https://", "")}</a>` : ""}
      </td>
    </tr>
  `).join("");

  return `
    <div style="font-family: Helvetica, Arial, sans-serif; color: #1d1d1b; max-width: 560px; margin: 0 auto;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #1d1d1b; border-radius: 4px 4px 0 0;">
        <tr>
          <td style="padding: 20px 24px;">
            <span style="font-size: 15px; font-weight: 700; color: #fff;">LM</span>
            <span style="font-size: 15px; font-weight: 700; color: #c84b2f;">Legal</span>
            <span style="color: #555; margin: 0 8px;">·</span>
            <span style="font-size: 12px; color: #888; letter-spacing: 1px;">SUIVI</span>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8e0d4; border-top: none;">
        <tr>
          <td style="padding: 28px 24px;">
            <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #1d1d1b;">
              ${isSecondReminder ? "⚠️" : "⏰"} ${title}
            </h2>
            <p style="margin: 0 0 20px; font-size: 14px; color: #444; line-height: 1.7;">
              ${intro}
            </p>

            ${authorities.length > 0 ? `
            <div style="margin: 0 0 20px;">
              <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #1d1d1b; text-transform: uppercase; letter-spacing: 1px;">
                ${isSecondReminder ? "Démarches à engager" : "Autorités compétentes"}
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f6f1; border: 1px solid #e8e0d4;">
                ${authoritiesHtml}
              </table>
            </div>
            ` : ""}

            <table cellpadding="0" cellspacing="0" style="margin: 0 0 16px;">
              <tr>
                <td style="background: #c84b2f; border-radius: 2px;">
                  <a href="${BASE_URL}/generateur" style="display: inline-block; padding: 14px 28px; font-size: 13px; font-weight: 700; color: #fff; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase;">
                    Générer un courrier de relance →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 16px 24px; border-top: 1px solid #e8e0d4; background: #f9f6f1;">
            <p style="margin: 0 0 8px; font-size: 11px; color: #aaa;">
              <a href="${BASE_URL}" style="color: #c84b2f;">LM Justice</a> · Suivi automatique de vos courriers
            </p>
            <p style="margin: 0; font-size: 11px;">
              <a href="${resolveUrl}" style="color: #888;">J'ai déjà reçu une réponse — ne plus me rappeler</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  const now = new Date();
  const bufferDate = new Date(now.getTime() - BUFFER_DAYS * 86_400_000).toISOString();
  const secondReminderDate = new Date(now.getTime() - SECOND_REMINDER_DAYS * 86_400_000).toISOString();

  // Rappel 1 : deadline passée depuis 2+ jours, jamais rappelé
  const { data: firstReminders } = await (admin.from("letters") as any)
    .select("id, type, type_name, form_data, created_at, deadline_at, email, user_id")
    .lte("deadline_at", bufferDate)
    .eq("reminder_count", 0)
    .not("user_id", "is", null)
    .not("deadline_at", "is", null)
    .limit(50);

  // Rappel 2 : premier rappel envoyé il y a 15+ jours, pas encore de second
  const { data: secondReminders } = await (admin.from("letters") as any)
    .select("id, type, type_name, form_data, created_at, deadline_at, email, user_id")
    .eq("reminder_count", 1)
    .lte("last_reminder_at", secondReminderDate)
    .not("user_id", "is", null)
    .not("deadline_at", "is", null)
    .limit(50);

  const resend = getResend();
  let sent = 0;

  // Process first reminders
  for (const letter of firstReminders ?? []) {
    if (!letter.email || letter.email === "free try") continue;
    const authorities = getEscalationAuthorities(letter.type);
    const typeName = letter.type_name || letter.type;

    try {
      await resend.emails.send({
        from: fromNoreply(),
        to: letter.email,
        subject: `Délai expiré — votre courrier de ${typeName}`,
        html: buildEmailHtml(letter, authorities, false),
      });

      await (admin.from("letters") as any)
        .update({ reminder_count: 1, last_reminder_at: now.toISOString(), status: "deadline_expired" })
        .eq("id", letter.id);
      sent++;
    } catch (err) {
      console.error(`Deadline reminder failed for letter ${letter.id}:`, err);
    }
  }

  // Process second reminders
  for (const letter of secondReminders ?? []) {
    if (!letter.email || letter.email === "free try") continue;
    const authorities = getEscalationAuthorities(letter.type);
    const typeName = letter.type_name || letter.type;

    try {
      await resend.emails.send({
        from: fromNoreply(),
        to: letter.email,
        subject: `Toujours pas de réponse — ${typeName}`,
        html: buildEmailHtml(letter, authorities, true),
      });

      await (admin.from("letters") as any)
        .update({ reminder_count: 2, last_reminder_at: now.toISOString(), status: "escalated" })
        .eq("id", letter.id);
      sent++;
    } catch (err) {
      console.error(`Second reminder failed for letter ${letter.id}:`, err);
    }
  }

  return Response.json({
    ok: true,
    sent,
    first: (firstReminders ?? []).length,
    second: (secondReminders ?? []).length,
  });
}
