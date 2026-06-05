import { useState, useEffect, useMemo, useRef } from 'react';
import NexosMenu from './NexosMenu';
import NexosChain from './NexosChain';
import NexosBuscador from './NexosBuscador';
import NexosModal from './NexosModal';
import { validarCadena, calcularEstrellas } from './nexo-logic';
import datosRetos from '../../../data/minijuegos/nexos-retos.json';
import datosJugadores from '../../../data/minijuegos/jugadores_obtenidos.json';
import './styles.css';

interface NexoJugador {
    id: number;
    nombre: string;
    url_foto?: string;
    equiposJugados: {
        id_equipo: number;
        periodos: number[][];
    }[];
}

interface RetoJson {
    origen: number;
    destino: number;
}

type TipoResultado = 'victoria' | 'derrota' | 'rendicion';

interface Resultado {
    tipo: TipoResultado;
    estrellas: number;
    label: string;
}

export default function NexosJuego() {
    const [juegoActivo, setJuegoActivo] = useState(false);
    const [cadena, setCadena] = useState<NexoJugador[]>([]);
    const [hoyJugado, setHoyJugado] = useState(false);
    const [errorCadena, setErrorCadena] = useState('');
    const [resultado, setResultado] = useState<Resultado | null>(null);
    const [nexoFallido, setNexoFallido] = useState<number | null>(null);
    const [procesando, setProcesando] = useState(false);
    const [verificadoValido, setVerificadoValido] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const jugadoresMap = useMemo(() => {
        const map = new Map<number, NexoJugador>();
        (datosJugadores as any[]).forEach((j: any) => {
            map.set(j.id, {
                id: j.id,
                nombre: j.nombre,
                url_foto: j.url_foto,
                equiposJugados: j.equiposJugados
            });
        });
        return map;
    }, []);

    const retoActual = useMemo(() => {
        const epoch = new Date('2026-01-01').getTime();
        const dias = Math.floor((Date.now() - epoch) / (1000 * 60 * 60 * 24));
        return datosRetos[dias % datosRetos.length] as RetoJson;
    }, []);

    const jugadorOrigen = jugadoresMap.get(retoActual.origen);
    const jugadorDestino = jugadoresMap.get(retoActual.destino);

    useEffect(() => {
        const guardado = localStorage.getItem('nexos-hoy');
        if (guardado) {
            const { dia } = JSON.parse(guardado);
            if (dia === new Date().toDateString()) {
                setHoyJugado(true);
            }
        }

        const progresoGuardado = localStorage.getItem('nexos-progreso');
        if (progresoGuardado) {
            const { activo, cadenaGuardada, dia } = JSON.parse(progresoGuardado);
            if (activo && dia === new Date().toDateString()) {
                setJuegoActivo(true);
                if (cadenaGuardada && cadenaGuardada.length > 0) {
                    setCadena(cadenaGuardada);
                } else if (jugadorOrigen) {
                    setCadena([jugadorOrigen]);
                }
            } else if (jugadorOrigen) {
                setCadena([jugadorOrigen]);
            }
        } else if (jugadorOrigen) {
            setCadena([jugadorOrigen]);
        }
    }, [jugadorOrigen]);

    useEffect(() => {
        if (juegoActivo && !resultado && !hoyJugado) {
            localStorage.setItem('nexos-progreso', JSON.stringify({
                activo: true,
                cadenaGuardada: cadena,
                dia: new Date().toDateString()
            }));
        }
    }, [juegoActivo, cadena, resultado, hoyJugado]);

    useEffect(() => {
        if (hoyJugado) {
            localStorage.removeItem('nexos-progreso');
        }
    }, [hoyJugado]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const finalizarJuego = (tipo: TipoResultado, estrellas = 0, label = '') => {
        setResultado({ tipo, estrellas, label });
        setHoyJugado(true);
        setErrorCadena('');
        setNexoFallido(null);
        setProcesando(true);
        setVerificadoValido(false);
        localStorage.setItem('nexos-hoy', JSON.stringify({ dia: new Date().toDateString() }));
        localStorage.removeItem('nexos-progreso');
    };

    const agregarIntermedio = (jugador: NexoJugador) => {
        setCadena(prev => [...prev, jugador]);
        setErrorCadena('');
        setNexoFallido(null);
    };

    const quitarUltimo = () => {
        if (cadena.length <= 1) return;
        setCadena(prev => prev.slice(0, -1));
        setErrorCadena('');
        setNexoFallido(null);
    };

    const verificarNexos = () => {
        if (procesando) return;
        if (cadena.length < 2) {
            setErrorCadena('Agrega al menos un jugador intermedio');
            return;
        }
        setProcesando(true);
        const res = validarCadena(cadena, jugadorDestino);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (res.valido) {
            const result = calcularEstrellas(cadena.length - 2);
            setErrorCadena('');
            setNexoFallido(null);
            setVerificadoValido(true);
            timeoutRef.current = setTimeout(() => {
                finalizarJuego('victoria', result.estrellas, result.label);
            }, 1200);
        } else {
            setNexoFallido(res.nexoFallido ?? null);
            setErrorCadena(res.mensaje ?? 'Nexo inválido');
            timeoutRef.current = setTimeout(() => {
                finalizarJuego('derrota');
            }, 1800);
        }
    };

    const rendirse = () => {
        if (procesando) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setProcesando(true);
        finalizarJuego('rendicion');
    };

    if (!juegoActivo || (hoyJugado && !resultado)) {
        return <NexosMenu onJugar={() => setJuegoActivo(true)} deshabilitado={hoyJugado} />;
    }

    return (
        <div className="nexos-container">
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-6 text-center d-flex flex-column justify-content-center align-items-center contenedor-juego">
                        <div className="nexos-header">
                            <h2 className="nexos-titulo">NEXOS</h2>
                            <p className="nexos-subtitulo">Encuentra la cadena de nexos</p>
                        </div>

                        <NexosChain
                            cadena={cadena}
                            destino={jugadorDestino ?? null}
                            nexoFallido={nexoFallido}
                            valido={verificadoValido}
                        />

                        <NexosBuscador
                            jugadores={Array.from(jugadoresMap.values())}
                            onAgregar={agregarIntermedio}
                        />

                        <div className="nexos-acciones">
                            <button
                                className="nexos-btn-quitar"
                                onClick={quitarUltimo}
                                disabled={cadena.length <= 1 || procesando}
                            >
                                Quitar último
                            </button>
                            <button
                                className="nexos-btn-verificar"
                                onClick={verificarNexos}
                                disabled={procesando}
                            >
                                Verificar Nexos
                            </button>
                        </div>

                        {errorCadena && (
                            <div className="nexos-error">
                                <span className="nexos-error-icono">⚠️</span>
                                <span>{errorCadena}</span>
                            </div>
                        )}

                        <button
                            className="nexos-btn-rendirse"
                            onClick={rendirse}
                            disabled={procesando}
                            type="button"
                        >
                            🏳️ Rendirse
                        </button>
                    
                        {resultado && (
                            <NexosModal
                                tipo={resultado.tipo}
                                estrellas={resultado.estrellas}
                                label={resultado.label}
                                onVolver={() => { setResultado(null); setJuegoActivo(false); }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
