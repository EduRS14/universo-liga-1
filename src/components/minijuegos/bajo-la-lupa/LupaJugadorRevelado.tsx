import type { JugadorOculto, EntradaHistorial } from './types';

interface Props {
    jugador: JugadorOculto;
    resultado: 'WIN' | 'GAMEOVER';
    historial: EntradaHistorial[];
    nombrePais: (id: number) => string;
}

export default function LupaJugadorRevelado({ jugador, resultado, historial, nombrePais }: Props) {
    const esWin = resultado === 'WIN';
    return (
        <div className={`lupa-revelado ${esWin ? 'lupa-revelado-win' : 'lupa-revelado-gameover'}`}>
            <div className="lupa-revelado-titulo">
                {esWin ? '¡CORRECTO!' : 'JUEGO TERMINADO'}
            </div>

            <div className="lupa-revelado-tarjeta">
                <img
                    src={jugador.url_foto}
                    alt={jugador.nombre}
                    className="lupa-revelado-foto"
                />
                <h2 className="lupa-revelado-nombre">{jugador.nombre}</h2>
                <div className="lupa-revelado-info">
                    <div className="lupa-revelado-info-item">
                        <span className="lupa-revelado-info-label">Club</span>
                        <span className="lupa-revelado-info-valor">{jugador.clubActual}</span>
                    </div>
                    <div className="lupa-revelado-info-item">
                        <span className="lupa-revelado-info-label">Posición</span>
                        <span className="lupa-revelado-info-valor">{jugador.posicionPrincipal}</span>
                    </div>
                    <div className="lupa-revelado-info-item">
                        <span className="lupa-revelado-info-label">Edad</span>
                        <span className="lupa-revelado-info-valor">{jugador.edad} años</span>
                    </div>
                    <div className="lupa-revelado-info-item">
                        <span className="lupa-revelado-info-label">Altura</span>
                        <span className="lupa-revelado-info-valor">{(jugador.altura / 100).toFixed(2)}m</span>
                    </div>
                    <div className="lupa-revelado-info-item">
                        <span className="lupa-revelado-info-label">Nacionalidad</span>
                        <span className="lupa-revelado-info-valor">
                            {jugador.nacionalidades.map(nombrePais).join(', ')}
                        </span>
                    </div>
                    <div className="lupa-revelado-info-item">
                        <span className="lupa-revelado-info-label">Valor máximo</span>
                        <span className="lupa-revelado-info-valor">
                            €{jugador.valorMercadoMaximo.toLocaleString('es-PE')}
                        </span>
                    </div>
                </div>

                <div className="lupa-revelado-resumen">
                    <span>Preguntas realizadas: {historial.length}</span>
                </div>
            </div>
        </div>
    );
}
