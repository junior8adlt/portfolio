// Conversión puntual: screenshots de viridental → webp optimizado en public/exhibits
import sharp from 'sharp';
import path from 'node:path';
import os from 'node:os';

const TMP = os.tmpdir();
const OUT = path.join(import.meta.dirname, '..', 'public', 'exhibits');

const jobs = [
  { src: 'viridental-dashboard.png', out: 'viridental-dashboard.webp' },
  { src: 'viridental-perio.png', out: 'viridental-perio.webp' },
  { src: 'viridental-odonto.png', out: 'viridental-odonto.webp' },
];

for (const j of jobs) {
  const input = path.join(TMP, j.src);
  const output = path.join(OUT, j.out);
  const img = sharp(input);
  const meta = await img.metadata();
  const info = await img.webp({ quality: 80, effort: 6 }).toFile(output);
  console.log(`${j.out}: ${meta.width}x${meta.height} -> ${(info.size / 1024).toFixed(0)} KB`);
}
