export interface EquipoRuta {
    nombre: string;
    url_foto: string;
}

export interface JugadorRuta {
    id: number;
    nombre: string;
    url_foto: string;
    ruta: EquipoRuta[];
}

export interface EntradaPoolRuta {
    id_jugador: number;
    ruta: EquipoRuta[];
}

export type EstadoJuegoRuta = 'JUGANDO' | 'WIN' | 'GAMEOVER';

export interface EstadoRuta {
    estado: EstadoJuegoRuta;
    score: number;
    vidas: number;
    equiposRevelados: number;
    fallos: number;
    ruta: EquipoRuta[];
    jugador: JugadorRuta;
}

export interface ResultadoDiarioRuta {
    dia: string;
    resultado: 'WIN' | 'GAMEOVER';
    score: number;
    equiposRevelados: number;
    fallos: number;
}

export interface Jugador {
    id: number;
    nombre: string;
    url_foto: string;
}
