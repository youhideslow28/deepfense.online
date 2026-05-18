/**
 * generate-icons.mjs
 * Creates PNG icons for the PWA manifest using only Node built-ins.
 * Run once: node generate-icons.mjs
 */
import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CRC32 ───────────────────────────────────────────────────────────
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[i] = c >>> 0;
}
function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) crc = (crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)) >>> 0;
  return ((crc ^ 0xffffffff) >>> 0);
}

// ── PNG chunk builder ───────────────────────────────────────────────
function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf  = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf  = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// ── PNG with rounded-rect background + "DF" text via pixels ────────
// We draw a solid colored PNG. The icon shape (rounding) is handled
// by the OS/browser chrome around the icon.
function createPNG(size, pixels) {
  const sig = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8]  = 8; // bit depth
  ihdr[9]  = 6; // color type: RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Scanlines: 1 filter byte + RGBA * size per row
  const rowLen = 1 + size * 4;
  const raw    = Buffer.alloc(size * rowLen, 0);
  for (let y = 0; y < size; y++) {
    raw[y * rowLen] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixels(x, y, size);
      const off = y * rowLen + 1 + x * 4;
      raw[off]   = r; raw[off+1] = g;
      raw[off+2] = b; raw[off+3] = a;
    }
  }

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Icon pixel function ─────────────────────────────────────────────
// Purple (#7c3aed) background with rounded corners and a simple "DF" mark
function dfIcon(x, y, size) {
  const s  = size;
  const r  = s * 0.18;            // corner radius ratio
  const cx = x - s / 2;
  const cy = y - s / 2;

  // SDF rounded rect
  const dx  = Math.abs(cx) - (s / 2 - r);
  const dy  = Math.abs(cy) - (s / 2 - r);
  const sdf = Math.sqrt(Math.max(dx, 0) ** 2 + Math.max(dy, 0) ** 2) - r;

  if (sdf > 1) return [0, 0, 0, 0]; // transparent outside

  // Background: deep purple gradient-ish
  const bg = [0x7c, 0x3a, 0xed]; // #7c3aed

  // "D" — left half circle (bounding box: 18-45% x, 22-78% y)
  // "F" — right block (52-80% x, 22-78% y)
  const nx = x / s;
  const ny = y / s;

  // --- D letter ---
  const dLeft  = 0.17, dRight = 0.47;
  const dTop   = 0.20, dBot   = 0.80;
  const dStem  = 0.08;  // stem width as fraction of icon
  const dRadius = (dBot - dTop) / 2;
  const dCY    = (dTop + dBot) / 2;

  let inD = false;
  if (nx >= dLeft && nx <= dRight && ny >= dTop && ny <= dBot) {
    // outer arc (right bulge)
    const relX = nx - (dLeft + dStem);
    const relY = ny - dCY;
    const outerR = (dRight - dLeft - dStem);
    const innerR = outerR - 0.11;
    const dist   = Math.sqrt(relX * relX + relY * relY);
    if (relX >= 0) {
      inD = dist <= outerR;
    } else {
      inD = true; // fill stem area
    }
    // Hollow inside
    if (relX >= 0 && dist <= innerR) inD = false;
  }

  // --- F letter ---
  const fLeft  = 0.53, fRight = 0.83;
  const fTop2  = 0.20, fBot2  = 0.80;
  const fStem  = 0.10;
  const fMidY  = 0.46, fMidBot = 0.56;
  const fArmR  = 0.26; // right arm end

  let inF = false;
  if (nx >= fLeft && ny >= fTop2 && ny <= fBot2) {
    // vertical stem
    if (nx <= fLeft + fStem) inF = true;
    // top horizontal bar
    if (ny <= fTop2 + 0.12 && nx <= fRight) inF = true;
    // middle horizontal bar
    if (ny >= fMidY && ny <= fMidBot && nx <= fLeft + fArmR) inF = true;
  }

  const alpha = sdf < 0 ? 255 : Math.round((1 - sdf) * 255);

  if (inD || inF) {
    // White glyph with slight softness
    return [255, 255, 255, alpha];
  }

  return [bg[0], bg[1], bg[2], alpha];
}

// ── Generate & write ────────────────────────────────────────────────
const outDir = join(__dirname, 'public', 'icons');
mkdirSync(outDir, { recursive: true });

for (const size of [192, 512]) {
  const buf  = createPNG(size, (x, y, s) => dfIcon(x, y, s));
  const file = join(outDir, `icon-${size}.png`);
  writeFileSync(file, buf);
  console.log(`✓ ${file} (${buf.length} bytes)`);
}

// Also write a simple square favicon as icon-32
const buf32 = createPNG(32, (x, y, s) => {
  const sdf = Math.max(Math.abs(x - s/2) - s/2 + 2, Math.abs(y - s/2) - s/2 + 2);
  if (sdf > 1) return [0,0,0,0];
  return [0x7c, 0x3a, 0xed, 255];
});
writeFileSync(join(outDir, 'icon-32.png'), buf32);
console.log(`✓ ${join(outDir, 'icon-32.png')}`);

console.log('\nIcons generated successfully!');
