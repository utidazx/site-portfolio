import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="u-grad" x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#BEF264"/>
      <stop offset="50%" stop-color="#6AAD1F"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>
    <radialGradient id="u-glow" cx="50%" cy="52%" r="45%">
      <stop offset="0%" stop-color="#6AAD1F" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#6AAD1F" stop-opacity="0"/>
    </radialGradient>
    <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Squircle Container -->
  <rect width="64" height="64" rx="16" fill="#0C0D10"/>
  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="15.25" stroke="#1F242C" stroke-width="1.5"/>

  <!-- Radial Glow Behind U -->
  <circle cx="32" cy="33" r="22" fill="url(#u-glow)"/>

  <!-- Left Code Bracket { -->
  <path
    d="M14 18 C14 22 10.5 23 10.5 25.5 C10.5 28 14 29 14 33"
    stroke="#84CC16"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Right Code Bracket } -->
  <path
    d="M50 31 C50 35 53.5 36 53.5 38.5 C53.5 41 50 42 50 46"
    stroke="#84CC16"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Inner Graph Connections (Neo4j / Data flow) -->
  <line x1="20" y1="26" x2="32" y2="38" stroke="#84CC16" stroke-width="1.8" stroke-opacity="0.85"/>
  <line x1="32" y1="38" x2="44" y2="24" stroke="#84CC16" stroke-width="1.8" stroke-opacity="0.85"/>
  <line x1="20" y1="35" x2="44" y2="35" stroke="#6AAD1F" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="2 2"/>

  <!-- Main Monogram "U" -->
  <path
    d="M20 16 L20 35 A12 12 0 0 0 44 35 L44 16"
    stroke="url(#u-grad)"
    stroke-width="4.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#subtle-shadow)"
  />

  <!-- Graph Node Points -->
  <circle cx="20" cy="16" r="2.6" fill="#BEF264"/>
  <circle cx="44" cy="16" r="2.6" fill="#BEF264"/>
  <circle cx="20" cy="26" r="2.2" fill="#FFFFFF"/>
  <circle cx="32" cy="38" r="2.6" fill="#BEF264"/>
  <circle cx="44" cy="24" r="2.2" fill="#FFFFFF"/>
  <circle cx="32" cy="47" r="2.2" fill="#6AAD1F"/>
</svg>`;

const publicDir = path.resolve("public");

// 1. Write public/icon.svg
fs.writeFileSync(path.join(publicDir, "icon.svg"), svg, "utf-8");
console.log("Updated public/icon.svg");

// 2. Generate PNG favicons
const svgBuffer = Buffer.from(svg);

await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile(path.join(publicDir, "favicon-16x16.png"));

await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, "favicon-32x32.png"));

await sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toFile(path.join(publicDir, "favicon-48x48.png"));

await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

// Favicon.ico from 32x32 png
const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico32);

console.log("All favicons successfully generated!");
