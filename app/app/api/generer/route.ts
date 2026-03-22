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
    // Récupérer ou créer le profil (upsert au cas où le trigger n'a pas tourné)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // Compter les lettres déjà générées par cet utilisateur
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const prompt = buildPrompt(type, formData, senderName, senderAddress);

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Détecter si Claude a refusé de générer le courrier
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
    const isRefusal = refusalPatterns.some((re) => re.test(text.trim()));
    if (isRefusal) {
      return Response.json(
        { error: "refused", text },
        { status: 422 }
      );
    }

    // Sauvegarder la lettre générée
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (getSupabaseAdmin().from("letters") as any).insert({
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
