import { useState, useEffect, use } from 'react';
import type { Equipo } from "../../types/equipo";
import type { Partido } from "../../types/partido";
import type { Resultado } from '../../types/resultado';
import "./styles.css";

interface Props {
    equipos: Equipo[];
    listaFechas: { [key: string]: Partido[] };
}

export default function Resultados( {equipos, listaFechas}: Props ) {

    const [resultados, setResultados] = useState<Resultado[]>([]);

    //console.log("Renderizando Tabla con equipos:", equipos);

    useEffect(() => {
        // Calculamos los resultados en base a la lista de fechas y equipos
        // Contamos unicamente los partidos registrados como jugados
        const nuevosResultados: Resultado[] = equipos.map(equipo => {
            let partidosJugados = 0;
            let puntos = 0;
            let victorias = 0;
            let empates = 0;
            let derrotas = 0;
            let golesFavor = 0;
            let golesContra = 0;
            for (const fecha in listaFechas) {
                listaFechas[fecha].forEach(partido => {
                    if (partido.jugado === true) {
                        if (partido.equipo_local === equipo.id || partido.equipo_visitante === equipo.id) {
                            partidosJugados++;
                            let golesLocal = partido.goles_local ?? 0;
                            let golesVisitante = partido.goles_visitante ?? 0;
                            if (partido.equipo_local === equipo.id) {
                                golesFavor += golesLocal;
                                golesContra += golesVisitante;
                                if (golesLocal > golesVisitante) {
                                    victorias++;
                                    puntos += 3;
                                } else if (golesLocal === golesVisitante) {
                                    empates++;
                                    puntos += 1;
                                } else {
                                    derrotas++;
                                }
                            } else {
                                golesFavor += golesVisitante;
                                golesContra += golesLocal;
                                if (golesVisitante > golesLocal) {
                                    victorias++;
                                    puntos += 3;
                                } else if (golesVisitante === golesLocal) {
                                    empates++;
                                    puntos += 1;
                                } else {
                                    derrotas++;
                                }
                            }
                        }
                    }
                });
            }
            return {
                equipo: equipo.nombre,
                diminutivo: equipo.diminutivo,
                puntos: puntos,
                partidosJugados,
                victorias,
                empates,
                derrotas,
                golesFavor,
                golesContra,
                diferenciaGoles: golesFavor - golesContra,
            };
        });

        // Ordenamos los resultados por puntos, diferencia de goles, goles a favor y por ultimo alfabeticamente
        nuevosResultados.sort((a, b) => {
            if (b.puntos !== a.puntos) {
                return b.puntos - a.puntos;
            } else if (b.diferenciaGoles !== a.diferenciaGoles) {
                return b.diferenciaGoles - a.diferenciaGoles;
            } else if (b.golesFavor !== a.golesFavor) {
                return b.golesFavor - a.golesFavor;
            } else {
                return a.equipo.localeCompare(b.equipo);
            }
        });

        setResultados(nuevosResultados);
    }, [listaFechas, equipos]);

    return (
        <div className="container-fluid contenedor-tabla">
            <div className="row justify-content-center align-items-center">

                <div className="col-11">

                    <div className="container-fluid contenedor-titulo-tabla">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-6 texto text-center">
                                <h2 className="titulo-fecha">Tabla - Torneo Apertura</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-11">

                    <div className="container-fluid contenedor-cuerpo-tabla">
                        <div className="row justify-content-center align-items-center">

                            <div className="col-11">

                                <div className="container-fluid contenedor-encabezado-tabla">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-1 text-center contenedor-numero-tabla">
                                            <strong className='texto-tabla'>#</strong>
                                        </div>
                                        <div className="col-3">
                                            <strong className='texto-tabla'>Equipo</strong>
                                        </div>
                                        <div className="col-1 text-center">
                                            <strong className='texto-tabla'>PJ</strong>
                                        </div>
                                        <div className="col-1 text-center">
                                            <strong className='texto-tabla'>PG</strong>
                                        </div>
                                        <div className="col-1 text-center">
                                            <strong className='texto-tabla'>PE</strong>
                                        </div>
                                        <div className="col-1 text-center">
                                            <strong className='texto-tabla'>PP</strong>
                                        </div>
                                        <div className="col-1 d-none d-lg-block text-center">
                                            <strong className='texto-tabla'>GF</strong>
                                        </div>
                                        <div className="col-1 d-none d-lg-block text-center">
                                            <strong className='texto-tabla'>GC</strong>
                                        </div>
                                        <div className="col-1 text-center">
                                            <strong className='texto-tabla'>DG</strong>
                                        </div>
                                        <div className="col-1 text-center">
                                            <strong className='texto-tabla'>PTS</strong>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="separador"></div>

                            {resultados.map((resultado, index) => (
                                <div key={index} className="col-11">
                                    <div className="container-fluid contenedor-resultado-tabla">
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-1 text-center contenedor-numero-tabla">
                                                <div
                                                className="w-100 h-100"
                                                style={
                                                index + 1 == 1 ? {backgroundColor: '#f0b535', borderRadius: '5px'}
                                                : index + 1 <= 4 ? {backgroundColor: '#32a869', borderRadius: '5px'}
                                                : index + 1 <= 8 ? { backgroundColor: '#e0944d', borderRadius: '5px' } 
                                                : index + 1 >= 16 ? { backgroundColor: '#e5533d', borderRadius: '5px' }
                                                : {}}>
                                                    <strong className='texto-tabla'>{index + 1}</strong>
                                                </div>
                                            </div>
                                            <div className="col-3 d-none d-lg-block texto-tabla">
                                                {resultado.equipo}
                                            </div>
                                            <div className="col-3 d-block d-lg-none texto-tabla">
                                                {resultado.diminutivo}
                                            </div>
                                            <div className="col-1 text-center texto-tabla">
                                                {resultado.partidosJugados}
                                            </div>
                                            <div className="col-1 text-center texto-tabla">
                                                {resultado.victorias}
                                            </div>
                                            <div className="col-1 text-center texto-tabla">
                                                {resultado.empates}
                                            </div>
                                            <div className="col-1 text-center texto-tabla">
                                                {resultado.derrotas}
                                            </div>
                                            <div className="col-1 d-none d-lg-block text-center texto-tabla">
                                                {resultado.golesFavor}
                                            </div>
                                            <div className="col-1 d-none d-lg-block text-center texto-tabla">
                                                {resultado.golesContra}
                                            </div>
                                            <div className="col-1 text-center texto-tabla">
                                                {resultado.diferenciaGoles}
                                            </div>
                                            <div className="col-1 text-center texto-tabla">
                                                <strong className='texto-tabla'>{resultado.puntos}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>

                <div className="col-10 col-md-5">

                    <div className="container-fluid contenedor-leyenda">
                        <div className="row justify-content-center align-items-center">

                            <div className="col-12 text-center contenedor-leyenda-tabla">

                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col-2 contenedor-cuadrado-leyenda">
                                            <div className="cuadrado-amarillo"></div>
                                        </div>
                                        <div className="col-10 texto-tabla">
                                            <p className="texto-leyenda">Campeón del Torneo Apertura</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-12 text-center contenedor-leyenda-tabla">

                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col-2 contenedor-cuadrado-leyenda">
                                            <div className="cuadrado-verde"></div>
                                        </div>
                                        <div className="col-10 texto-tabla">
                                            <p className="texto-leyenda">Clasificación a Copa Libertadores</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-12 text-center contenedor-leyenda-tabla">

                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col-2 contenedor-cuadrado-leyenda">
                                            <div className="cuadrado-naranja"></div>
                                        </div>
                                        <div className="col-10 texto-tabla">
                                            <p className="texto-leyenda">Clasificación a Copa Sudamericana</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-12 text-center contenedor-leyenda-tabla">

                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col-2 contenedor-cuadrado-leyenda">
                                            <div className="cuadrado-rojo"></div>
                                        </div>
                                        <div className="col-10 texto-tabla">
                                            <p className="texto-leyenda">Descenso a Segunda División</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}