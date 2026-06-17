import type {
    JugadorRuta,
    EntradaPoolRuta,
    EstadoRuta,
    ResultadoDiarioRuta,
    Jugador,
} from './types';

const EPOCH = new Date('2026-01-01').getTime();
const MS_PER_DAY = 86_400_000;

export const INITIAL_SCORE = 1000;
export const PENALTY_NOMBRE = 150;
export const PENALTY_REVELAR = 100;
export const VIDAS_INICIAL = 3;
export const DAILY_KEY = 'la-ruta-hoy';
export const GAME_STATE_KEY = 'la-ruta-estado';

export const normalizar = (s: string): string =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const coincideNombre = (input: string, target: string): boolean =>
    normalizar(input) === normalizar(target);

export const obtenerPoolRuta = (
    jugadores: Jugador[],
    entradas: EntradaPoolRuta[]
): JugadorRuta[] => {
    const jugadoresMap = new Map(jugadores.map(j => [j.id, j]));
    const candidatos: JugadorRuta[] = [];

    for (const entrada of entradas) {
        const j = jugadoresMap.get(entrada.id_jugador);
        if (!j) continue;
        if (!j.nombre || j.nombre.trim() === '') continue;
        if (!j.url_foto || j.url_foto.includes('default')) continue;
        if (entrada.ruta.length < 4 || entrada.ruta.length > 5) continue;

        candidatos.push({
            id: j.id,
            nombre: j.nombre,
            url_foto: j.url_foto,
            ruta: entrada.ruta,
        });
    }

    return candidatos.sort((a, b) => a.id - b.id);
};

export const jugadorDelDia = (pool: JugadorRuta[]): JugadorRuta => {
    if (pool.length === 0) throw new Error('Pool diario vacío');
    const dias = Math.floor((Date.now() - EPOCH) / MS_PER_DAY);
    return pool[((dias % pool.length) + pool.length) % pool.length];
};

export const cargarEstadoDiario = (): ResultadoDiarioRuta | null => {
    try {
        const raw = localStorage.getItem(DAILY_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as ResultadoDiarioRuta;
        if (parsed.dia !== new Date().toDateString()) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const guardarEstadoDiario = (
    resultado: 'WIN' | 'GAMEOVER',
    score: number,
    equiposRevelados: number,
    fallos: number
): void => {
    const state: ResultadoDiarioRuta = {
        dia: new Date().toDateString(),
        resultado,
        score,
        equiposRevelados,
        fallos,
    };
    localStorage.setItem(DAILY_KEY, JSON.stringify(state));
};

export const cargarEstadoJuego = (): EstadoRuta | null => {
    try {
        const raw = sessionStorage.getItem(GAME_STATE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as EstadoRuta & { dia: string };
        if (parsed.dia !== new Date().toDateString()) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const guardarEstadoJuego = (estado: EstadoRuta): void => {
    try {
        const payload = { ...estado, dia: new Date().toDateString() };
        sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(payload));
    } catch {
        // sessionStorage lleno o no disponible
    }
};

export const limpiarEstadoJuego = (): void => {
    try {
        sessionStorage.removeItem(GAME_STATE_KEY);
    } catch {
        // ignorar
    }
};

export const crearEstadoInicial = (jugador: JugadorRuta): EstadoRuta => ({
    estado: 'JUGANDO',
    score: INITIAL_SCORE,
    vidas: VIDAS_INICIAL,
    equiposRevelados: 1,
    fallos: 0,
    ruta: jugador.ruta,
    jugador,
});

export const calcularScore = (
    fallos: number,
    equiposRevelados: number,
    totalEquipos: number
): number => {
    const penalizacionNombres = fallos * PENALTY_NOMBRE;
    const penalizacionRevelaciones = (equiposRevelados - 1) * PENALTY_REVELAR;
    return Math.max(0, INITIAL_SCORE - penalizacionNombres - penalizacionRevelaciones);
};

export const hayPartidaEnCurso = (): boolean => {
    try {
        const raw = sessionStorage.getItem(GAME_STATE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw) as { dia: string };
        return parsed.dia === new Date().toDateString();
    } catch {
        return false;
    }
};

export const obtenerTodosLosJugadores = (
    jugadores: Jugador[]
): { nombre: string; id: number }[] => {
    return jugadores
        .filter(j => j.nombre && j.nombre.trim() !== '')
        .map(j => ({ nombre: j.nombre, id: j.id }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
};
