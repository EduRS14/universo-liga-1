import { useState, useEffect, useMemo } from 'react';
import type { Jugador, JugadorRuta, EntradaPoolRuta, ResultadoDiarioRuta } from './types';
import {
    cargarEstadoDiario,
    guardarEstadoDiario,
    obtenerPoolRuta,
    obtenerTodosLosJugadores,
    jugadorDelDia,
    hayPartidaEnCurso,
} from './la-ruta-logic';
import JuegoLaRuta from './Juego-LaRuta';
import './styles.css';
import JugadoresData from '../../../data/minijuegos/jugadores_obtenidos.json';
import PoolRutaData from '../../../data/minijuegos/la-ruta-pool.json';

const jugadores: Jugador[] = JugadoresData as Jugador[];
const entradasPool: EntradaPoolRuta[] = PoolRutaData as EntradaPoolRuta[];

export default function MenuLaRuta() {
    const [estadoDiario, setEstadoDiario] = useState<ResultadoDiarioRuta | null>(null);
    const [jugando, setJugando] = useState(false);
    const [verResultado, setVerResultado] = useState(false);

    const pool: JugadorRuta[] = useMemo(
        () => obtenerPoolRuta(jugadores, entradasPool),
        [jugadores]
    );

    const todosLosJugadores = useMemo(
        () => obtenerTodosLosJugadores(jugadores),
        [jugadores]
    );

    const jugador: JugadorRuta | null = useMemo(
        () => (pool.length > 0 ? jugadorDelDia(pool) : null),
        [pool]
    );

    useEffect(() => {
        const estado = cargarEstadoDiario();
        setEstadoDiario(estado);

        if (!estado && hayPartidaEnCurso()) {
            setJugando(true);
        }
    }, []);

    const handleFinalizar = (resultado: 'WIN' | 'GAMEOVER', score: number, equiposRevelados: number, fallos: number) => {
        guardarEstadoDiario(resultado, score, equiposRevelados, fallos);
        setEstadoDiario({
            dia: new Date().toDateString(),
            resultado,
            score,
            equiposRevelados,
            fallos,
        });
        setVerResultado(true);
    };

    const handleVolverAlMenu = () => {
        setVerResultado(false);
    };

    const handleVerResultado = () => {
        setVerResultado(true);
    };

    if (verResultado && estadoDiario && jugador) {
        const esPerfecta = estadoDiario.resultado === 'WIN' && estadoDiario.equiposRevelados === 1 && estadoDiario.fallos === 0;
        return (
            <div className="contenedor-configuracion">
                <div className="menu-ruta-resultado fade-in">
                    <div className="ruta-resultado-contenido">
                        <div className={`ruta-badge-resultado ${estadoDiario.resultado === 'WIN' ? 'ganaste' : 'perdiste'}`}>
                            {estadoDiario.resultado === 'WIN' ? '¡RUTA COMPLETADA!' : '¡PERDISTE!'}
                        </div>
                        <div className="ruta-resultado-jugador">
                            <img src={jugador.url_foto} alt={jugador.nombre} className="ruta-resultado-foto" />
                            <h2 className="ruta-resultado-nombre">{jugador.nombre}</h2>
                        </div>
                        <div className="ruta-resultado-stats">
                            <span className="ruta-resultado-label">Score</span>
                            <span className="ruta-resultado-valor">{estadoDiario.score} pts</span>
                        </div>
                        <div className="ruta-resultado-stats">
                            <span className="ruta-resultado-label">Equipos revelados</span>
                            <span className="ruta-resultado-valor">{estadoDiario.equiposRevelados}/{jugador.ruta.length}</span>
                        </div>
                        {esPerfecta && (
                            <div className="ruta-badge-perfecta">Puntuación Perfecta</div>
                        )}
                        <p className="ruta-resultado-texto">
                            {estadoDiario.resultado === 'WIN'
                                ? '¡Ruta Completada! Vuelve mañana para un nuevo reto.'
                                : 'Fin del juego. ¡Inténtalo mañana!'}
                        </p>
                        <button
                            type="button"
                            className="ruta-btn-volver"
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
            <JuegoLaRuta
                jugador={jugador}
                todosLosJugadores={todosLosJugadores}
                onFinalizar={handleFinalizar}
            />
        );
    }

    if (pool.length === 0) {
        return (
            <div className="contenedor-configuracion">
                <div className="menu-ruta-full-bg fade-in">
                    <div className="ruta-overlay-fondo" />
                    <div className="ruta-contenido-contenedor">
                        <div className="ruta-cabecera text-center">
                            <span className="badge-ruta">RETO DIARIO</span>
                            <h1 className="ruta-titulo">LA RUTA</h1>
                            <p className="ruta-subtitulo">Sigue el rastro del futbolista</p>
                        </div>
                        <p className="ruta-descripcion">
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
        <div className="contenedor-configuracion ruta-menu-wrapper">
            <div className="menu-ruta-full-bg fade-in">

                <div className="ruta-overlay-fondo" />

                <div className="ruta-contenido-contenedor">

                    <div className="ruta-cabecera text-center">
                        <span className="badge-ruta">RETO DIARIO</span>
                        <h1 className="ruta-titulo">LA RUTA</h1>
                        <p className="ruta-subtitulo">Sigue el rastro del futbolista</p>
                    </div>

                    <div className="ruta-cuerpo-accion text-center">
                        <p className="ruta-descripcion">
                            <strong>¿Podrás descubrir quién es el jugador misterioso?</strong>
                            {" "}Se te mostrará inicialmente un club de su carrera. Arriesga un nombre,
                            revela más equipos como pista o ríndete.
                        </p>

                        {/* SLIDER DE INSTRUCCIONES VISUALES */}
                        <div id="sliderRuta" className="carousel slide ruta-slider" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#sliderRuta" data-bs-slide-to="0" className="active" aria-label="Slide 1" />
                                <button type="button" data-bs-target="#sliderRuta" data-bs-slide-to="1" aria-label="Slide 2" />
                                <button type="button" data-bs-target="#sliderRuta" data-bs-slide-to="2" aria-label="Slide 3" />
                                <button type="button" data-bs-target="#sliderRuta" data-bs-slide-to="3" aria-label="Slide 4" />
                            </div>
                            <div className="carousel-inner">
                                {[
                                    { emoji: '', title: 'Árbol de Carrera', text: 'Verás un diagrama con los clubes por los que pasó el jugador (no necesariamente todos y en ese orden). El primero siempre está revelado.', img: 'slide-1.webp' },
                                    { emoji: '', title: 'Arriesga un Nombre', text: 'Escribe el nombre del futbolista. Si aciertas, ganas. Si fallas, pierdes puntos y una vida.', img: 'slide-2.webp' },
                                    { emoji: '💡', title: 'Revela Equipos', text: '¿No estás seguro? Revela el siguiente club como pista. Cada revelación cuesta 100 puntos.', img: 'slide-3.webp' },
                                    { emoji: '🏆', title: 'Completa la Ruta', text: 'Identifica al jugador con la menor cantidad de pistas posibles para máxima puntuación.', img: 'slide-4.webp' },
                                ].map((slide, i) => (
                                    <div key={slide.title} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                                        <div className="ruta-slide-inner">
                                            <div className="ruta-slide-placeholder">
                                                <span className="ruta-slide-emoji">{slide.emoji}</span>
                                            </div>
                                            <img
                                                src={`/img/minijuegos/tutoriales/la-ruta/${slide.img}`}
                                                alt={slide.title}
                                                className="ruta-slide-img"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                            />
                                        </div>
                                        <div className="ruta-slide-caption">
                                            <h5>{slide.title}</h5>
                                            <p>{slide.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#sliderRuta" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#sliderRuta" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Siguiente</span>
                            </button>
                        </div>

                        {yaJugoHoy ? (
                            <div className="ruta-ya-jugado fade-in">
                                <span className="ruta-ya-jugado-icono">📋</span>
                                <p>Ya jugaste hoy<br /><strong>Vuelve mañana para un nuevo reto</strong></p>
                                <button
                                    type="button"
                                    className="ruta-btn-ver-resultado"
                                    onClick={handleVerResultado}
                                >
                                    VER RESULTADO
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="ruta-btn-jugar"
                                onClick={() => setJugando(true)}
                            >
                                JUGAR AHORA
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
