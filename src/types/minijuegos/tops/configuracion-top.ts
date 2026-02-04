import type { GoleadoresTemporadas } from "./goleadores";

export interface ConfiguracionTop {
    estado: string;
    tiempoRestante: number;
    goleadoresTemporada: GoleadoresTemporadas;
    indicesGoleadoresCompletados: number[];
    fechaUltimaPartida: string;
    numeroJugadoresCompletados: number;
}