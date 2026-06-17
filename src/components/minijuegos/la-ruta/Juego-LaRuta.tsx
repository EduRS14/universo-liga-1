import { useState, useMemo, useRef, useEffect } from 'react';
import type { JugadorRuta, EstadoRuta } from './types';
import {
    crearEstadoInicial,
    guardarEstadoJuego,
    cargarEstadoJuego,
    limpiarEstadoJuego,
    coincideNombre,
    calcularScore,
    PENALTY_NOMBRE,
    PENALTY_REVELAR,
    INITIAL_SCORE,
    VIDAS_INICIAL,
} from './la-ruta-logic';
import './styles.css';

interface JuegoLaRutaProps {
    jugador: JugadorRuta;
    todosLosJugadores: { nombre: string; id: number }[];
    onFinalizar: (resultado: 'WIN' | 'GAMEOVER', score: number, equiposRevelados: number, fallos: number) => void;
}

export default function JuegoLaRuta({ jugador, todosLosJugadores, onFinalizar }: JuegoLaRutaProps) {
    const estadoInicial = useMemo(() => crearEstadoInicial(jugador), [jugador]);

    const [estado, setEstado] = useState<EstadoRuta>(() => {
        const guardado = cargarEstadoJuego();
        if (guardado && guardado.jugador.id === jugador.id) return guardado;
        return estadoInicial;
    });

    const [nombreInput, setNombreInput] = useState('');
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const onFinalizarRef = useRef(onFinalizar);
    onFinalizarRef.current = onFinalizar;

    useEffect(() => {
        if (estado.estado === 'JUGANDO') {
            guardarEstadoJuego(estado);
        }
    }, [estado]);

    const sugerencias = useMemo(() => {
        if (!nombreInput.trim()) return [];
        const normalizado = nombreInput.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return todosLosJugadores
            .filter(j => j.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizado))
            .slice(0, 8);
    }, [nombreInput, todosLosJugadores]);

    const totalEquipos = estado.ruta.length;

    const handleArriesgar = () => {
        if (!nombreInput.trim() || estado.estado !== 'JUGANDO') return;

        if (coincideNombre(nombreInput, estado.jugador.nombre)) {
            const scoreFinal = calcularScore(estado.fallos, estado.equiposRevelados, totalEquipos);
            const nuevoEstado = { ...estado, estado: 'WIN' as const, score: scoreFinal };
            setEstado(nuevoEstado);
            limpiarEstadoJuego();
            setTimeout(() => onFinalizarRef.current('WIN', scoreFinal, estado.equiposRevelados, estado.fallos), 1500);
            return;
        }

        const nuevosFallos = estado.fallos + 1;
        const nuevasVidas = estado.vidas - 1;
        const nuevoScore = Math.max(0, INITIAL_SCORE - nuevosFallos * PENALTY_NOMBRE - (estado.equiposRevelados - 1) * PENALTY_REVELAR);

        if (nuevasVidas <= 0) {
            const nuevoEstado = { ...estado, estado: 'GAMEOVER' as const, vidas: 0, fallos: nuevosFallos, score: nuevoScore };
            setEstado(nuevoEstado);
            limpiarEstadoJuego();
            setTimeout(() => onFinalizarRef.current('GAMEOVER', nuevoScore, estado.equiposRevelados, nuevosFallos), 1500);
            return;
        }

        setEstado({ ...estado, vidas: nuevasVidas, fallos: nuevosFallos, score: nuevoScore });
        setMensajeError(`Incorrecto. -${PENALTY_NOMBRE} pts, -1 vida`);
        setNombreInput('');
        setTimeout(() => setMensajeError(''), 2000);
    };

    const handleRevelar = () => {
        if (estado.equiposRevelados >= totalEquipos || estado.estado !== 'JUGANDO') return;

        const nuevosRevelados = estado.equiposRevelados + 1;
        const nuevoScore = Math.max(0, INITIAL_SCORE - estado.fallos * PENALTY_NOMBRE - (nuevosRevelados - 1) * PENALTY_REVELAR);

        setEstado({ ...estado, equiposRevelados: nuevosRevelados, score: nuevoScore });
    };

    const handleRendirse = () => {
        if (estado.estado !== 'JUGANDO') return;
        const scoreFinal = 0;
        const nuevoEstado = { ...estado, estado: 'GAMEOVER' as const, score: scoreFinal };
        setEstado(nuevoEstado);
        limpiarEstadoJuego();
        setTimeout(() => onFinalizarRef.current('GAMEOVER', scoreFinal, estado.equiposRevelados, estado.fallos), 1500);
    };

    const handleSeleccionarSugerencia = (nombre: string) => {
        setNombreInput(nombre);
        setMostrarSugerencias(false);
        inputRef.current?.focus();
    };

    const renderConectores = () => {
        const numCajas = totalEquipos;
        const svgWidth = 100;
        const svgHeight = 35;
        const topY = 0;
        const midY = 15;
        const bottomY = 35;

        const boxPositions = Array.from({ length: numCajas }, (_, i) => {
            const spacing = svgWidth / (numCajas + 1);
            return spacing * (i + 1);
        });

        const centerX = svgWidth / 2;

        return (
            <svg
                className="ruta-conectores-svg"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <line x1={centerX} y1={topY} x2={centerX} y2={midY} stroke="#06b6d4" strokeWidth="0.5" />
                <line x1={boxPositions[0]} y1={midY} x2={boxPositions[numCajas - 1]} y2={midY} stroke="#06b6d4" strokeWidth="0.5" />
                {boxPositions.map((x, i) => (
                    <line key={i} x1={x} y1={midY} x2={x} y2={bottomY} stroke="#06b6d4" strokeWidth="0.5" />
                ))}
            </svg>
        );
    };

    const esJuegoTerminado = estado.estado !== 'JUGANDO';

    return (
        <div className="contenedor-configuracion">
            <div className="juego-ruta-container fade-in">

                <div className="ruta-panel-estado">
                    <div className="ruta-stat">
                        <span className="ruta-stat-label">Score</span>
                        <span className="ruta-stat-valor">{estado.score}</span>
                    </div>
                    <div className="ruta-stat">
                        <span className="ruta-stat-label">Vidas</span>
                        <span className="ruta-vidas">
                            {Array.from({ length: VIDAS_INICIAL }, (_, i) => (
                                <span key={i} className={`ruta-vida-icono ${i < estado.vidas ? 'activa' : 'inactiva'}`}>
                                    ⚽
                                </span>
                            ))}
                        </span>
                    </div>
                    <div className="ruta-stat">
                        <span className="ruta-stat-label">Pistas</span>
                        <span className="ruta-stat-valor">{estado.equiposRevelados}/{totalEquipos}</span>
                    </div>
                </div>

                <div className="ruta-arbol">
                    <div className={`ruta-silueta ${esJuegoTerminado ? 'ruta-silueta-revelada' : ''}`}>
                        {esJuegoTerminado ? (
                            <img src={estado.jugador.url_foto} alt={estado.jugador.nombre} className="ruta-silueta-foto" />
                        ) : (
                            <span className="ruta-silueta-interrogante">?</span>
                        )}
                    </div>

                    {renderConectores()}

                    <div className="ruta-equipos-fila d-flex justify-content-center gap-2 mb-3">
                        {estado.ruta.map((equipo, i) => {
                            const revelado = i < estado.equiposRevelados;
                            return (
                                <div key={i} className={`ruta-caja-equipo ${revelado ? 'revelada' : 'bloqueada'}`}>
                                    {revelado ? (
                                        <>
                                            <img src={equipo.url_foto} alt={equipo.nombre} className="ruta-equipo-logo" />
                                            <span className="ruta-equipo-nombre">{equipo.nombre}</span>
                                        </>
                                    ) : (
                                        <span className="ruta-caja-numero">{i + 1}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {mensajeError && <div className="ruta-mensaje error fade-in">{mensajeError}</div>}
                {mensajeExito && <div className="ruta-mensaje exito fade-in">{mensajeExito}</div>}

                {esJuegoTerminado ? (
                    <div className="ruta-controles-bloqueados">
                        <p className="ruta-fin-texto">
                            {estado.estado === 'WIN'
                                ? '¡Ruta Completada!'
                                : 'Fin del juego. ¡Inténtalo mañana!'}
                        </p>
                    </div>
                ) : (
                    <div className="ruta-controles">
                        <div className="ruta-input-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                className="ruta-input-nombre form-control"
                                placeholder="Escribe el nombre del futbolista..."
                                value={nombreInput}
                                onChange={(e) => {
                                    setNombreInput(e.target.value);
                                    setMostrarSugerencias(true);
                                }}
                                onFocus={() => setMostrarSugerencias(true)}
                                onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleArriesgar();
                                }}
                                disabled={esJuegoTerminado}
                            />
                            {mostrarSugerencias && sugerencias.length > 0 && (
                                <ul className="ruta-sugerencias-lista">
                                    {sugerencias.map((j) => (
                                        <li
                                            key={j.id}
                                            onMouseDown={() => handleSeleccionarSugerencia(j.nombre)}
                                        >
                                            {j.nombre}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="ruta-botones-accion d-flex gap-2 mt-2 flex-wrap justify-content-center">
                            <button
                                type="button"
                                className="btn btn-warning text-dark ruta-btn-arriesgar"
                                onClick={handleArriesgar}
                                disabled={!nombreInput.trim()}
                            >
                                Arriesgar
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-info ruta-btn-revelar"
                                onClick={handleRevelar}
                                disabled={estado.equiposRevelados >= totalEquipos}
                            >
                                Revelar siguiente
                            </button>
                        </div>
                        <button
                            type="button"
                            className="ruta-btn-rendirse mt-2"
                            onClick={handleRendirse}
                        >
                            🏳️ Rendirse
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
