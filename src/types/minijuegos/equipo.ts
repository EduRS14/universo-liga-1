export type Periodo = [number, number];

export interface Torneo {
  id_torneo: number;
  periodos: Periodo[];
}

export interface Trofeo {
  id_trofeo: number;
  cantidad: number;
}

export interface Equipo {
  id: number;
  nombre: string;
  url_foto: string;
  multiplicador: number;
  torneos: Torneo[];
  trofeos: Trofeo[];
  divisionActual: number;
  fechaFundacion: string;
}