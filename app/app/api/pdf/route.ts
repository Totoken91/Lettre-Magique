import { generateLetterPDF } from "@/lib/pdf/generator";

export async function POST(req: Request) {
  try {
    const {
      text,
      senderName,
      senderAddress,
      senderPhone,
      senderEmail,
      typeName,
      refNumber,
      signatureMode,
      signatureImageBase64,
    } = await req.json();

    if (!text) {
      return Response.json({ error: "Texte manquant" }, { status: 400 });
    }

    const pdfBytes = await generateLetterPDF({
      text,
      senderName,
      senderAddress,
      senderPhone,
      senderEmail,
      typeName,
      refNumber,
      signatureMode,
      signatureImageBase64,
    });

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="lettre-lettreMagique.pdf"`,
      },
    });
  } catch (err) {
    console.error("Erreur PDF:", err);
    return Response.json({ error: "Erreur génération PDF" }, { status: 500 });
  }
}
