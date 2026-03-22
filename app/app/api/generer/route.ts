import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/lib/prompts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { type, formData, senderName, senderAddress } = await req.json();

    if (!type || !formData) {
      return Response.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Vérifier l'authentification
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Vérifier le statut pro
    const { data: profile } = await getSupabaseAdmin()
      .from("profiles")
      .select("is_pro")
      .eq("id", user.id)
      .single();

    const isPro = profile?.is_pro === true;

    if (!isPro) {
      // Compter les lettres déjà générées par cet utilisateur
      const { count } = await getSupabaseAdmin()
        .from("letters")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if ((count ?? 0) >= 1) {
        return Response.json(
          {
            error: "Vous avez utilisé votre courrier gratuit. Passez en Pro pour en générer à l'infini.",
            limitReached: true,
          },
          { status: 403 }
        );
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

    // Sauvegarder la lettre générée
    await getSupabaseAdmin().from("letters").insert({
      user_id: user.id,
      email: user.email,
      type,
      type_name: type,
      form_data: formData,
      generated_text: text,
      sender_name: senderName,
    });

    return Response.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Erreur génération:", message);
    return Response.json(
      { error: "Erreur lors de la génération", detail: message },
      { status: 500 }
    );
  }
}
