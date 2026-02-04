export interface GoleadorItem {
    rank: number;
    id_jugador: number;
    goles: number;
    id_equipo: number[];
}

export interface GoleadoresTemporadas {
    temporada: number;
    goleadores: GoleadorItem[];
}