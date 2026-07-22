import type { TablaGrupo } from "../../types/copa-liga/grupo";

export type EquipoPromedio = {
    equipo_id: number;
    puntos: number;
    partidosJugados: number;
    diferenciaGoles: number;
    golesFavor: number;
    golesContra: number;
    promedioPuntos: number;
    promedioDG: number;
    promedioGF: number;
};

export function calcularPromedio(tabla: TablaGrupo): EquipoPromedio[] {
    return tabla.map(t => {
        const pj = t.partidosJugados || 1;
        return {
            equipo_id: t.equipo_id,
            puntos: t.puntos,
            partidosJugados: t.partidosJugados,
            diferenciaGoles: t.diferenciaGoles,
            golesFavor: t.golesFavor,
            golesContra: t.golesContra,
            promedioPuntos: t.puntos / pj,
            promedioDG: t.diferenciaGoles / pj,
            promedioGF: t.golesFavor / pj
        };
    });
}
