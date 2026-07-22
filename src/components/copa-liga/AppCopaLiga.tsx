import { useState, useEffect, useCallback } from 'react';
import type { EquipoCopa } from '../../types/copa-liga/equipo';
import type { GrupoCopa, FechaCopa } from '../../types/copa-liga/grupo';
import type { LlaveEliminatoria, SembradoEquipo } from '../../types/copa-liga/sembrado';
import type { PartidoAlmacenado } from '../../utils/copa-liga/cruces-octavos';
import { gruposCopa } from '../../data/copa-liga/grupos';
import equiposData from '../../data/copa-liga/equipos-copa.json';
import { generarFechasGrupo } from '../../data/copa-liga/configuracion';
import { calcularTablaGrupo } from '../../utils/copa-liga/calcular-tabla';
import { obtenerClasificacion } from '../../utils/copa-liga/clasificacion';
import { generarSembrado } from '../../utils/copa-liga/generar-sembrado';
import { generarCrucesOctavos, generarCuartos, generarSemifinales, generarFinal, aplicarResultados } from '../../utils/copa-liga/cruces-octavos';
import { invalidarHaciaAdelante } from '../../utils/copa-liga/invalidacion-cascada';
import GruposGrid from './GruposGrid';
import ResultadosGrupo from './ResultadosGrupo';
import TablaGrupo from './TablaGrupo';
import TablaSembrado from './TablaSembrado';
import BracketOctavos from './BracketOctavos';
import BracketCuartos from './BracketCuartos';
import BracketSemifinales from './BracketSemifinales';
import BracketFinal from './BracketFinal';
import ChampionDisplay from './ChampionDisplay';
import CopaLigaModal from './CopaLigaModal';
import './styles.css';

type Fase = 'grupos' | 'sembrado' | 'octavos' | 'cuartos' | 'semifinales' | 'final';

export default function AppCopaLiga() {
    const [faseActiva, setFaseActiva] = useState<Fase>('grupos');
    const [grupoSeleccionado, setGrupoSeleccionado] = useState<GrupoCopa | null>(null);
    const [fechasPorGrupo, setFechasPorGrupo] = useState<Record<string, FechaCopa[]>>({});
    const [sincronizando, setSincronizando] = useState(false);

    const [partidosOctavos, setPartidosOctavos] = useState<LlaveEliminatoria[]>([]);
    const [partidosCuartos, setPartidosCuartos] = useState<LlaveEliminatoria[]>([]);
    const [partidosSemifinales, setPartidosSemifinales] = useState<LlaveEliminatoria[]>([]);
    const [partidoFinal, setPartidoFinal] = useState<LlaveEliminatoria | null>(null);
    const [ganador, setGanador] = useState<EquipoCopa | null>(null);
    const [sembrado, setSembrado] = useState<SembradoEquipo[]>([]);

    const equiposMap = new Map<number, EquipoCopa>(equiposData.map(e => [e.id, e as EquipoCopa]));

    useEffect(() => {
        const inicial: Record<string, FechaCopa[]> = {};
        gruposCopa.forEach(grupo => {
            inicial[grupo.letra] = generarFechasGrupo(grupo);
        });
        setFechasPorGrupo(inicial);
    }, []);

    useEffect(() => {
        gruposCopa.forEach(grupo => {
            const guardado = localStorage.getItem(`copa-liga-grupo-${grupo.letra}`);
            if (guardado) {
                setFechasPorGrupo(prev => ({ ...prev, [grupo.letra]: JSON.parse(guardado) }));
            }
        });

        const oct = localStorage.getItem('copa-liga-octavos');
        if (oct) setPartidosOctavos(JSON.parse(oct));

        const cuar = localStorage.getItem('copa-liga-cuartos');
        if (cuar) setPartidosCuartos(JSON.parse(cuar));

        const semi = localStorage.getItem('copa-liga-semifinales');
        if (semi) setPartidosSemifinales(JSON.parse(semi));

        const fin = localStorage.getItem('copa-liga-final');
        if (fin) setPartidoFinal(JSON.parse(fin));

        const gan = localStorage.getItem('copa-liga-ganador');
        if (gan) setGanador(JSON.parse(gan));
    }, []);

    const verificarFaseGruposCompleta = useCallback(() => {
        for (const grupo of gruposCopa) {
            const fechas = fechasPorGrupo[grupo.letra];
            if (!fechas) return false;
            for (const fecha of fechas) {
                for (const p of fecha.partidos) {
                    if (!p.jugado) return false;
                }
            }
        }
        return true;
    }, [fechasPorGrupo]);

    const generarEliminatorias = useCallback(() => {
        const clasificacion = obtenerClasificacion(gruposCopa, fechasPorGrupo);
        const sembradoResult = generarSembrado(clasificacion, equiposMap);
        setSembrado(sembradoResult);

        const octavosGuardados = localStorage.getItem('copa-liga-octavos');
        let octavos: LlaveEliminatoria[];
        if (octavosGuardados) {
            const existentes = JSON.parse(octavosGuardados) as LlaveEliminatoria[];
            const nuevos = generarCrucesOctavos(clasificacion, equiposMap);
            octavos = nuevos.map(n => {
                const existente = existentes.find(e => e.id === n.id);
                if (existente && existente.jugado) return existente;
                return n;
            });
        } else {
            octavos = generarCrucesOctavos(clasificacion, equiposMap);
        }
        setPartidosOctavos(octavos);
        localStorage.setItem('copa-liga-octavos', JSON.stringify(octavos));

        const cuartosGuardados = localStorage.getItem('copa-liga-cuartos');
        let cuartos: LlaveEliminatoria[];
        if (cuartosGuardados) {
            const existentes = JSON.parse(cuartosGuardados) as LlaveEliminatoria[];
            const nuevos = generarCuartos(octavos);
            cuartos = nuevos.map(n => {
                const existente = existentes.find(e => e.id === n.id);
                if (existente && existente.jugado) return existente;
                return n;
            });
        } else {
            cuartos = generarCuartos(octavos);
        }
        setPartidosCuartos(cuartos);
        localStorage.setItem('copa-liga-cuartos', JSON.stringify(cuartos));

        const semisGuardadas = localStorage.getItem('copa-liga-semifinales');
        let semis: LlaveEliminatoria[];
        if (semisGuardadas) {
            const existentes = JSON.parse(semisGuardadas) as LlaveEliminatoria[];
            const nuevos = generarSemifinales(cuartos);
            semis = nuevos.map(n => {
                const existente = existentes.find(e => e.id === n.id);
                if (existente && existente.jugado) return existente;
                return n;
            });
        } else {
            semis = generarSemifinales(cuartos);
        }
        setPartidosSemifinales(semis);
        localStorage.setItem('copa-liga-semifinales', JSON.stringify(semis));

        const finalGuardado = localStorage.getItem('copa-liga-final');
        let final: LlaveEliminatoria;
        if (finalGuardado) {
            const existente = JSON.parse(finalGuardado) as LlaveEliminatoria;
            const nuevo = generarFinal(semis);
            final = existente.jugado ? existente : nuevo;
        } else {
            final = generarFinal(semis);
        }
        setPartidoFinal(final);
        localStorage.setItem('copa-liga-final', JSON.stringify(final));

        localStorage.removeItem('copa-liga-ganador');
        setGanador(null);
    }, [fechasPorGrupo, equiposMap]);

    const regenerarDesdeClasificacion = useCallback(async (nuevasFechas: Record<string, FechaCopa[]>, equiposMap: Map<number, EquipoCopa>): Promise<{ octavos: LlaveEliminatoria[]; cuartos: LlaveEliminatoria[]; semis: LlaveEliminatoria[]; final: LlaveEliminatoria; ganador: EquipoCopa | null }> => {
        const clasificacion = obtenerClasificacion(gruposCopa, nuevasFechas);
        const sembradoResult = generarSembrado(clasificacion, equiposMap);
        setSembrado(sembradoResult);

        let octavosAlmacenados: PartidoAlmacenado[] | undefined;
        try {
            const resp = await fetch('/data/copa-liga/octavos.json');
            if (resp.ok) octavosAlmacenados = await resp.json();
        } catch { /* ignore */ }

        let cuartosAlmacenados: PartidoAlmacenado[] | undefined;
        try {
            const resp = await fetch('/data/copa-liga/cuartos.json');
            if (resp.ok) cuartosAlmacenados = await resp.json();
        } catch { /* ignore */ }

        let semisAlmacenados: PartidoAlmacenado[] | undefined;
        try {
            const resp = await fetch('/data/copa-liga/semifinales.json');
            if (resp.ok) semisAlmacenados = await resp.json();
        } catch { /* ignore */ }

        let finalAlmacenado: PartidoAlmacenado | undefined;
        try {
            const resp = await fetch('/data/copa-liga/final.json');
            if (resp.ok) finalAlmacenado = await resp.json();
        } catch { /* ignore */ }

        const octavos = generarCrucesOctavos(clasificacion, equiposMap, octavosAlmacenados);

        let cuartos = generarCuartos(octavos);
        if (cuartosAlmacenados) cuartos = aplicarResultados(cuartos, cuartosAlmacenados);

        let semis = generarSemifinales(cuartos);
        if (semisAlmacenados) semis = aplicarResultados(semis, semisAlmacenados);

        let final = generarFinal(semis);
        if (finalAlmacenado && finalAlmacenado.jugado) {
            final = aplicarResultados([final], [finalAlmacenado])[0];
        }

        const ganador = final.jugado && final.ganador ? final.ganador : null;

        return { octavos, cuartos, semis, final, ganador };
    }, []);

    const handleGrupoSeleccionado = (grupo: GrupoCopa) => {
        setGrupoSeleccionado(grupo);
    };

    const handleFechasActualizadas = (grupoLetra: string, fechas: FechaCopa[]) => {
        setFechasPorGrupo(prev => ({ ...prev, [grupoLetra]: fechas }));
        localStorage.setItem(`copa-liga-grupo-${grupoLetra}`, JSON.stringify(fechas));
        invalidarHaciaAdelante('grupos');
        setPartidosOctavos([]);
        setPartidosCuartos([]);
        setPartidosSemifinales([]);
        setPartidoFinal(null);
        setGanador(null);
        setSembrado([]);
    };

    const handleSincronizar = async () => {
        const confirmar = window.confirm('¿Deseas actualizar a los resultados reales? Esto sobrescribirá TODAS tus simulaciones.');
        if (!confirmar) return;

        setSincronizando(true);
        try {
            const nuevasFechas: Record<string, FechaCopa[]> = {};
            for (const grupo of gruposCopa) {
                const grupoKey = grupo.letra.toLowerCase();
                const fechas: FechaCopa[] = [];
                const totalFechas = 3;
                for (let i = 1; i <= totalFechas; i++) {
                    const resp = await fetch(`/data/copa-liga/fechas/grupo-${grupoKey}/fecha${i}.json`);
                    if (!resp.ok) throw new Error(`Error grupo ${grupo.letra} fecha ${i}`);
                    const data = await resp.json();
                    fechas.push({ numero: i, partidos: data });
                }
                nuevasFechas[grupo.letra] = fechas;
                localStorage.setItem(`copa-liga-grupo-${grupo.letra}`, JSON.stringify(fechas));
            }
            setFechasPorGrupo(nuevasFechas);

            const { octavos, cuartos, semis, final, ganador } = await regenerarDesdeClasificacion(nuevasFechas, equiposMap);

            setPartidosOctavos(octavos);
            localStorage.setItem('copa-liga-octavos', JSON.stringify(octavos));

            setPartidosCuartos(cuartos);
            localStorage.setItem('copa-liga-cuartos', JSON.stringify(cuartos));

            setPartidosSemifinales(semis);
            localStorage.setItem('copa-liga-semifinales', JSON.stringify(semis));

            setPartidoFinal(final);
            localStorage.setItem('copa-liga-final', JSON.stringify(final));

            if (ganador) {
                setGanador(ganador);
                localStorage.setItem('copa-liga-ganador', JSON.stringify(ganador));
            } else {
                localStorage.removeItem('copa-liga-ganador');
                setGanador(null);
            }

            setFaseActiva('sembrado');
            alert('Resultados sincronizados correctamente.');
        } catch (e) {
            console.error(e);
            alert('No se pudo sincronizar con los datos oficiales.');
        } finally {
            setSincronizando(false);
        }
    };

    const handleAvanzarFase = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (faseActiva === 'grupos' && verificarFaseGruposCompleta()) {
            generarEliminatorias();
            setFaseActiva('sembrado');
        } else if (faseActiva === 'sembrado') {
            setFaseActiva('octavos');
        } else if (faseActiva === 'octavos') {
            const todosJugados = partidosOctavos.every(p => p.jugado);
            if (todosJugados) {
                const nuevosCuartos = generarCuartos(partidosOctavos);
                const cuartosGuardados = localStorage.getItem('copa-liga-cuartos');
                let cuartos: LlaveEliminatoria[];
                if (cuartosGuardados) {
                    const existentes = JSON.parse(cuartosGuardados) as LlaveEliminatoria[];
                    cuartos = nuevosCuartos.map(n => {
                        const existente = existentes.find(e => e.id === n.id);
                        if (existente && existente.jugado) return existente;
                        return n;
                    });
                } else {
                    cuartos = nuevosCuartos;
                }
                setPartidosCuartos(cuartos);
                localStorage.setItem('copa-liga-cuartos', JSON.stringify(cuartos));
                setFaseActiva('cuartos');
            }
        } else if (faseActiva === 'cuartos') {
            const todosJugados = partidosCuartos.every(p => p.jugado);
            if (todosJugados) {
                const nuevasSemis = generarSemifinales(partidosCuartos);
                const semisGuardadas = localStorage.getItem('copa-liga-semifinales');
                let semis: LlaveEliminatoria[];
                if (semisGuardadas) {
                    const existentes = JSON.parse(semisGuardadas) as LlaveEliminatoria[];
                    semis = nuevasSemis.map(n => {
                        const existente = existentes.find(e => e.id === n.id);
                        if (existente && existente.jugado) return existente;
                        return n;
                    });
                } else {
                    semis = nuevasSemis;
                }
                setPartidosSemifinales(semis);
                localStorage.setItem('copa-liga-semifinales', JSON.stringify(semis));
                setFaseActiva('semifinales');
            }
        } else if (faseActiva === 'semifinales') {
            const todosJugados = partidosSemifinales.every(p => p.jugado);
            if (todosJugados) {
                const nuevaFinal = generarFinal(partidosSemifinales);
                const finalGuardado = localStorage.getItem('copa-liga-final');
                let final: LlaveEliminatoria;
                if (finalGuardado) {
                    const existente = JSON.parse(finalGuardado) as LlaveEliminatoria;
                    final = existente.jugado ? existente : nuevaFinal;
                } else {
                    final = nuevaFinal;
                }
                setPartidoFinal(final);
                localStorage.setItem('copa-liga-final', JSON.stringify(final));
                setFaseActiva('final');
            }
        }
    };

    const todosGruposCompletos = verificarFaseGruposCompleta();
    const octavosCompletos = partidosOctavos.length > 0 && partidosOctavos.every(p => p.jugado);
    const cuartosCompletos = partidosCuartos.length > 0 && partidosCuartos.every(p => p.jugado);
    const semisCompletos = partidosSemifinales.length > 0 && partidosSemifinales.every(p => p.jugado);

    return (
        <>
            <CopaLigaModal />

            <div className="container-fluid copa-liga-app">
                <div className="row">
                <div className="col-12 contenedor-titulo-copa">
                    <div className="row gx-0 justify-content-center align-items-center">
                        <div className="col-12">
                            <h1 className="text-center titulo-copa">COPA DE LA LIGA 2026</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3 justify-content-center align-items-center">
                <div className="col-10 text-center mb-3">
                    <div className="fase-indicator">
                        <span className={faseActiva === 'grupos' ? 'fase-activa' : 'fase-completada'}>Fase de Grupos</span>
                        <span className="fase-separador">→</span>
                        <span className={faseActiva === 'sembrado' ? 'fase-activa' : (todosGruposCompletos ? 'fase-completada' : 'fase-bloqueada')}>Clasificados</span>
                        <span className="fase-separador">→</span>
                        <span className={faseActiva === 'octavos' ? 'fase-activa' : (partidosOctavos.length > 0 && partidosOctavos.every(p => p.jugado) ? 'fase-completada' : (partidosOctavos.length > 0 ? 'fase-pendiente' : 'fase-bloqueada'))}>Octavos</span>
                        <span className="fase-separador">→</span>
                        <span className={faseActiva === 'cuartos' ? 'fase-activa' : (partidosCuartos.length > 0 && partidosCuartos.every(p => p.jugado) ? 'fase-completada' : (partidosCuartos.length > 0 ? 'fase-pendiente' : 'fase-bloqueada'))}>Cuartos</span>
                        <span className="fase-separador">→</span>
                        <span className={faseActiva === 'semifinales' ? 'fase-activa' : (partidosSemifinales.length > 0 && partidosSemifinales.every(p => p.jugado) ? 'fase-completada' : (partidosSemifinales.length > 0 ? 'fase-pendiente' : 'fase-bloqueada'))}>Semifinales</span>
                        <span className="fase-separador">→</span>
                        <span className={faseActiva === 'final' ? 'fase-activa' : (partidoFinal && partidoFinal.jugado ? 'fase-completada' : (partidoFinal ? 'fase-pendiente' : 'fase-bloqueada'))}>Final</span>
                    </div>
                </div>
            </div>

            <div className="row mt-2 mb-3">
                <div className="col-12 text-center">
                    <button
                        className={`btn-copa ${sincronizando ? 'btn-esperando' : ''}`}
                        disabled={sincronizando}
                        onClick={handleSincronizar}
                    >
                        {sincronizando ? 'Sincronizando...' : 'Sincronizar datos reales'}
                    </button>
                </div>
            </div>

            {faseActiva === 'grupos' && (
                <>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-11">
                            <GruposGrid grupos={gruposCopa} grupoSeleccionado={grupoSeleccionado} onSeleccionar={handleGrupoSeleccionado} fechasPorGrupo={fechasPorGrupo} />
                        </div>
                    </div>
                    {grupoSeleccionado && (
                        <div className="row mt-4 justify-content-center align-items-center">
                            <div className="col-10 col-lg-5">
                                <ResultadosGrupo
                                    key={`resultados-${grupoSeleccionado.letra}`}
                                    grupo={grupoSeleccionado}
                                    fechas={fechasPorGrupo[grupoSeleccionado.letra] || []}
                                    onFechasActualizadas={(fechas) => handleFechasActualizadas(grupoSeleccionado.letra, fechas)}
                                />
                            </div>
                            <div className="col-10 col-lg-5">
                                <TablaGrupo
                                    key={`tabla-${grupoSeleccionado.letra}`}
                                    grupo={grupoSeleccionado}
                                    fechas={fechasPorGrupo[grupoSeleccionado.letra] || []}
                                />
                            </div>
                        </div>
                    )}
                    <div className="row mt-3 mb-4">
                        <div className="col-12 text-center">
                            <button
                                className="btn-copa btn-avanzar"
                                disabled={!todosGruposCompletos}
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); generarEliminatorias(); setFaseActiva('sembrado'); }}
                            >
                                Siguiente Fase: Clasificados
                            </button>
                        </div>
                    </div>
                </>
            )}

            {faseActiva === 'sembrado' && sembrado.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <TablaSembrado sembrado={sembrado} />
                        </div>
                    </div>
                    <div className="row mt-3 mb-4">
                        <div className="col-12 text-center d-flex justify-content-center gap-3">
                            <button className="btn-copa btn-volver" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setFaseActiva('grupos'); }}>
                                Volver: Fase de Grupos
                            </button>
                            <button className="btn-copa btn-avanzar" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setFaseActiva('octavos'); }}>
                                Siguiente Fase: Octavos de Final
                            </button>
                        </div>
                    </div>
                </>
            )}

            {faseActiva === 'octavos' && partidosOctavos.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <BracketOctavos
                                partidos={partidosOctavos}
                                onPartidosActualizados={(partidos) => {
                                    setPartidosOctavos(partidos);
                                    localStorage.setItem('copa-liga-octavos', JSON.stringify(partidos));
                                    invalidarHaciaAdelante('octavos');
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 mb-4">
                        <div className="col-12 text-center d-flex justify-content-center gap-3">
                            <button className="btn-copa btn-volver" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setFaseActiva('sembrado'); }}>
                                Volver: Clasificados
                            </button>
                            <button
                                className="btn-copa btn-avanzar"
                                disabled={!octavosCompletos}
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleAvanzarFase(); }}
                            >
                                Siguiente Fase: Cuartos de Final
                            </button>
                        </div>
                    </div>
                </>
            )}

            {faseActiva === 'cuartos' && partidosCuartos.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <BracketCuartos
                                partidos={partidosCuartos}
                                onPartidosActualizados={(partidos) => {
                                    setPartidosCuartos(partidos);
                                    localStorage.setItem('copa-liga-cuartos', JSON.stringify(partidos));
                                    invalidarHaciaAdelante('cuartos');
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 mb-4">
                        <div className="col-12 text-center d-flex justify-content-center gap-3">
                            <button className="btn-copa btn-volver" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setFaseActiva('octavos'); }}>
                                Volver: Octavos de Final
                            </button>
                            <button
                                className="btn-copa btn-avanzar"
                                disabled={!cuartosCompletos}
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleAvanzarFase(); }}
                            >
                                Siguiente Fase: Semifinales
                            </button>
                        </div>
                    </div>
                </>
            )}

            {faseActiva === 'semifinales' && partidosSemifinales.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <BracketSemifinales
                                partidos={partidosSemifinales}
                                onPartidosActualizados={(partidos) => {
                                    setPartidosSemifinales(partidos);
                                    localStorage.setItem('copa-liga-semifinales', JSON.stringify(partidos));
                                    invalidarHaciaAdelante('semifinales');
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 mb-4">
                        <div className="col-12 text-center d-flex justify-content-center gap-3">
                            <button className="btn-copa btn-volver" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setFaseActiva('cuartos'); }}>
                                Volver: Cuartos de Final
                            </button>
                            <button
                                className="btn-copa btn-avanzar"
                                disabled={!semisCompletos}
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleAvanzarFase(); }}
                            >
                                Siguiente Fase: Gran Final
                            </button>
                        </div>
                    </div>
                </>
            )}

            {faseActiva === 'final' && partidoFinal && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <BracketFinal
                                partido={partidoFinal}
                                onPartidoActualizado={(partido) => {
                                    setPartidoFinal(partido);
                                    localStorage.setItem('copa-liga-final', JSON.stringify(partido));
                                    if (partido.ganador) {
                                        setGanador(partido.ganador);
                                        localStorage.setItem('copa-liga-ganador', JSON.stringify(partido.ganador));
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {ganador && (
                        <div className="row mt-4">
                            <div className="col-12">
                                <ChampionDisplay equipo={ganador} />
                            </div>
                        </div>
                    )}
                    <div className="row mt-3 mb-4">
                        <div className="col-12 text-center">
                            <button className="btn-copa btn-volver" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setFaseActiva('semifinales'); }}>
                                Volver: Semifinales
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
    );
}
