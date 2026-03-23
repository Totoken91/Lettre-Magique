import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from "pdf-lib";
import fs from "fs";
import path from "path";

interface PDFParams {
  text: string;
  senderName: string;
  senderAddress: string;
  senderPhone?: string;
  senderEmail?: string;
  typeName: string;
}

// ─── Page dimensions ────────────────────────────────────────────────────────
const A4_W = 595.28;
const A4_H = 841.89;
const ML = 56;
const MR = 56;
const MT = 56;
const MB = 52;
const BODY_W = A4_W - ML - MR;

// ─── Colors ─────────────────────────────────────────────────────────────────
const C_INK      = rgb(0.12, 0.12, 0.12);
const C_ACCENT   = rgb(0.784, 0.294, 0.184);   // #c84b2f
const C_MUTED    = rgb(0.50, 0.48, 0.44);
const C_LIGHT    = rgb(0.72, 0.70, 0.66);
const C_RULE     = rgb(0.82, 0.80, 0.76);
const C_BG_LIGHT = rgb(0.965, 0.955, 0.935);
const C_WHITE    = rgb(1, 1, 1);

// ─── Typography ─────────────────────────────────────────────────────────────
const SZ_BODY    = 10;
const SZ_SMALL   = 8.5;
const SZ_TINY    = 7;
const SZ_HEADER  = 11;
const LH_BODY    = 16;
const LH_SENDER  = 13;

// ─── Helpers ────────────────────────────────────────────────────────────────

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_{1,2}(.+?)_{1,2}/g, "$1")
    .trim();
}

function isFullBold(text: string): boolean {
  return /^\*\*(.+)\*\*$/.test(text.trim());
}

function wrapText(
  text: string,
  font: PDFFont,
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

function drawTextRight(
  page: PDFPage,
  text: string,
  rightX: number,
  y: number,
  font: PDFFont,
  size: number,
  color: typeof C_INK
) {
  const w = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: rightX - w, y, size, font, color });
}

// ─── Main generator ─────────────────────────────────────────────────────────

export async function generateLetterPDF(params: PDFParams): Promise<Uint8Array> {
  const { text, senderName, senderAddress, senderPhone: rawPhone, senderEmail, typeName } = params;
  const senderPhone = rawPhone?.trim() || "";

  const pdfDoc = await PDFDocument.create();
  const fontReg    = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Embed logo
  let logoImage: Awaited<ReturnType<typeof pdfDoc.embedPng>> | null = null;
  try {
    const logoPath = path.join(process.cwd(), "public", "lm-logo.png");
    const logoBytes = fs.readFileSync(logoPath);
    logoImage = await pdfDoc.embedPng(logoBytes);
  } catch {
    // fallback handled below
  }

  // ── Parse the generated text ──────────────────────────────────────────────
  // The AI output typically contains:
  //   - Sender info lines (name, address) — we skip these (we have structured data)
  //   - Phone / date
  //   - Recipient lines
  //   - "Objet : ..." line
  //   - Body paragraphs
  //   - Closing + signature
  //
  // Strategy: detect and extract recipient, date, objet from raw text,
  // then render everything in a clean structured layout.

  const rawLines = text.split("\n");

  // Fuzzy match to skip sender info already in header
  const fuzzyNorm = (s: string) =>
    s.toLowerCase()
      .replace(/tél\.?\s*:?\s*/gi, "")
      .replace(/tel\.?\s*:?\s*/gi, "")
      .replace(/téléphone\s*:?\s*/gi, "")
      .replace(/[-–—]/g, " ")
      .replace(/[.,;:]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const senderParts = [senderName, ...senderAddress.split("\n").filter(Boolean)];
  const senderNorms = senderParts.map(fuzzyNorm).filter(Boolean);

  // senderPhone comes as a dedicated param — no need to extract from address

  // Phone line detector (all formats: 0781452482 / 07 81 45 24 82 / 07.81.45.24.82)
  const isPhoneLine = (s: string) =>
    /^(tél\.?\s*:?\s*|tel\.?\s*:?\s*|téléphone\s*:?\s*)?0\d[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}$/i.test(s.trim());

  // Date line detector
  const isDateLine = (s: string) =>
    /^\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4}/i.test(s) ||
    /^(à|a)\s+.+,\s*le\s+\d/i.test(s) ||
    /^\d{1,2}[/.\-]\d{1,2}[/.\-]\d{4}$/.test(s);

  // Walk through raw lines, skip sender info at the top
  let idx = 0;
  for (; idx < rawLines.length; idx++) {
    const norm = fuzzyNorm(rawLines[idx]);
    if (norm === "") continue;
    const isSenderLine = senderNorms.some(
      (si) => norm === si || norm.includes(si) || si.includes(norm)
    );
    if (!isSenderLine && !isPhoneLine(rawLines[idx])) break;
  }

  // Now extract structured parts from remaining lines
  let dateLine = "";
  const recipientLines: string[] = [];
  let objetLine = "";
  const bodyLines: string[] = [];
  let phase: "pre" | "recipient" | "body" = "pre";

  for (let i = idx; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();
    const clean = stripMarkdown(trimmed);

    // Skip phone-only lines anywhere in the header zone
    if (phase !== "body" && isPhoneLine(clean)) continue;

    // Date detection — only before body starts, take first match
    if (phase !== "body" && !dateLine && isDateLine(clean)) {
      dateLine = clean;
      continue;
    }

    // Skip duplicate/extra date lines in header zone
    if (phase !== "body" && isDateLine(clean)) continue;

    // Objet detection
    if (/^(objet|OBJET)\s*:/i.test(clean)) {
      objetLine = clean;
      phase = "body";
      continue;
    }

    // Recipient: lines before "Objet:" or salutation
    if (phase === "pre" || phase === "recipient") {
      if (trimmed === "") {
        // Empty line after recipient lines → confirmed recipient block
        if (recipientLines.length > 0) phase = "recipient";
        continue;
      }
      // Salutation → start of body
      if (/^(madame|monsieur|cher|chère)/i.test(clean)) {
        phase = "body";
        bodyLines.push(trimmed);
        continue;
      }
      // Add to recipient block (max 6 lines)
      if (recipientLines.length < 6) {
        recipientLines.push(clean);
        phase = "recipient";
        continue;
      }
    }

    // Everything else → body
    phase = "body";
    bodyLines.push(trimmed);
  }

  // If no date was found, use today
  if (!dateLine) {
    const now = new Date();
    const months = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre",
    ];
    dateLine = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  // ── Pre-compute body render lines ─────────────────────────────────────────

  type LineKind = "text" | "bold" | "objet" | "list" | "spacer";

  interface RenderLine {
    text: string;
    font: PDFFont;
    size: number;
    color: typeof C_INK;
    indent: number;
    kind: LineKind;
  }

  const rLines: RenderLine[] = [];

  for (const raw of bodyLines) {
    if (raw === "") {
      rLines.push({
        text: "", font: fontReg, size: SZ_BODY, color: C_INK,
        indent: 0, kind: "spacer",
      });
      continue;
    }

    const wasBold = isFullBold(raw);
    const clean = stripMarkdown(raw);
    if (!clean) continue;

    const isList = /^[-–•]\s/.test(clean);
    const isBold = wasBold && clean.length < 100;
    const font = isBold ? fontBold : fontReg;
    const indent = isList ? 16 : 0;
    const availW = BODY_W - indent;

    for (const wl of wrapText(clean, font, SZ_BODY, availW)) {
      rLines.push({
        text: wl, font, size: SZ_BODY, color: C_INK,
        indent, kind: isList ? "list" : (isBold ? "bold" : "text"),
      });
    }
  }

  // ── Calculate page layout ─────────────────────────────────────────────────

  const HEADER_H = 32;           // brand bar height
  const FOOTER_H = 28;
  const contentTop = A4_H - MT - HEADER_H - 12;
  const contentBottom = MB + FOOTER_H;
  const pageContentH = contentTop - contentBottom;

  // First page has sender + recipient blocks SIDE BY SIDE before body
  const senderBlockH = 14 + senderParts.length * LH_SENDER + (senderPhone ? LH_SENDER : 0) + (senderEmail ? LH_SENDER : 0) + 14;
  const recipientBlockH = recipientLines.length > 0 ? (recipientLines.length * LH_SENDER + 4) : 0;
  const addrRowH = Math.max(senderBlockH, recipientBlockH);
  const dateH = LH_BODY + 4;
  const objetH = objetLine ? (LH_BODY + 20) : 0;
  const headerBlocksH = addrRowH + 20 + dateH + 12 + objetH + 12;

  let bodyH = 0;
  for (const rl of rLines) bodyH += rl.kind === "spacer" ? LH_BODY * 0.7 : LH_BODY;

  const firstPageBody = pageContentH - headerBlocksH;
  let totalPages = 1;
  let overflow = bodyH - firstPageBody;
  while (overflow > 0) {
    totalPages++;
    overflow -= pageContentH;
  }

  // ── Create pages ──────────────────────────────────────────────────────────

  const pages: PDFPage[] = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(pdfDoc.addPage([A4_W, A4_H]));
  }

  // ── Draw chrome on every page ─────────────────────────────────────────────

  const drawChrome = (page: PDFPage, pageNum: number) => {
    // White background
    page.drawRectangle({
      x: 0, y: 0, width: A4_W, height: A4_H, color: C_WHITE,
    });

    // Top accent line (thin, elegant)
    page.drawRectangle({
      x: 0, y: A4_H - 2.5, width: A4_W, height: 2.5, color: C_ACCENT,
    });

    // Header bar
    const headerBarY = A4_H - MT;

    // Logo only — no brand text
    if (logoImage) {
      const logoH = 26;
      const logoW = logoImage.width * (logoH / logoImage.height);
      page.drawImage(logoImage, {
        x: ML, y: headerBarY - 3,
        width: logoW, height: logoH,
      });
    } else {
      page.drawRectangle({
        x: ML, y: headerBarY - 1, width: 22, height: 22, color: C_ACCENT,
      });
      page.drawText("LM", {
        x: ML + 3, y: headerBarY + 5,
        size: 10, font: fontBold, color: C_WHITE,
      });
    }

    // Type badge (right)
    const typeLabel = typeName.toUpperCase();
    const typeLabelW = fontReg.widthOfTextAtSize(typeLabel, SZ_TINY);
    const badgeW = typeLabelW + 14;
    const badgeX = A4_W - MR - badgeW;
    const badgeY = headerBarY + 3;
    page.drawRectangle({
      x: badgeX, y: badgeY,
      width: badgeW, height: 15,
      color: C_BG_LIGHT,
    });
    page.drawText(typeLabel, {
      x: badgeX + 7, y: badgeY + 4.5,
      size: SZ_TINY, font: fontReg, color: C_MUTED,
    });

    // Header separator
    page.drawLine({
      start: { x: ML, y: headerBarY - 6 },
      end: { x: A4_W - MR, y: headerBarY - 6 },
      thickness: 0.4, color: C_RULE,
    });

    // Footer
    const footerY = MB;

    // Bottom accent line
    page.drawRectangle({
      x: ML, y: footerY + FOOTER_H - 2,
      width: BODY_W, height: 0.4,
      color: C_RULE,
    });

    page.drawText(
      "Document généré par LettreMagique.com · Outil d'aide à la rédaction — ne constitue pas un conseil juridique.",
      { x: ML, y: footerY + 10, size: 6, font: fontReg, color: C_LIGHT }
    );

    if (totalPages > 1) {
      const pnText = `${pageNum}/${totalPages}`;
      drawTextRight(page, pnText, A4_W - MR, footerY + 10, fontReg, 6, C_LIGHT);
    }
  };

  pages.forEach((p, i) => drawChrome(p, i + 1));

  // ── Render content ────────────────────────────────────────────────────────

  let pageIdx = 0;
  let curPage = pages[0];
  let y = contentTop;

  const nextPage = () => {
    pageIdx++;
    curPage = pages[pageIdx];
    y = contentTop;
  };

  const ensureSpace = (h: number) => {
    if (y - h < contentBottom) nextPage();
  };

  // ── SENDER (left) + RECIPIENT (right) at the same vertical level ──
  const addrRowTopY = y;            // save Y for both blocks
  const addrRowBottomY = y - addrRowH;

  // Sender card background
  curPage.drawRectangle({
    x: ML, y: addrRowBottomY,
    width: BODY_W * 0.50, height: addrRowH,
    color: C_BG_LIGHT,
  });
  curPage.drawRectangle({
    x: ML, y: addrRowBottomY,
    width: 2.5, height: addrRowH,
    color: C_ACCENT,
  });

  // Vertical centering: compute total text span then align to card center
  const senderAddrLines = senderAddress.split("\n").filter(Boolean);
  const numSenderLines = 1 + senderAddrLines.length + (senderPhone ? 1 : 0) + (senderEmail ? 1 : 0);
  const senderTextSpan = (numSenderLines - 1) * LH_SENDER;
  const senderCardCenterY = addrRowBottomY + addrRowH / 2;
  let sy = senderCardCenterY + senderTextSpan / 2;

  curPage.drawText(senderName, {
    x: ML + 14, y: sy,
    size: SZ_HEADER, font: fontBold, color: C_INK,
  });
  sy -= LH_SENDER + 2;

  for (const line of senderAddrLines) {
    curPage.drawText(line, {
      x: ML + 14, y: sy,
      size: SZ_SMALL, font: fontReg, color: C_INK,
    });
    sy -= LH_SENDER;
  }

  if (senderPhone) {
    curPage.drawText(senderPhone, {
      x: ML + 14, y: sy,
      size: SZ_SMALL, font: fontReg, color: C_MUTED,
    });
    sy -= LH_SENDER;
  }

  if (senderEmail) {
    curPage.drawText(senderEmail, {
      x: ML + 14, y: sy,
      size: SZ_SMALL, font: fontReg, color: C_MUTED,
    });
  }

  // Recipient block — right column, vertically centered like sender
  if (recipientLines.length > 0) {
    const recipX = ML + BODY_W * 0.54;
    const recipTextSpan = (recipientLines.length - 1) * LH_SENDER;
    const recipCenterY = addrRowBottomY + addrRowH / 2;
    let ry = recipCenterY + recipTextSpan / 2;
    for (let i = 0; i < recipientLines.length; i++) {
      const f = i === 0 ? fontBold : fontReg;
      const sz = i === 0 ? SZ_BODY : SZ_SMALL;
      curPage.drawText(recipientLines[i], {
        x: recipX, y: ry,
        size: sz, font: f, color: C_INK,
      });
      ry -= LH_SENDER;
    }
  }

  // Advance Y past both blocks
  y = addrRowBottomY - 20;

  // ── DATE (right-aligned) ──
  drawTextRight(curPage, dateLine, A4_W - MR, y, fontItalic, SZ_SMALL, C_MUTED);
  y -= LH_BODY + 12;

  // ── OBJET LINE ──
  if (objetLine) {
    ensureSpace(LH_BODY + 12);

    // Objet background
    const objetW = BODY_W;
    curPage.drawRectangle({
      x: ML, y: y - 4,
      width: objetW, height: LH_BODY + 8,
      color: C_BG_LIGHT,
    });
    // Accent left border
    curPage.drawRectangle({
      x: ML, y: y - 4,
      width: 2.5, height: LH_BODY + 8,
      color: C_ACCENT,
    });

    // Center text vertically in the objet rect (rect: y-4 → y-4+LH_BODY+8)
    const objetRectCenterY = (y - 4) + (LH_BODY + 8) / 2;
    const objetTextY = objetRectCenterY - SZ_BODY * 0.3;
    curPage.drawText(objetLine, {
      x: ML + 12, y: objetTextY,
      size: SZ_BODY, font: fontBold, color: C_ACCENT,
    });
    y -= LH_BODY + 16;
  }

  // ── BODY ──
  for (const rl of rLines) {
    if (rl.kind === "spacer") {
      y -= LH_BODY * 0.7;
      continue;
    }

    ensureSpace(LH_BODY);

    // List item bullet
    if (rl.kind === "list") {
      curPage.drawRectangle({
        x: ML + 6, y: y + 3,
        width: 3, height: 3,
        color: C_ACCENT,
      });
    }

    curPage.drawText(rl.text, {
      x: ML + rl.indent,
      y,
      size: rl.size,
      font: rl.font,
      color: rl.color,
    });

    y -= LH_BODY;
  }

  // ── Bottom accent stripe ──
  const stripeY = MB + FOOTER_H + 4;
  if (pageIdx === pages.length - 1 && y > stripeY + 16) {
    // Decorative dashed line above footer (only on last page if space)
    for (let dx = 0; dx < BODY_W; dx += 8) {
      curPage.drawRectangle({
        x: ML + dx, y: stripeY,
        width: 4, height: 1,
        color: C_RULE,
      });
    }
  }

  // ── Metadata ──────────────────────────────────────────────────────────────
  pdfDoc.setTitle(`${typeName} — LettreMagique`);
  pdfDoc.setAuthor(senderName);
  pdfDoc.setCreator("LettreMagique · lettre-magique.com");
  pdfDoc.setSubject(`Courrier : ${typeName}`);

  return pdfDoc.save();
}
