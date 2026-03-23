import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

interface PDFParams {
  text: string;
  senderName: string;
  senderAddress: string;
  typeName: string;
}

const A4_W = 595.28;
const A4_H = 841.89;

// Margins
const ML = 68;  // left
const MR = 68;  // right
const BODY_W = A4_W - ML - MR;

// Colors
const C_INK    = rgb(0.051, 0.051, 0.051);   // #0d0d0d
const C_ACCENT = rgb(0.784, 0.294, 0.184);   // #c84b2f
const C_MUTED  = rgb(0.478, 0.455, 0.408);   // #7a7468
const C_RULE   = rgb(0.784, 0.751, 0.690);   // #c8c0b0
const C_PAPER  = rgb(0.961, 0.941, 0.910);   // #f5f0e8
const C_OBJET  = rgb(0.996, 0.949, 0.941);   // accent tint for objet bg
const C_WHITE  = rgb(1, 1, 1);

// Typography
const SZ_BODY  = 10.5;
const SZ_SMALL = 8;
const SZ_LABEL = 7.5;
const LH       = 17.5;  // line height body
const LH_TIGHT = 13;    // line height in sender block

function stripMarkdown(text: string): string {
  return text
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^_{1,2}(.+)_{1,2}$/, "$1")
    .trim();
}

function isFullBoldMarkdown(text: string): boolean {
  return /^\*\*(.+)\*\*$/.test(text.trim());
}

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

  const fontRegular  = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold     = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic   = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Embed logo once
  let logoImage: Awaited<ReturnType<typeof pdfDoc.embedPng>> | null = null;
  try {
    const logoPath = path.join(process.cwd(), "public", "lm-logo.png");
    const logoBytes = fs.readFileSync(logoPath);
    logoImage = await pdfDoc.embedPng(logoBytes);
  } catch {
    // logo non trouvé — fallback carré LM
  }

  // ─── Draw page chrome (header + footer) ──────────────────────────────────
  const drawChrome = (page: ReturnType<PDFDocument["addPage"]>, pageNum: number, totalPages: number) => {

    // Top accent bar
    page.drawRectangle({
      x: 0, y: A4_H - 4,
      width: A4_W, height: 4,
      color: C_ACCENT,
    });

    // Header zone
    const headerY = A4_H - 46;

    // Logo
    if (logoImage) {
      const logoH = 28;
      const logoW = logoImage.width * (logoH / logoImage.height);
      page.drawImage(logoImage, {
        x: ML, y: headerY + 2,
        width: logoW, height: logoH,
      });
    } else {
      // Fallback carré LM
      page.drawRectangle({
        x: ML, y: headerY + 4,
        width: 24, height: 24,
        color: C_ACCENT,
      });
      page.drawText("LM", {
        x: ML + 3.5, y: headerY + 10,
        size: 9.5, font: fontBold, color: C_WHITE,
      });
    }

    // Brand name + URL (décalé selon présence logo)
    const logoW = logoImage ? logoImage.width * (28 / logoImage.height) : 24;
    page.drawText("lettre-magique.com", {
      x: ML + logoW + 8, y: headerY + 10,
      size: 6.5, font: fontRegular, color: C_MUTED,
    });

    // Doc type badge
    const typeLabel = typeName.toUpperCase();
    const typeLabelW = fontRegular.widthOfTextAtSize(typeLabel, SZ_LABEL);
    const badgePadH = 8;
    const badgePadV = 5;
    const badgeX = A4_W - MR - typeLabelW - badgePadH * 2;
    const badgeY = headerY + 8;
    page.drawRectangle({
      x: badgeX, y: badgeY,
      width: typeLabelW + badgePadH * 2, height: SZ_LABEL + badgePadV * 2,
      color: C_PAPER,
    });
    page.drawText(typeLabel, {
      x: badgeX + badgePadH, y: badgeY + badgePadV + 0.5,
      size: SZ_LABEL, font: fontRegular, color: C_MUTED,
    });

    // Header separator
    page.drawLine({
      start: { x: ML, y: headerY },
      end:   { x: A4_W - MR, y: headerY },
      thickness: 0.5, color: C_RULE,
    });

    // Footer
    const footerY = 36;
    page.drawLine({
      start: { x: ML, y: footerY + 14 },
      end:   { x: A4_W - MR, y: footerY + 14 },
      thickness: 0.4, color: C_RULE,
    });
    page.drawText(
      "Document généré par LettreMagique · Outil d'aide à la rédaction, ne constitue pas un conseil juridique.",
      { x: ML, y: footerY + 4, size: 6.5, font: fontRegular, color: C_MUTED }
    );

    if (totalPages > 1) {
      const pnText = `${pageNum} / ${totalPages}`;
      const pnW = fontRegular.widthOfTextAtSize(pnText, 7);
      page.drawText(pnText, {
        x: A4_W - MR - pnW, y: footerY + 4,
        size: 7, font: fontRegular, color: C_MUTED,
      });
    }
  };

  // ─── Parse body lines ─────────────────────────────────────────────────────
  const CONTENT_TOP    = A4_H - 46 - 14;
  const CONTENT_BOTTOM = 36 + 14 + 12;

  const senderLines = [senderName, ...senderAddress.split("\n").filter(Boolean)];
  const SENDER_BLOCK_H = 14 + senderLines.length * LH_TIGHT + 14;

  type LineType = "normal" | "bold" | "italic" | "objet" | "spacer";

  interface RenderLine {
    text: string;
    font: typeof fontRegular;
    size: number;
    color: typeof C_INK;
    indent: number;
    spaceBefore: number;
    type: LineType;
  }

  const renderLines: RenderLine[] = [];

  // Fuzzy normalizer to detect and skip sender info in the body
  const fuzzyNorm = (s: string) =>
    s.toLowerCase()
      .replace(/tél\.?\s*:?\s*/gi, "")
      .replace(/tel\.?\s*:?\s*/gi, "")
      .replace(/[-–—]/g, " ")
      .replace(/[.,;]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const senderInfoNorms = [senderName, ...senderAddress.split("\n").filter(Boolean)]
    .map(fuzzyNorm)
    .filter(Boolean);

  const allRawLines = text.split("\n");
  let skipIdx = 0;
  for (let i = 0; i < allRawLines.length; i++) {
    const norm = fuzzyNorm(allRawLines[i]);
    if (
      norm === "" ||
      senderInfoNorms.some((si) => norm === si || norm.includes(si) || si.includes(norm))
    ) {
      skipIdx = i + 1;
    } else {
      break;
    }
  }
  const rawLines = allRawLines.slice(skipIdx);

  for (const raw of rawLines) {
    if (raw.trim() === "") {
      renderLines.push({
        text: "", font: fontRegular, size: SZ_BODY, color: C_INK,
        indent: 0, spaceBefore: LH * 0.95, type: "spacer",
      });
      continue;
    }

    const wasBold = isFullBoldMarkdown(raw.trim());
    const clean = stripMarkdown(raw.trim());
    if (!clean) continue;

    const isListItem = /^[-–•]\s/.test(clean);
    const isObjet = /^(Objet|OBJET)\s*:/.test(clean);

    // Bold only for: explicit markdown bold AND short lines (salutation, closing, signature)
    // — never make full paragraphs bold just because they happen to start with "Je vous"
    const isBold = wasBold && clean.length < 80;

    const font   = isBold ? fontBold : fontRegular;
    const indent = isListItem ? 14 : 0;
    const availW = BODY_W - indent;

    const wrapped = wrapText(clean, font, SZ_BODY, availW);
    wrapped.forEach((wl, i) => {
      renderLines.push({
        text: wl,
        font,
        size: SZ_BODY,
        color: C_INK,
        indent,
        spaceBefore: 0,
        type: isObjet && i === 0 ? "objet" : (isBold ? "bold" : "normal"),
      });
    });
  }

  // ── Measure total height ──
  const lineH = (rl: RenderLine) => rl.type === "spacer" ? rl.spaceBefore : LH;

  let totalH = SENDER_BLOCK_H + LH;
  for (const rl of renderLines) totalH += lineH(rl);

  const pageH = CONTENT_TOP - CONTENT_BOTTOM;
  let totalPages = 1;
  let remaining = totalH - pageH;
  while (remaining > 0) { totalPages++; remaining -= pageH; }

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

  // Sender card with left accent border
  curPage.drawRectangle({
    x: ML, y: y - SENDER_BLOCK_H,
    width: BODY_W, height: SENDER_BLOCK_H,
    color: C_PAPER,
  });
  curPage.drawRectangle({
    x: ML, y: y - SENDER_BLOCK_H,
    width: 3, height: SENDER_BLOCK_H,
    color: C_ACCENT,
  });

  y -= 14;
  curPage.drawText("EXPÉDITEUR", {
    x: ML + 12, y,
    size: SZ_LABEL, font: fontRegular, color: C_MUTED,
  });
  y -= 4;

  y -= LH_TIGHT;
  curPage.drawText(senderName, {
    x: ML + 12, y,
    size: SZ_BODY + 0.5, font: fontBold, color: C_INK,
  });

  for (const addrLine of senderAddress.split("\n").filter(Boolean)) {
    y -= LH_TIGHT;
    curPage.drawText(addrLine, {
      x: ML + 12, y,
      size: SZ_BODY - 0.5, font: fontRegular, color: C_INK,
    });
  }
  y -= 14;
  y -= LH;

  // ── Render body lines ──
  const advancePage = () => {
    pageIdx++;
    curPage = pages[pageIdx];
    y = CONTENT_TOP;
  };

  for (const rl of renderLines) {
    const h = lineH(rl);
    if (y - h < CONTENT_BOTTOM) advancePage();

    if (rl.type === "spacer") {
      y -= rl.spaceBefore;
      continue;
    }

    // OBJET: pill background + left accent bar
    if (rl.type === "objet") {
      const tw = rl.font.widthOfTextAtSize(rl.text, rl.size);
      curPage.drawRectangle({
        x: ML, y: y - 3,
        width: Math.max(tw + 20, BODY_W * 0.6),
        height: LH - 1,
        color: C_OBJET,
      });
      curPage.drawRectangle({
        x: ML, y: y - 3,
        width: 3, height: LH - 1,
        color: C_ACCENT,
      });
    }

    curPage.drawText(rl.text, {
      x: ML + rl.indent + (rl.type === "objet" ? 8 : 0),
      y,
      size: rl.size,
      font: rl.font,
      color: rl.type === "objet" ? C_ACCENT : rl.color,
    });

    y -= LH;
  }

  // ─── Metadata ─────────────────────────────────────────────────────────────
  pdfDoc.setTitle(`${typeName} — LettreMagique`);
  pdfDoc.setAuthor(senderName);
  pdfDoc.setCreator("LettreMagique · lettre-magique.com");
  pdfDoc.setSubject(`Courrier : ${typeName}`);

  void SZ_SMALL; void fontItalic;

  return pdfDoc.save();
}
