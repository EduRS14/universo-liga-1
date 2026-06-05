import { useState, useEffect } from 'react';
import type { GrupoCopa, FechaCopa, PartidoCopa } from '../../types/copa-liga/grupo';
import './styles.css';

interface Props {
    grupo: GrupoCopa;
    fechas: FechaCopa[];
    onFechasActualizadas: (fechas: FechaCopa[]) => void;
}

export default function ResultadosGrupo({ grupo, fechas, onFechasActualizadas }: Props) {
    const [fechaIdx, setFechaIdx] = useState(0);
    const [fechasLocal, setFechasLocal] = useState<FechaCopa[]>(fechas);

    useEffect(() => {
        setFechasLocal(fechas);
    }, [fechas]);

    const fechaActual = fechasLocal[fechaIdx];
    if (!fechaActual) return null;

    const equiposMap = new Map(grupo.equipos.map(e => [e.id, e]));

    const actualizarPartido = (partidoIdx: number, campo: 'goles_local' | 'goles_visitante', valor: number | null) => {
        const nuevasFechas = fechasLocal.map((f, fi) => {
            if (fi !== fechaIdx) return f;
            return {
                ...f,
                partidos: f.partidos.map((p, pi) => {
                    if (pi !== partidoIdx) return p;
                    return { ...p, [campo]: valor };
                })
            };
        });
        setFechasLocal(nuevasFechas);
    };

    const guardarResultados = () => {
        const nuevasFechas = fechasLocal.map((f, fi) => {
            if (fi !== fechaIdx) return f;
            return {
                ...f,
                partidos: f.partidos.map(p => {
                    if (p.goles_local === null || p.goles_visitante === null) return p;
                    return { ...p, jugado: true };
                })
            };
        });
        setFechasLocal(nuevasFechas);
        onFechasActualizadas(nuevasFechas);
    };

    const reiniciarFecha = () => {
        const nuevasFechas = fechasLocal.map((f, fi) => {
            if (fi !== fechaIdx) return f;
            return {
                ...f,
                partidos: f.partidos.map(p => ({ ...p, goles_local: null, goles_visitante: null, jugado: false }))
            };
        });
        setFechasLocal(nuevasFechas);
        onFechasActualizadas(nuevasFechas);
    };

    const hayCambiosSinGuardar = fechaActual.partidos.some(p =>
        (p.goles_local !== null || p.goles_visitante !== null) && !p.jugado
    );

    const hayResultados = fechaActual.partidos.some(p => p.goles_local !== null || p.goles_visitante !== null);

    return (
        <div className="contenedor-resultados-copa text-center">
            <h3 className="titulo-grupo">GRUPO {grupo.letra}</h3>

            <div className="contenedor-navegacion-fechas text-center">
                <button
                    className="btn-fecha-nav"
                    disabled={fechaIdx === 0}
                    onClick={() => setFechaIdx(fechaIdx - 1)}
                >
                    Anterior
                </button>
                <span className="titulo-fecha-copa">Fecha {fechaActual.numero}</span>
                <button
                    className="btn-fecha-nav"
                    disabled={fechaIdx >= fechasLocal.length - 1}
                    onClick={() => setFechaIdx(fechaIdx + 1)}
                >
                    Siguiente
                </button>
            </div>

            <div className="lista-partidos">
                {fechaActual.partidos.map((partido, idx) => {
                    const local = equiposMap.get(partido.equipo_local_id);
                    const visitante = equiposMap.get(partido.equipo_visitante_id);
                    return (
                        <div key={idx} className="partido-row">
                            <div className="partido-equipo">
                                <img src={local?.url_foto} alt={local?.nombre} className="partido-logo" />
                                <span className="partido-nombre d-none d-md-inline">{local?.nombre}</span>
                                <span className="partido-nombre d-inline d-md-none">{local?.diminutivo}</span>
                            </div>
                            <div className="partido-inputs">
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="-"
                                    value={partido.goles_local ?? ''}
                                    onChange={e => actualizarPartido(idx, 'goles_local', e.target.value === '' ? null : parseInt(e.target.value))}
                                    disabled={partido.jugado}
                                    className="input-goles"
                                />
                                <span className="separador-goles">-</span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="-"
                                    value={partido.goles_visitante ?? ''}
                                    onChange={e => actualizarPartido(idx, 'goles_visitante', e.target.value === '' ? null : parseInt(e.target.value))}
                                    disabled={partido.jugado}
                                    className="input-goles"
                                />
                            </div>
                            <div className="partido-equipo visitante">
                                <img src={visitante?.url_foto} alt={visitante?.nombre} className="partido-logo" />
                                <span className="partido-nombre d-none d-md-inline">{visitante?.nombre}</span>
                                <span className="partido-nombre d-inline d-md-none">{visitante?.diminutivo}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="contenedor-botones-fecha">
                <button
                    className="btn-copa btn-guardar"
                    disabled={!hayCambiosSinGuardar}
                    onClick={guardarResultados}
                >
                    Guardar
                </button>
                <button
                    className="btn-copa btn-reiniciar"
                    disabled={!hayResultados}
                    onClick={reiniciarFecha}
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
}
