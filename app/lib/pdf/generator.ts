import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface PDFParams {
  text: string;
  senderName: string;
  senderAddress: string;
  typeName: string;
}

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const MARGIN = 72; // ~2.5cm
const LINE_HEIGHT = 16;
const FONT_SIZE = 11;

export async function generateLetterPDF(params: PDFParams): Promise<Uint8Array> {
  const { text, typeName } = params;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const inkColor = rgb(0.051, 0.051, 0.051); // #0d0d0d
  const accentColor = rgb(0.784, 0.294, 0.184); // #c84b2f
  const mutedColor = rgb(0.478, 0.455, 0.408); // #7a7468

  // ─── En-tête discret LettreMagique ───
  page.drawText("LettreMagique.fr", {
    x: MARGIN,
    y: A4_HEIGHT - 36,
    size: 8,
    font: helvetica,
    color: accentColor,
  });
  page.drawText(`Courrier : ${typeName}`, {
    x: A4_WIDTH - MARGIN - 120,
    y: A4_HEIGHT - 36,
    size: 8,
    font: helvetica,
    color: mutedColor,
  });

  // Ligne de séparation en-tête
  page.drawLine({
    start: { x: MARGIN, y: A4_HEIGHT - 44 },
    end: { x: A4_WIDTH - MARGIN, y: A4_HEIGHT - 44 },
    thickness: 0.5,
    color: rgb(0.784, 0.751, 0.690), // --rule
  });

  // ─── Corps de la lettre ───
  let y = A4_HEIGHT - 72;
  const lines = text.split("\n");
  const maxWidth = A4_WIDTH - MARGIN * 2;

  for (const rawLine of lines) {
    if (y < MARGIN + 60) {
      // Nouvelle page si débordement
      const newPage = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      // On continue sur la nouvelle page (simplifié)
      y = A4_HEIGHT - MARGIN;
      void newPage;
    }

    if (rawLine.trim() === "") {
      y -= LINE_HEIGHT * 0.6;
      continue;
    }

    // Détecter les lignes en gras (Objet:, etc.)
    const isBold =
      rawLine.startsWith("Objet") ||
      rawLine.startsWith("OBJET") ||
      rawLine.startsWith("Madame, Monsieur") ||
      rawLine.startsWith("Madame,") ||
      rawLine.startsWith("Monsieur,");

    const font = isBold ? timesBold : timesRoman;

    // Word wrap simple
    const words = rawLine.split(" ");
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, FONT_SIZE);

      if (width > maxWidth && currentLine) {
        page.drawText(currentLine, {
          x: MARGIN,
          y,
          size: FONT_SIZE,
          font,
          color: inkColor,
        });
        y -= LINE_HEIGHT;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      page.drawText(currentLine, {
        x: MARGIN,
        y,
        size: FONT_SIZE,
        font,
        color: inkColor,
      });
      y -= LINE_HEIGHT;
    }
  }

  // ─── Pied de page ───
  const footerY = 36;
  page.drawLine({
    start: { x: MARGIN, y: footerY + 14 },
    end: { x: A4_WIDTH - MARGIN, y: footerY + 14 },
    thickness: 0.5,
    color: rgb(0.784, 0.751, 0.690),
  });

  page.drawText(
    "Créé avec LettreMagique.fr · Outil d'aide à la rédaction, ne constitue pas un conseil juridique.",
    {
      x: MARGIN,
      y: footerY,
      size: 7,
      font: helvetica,
      color: mutedColor,
    }
  );

  pdfDoc.setTitle(`Courrier ${typeName} — LettreMagique`);
  pdfDoc.setAuthor("LettreMagique.fr");
  pdfDoc.setCreator("LettreMagique · Propulsé par Claude (Anthropic)");

  return await pdfDoc.save();
}
