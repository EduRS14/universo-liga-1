import { useState, useEffect, useMemo } from 'react';
import Resultados from './calc/Resultados';
import Tabla from './calc/Tabla';
import Equipos from '../data/equipos/equipos.json';
import type { Equipo } from '../types/equipo';
import type { Partido } from '../types/partido';

const TOTAL_FECHAS = 17;
const LS_KEY = (torneo: string) => `datos_${torneo}`;

type Torneo = 'apertura' | 'clausura' | 'acumulado';

export default function App() {

    const [dataEquipos, setDataEquipos] = useState<Equipo[]>([]);
    const [fechasActuales, setFechasActuales] = useState<{ apertura: number; clausura: number }>({ apertura: 17, clausura: 2 });
    const [torneoActual, setTorneoActual] = useState<Torneo>('clausura');

    const [datosApertura, setDatosApertura] = useState<{ [key: string]: Partido[] }>({});
    const [datosClausura, setDatosClausura] = useState<{ [key: string]: Partido[] }>({});

    const [sincronizando, setSincronizando] = useState(false);

    const datosActuales = torneoActual === 'apertura' ? datosApertura : torneoActual === 'clausura' ? datosClausura : {};
    const setDatosActuales = torneoActual === 'apertura' ? setDatosApertura : setDatosClausura;

    const datosAcumulado = useMemo(() => {
        const merged: { [key: string]: Partido[] } = {};
        for (const [key, val] of Object.entries(datosApertura)) {
            merged[`a_${key}`] = val;
        }
        for (const [key, val] of Object.entries(datosClausura)) {
            merged[`c_${key}`] = val;
        }
        return merged;
    }, [datosApertura, datosClausura]);

    const sincronizarDatosReales = async () => {

        setSincronizando(true);

        const nombreTorneo = torneoActual === 'apertura' ? 'Apertura' : 'Clausura';

        const confirmar = window.confirm(
            `¿Deseas actualizar a los resultados reales del Torneo ${nombreTorneo}? Esto sobrescribirá TODAS tus simulaciones.`
        );

        if (!confirmar) {
            setSincronizando(false);
            return;
        }

        try {

            const nuevosDatos: { [key: string]: Partido[] } = {};

            for (let i = 1; i <= TOTAL_FECHAS; i++) {

                const response = await fetch(`/data/fechas/${torneoActual}/fecha${i}.json`);

                if (!response.ok) {
                    throw new Error(`Error al obtener fecha ${i}`);
                }

                const datos: Partido[] = await response.json();

                nuevosDatos[`fecha${i}`] = datos;
            }

            setDatosActuales(nuevosDatos);
            localStorage.setItem(LS_KEY(torneoActual), JSON.stringify(nuevosDatos));

            alert(`Todas las fechas del Torneo ${nombreTorneo} fueron sincronizadas.`);

        } catch (error) {
            console.error("Error al sincronizar:", error);
            alert("No se pudo sincronizar con los datos oficiales.");
        } finally {
            setSincronizando(false);
        }
    };

    const cargarTorneo = async (torneo: Torneo, setter: (d: { [key: string]: Partido[] }) => void) => {

        const guardado = localStorage.getItem(LS_KEY(torneo));

        if (guardado) {
            setter(JSON.parse(guardado));
            return;
        }

        const oldKey = `fecha1_${torneo}`;
        if (localStorage.getItem(oldKey)) {
            const migrados: { [key: string]: Partido[] } = {};
            for (let i = 1; i <= TOTAL_FECHAS; i++) {
                const d = localStorage.getItem(`fecha${i}_${torneo}`);
                if (d) migrados[`fecha${i}`] = JSON.parse(d);
            }
            if (Object.keys(migrados).length > 0) {
                setter(migrados);
                localStorage.setItem(LS_KEY(torneo), JSON.stringify(migrados));
                return;
            }
        }

        const nuevosDatos: { [key: string]: Partido[] } = {};

        for (let i = 1; i <= TOTAL_FECHAS; i++) {

            try {
                const response = await fetch(`/data/fechas/${torneo}/fecha${i}.json`);

                if (!response.ok) {
                    throw new Error(`Error al cargar fecha ${i}`);
                }

                nuevosDatos[`fecha${i}`] = await response.json();

            } catch (error) {
                console.error(error);
            }
        }

        setter(nuevosDatos);
        localStorage.setItem(LS_KEY(torneo), JSON.stringify(nuevosDatos));
    };

    useEffect(() => {
        setDataEquipos(Equipos);
    }, []);

    useEffect(() => {
        cargarTorneo('apertura', setDatosApertura);
        cargarTorneo('clausura', setDatosClausura);
    }, []);

    const handleCambiarTorneo = (torneo: Torneo) => {
        setTorneoActual(torneo);
    };

    const esAperturaOClausura = torneoActual === 'apertura' || torneoActual === 'clausura';
    const esAcumulado = torneoActual === 'acumulado';

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

                <div className="col-12 text-center mb-3 mt-3">
                    <div className="btn-group" role="group">
                        <button
                            className={`btn-izq ${torneoActual === 'apertura' ? 'btn-torneo-activo' : 'btn-torneo-normal'}`}
                            onClick={() => handleCambiarTorneo('apertura')}
                        >
                            APERTURA
                        </button>
                        <button
                            className={`${torneoActual === 'clausura' ? 'btn-torneo-activo' : 'btn-torneo-normal'}`}
                            onClick={() => handleCambiarTorneo('clausura')}
                        >
                            CLAUSURA
                        </button>
                        <button
                            className={`btn-der ${torneoActual === 'acumulado' ? 'btn-torneo-activo' : 'btn-torneo-normal'}`}
                            onClick={() => handleCambiarTorneo('acumulado')}
                        >
                            ACUMULADO
                        </button>
                    </div>
                </div>

                {esAperturaOClausura && (
                    <div className="col-12 col-md-6">
                        <Resultados
                            equipos={dataEquipos}
                            fechaActual={fechasActuales[torneoActual]}
                            onCambiarFecha={(n) => setFechasActuales(prev => ({ ...prev, [torneoActual]: n }))}
                            listaAuxiliar={datosActuales}
                            onCambiarListaAuxiliar={setDatosActuales}
                            torneo={torneoActual}
                        />
                    </div>
                )}

                <div className={`${esAcumulado ? 'col-12 col-md-10 col-lg-8 mx-auto' : 'col-12 col-md-6'}`}>
                    <Tabla
                        equipos={dataEquipos}
                        listaFechas={esAcumulado ? datosAcumulado : datosActuales}
                        torneo={torneoActual}
                    />
                </div>

                {esAperturaOClausura && (
                    <div className="col-12 col-md-6 text-center mb-4">
                        <button
                            className={`btn-sincronizar ${sincronizando ? "btn-esperando" : ""}`}
                            disabled={sincronizando}
                            onClick={sincronizarDatosReales}
                        >{sincronizando ? "Sincronizando..." : "Sincronizar datos reales"}</button>
                    </div>
                )}
            </div>
        </div>
    )

}
