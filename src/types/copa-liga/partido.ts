import type { EquipoCopa } from "./equipo";

export interface PartidoEliminatoria {
    id: string;
    fase: "octavos" | "cuartos" | "semifinales" | "final";
    equipo_local: EquipoCopa | null;
    equipo_visitante: EquipoCopa | null;
    goles_local: number | null;
    goles_visitante: number | null;
    penales_local: number | null;
    penales_visitante: number | null;
    ganador: EquipoCopa | null;
    jugado: boolean;
}
