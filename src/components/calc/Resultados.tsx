import { useState, useEffect, use } from 'react';
import type { Equipo } from "../../types/equipo";
import type { Partido } from "../../types/partido";
import "./styles.css";
import { set } from 'astro:schema';

interface Props {
    equipos: Equipo[];
    partidos: Partido[];
    onCambiarPartidos: (nuevosPartidos: Partido[]) => void;
    fechaActual: number;
    onCambiarFecha: (nuevaFecha: number) => void;
    listaAuxiliar: { [key: string]: Partido[] };
    onCambiarListaAuxiliar: (
        nuevaLista: { [key: string]: Partido[] } | ((prev: { [key: string]: Partido[] }) => { [key: string]: Partido[] })
    ) => void;
}

export default function Resultados( { equipos, partidos, onCambiarPartidos, fechaActual, onCambiarFecha,
    listaAuxiliar, onCambiarListaAuxiliar
 }: Props ) {

    // Funcion para guardar los resultados ingresados
    const guardarResultados = () => {

        if (estadoCambio) {
            // 1. Obtenemos la lista actual
            const listaOriginal = listaAuxiliar[`fecha${fechaActual}`] || [];

            // 2. Creamos una NUEVA lista usando map (Inmutabilidad)
            // Esto asegura que React detecte el cambio de referencia
            const listaActualizada = listaOriginal.map(p => {
                // Creamos una copia del partido para no mutar el original todavía
                const partido = { ...p };
                
                const golesLocal = partido.goles_local;
                const golesVisitante = partido.goles_visitante;

                // Aplicamos la lógica de ganadores
                if (golesLocal !== null && golesVisitante !== null) {
                    if (golesLocal > golesVisitante) {
                        partido.ganador = partido.equipo_local;
                    } else if (golesLocal < golesVisitante) {
                        partido.ganador = partido.equipo_visitante;
                    } else {
                        partido.ganador = 0; // Empate
                    }
                    partido.jugado = true;
                }
                
                return partido;
            });

            // 3. Enviamos la NUEVA lista al padre
            onCambiarPartidos(listaActualizada);

            // 4. Guardamos en localStorage la nueva lista
            localStorage.setItem(`fecha${fechaActual}_apertura`, JSON.stringify(listaActualizada));

            // 5. Opcional: Actualizar también la lista auxiliar para que refleje el "ganador" calculado en la UI inmediatamente si fuera necesario
             onCambiarListaAuxiliar(prev => ({
                ...prev,
                [`fecha${fechaActual}`]: listaActualizada
            }));

            // Finalmente, reseteamos el estado de cambio
            setEstadoCambio(false);
        }

    }

    const reiniciarFecha = async () => {
      try {
        //console.log('Reiniciando fecha', fechaActual);

        const response = await fetch(`/data/fechas/apertura/fecha${fechaActual}.json`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos originales de los partidos');
        }

        const nuevaListaFecha: Partido[] = await response.json();

        //console.log('Nueva lista fecha:', nuevaListaFecha);

        onCambiarListaAuxiliar(prev => ({
          ...prev,
          [`fecha${fechaActual}`]: nuevaListaFecha
        }));

        onCambiarPartidos(nuevaListaFecha);

        localStorage.setItem(`fecha${fechaActual}_apertura`, JSON.stringify(nuevaListaFecha));

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

        let hayInvalido = false;
        let hayCambios = false;

        for (let i = 0; i < listaFecha.length; i++) {

            const original = partidos[i];
            const aux = listaFecha[i];
            if (!original || !aux) continue;
            
            const local = aux.goles_local;
            const visita = aux.goles_visitante;
            
            const esInvalido =
                (local === null && visita !== null) ||
                (local !== null && visita === null);
            
            if (esInvalido) {
                hayInvalido = true;
                break;
            }
          
            const esDiferente =
                local !== original.goles_local ||
                visita !== original.goles_visitante;
          
            if (esDiferente) {
                hayCambios = true;
            }
        }

        setEstadoCambio(!hayInvalido && hayCambios);

    }, [listaAuxiliar, fechaActual, partidos]);

    useEffect(() => {
        // Al cambiar de fecha, reseteamos el estado de cambio
        setEstadoCambio(false);
    }, [fechaActual]);

    useEffect(() => {

        // En caso todos los resultados de la listaAuxiliar sean diferentes de null,
        // marcamos el estado de reset como true
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
                                {/* Botones para cambiar la fecha (hacia atras y hacia adelante) */}
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
                                        onClick={() => { if (fechaActual < 17) onCambiarFecha(fechaActual + 1); }}
                                        disabled={fechaActual >= 17}
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
                    
                    {/* Seccion de boton para guardar resultados */}
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