export interface EquipoJugado {
    id_equipo: number;
    periodos: number[][];
}

export interface TituloObtenido {
  id_trofeo: number;
  cantidad: number;
}

export interface Jugador {
    id: number;
    nombre: string;
    fechaNacimiento: string;
    fechaFallecimiento: string | null;
    edad: number;
    altura: number;
    nacionalidades: number[];
    clubActual: string;
    posicionPrincipal: string;
    posicionesSecundarias: string[];
    valorMercadoMaximo: number;
    jugoExtranjero: boolean;
    equiposJugados: EquipoJugado[];
    titulosObtenidos: TituloObtenido[];
    url_foto: string;
}