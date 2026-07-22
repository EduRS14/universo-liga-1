import { useState, useEffect } from 'react';
import type { Equipo } from "../../types/equipo";
import type { Partido } from "../../types/partido";
import "./styles.css";

interface Props {
    equipos: Equipo[];
    fechaActual: number;
    onCambiarFecha: (nuevaFecha: number) => void;
    listaAuxiliar: { [key: string]: Partido[] };
    onCambiarListaAuxiliar: (
        nuevaLista: { [key: string]: Partido[] } | ((prev: { [key: string]: Partido[] }) => { [key: string]: Partido[] })
    ) => void;
    torneo: string;
}

const TOTAL_FECHAS = 17;
const LS_KEY = (torneo: string) => `datos_${torneo}`;

export default function Resultados( { equipos, fechaActual, onCambiarFecha,
    listaAuxiliar, onCambiarListaAuxiliar, torneo
 }: Props ) {

    const guardarResultados = () => {

        const listaFecha = listaAuxiliar[`fecha${fechaActual}`] || [];

        const listaActualizada = listaFecha.map(p => {

            const partido = { ...p };

            const golesLocal = partido.goles_local;
            const golesVisitante = partido.goles_visitante;

            if (golesLocal !== null && golesVisitante !== null) {

                if (golesLocal > golesVisitante) {
                    partido.ganador = partido.equipo_local;
                } else if (golesLocal < golesVisitante) {
                    partido.ganador = partido.equipo_visitante;
                } else {
                    partido.ganador = 0;
                }

                partido.jugado = true;
            }

            return partido;
        });

        onCambiarListaAuxiliar(prev => ({
            ...prev,
            [`fecha${fechaActual}`]: listaActualizada
        }));

        const guardado = localStorage.getItem(LS_KEY(torneo));
        const datos = guardado ? JSON.parse(guardado) : {};
        datos[`fecha${fechaActual}`] = listaActualizada;
        localStorage.setItem(LS_KEY(torneo), JSON.stringify(datos));

        setEstadoCambio(false);
    };

    const reiniciarFecha = async () => {
      try {

        const response = await fetch(`/data/fechas/${torneo}/fecha${fechaActual}.json`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos originales de los partidos');
        }

        const nuevaListaFecha: Partido[] = await response.json();

        onCambiarListaAuxiliar(prev => ({
          ...prev,
          [`fecha${fechaActual}`]: nuevaListaFecha
        }));

        const guardado = localStorage.getItem(LS_KEY(torneo));
        const datos = guardado ? JSON.parse(guardado) : {};
        datos[`fecha${fechaActual}`] = nuevaListaFecha;
        localStorage.setItem(LS_KEY(torneo), JSON.stringify(datos));

        setEstadoReset(false);
        setEstadoCambio(false);

      } catch (error) {
        console.error(error);
      }
    };

    const [estadoCambio, setEstadoCambio] = useState(false);
    const [estadoReset, setEstadoReset] = useState(false);

    useEffect(() => {

        const listaFecha = listaAuxiliar[`fecha${fechaActual}`] || [];

        for (let partido of listaFecha) {
            const local = partido.goles_local;
            const visita = partido.goles_visitante;

            const esInvalido =
                (local === null && visita !== null) ||
                (local !== null && visita === null);

            if (esInvalido) {
                setEstadoCambio(false);
                return;
            }
        }

        const guardado = localStorage.getItem(LS_KEY(torneo));
        const datos = guardado ? JSON.parse(guardado) : {};
        const listaGuardada = datos[`fecha${fechaActual}`] || [];

        const hayCambios =
            JSON.stringify(listaFecha) !== JSON.stringify(listaGuardada);

        setEstadoCambio(hayCambios);

    }, [listaAuxiliar, fechaActual, torneo]);

    useEffect(() => {
        setEstadoCambio(false);
    }, [fechaActual]);

    useEffect(() => {

        const listaFecha = listaAuxiliar[`fecha${fechaActual}`] || [];
        let estado = false;
        for (let i = 0; i < listaFecha.length; i++) {
            const partido = listaFecha[i];
            if (partido.goles_local !== null || partido.goles_visitante !== null) {
                estado = true;
                break;
            }
        }
        setEstadoReset(estado);
    }, [listaAuxiliar, fechaActual]);
        
    return (
        <div>

            <div className="container-fluid contenedor-resultados">
                <div className="row justify-content-center align-items-center">

                    <div className="col-11">

                        <div className="container-fluid contenedor-opciones">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-3 texto text-center">
                                    <button
                                        className="btn btn-primary btn-opciones"
                                        onClick={() => { if (fechaActual > 1) onCambiarFecha(fechaActual - 1); }}
                                        disabled={fechaActual <= 1}
                                    >
                                        Anterior
                                    </button>
                                </div>

                                <div className="col-3 texto text-center">
                                    <h2 className='titulo-fecha'>Fecha {fechaActual}</h2>
                                </div>

                                <div className="col-3 texto text-center">
                                    <button
                                        className="btn btn-primary btn-opciones"
                                        onClick={() => { if (fechaActual < TOTAL_FECHAS) onCambiarFecha(fechaActual + 1); }}
                                        disabled={fechaActual >= TOTAL_FECHAS}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-11">

                        <div className="container-fluid contenedor-calculadora">
                            <div className="row justify-content-center align-items-center">

                                { listaAuxiliar[`fecha${fechaActual}`]?.map( ( partido, index ) => {
                                    const equipoLocal = equipos.find( equipo => equipo.id === partido.equipo_local );
                                    const equipoVisitante = equipos.find( equipo => equipo.id === partido.equipo_visitante );
                                    let golesLocal = partido.goles_local ?? '';
                                    let golesVisitante = partido.goles_visitante ?? '';
                                    let ganador = partido.ganador ?? null;
                                    let jugado = partido.jugado ?? false;
                                    return (
                                        <div key={index} className="col-10 contenedor-partido">

                                            <div className="container-fluid">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-3 col-md-4 p-0">
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center align-items-center">

                                                                <div className="col-5 col-lg-8 m-0 p-0 text-center">
                                                                    <span className="texto-equipos d-none d-lg-block">{equipoLocal?.nombre}</span>
                                                                    <span className="texto-equipos d-block d-lg-none">{equipoLocal?.diminutivo}</span>
                                                                </div>

                                                                <div className="col-6 col-lg-4 m-0 text-center contenedor-escudo-2">
                                                                    <img src={equipoLocal?.url_foto} alt="escudo_local" 
                                                                    className='img-fluid img-escudo'/>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-md-4 contenedor-inputs-resultado">
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center align-items-center">

                                                                <div className="col-5 px-0 text-center">
                                                                    <input
                                                                        className="input-resultado"
                                                                        type="number"
                                                                        placeholder="-"
                                                                        min={0}
                                                                        value={golesLocal}
                                                                        onChange={(e) => {
                                                                          const valor = e.target.value === "" ? null : parseInt(e.target.value);
                                                                        
                                                                          onCambiarListaAuxiliar(prev => {
                                                                              const listaFecha = prev[`fecha${fechaActual}`] || [];
                                                                        
                                                                              const nuevaLista = listaFecha.map((p, i) =>
                                                                                i === index ? { ...p, goles_local: valor } : p
                                                                              );
                                                                          
                                                                              return {
                                                                                ...prev,
                                                                                [`fecha${fechaActual}`]: nuevaLista
                                                                              };
                                                                          });
                                                                        }}
                                                                        disabled={jugado}
                                                                    />
                                                                </div>
                                                                <div className="col-2 text-center p-0">
                                                                    <span className="texto-separador"> - </span>
                                                                </div>
                                                                <div className="col-5 px-0 text-center">
                                                                    <input
                                                                        className="input-resultado"
                                                                        type="number"
                                                                        placeholder="-"
                                                                        min={0}
                                                                        value={golesVisitante}
                                                                        onChange={(e) => {
                                                                            const valor = e.target.value === "" ? null : parseInt(e.target.value);
                                                                            onCambiarListaAuxiliar(prev => {
                                                                                const listaFecha = prev[`fecha${fechaActual}`] || [];
                                                                            
                                                                                const nuevaLista = listaFecha.map((p, i) =>
                                                                                    i === index ? { ...p, goles_visitante: valor } : p
                                                                                );
                                                                                return {
                                                                                    ...prev,
                                                                                    [`fecha${fechaActual}`]: nuevaLista
                                                                                };
                                                                            
                                                                            });
                                                                        }}
                                                                        disabled={jugado}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 col-md-4 p-0">
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center align-items-center">

                                                                <div className="col-6 col-lg-4 m-0 text-center contenedor-escudo">
                                                                    <img src={equipoVisitante?.url_foto} alt="escudo_visitante" 
                                                                    className='img-fluid img-escudo'/>
                                                                </div>
                                                                <div className="col-5 col-lg-8 m-0 p-0 text-center">
                                                                    <span className="texto-equipos d-none d-lg-block">{equipoVisitante?.nombre}</span>
                                                                    <span className="texto-equipos d-block d-lg-none">{equipoVisitante?.diminutivo}</span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    );
                                }
                                )}

                            </div>
                        </div>

                    </div>
                    
                    <div className="col-11">

                        <div className="container-fluid contenedor-opciones">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-5 col-lg-4 text-center">
                                    <button className="btn btn-success btn-opciones" disabled={!estadoCambio} 
                                    onClick={guardarResultados}>Guardar Resultados</button>
                                </div>

                                <div className="col-5 col-lg-4 text-center">
                                    <button className="btn btn-success btn-opciones" disabled={!estadoReset} 
                                    onClick={reiniciarFecha}>Reiniciar Fecha</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
