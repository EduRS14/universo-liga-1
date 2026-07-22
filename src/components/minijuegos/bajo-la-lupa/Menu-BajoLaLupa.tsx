import { useState, useEffect, useMemo } from 'react';
import type { Jugador, JugadorOculto, EstadoDiario, EntradaHistorial, Equipo } from './types';
import {
    cargarEstadoDiario,
    guardarEstadoDiario,
    obtenerPoolCurado,
    obtenerTodosLosJugadores,
    jugadorDelDia,
    hayPartidaEnCurso,
} from './bajo-la-lupa-logic';
import JuegoBajoLaLupa from './Juego-BajoLaLupa';
import LupaJugadorRevelado from './LupaJugadorRevelado';
import Spinner from '../Spinner';
import './styles.css';
import JugadoresData from '../../../data/minijuegos/jugadores_obtenidos.json';
import EquiposData from '../../../data/minijuegos/equipos.json';
import PaisesData from '../../../data/minijuegos/paises.json';
import PoolCuradoData from '../../../data/minijuegos/bajo-la-lupa-pool.json';

const jugadores: Jugador[] = JugadoresData as Jugador[];
const equipos: Equipo[] = EquiposData as Equipo[];
const paises: { id: number; nombre: string }[] = PaisesData as { id: number; nombre: string }[];
const idsPoolCurado: number[] = PoolCuradoData as number[];

export default function MenuBajoLaLupa() {
    const [loading, setLoading] = useState(true);
    const [estadoDiario, setEstadoDiario] = useState<EstadoDiario | null>(null);
    const [jugando, setJugando] = useState(false);
    const [verResultado, setVerResultado] = useState(false);

    const pool: JugadorOculto[] = useMemo(
        () => obtenerPoolCurado(jugadores, equipos, idsPoolCurado),
        [jugadores, equipos]
    );

    const todosLosJugadores: JugadorOculto[] = useMemo(
        () => obtenerTodosLosJugadores(jugadores),
        [jugadores]
    );

    const jugador: JugadorOculto | null = useMemo(
        () => (pool.length > 0 ? jugadorDelDia(pool) : null),
        [pool]
    );

    useEffect(() => {
        const estado = cargarEstadoDiario();
        setEstadoDiario(estado);

        if (!estado && hayPartidaEnCurso()) {
            setJugando(true);
        }
        setTimeout(() => setLoading(false), 50);
    }, []);

    const handleFinalizar = (resultado: 'WIN' | 'GAMEOVER', historial: EntradaHistorial[]) => {
        guardarEstadoDiario(resultado, historial);
        setEstadoDiario({
            dia: new Date().toDateString(),
            resultado,
            historial,
        });
        setVerResultado(true);
    };

    const handleVolverAlMenu = () => {
        setVerResultado(false);
    };

    const handleVerResultado = () => {
        setVerResultado(true);
    };

    if (loading) {
        return <Spinner size="lg" mensaje="Preparando la lupa..." />;
    }

    if (verResultado && estadoDiario && jugador) {
        return (
            <div className="contenedor-configuracion">
                <div className="menu-lupa-resultado fade-in">
                    <div className="lupa-contenido-contenedor">
                        <LupaJugadorRevelado
                            jugador={jugador}
                            resultado={estadoDiario.resultado}
                            historial={estadoDiario.historial}
                            nombrePais={(id) => {
                                const p = paises.find(x => x.id === id);
                                return p?.nombre ?? `País #${id}`;
                            }}
                        />
                        <p className="lupa-resultado-texto">
                            {estadoDiario.resultado === 'WIN'
                                ? '¡Ganaste, vuelve mañana para un nuevo reto!'
                                : '¡Perdiste, mejor suerte mañana!'}
                        </p>
                        <button
                            type="button"
                            className="lupa-btn-volver"
                            onClick={handleVolverAlMenu}
                        >
                            VOLVER AL MENÚ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (jugando && !estadoDiario && jugador) {
        return (
            <JuegoBajoLaLupa
                jugador={jugador}
                pool={pool}
                jugadoresTodos={todosLosJugadores}
                equipos={equipos}
                paises={paises}
                onFinalizar={handleFinalizar}
            />
        );
    }

    if (pool.length === 0) {
        return (
            <div className="contenedor-configuracion">
                <div className="menu-lupa-full-bg fade-in">
                        <div className="lupa-contenido-contenedor">
                        <div className="lupa-cabecera text-center">
                            <span className="badge-lupa">RETO DIARIO</span>
                            <h1 className="lupa-titulo">BAJO LA LUPA</h1>
                            <p className="lupa-subtitulo">Descubre al jugador oculto</p>
                        </div>
                        <p className="lupa-descripcion">
                            Aún no hay jugadores disponibles. El administrador está preparando
                            el pool de jugadores para esta temporada.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const yaJugoHoy = estadoDiario !== null;

    return (
        <div className="contenedor-configuracion">
            <div className="menu-lupa-full-bg fade-in">

                <div className="lupa-contenido-contenedor">

                    <div className="lupa-cabecera text-center">
                        <span className="badge-lupa">RETO DIARIO</span>
                        <h1 className="lupa-titulo">BAJO LA LUPA</h1>
                        <p className="lupa-subtitulo">Descubre al jugador oculto</p>
                    </div>

                    <div className="lupa-cuerpo-accion">
                        <p className="lupa-descripcion">
                            <strong>¿Podrás descubrir quién es el jugador oculto de la Liga 1 2026?</strong>
                            {" "}En este juego tendrás que hacer las preguntas correctas
                            para identificar al <strong>futbolista misterioso del día</strong>. Usa los filtros de club, posición,
                            nacionalidad, edad, altura y valor de mercado para obtener pistas.
                        </p>

                        <ul className="lupa-reglas">
                            <li>Las preguntas solo te sirven de <strong>guía</strong>. Responde Sí o No para obtener pistas.</li>
                            <li>Tienes <strong>máximo 10 preguntas</strong>. Luego se bloquean.</li>
                            <li>En cualquier momento puedes <strong>arriesgar un nombre (tienes 3 intentos).</strong></li>
                            <li>Si aciertas el nombre, <strong>ganas</strong>. Si fallas, el juego termina.</li>
                            <li><strong>Reto diario</strong></li>
                        </ul>

                        {yaJugoHoy && (
                            <div className="lupa-ya-jugado">
                                <span className="lupa-ya-jugado-icono">⏳</span>
                                <span>Ya jugaste hoy. Vuelve mañana.</span>
                            </div>
                        )}

                        {yaJugoHoy ? (
                            <button
                                type="button"
                                className="lupa-btn-ver-resultado"
                                onClick={handleVerResultado}
                            >
                                VER RESULTADO
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="lupa-btn-jugar"
                                onClick={() => setJugando(true)}
                            >
                                JUGAR
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
