import { getSupabaseAdmin } from "@/lib/supabase/admin";

// User-agents à ignorer : bots Vercel, crawlers, health checks
const BOT_PATTERNS = [
  "vercel",
  "bot",
  "crawler",
  "spider",
  "googlebot",
  "bingbot",
  "curl",
  "wget",
  "python-requests",
  "go-http-client",
  "node-fetch",
  "axios",
  "lighthouse",
  "pagespeed",
  "pingdom",
  "uptimerobot",
  "statuspage",
  "headlesschrome",
  "phantomjs",
  "playwright",
  "puppeteer",
  "selenium",
  "cypress",
  "cloudfront",
  "health",
  "monitoring",
  "datadog",
  "newrelic",
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((p) => ua.includes(p));
}

export async function POST(req: Request) {
  try {
    const userAgent = req.headers.get("user-agent");
    if (isBot(userAgent)) {
      return Response.json({ ok: true, skipped: true });
    }

    const { sessionId, path, referrer, utm_source, utm_medium, utm_campaign, utm_content } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return Response.json({ error: "sessionId manquant" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();

    const row: Record<string, unknown> = {
      session_id: sessionId,
      path: path ?? "/",
      user_agent: userAgent,
      created_at: new Date().toISOString(),
    };
    // N'écrire les champs UTM/referrer que s'ils sont présents (évite d'écraser avec null lors d'un upsert)
    if (utm_source) row.utm_source = String(utm_source).slice(0, 200);
    if (utm_medium) row.utm_medium = String(utm_medium).slice(0, 200);
    if (utm_campaign) row.utm_campaign = String(utm_campaign).slice(0, 200);
    if (utm_content) row.utm_content = String(utm_content).slice(0, 200);
    if (referrer) row.referrer = String(referrer).slice(0, 500);

    await (admin.from("page_views") as any).upsert(row, { onConflict: "session_id,path" });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Track error:", err);
    return Response.json({ error: "Erreur tracking" }, { status: 500 });
  }
}
