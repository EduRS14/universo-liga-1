import type { GoleadoresTemporadas } from "./goleadores";

export interface ConfiguracionTop {
    estado: string;
    tiempoRestante: number;
    goleadoresTemporada: GoleadoresTemporadas;
    indicesGoleadoresCompletados: number[];
    fechaUltimaPartida: string;
    numeroJugadoresCompletados: number;
}

export interface ResultadoFinalTop {
    dia: string;
    gano: boolean;
    goleadoresCompletados: number;
    goleadoresTemporada: GoleadoresTemporadas;
    indicesGoleadoresCompletados: number[];
    seRindio: boolean;
    tiempoTotalSegundos: number;
}