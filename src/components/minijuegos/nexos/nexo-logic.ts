export const AÑO_ACTUAL = 2026;

export function normalizarPeriodo(periodo: number[]): number[] {
    return periodo.map(p => p === -1 ? AÑO_ACTUAL : p);
}

export interface NexoJugador {
    id: number;
    nombre: string;
    url_foto?: string;
    equiposJugados: {
        id_equipo: number;
        periodos: number[][];
    }[];
}

export function periodoIntersecta(
    periodo1: number[],
    periodo2: number[]
): boolean {
    const [inicio1, fin1] = normalizarPeriodo(periodo1);
    const [inicio2, fin2] = normalizarPeriodo(periodo2);
    return inicio1 <= fin2 && inicio2 <= fin1;
}

export function equiposEnComun(
    jugadorA: NexoJugador,
    jugadorB: NexoJugador
): number[] {
    const communes: number[] = [];

    for (const equipoA of jugadorA.equiposJugados) {
        for (const equipoB of jugadorB.equiposJugados) {
            if (equipoA.id_equipo === equipoB.id_equipo) {
                for (const perA of equipoA.periodos) {
                    for (const perB of equipoB.periodos) {
                        if (periodoIntersecta(perA, perB)) {
                            if (!communes.includes(equipoA.id_equipo)) {
                                communes.push(equipoA.id_equipo);
                            }
                        }
                    }
                }
            }
        }
    }

    return communes;
}

export interface ResultadoValidacion {
    valido: boolean;
    nexoFallido?: number;
    clubFallo?: number;
    mensaje?: string;
}

export function validarCadena(
    jugadores: NexoJugador[],
    destino?: NexoJugador | null
): ResultadoValidacion {
    if (jugadores.length < 2) {
        return { valido: false, mensaje: 'Se necesitan al menos 2 jugadores' };
    }

    for (let i = 0; i < jugadores.length - 1; i++) {
        const jugadorA = jugadores[i];
        const jugadorB = jugadores[i + 1];
        const clubes = equiposEnComun(jugadorA, jugadorB);
        if (clubes.length === 0) {
            return {
                valido: false,
                nexoFallido: i + 1,
                clubFallo: -1,
                mensaje: `Nexo ${i + 1}: ${jugadorA.nombre} → ${jugadorB.nombre} no comparten club ni año`
            };
        }
    }

    if (destino) {
        const ultimoIntermedio = jugadores[jugadores.length - 1];
        const clubesDestino = equiposEnComun(ultimoIntermedio, destino);
        if (clubesDestino.length === 0) {
            return {
                valido: false,
                nexoFallido: jugadores.length,
                clubFallo: -1,
                mensaje: `Último jugador → ${destino.nombre} no comparten club ni año`
            };
        }
    }

    return { valido: true };
}

export interface ResultadoEstrellas {
    estrellas: 0 | 1 | 2 | 3;
    label: string;
}

export function calcularEstrellas(cantidadIntermedios: number): ResultadoEstrellas {
    if (cantidadIntermedios <= 2) {
        return { estrellas: 3, label: 'Clase Mundial' };
    } else if (cantidadIntermedios <= 4) {
        return { estrellas: 2, label: 'Conocedor de la pelotita' };
    } else if (cantidadIntermedios === 5) {
        return { estrellas: 1, label: 'Sufriendo en los descuentos' };
    } else {
        return { estrellas: 0, label: '¡Ruta muy larga! Pero al menos llegaste' };
    }
}
