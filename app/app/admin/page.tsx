import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — LettreMagique",
  robots: "noindex",
};

interface Stats {
  usersCount: number;
  lettersCount: number;
  lettersThisWeek: number;
  anonLettersCount: number;
  anonLettersThisWeek: number;
  uniqueVisits30d: number;
  uniqueVisits7d: number;
  proCount: number;
  recentLetters: {
    id: string;
    created_at: string;
    type_name: string;
    type: string;
    email: string;
    sender_name: string;
  }[];
  recentUsers: {
    id: string;
    email: string;
    created_at: string;
    is_pro: boolean;
  }[];
}

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
  ] = await Promise.all([
    (admin.from("profiles") as any).select("*", { count: "exact", head: true }),
    (admin.from("letters") as any).select("*", { count: "exact", head: true }),
    (admin.from("letters") as any)
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo),
    (admin.from("letters") as any)
      .select("*", { count: "exact", head: true })
      .is("user_id", null),
    (admin.from("letters") as any)
      .select("*", { count: "exact", head: true })
      .is("user_id", null)
      .gte("created_at", sevenDaysAgo),
    (admin.from("page_views") as any)
      .select("session_id")
      .gte("created_at", thirtyDaysAgo),
    (admin.from("page_views") as any)
      .select("session_id")
      .gte("created_at", sevenDaysAgo),
    (admin.from("letters") as any)
      .select("id, created_at, type_name, type, email, sender_name")
      .order("created_at", { ascending: false })
      .limit(10),
    (admin.from("profiles") as any)
      .select("*", { count: "exact", head: true })
      .eq("is_pro", true),
  ]);

  const uniqueVisits30d = new Set((visits30d ?? []).map((r: { session_id: string }) => r.session_id)).size;
  const uniqueVisits7d = new Set((visits7d ?? []).map((r: { session_id: string }) => r.session_id)).size;

  // Derniers inscrits via auth.users
  const { data: authUsers } = await admin.auth.admin.listUsers({ page: 1, perPage: 15 });
  const sortedUsers = (authUsers?.users ?? [])
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 15);

  // Récupérer is_pro pour ces utilisateurs
  const userIds = sortedUsers.map((u) => u.id);
  const { data: profilesData } = await (admin.from("profiles") as any)
    .select("id, is_pro")
    .in("id", userIds);
  const proMap: Record<string, boolean> = {};
  for (const p of profilesData ?? []) proMap[p.id] = p.is_pro;

  const recentUsers = sortedUsers.map((u) => ({
    id: u.id,
    email: u.email ?? "—",
    created_at: u.created_at,
    is_pro: proMap[u.id] ?? false,
  }));

  return {
    usersCount: usersCount ?? 0,
    lettersCount: lettersCount ?? 0,
    lettersThisWeek: lettersThisWeek ?? 0,
    anonLettersCount: anonLettersCount ?? 0,
    anonLettersThisWeek: anonLettersThisWeek ?? 0,
    uniqueVisits30d,
    uniqueVisits7d,
    proCount: proCount ?? 0,
    recentLetters: recentLetters ?? [],
    recentUsers,
  };
}

function Stat({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div
      className="p-6 border-[2px]"
      style={{ borderColor: "var(--rule)", background: "var(--white-warm)" }}
    >
      <div
        className="text-[10px] uppercase tracking-[2px] mb-3"
        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
      >
        {label}
      </div>
      <div
        className="text-5xl font-extrabold tracking-[-2px] leading-none"
        style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] mt-2"
          style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default async function AdminPage() {
  const stats = await getStats();

  if (!stats) {
    redirect("/");
  }

  return (
    <div className="pt-14">
      <section
        className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
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
        <div className="max-w-[980px] mx-auto space-y-10">

          {/* KPIs */}
          <div>
            <div
              className="text-[10px] uppercase tracking-[2px] mb-4"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Vue d&apos;ensemble
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              <Stat label="Inscrits" value={stats.usersCount} />
              <Stat label="Abonnés Pro" value={stats.proCount} sub={`${stats.usersCount > 0 ? Math.round((stats.proCount / stats.usersCount) * 100) : 0}% des inscrits`} />
              <Stat label="Courriers générés" value={stats.lettersCount} />
              <Stat label="Courriers (7j)" value={stats.lettersThisWeek} />
              <Stat label="Visiteurs uniques (30j)" value={stats.uniqueVisits30d} sub="hors bots" />
              <Stat label="Visiteurs uniques (7j)" value={stats.uniqueVisits7d} sub="hors bots" />
            </div>
          </div>

          {/* Essais anonymes */}
          <div>
            <div
              className="text-[10px] uppercase tracking-[2px] mb-4"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Essais sans compte
            </div>
            <div className="grid grid-cols-2 gap-[2px]">
              <Stat
                label="Courriers gratuits (total)"
                value={stats.anonLettersCount}
                sub={`${stats.lettersCount > 0 ? Math.round((stats.anonLettersCount / stats.lettersCount) * 100) : 0}% du total généré`}
              />
              <Stat
                label="Courriers gratuits (7j)"
                value={stats.anonLettersThisWeek}
                sub="utilisateurs sans compte"
              />
            </div>
          </div>

          {/* Derniers courriers */}
          <div>
            <div
              className="text-[10px] uppercase tracking-[2px] mb-4"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Derniers courriers générés
            </div>
            <div
              className="border-[2px]"
              style={{ borderColor: "var(--rule)" }}
            >
              {stats.recentLetters.length === 0 ? (
                <div
                  className="px-5 py-4 text-sm"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
                >
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
                      <div
                        className="text-sm font-bold"
                        style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                      >
                        {letter.type_name || letter.type}
                      </div>
                      <div
                        className="text-[10px]"
                        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                      >
                        {letter.email || letter.sender_name || "—"}
                      </div>
                    </div>
                    <div
                      className="text-[11px] text-right"
                      style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                    >
                      {new Date(letter.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Derniers inscrits */}
          <div>
            <div
              className="text-[10px] uppercase tracking-[2px] mb-4"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Derniers inscrits
            </div>
            <div className="border-[2px]" style={{ borderColor: "var(--rule)" }}>
              {stats.recentUsers.length === 0 ? (
                <div
                  className="px-5 py-4 text-sm"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
                >
                  Aucun inscrit encore.
                </div>
              ) : (
                stats.recentUsers.map((u, i) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between px-5 py-3"
                    style={{
                      borderTop: i > 0 ? "1px solid var(--rule)" : undefined,
                      background: i % 2 === 0 ? "var(--white-warm)" : "var(--paper2)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="text-sm"
                        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}
                      >
                        {u.email}
                      </div>
                      {u.is_pro && (
                        <span
                          className="text-[9px] uppercase tracking-[1px] px-1.5 py-0.5"
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            background: "var(--accent)",
                            color: "#fff",
                          }}
                        >
                          Pro
                        </span>
                      )}
                    </div>
                    <div
                      className="text-[11px] shrink-0"
                      style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                    >
                      {new Date(u.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
