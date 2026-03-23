import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json({ error: "Email invalide" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    await (admin.from("leads") as any).upsert(
      { email: email.toLowerCase().trim(), source: "pdf_gate", created_at: new Date().toISOString() },
      { onConflict: "email", ignoreDuplicates: true }
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Lead error:", err);
    return Response.json({ error: "Erreur" }, { status: 500 });
  }
}
