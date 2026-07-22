import type { EquipoCopa } from "./equipo";

export interface SembradoEquipo {
    posicion: number;
    equipo: EquipoCopa;
    puntos: number;
    partidosJugados: number;
    diferenciaGoles: number;
    golesFavor: number;
    golesContra: number;
    promedioPuntos: number;
    promedioDG: number;
    esPrimero: boolean;
    grupoLetra: string;
}

export interface LlaveEliminatoria {
    id: string;
    equipo_local: EquipoCopa | null;
    equipo_visitante: EquipoCopa | null;
    goles_local: number | null;
    goles_visitante: number | null;
    penales_local: number | null;
    penales_visitante: number | null;
    ganador: EquipoCopa | null;
    jugado: boolean;
}

export interface LlaveIdaVuelta {
    id: string;
    equipo_local_ida: EquipoCopa | null;
    equipo_visitante_ida: EquipoCopa | null;
    goles_local_ida: number | null;
    goles_visitante_ida: number | null;
    goles_local_vuelta: number | null;
    goles_visitante_vuelta: number | null;
    penales_local: number | null;
    penales_visitante: number | null;
    ganador: EquipoCopa | null;
    jugado: boolean;
}
