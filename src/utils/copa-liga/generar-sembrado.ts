import type { EquipoCopa } from "../../types/copa-liga/equipo";
import type { SembradoEquipo } from "../../types/copa-liga/sembrado";
import { type EquipoPromedio, ordenarPorPromedio } from "./calcular-promedio";
import { type ClasificacionResultado } from "./clasificacion";

const GRUPOS_DE_CUATRO = new Set(["A", "E", "F", "J"]);

export function generarSembrado(
    clasificacion: ClasificacionResultado,
    equiposMap: Map<number, EquipoCopa>
): SembradoEquipo[] {
    const todosPrimeros = clasificacion.primeros.map(p => ({
        ...p.promedio,
        esPrimero: true
    }));

    const segundosDeGruposDeCuatro = clasificacion.segundos
        .filter(s => GRUPOS_DE_CUATRO.has(s.grupoLetra))
        .map(s => ({ ...s.promedio, esPrimero: false }));

    const mejoresSegundosDeTres = clasificacion.mejoresSegundosGruposDeTres
        .map(s => ({ ...s.promedio, esPrimero: false }));

    const restantes = [
        ...segundosDeGruposDeCuatro,
        ...mejoresSegundosDeTres
    ];

    const primerosOrdenados = ordenarPorPromedio(todosPrimeros);
    const restantesOrdenados = ordenarPorPromedio(restantes);

    const sembrado: SembradoEquipo[] = [];

    primerosOrdenados.forEach((p, i) => {
        sembrado.push({
            posicion: i + 1,
            equipo: equiposMap.get(p.equipo_id)!,
            puntos: p.puntos,
            partidosJugados: p.partidosJugados,
            diferenciaGoles: p.diferenciaGoles,
            promedioPuntos: p.promedioPuntos,
            promedioDG: p.promedioDG,
            esPrimero: true
        });
    });

    restantesOrdenados.forEach((p, i) => {
        sembrado.push({
            posicion: primerosOrdenados.length + i + 1,
            equipo: equiposMap.get(p.equipo_id)!,
            puntos: p.puntos,
            partidosJugados: p.partidosJugados,
            diferenciaGoles: p.diferenciaGoles,
            promedioPuntos: p.promedioPuntos,
            promedioDG: p.promedioDG,
            esPrimero: false
        });
    });

    return sembrado;
}
