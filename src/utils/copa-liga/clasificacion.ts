import type { GrupoCopa, FechaCopa, TablaGrupo } from "../../types/copa-liga/grupo";
import { calcularTablaGrupo } from "./calcular-tabla";
import { calcularPromedio, ordenarPorPromedio, type EquipoPromedio } from "./calcular-promedio";

export type ClasificacionResultado = {
    primeros: { grupoLetra: string; equipo_id: number; promedio: EquipoPromedio }[];
    segundos: { grupoLetra: string; equipo_id: number; promedio: EquipoPromedio }[];
    mejoresSegundosGruposDeTres: { grupoLetra: string; equipo_id: number; promedio: EquipoPromedio }[];
};

export function obtenerClasificacion(
    grupos: GrupoCopa[],
    todasLasFechas: Record<string, FechaCopa[]>
): ClasificacionResultado {
    const primeros: ClasificacionResultado["primeros"] = [];
    const segundos: ClasificacionResultado["segundos"] = [];
    const segundosGruposDeTres: { grupoLetra: string; equipo_id: number; promedio: EquipoPromedio }[] = [];

    for (const grupo of grupos) {
        const fechas = todasLasFechas[grupo.letra] || [];
        const tabla = calcularTablaGrupo(grupo, fechas);
        const conPromedio = calcularPromedio(tabla);

        const primero = conPromedio[0];
        const segundo = conPromedio[1];

        primeros.push({
            grupoLetra: grupo.letra,
            equipo_id: primero.equipo_id,
            promedio: primero
        });

        segundos.push({
            grupoLetra: grupo.letra,
            equipo_id: segundo.equipo_id,
            promedio: segundo
        });

        if (grupo.tipo === "tres") {
            segundosGruposDeTres.push({
                grupoLetra: grupo.letra,
                equipo_id: segundo.equipo_id,
                promedio: segundo
            });
        }
    }

    const ordenados = ordenarPorPromedio(segundosGruposDeTres);
    const mejoresSegundos = ordenados.slice(0, 2);

    return {
        primeros,
        segundos,
        mejoresSegundosGruposDeTres: mejoresSegundos
    };
}
