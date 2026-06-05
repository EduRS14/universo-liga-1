import type { TablaGrupo } from "../../types/copa-liga/grupo";

export type EquipoPromedio = {
    equipo_id: number;
    puntos: number;
    partidosJugados: number;
    diferenciaGoles: number;
    golesFavor: number;
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
            promedioPuntos: t.puntos / pj,
            promedioDG: t.diferenciaGoles / pj,
            promedioGF: t.golesFavor / pj
        };
    });
}

export function ordenarPorPromedio(equipos: EquipoPromedio[]): EquipoPromedio[] {
    return [...equipos].sort((a, b) => {
        if (Math.abs(b.promedioPuntos - a.promedioPuntos) > 0.001) return b.promedioPuntos - a.promedioPuntos;
        if (Math.abs(b.promedioDG - a.promedioDG) > 0.001) return b.promedioDG - a.promedioDG;
        if (Math.abs(b.promedioGF - a.promedioGF) > 0.001) return b.promedioGF - a.promedioGF;
        return 0;
    });
}
