import type { GrupoCopa, FechaCopa } from '../../types/copa-liga/grupo';
import './styles.css';

interface Props {
    grupos: GrupoCopa[];
    grupoSeleccionado: GrupoCopa | null;
    onSeleccionar: (grupo: GrupoCopa) => void;
    fechasPorGrupo: Record<string, FechaCopa[]>;
}

export default function GruposGrid({ grupos, grupoSeleccionado, onSeleccionar, fechasPorGrupo }: Props) {
    const getProgreso = (grupo: GrupoCopa) => {
        const fechas = fechasPorGrupo[grupo.letra];
        if (!fechas) return { jugados: 0, total: 0 };
        let total = 0;
        let jugados = 0;
        for (const fecha of fechas) {
            for (const p of fecha.partidos) {
                total++;
                if (p.jugado) jugados++;
            }
        }
        return { jugados, total };
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 text-center mb-3">
                    <h2 className="titulo-seccion">FASE DE GRUPOS</h2>
                </div>
            </div>
            <div className="row justify-content-center g-3">
                {grupos.map(grupo => {
                    const progreso = getProgreso(grupo);
                    const completo = progreso.jugados === progreso.total && progreso.total > 0;
                    const seleccionado = grupoSeleccionado?.letra === grupo.letra;
                    return (
                        <div key={grupo.letra} className="col-6 col-md-4 col-lg-3 col-xl-2">
                            <div
                                className={`card-grupo ${completo ? 'card-completo' : ''} ${seleccionado ? 'card-seleccionado' : ''}`}
                                onClick={() => onSeleccionar(grupo)}
                            >
                                <div className="d-none d-md-block">
                                    <div className="card-grupo-header">
                                        <span className="card-grupo-letra">GRUPO {grupo.letra}</span>
                                        <span className="card-grupo-tipo">{grupo.tipo === 'cuatro' ? '4 equipos' : '3 equipos'}</span>
                                    </div>
                                </div>
                                <div className="d-block d-md-none">
                                    <div className="card-grupo-header">
                                        <div className="container-fluid">
                                            <div className="row justify-content-center align-items-center">

                                                <div className="col-12 text-center">
                                                    <span className="card-grupo-letra">GRUPO {grupo.letra}</span>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <span className="card-grupo-tipo">{grupo.tipo === 'cuatro' ? '4 equipos' : '3 equipos'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-grupo-equipos">
                                    {grupo.equipos.map(eq => (
                                        <div key={eq.id} className="card-grupo-equipo">
                                            <img src={eq.url_foto} alt={eq.nombre} className="card-grupo-logo" />
                                            <span className="card-grupo-nombre">{eq.diminutivo}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="card-grupo-progreso">
                                    <div className="progreso-bar">
                                        <div
                                            className="progreso-fill"
                                            style={{ width: `${progreso.total > 0 ? (progreso.jugados / progreso.total) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="progreso-texto">{progreso.jugados}/{progreso.total}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
