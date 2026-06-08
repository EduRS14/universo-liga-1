import type { Jugador } from '../../../types/minijuegos/jugador.interface';

export interface JugadorOculto {
    id: number;
    nombre: string;
    edad: number;
    altura: number;
    clubActual: string;
    clubActualId: number | null;
    posicionPrincipal: string;
    valorMercadoMaximo: number;
    nacionalidades: number[];
    url_foto: string;
}

export type CategoriaFiltro = 'club' | 'posicion' | 'nacionalidad' | 'edad' | 'altura' | 'valor';

export type PosicionGlobal = 'Arquero' | 'Defensa' | 'Mediocampista' | 'Atacante';

export type RangoEdad = 'menor21' | '21a25' | '26a30' | 'mayor30';
export type RangoAltura = 'menor175' | '175a185' | 'mayor185';
export type RangoValor = 'menor500k' | '500ka1_5M' | '1_5Ma4M' | 'mayor4M';

export type EstadoJuego = 'JUGANDO' | 'WIN' | 'GAMEOVER';

export interface Pregunta {
    tipo: CategoriaFiltro;
    valor: string | number;
    etiqueta: string;
}

export interface EntradaHistorial {
    pregunta: string;
    respuesta: 'SI' | 'NO';
}

export interface EstadoJuegoCompleto {
    estado: EstadoJuego;
    intentosRestantes: number;
    intentosNombreRestantes: number;
    nombreUsado: boolean;
    preguntaActiva: Pregunta | null;
    historial: EntradaHistorial[];
    jugadorOculto: JugadorOculto;
}

export interface EstadoDiario {
    dia: string;
    resultado: 'WIN' | 'GAMEOVER';
    historial: EntradaHistorial[];
}

export interface OpcionAutocompletado {
    value: string | number;
    label: string;
}

export interface Equipo {
    id: number;
    nombre: string;
    divisionActual: number;
}

export type { Jugador };
