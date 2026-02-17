import { useState, useEffect } from 'react';
import Resultados from './calc/Resultados';
import Tabla from './calc/Tabla';
import Equipos from '../data/equipos/equipos.json';
import type { Equipo } from '../types/equipo';
import type { Partido } from '../types/partido';

export default function App() {

    const [dataEquipos, setDataEquipos] = useState<Equipo[]>([]);
    const [fechaActual, setFechaActual] = useState(4);
    const [listaPartidosAuxiliares, setListaPartidosAuxiliares] = useState<{ [key: string]: Partido[] }>({});

    const [sincronizando, setSincronizando] = useState(false);

    const sincronizarDatosReales = async () => {

        setSincronizando(true);
        const confirmar = window.confirm(
            "¿Deseas actualizar a los resultados reales? Esto sobrescribirá tus simulaciones para esta fecha."
        );
        if (!confirmar) {
            setSincronizando(false);
            return;
        };

        try {
            // 1. Volvemos a pedir el JSON original (resultados reales actualizados)
            const response = await fetch(`/data/fechas/apertura/fecha${fechaActual}.json`);
            
            if (!response.ok) {
                throw new Error('Error al obtener los datos reales');
            }
            
            const datosReales: Partido[] = await response.json();

            // 2. Actualizamos la lista auxiliar (para que la Tabla se recalcule)
            setListaPartidosAuxiliares(prev => ({
                ...prev,
                [`fecha${fechaActual}`]: datosReales
            }));

            // 4. Sobrescribimos el localStorage de la fecha actual
            localStorage.setItem(`fecha${fechaActual}_apertura`, JSON.stringify(datosReales));

            // Limpiamos todas las fechas excepto la actual
            const nuevaListaAuxiliar: { [key: string]: Partido[] } = {
                [`fecha${fechaActual}`]: datosReales
            };

            Object.keys(localStorage).forEach(key => {
                if (key.includes('_apertura') && key !== `fecha${fechaActual}_apertura`) {
                    localStorage.removeItem(key);
                }
            });

            // Actualizamos el estado UNA sola vez
            setListaPartidosAuxiliares(nuevaListaAuxiliar);

            alert(`Fechas sincronizadas con resultados oficiales.`);

        } catch (error) {
            console.error("Error al sincronizar:", error);
            alert("No se pudo conectar con la base de datos de resultados.");
        } finally {
            setSincronizando(false);
        }
    };

    // Cargar datos de equipos al montar el componente
    useEffect(() => {
        setDataEquipos(Equipos);
    }, []);

    // Cargamos los datos de todas las fechas al montar el componente, pero mostramos solo la fecha actual
    useEffect(() => {

        async function cargarTodasLasFechas() {

            const nuevaListaAuxiliar: { [key: string]: Partido[] } = {};

            const TOTAL_FECHAS = 17; // ← cámbialo por la cantidad real de fechas

            for (let i = 1; i <= TOTAL_FECHAS; i++) {

                const fechaGuardada = localStorage.getItem(`fecha${i}_apertura`);

                if (fechaGuardada) {
                    nuevaListaAuxiliar[`fecha${i}`] = JSON.parse(fechaGuardada);
                } else {

                    try {
                        const response = await fetch(`/data/fechas/apertura/fecha${i}.json`);

                        if (!response.ok) {
                            throw new Error('Error al cargar datos');
                        }

                        const datos: Partido[] = await response.json();

                        nuevaListaAuxiliar[`fecha${i}`] = datos;

                        localStorage.setItem(`fecha${i}_apertura`, JSON.stringify(datos));

                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            // Guardamos TODAS las fechas de una sola vez
            setListaPartidosAuxiliares(nuevaListaAuxiliar);
        }

        cargarTodasLasFechas();

    }, []);

    // useEffect(() => {
        // console.log("Lista auxiliar actualizada:", listaPartidosAuxiliares);
    // }, [listaPartidosAuxiliares]);

    return (
        <div className="container-fluid">
	    	<div className="row">

                <div className="col-12 contenedor-titulo-calculadora">
                    <div className="row gx-0 justify-content-center align-items-center">
                        <div className="col-6">
                            <h1 className="text-center titulo-calculadora">LA CALCULADORA 2026</h1>
                        </div>
                    </div>
                </div>

	    		<div className="col-12 col-md-6">
	    			<Resultados equipos={dataEquipos}
                    fechaActual={fechaActual} 
                    onCambiarFecha={setFechaActual}
                    listaAuxiliar={listaPartidosAuxiliares} 
                    onCambiarListaAuxiliar={setListaPartidosAuxiliares} />
	    		</div>
	    		<div className="col-12 col-md-6">
	    			<Tabla equipos={dataEquipos} listaFechas={listaPartidosAuxiliares}/>
	    		</div>

                <div className="col-12 col-md-6 text-center mb-4">
                    <button 
                        className={`btn-sincronizar ${sincronizando ? "btn-esperando" : ""}`}
                        disabled={sincronizando}
                        onClick={sincronizarDatosReales}
                    >{sincronizando ? "Sincronizando..." : "Sincronizar datos reales"}</button>
                </div>
	    	</div>
	    </div>
    )

}