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

    const { sessionId, path } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return Response.json({ error: "sessionId manquant" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();

    // Une seule visite par session par chemin (upsert sur contrainte unique)
    await (admin.from("page_views") as any).upsert(
      { session_id: sessionId, path: path ?? "/", user_agent: userAgent },
      { onConflict: "session_id,path", ignoreDuplicates: true }
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Track error:", err);
    return Response.json({ error: "Erreur tracking" }, { status: 500 });
  }
}
