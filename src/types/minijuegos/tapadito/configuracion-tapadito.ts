import type { Jugador } from "../jugador.interface";

export interface ConfiguracionTapadito {
    estado: string;
    fechaUltimaPartida: string;
    nombreJugador: string;
    datosJugador: Jugador;
    cantidadLetras: number;
    palabrasUsadas: (string | null)[];
}