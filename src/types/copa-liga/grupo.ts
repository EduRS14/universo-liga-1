import type { EquipoCopa } from "./equipo";

export interface GrupoCopa {
    letra: string;
    equipos: EquipoCopa[];
    tipo: "cuatro" | "tres";
}

export interface FechaCopa {
    numero: number;
    partidos: PartidoCopa[];
}

export interface PartidoCopa {
    id: string;
    equipo_local_id: number;
    equipo_visitante_id: number;
    goles_local: number | null;
    goles_visitante: number | null;
    jugado: boolean;
}

export interface TablaGrupo {
    equipo_id: number;
    puntos: number;
    partidosJugados: number;
    victorias: number;
    empates: number;
    derrotas: number;
    golesFavor: number;
    golesContra: number;
    diferenciaGoles: number;
}
