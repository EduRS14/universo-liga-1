import { useState, useEffect } from 'react';
import Resultados from './calc/Resultados';
import Tabla from './calc/Tabla';
import Equipos from '../data/equipos/equipos.json';
import type { Equipo } from '../types/equipo';
import type { Partido } from '../types/partido';

export default function App() {

    const [dataEquipos, setDataEquipos] = useState<Equipo[]>([]);
    const [fechaActual, setFechaActual] = useState(1);
    const [partidosFecha, setPartidosFecha] = useState<Partido[]>([]);
    const [listaPartidosAuxiliares, setListaPartidosAuxiliares] = useState<{ [key: string]: Partido[] }>({});

    const [sincronizando, setSincronizando] = useState(false);

    // Funcion para guardar / usar los partidos auxiliares de cada fecha
    const manejarPartidosAuxiliares = (fecha: number, partidos: Partido[]) => {

        // Si ya existen partidos auxiliares para esa fecha, no hacemos nada
        if (listaPartidosAuxiliares[`fecha${fecha}`]) {
            return;
        } else {
            // Si no existen, los guardamos
            setListaPartidosAuxiliares(prevState => ({
                ...prevState,
                [`fecha${fecha}`]: partidos
            }));
        }

    }

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

            // 2. Actualizamos el estado visual inmediato (lo que ve el usuario ahora)
            setPartidosFecha(datosReales);

            // 3. Actualizamos la lista auxiliar (para que la Tabla se recalcule)
            setListaPartidosAuxiliares(prev => ({
                ...prev,
                [`fecha${fechaActual}`]: datosReales
            }));

            // 4. Sobrescribimos el localStorage de la fecha actual
            localStorage.setItem(`fecha${fechaActual}_apertura`, JSON.stringify(datosReales));

            Object.keys(localStorage).forEach(key => {
                // Borramos todo lo que sea del torneo apertura, EXCEPTO la fecha actual que acabamos de actualizar
                if (key.includes('_apertura') && key !== `fecha${fechaActual}_apertura`) {
                    localStorage.removeItem(key);
                    // También podrías limpiarlo de la lista auxiliar en memoria si quisieras un reset total:
                    setListaPartidosAuxiliares(prev => {
                        const copy = { ...prev };
                        const keyExtract = key.replace('_apertura', '');
                        delete copy[keyExtract];
                        return copy;
                    });
                }
            });

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

    // Cargamos los datos de la fecha actual
    useEffect(() => {
        async function fetchPartidos() {

            // Buscamos si tenemos guardado en localStorage la fecha actual
            const fechaAlmacenada = localStorage.getItem(`fecha${fechaActual}_apertura`);

            if (fechaAlmacenada) {
                setPartidosFecha(JSON.parse(fechaAlmacenada));
                manejarPartidosAuxiliares(fechaActual, JSON.parse(fechaAlmacenada));
                return;
            } else {

                try {
                    const response = await fetch(`/data/fechas/apertura/fecha${fechaActual}.json`);
                    if (!response.ok) {
                        throw new Error('Error al cargar los datos de los partidos');
                    }
                    const partidosData: Partido[] = await response.json();
                    setPartidosFecha(partidosData);
                    manejarPartidosAuxiliares(fechaActual, partidosData);

                    // Guardamos en localStorage los datos cargados
                    localStorage.setItem(`fecha${fechaActual}_apertura`, JSON.stringify(partidosData));
                } catch (error) {
                    console.error(error);
                }

            }
            
        }
        fetchPartidos();
    }, [fechaActual]);

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
	    			<Resultados equipos={dataEquipos} partidos={partidosFecha} onCambiarPartidos={setPartidosFecha}
                    fechaActual={fechaActual} onCambiarFecha={setFechaActual}
                    listaAuxiliar={listaPartidosAuxiliares} onCambiarListaAuxiliar={setListaPartidosAuxiliares} />
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