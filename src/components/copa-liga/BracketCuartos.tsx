import { useState } from 'react';
import type { LlaveEliminatoria } from '../../types/copa-liga/sembrado';
import './styles.css';

interface Props {
    partidos: LlaveEliminatoria[];
    onPartidosActualizados: (partidos: LlaveEliminatoria[]) => void;
}

export default function BracketCuartos({ partidos, onPartidosActualizados }: Props) {
    const [editandoIdx, setEditandoIdx] = useState<number | null>(null);
    const [tempLocal, setTempLocal] = useState('');
    const [tempVisitante, setTempVisitante] = useState('');
    const [tempPenalesLocal, setTempPenalesLocal] = useState('');
    const [tempPenalesVisitante, setTempPenalesVisitante] = useState('');

    const iniciarEdicion = (idx: number) => {
        const p = partidos[idx];
        setEditandoIdx(idx);
        setTempLocal(p.goles_local?.toString() ?? '');
        setTempVisitante(p.goles_visitante?.toString() ?? '');
        setTempPenalesLocal(p.penales_local?.toString() ?? '');
        setTempPenalesVisitante(p.penales_visitante?.toString() ?? '');
    };

    const guardarResultado = (idx: number) => {
        const gl = tempLocal === '' ? null : parseInt(tempLocal);
        const gv = tempVisitante === '' ? null : parseInt(tempVisitante);
        if (gl === null || gv === null) { setEditandoIdx(null); return; }

        let pl: number | null = null;
        let pv: number | null = null;
        if (gl === gv) {
            pl = tempPenalesLocal === '' ? null : parseInt(tempPenalesLocal);
            pv = tempPenalesVisitante === '' ? null : parseInt(tempPenalesVisitante);
            if (pl === null || pv === null || pl === pv) {
                alert('Ingresa penales válidos (no pueden ser iguales).');
                return;
            }
        }

        const ganador = gl > gv ? partidos[idx].equipo_local : gv > gl ? partidos[idx].equipo_visitante : (pl! > pv! ? partidos[idx].equipo_local : partidos[idx].equipo_visitante);

        const nuevos = [...partidos];
        nuevos[idx] = { ...nuevos[idx], goles_local: gl, goles_visitante: gv, penales_local: pl, penales_visitante: pv, ganador, jugado: true };
        onPartidosActualizados(nuevos);
        setEditandoIdx(null);
    };

    const nombres = ['Cuarto A', 'Cuarto B', 'Cuarto C', 'Cuarto D'];

    return (
        <div className="contenedor-bracket">
            <h2 className="titulo-seccion">CUARTOS DE FINAL</h2>
            <p className="subtitulo-bracket">Partido único</p>

            <div className="container-fluid">
                <div className="row justify-content-center align-items-start">
                    {partidos.map((partido, idx) => (
                        <div key={partido.id} className="col-10 col-lg-3 llave-card">
                            <div className="llave-header">{nombres[idx]}</div>
                    
                            {editandoIdx === idx ? (
                                <div className="llave-editando">
                                    <div className="llave-equipo-row">
                                        <img src={partido.equipo_local?.url_foto} alt="" className="llave-logo" />
                                        <span className="llave-nombre">{partido.equipo_local?.nombre ?? 'Por definir'}</span>
                                        <input type="number" min={0} value={tempLocal} onChange={e => setTempLocal(e.target.value)} className="input-goles-sm" placeholder="-" />
                                    </div>
                                    <div className="llave-equipo-row">
                                        <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo" />
                                        <span className="llave-nombre">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                        <input type="number" min={0} value={tempVisitante} onChange={e => setTempVisitante(e.target.value)} className="input-goles-sm" placeholder="-" />
                                    </div>
                                    {(tempLocal === tempVisitante && tempLocal !== '') && (
                                        <div className="penales-section">
                                            <span className="penales-label">Penales:</span>
                                            <input type="number" min={0} value={tempPenalesLocal} onChange={e => setTempPenalesLocal(e.target.value)} className="input-goles-sm" placeholder="-" />
                                            <span> - </span>
                                            <input type="number" min={0} value={tempPenalesVisitante} onChange={e => setTempPenalesVisitante(e.target.value)} className="input-goles-sm" placeholder="-" />
                                        </div>
                                    )}
                                    <div className="llave-botones">
                                        <button className="btn-copa btn-guardar" onClick={() => guardarResultado(idx)}>Guardar</button>
                                        <button className="btn-copa btn-cancelar" onClick={() => setEditandoIdx(null)}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="llave-resultado" onClick={() => iniciarEdicion(idx)}>
                                    <div className={`llave-equipo-display ${partido.ganador?.id === partido.equipo_local?.id ? 'ganador' : ''}`}>
                                        <img src={partido.equipo_local?.url_foto} alt="" className="llave-logo" />
                                        <span className="llave-nombre">{partido.equipo_local?.nombre ?? 'Por definir'}</span>
                                        <span className="llave-goles">{partido.goles_local !== null ? partido.goles_local : '-'}</span>
                                        {partido.penales_local !== null && <span className="llave-penales">({partido.penales_local})</span>}
                                    </div>
                                    <div className={`llave-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? 'ganador' : ''}`}>
                                        <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo" />
                                        <span className="llave-nombre">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                        <span className="llave-goles">{partido.goles_visitante !== null ? partido.goles_visitante : '-'}</span>
                                        {partido.penales_visitante !== null && <span className="llave-penales">({partido.penales_visitante})</span>}
                                    </div>
                                    {partido.jugado && partido.ganador && (
                                        <div className="llave-ganador-badge">✓ {partido.ganador.nombre}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
