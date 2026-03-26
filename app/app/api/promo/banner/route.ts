import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const revalidate = 60; // cache 1 min

export async function GET() {
  const admin = getSupabaseAdmin();
  const { data } = await (admin.from("promo_codes") as any)
    .select("code, credits, description")
    .eq("active", true)
    .eq("show_banner", true)
    .limit(1)
    .single();

  if (!data) return Response.json(null);
  return Response.json(data);
}
