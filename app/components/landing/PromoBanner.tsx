import { getSupabaseAdmin } from "@/lib/supabase/admin";

export default async function PromoBanner() {
  const admin = getSupabaseAdmin();
  const { data } = await (admin.from("promo_codes") as any)
    .select("code, credits, description")
    .eq("active", true)
    .eq("show_banner", true)
    .limit(1)
    .single();

  if (!data) return null;

  const desc = data.description || `${data.credits} courrier${data.credits !== 1 ? "s" : ""} offert${data.credits !== 1 ? "s" : ""}`;

  return (
    <a href="/generateur" className="block w-full no-underline" style={{ textDecoration: "none" }}>
      <div className="promo-banner-sunset w-full flex items-center justify-center gap-3 py-3 px-4">
        <span style={{ fontSize: "16px" }}>🎁</span>
        <span
          className="text-white font-bold uppercase tracking-[1px] sm:tracking-[1.5px] text-center leading-[1.6]"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px" }}
        >
          Code{" "}
          <span
            className="px-1.5 py-0.5 mx-0.5"
            style={{ background: "rgba(255,255,255,0.2)", letterSpacing: "2px" }}
          >
            {data.code}
          </span>
          {" "}= {desc}{" "}
          <span style={{ opacity: 0.8, fontWeight: 400 }}>— Essayer →</span>
        </span>
      </div>
    </a>
  );
}
