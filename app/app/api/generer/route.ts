import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/lib/prompts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const refusalPatterns = [
  /^je ne peux pas/i,
  /^je suis désolé.{0,20}mais je ne peux pas/i,
  /^désolé.{0,20}je ne peux pas/i,
  /^il m'est impossible/i,
  /^je dois refuser/i,
  /contrevient à mes principes/i,
  /contraire à mes valeurs/i,
  /en dehors de ce que je peux/i,
];

export async function POST(req: Request) {
  try {
    const { type, formData, senderName, senderAddress } = await req.json();

    if (!type || !formData) {
      return Response.json({ error: "Données manquantes" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    let isAnonymous = false;

    if (!user) {
      // Flux anonyme : 1 courrier gratuit tracké par cookie
      const cookieHeader = req.headers.get("cookie") || "";
      const hasUsed = cookieHeader.split(";").some((c) => c.trim().startsWith("lm_anon_used=1"));
      if (hasUsed) {
        return Response.json(
          {
            error: "Vous avez utilisé votre courrier gratuit. Créez un compte ou passez en Pro pour en générer d'autres.",
            limitReached: true,
          },
          { status: 403 }
        );
      }
      isAnonymous = true;
    } else {
      // Flux authentifié : vérifier pro/crédits
      await (getSupabaseAdmin().from("profiles") as any).upsert(
        { id: user.id, is_pro: false },
        { onConflict: "id", ignoreDuplicates: true }
      );

      const { data: profile } = await getSupabaseAdmin()
        .from("profiles")
        .select("is_pro, credits")
        .eq("id", user.id)
        .single() as { data: { is_pro: boolean; credits: number } | null };

      const isPro = profile?.is_pro === true;
      const credits = profile?.credits ?? 0;

      if (!isPro) {
        const { count } = await (getSupabaseAdmin().from("letters") as any)
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        const limit = Math.max(1, credits);
        if ((count ?? 0) >= limit) {
          return Response.json(
            {
              error: "Vous avez utilisé votre courrier gratuit. Passez en Pro pour en générer à l'infini.",
              limitReached: true,
            },
            { status: 403 }
          );
        }
      }
    }

    const prompt = buildPrompt(type, formData, senderName, senderAddress);

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const isRefusal = refusalPatterns.some((re) => re.test(text.trim()));
    if (isRefusal) {
      return Response.json({ error: "refused", text }, { status: 422 });
    }

    if (!isAnonymous && user) {
      await (getSupabaseAdmin().from("letters") as any).insert({
        user_id: user.id,
        email: user.email,
        type,
        type_name: type,
        form_data: formData,
        generated_text: text,
        sender_name: senderName,
      });
    }

    const response = Response.json({ text });
    if (isAnonymous) {
      response.headers.set(
        "Set-Cookie",
        "lm_anon_used=1; Path=/; Max-Age=31536000; SameSite=Lax"
      );
    }
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Erreur génération:", message);
    return Response.json(
      { error: "Erreur lors de la génération", detail: message },
      { status: 500 }
    );
  }
}
