import { FORMATO_CATEGORIA, type Categoria, type Eleccion } from './subeybaja-logic';
import type { Jugador } from '../../types/minijuegos/jugador.interface';
import './styles.css';

interface Props {
    jugador: Jugador;
    categoria: Categoria;
    valor: number;
    esOculto: boolean;
    lado: 'A' | 'B';
    feedbackColor?: 'verde' | 'rojo' | 'tiempo' | null;
    eleccionUsuario?: Eleccion | null;
}

export default function JugadorCard({
    jugador,
    categoria,
    valor,
    esOculto,
    lado,
    feedbackColor = null,
    eleccionUsuario = null,
}: Props) {
    const claseColor = feedbackColor === 'tiempo' ? 'rojo' : feedbackColor;
    const clases = [
        'subeybaja-card',
        `subeybaja-card-${lado}`,
        claseColor ? `subeybaja-card-${claseColor}` : '',
    ].filter(Boolean).join(' ');

    const mostrarValorReal = !esOculto || feedbackColor !== null;

    let mostrarValorBadge = false;
    if (lado === 'B' && eleccionUsuario === 'empate' && feedbackColor === 'verde') {
        mostrarValorBadge = true;
    } else if (lado === 'B' && feedbackColor === 'verde') {
        mostrarValorBadge = true;
    } else if (lado === 'B' && (feedbackColor === 'rojo' || feedbackColor === 'tiempo')) {
        mostrarValorBadge = true;
    }

    return (
        <div className={clases}>
            <div className="subeybaja-card-lado">{lado === 'A' ? 'JUGADOR A' : 'JUGADOR B'}</div>
            <div className="subeybaja-card-imagen-wrapper">
                <img
                    src={jugador.url_foto}
                    alt={jugador.nombre}
                    className="subeybaja-card-imagen"
                />
            </div>
            <div className="subeybaja-card-info">
                <div className="subeybaja-card-nombre">{jugador.nombre}</div>
                <div className="subeybaja-card-club">{jugador.clubActual}</div>
                <div className="subeybaja-card-posicion">{jugador.posicionPrincipal}</div>
            </div>
            <div className={`subeybaja-card-valor ${esOculto && !mostrarValorBadge ? 'subeybaja-card-valor-oculto' : ''}`}>
                {esOculto && !mostrarValorBadge ? (
                    <span className="subeybaja-card-interrogante">?</span>
                ) : (
                    <span className="subeybaja-card-valor-numero">{FORMATO_CATEGORIA[categoria](valor)}</span>
                )}
            </div>
        </div>
    );
}
