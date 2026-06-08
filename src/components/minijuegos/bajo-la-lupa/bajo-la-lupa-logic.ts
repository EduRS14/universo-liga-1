import type {
    Jugador,
    JugadorOculto,
    CategoriaFiltro,
    PosicionGlobal,
    RangoEdad,
    RangoAltura,
    RangoValor,
    EstadoJuegoCompleto,
    EstadoDiario,
    OpcionAutocompletado,
    Equipo,
} from './types';

const EPOCH = new Date('2026-01-01').getTime();
const MS_PER_DAY = 86_400_000;

export const MAPA_POSICIONES_GLOBAL: Record<PosicionGlobal, string[]> = {
    'Arquero': ['Portero'],
    'Defensa': ['Defensa central', 'Libero', 'Lateral izquierdo', 'Lateral derecho'],
    'Mediocampista': ['Mediocentro', 'Mediocentro defensivo', 'Pivote', 'Mediapunta', 'Mediocentro ofensivo', 'Interior izquierdo', 'Interior derecho'],
    'Atacante': ['Delantero centro', 'Extremo izquierdo', 'Extremo derecho'],
};

export const NOMBRES_POSICION: Record<PosicionGlobal, string> = {
    'Arquero': 'Arquero',
    'Defensa': 'Defensa',
    'Mediocampista': 'Mediocampista',
    'Atacante': 'Atacante',
};

export const RANGOS_EDAD: Record<RangoEdad, { label: string; check: (e: number) => boolean }> = {
    menor21: { label: 'Menor de 21 años', check: (e) => e < 21 },
    '21a25': { label: 'Entre 21 y 25 años', check: (e) => e >= 21 && e <= 25 },
    '26a30': { label: 'Entre 26 y 30 años', check: (e) => e >= 26 && e <= 30 },
    mayor30: { label: 'Mayor de 30 años', check: (e) => e > 30 },
};

export const RANGOS_ALTURA: Record<RangoAltura, { label: string; check: (a: number) => boolean }> = {
    menor175: { label: 'Menor de 1.75m', check: (a) => a < 175 },
    '175a185': { label: 'Entre 1.75m y 1.85m', check: (a) => a >= 175 && a <= 185 },
    mayor185: { label: 'Mayor de 1.85m', check: (a) => a > 185 },
};

export const RANGOS_VALOR: Record<RangoValor, { label: string; check: (v: number) => boolean }> = {
    menor500k: { label: 'Menor de €500k', check: (v) => v < 500_000 },
    '500ka1_5M': { label: 'Entre €500k y €1.5M', check: (v) => v >= 500_000 && v < 1_500_000 },
    '1_5Ma4M': { label: 'Entre €1.5M y €4M', check: (v) => v >= 1_500_000 && v < 4_000_000 },
    mayor4M: { label: 'Mayor de €4M', check: (v) => v >= 4_000_000 },
};

export const MAX_INTENTOS = 10;
export const MAX_INTENTOS_NOMBRE = 3;
export const DAILY_KEY = 'bajo-la-lupa-hoy';
export const GAME_STATE_KEY = 'bajo-la-lupa-estado';

export const normalizar = (s: string): string =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const coincideNombre = (input: string, target: string): boolean =>
    normalizar(input) === normalizar(target);

export const esJugadorActualLiga1 = (j: Jugador, liga1Ids: number[]): boolean =>
    j.equiposJugados.some(eq =>
        liga1Ids.includes(eq.id_equipo) &&
        eq.periodos.some(([_, fin]) => fin === -1)
    );

export const obtenerPoolCurado = (
    jugadores: Jugador[],
    equipos: Equipo[],
    idsPermitidos: number[]
): JugadorOculto[] => {
    const jugadoresMap = new Map(jugadores.map(j => [j.id, j]));
    const liga1Ids = equipos.filter(e => e.divisionActual === 1).map(e => e.id);
    const liga1Map = new Map(equipos.filter(e => e.divisionActual === 1).map(e => [e.id, e.nombre]));

    const candidatos: JugadorOculto[] = [];

    for (const id of idsPermitidos) {
        const j = jugadoresMap.get(id);
        if (!j) continue;

        if (j.edad < 16 || j.edad > 50) continue;
        if (j.altura <= 0 || j.altura > 230) continue;
        if (j.nacionalidades.length === 0) continue;
        if (!j.url_foto || j.url_foto.includes('default')) continue;
        if (!j.nombre || j.nombre.trim() === '') continue;

        const equipoActual = j.equiposJugados.find(eq =>
            liga1Ids.includes(eq.id_equipo) &&
            eq.periodos.some(([_, fin]) => fin === -1)
        );

        if (!equipoActual) continue;

        candidatos.push({
            id: j.id,
            nombre: j.nombre,
            edad: j.edad,
            altura: j.altura,
            clubActual: liga1Map.get(equipoActual.id_equipo) ?? j.clubActual,
            clubActualId: equipoActual.id_equipo,
            posicionPrincipal: j.posicionPrincipal,
            valorMercadoMaximo: j.valorMercadoMaximo,
            nacionalidades: j.nacionalidades,
            url_foto: j.url_foto,
        });
    }

    return candidatos.sort((a, b) => a.id - b.id);
};

export const obtenerTodosLosJugadores = (
    jugadores: Jugador[]
): JugadorOculto[] => {
    return jugadores
        .map(j => ({
            id: j.id,
            nombre: j.nombre || '',
            edad: j.edad || 0,
            altura: j.altura || 0,
            clubActual: j.clubActual || '',
            clubActualId: null,
            posicionPrincipal: j.posicionPrincipal || '',
            valorMercadoMaximo: j.valorMercadoMaximo || 0,
            nacionalidades: j.nacionalidades || [],
            url_foto: j.url_foto || '',
        }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
};

export const jugadorDelDia = (pool: JugadorOculto[]): JugadorOculto => {
    if (pool.length === 0) throw new Error('Pool diario vacío');
    const dias = Math.floor((Date.now() - EPOCH) / MS_PER_DAY);
    return pool[((dias % pool.length) + pool.length) % pool.length];
};

export const cargarEstadoDiario = (): EstadoDiario | null => {
    try {
        const raw = localStorage.getItem(DAILY_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as EstadoDiario;
        if (parsed.dia !== new Date().toDateString()) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const guardarEstadoDiario = (
    resultado: 'WIN' | 'GAMEOVER',
    historial: EntradaHistorial[]
): void => {
    const state: EstadoDiario = {
        dia: new Date().toDateString(),
        resultado,
        historial,
    };
    localStorage.setItem(DAILY_KEY, JSON.stringify(state));
};

export const cargarEstadoJuego = (): EstadoJuegoCompleto | null => {
    try {
        const raw = sessionStorage.getItem(GAME_STATE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as EstadoJuegoCompleto & { dia: string };
        if (parsed.dia !== new Date().toDateString()) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const guardarEstadoJuego = (estado: EstadoJuegoCompleto): void => {
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

export const validarPregunta = (j: JugadorOculto, tipo: CategoriaFiltro, valor: string | number): boolean => {
    switch (tipo) {
        case 'club':
            return j.clubActualId === Number(valor);
        case 'posicion':
            return MAPA_POSICIONES_GLOBAL[valor as PosicionGlobal]?.includes(j.posicionPrincipal) ?? false;
        case 'nacionalidad':
            return j.nacionalidades.includes(Number(valor));
        case 'edad':
            return RANGOS_EDAD[valor as RangoEdad]?.check(j.edad) ?? false;
        case 'altura':
            return RANGOS_ALTURA[valor as RangoAltura]?.check(j.altura) ?? false;
        case 'valor':
            return RANGOS_VALOR[valor as RangoValor]?.check(j.valorMercadoMaximo) ?? false;
    }
};

export const formatearPregunta = (p: { tipo: CategoriaFiltro; valor: string | number; etiqueta: string }): string => {
    switch (p.tipo) {
        case 'club':
            return `¿Su club actual es ${p.etiqueta}?`;
        case 'posicion':
            return `¿Juega como ${NOMBRES_POSICION[p.valor as PosicionGlobal]}?`;
        case 'nacionalidad':
            return `¿Su país es ${p.etiqueta}?`;
        case 'edad':
            return `¿Su edad es ${RANGOS_EDAD[p.valor as RangoEdad]?.label.toLowerCase()}?`;
        case 'altura':
            return `¿Su altura es ${RANGOS_ALTURA[p.valor as RangoAltura]?.label.toLowerCase()}?`;
        case 'valor':
            return `¿Su valor máximo fue ${RANGOS_VALOR[p.valor as RangoValor]?.label.toLowerCase()}?`;
    }
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

export const obtenerOpcionesClub = (equipos: Equipo[]): OpcionAutocompletado[] =>
    equipos
        .filter(e => e.divisionActual === 1)
        .map(e => ({ value: e.id, label: e.nombre }))
        .sort((a, b) => a.label.localeCompare(b.label));

export const obtenerOpcionesPosicion = (): OpcionAutocompletado[] =>
    (Object.keys(MAPA_POSICIONES_GLOBAL) as PosicionGlobal[]).map(p => ({
        value: p,
        label: NOMBRES_POSICION[p],
    }));

export const obtenerOpcionesNacionalidad = (paises: { id: number; nombre: string }[]): OpcionAutocompletado[] =>
    [...paises]
        .map(p => ({ value: p.id, label: p.nombre }))
        .sort((a, b) => a.label.localeCompare(b.label));

export const obtenerOpcionesEdad = (): OpcionAutocompletado[] =>
    (Object.keys(RANGOS_EDAD) as RangoEdad[]).map(k => ({ value: k, label: RANGOS_EDAD[k].label }));

export const obtenerOpcionesAltura = (): OpcionAutocompletado[] =>
    (Object.keys(RANGOS_ALTURA) as RangoAltura[]).map(k => ({ value: k, label: RANGOS_ALTURA[k].label }));

export const obtenerOpcionesValor = (): OpcionAutocompletado[] =>
    (Object.keys(RANGOS_VALOR) as RangoValor[]).map(k => ({ value: k, label: RANGOS_VALOR[k].label }));

export const crearEstadoInicial = (jugador: JugadorOculto): EstadoJuegoCompleto => ({
    estado: 'JUGANDO',
    intentosRestantes: MAX_INTENTOS,
    intentosNombreRestantes: MAX_INTENTOS_NOMBRE,
    nombreUsado: false,
    preguntaActiva: null,
    historial: [],
    jugadorOculto: jugador,
});

export const obtenerNombrePais = (
    paises: { id: number; nombre: string }[],
    id: number
): string => {
    const p = paises.find(x => x.id === id);
    return p?.nombre ?? `País #${id}`;
};
