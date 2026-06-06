import { useState, useEffect, useRef, useMemo } from 'react';
import type { Jugador } from '../../../types/minijuegos/jugador.interface';
import jugadoresData from '../../../data/minijuegos/jugadores_obtenidos.json';
import {
    type Categoria,
    type Eleccion,
    type Records,
    type SesionJuego,
    crearSesion,
    esCorrecto,
    esJugadorValido,
    obtenerValor,
    seleccionarParInicial,
    seleccionarSiguienteB,
    cargarRecords,
    guardarRecords,
    guardarEstadoDiario,
    cargarEstadoJuego,
    guardarEstadoJuego,
    limpiarEstadoJuego,
} from './subeybaja-logic';
import JugadorCard from './JugadorCard';
import TimerBar from './TimerBar';
import Countdown from './Countdown';
import CategoriaDisplay from './CategoriaDisplay';
import './styles.css';

type EstadoJuego = 'INTRO' | 'PLAYING' | 'REVEAL' | 'FEEDBACK' | 'GAMEOVER';

const TIEMPO_PREGUNTA = 15;
const TIEMPO_INTRO = 3;
const TIEMPO_REVEAL = 1.2;
const TIEMPO_FEEDBACK = 2.5;

interface Props {
    categoriaDelDiaHoy: Categoria;
    alTerminar: (rachaFinal: number, recordsActualizados: Records, recordRotoCategoria: boolean, recordRotoAbsoluto: boolean) => void;
}

interface GameState {
    estado: EstadoJuego;
    countdown: number;
    jugadorA: Jugador | null;
    jugadorB: Jugador | null;
    racha: number;
    tiempoRestante: number;
    feedback: 'verde' | 'rojo' | 'tiempo' | null;
    eleccion: Eleccion | null;
}

function crearEstadoNuevo(): GameState {
    return {
        estado: 'INTRO',
        countdown: TIEMPO_INTRO,
        jugadorA: null,
        jugadorB: null,
        racha: 0,
        tiempoRestante: TIEMPO_PREGUNTA,
        feedback: null,
        eleccion: null,
    };
}

function restaurarDeSesion(
    saved: ReturnType<typeof cargarEstadoJuego>,
    sesion: SesionJuego
): GameState {
    if (!saved) return crearEstadoNuevo();

    sesion.usados = new Set(saved.sesionUsados);

    const base: GameState = {
        estado: saved.estado,
        countdown: saved.countdown,
        jugadorA: saved.jugadorA,
        jugadorB: saved.jugadorB,
        racha: saved.racha,
        tiempoRestante: saved.tiempoRestante,
        feedback: saved.feedback,
        eleccion: saved.eleccion,
    };

    if (saved.estado === 'PLAYING') {
        if (base.tiempoRestante <= 0) {
            base.feedback = 'tiempo';
            base.eleccion = null;
            base.estado = 'REVEAL';
        }
    }

    return base;
}

export default function JuegoSubeBaja({ categoriaDelDiaHoy, alTerminar }: Props) {
    const sesionRef = useRef<SesionJuego | null>(null);
    const inicializadoRef = useRef(false);

    if (sesionRef.current === null) {
        const pool = (jugadoresData as Jugador[]).filter(esJugadorValido);
        sesionRef.current = crearSesion(pool);
    }

    const preguntaStartTimeRef = useRef<number>(Date.now());
    const estadoStartTimeRef = useRef<number>(Date.now());

    const [game, setGame] = useState<GameState>(() => {
        const saved = cargarEstadoJuego();
        if (saved && saved.jugadorA && saved.jugadorB) {
            return restaurarDeSesion(saved, sesionRef.current!);
        }
        const par = seleccionarParInicial(sesionRef.current!);
        return {
            ...crearEstadoNuevo(),
            jugadorA: par?.[0] ?? null,
            jugadorB: par?.[1] ?? null,
        };
    });

    const poolRef = useRef<Jugador[]>([]);
    if (poolRef.current.length === 0) {
        poolRef.current = sesionRef.current!.pool;
    }

    useEffect(() => {
        if (inicializadoRef.current) return;
        inicializadoRef.current = true;

        const saved = cargarEstadoJuego();
        if (saved) {
            estadoStartTimeRef.current = saved.estadoStartTime;
            if (saved.estado === 'PLAYING') {
                preguntaStartTimeRef.current = Date.now() - (TIEMPO_PREGUNTA - saved.tiempoRestante) * 1000;
            } else {
                preguntaStartTimeRef.current = Date.now();
            }
        } else {
            preguntaStartTimeRef.current = Date.now();
            estadoStartTimeRef.current = Date.now();
        }
    }, []);

    const valorA = useMemo(
        () => (game.jugadorA ? obtenerValor(game.jugadorA, categoriaDelDiaHoy) : 0),
        [game.jugadorA, categoriaDelDiaHoy]
    );
    const valorB = useMemo(
        () => (game.jugadorB ? obtenerValor(game.jugadorB, categoriaDelDiaHoy) : 0),
        [game.jugadorB, categoriaDelDiaHoy]
    );

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const gameRef = useRef(game);
    gameRef.current = game;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (game.estado === 'GAMEOVER') {
            limpiarEstadoJuego();
            return;
        }
        if (!game.jugadorA || !game.jugadorB) return;

        const estadoStart = (() => {
            if (game.estado === 'PLAYING') return preguntaStartTimeRef.current;
            return estadoStartTimeRef.current;
        })();

        guardarEstadoJuego({
            jugadorA: game.jugadorA,
            jugadorB: game.jugadorB,
            racha: game.racha,
            tiempoRestante: game.tiempoRestante,
            estado: game.estado,
            countdown: game.countdown,
            feedback: game.feedback,
            eleccion: game.eleccion,
            sesionUsados: Array.from(sesionRef.current!.usados),
            estadoStartTime: estadoStart,
            preguntaStartTime: preguntaStartTimeRef.current,
            categoriaDia: new Date().toDateString(),
        });
    }, [game]);

    useEffect(() => {
        if (game.estado !== 'INTRO') return;
        if (game.countdown <= 0) {
            preguntaStartTimeRef.current = Date.now();
            estadoStartTimeRef.current = Date.now();
            setGame(g => ({ ...g, estado: 'PLAYING', tiempoRestante: TIEMPO_PREGUNTA }));
            return;
        }
        timeoutRef.current = setTimeout(() => {
            setGame(g => ({ ...g, countdown: g.countdown - 1 }));
        }, 1000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [game.estado, game.countdown]);

    useEffect(() => {
        if (game.estado !== 'PLAYING') {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        const tick = () => {
            const elapsed = (Date.now() - preguntaStartTimeRef.current) / 1000;
            const remaining = Math.max(0, TIEMPO_PREGUNTA - elapsed);
            setGame(g => {
                if (g.estado !== 'PLAYING') return g;
                if (remaining <= 0) {
                    return { ...g, tiempoRestante: 0 };
                }
                if (Math.abs(g.tiempoRestante - remaining) > 0.05) {
                    return { ...g, tiempoRestante: remaining };
                }
                return g;
            });
        };

        tick();
        intervalRef.current = setInterval(tick, 100);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [game.estado]);

    useEffect(() => {
        const onVisibility = () => {
            if (document.visibilityState === 'visible') {
                const current = gameRef.current;
                if (current.estado === 'PLAYING') {
                    const elapsed = (Date.now() - preguntaStartTimeRef.current) / 1000;
                    const remaining = Math.max(0, TIEMPO_PREGUNTA - elapsed);
                    setGame(g => {
                        if (g.estado !== 'PLAYING') return g;
                        return { ...g, tiempoRestante: remaining };
                    });
                }
            }
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => document.removeEventListener('visibilitychange', onVisibility);
    }, []);

    useEffect(() => {
        const onPageHide = () => {
            const current = gameRef.current;
            if (current.estado === 'GAMEOVER' || !current.jugadorA || !current.jugadorB) return;
            guardarEstadoJuego({
                jugadorA: current.jugadorA,
                jugadorB: current.jugadorB,
                racha: current.racha,
                tiempoRestante: current.tiempoRestante,
                estado: current.estado,
                countdown: current.countdown,
                feedback: current.feedback,
                eleccion: current.eleccion,
                sesionUsados: Array.from(sesionRef.current!.usados),
                estadoStartTime: estadoStartTimeRef.current,
                preguntaStartTime: preguntaStartTimeRef.current,
                categoriaDia: new Date().toDateString(),
            });
        };
        window.addEventListener('pagehide', onPageHide);
        return () => window.removeEventListener('pagehide', onPageHide);
    }, []);

    useEffect(() => {
        if (game.estado === 'PLAYING' && game.tiempoRestante <= 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            estadoStartTimeRef.current = Date.now();
            setGame(g => ({ ...g, feedback: 'tiempo', eleccion: null, estado: 'REVEAL' }));
        }
    }, [game.estado, game.tiempoRestante]);

    useEffect(() => {
        if (game.estado !== 'REVEAL') return;

        const elapsedMs = Date.now() - estadoStartTimeRef.current;
        const restante = Math.max(0, TIEMPO_REVEAL * 1000 - elapsedMs);

        timeoutRef.current = setTimeout(() => {
            estadoStartTimeRef.current = Date.now();
            setGame(g => ({ ...g, estado: 'FEEDBACK' }));
        }, restante);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [game.estado]);

    useEffect(() => {
        if (game.estado !== 'FEEDBACK') return;

        const elapsedMs = Date.now() - estadoStartTimeRef.current;
        const restante = Math.max(0, TIEMPO_FEEDBACK * 1000 - elapsedMs);

        timeoutRef.current = setTimeout(() => {
            if (game.feedback === 'verde' && game.jugadorA && game.jugadorB) {
                const nuevoB = seleccionarSiguienteB(
                    sesionRef.current!,
                    [game.jugadorA.id, game.jugadorB.id]
                );
                if (nuevoB) {
                    preguntaStartTimeRef.current = Date.now();
                    estadoStartTimeRef.current = Date.now();
                    setGame(g => ({
                        ...g,
                        jugadorA: g.jugadorB,
                        jugadorB: nuevoB,
                        estado: 'PLAYING',
                        tiempoRestante: TIEMPO_PREGUNTA,
                        feedback: null,
                        eleccion: null,
                    }));
                    return;
                }
            }
            terminarPartidaRef.current();
        }, restante);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [game.estado, game.feedback, game.jugadorA, game.jugadorB]);

    const terminarPartida = () => {
        const records = cargarRecords();
        const cat = categoriaDelDiaHoy;
        const recordCategoriaPrevio = records.recordsPorCategoria[cat] ?? 0;
        const recordAbsolutoPrevio = records.mejorRachaAbsoluta;

        const rachaFinal = gameRef.current.racha;
        const recordRotoCategoria = rachaFinal > recordCategoriaPrevio;
        const recordRotoAbsoluto = rachaFinal > recordAbsolutoPrevio;

        const recordsActualizados: Records = {
            mejorRachaAbsoluta: recordRotoAbsoluto ? rachaFinal : recordAbsolutoPrevio,
            recordsPorCategoria: {
                ...records.recordsPorCategoria,
                [cat]: recordRotoCategoria ? rachaFinal : recordCategoriaPrevio,
            },
        };

        guardarRecords(recordsActualizados);
        guardarEstadoDiario(cat, rachaFinal);
        limpiarEstadoJuego();
        alTerminar(rachaFinal, recordsActualizados, recordRotoCategoria, recordRotoAbsoluto);
    };

    const terminarPartidaRef = useRef(terminarPartida);
    terminarPartidaRef.current = terminarPartida;

    const handleEleccion = (e: Eleccion) => {
        if (game.estado !== 'PLAYING' || !game.jugadorA || !game.jugadorB) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        const acierto = esCorrecto(valorA, valorB, e);
        estadoStartTimeRef.current = Date.now();
        setGame(g => ({
            ...g,
            eleccion: e,
            feedback: acierto ? 'verde' : 'rojo',
            racha: acierto ? g.racha + 1 : g.racha,
            estado: 'REVEAL',
        }));
    };

    if (game.estado === 'GAMEOVER') {
        return (
            <div className="subeybaja-juego-wrapper subeybaja-gameover">
                <div className="subeybaja-gameover-contenido">
                    <div className="subeybaja-gameover-icono">💀</div>
                    <h2 className="subeybaja-gameover-titulo">¡FIN DE LA RACHA!</h2>
                    <div className="subeybaja-gameover-racha">
                        <span className="subeybaja-gameover-racha-numero">{game.racha}</span>
                        <span className="subeybaja-gameover-racha-label">aciertos consecutivos</span>
                    </div>
                    <p className="subeybaja-gameover-mensaje">Vuelve mañana para una nueva oportunidad</p>
                </div>
            </div>
        );
    }

    if (game.estado === 'INTRO' && game.jugadorA && game.jugadorB) {
        return (
            <div className="subeybaja-juego-wrapper subeybaja-juego-wrapper-intro">
                <CategoriaDisplay categoria={categoriaDelDiaHoy} />
                <div className="subeybaja-intro">
                    <Countdown numero={game.countdown} />
                </div>
            </div>
        );
    }

    if (!game.jugadorA || !game.jugadorB) {
        return (
            <div className="subeybaja-juego-wrapper">
                <p className="subeybaja-cargando">Cargando jugadores...</p>
            </div>
        );
    }

    return (
        <div className="subeybaja-juego-wrapper">
            <div className="subeybaja-juego-header">
                <CategoriaDisplay categoria={categoriaDelDiaHoy} />
                <div className="subeybaja-racha-display">
                    <span className="subeybaja-racha-label">RACHA</span>
                    <span className="subeybaja-racha-numero">{game.racha}</span>
                </div>
            </div>

            <TimerBar segundos={game.tiempoRestante} total={TIEMPO_PREGUNTA} />

            <div className="subeybaja-cards-container">
                <JugadorCard
                    jugador={game.jugadorA}
                    categoria={categoriaDelDiaHoy}
                    valor={valorA}
                    esOculto={false}
                    lado="A"
                />
                <div className="subeybaja-vs">VS</div>
                <JugadorCard
                    jugador={game.jugadorB}
                    categoria={categoriaDelDiaHoy}
                    valor={valorB}
                    esOculto={game.estado === 'PLAYING'}
                    lado="B"
                    feedbackColor={game.feedback}
                    eleccionUsuario={game.eleccion}
                />
            </div>

            {game.estado === 'PLAYING' && (
                <div className="subeybaja-botones-eleccion">
                    <button
                        className="subeybaja-btn-eleccion subeybaja-btn-mayor"
                        onClick={() => handleEleccion('mayor')}
                        type="button"
                    >
                        <span className="subeybaja-btn-icono">▲</span>
                        <span>Mayor</span>
                    </button>
                    <button
                        className="subeybaja-btn-eleccion subeybaja-btn-empate"
                        onClick={() => handleEleccion('empate')}
                        type="button"
                    >
                        <span className="subeybaja-btn-icono">=</span>
                        <span>Empate</span>
                    </button>
                    <button
                        className="subeybaja-btn-eleccion subeybaja-btn-menor"
                        onClick={() => handleEleccion('menor')}
                        type="button"
                    >
                        <span className="subeybaja-btn-icono">▼</span>
                        <span>Menor</span>
                    </button>
                </div>
            )}

            {(game.estado === 'REVEAL' || game.estado === 'FEEDBACK') && (
                <div className="subeybaja-botones-eleccion subeybaja-botones-deshabilitados">
                    <button
                        className="subeybaja-btn-eleccion subeybaja-btn-mayor"
                        type="button"
                        disabled
                    >
                        <span className="subeybaja-btn-icono">▲</span>
                        <span>Mayor</span>
                    </button>
                    <button
                        className="subeybaja-btn-eleccion subeybaja-btn-empate"
                        type="button"
                        disabled
                    >
                        <span className="subeybaja-btn-icono">=</span>
                        <span>Empate</span>
                    </button>
                    <button
                        className="subeybaja-btn-eleccion subeybaja-btn-menor"
                        type="button"
                        disabled
                    >
                        <span className="subeybaja-btn-icono">▼</span>
                        <span>Menor</span>
                    </button>
                </div>
            )}

            {game.estado === 'FEEDBACK' && (
                <div className={`subeybaja-feedback-overlay subeybaja-feedback-${game.feedback}`}>
                    <div className="subeybaja-feedback-contenido">
                        <div className="subeybaja-feedback-icono">
                            {game.feedback === 'verde' ? '✓' : game.feedback === 'tiempo' ? '⏰' : '✗'}
                        </div>
                        <div className="subeybaja-feedback-mensaje">
                            {game.feedback === 'verde' ? '¡CORRECTO!' : game.feedback === 'tiempo' ? '¡TIEMPO!' : 'INCORRECTO'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
