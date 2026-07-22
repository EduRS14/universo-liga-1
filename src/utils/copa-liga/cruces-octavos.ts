import type { EquipoCopa } from "../../types/copa-liga/equipo";
import type { LlaveEliminatoria } from "../../types/copa-liga/sembrado";
import type { ClasificacionResultado } from "./clasificacion";

export type PartidoAlmacenado = {
    id: string;
    goles_local: number | null;
    goles_visitante: number | null;
    penales_local: number | null;
    penales_visitante: number | null;
    jugado: boolean;
};

function findPrimero(clasificacion: ClasificacionResultado, letra: string): number | null {
    const p = clasificacion.primeros.find(p => p.grupoLetra === letra);
    return p ? p.equipo_id : null;
}

function findSegundo(clasificacion: ClasificacionResultado, letra: string): number | null {
    const s4 = clasificacion.segundos.find(s => s.grupoLetra === letra);
    if (s4) return s4.equipo_id;
    const s3 = clasificacion.mejoresSegundosGruposDeTres.find(s => s.grupoLetra === letra);
    return s3 ? s3.equipo_id : null;
}

function determinarGanador(golesLocal: number | null, golesVisitante: number | null, penalesLocal: number | null, penalesVisitante: number | null, equipoLocal: EquipoCopa | null, equipoVisitante: EquipoCopa | null): EquipoCopa | null {
    if (golesLocal === null || golesVisitante === null) return null;
    if (golesLocal > golesVisitante) return equipoLocal;
    if (golesVisitante > golesLocal) return equipoVisitante;
    if (penalesLocal !== null && penalesVisitante !== null) {
        if (penalesLocal > penalesVisitante) return equipoLocal;
        if (penalesVisitante > penalesLocal) return equipoVisitante;
    }
    return null;
}

export function generarCrucesOctavos(
    clasificacion: ClasificacionResultado,
    equiposMap: Map<number, EquipoCopa>,
    almacenados?: PartidoAlmacenado[]
): LlaveEliminatoria[] {
    const pairings: [string, string, string, string][] = [
        ["A", "primero", "D", "segundo"],
        ["C", "primero", "B", "primero"],
        ["D", "primero", "A", "segundo"],
        ["I", "primero", "J", "segundo"],
        ["J", "primero", "H", "segundo"],
        ["E", "primero", "G", "primero"],
        ["F", "primero", "E", "segundo"],
        ["H", "primero", "F", "segundo"],
    ];

    return pairings.map(([letraLocal, tipoLocal, letraVisitante, tipoVisitante], i) => {
        const id = `octavos-${i + 1}`;
        const localId = tipoLocal === "primero" ? findPrimero(clasificacion, letraLocal) : findSegundo(clasificacion, letraLocal);
        const visitanteId = tipoVisitante === "primero" ? findPrimero(clasificacion, letraVisitante) : findSegundo(clasificacion, letraVisitante);

        const equipoLocal = localId ? equiposMap.get(localId) ?? null : null;
        const equipoVisitante = visitanteId ? equiposMap.get(visitanteId) ?? null : null;

        const almacenado = almacenados?.find(a => a.id === id);
        const golesLocal = almacenado?.goles_local ?? null;
        const golesVisitante = almacenado?.goles_visitante ?? null;
        const penalesLocal = almacenado?.penales_local ?? null;
        const penalesVisitante = almacenado?.penales_visitante ?? null;
        const jugado = almacenado?.jugado ?? false;

        return {
            id,
            equipo_local: equipoLocal,
            equipo_visitante: equipoVisitante,
            goles_local: golesLocal,
            goles_visitante: golesVisitante,
            penales_local: penalesLocal,
            penales_visitante: penalesVisitante,
            ganador: determinarGanador(golesLocal, golesVisitante, penalesLocal, penalesVisitante, equipoLocal, equipoVisitante),
            jugado
        };
    });
}

export function aplicarResultados(
    partidosGenerados: LlaveEliminatoria[],
    almacenados: PartidoAlmacenado[]
): LlaveEliminatoria[] {
    return partidosGenerados.map(p => {
        const a = almacenados.find(s => s.id === p.id);
        if (!a || !a.jugado) return p;
        const golesLocal = a.goles_local ?? null;
        const golesVisitante = a.goles_visitante ?? null;
        const penalesLocal = a.penales_local ?? null;
        const penalesVisitante = a.penales_visitante ?? null;
        return {
            ...p,
            goles_local: golesLocal,
            goles_visitante: golesVisitante,
            penales_local: penalesLocal,
            penales_visitante: penalesVisitante,
            ganador: determinarGanador(golesLocal, golesVisitante, penalesLocal, penalesVisitante, p.equipo_local, p.equipo_visitante),
            jugado: true
        };
    });
}

export function generarCuartos(partidosOctavos: LlaveEliminatoria[]): LlaveEliminatoria[] {
    const cruces: [number, number][] = [[0, 1], [2, 3], [4, 5], [6, 7]];
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
    const cruces: [number, number][] = [[0, 1], [2, 3]];
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
