import type { EquipoCopa } from "../../types/copa-liga/equipo";
import type { SembradoEquipo } from "../../types/copa-liga/sembrado";
import { type EquipoPromedio } from "./calcular-promedio";
import { type ClasificacionResultado } from "./clasificacion";

const GRUPOS_DE_CUATRO = new Set(["A", "E", "F", "J"]);

function sortByAbsolute<T extends { puntos: number; diferenciaGoles: number; golesFavor: number; golesContra: number }>(items: T[]): T[] {
    return [...items].sort((a, b) => {
        if (b.puntos !== a.puntos) return b.puntos - a.puntos;
        if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
        if (b.golesFavor !== a.golesFavor) return b.golesFavor - a.golesFavor;
        return a.golesContra - b.golesContra;
    });
}

export function generarSembrado(
    clasificacion: ClasificacionResultado,
    equiposMap: Map<number, EquipoCopa>
): SembradoEquipo[] {
    const todosPrimeros = clasificacion.primeros.map(p => ({
        ...p.promedio,
        grupoLetra: p.grupoLetra,
        esPrimero: true
    }));

    const segundosDeGruposDeCuatro = clasificacion.segundos
        .filter(s => GRUPOS_DE_CUATRO.has(s.grupoLetra))
        .map(s => ({ ...s.promedio, grupoLetra: s.grupoLetra, esPrimero: false }));

    const mejoresSegundosDeTres = clasificacion.mejoresSegundosGruposDeTres
        .map(s => ({ ...s.promedio, grupoLetra: s.grupoLetra, esPrimero: false }));

    const restantes = [
        ...segundosDeGruposDeCuatro,
        ...mejoresSegundosDeTres
    ];

    const primerosOrdenados = sortByAbsolute(todosPrimeros);
    const restantesOrdenados = sortByAbsolute(restantes);

    const sembrado: SembradoEquipo[] = [];

    primerosOrdenados.forEach((p, i) => {
        sembrado.push({
            posicion: i + 1,
            equipo: equiposMap.get(p.equipo_id)!,
            puntos: p.puntos,
            partidosJugados: p.partidosJugados,
            diferenciaGoles: p.diferenciaGoles,
            golesFavor: p.golesFavor,
            golesContra: p.golesContra,
            promedioPuntos: p.promedioPuntos,
            promedioDG: p.promedioDG,
            esPrimero: true,
            grupoLetra: p.grupoLetra
        });
    });

    restantesOrdenados.forEach((p, i) => {
        sembrado.push({
            posicion: primerosOrdenados.length + i + 1,
            equipo: equiposMap.get(p.equipo_id)!,
            puntos: p.puntos,
            partidosJugados: p.partidosJugados,
            diferenciaGoles: p.diferenciaGoles,
            golesFavor: p.golesFavor,
            golesContra: p.golesContra,
            promedioPuntos: p.promedioPuntos,
            promedioDG: p.promedioDG,
            esPrimero: false,
            grupoLetra: p.grupoLetra
        });
    });

    return sembrado;
}
