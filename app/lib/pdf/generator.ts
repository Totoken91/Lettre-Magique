import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from "pdf-lib";

export interface PDFParams {
  text: string;
  senderName: string;
  senderAddress: string;
  senderPhone?: string;
  senderEmail?: string;
  typeName: string;
  /** e.g. "LM-2026-03-04872" */
  refNumber?: string;
  /** "typed" = cursive sig image embedded, "print" = empty space for manual sig */
  signatureMode?: "typed" | "print";
  /** PNG data URL from canvas, only when signatureMode="typed" */
  signatureImageBase64?: string;
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
const SZ_OBJET   = 12;   // objet line is 12pt as requested
const SZ_SMALL   = 8.5;
const SZ_TINY    = 7;
const SZ_HEADER  = 11;
const LH_BODY    = 16;
const LH_SENDER  = 13;

// ─── Helpers ────────────────────────────────────────────────────────────────

function sanitizePdf(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/\u2014|\u2015/g, '--')
    .replace(/\u2013/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00AB/g, '<<').replace(/\u00BB/g, '>>')
    .replace(/\u2039/g, '<').replace(/\u203A/g, '>')
    .replace(/\u2022/g, '-')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x00-\xFF]/g, '?');
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_{1,2}(.+?)_{1,2}/g, "$1")
    .trim();
}

/** Remove lines containing [placeholder] brackets — safety net for AI output */
function stripPlaceholderLines(lines: string[]): string[] {
  return lines.filter((line) => !/\[.*?\]/.test(line));
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

/** Extract city from last line of address (removes postal code prefix) */
function extractCity(address: string): string {
  const lines = address.split('\n').map(s => s.trim()).filter(Boolean);
  const last = lines[lines.length - 1] || '';
  const match = last.match(/\d{5}\s+(.+)/);
  return (match ? match[1].trim() : last) || 'votre ville';
}

// ─── Main generator ─────────────────────────────────────────────────────────

export async function generateLetterPDF(params: PDFParams): Promise<Uint8Array> {
  const text              = sanitizePdf(params.text);
  const senderName        = sanitizePdf(params.senderName);
  const senderAddress     = sanitizePdf(params.senderAddress);
  const senderPhone       = sanitizePdf(params.senderPhone?.trim() || "");
  const senderEmail       = sanitizePdf(params.senderEmail || "");
  const typeName          = sanitizePdf(params.typeName);
  const refNumber         = params.refNumber ? sanitizePdf(params.refNumber) : undefined;
  const signatureMode     = params.signatureMode;
  const signatureImageB64 = params.signatureImageBase64;

  const pdfDoc   = await PDFDocument.create();
  const fontReg    = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Embed signature image if typed mode
  let sigImage: Awaited<ReturnType<typeof pdfDoc.embedPng>> | null = null;
  if (signatureMode === 'typed' && signatureImageB64) {
    try {
      const b64 = signatureImageB64.includes(',')
        ? signatureImageB64.split(',')[1]
        : signatureImageB64;
      const buf = Buffer.from(b64, 'base64');
      sigImage = await pdfDoc.embedPng(buf);
    } catch { /* ignore */ }
  }

  // ── Parse the generated text ──────────────────────────────────────────────
  const rawLines = text.split("\n");

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

  const isPhoneLine = (s: string) =>
    /^(tél\.?\s*:?\s*|tel\.?\s*:?\s*|téléphone\s*:?\s*)?0\d[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}$/i.test(s.trim());

  const isDateLine = (s: string) =>
    /^\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4}/i.test(s) ||
    /^(à|a)\s+.+,\s*le\s+\d/i.test(s) ||
    /^\d{1,2}[/.\-]\d{1,2}[/.\-]\d{4}$/.test(s);

  // Skip sender info at top
  let idx = 0;
  for (; idx < rawLines.length; idx++) {
    const norm = fuzzyNorm(rawLines[idx]);
    if (norm === "") continue;
    const isSenderLine = senderNorms.some(
      (si) => norm === si || norm.includes(si) || si.includes(norm)
    );
    if (!isSenderLine && !isPhoneLine(rawLines[idx])) break;
  }

  let dateLine = "";
  const recipientLines: string[] = [];
  let objetLine = "";
  const bodyLines: string[] = [];
  let phase: "pre" | "recipient" | "body" = "pre";

  for (let i = idx; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();
    const clean = stripMarkdown(trimmed);

    if (phase !== "body" && isPhoneLine(clean)) continue;

    if (phase !== "body" && !dateLine && isDateLine(clean)) {
      dateLine = clean;
      continue;
    }
    if (phase !== "body" && isDateLine(clean)) continue;

    if (/^(objet|OBJET)\s*:/i.test(clean)) {
      objetLine = clean;
      phase = "body";
      continue;
    }

    if (phase === "pre" || phase === "recipient") {
      if (trimmed === "") {
        if (recipientLines.length > 0) phase = "recipient";
        continue;
      }
      if (/^(madame|monsieur|cher|chère)/i.test(clean)) {
        phase = "body";
        bodyLines.push(trimmed);
        continue;
      }
      if (recipientLines.length < 6) {
        recipientLines.push(clean);
        phase = "recipient";
        continue;
      }
    }

    phase = "body";
    bodyLines.push(trimmed);
  }

  if (!dateLine) {
    const now = new Date();
    const months = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre",
    ];
    dateLine = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  // Filter out lines containing [placeholder] brackets
  const filteredRecipientLines = stripPlaceholderLines(recipientLines);
  const filteredBodyLines = stripPlaceholderLines(bodyLines);
  // Replace arrays in-place
  recipientLines.length = 0;
  recipientLines.push(...filteredRecipientLines);
  bodyLines.length = 0;
  bodyLines.push(...filteredBodyLines);

  // ── Build render lines ─────────────────────────────────────────────────────

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
      rLines.push({ text: "", font: fontReg, size: SZ_BODY, color: C_INK, indent: 0, kind: "spacer" });
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

  // Pre-process: when signature block is active, extract closing elements from body
  let extractedClosingFormula = "";
  if (signatureMode) {
    const faitARegex = /^fait\s+(a|à)\s+/i;
    const closingRegex = /^(cordialement|veuillez agr[ée]er|je vous prie|recevez|dans l.attente)/i;
    const nameNorm = senderName.trim().toLowerCase();
    const firstNameNorm = nameNorm.split(" ")[0].toLowerCase();

    // Remove trailing: sender name, "Fait à...", closing formula (from end)
    // Step 1: Remove trailing spacers
    while (rLines.length > 0 && rLines[rLines.length - 1].kind === "spacer") rLines.pop();

    // Step 2: Remove sender name if it's the last line
    if (rLines.length > 0) {
      const lastText = rLines[rLines.length - 1].text.trim().toLowerCase();
      if (lastText.includes(firstNameNorm)) {
        rLines.pop();
        while (rLines.length > 0 && rLines[rLines.length - 1].kind === "spacer") rLines.pop();
      }
    }

    // Step 3: Remove "Fait à..." lines from the end
    while (rLines.length > 0) {
      const last = rLines[rLines.length - 1];
      if (last.kind === "spacer") { rLines.pop(); continue; }
      if (faitARegex.test(last.text.trim())) { rLines.pop(); continue; }
      break;
    }

    // Step 4: Extract closing formula from end (e.g. "Cordialement," or "Veuillez agréer...")
    const trailingLines: string[] = [];
    let searchIdx = rLines.length - 1;
    while (searchIdx >= 0 && rLines[searchIdx].kind === "spacer") searchIdx--;
    // Collect contiguous non-spacer lines at the end
    while (searchIdx >= 0 && rLines[searchIdx].kind !== "spacer") {
      trailingLines.unshift(rLines[searchIdx].text);
      searchIdx--;
    }
    const candidate = trailingLines.join(" ").trim();
    if (closingRegex.test(candidate)) {
      extractedClosingFormula = candidate;
      rLines.splice(searchIdx + 1); // remove from the start of the closing block
      while (rLines.length > 0 && rLines[rLines.length - 1].kind === "spacer") rLines.pop();
    }
  }

  // ── Pre-compute objet wrapped lines ───────────────────────────────────────
  const objetWrapped = objetLine
    ? wrapText(sanitizePdf(objetLine), fontBold, SZ_OBJET, BODY_W - 20)
    : [];
  const LH_OBJET_LINE = SZ_OBJET + 4; // line height within objet block
  const objetBoxH = objetWrapped.length > 0
    ? objetWrapped.length * LH_OBJET_LINE + 14
    : 0;
  const objetH = objetBoxH > 0 ? objetBoxH + 16 : 0;

  // ── Calculate page layout ─────────────────────────────────────────────────

  const HEADER_H = 32;
  const FOOTER_H = 28;
  const contentTop = A4_H - MT - HEADER_H - 12;
  const contentBottom = MB + FOOTER_H;
  const pageContentH = contentTop - contentBottom;

  const senderAddrLines = senderAddress.split("\n").filter(Boolean);
  const senderBlockH = 14 + senderParts.length * LH_SENDER + (senderPhone ? LH_SENDER : 0) + (senderEmail ? LH_SENDER : 0) + 14;
  const recipientBlockH = recipientLines.length > 0 ? (recipientLines.length * LH_SENDER + 4) : 0;
  const addrRowH = Math.max(senderBlockH, recipientBlockH);
  const dateH = LH_BODY + 4;
  const headerBlocksH = addrRowH + 20 + dateH + 12 + objetH + 12;

  let bodyH = 0;
  for (const rl of rLines) bodyH += rl.kind === "spacer" ? LH_BODY * 0.7 : LH_BODY;

  // Add signature block height if applicable
  // Fait à + closing formula + signature space + name
  const SIG_BLOCK_H = signatureMode
    ? 8 + LH_BODY + 4 + LH_BODY * 2 + (signatureMode === "print" ? 80 + LH_BODY : 55) + 16
    : 0;
  bodyH += SIG_BLOCK_H;

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

  // ── Chrome on every page ──────────────────────────────────────────────────
  const drawChrome = (page: PDFPage, pageNum: number) => {
    page.drawRectangle({ x: 0, y: 0, width: A4_W, height: A4_H, color: C_WHITE });

    // Top accent line
    page.drawRectangle({ x: 0, y: A4_H - 2.5, width: A4_W, height: 2.5, color: C_ACCENT });

    const headerBarY = A4_H - MT;

    // Logo: "LM Justice" — LM in black, Justice in accent orange
    const logoLM = "LM";
    const logoLegal = "Justice";
    const logoSize = 13;
    const lmWidth = fontBold.widthOfTextAtSize(logoLM, logoSize);
    page.drawText(logoLM, { x: ML, y: headerBarY + 2, size: logoSize, font: fontBold, color: C_INK });
    page.drawText(logoLegal, { x: ML + lmWidth + 2, y: headerBarY + 2, size: logoSize, font: fontBold, color: C_ACCENT });

    // Type badge (top-right) — dark background, white text
    const typeLabel = typeName.toUpperCase();
    const typeBadgeSize = 7;
    const typeLabelW = fontBold.widthOfTextAtSize(typeLabel, typeBadgeSize);
    const badgeW = typeLabelW + 16;
    const badgeX = A4_W - MR - badgeW;
    const badgeY = headerBarY + 3;
    page.drawRectangle({ x: badgeX, y: badgeY, width: badgeW, height: 16, color: C_INK });
    page.drawText(typeLabel, { x: badgeX + 8, y: badgeY + 5, size: typeBadgeSize, font: fontBold, color: C_WHITE });

    // Ref number under badge
    if (refNumber) {
      drawTextRight(page, `Réf. ${refNumber}`, A4_W - MR, badgeY - 10, fontReg, 7, C_MUTED);
    }

    // Header separator
    page.drawLine({
      start: { x: ML, y: headerBarY - 6 },
      end: { x: A4_W - MR, y: headerBarY - 6 },
      thickness: 0.4, color: C_RULE,
    });

    // Footer
    const footerY = MB;
    page.drawRectangle({ x: ML, y: footerY + FOOTER_H - 2, width: BODY_W, height: 0.4, color: C_RULE });
    page.drawText(
      "Document généré par LM Justice · Outil d'aide à la rédaction -- ne constitue pas un conseil juridique.",
      { x: ML, y: footerY + 10, size: 6, font: fontReg, color: C_LIGHT }
    );
    if (totalPages > 1) {
      drawTextRight(page, `${pageNum}/${totalPages}`, A4_W - MR, footerY + 10, fontReg, 6, C_LIGHT);
    }

    void pageNum; // suppress unused warning if totalPages=1
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

  // ── SENDER + RECIPIENT ────────────────────────────────────────────────────
  const addrRowBottomY = y - addrRowH;

  // Sender card background
  curPage.drawRectangle({ x: ML, y: addrRowBottomY, width: BODY_W * 0.50, height: addrRowH, color: C_BG_LIGHT });
  curPage.drawRectangle({ x: ML, y: addrRowBottomY, width: 2.5, height: addrRowH, color: C_ACCENT });

  const numSenderLines = 1 + senderAddrLines.length + (senderPhone ? 1 : 0) + (senderEmail ? 1 : 0);
  const senderTextSpan = (numSenderLines - 1) * LH_SENDER;
  const senderCardCenterY = addrRowBottomY + addrRowH / 2;
  let sy = senderCardCenterY + senderTextSpan / 2;

  curPage.drawText(senderName, { x: ML + 14, y: sy, size: SZ_HEADER, font: fontBold, color: C_INK });
  sy -= LH_SENDER + 2;

  for (const line of senderAddrLines) {
    curPage.drawText(line, { x: ML + 14, y: sy, size: SZ_SMALL, font: fontReg, color: C_INK });
    sy -= LH_SENDER;
  }
  if (senderPhone) {
    curPage.drawText(senderPhone, { x: ML + 14, y: sy, size: SZ_SMALL, font: fontReg, color: C_MUTED });
    sy -= LH_SENDER;
  }
  if (senderEmail) {
    curPage.drawText(senderEmail, { x: ML + 14, y: sy, size: SZ_SMALL, font: fontReg, color: C_MUTED });
  }

  // Recipient block
  if (recipientLines.length > 0) {
    const recipX = ML + BODY_W * 0.54;
    const recipTextSpan = (recipientLines.length - 1) * LH_SENDER;
    const recipCenterY = addrRowBottomY + addrRowH / 2;
    let ry = recipCenterY + recipTextSpan / 2;
    for (let i = 0; i < recipientLines.length; i++) {
      const f = i === 0 ? fontBold : fontReg;
      const sz = i === 0 ? SZ_BODY : SZ_SMALL;
      curPage.drawText(recipientLines[i], { x: recipX, y: ry, size: sz, font: f, color: C_INK });
      ry -= LH_SENDER;
    }
  }

  y = addrRowBottomY - 20;

  // ── DATE (right-aligned, italic) ──────────────────────────────────────────
  drawTextRight(curPage, dateLine, A4_W - MR, y, fontItalic, SZ_SMALL, C_MUTED);
  y -= LH_BODY + 12;

  // ── OBJET LINE (12pt bold, with optional ref sub-line) ────────────────────
  if (objetWrapped.length > 0) {
    ensureSpace(objetBoxH + 16);

    // Box background + accent border
    curPage.drawRectangle({ x: ML, y: y - 4, width: BODY_W, height: objetBoxH, color: C_BG_LIGHT });
    curPage.drawRectangle({ x: ML, y: y - 4, width: 2.5, height: objetBoxH, color: C_ACCENT });

    // Main objet text lines (12pt bold accent) — drawn from top of box
    let objetTextY = y - 4 + objetBoxH - SZ_OBJET - 8;
    for (const line of objetWrapped) {
      curPage.drawText(line, { x: ML + 12, y: objetTextY, size: SZ_OBJET, font: fontBold, color: C_ACCENT });
      objetTextY -= LH_OBJET_LINE;
    }

    y -= objetBoxH + 16;
  }

  // ── BODY ──────────────────────────────────────────────────────────────────
  for (const rl of rLines) {
    if (rl.kind === "spacer") {
      y -= LH_BODY * 0.7;
      continue;
    }

    ensureSpace(LH_BODY);

    if (rl.kind === "list") {
      curPage.drawRectangle({ x: ML + 6, y: y + 3, width: 3, height: 3, color: C_ACCENT });
    }

    curPage.drawText(rl.text, { x: ML + rl.indent, y, size: rl.size, font: rl.font, color: rl.color });
    y -= LH_BODY;
  }

  // ── SIGNATURE BLOCK ───────────────────────────────────────────────────────
  if (signatureMode) {
    const city = extractCity(senderAddress);
    const faitAText = sanitizePdf(`Fait a ${city}, le ${dateLine}`);

    ensureSpace(SIG_BLOCK_H);
    y -= 8;

    // 1. "Fait à [city], le [date]" — same size/color as body text
    curPage.drawText(faitAText, { x: ML, y, size: SZ_BODY, font: fontReg, color: C_INK });
    y -= LH_BODY + 4;

    // 2. Closing formula (extracted during pre-processing)
    if (extractedClosingFormula) {
      const closingWrapped = wrapText(sanitizePdf(extractedClosingFormula), fontReg, SZ_BODY, BODY_W);
      for (const cl of closingWrapped) {
        ensureSpace(LH_BODY);
        curPage.drawText(cl, { x: ML, y, size: SZ_BODY, font: fontReg, color: C_INK });
        y -= LH_BODY;
      }
      y -= 4;
    }

    // 3. Signature
    if (signatureMode === "print") {
      // Empty space for handwritten signature (80px) then bold name
      y -= 80;
      curPage.drawText(sanitizePdf(senderName), { x: ML, y, size: SZ_BODY, font: fontBold, color: C_INK });
      y -= LH_BODY;
    } else if (signatureMode === "typed" && sigImage) {
      // Cursive signature image only — no name below (signature IS the name)
      const sigH = 50;
      const sigW = Math.min(sigImage.width * (sigH / sigImage.height), BODY_W * 0.55);
      curPage.drawImage(sigImage, { x: ML, y: y - sigH, width: sigW, height: sigH });
      y -= sigH + 8;
    } else {
      // typed mode but no image: space + name
      y -= 35;
      curPage.drawText(sanitizePdf(senderName), { x: ML, y, size: SZ_BODY, font: fontBold, color: C_INK });
      y -= LH_BODY;
    }
  }

  // ── Bottom dashed stripe ──────────────────────────────────────────────────
  const stripeY = MB + FOOTER_H + 4;
  if (pageIdx === pages.length - 1 && y > stripeY + 16) {
    for (let dx = 0; dx < BODY_W; dx += 8) {
      curPage.drawRectangle({ x: ML + dx, y: stripeY, width: 4, height: 1, color: C_RULE });
    }
  }

  // ── Metadata ──────────────────────────────────────────────────────────────
  pdfDoc.setTitle(`${typeName} — LettreMagique`);
  pdfDoc.setAuthor(senderName);
  pdfDoc.setCreator("LM Justice · lettre-magique.com");
  pdfDoc.setSubject(`Courrier : ${typeName}${refNumber ? ` · ${refNumber}` : ''}`);

  return pdfDoc.save();
}
