import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface PDFParams {
  text: string;
  senderName: string;
  senderAddress: string;
  typeName: string;
}

const A4_W = 595.28;
const A4_H = 841.89;

// Margins
const ML = 64;  // left
const MR = 64;  // right
const BODY_W = A4_W - ML - MR;

// Colors
const C_INK    = rgb(0.051, 0.051, 0.051);   // #0d0d0d
const C_ACCENT = rgb(0.784, 0.294, 0.184);   // #c84b2f
const C_MUTED  = rgb(0.478, 0.455, 0.408);   // #7a7468
const C_RULE   = rgb(0.784, 0.751, 0.690);   // #c8c0b0
const C_PAPER  = rgb(0.961, 0.941, 0.910);   // #f5f0e8
const C_WHITE  = rgb(1, 1, 1);

// Typography
const SZ_BODY  = 10.5;
const SZ_SMALL = 8;
const SZ_LABEL = 7.5;
const LH       = 17;   // line height body
const LH_TIGHT = 14;   // line height in sender block

function wrapText(
  text: string,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  size: number,
  maxW: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const test = cur ? `${cur} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxW && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export async function generateLetterPDF(params: PDFParams): Promise<Uint8Array> {
  const { text, senderName, senderAddress, typeName } = params;

  const pdfDoc = await PDFDocument.create();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold    = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontMono    = await pdfDoc.embedFont(StandardFonts.Courier);
  const fontSans    = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ─── Draw page chrome (header + sidebar + footer) ───────────────────────
  const drawChrome = (page: ReturnType<PDFDocument["addPage"]>, pageNum: number, totalPages: number) => {

    // ── Top accent bar (full width, 5px) ──
    page.drawRectangle({
      x: 0, y: A4_H - 5,
      width: A4_W, height: 5,
      color: C_ACCENT,
    });

    // ── Left accent sidebar (thin, from top bar to footer line) ──
    page.drawRectangle({
      x: 0, y: 52,
      width: 3, height: A4_H - 5 - 52,
      color: C_ACCENT,
      opacity: 0.18,
    });

    // ── Header zone (y = A4_H - 5 - 44 to A4_H - 5) ──
    const headerY = A4_H - 46;

    // Logo mark: small square with "LM"
    page.drawRectangle({
      x: ML, y: headerY + 4,
      width: 22, height: 22,
      color: C_ACCENT,
    });
    page.drawText("LM", {
      x: ML + 3, y: headerY + 10,
      size: 9, font: fontSansBold, color: C_WHITE,
    });

    // Brand name
    page.drawText("Lettre", {
      x: ML + 28, y: headerY + 14,
      size: 10, font: fontSansBold, color: C_INK,
    });
    page.drawText("Magique", {
      x: ML + 28 + fontSansBold.widthOfTextAtSize("Lettre", 10), y: headerY + 14,
      size: 10, font: fontSansBold, color: C_ACCENT,
    });
    page.drawText("lettre-magique.com", {
      x: ML + 28, y: headerY + 4,
      size: 6.5, font: fontSans, color: C_MUTED,
    });

    // Doc type badge (right)
    const typeLabel = typeName.toUpperCase();
    const typeLabelW = fontSans.widthOfTextAtSize(typeLabel, SZ_LABEL);
    const badgeX = A4_W - MR - typeLabelW - 16;
    page.drawRectangle({
      x: badgeX - 2, y: headerY + 7,
      width: typeLabelW + 18, height: 15,
      color: C_PAPER,
    });
    page.drawText(typeLabel, {
      x: badgeX + 7, y: headerY + 11,
      size: SZ_LABEL, font: fontSans, color: C_MUTED,
    });

    // Header rule
    page.drawLine({
      start: { x: ML, y: headerY },
      end:   { x: A4_W - MR, y: headerY },
      thickness: 0.5, color: C_RULE,
    });

    // ── Footer ──
    const footerY = 38;
    page.drawLine({
      start: { x: ML, y: footerY + 16 },
      end:   { x: A4_W - MR, y: footerY + 16 },
      thickness: 0.4, color: C_RULE,
    });

    // Footer left: disclaimer
    page.drawText("Document généré par LettreMagique · Outil d'aide à la rédaction, ne constitue pas un conseil juridique.", {
      x: ML, y: footerY + 5,
      size: 6.5, font: fontSans, color: C_MUTED,
    });

    // Footer right: page number
    if (totalPages > 1) {
      const pnText = `${pageNum} / ${totalPages}`;
      const pnW = fontSans.widthOfTextAtSize(pnText, 7);
      page.drawText(pnText, {
        x: A4_W - MR - pnW, y: footerY + 5,
        size: 7, font: fontSans, color: C_MUTED,
      });
    }
  };

  // ─── Parse & render body ─────────────────────────────────────────────────
  // First pass: split all lines with wrapping to know total pages
  const rawLines = text.split("\n");

  // Header zone bottom = A4_H - 46 - 6 (rule at headerY = A4_H-46)
  const CONTENT_TOP    = A4_H - 46 - 14;  // just below header rule
  const CONTENT_BOTTOM = 38 + 16 + 10;    // just above footer rule

  // ── Sender block height estimation ──
  const senderLines = [senderName, ...senderAddress.split("\n").filter(Boolean)];
  const SENDER_BLOCK_H = 14 + senderLines.length * LH_TIGHT + 14; // padding top + lines + padding bottom

  // ── Parse body lines ──
  interface RenderLine {
    text: string;
    font: typeof fontRegular;
    size: number;
    color: typeof C_INK;
    indent: number;
    spaceBefore: number;
    isObjet: boolean;
  }

  const renderLines: RenderLine[] = [];

  for (const raw of rawLines) {
    if (raw.trim() === "") {
      renderLines.push({ text: "", font: fontRegular, size: SZ_BODY, color: C_INK, indent: 0, spaceBefore: LH * 0.5, isObjet: false });
      continue;
    }

    const isBoldLine =
      /^(Madame|Monsieur|Objet|OBJET|Veuillez|Je vous)/i.test(raw.trim());
    const isObjet = /^(Objet|OBJET)\s*:/.test(raw.trim());

    const font = isBoldLine ? fontBold : fontRegular;
    const wrapped = wrapText(raw.trim(), font, SZ_BODY, BODY_W);

    wrapped.forEach((wl, i) => {
      renderLines.push({
        text: wl,
        font,
        size: SZ_BODY,
        color: C_INK,
        indent: 0,
        spaceBefore: i === 0 ? 0 : 0,
        isObjet: isObjet && i === 0,
      });
    });
  }

  // ── Measure total height needed ──
  const lineH = (rl: RenderLine) => rl.text === "" ? rl.spaceBefore : LH;

  let totalH = SENDER_BLOCK_H + LH; // sender block + gap
  for (const rl of renderLines) totalH += lineH(rl);

  const firstPageH = CONTENT_TOP - CONTENT_BOTTOM;
  const otherPageH = CONTENT_TOP - CONTENT_BOTTOM;

  let totalPages = 1;
  let remaining = totalH - firstPageH;
  while (remaining > 0) { totalPages++; remaining -= otherPageH; }

  // ── Create pages ──
  const pages: ReturnType<PDFDocument["addPage"]>[] = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(pdfDoc.addPage([A4_W, A4_H]));
  }
  pages.forEach((p, i) => drawChrome(p, i + 1, totalPages));

  // ── Render sender block on page 1 ──
  let pageIdx = 0;
  let curPage = pages[0];
  let y = CONTENT_TOP;

  // Sender block background
  curPage.drawRectangle({
    x: ML, y: y - SENDER_BLOCK_H,
    width: BODY_W, height: SENDER_BLOCK_H,
    color: C_PAPER,
  });
  // Left accent stripe on sender block
  curPage.drawRectangle({
    x: ML, y: y - SENDER_BLOCK_H,
    width: 3, height: SENDER_BLOCK_H,
    color: C_ACCENT,
  });

  // "EXPÉDITEUR" label
  y -= 14;
  curPage.drawText("EXPÉDITEUR", {
    x: ML + 12, y,
    size: SZ_LABEL, font: fontSans, color: C_MUTED,
  });
  y -= 4;

  // Sender name (bold)
  y -= LH_TIGHT;
  curPage.drawText(senderName, {
    x: ML + 12, y,
    size: SZ_BODY + 0.5, font: fontBold, color: C_INK,
  });

  // Sender address lines
  for (const addrLine of senderAddress.split("\n").filter(Boolean)) {
    y -= LH_TIGHT;
    curPage.drawText(addrLine, {
      x: ML + 12, y,
      size: SZ_BODY - 0.5, font: fontRegular, color: C_INK,
    });
  }
  y -= 14; // bottom padding

  y -= LH; // gap after sender block

  // ── Render body lines ──
  const advancePage = () => {
    pageIdx++;
    curPage = pages[pageIdx];
    y = CONTENT_TOP;
  };

  for (const rl of renderLines) {
    const h = lineH(rl);

    if (y - h < CONTENT_BOTTOM) advancePage();

    if (rl.text === "") {
      y -= rl.spaceBefore;
      continue;
    }

    // OBJET: draw accent underline
    if (rl.isObjet) {
      const tw = rl.font.widthOfTextAtSize(rl.text, rl.size);
      curPage.drawLine({
        start: { x: ML + rl.indent, y: y - 2 },
        end:   { x: ML + rl.indent + tw, y: y - 2 },
        thickness: 0.8, color: C_ACCENT,
      });
    }

    // Monospace detection (reference numbers etc.)
    const isRef = /^\s*[-–]\s/.test(rl.text);
    const drawFont = isRef ? fontMono : rl.font;
    const drawSize = isRef ? SZ_BODY - 1 : rl.size;

    curPage.drawText(rl.text, {
      x: ML + rl.indent + (isRef ? 4 : 0),
      y,
      size: drawSize,
      font: drawFont,
      color: rl.color,
    });

    y -= LH;
  }

  // ─── Metadata ─────────────────────────────────────────────────────────────
  pdfDoc.setTitle(`${typeName} — LettreMagique`);
  pdfDoc.setAuthor(senderName);
  pdfDoc.setCreator("LettreMagique · lettre-magique.com");
  pdfDoc.setSubject(`Courrier : ${typeName}`);

  return pdfDoc.save();
}
