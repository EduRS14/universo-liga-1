import type { SembradoEquipo } from "../../types/copa-liga/sembrado";
import type { LlaveEliminatoria } from "../../types/copa-liga/sembrado";

export function generarCrucesOctavos(sembrado: SembradoEquipo[]): LlaveEliminatoria[] {
    const cruces: [number, number][] = [
        [1, 16], [2, 15], [3, 14], [4, 13],
        [5, 12], [6, 11], [7, 10], [8, 9]
    ];

    return cruces.map(([seedLocal, seedVisitante], i) => {
        const local = sembrado.find(s => s.posicion === seedLocal);
        const visitante = sembrado.find(s => s.posicion === seedVisitante);

        return {
            id: `octavos-${i + 1}`,
            equipo_local: local ? local.equipo : null,
            equipo_visitante: visitante ? visitante.equipo : null,
            goles_local: null,
            goles_visitante: null,
            penales_local: null,
            penales_visitante: null,
            ganador: null,
            jugado: false
        };
    });
}

export function generarCuartos(partidosOctavos: LlaveEliminatoria[]): LlaveEliminatoria[] {
    const cruces: [number, number][] = [
        [0, 7],
        [1, 6],
        [2, 5],
        [3, 4]
    ];

    return cruces.map(([idx1, idx2], i) => {
        const g1 = partidosOctavos[idx1]?.ganador || null;
        const g2 = partidosOctavos[idx2]?.ganador || null;

        return {
            id: `cuartos-${String.fromCharCode(65 + i)}`,
            equipo_local: g1,
            equipo_visitante: g2,
            goles_local: null,
            goles_visitante: null,
            penales_local: null,
            penales_visitante: null,
            ganador: null,
            jugado: false
        };
    });
}

export function generarSemifinales(partidosCuartos: LlaveEliminatoria[]): LlaveEliminatoria[] {
    const cruces: [number, number][] = [
        [0, 3],
        [1, 2]
    ];

    return cruces.map(([idx1, idx2], i) => {
        const g1 = partidosCuartos[idx1]?.ganador || null;
        const g2 = partidosCuartos[idx2]?.ganador || null;

        return {
            id: `semifinal-${i + 1}`,
            equipo_local: g1,
            equipo_visitante: g2,
            goles_local: null,
            goles_visitante: null,
            penales_local: null,
            penales_visitante: null,
            ganador: null,
            jugado: false
        };
    });
}

export function generarFinal(partidosSemifinales: LlaveEliminatoria[]): LlaveEliminatoria {
    const g1 = partidosSemifinales[0]?.ganador || null;
    const g2 = partidosSemifinales[1]?.ganador || null;

    return {
        id: "final",
        equipo_local: g1,
        equipo_visitante: g2,
        goles_local: null,
        goles_visitante: null,
        penales_local: null,
        penales_visitante: null,
        ganador: null,
        jugado: false
    };
}
