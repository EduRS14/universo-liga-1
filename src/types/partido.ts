export interface Partido { 
    id?: number;
    equipo_local: number;
    equipo_visitante: number;
    goles_local: number | null;
    goles_visitante: number | null;
    ganador: number | null;
    jugado: boolean;
}