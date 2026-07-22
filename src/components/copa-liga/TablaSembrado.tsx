import type { SembradoEquipo } from '../../types/copa-liga/sembrado';
import './styles.css';

interface Props {
    sembrado: SembradoEquipo[];
}

export default function TablaSembrado({ sembrado }: Props) {
    return (
        <div className="contenedor-clasificados">
            <h2 className="titulo-seccion">CLASIFICADOS</h2>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="row row-cols-2 row-cols-md-4 g-3">
                            {sembrado.map((item) => (
                                <div key={`${item.equipo.id}-${item.posicion}`} className="col">
                                    <div className="card-clasificado">
                                        <div className="card-clasificado-pos">{item.posicion}</div>
                                        <img
                                            src={item.equipo.url_foto}
                                            alt={item.equipo.nombre}
                                            className="card-clasificado-logo"
                                        />
                                        <div className="card-clasificado-nombre">{item.equipo.nombre}</div>
                                        <div className="card-clasificado-grupo">
                                            Grupo {item.grupoLetra} — {item.esPrimero ? '1°' : '2°'}
                                        </div>
                                        <div className="card-clasificado-stats">
                                            <span className="stat"><strong>PTS</strong> {item.puntos}</span>
                                            <span className="stat"><strong>DG</strong> <span className={item.diferenciaGoles > 0 ? 'text-positive' : ''}>{item.diferenciaGoles > 0 ? `+${item.diferenciaGoles}` : item.diferenciaGoles}</span></span>
                                            <span className="stat"><strong>GF</strong> {item.golesFavor}</span>
                                            <span className="stat"><strong>GC</strong> {item.golesContra}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
