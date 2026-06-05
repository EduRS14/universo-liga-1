export interface NexoJugador {
    id: number;
    nombre: string;
    url_foto?: string;
    equiposJugados: {
        id_equipo: number;
        periodos: number[][];
    }[];
}

export interface ResultadoValidacion {
    valido: boolean;
    nexoFallido?: number;
    clubFallo?: number;
    mensaje?: string;
}

export interface ResultadoEstrellas2 {
    estrellas: 1 | 2 | 3;
    label: string;
}