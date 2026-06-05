import type { SembradoEquipo } from '../../types/copa-liga/sembrado';
import './styles.css';

interface Props {
    sembrado: SembradoEquipo[];
}

export default function TablaSembrado({ sembrado }: Props) {
    return (
        <div className="contenedor-sembrado">
            <h2 className="titulo-seccion">TABLA DE CLASIFICADOS</h2>
            <p className="subtitulo-sembrado">Ordenados por promedio de puntos y diferencia de goles promedio</p>

            <div className="container-fluid">

                <div className="row align-items-center justify-content-center">

                    <div className="col-12 col-lg-5">

                        <div className="tabla-sembrado-header">
                            <div className="ts-col ts-pos">#</div>
                            <div className="ts-col ts-equipo">Equipo</div>
                            <div className="ts-col ts-num">Tipo</div>
                            <div className="ts-col ts-num">PTS</div>
                            <div className="ts-col ts-num">PJ</div>
                            <div className="ts-col ts-num">Prom PTS</div>
                            <div className="ts-col ts-num">DG</div>
                            <div className="ts-col ts-num">Prom DG</div>
                        </div>

                        {sembrado.map((item, pos) => (
                            <div key={item.posicion} className={`tabla-sembrado-row ${pos === sembrado.length - 1 ? 'fila-final' : ''}`}>
                                <div className="ts-col ts-pos">
                                    <div className="pos-indicator" style={{ backgroundColor: item.posicion <= 8 ? '#f0b535' : '#e0944d' }}>
                                        {item.posicion}
                                    </div>
                                </div>
                                <div className="ts-col ts-equipo">
                                    <img src={item.equipo.url_foto} alt={item.equipo.nombre} className="tabla-logo" />
                                    <span className="d-none d-lg-inline">{item.equipo.nombre}</span>
                                    <span className="d-inline d-lg-none">{item.equipo.diminutivo}</span>
                                </div>
                                <div className="ts-col ts-num">{item.esPrimero ? '1°' : '2°'}</div>
                                <div className="ts-col ts-num">{item.puntos}</div>
                                <div className="ts-col ts-num">{item.partidosJugados}</div>
                                <div className="ts-col ts-num">{item.promedioPuntos.toFixed(3)}</div>
                                <div className="ts-col ts-num">{item.diferenciaGoles}</div>
                                <div className="ts-col ts-num">{item.promedioDG.toFixed(3)}</div>
                            </div>
                        ))}

                        <div className="tabla-leyenda">
                            <div className="leyenda-item">
                                <div className="leyenda-color" style={{ backgroundColor: '#f0b535' }}></div>
                                <span>Seed 1-8 (Local en Octavos)</span>
                            </div>
                            <div className="leyenda-item">
                                <div className="leyenda-color" style={{ backgroundColor: '#e0944d' }}></div>
                                <span>Seed 9-16 (Visita en Octavos)</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}
