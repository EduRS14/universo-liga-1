import type { Jugador } from '../../types/minijuegos/jugador.interface';

export type Categoria =
    | 'valorMercadoMaximo'
    | 'titulosObtenidos'
    | 'equiposJugados'
    | 'edad'
    | 'altura';

export const CATEGORIAS: Categoria[] = [
    'valorMercadoMaximo',
    'titulosObtenidos',
    'equiposJugados',
    'edad',
    'altura',
];

export const NOMBRES_CATEGORIA: Record<Categoria, string> = {
    valorMercadoMaximo: 'Valor de Mercado Máximo',
    titulosObtenidos: 'Títulos Obtenidos',
    equiposJugados: 'Equipos Jugados',
    edad: 'Edad',
    altura: 'Altura',
};

export const ICONOS_CATEGORIA: Record<Categoria, string> = {
    valorMercadoMaximo: '💰',
    titulosObtenidos: '🏆',
    equiposJugados: '⚽',
    edad: '🎂',
    altura: '📏',
};

export const FORMATO_CATEGORIA: Record<Categoria, (v: number) => string> = {
    valorMercadoMaximo: (v) => {
        if (v >= 1_000_000) return `€${(v / 1_000_000).toFixed(1)}M`;
        if (v >= 1_000) return `€${(v / 1_000).toFixed(0)}K`;
        return `€${v}`;
    },
    titulosObtenidos: (v) => `${v} ${v === 1 ? 'título' : 'títulos'}`,
    equiposJugados: (v) => `${v} ${v === 1 ? 'club' : 'clubes'}`,
    edad: (v) => `${v} ${v === 1 ? 'año' : 'años'}`,
    altura: (v) => `${(v / 100).toFixed(2)}m`,
};

export type Eleccion = 'mayor' | 'menor' | 'empate';

export const esJugadorValido = (j: Jugador): boolean =>
    j.valorMercadoMaximo > 0 &&
    j.equiposJugados.length > 0 &&
    j.titulosObtenidos.length > 0 &&
    j.titulosObtenidos.some(t => t.cantidad > 0) &&
    j.altura >= 150 &&
    j.altura <= 215 &&
    j.edad >= 16 &&
    j.edad <= 50 &&
    j.nombre.trim() !== '' &&
    !!j.url_foto;

export const obtenerValor = (jugador: Jugador, categoria: Categoria): number => {
    switch (categoria) {
        case 'valorMercadoMaximo':
            return jugador.valorMercadoMaximo;
        case 'titulosObtenidos':
            return jugador.titulosObtenidos.reduce((sum, t) => sum + t.cantidad, 0);
        case 'equiposJugados':
            return jugador.equiposJugados.length;
        case 'edad':
            return jugador.edad;
        case 'altura':
            return jugador.altura;
    }
};

export const categoriaDelDia = (): Categoria => {
    const epoch = new Date('2026-01-01').getTime();
    const dias = Math.floor((Date.now() - epoch) / 86_400_000);
    return CATEGORIAS[dias % CATEGORIAS.length];
};

export const esCorrecto = (valorA: number, valorB: number, eleccion: Eleccion): boolean => {
    if (eleccion === 'empate') return valorA === valorB;
    if (eleccion === 'mayor') return valorB > valorA;
    if (eleccion === 'menor') return valorB < valorA;
    return false;
};

export const seleccionarPar = (pool: Jugador[]): [Jugador, Jugador] | null => {
    if (pool.length < 2) return null;
    const a = pool[Math.floor(Math.random() * pool.length)];
    let b = a;
    let intentos = 0;
    while (b.id === a.id && intentos < 50) {
        b = pool[Math.floor(Math.random() * pool.length)];
        intentos++;
    }
    if (b.id === a.id) return null;
    return [a, b];
};

export const seleccionarNuevoB = (pool: Jugador[], evitarId: number): Jugador | null => {
    if (pool.length < 2) return null;
    let b: Jugador = pool[0];
    let intentos = 0;
    while (b.id === evitarId && intentos < 50) {
        b = pool[Math.floor(Math.random() * pool.length)];
        intentos++;
    }
    if (b.id === evitarId) return null;
    return b;
};

export interface SesionJuego {
    pool: Jugador[];
    usados: Set<number>;
}

export const crearSesion = (pool: Jugador[]): SesionJuego => {
    return {
        pool: pool.slice(),
        usados: new Set<number>(),
    };
};

const resetearUsados = (sesion: SesionJuego, idsActuales: number[]): void => {
    sesion.usados = new Set<number>(idsActuales);
};

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const seleccionarParInicial = (sesion: SesionJuego): [Jugador, Jugador] | null => {
    if (sesion.pool.length < 2) return null;

    const disponibles = sesion.pool.filter(j => !sesion.usados.has(j.id));
    const poolEfectivo = disponibles.length >= 2 ? disponibles : sesion.pool;

    const a = pickRandom(poolEfectivo);
    let b = a;
    let intentos = 0;
    while (b.id === a.id && intentos < 50) {
        b = pickRandom(poolEfectivo);
        intentos++;
    }
    if (b.id === a.id) return null;

    sesion.usados.add(a.id);
    sesion.usados.add(b.id);
    return [a, b];
};

export const seleccionarSiguienteB = (
    sesion: SesionJuego,
    evitarIds: number[]
): Jugador | null => {
    if (sesion.pool.length < 1) return null;

    const setEvitar = new Set<number>(evitarIds);

    const disponibles = sesion.pool.filter(
        j => !sesion.usados.has(j.id) && !setEvitar.has(j.id)
    );

    if (disponibles.length === 0) {
        resetearUsados(sesion, evitarIds);
        const nuevosDisponibles = sesion.pool.filter(
            j => !setEvitar.has(j.id)
        );
        if (nuevosDisponibles.length === 0) return null;
        const nuevo = pickRandom(nuevosDisponibles);
        sesion.usados.add(nuevo.id);
        return nuevo;
    }

    const nuevo = pickRandom(disponibles);
    sesion.usados.add(nuevo.id);
    return nuevo;
};

export interface Records {
    mejorRachaAbsoluta: number;
    recordsPorCategoria: Record<string, number>;
}

const RECORDS_KEY = 'futperu_subeybaja_records';

export const cargarRecords = (): Records => {
    try {
        const raw = localStorage.getItem(RECORDS_KEY);
        if (!raw) return { mejorRachaAbsoluta: 0, recordsPorCategoria: {} };
        const parsed = JSON.parse(raw);
        return {
            mejorRachaAbsoluta: parsed.mejorRachaAbsoluta ?? 0,
            recordsPorCategoria: parsed.recordsPorCategoria ?? {},
        };
    } catch {
        return { mejorRachaAbsoluta: 0, recordsPorCategoria: {} };
    }
};

export const guardarRecords = (records: Records): void => {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

export interface DailyState {
    categoria: string;
    dia: string;
    rachaFinal: number;
}

const DAILY_KEY = 'futperu_subeybaja_played_today';

export const cargarEstadoDiario = (): DailyState | null => {
    try {
        const raw = localStorage.getItem(DAILY_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed.dia !== new Date().toDateString()) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const guardarEstadoDiario = (categoria: string, rachaFinal: number): void => {
    const state: DailyState = {
        categoria,
        dia: new Date().toDateString(),
        rachaFinal,
    };
    localStorage.setItem(DAILY_KEY, JSON.stringify(state));
};

const GAME_STATE_KEY = 'futperu_subeybaja_game_state';

export type EstadoPersistente = 'INTRO' | 'PLAYING' | 'REVEAL' | 'FEEDBACK' | 'GAMEOVER';
export type FeedbackPersistente = 'verde' | 'rojo' | 'tiempo';

export interface SavedGameState {
    jugadorA: Jugador;
    jugadorB: Jugador;
    racha: number;
    tiempoRestante: number;
    estado: EstadoPersistente;
    countdown: number;
    feedback: FeedbackPersistente | null;
    eleccion: Eleccion | null;
    sesionUsados: number[];
    estadoStartTime: number;
    preguntaStartTime: number;
    categoriaDia: string;
}

export const guardarEstadoJuego = (state: SavedGameState): void => {
    try {
        sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } catch {
        // sessionStorage lleno o no disponible, ignorar
    }
};

export const cargarEstadoJuego = (): SavedGameState | null => {
    try {
        const raw = sessionStorage.getItem(GAME_STATE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as SavedGameState;
        if (parsed.categoriaDia !== new Date().toDateString()) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const limpiarEstadoJuego = (): void => {
    try {
        sessionStorage.removeItem(GAME_STATE_KEY);
    } catch {
        // ignorar
    }
};
