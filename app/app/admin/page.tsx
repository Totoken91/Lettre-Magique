import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import TimelineChart from "@/components/admin/TimelineChart";
import FunnelBar from "@/components/admin/FunnelBar";
import UserDetailPanel from "@/components/admin/UserDetailPanel";
import PromoManager from "@/components/admin/PromoManager";

export const metadata: Metadata = {
  title: "Admin — LettreMagique",
  robots: "noindex",
};

/* ───────── types ───────── */

interface PromoCode {
  code: string;
  credits: number;
  used_count: number;
  max_uses: number | null;
  active: boolean;
  show_banner: boolean;
  expires_at: string | null;
  description: string;
}

interface LetterRow {
  id: string;
  created_at: string;
  type_name: string;
  type: string;
  email: string;
  sender_name: string;
  user_id: string | null;
  fingerprint: string | null;
}

interface Stats {
  usersCount: number;
  lettersCount: number;
  lettersThisWeek: number;
  anonLettersCount: number;
  anonLettersThisWeek: number;
  uniqueVisits30d: number;
  uniqueVisits7d: number;
  proCount: number;
  promoTotalRedemptions: number;
  promoCodes: PromoCode[];
  recentLetters: LetterRow[];
  recentUsers: {
    id: string;
    email: string;
    created_at: string;
    is_pro: boolean;
    letters_count: number;
    types_used: string[];
    last_activity: string | null;
    credits: number;
  }[];
  // Funnel
  funnelVisitors: number;
  funnelGeneratorVisits: number;
  funnelLettersGenerated: number;
  funnelAccountsCreated: number;
  // Letter type breakdown
  lettersByType: { type: string; type_name: string; total: number; last7: number }[];
  // Timeline 30d
  timelineData: { date: string; letters: number; signups: number }[];
  // Retention
  usersWith1Letter: number;
  usersWith2PlusLetters: number;
  usersWith5PlusLetters: number;
  returnRate30d: number;
  // Freemium funnel
  anonTotalGenerated: number;
  anonThenSignedUp: number;
  signedUpThenGenerated: number;
  signedUpThenPro: number;
  // Promo comparison
  promoUsersCount: number;
  promoAvgLetters: number;
  nonPromoUsersCount: number;
  nonPromoAvgLetters: number;
  promoProRate: number;
  nonPromoProRate: number;
  // Traffic sources
  trafficSources: { source: string; visits: number; conversions: number }[];
}

/* ───────── data fetching ───────── */

async function getStats(): Promise<Stats | null> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = getSupabaseAdmin();
  const { data: profile } = await (admin.from("profiles") as any)
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) return null;

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: usersCount },
    { count: lettersCount },
    { count: lettersThisWeek },
    { count: anonLettersCount },
    { count: anonLettersThisWeek },
    { data: visits30d },
    { data: visits7d },
    { data: recentLetters },
    { count: proCount },
    { data: promoCodesData },
    { data: allLetters },
    { data: allProfiles },
    { data: generatorVisits },
  ] = await Promise.all([
    (admin.from("profiles") as any).select("*", { count: "exact", head: true }),
    (admin.from("letters") as any).select("*", { count: "exact", head: true }),
    (admin.from("letters") as any).select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
    (admin.from("letters") as any).select("*", { count: "exact", head: true }).is("user_id", null),
    (admin.from("letters") as any).select("*", { count: "exact", head: true }).is("user_id", null).gte("created_at", sevenDaysAgo),
    (admin.from("page_views") as any).select("session_id").gte("created_at", thirtyDaysAgo),
    (admin.from("page_views") as any).select("session_id").gte("created_at", sevenDaysAgo),
    (admin.from("letters") as any).select("id, created_at, type_name, type, email, sender_name, user_id, fingerprint").order("created_at", { ascending: false }).limit(10),
    (admin.from("profiles") as any).select("*", { count: "exact", head: true }).eq("is_pro", true),
    (admin.from("promo_codes") as any).select("code, credits, used_count, max_uses, active, show_banner, expires_at, description").order("used_count", { ascending: false }),
    (admin.from("letters") as any).select("id, created_at, type, type_name, user_id, fingerprint").order("created_at", { ascending: false }),
    (admin.from("profiles") as any).select("id, is_pro, credits, created_at"),
    (admin.from("page_views") as any).select("session_id").eq("path", "/generateur").gte("created_at", thirtyDaysAgo),
  ]);

  // ── Exclure les admins de toutes les stats ──
  const { data: adminProfiles } = await (admin.from("profiles") as any)
    .select("id")
    .eq("is_admin", true);
  const adminIds = new Set((adminProfiles ?? []).map((p: { id: string }) => p.id));

  const uniqueVisits30d = new Set((visits30d ?? []).map((r: { session_id: string }) => r.session_id)).size;
  const uniqueVisits7d = new Set((visits7d ?? []).map((r: { session_id: string }) => r.session_id)).size;
  const funnelGeneratorVisits = new Set((generatorVisits ?? []).map((r: { session_id: string }) => r.session_id)).size;

  // ── Derniers inscrits via auth.users ──
  const { data: authUsers } = await admin.auth.admin.listUsers({ page: 1, perPage: 15 });
  const sortedUsers = (authUsers?.users ?? [])
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 15);

  const userIds = sortedUsers.map((u) => u.id);
  const { data: profilesData } = await (admin.from("profiles") as any)
    .select("id, is_pro, credits")
    .in("id", userIds);
  const proMap: Record<string, { is_pro: boolean; credits: number }> = {};
  for (const p of profilesData ?? []) proMap[p.id] = { is_pro: p.is_pro, credits: p.credits ?? 0 };

  // Letters per user for recent users (admin letters excluded)
  const lettersArr: LetterRow[] = (allLetters ?? []).filter((l: LetterRow) => !l.user_id || !adminIds.has(l.user_id));
  const lettersByUser: Record<string, { count: number; types: Set<string>; lastDate: string | null }> = {};
  for (const l of lettersArr) {
    if (!l.user_id) continue;
    if (!lettersByUser[l.user_id]) lettersByUser[l.user_id] = { count: 0, types: new Set(), lastDate: null };
    lettersByUser[l.user_id].count++;
    lettersByUser[l.user_id].types.add(l.type_name || l.type);
    if (!lettersByUser[l.user_id].lastDate || l.created_at > lettersByUser[l.user_id].lastDate!)
      lettersByUser[l.user_id].lastDate = l.created_at;
  }

  const recentUsers = sortedUsers.filter((u) => !adminIds.has(u.id)).map((u) => {
    const info = lettersByUser[u.id];
    return {
      id: u.id,
      email: u.email ?? "—",
      created_at: u.created_at,
      is_pro: proMap[u.id]?.is_pro ?? false,
      credits: proMap[u.id]?.credits ?? 0,
      letters_count: info?.count ?? 0,
      types_used: info ? Array.from(info.types) : [],
      last_activity: info?.lastDate ?? null,
    };
  });

  const promoCodes: PromoCode[] = (promoCodesData ?? []) as PromoCode[];
  const promoTotalRedemptions = promoCodes.reduce((sum, c) => sum + (c.used_count ?? 0), 0);

  // ── Letter type breakdown ──
  const typeMap: Record<string, { type: string; type_name: string; total: number; last7: number }> = {};
  for (const l of lettersArr) {
    const key = l.type || "unknown";
    if (!typeMap[key]) typeMap[key] = { type: key, type_name: l.type_name || key, total: 0, last7: 0 };
    typeMap[key].total++;
    if (l.created_at >= sevenDaysAgo) typeMap[key].last7++;
  }
  const lettersByType = Object.values(typeMap).sort((a, b) => b.total - a.total);

  // ── Timeline 30d ──
  const allProfilesList: { id: string; created_at: string }[] = (allProfiles ?? []).filter((p: { id: string }) => !adminIds.has(p.id));
  const dayMap: Record<string, { letters: number; signups: number }> = {};
  for (let d = 29; d >= 0; d--) {
    const dt = new Date(Date.now() - d * 86400000);
    const key = dt.toISOString().slice(0, 10);
    dayMap[key] = { letters: 0, signups: 0 };
  }
  for (const l of lettersArr) {
    const key = l.created_at.slice(0, 10);
    if (dayMap[key]) dayMap[key].letters++;
  }
  for (const p of allProfilesList) {
    const key = p.created_at?.slice(0, 10);
    if (key && dayMap[key]) dayMap[key].signups++;
  }
  const timelineData = Object.entries(dayMap).map(([date, d]) => ({
    date: date.slice(5), // MM-DD
    letters: d.letters,
    signups: d.signups,
  }));

  // ── Retention ──
  const userLetterCounts: Record<string, Set<string>> = {};
  for (const l of lettersArr) {
    if (!l.user_id) continue;
    if (!userLetterCounts[l.user_id]) userLetterCounts[l.user_id] = new Set();
    userLetterCounts[l.user_id].add(l.created_at.slice(0, 10));
  }
  let usersWith1Letter = 0;
  let usersWith2PlusLetters = 0;
  let usersWith5PlusLetters = 0;
  let returnUsers = 0;
  const totalUsersWithLetters = Object.keys(userLetterCounts).length;
  for (const [, days] of Object.entries(userLetterCounts)) {
    const letterCount = lettersByUser[Object.keys(userLetterCounts).find((k) => userLetterCounts[k] === days)!]?.count ?? 0;
    if (letterCount === 1) usersWith1Letter++;
    if (letterCount >= 2) usersWith2PlusLetters++;
    if (letterCount >= 5) usersWith5PlusLetters++;
    if (days.size >= 2) returnUsers++;
  }
  const returnRate30d = totalUsersWithLetters > 0 ? Math.round((returnUsers / totalUsersWithLetters) * 100) : 0;

  // ── Freemium funnel ──
  const anonFingerprints = new Set<string>();
  for (const l of lettersArr) {
    if (!l.user_id && l.fingerprint) anonFingerprints.add(l.fingerprint);
  }
  const anonTotalGenerated = lettersArr.filter((l) => !l.user_id).length;
  // Users who have a fingerprint matching an anon letter = signed up after trial
  const userFingerprints = new Set<string>();
  for (const l of lettersArr) {
    if (l.user_id && l.fingerprint) userFingerprints.add(l.fingerprint);
  }
  const anonThenSignedUp = [...anonFingerprints].filter((fp) => userFingerprints.has(fp)).length;
  const signedUpThenGenerated = Object.keys(lettersByUser).length;
  const signedUpThenPro = (allProfiles ?? []).filter((p: { is_pro: boolean }) => p.is_pro).length;

  // ── Promo comparison ──
  // Users with promo = users who have credits > 0 (simplified: promo users got credits from codes)
  const promoUsers = (allProfiles ?? []).filter((p: { credits: number }) => (p.credits ?? 0) > 0);
  const nonPromoUsers = (allProfiles ?? []).filter((p: { credits: number }) => (p.credits ?? 0) === 0);
  const promoUsersCount = promoUsers.length;
  const nonPromoUsersCount = nonPromoUsers.length;
  const promoUserIds = new Set(promoUsers.map((p: { id: string }) => p.id));
  let promoLettersTotal = 0;
  let nonPromoLettersTotal = 0;
  for (const [uid, info] of Object.entries(lettersByUser)) {
    if (promoUserIds.has(uid)) promoLettersTotal += info.count;
    else nonPromoLettersTotal += info.count;
  }
  const promoAvgLetters = promoUsersCount > 0 ? Math.round((promoLettersTotal / promoUsersCount) * 10) / 10 : 0;
  const nonPromoAvgLetters = nonPromoUsersCount > 0 ? Math.round((nonPromoLettersTotal / nonPromoUsersCount) * 10) / 10 : 0;
  const promoProRate = promoUsersCount > 0 ? Math.round((promoUsers.filter((p: { is_pro: boolean }) => p.is_pro).length / promoUsersCount) * 100) : 0;
  const nonPromoProRate = nonPromoUsersCount > 0 ? Math.round((nonPromoUsers.filter((p: { is_pro: boolean }) => p.is_pro).length / nonPromoUsersCount) * 100) : 0;

  // ── Traffic sources (UTM + referrer based) ──
  const { data: allPageViews } = await (admin.from("page_views") as any)
    .select("session_id, path, utm_source, utm_medium, referrer")
    .gte("created_at", sevenDaysAgo);

  // Classify each session by its best-known source (first non-null UTM or referrer wins)
  const sessions: Record<string, { source: string; paths: Set<string> }> = {};
  for (const pv of allPageViews ?? []) {
    if (!sessions[pv.session_id]) {
      sessions[pv.session_id] = { source: "Direct", paths: new Set() };
    }
    sessions[pv.session_id].paths.add(pv.path);
    // Only classify if not already classified (keep first source)
    if (sessions[pv.session_id].source !== "Direct") continue;
    if (pv.utm_source) {
      const src = pv.utm_source.toLowerCase();
      if (src.includes("google")) sessions[pv.session_id].source = "Google (organique)";
      else if (src.includes("facebook") || src.includes("instagram") || src.includes("tiktok") || src.includes("twitter") || src.includes("linkedin") || src.includes("youtube")) sessions[pv.session_id].source = "Réseaux sociaux";
      else sessions[pv.session_id].source = `UTM: ${pv.utm_source}`;
    } else if (pv.referrer) {
      const ref = pv.referrer.toLowerCase();
      if (ref.includes("google.")) sessions[pv.session_id].source = "Google (organique)";
      else if (ref.includes("bing.")) sessions[pv.session_id].source = "Bing";
      else if (ref.includes("facebook.com") || ref.includes("instagram.com") || ref.includes("tiktok.com") || ref.includes("twitter.com") || ref.includes("x.com") || ref.includes("linkedin.com") || ref.includes("youtube.com")) sessions[pv.session_id].source = "Réseaux sociaux";
      else if (ref.includes("lettre-magique") || ref.includes("localhost")) { /* same site, keep Direct */ }
      else sessions[pv.session_id].source = "Autres";
    }
  }
  const sourceCounts: Record<string, { visits: number; conversions: number }> = {};
  for (const [, sess] of Object.entries(sessions)) {
    const src = sess.source;
    if (!sourceCounts[src]) sourceCounts[src] = { visits: 0, conversions: 0 };
    sourceCounts[src].visits++;
    if (sess.paths.has("/generateur")) sourceCounts[src].conversions++;
  }
  // Sort: Direct first, then by visits desc
  const trafficSources = Object.entries(sourceCounts)
    .map(([source, d]) => ({ source, visits: d.visits, conversions: d.conversions }))
    .sort((a, b) => (a.source === "Direct" ? -1 : b.source === "Direct" ? 1 : b.visits - a.visits));

  // ── Funnel ──
  const funnelVisitors = uniqueVisits30d;
  const funnelLettersGenerated = new Set(
    lettersArr
      .filter((l) => l.created_at >= thirtyDaysAgo)
      .map((l: { user_id: string | null; fingerprint: string | null }) => l.user_id ?? l.fingerprint)
      .filter(Boolean)
  ).size;
  const funnelAccountsCreated = allProfilesList.filter((p) => p.created_at >= thirtyDaysAgo).length;

  // Recalculate counts excluding admin
  const filteredLettersThisWeek = lettersArr.filter((l) => l.created_at >= sevenDaysAgo).length;
  const filteredAnonLetters = lettersArr.filter((l) => !l.user_id);
  const filteredAnonThisWeek = filteredAnonLetters.filter((l) => l.created_at >= sevenDaysAgo).length;

  return {
    usersCount: allProfilesList.length,
    lettersCount: lettersArr.length,
    lettersThisWeek: filteredLettersThisWeek,
    anonLettersCount: filteredAnonLetters.length,
    anonLettersThisWeek: filteredAnonThisWeek,
    uniqueVisits30d,
    uniqueVisits7d,
    proCount: (allProfiles ?? []).filter((p: { id: string; is_pro: boolean }) => p.is_pro && !adminIds.has(p.id)).length,
    promoTotalRedemptions,
    promoCodes,
    recentLetters: (recentLetters ?? []).filter((l: LetterRow) => !l.user_id || !adminIds.has(l.user_id)),
    recentUsers,
    funnelVisitors,
    funnelGeneratorVisits,
    funnelLettersGenerated,
    funnelAccountsCreated,
    lettersByType,
    timelineData,
    usersWith1Letter,
    usersWith2PlusLetters,
    usersWith5PlusLetters,
    returnRate30d,
    anonTotalGenerated,
    anonThenSignedUp,
    signedUpThenGenerated,
    signedUpThenPro,
    promoUsersCount,
    promoAvgLetters,
    nonPromoUsersCount,
    nonPromoAvgLetters,
    promoProRate,
    nonPromoProRate,
    trafficSources,
  };
}

/* ───────── UI helpers ───────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] uppercase tracking-[2px] mb-4"
      style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
    >
      {children}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="p-4 md:p-6 border-[2px]" style={{ borderColor: "var(--rule)", background: "var(--white-warm)" }}>
      <div
        className="text-[9px] md:text-[10px] uppercase tracking-[1.5px] md:tracking-[2px] mb-2 md:mb-3 min-h-[28px] md:min-h-[20px] flex items-end"
        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
      >
        {label}
      </div>
      <div
        className="text-2xl md:text-5xl font-extrabold tracking-[-1px] md:tracking-[-2px] leading-none break-words"
        style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[10px] md:text-[11px] mt-1.5 md:mt-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ───────── page ───────── */

export default async function AdminPage() {
  const stats = await getStats();
  if (!stats) redirect("/");

  const totalLetters = stats.lettersCount || 1;

  return (
    <div className="pt-16">
      {/* Header */}
      <section
        className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background: "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />
        <div className="max-w-[980px] mx-auto">
          <div
            className="text-[11px] uppercase tracking-[3px] mb-5"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Administration
          </div>
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px]"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px, 3.5vw, 44px)" }}
          >
            Tableau de{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
              bord
            </em>
          </h1>
        </div>
      </section>

      <section className="px-4 md:px-16 py-10 md:py-16">
        <div className="max-w-[980px] mx-auto space-y-12">

          {/* ═══ 1. FUNNEL DE CONVERSION ═══ */}
          <div>
            <SectionLabel>Funnel de conversion (30j)</SectionLabel>
            <FunnelBar
              steps={[
                { label: "Visiteurs", value: stats.funnelVisitors },
                { label: "Page générateur", value: stats.funnelGeneratorVisits },
                { label: "Ont généré un courrier", value: stats.funnelLettersGenerated },
                { label: "Comptes créés", value: stats.funnelAccountsCreated },
                { label: "Abonnés Pro", value: stats.proCount },
              ]}
            />
          </div>

          {/* ═══ 2. VUE D'ENSEMBLE ═══ */}
          <div>
            <SectionLabel>Vue d&apos;ensemble</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
              <Stat label="Inscrits" value={stats.usersCount} />
              <Stat label="Abonnés Pro" value={stats.proCount} sub={`${stats.usersCount > 0 ? Math.round((stats.proCount / stats.usersCount) * 100) : 0}% des inscrits`} />
              <Stat label="Courriers générés" value={stats.lettersCount} />
              <Stat label="Courriers (7j)" value={stats.lettersThisWeek} />
              <Stat label="Visiteurs (30j)" value={stats.uniqueVisits30d} sub="sessions uniques" />
              <Stat label="Visiteurs (7j)" value={stats.uniqueVisits7d} sub="sessions uniques" />
              <Stat label="MRR" value="0 €" sub="Stripe non connecté" />
              <Stat label="ARPU" value="—" sub="revenu / utilisateurs payants" />
            </div>
          </div>

          {/* ═══ 3. COURRIERS PAR TYPE ═══ */}
          <div>
            <SectionLabel>Courriers par type</SectionLabel>
            <div className="border-[2px] overflow-x-auto" style={{ borderColor: "var(--rule)" }}>
              {/* Header row */}
              <div
                className="grid grid-cols-[minmax(100px,1fr)_50px_40px_40px_80px] md:grid-cols-[1fr_70px_70px_60px_120px] px-4 md:px-5 py-2"
                style={{ background: "var(--ink)", minWidth: 0 }}
              >
                {["Type", "Total", "7j", "%", ""].map((h) => (
                  <div
                    key={h}
                    className="text-[9px] uppercase tracking-[1px]"
                    style={{ fontFamily: "var(--font-dm-mono)", color: "var(--white-warm)" }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {stats.lettersByType.length === 0 ? (
                <div className="px-5 py-4 text-sm" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
                  Aucun courrier encore.
                </div>
              ) : (
                stats.lettersByType.map((lt, i) => {
                  const pct = Math.round((lt.total / totalLetters) * 100);
                  return (
                    <div
                      key={lt.type}
                      className="grid grid-cols-[minmax(100px,1fr)_50px_40px_40px_80px] md:grid-cols-[1fr_70px_70px_60px_120px] items-center px-4 md:px-5 py-2.5"
                      style={{
                        borderTop: "1px solid var(--rule)",
                        background: i % 2 === 0 ? "var(--white-warm)" : "var(--paper2)",
                      }}
                    >
                      <div className="text-xs md:text-sm font-bold truncate" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                        {lt.type_name}
                      </div>
                      <div className="text-[12px] font-bold" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}>
                        {lt.total}
                      </div>
                      <div className="text-[12px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                        {lt.last7}
                      </div>
                      <div className="text-[11px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                        {pct}%
                      </div>
                      <div className="h-3 relative" style={{ background: "#f0ece4" }}>
                        <div
                          className="h-full"
                          style={{ width: `${Math.max(pct, 3)}%`, background: "var(--accent)" }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ═══ 4. SOURCES DE TRAFIC (7j) ═══ */}
          <div>
            <SectionLabel>Sources de trafic (7j)</SectionLabel>
            <div className="border-[2px] overflow-x-auto" style={{ borderColor: "var(--rule)" }}>
              <div
                className="grid grid-cols-[minmax(90px,1fr)_60px_70px_50px] md:grid-cols-[1fr_90px_90px_90px] px-4 md:px-5 py-2"
                style={{ background: "var(--ink)", minWidth: 0 }}
              >
                {["Source", "Visites", "Conv.", "Taux"].map((h) => (
                  <div
                    key={h}
                    className="text-[9px] uppercase tracking-[1px]"
                    style={{ fontFamily: "var(--font-dm-mono)", color: "var(--white-warm)" }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {stats.trafficSources.map((src, i) => {
                const rate = src.visits > 0 ? Math.round((src.conversions / src.visits) * 100) : 0;
                return (
                  <div
                    key={src.source}
                    className="grid grid-cols-[minmax(90px,1fr)_60px_70px_50px] md:grid-cols-[1fr_90px_90px_90px] items-center px-4 md:px-5 py-2.5"
                    style={{
                      borderTop: "1px solid var(--rule)",
                      background: i % 2 === 0 ? "var(--white-warm)" : "var(--paper2)",
                    }}
                  >
                    <div className="text-xs md:text-sm truncate" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                      {src.source}
                    </div>
                    <div className="text-[12px] font-bold" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}>
                      {src.visits}
                    </div>
                    <div className="text-[12px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                      {src.conversions}
                    </div>
                    <div className="text-[12px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                      {rate}%
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] mt-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              Sources détectées via referrer et paramètres UTM. Ajouter ?utm_source=...&amp;utm_medium=... aux liens de campagne pour un suivi précis.
            </div>
          </div>

          {/* ═══ 5. FUNNEL FREEMIUM ═══ */}
          <div>
            <SectionLabel>Funnel freemium</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
              <Stat label="Courriers gratuits" value={stats.anonTotalGenerated} sub="sans compte" />
              <Stat
                label="Comptes créés après essai"
                value={stats.anonThenSignedUp}
                sub={stats.anonTotalGenerated > 0 ? `taux fingerprint → compte` : "—"}
              />
              <Stat
                label="Ont généré (connectés)"
                value={stats.signedUpThenGenerated}
                sub={`${stats.usersCount > 0 ? Math.round((stats.signedUpThenGenerated / stats.usersCount) * 100) : 0}% des inscrits`}
              />
              <Stat
                label="Upgrade Pro"
                value={stats.signedUpThenPro}
                sub={`${stats.signedUpThenGenerated > 0 ? Math.round((stats.signedUpThenPro / stats.signedUpThenGenerated) * 100) : 0}% des actifs`}
              />
            </div>
          </div>

          {/* ═══ 6. CHRONOLOGIE 30j ═══ */}
          <div>
            <SectionLabel>Courriers & inscriptions — 30 derniers jours</SectionLabel>
            <div
              className="border-[2px] p-4"
              style={{ borderColor: "var(--rule)", background: "var(--white-warm)" }}
            >
              <TimelineChart data={stats.timelineData} />
              <div className="flex gap-6 mt-2 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-[3px]" style={{ background: "#c0392b" }} />
                  <span className="text-[10px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                    Courriers
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-[3px]" style={{ background: "#c8a84e" }} />
                  <span className="text-[10px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                    Inscriptions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ 7. RÉTENTION ═══ */}
          <div>
            <SectionLabel>Rétention</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
              <Stat label="1 courrier" value={stats.usersWith1Letter} sub="utilisateurs" />
              <Stat label="2+ courriers" value={stats.usersWith2PlusLetters} sub="utilisateurs" />
              <Stat label="5+ courriers" value={stats.usersWith5PlusLetters} sub="utilisateurs" />
              <Stat
                label="Taux de retour 30j"
                value={`${stats.returnRate30d}%`}
                sub="2+ jours distincts d'usage"
              />
            </div>
          </div>

          {/* ═══ 8. CODES PROMO — gestion ═══ */}
          <div>
            <SectionLabel>Codes promo — gestion</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] mb-4">
              <Stat label="Utilisateurs promo" value={stats.promoUsersCount} sub={`moy. ${stats.promoAvgLetters} courrier(s)/user`} />
              <Stat label="Utilisateurs non-promo" value={stats.nonPromoUsersCount} sub={`moy. ${stats.nonPromoAvgLetters} courrier(s)/user`} />
              <Stat
                label="Taux Pro (promo vs non)"
                value={`${stats.promoProRate}% vs ${stats.nonPromoProRate}%`}
                sub="conversion en compte Pro"
              />
            </div>
            <PromoManager />
          </div>

          {/* ═══ 9. DERNIERS COURRIERS ═══ */}
          <div>
            <SectionLabel>Derniers courriers générés</SectionLabel>
            <div className="border-[2px]" style={{ borderColor: "var(--rule)" }}>
              {stats.recentLetters.length === 0 ? (
                <div className="px-5 py-4 text-sm" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
                  Aucun courrier encore.
                </div>
              ) : (
                stats.recentLetters.map((letter, i) => (
                  <div
                    key={letter.id}
                    className="flex items-center justify-between px-5 py-3.5"
                    style={{
                      borderTop: i > 0 ? "1px solid var(--rule)" : undefined,
                      background: i % 2 === 0 ? "var(--white-warm)" : "var(--paper2)",
                    }}
                  >
                    <div>
                      <div className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                        {letter.type_name || letter.type}
                      </div>
                      <div className="text-[10px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                        {letter.email || letter.sender_name || "—"}
                        {!letter.user_id && (
                          <span style={{ color: "var(--accent)", marginLeft: 6 }}>sans compte</span>
                        )}
                      </div>
                    </div>
                    <div className="text-[11px] text-right" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                      {new Date(letter.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ═══ 10. DERNIERS INSCRITS (interactive) ═══ */}
          <div>
            <SectionLabel>Derniers inscrits</SectionLabel>
            <UserDetailPanel users={stats.recentUsers} />
          </div>

        </div>
      </section>
    </div>
  );
}
