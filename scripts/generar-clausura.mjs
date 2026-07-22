import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aperturaDir = join(__dirname, '..', 'public', 'data', 'fechas', 'apertura');
const clausuraDir = join(__dirname, '..', 'public', 'data', 'fechas', 'clausura');

mkdirSync(clausuraDir, { recursive: true });

const TOTAL_FECHAS = 17;

for (let i = 1; i <= TOTAL_FECHAS; i++) {
  const raw = readFileSync(join(aperturaDir, `fecha${i}.json`), 'utf-8');
  const partidos = JSON.parse(raw);

  const clausura = partidos.map((p) => ({
    id: p.id,
    equipo_local: p.equipo_visitante,
    equipo_visitante: p.equipo_local,
    goles_local: null,
    goles_visitante: null,
    ganador: null,
    jugado: false,
  }));

  writeFileSync(join(clausuraDir, `fecha${i}.json`), JSON.stringify(clausura, null, 4));
  console.log(`  fecha${i}.json — ${clausura.length} partidos generados`);
}

console.log(`\nClausura generado en: ${clausuraDir}`);
