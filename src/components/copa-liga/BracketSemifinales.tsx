import { useState } from 'react';
import type { LlaveEliminatoria } from '../../types/copa-liga/sembrado';
import './styles.css';

interface Props {
    partidos: LlaveEliminatoria[];
    onPartidosActualizados: (partidos: LlaveEliminatoria[]) => void;
}

export default function BracketSemifinales({ partidos, onPartidosActualizados }: Props) {
    const [editandoIdx, setEditandoIdx] = useState<number | null>(null);
    const [tempIdaLocal, setTempIdaLocal] = useState('');
    const [tempIdaVisitante, setTempIdaVisitante] = useState('');
    const [tempVueltaLocal, setTempVueltaLocal] = useState('');
    const [tempVueltaVisitante, setTempVueltaVisitante] = useState('');
    const [tempPenalesLocal, setTempPenalesLocal] = useState('');
    const [tempPenalesVisitante, setTempPenalesVisitante] = useState('');

    const iniciarEdicion = (idx: number) => {
        const p = partidos[idx];
        setEditandoIdx(idx);
        setTempIdaLocal(p.goles_local?.toString() ?? '');
        setTempIdaVisitante(p.goles_visitante?.toString() ?? '');
        setTempVueltaLocal((p as any).goles_local_vuelta?.toString() ?? '');
        setTempVueltaVisitante((p as any).goles_visitante_vuelta?.toString() ?? '');
        setTempPenalesLocal(p.penales_local?.toString() ?? '');
        setTempPenalesVisitante(p.penales_visitante?.toString() ?? '');
    };

    const guardarResultado = (idx: number) => {
        const il = tempIdaLocal === '' ? null : parseInt(tempIdaLocal);
        const iv = tempIdaVisitante === '' ? null : parseInt(tempIdaVisitante);
        const vl = tempVueltaLocal === '' ? null : parseInt(tempVueltaLocal);
        const vv = tempVueltaVisitante === '' ? null : parseInt(tempVueltaVisitante);

        if (il === null || iv === null || vl === null || vv === null) {
            setEditandoIdx(null);
            return;
        }

        const globalLocal = il + vl;
        const globalVisitante = iv + vv;

        let pl: number | null = null;
        let pv: number | null = null;

        if (globalLocal === globalVisitante) {
            pl = tempPenalesLocal === '' ? null : parseInt(tempPenalesLocal);
            pv = tempPenalesVisitante === '' ? null : parseInt(tempPenalesVisitante);
            if (pl === null || pv === null || pl === pv) {
                alert('En caso de empate en el global, ingresa penales válidos.');
                return;
            }
        }

        const ganador = globalLocal > globalVisitante
            ? partidos[idx].equipo_local
            : globalVisitante > globalLocal
                ? partidos[idx].equipo_visitante
                : (pl! > pv! ? partidos[idx].equipo_local : partidos[idx].equipo_visitante);

        const nuevos = [...partidos];
        nuevos[idx] = {
            ...nuevos[idx],
            goles_local: il,
            goles_visitante: iv,
            penales_local: pl,
            penales_visitante: pv,
            ganador,
            jugado: true
        };

        (nuevos[idx] as any).goles_local_vuelta = vl;
        (nuevos[idx] as any).goles_visitante_vuelta = vv;

        onPartidosActualizados(nuevos);
        setEditandoIdx(null);
    };

    return (
        <div className="contenedor-bracket">
            <h2 className="titulo-seccion">SEMIFINALES</h2>
            <p className="subtitulo-bracket">Ida y vuelta - Ganador por marcador global</p>

            <div className="container-fluid">
                <div className="row justify-content-center align-items-start">
                    {partidos.map((partido, idx) => {
                        const vl = (partido as any).goles_local_vuelta;
                        const vv = (partido as any).goles_visitante_vuelta;
                        const gl = partido.goles_local !== null && vl !== undefined ? partido.goles_local + vl : null;
                        const gv = partido.goles_visitante !== null && vv !== undefined ? partido.goles_visitante + vv : null;

                        return (
                            <div key={partido.id} className="col-10 col-lg-5 llave-card">
                                <div className="llave-header">Semifinal {idx + 1}</div>
                        
                                {editandoIdx === idx ? (
                                    <div className="llave-editando">
                                        <div className="partido-label">Ida:</div>
                                        <div className="llave-equipo-row">
                                            <img src={partido.equipo_local?.url_foto} alt="" className="llave-logo" />
                                            <span className="llave-nombre">{partido.equipo_local?.nombre ?? 'Por definir'}</span>
                                            <input type="number" min={0} value={tempIdaLocal} onChange={e => setTempIdaLocal(e.target.value)} className="input-goles-sm" placeholder="-" />
                                        </div>
                                        <div className="llave-equipo-row">
                                            <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo" />
                                            <span className="llave-nombre">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                            <input type="number" min={0} value={tempIdaVisitante} onChange={e => setTempIdaVisitante(e.target.value)} className="input-goles-sm" placeholder="-" />
                                        </div>
                                        <div className="partido-label mt-2">Vuelta:</div>
                                        <div className="llave-equipo-row">
                                            <img src={partido.equipo_local?.url_foto} alt="" className="llave-logo" />
                                            <span className="llave-nombre">{partido.equipo_local?.nombre ?? 'Por definir'}</span>
                                            <input type="number" min={0} value={tempVueltaLocal} onChange={e => setTempVueltaLocal(e.target.value)} className="input-goles-sm" placeholder="-" />
                                        </div>
                                        <div className="llave-equipo-row">
                                            <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo" />
                                            <span className="llave-nombre">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                            <input type="number" min={0} value={tempVueltaVisitante} onChange={e => setTempVueltaVisitante(e.target.value)} className="input-goles-sm" placeholder="-" />
                                        </div>
                                        {tempIdaLocal !== '' && tempVueltaLocal !== '' && tempIdaVisitante !== '' && tempVueltaVisitante !== '' &&
                                            parseInt(tempIdaLocal) + parseInt(tempVueltaLocal) === parseInt(tempIdaVisitante) + parseInt(tempVueltaVisitante) && (
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
                                            <span className="llave-goles">IDA: {partido.goles_local !== null ? partido.goles_local : '-'}</span>
                                            <span className="llave-goles">VUELTA: {vl !== undefined ? vl : '-'}</span>
                                            <span className="llave-goles global">GLOBAL: {gl !== null ? gl : '-'}</span>
                                            {partido.penales_local !== null && <span className="llave-penales">({partido.penales_local})</span>}
                                        </div>
                                        <div className={`llave-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? 'ganador' : ''}`}>
                                            <img src={partido.equipo_visitante?.url_foto} alt="" className="llave-logo" />
                                            <span className="llave-nombre">{partido.equipo_visitante?.nombre ?? 'Por definir'}</span>
                                            <span className="llave-goles">IDA: {partido.goles_visitante !== null ? partido.goles_visitante : '-'}</span>
                                            <span className="llave-goles">VUELTA: {vv !== undefined ? vv : '-'}</span>
                                            <span className="llave-goles global">GLOBAL: {gv !== null ? gv : '-'}</span>
                                            {partido.penales_visitante !== null && <span className="llave-penales">({partido.penales_visitante})</span>}
                                        </div>
                                        {partido.jugado && partido.ganador && (
                                            <div className="llave-ganador-badge">✓ {partido.ganador.nombre}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
