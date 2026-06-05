import type { GrupoCopa, FechaCopa, TablaGrupo } from "../../types/copa-liga/grupo";

export function calcularTablaGrupo(grupo: GrupoCopa, fechas: FechaCopa[]): TablaGrupo[] {
    const tabla: TablaGrupo[] = grupo.equipos.map(eq => ({
        equipo_id: eq.id,
        puntos: 0,
        partidosJugados: 0,
        victorias: 0,
        empates: 0,
        derrotas: 0,
        golesFavor: 0,
        golesContra: 0,
        diferenciaGoles: 0
    }));

    for (const fecha of fechas) {
        for (const partido of fecha.partidos) {
            if (!partido.jugado || partido.goles_local === null || partido.goles_visitante === null) continue;

            const local = tabla.find(t => t.equipo_id === partido.equipo_local_id)!;
            const visitante = tabla.find(t => t.equipo_id === partido.equipo_visitante_id)!;

            local.partidosJugados++;
            visitante.partidosJugados++;

            local.golesFavor += partido.goles_local;
            local.golesContra += partido.goles_visitante;
            visitante.golesFavor += partido.goles_visitante;
            visitante.golesContra += partido.goles_local;

            if (partido.goles_local > partido.goles_visitante) {
                local.puntos += 3;
                local.victorias++;
                visitante.derrotas++;
            } else if (partido.goles_local < partido.goles_visitante) {
                visitante.puntos += 3;
                visitante.victorias++;
                local.derrotas++;
            } else {
                local.puntos += 1;
                visitante.puntos += 1;
                local.empates++;
                visitante.empates++;
            }
        }
    }

    tabla.forEach(t => {
        t.diferenciaGoles = t.golesFavor - t.golesContra;
    });

    tabla.sort((a, b) => {
        if (b.puntos !== a.puntos) return b.puntos - a.puntos;
        if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
        if (b.golesFavor !== a.golesFavor) return b.golesFavor - a.golesFavor;
        return 0;
    });

    return tabla;
}
