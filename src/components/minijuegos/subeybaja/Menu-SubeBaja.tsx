import { useState, useEffect, useMemo } from 'react';
import {
    type Categoria,
    type Records,
    categoriaDelDia,
    cargarRecords,
    cargarEstadoDiario,
    cargarEstadoJuego,
    esJugadorValido,
    NOMBRES_CATEGORIA,
    ICONOS_CATEGORIA,
} from './subeybaja-logic';
import type { Jugador } from '../../../types/minijuegos/jugador.interface';
import jugadoresData from '../../../data/minijuegos/jugadores_obtenidos.json';
import JuegoSubeBaja from './Juego-SubeBaja';
import './styles.css';

export default function MenuSubeBaja() {
    const [loading, setLoading] = useState(true);
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [estadoDiario, setEstadoDiario] = useState<ReturnType<typeof cargarEstadoDiario>>(null);
    const [records, setRecords] = useState<Records>({ mejorRachaAbsoluta: 0, recordsPorCategoria: {} });
    const [resultadoPartida, setResultadoPartida] = useState<{
        racha: number;
        recordRotoCategoria: boolean;
        recordRotoAbsoluto: boolean;
    } | null>(null);

    const categoriaHoy: Categoria = useMemo(() => categoriaDelDia(), []);

    const poolSize = useMemo(() => {
        return (jugadoresData as Jugador[]).filter(esJugadorValido).length;
    }, []);

    useEffect(() => {
        setLoading(true);
        setEstadoDiario(cargarEstadoDiario());
        setRecords(cargarRecords());

        const saved = cargarEstadoJuego();
        if (saved) {
            setJuegoIniciado(true);
        }

        setLoading(false);
    }, []);

    const handleIniciar = () => {
        if (estadoDiario) {
            const saved = cargarEstadoJuego();
            if (saved) {
                setJuegoIniciado(true);
            }
            return;
        }
        setJuegoIniciado(true);
    };

    const handleTerminar = (
        racha: number,
        recordsActualizados: Records,
        recordRotoCategoria: boolean,
        recordRotoAbsoluto: boolean
    ) => {
        setRecords(recordsActualizados);
        setEstadoDiario(cargarEstadoDiario());
        setResultadoPartida({ racha, recordRotoCategoria, recordRotoAbsoluto });
    };

    const handleVolverAlMenu = () => {
        setJuegoIniciado(false);
        setResultadoPartida(null);
        setEstadoDiario(cargarEstadoDiario());
    };

    if (loading) {
        return (
            <div className="contenedor-configuracion">
                <p className="texto-cargando">Cargando...</p>
            </div>
        );
    }

    if (juegoIniciado && !resultadoPartida) {
        return (
            <div className="fade-in">
                <JuegoSubeBaja
                    categoriaDelDiaHoy={categoriaHoy}
                    alTerminar={handleTerminar}
                />
            </div>
        );
    }

    if (resultadoPartida) {
        return (
            <div className="contenedor-configuracion">
                <div className="menu-subeybaja-full-bg fade-in">
                    <div className="subeybaja-overlay-fondo"></div>
                    <div className="subeybaja-contenido-contenedor">
                        <div className="subeybaja-resultado-cabecera text-center">
                            <div className="subeybaja-resultado-icono">
                                {resultadoPartida.recordRotoCategoria || resultadoPartida.recordRotoAbsoluto ? '🏆' : '💀'}
                            </div>
                            <h1 className="subeybaja-resultado-titulo">
                                {resultadoPartida.recordRotoCategoria || resultadoPartida.recordRotoAbsoluto
                                    ? '¡NUEVO RÉCORD!'
                                    : 'PARTIDA TERMINADA'}
                            </h1>
                        </div>
                        <div className="subeybaja-resultado-cuerpo text-center">
                            <div className="subeybaja-resultado-racha-box">
                                <div className="subeybaja-resultado-racha-numero">{resultadoPartida.racha}</div>
                                <div className="subeybaja-resultado-racha-label">aciertos seguidos</div>
                            </div>
                            <div className="subeybaja-resultado-categoria">
                                {ICONOS_CATEGORIA[categoriaHoy]} {NOMBRES_CATEGORIA[categoriaHoy]}
                            </div>
                            {resultadoPartida.recordRotoCategoria && (
                                <div className="subeybaja-record-badge">
                                    🏆 ¡Nuevo récord en {NOMBRES_CATEGORIA[categoriaHoy]}!
                                </div>
                            )}
                            {resultadoPartida.recordRotoAbsoluto && !resultadoPartida.recordRotoCategoria && (
                                <div className="subeybaja-record-badge">
                                    🌟 ¡Nuevo récord absoluto!
                                </div>
                            )}
                            {!resultadoPartida.recordRotoCategoria && !resultadoPartida.recordRotoAbsoluto && (
                                <p className="subeybaja-resultado-record-info">
                                    Récord actual: <strong>{records.recordsPorCategoria[categoriaHoy] ?? 0}</strong>
                                </p>
                            )}
                        </div>
                        <div className="subeybaja-resultado-acciones">
                            <button
                                className="subeybaja-btn-volver-menu"
                                onClick={handleVolverAlMenu}
                                type="button"
                            >
                                VOLVER AL MENÚ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const recordCategoria = records.recordsPorCategoria[categoriaHoy] ?? 0;

    return (
        <div className="contenedor-configuracion">
            <div className="menu-subeybaja-full-bg fade-in">
                <div className="subeybaja-overlay-fondo"></div>
                <div className="subeybaja-contenido-contenedor">
                    <div className="subeybaja-cabecera text-center">
                        <span className="badge-categoria-subeybaja">RETO DIARIO</span>
                        <h1 className="titulo-hero-subeybaja">SUBE Y BAJA</h1>
                        <h2 className="subtitulo-hero-subeybaja">¿Mayor o Menor?</h2>
                    </div>

                    <div className="subeybaja-cuerpo-accion text-center">
                        <p className="descripcion-juego-subeybaja text-justify">
                            Compara dos jugadores que hayan jugado en la Primera División de Perú (2010-2026) y decide si el siguiente tiene un valor{' '}<strong>mayor</strong>, <strong>menor</strong> o <strong>igual</strong> en la categoría
                            del día. Cada acierto suma puntos a tu racha. Tienes <strong>15 segundos</strong> por pregunta.{' '}
                            <strong>¿Hasta dónde puedes llegar? Reto Diario</strong>
                        </p>

                        <div className="subeybaja-categoria-box">
                            <div className="subeybaja-categoria-box-label">CATEGORÍA DE HOY</div>
                            <div className="subeybaja-categoria-box-valor">
                                <span className="subeybaja-categoria-box-icono">
                                    {ICONOS_CATEGORIA[categoriaHoy]}
                                </span>
                                {NOMBRES_CATEGORIA[categoriaHoy]}
                            </div>
                        </div>

                        <div className="subeybaja-record-box">
                            <div className="subeybaja-record-box-item">
                                <div className="subeybaja-record-box-label">RÉCORD HOY</div>
                                <div className="subeybaja-record-box-valor">{recordCategoria}</div>
                            </div>
                            <div className="subeybaja-record-box-item">
                                <div className="subeybaja-record-box-label">MEJOR RACHA</div>
                                <div className="subeybaja-record-box-valor">{records.mejorRachaAbsoluta}</div>
                            </div>
                        </div>

                        {estadoDiario ? (
                            <div className="alerta-jugado-subeybaja fade-in">
                                <span className="alerta-icono-subeybaja">⏳</span>
                                <p>
                                    Ya jugaste hoy<br />
                                    <strong>Tu racha: {estadoDiario.rachaFinal} aciertos</strong>
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleIniciar();
                                }}
                                className="seccion-accion-subeybaja"
                            >
                                <button
                                    id="btn-continuar"
                                    type="submit"
                                    className="btn-iniciar-reto-subeybaja"
                                >
                                    JUGAR AHORA
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
