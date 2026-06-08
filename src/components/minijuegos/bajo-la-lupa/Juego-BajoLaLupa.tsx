import { useState, useEffect, useRef } from 'react';
import type {
    JugadorOculto,
    CategoriaFiltro,
    OpcionAutocompletado,
    EstadoJuegoCompleto,
    EntradaHistorial,
    Equipo,
} from './types';
import {
    cargarEstadoJuego,
    guardarEstadoJuego,
    limpiarEstadoJuego,
    validarPregunta,
    formatearPregunta,
    crearEstadoInicial,
    obtenerOpcionesClub,
    obtenerOpcionesPosicion,
    obtenerOpcionesNacionalidad,
    obtenerOpcionesEdad,
    obtenerOpcionesAltura,
    obtenerOpcionesValor,
    coincideNombre,
    obtenerNombrePais,
    MAX_INTENTOS_NOMBRE,
} from './bajo-la-lupa-logic';
import LupaFiltros from './LupaFiltros';
import LupaBadgeIntentos from './LupaBadgeIntentos';
import LupaHistorial from './LupaHistorial';
import LupaArriesgar from './LupaArriesgar';
import LupaJugadorRevelado from './LupaJugadorRevelado';

type FaseJuego = 'JUGANDO' | 'REVELANDO';

interface Props {
    jugador: JugadorOculto;
    pool: JugadorOculto[];
    jugadoresTodos: JugadorOculto[];
    equipos: Equipo[];
    paises: { id: number; nombre: string }[];
    onFinalizar: (resultado: 'WIN' | 'GAMEOVER', historial: EntradaHistorial[]) => void;
}

const DURACION_FADE_OUT = 300;
const DURACION_FADE_IN_FOTO = 400;
const ESPERA_ENTRE_FADES = 200;
const PAUSA_VISUAL_FOTO = 900;
const DURACION_TOTAL_REVELACION = DURACION_FADE_OUT + ESPERA_ENTRE_FADES + DURACION_FADE_IN_FOTO + PAUSA_VISUAL_FOTO;

export default function JuegoBajoLaLupa({ jugador, pool, jugadoresTodos, equipos, paises, onFinalizar }: Props) {
    const inicial = useRef<EstadoJuegoCompleto | null>(null);
    if (!inicial.current) {
        const saved = cargarEstadoJuego();
        inicial.current = saved ?? crearEstadoInicial(jugador);
    }

    const [estado, setEstado] = useState<EstadoJuegoCompleto>(inicial.current);
    const [fase, setFase] = useState<FaseJuego>('JUGANDO');
    const [mostrarFoto, setMostrarFoto] = useState(false);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<{
        tipo: CategoriaFiltro;
        opcion: OpcionAutocompletado;
    } | null>(null);
    const finalReportedRef = useRef(false);
    const onFinalizarRef = useRef(onFinalizar);
    const timersRef = useRef<number[]>([]);

    useEffect(() => {
        onFinalizarRef.current = onFinalizar;
    }, [onFinalizar]);

    useEffect(() => {
        if (estado.estado === 'JUGANDO') {
            guardarEstadoJuego(estado);
        }
    }, [estado]);

    useEffect(() => {
        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
        };
    }, []);

    const opcionesClub = obtenerOpcionesClub(equipos);
    const opcionesPosicion = obtenerOpcionesPosicion();
    const opcionesNacionalidad = obtenerOpcionesNacionalidad(paises);
    const opcionesEdad = obtenerOpcionesEdad();
    const opcionesAltura = obtenerOpcionesAltura();
    const opcionesValor = obtenerOpcionesValor();

    const sinPreguntas = estado.intentosRestantes <= 0;
    const juegoTerminado = estado.estado !== 'JUGANDO';

    const iniciarRevelacion = (resultado: 'WIN' | 'GAMEOVER', historialFinal: EntradaHistorial[]) => {
        setFase('REVELANDO');

        const tFoto = window.setTimeout(() => {
            setMostrarFoto(true);
        }, DURACION_FADE_OUT + ESPERA_ENTRE_FADES);

        const tFinalizar = window.setTimeout(() => {
            if (!finalReportedRef.current) {
                finalReportedRef.current = true;
                limpiarEstadoJuego();
                onFinalizarRef.current(resultado, historialFinal);
            }
        }, DURACION_TOTAL_REVELACION);

        timersRef.current.push(tFoto, tFinalizar);
    };

    const handleSeleccionar = (tipo: CategoriaFiltro, opcion: OpcionAutocompletado) => {
        if (juegoTerminado) return;
        setPreguntaSeleccionada({ tipo, opcion });
    };

    const handlePreguntar = () => {
        if (!preguntaSeleccionada || juegoTerminado) return;
        const { tipo, opcion } = preguntaSeleccionada;
        const coincide = validarPregunta(estado.jugadorOculto, tipo, opcion.value);
        const nuevaEntrada = {
            pregunta: formatearPregunta({ tipo, valor: opcion.value, etiqueta: opcion.label }),
            respuesta: coincide ? ('SI' as const) : ('NO' as const),
        };

        const intentos = estado.intentosRestantes - 1;
        const nuevoEstado: EstadoJuegoCompleto = {
            ...estado,
            intentosRestantes: intentos,
            preguntaActiva: { tipo, valor: opcion.value, etiqueta: opcion.label },
            historial: [...estado.historial, nuevaEntrada],
        };

        if (intentos <= 0 && nuevoEstado.intentosNombreRestantes <= 0) {
            nuevoEstado.estado = 'GAMEOVER';
            nuevoEstado.nombreUsado = true;
            setEstado(nuevoEstado);
            setPreguntaSeleccionada(null);
            iniciarRevelacion('GAMEOVER', nuevoEstado.historial);
            return;
        }

        setEstado(nuevoEstado);
        setPreguntaSeleccionada(null);
    };

    const handleArriesgar = (nombre: string) => {
        if (juegoTerminado || estado.intentosNombreRestantes <= 0) return;
        const esCorrecto = coincideNombre(nombre, estado.jugadorOculto.nombre);
        const nuevaEntrada = {
            pregunta: `Arriesgo de nombre: "${nombre}"`,
            respuesta: esCorrecto ? ('SI' as const) : ('NO' as const),
        };
        const intentosNombreNuevo = estado.intentosNombreRestantes - 1;
        const sinIntentosNombre = intentosNombreNuevo <= 0;
        const nuevoEstado: EstadoJuegoCompleto = {
            ...estado,
            estado: esCorrecto ? 'WIN' : (sinIntentosNombre ? 'GAMEOVER' : 'JUGANDO'),
            intentosNombreRestantes: intentosNombreNuevo,
            nombreUsado: sinIntentosNombre,
            historial: [...estado.historial, nuevaEntrada],
        };
        setEstado(nuevoEstado);

        if (nuevoEstado.estado !== 'JUGANDO') {
            iniciarRevelacion(nuevoEstado.estado, nuevoEstado.historial);
        }
    };

    const deshabilitado = fase === 'REVELANDO';

    return (
        <div className="lupa-juego">
            <div className="lupa-juego-header">
                <div className="lupa-silueta">
                    {fase === 'JUGANDO' ? (
                        <span className="lupa-silueta-texto">?</span>
                    ) : !mostrarFoto ? (
                        <span className="lupa-silueta-texto lupa-silueta-fade-out">?</span>
                    ) : (
                        <img
                            src={estado.jugadorOculto.url_foto}
                            alt={estado.jugadorOculto.nombre}
                            className="lupa-silueta-foto lupa-silueta-fade-in"
                        />
                    )}
                </div>
                <LupaBadgeIntentos
                    intentosRestantes={estado.intentosRestantes}
                    nombreUsado={estado.nombreUsado}
                />
            </div>

            {!sinPreguntas && (
                <div className={`lupa-filtros-box ${deshabilitado ? 'lupa-bloqueado' : ''}`}>
                    <div className="lupa-filtros-label">
                        Haz preguntas haciendo click abajo:
                    </div>
                    <LupaFiltros
                        opcionesClub={opcionesClub}
                        opcionesPosicion={opcionesPosicion}
                        opcionesNacionalidad={opcionesNacionalidad}
                        opcionesEdad={opcionesEdad}
                        opcionesAltura={opcionesAltura}
                        opcionesValor={opcionesValor}
                        onSeleccionar={handleSeleccionar}
                        onPreguntar={handlePreguntar}
                        preguntaValida={preguntaSeleccionada !== null}
                        disabled={deshabilitado}
                    />
                </div>
            )}

            {sinPreguntas && (
                <div className="lupa-sin-preguntas">
                    Agotaste tus 10 preguntas. Ahora solo puedes arriesgar un nombre.
                </div>
            )}

            <div className="lupa-preguntas-restantes">
                {sinPreguntas
                    ? 'Sin preguntas disponibles'
                    : `Te quedan ${estado.intentosRestantes} de 10 preguntas`}
            </div>

            <div className="lupa-historial-box">
                <LupaHistorial historial={estado.historial} />
            </div>

            <LupaArriesgar
                jugadores={jugadoresTodos}
                onArriesgar={handleArriesgar}
                disabled={deshabilitado}
                usado={estado.intentosNombreRestantes <= 0}
                intentosRestantes={estado.intentosNombreRestantes}
                maxIntentos={MAX_INTENTOS_NOMBRE}
            />
        </div>
    );
}
