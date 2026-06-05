import type { GrupoCopa, FechaCopa, PartidoCopa } from "../types/copa-liga/grupo";
import type { EquipoCopa } from "../types/copa-liga/equipo";

export function generarFechasGrupo(grupo: GrupoCopa): FechaCopa[] {
    const { equipos, letra, tipo } = grupo;

    if (letra === "A") {
        const [e1, e2, e3, e4] = equipos;
        return [
            { numero: 1, partidos: [crearPartido(letra, 1, e4, e2), crearPartido(letra, 2, e3, e1)] },
            { numero: 2, partidos: [crearPartido(letra, 3, e2, e3), crearPartido(letra, 4, e4, e1)] },
            { numero: 3, partidos: [crearPartido(letra, 5, e3, e4), crearPartido(letra, 6, e1, e2)] }
        ];
    }
    if (letra === "E") {
        const [e1, e2, e3, e4] = equipos;
        return [
            { numero: 1, partidos: [crearPartido(letra, 1, e4, e2), crearPartido(letra, 2, e3, e1)] },
            { numero: 2, partidos: [crearPartido(letra, 3, e2, e3), crearPartido(letra, 4, e4, e1)] },
            { numero: 3, partidos: [crearPartido(letra, 5, e3, e4), crearPartido(letra, 6, e1, e2)] }
        ];
    }
    if (letra === "F") {
        const [e1, e2, e3, e4] = equipos;
        return [
            { numero: 1, partidos: [crearPartido(letra, 1, e4, e2), crearPartido(letra, 2, e3, e1)] },
            { numero: 2, partidos: [crearPartido(letra, 3, e2, e3), crearPartido(letra, 4, e4, e1)] },
            { numero: 3, partidos: [crearPartido(letra, 5, e3, e4), crearPartido(letra, 6, e1, e2)] }
        ];
    }
    if (letra === "J") {
        const [e1, e2, e3, e4] = equipos;
        return [
            { numero: 1, partidos: [crearPartido(letra, 1, e3, e1), crearPartido(letra, 2, e4, e2)] },
            { numero: 2, partidos: [crearPartido(letra, 3, e2, e3), crearPartido(letra, 4, e4, e1)] },
            { numero: 3, partidos: [crearPartido(letra, 5, e3, e4), crearPartido(letra, 6, e1, e2)] }
        ];
    }

    if (tipo === "tres") {
        const [e1, e2, e3] = equipos;

        if (letra === "B") {
            return [
                { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
                { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
                { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
            ];
        }
        if (letra === "C") {
            return [
                { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
                { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
                { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
            ];
        }
        if (letra === "D") {
            return [
                { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
                { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
                { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
            ];
        }
        if (letra === "G") {
            return [
                { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
                { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
                { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
            ];
        }
        if (letra === "H") {
            return [
                { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
                { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
                { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
            ];
        }
        if (letra === "I") {
            return [
                { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
                { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
                { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
            ];
        }
    }

    const [e1, e2, e3] = equipos;
    return [
        { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
    ];
}

function crearPartido(grupoLetra: string, fechaNum: number, local: EquipoCopa, visitante: EquipoCopa): PartidoCopa {
    return {
        id: `G${grupoLetra}-F${fechaNum}-P${Math.random().toString(36).substr(2, 5)}`,
        equipo_local_id: local.id,
        equipo_visitante_id: visitante.id,
        goles_local: null,
        goles_visitante: null,
        jugado: false
    };
}

export interface ConfiguracionTorneo {
    gruposDeCuatro: string[];
    gruposDeTres: string[];
    totalFechasGruposDeCuatro: number;
    totalFechasGruposDeTres: number;
    cuposOctavos: number;
    crucesOctavos: [number, number][];
    crucesCuartos: [string, string][];
    crucesSemifinales: [string, string][];
}

export const configuracionTorneo: ConfiguracionTorneo = {
    gruposDeCuatro: ["A", "E", "F", "J"],
    gruposDeTres: ["B", "C", "D", "G", "H", "I"],
    totalFechasGruposDeCuatro: 3,
    totalFechasGruposDeTres: 3,
    cuposOctavos: 16,
    crucesOctavos: [
        [1, 16],
        [2, 15],
        [3, 14],
        [4, 13],
        [5, 12],
        [6, 11],
        [7, 10],
        [8, 9]
    ],
    crucesCuartos: [
        ["octavos-1", "octavos-8"],
        ["octavos-2", "octavos-7"],
        ["octavos-3", "octavos-6"],
        ["octavos-4", "octavos-5"]
    ],
    crucesSemifinales: [
        ["cuartos-A", "cuartos-D"],
        ["cuartos-B", "cuartos-C"]
    ]
};
