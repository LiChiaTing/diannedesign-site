import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../public/og-image.png');

// 1200 × 630 — standard OG image size
const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1.2" fill="#d0d0d0" opacity="0.5"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${W}" height="4" fill="#E04F72"/>

  <!-- Left pink block accent -->
  <rect x="80" y="190" width="4" height="220" fill="#E04F72" opacity="0.25"/>

  <!-- Name -->
  <text x="112" y="276"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="88" font-weight="300"
    fill="#111111">Dianne Ting</text>

  <!-- Pink underline accent -->
  <rect x="112" y="294" width="520" height="3" fill="#E04F72" opacity="0.2"/>

  <!-- Title + Location -->
  <text x="114" y="348"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="26" font-weight="400"
    letter-spacing="1"
    fill="#999999">Product Designer</text>

  <circle cx="352" cy="336" r="3" fill="#E04F72"/>

  <text x="368" y="348"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="26" font-weight="300"
    fill="#bbbbbb">Seattle</text>

  <!-- Tagline -->
  <text x="114" y="410"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="26" font-weight="300"
    font-style="italic"
    fill="#E04F72">Turning Ideas Into Impact.</text>

  <!-- URL bottom right -->
  <text x="${W - 80}" y="${H - 48}"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="20" font-weight="300"
    letter-spacing="1"
    text-anchor="end"
    fill="#cccccc">diannedesign.me</text>

  <!-- Bottom accent line -->
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="#E04F72" opacity="0.15"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(outPath);

console.log(`✓ OG image saved to ${outPath}`);
