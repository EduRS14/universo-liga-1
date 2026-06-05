import { useState } from 'react';
import type { LlaveEliminatoria } from '../../types/copa-liga/sembrado';
import './styles.css';

interface Props {
    partido: LlaveEliminatoria;
    onPartidoActualizado: (partido: LlaveEliminatoria) => void;
}

export default function BracketFinal({ partido, onPartidoActualizado }: Props) {
    const [editando, setEditando] = useState(false);
    const [tempLocal, setTempLocal] = useState('');
    const [tempVisitante, setTempVisitante] = useState('');
    const [tempPenalesLocal, setTempPenalesLocal] = useState('');
    const [tempPenalesVisitante, setTempPenalesVisitante] = useState('');

    const iniciarEdicion = () => {
        setEditando(true);
        setTempLocal(partido.goles_local?.toString() ?? '');
        setTempVisitante(partido.goles_visitante?.toString() ?? '');
        setTempPenalesLocal(partido.penales_local?.toString() ?? '');
        setTempPenalesVisitante(partido.penales_visitante?.toString() ?? '');
    };

    const guardarResultado = () => {
        const gl = tempLocal === '' ? null : parseInt(tempLocal);
        const gv = tempVisitante === '' ? null : parseInt(tempVisitante);
        if (gl === null || gv === null) { setEditando(false); return; }

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

        const ganador = gl > gv ? partido.equipo_local : gv > gl ? partido.equipo_visitante : (pl! > pv! ? partido.equipo_local : partido.equipo_visitante);

        onPartidoActualizado({
            ...partido,
            goles_local: gl,
            goles_visitante: gv,
            penales_local: pl,
            penales_visitante: pv,
            ganador,
            jugado: true
        });
        setEditando(false);
    };

    return (
        <div className="contenedor-final">
            <h2 className="titulo-seccion">GRAN FINAL</h2>
            <p className="subtitulo-final">15 de noviembre 2026 - Sede neutral</p>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-10 col-lg-6 final-card">
                        {editando ? (
                            <div className="llave-editando">
                                <div className="llave-equipo-row final-equipo">
                                    <img src={partido.equipo_local?.url_foto} alt="" className="llave-logo-lg" />
                                    <span className="llave-nombre-lg">{partido.equipo_local?.nombre ?? 'Por definir'}</span>
                                    <input type="number" min={0} value={tempLocal} onChange={e => setTempLocal(e.target.value)} className="input-goles-lg" placeholder="-" />
                                </div>
                                <div className="vs-text">VS</div>
                                <div className="llave-equipo-row final-equipo">
                                    <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo-lg" />
                                    <span className="llave-nombre-lg">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                    <input type="number" min={0} value={tempVisitante} onChange={e => setTempVisitante(e.target.value)} className="input-goles-lg" placeholder="-" />
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
                                    <button className="btn-copa btn-guardar" onClick={guardarResultado}>Guardar Resultado</button>
                                    <button className="btn-copa btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div className="final-display" onClick={iniciarEdicion}>
                                <div className={`final-equipo-display ${partido.ganador?.id === partido.equipo_local?.id ? 'campeon' : ''}`}>
                                    <img src={partido.equipo_local?.url_foto} alt="" className="llave-logo-lg" />
                                    <span className="llave-nombre-lg">{partido.equipo_local?.nombre ?? 'Por definir'}</span>
                                    <span className="llave-goles-lg">{partido.goles_local !== null ? partido.goles_local : '-'}</span>
                                    {partido.penales_local !== null && <span className="llave-penales">({partido.penales_local})</span>}
                                </div>
                                <div className="vs-text">VS</div>
                                <div className={`final-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? 'campeon' : ''}`}>
                                    <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo-lg" />
                                    <span className="llave-nombre-lg">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                    <span className="llave-goles-lg">{partido.goles_visitante !== null ? partido.goles_visitante : '-'}</span>
                                    {partido.penales_visitante !== null && <span className="llave-penales">({partido.penales_visitante})</span>}
                                </div>
                                {partido.jugado && partido.ganador && (
                                    <div className="final-ganador-badge">🏆 {partido.ganador.nombre}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
