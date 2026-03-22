import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/lib/prompts";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { type, formData, senderName, senderAddress } = await req.json();

    if (!type || !formData) {
      return Response.json({ error: "Données manquantes" }, { status: 400 });
    }

    const prompt = buildPrompt(type, formData, senderName, senderAddress);

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

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
