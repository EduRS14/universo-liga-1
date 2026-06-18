import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '..', 'es.txt');
const outputDir = join(__dirname, '..', 'public', 'data', 'diccionario');

const raw = readFileSync(inputPath, 'utf-8');
const lines = raw.split('\n');

const MIN_LEN = 3;
const MAX_LEN = 12;

const CONJUGATION_SUFFIXES = [
  'ABAMOS', 'ABAIS',
  'AREMOS', 'AREIS',
  'ARAMOS', 'ARAIS',
  'ARIAMOS', 'ARIAIS', 'ARIAN', 'ARIAS',
  'ASEMOS', 'ASEIS',
  'IERAMOS', 'IERAIS', 'IERAN', 'IERAS',
  'IESEMOS', 'IESEIS', 'IESEN', 'IESES',
  'ERIAMOS', 'ERIAIS', 'ERIAN', 'ERIAS',
  'IRIAMOS', 'IRIAIS', 'IRIAN', 'IRIAS',
];

const normalizar = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim();

const grouped = {};

for (let i = 0; i < lines.length; i++) {
  const word = normalizar(lines[i]);
  if (!word) continue;
  if (word.length < MIN_LEN || word.length > MAX_LEN) continue;
  if (!/^[A-ZÑ]+$/.test(word)) continue;
  if (CONJUGATION_SUFFIXES.some(sufijo => word.endsWith(sufijo))) continue;

  const len = word.length;
  if (!grouped[len]) grouped[len] = new Set();
  grouped[len].add(word);
}

mkdirSync(outputDir, { recursive: true });

const totalWords = Object.values(grouped).reduce((sum, set) => sum + set.size, 0);

for (const [len, set] of Object.entries(grouped)) {
  const arr = [...set].sort();
  writeFileSync(join(outputDir, `${len}.json`), JSON.stringify(arr));
  console.log(`  ${len} letters: ${arr.length} words`);
}

console.log(`\nProcessed ${lines.length - 1} entries from Spanish.dic`);
console.log(`Valid words: ${totalWords}`);
console.log(`Output written to: ${outputDir}`);
