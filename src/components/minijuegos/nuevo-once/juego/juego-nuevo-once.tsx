import { useState, useEffect } from 'react';
import Buscador from '../../../buscador';
import Equipos from '../../../../data/minijuegos/equipos.json'; 
import type { Jugador } from '../../../../types/minijuegos/jugador.interface';
import Spinner from '../../Spinner';
import './styles.css';

// --- CONSTANTES Y CONFIGURACIÓN ---

const STORAGE_KEY = 'nuevoOnce_partidaGuardada';
const RESULTADO_KEY = 'nuevoOnce_ultimoResultado';

export interface ResultadoGuardado {
  dia: string;
  estado: 'ganado' | 'perdido';
  idsAcertados: number;
  formacion: string;
  slots: Record<string, { id: number; nombre: string; url_foto: string } | null>;
  ordenEquipos: number[];
  turnoActual: number;
}

const COORDENADAS: Record<string, { id: number, top: string, left: string, rol: string }[]> = {
  "4-4-2": [
    { id: 1, top: '85%', left: '50%', rol: 'POR' },
    { id: 2, top: '65%', left: '20%', rol: 'LI' },
    { id: 3, top: '70%', left: '40%', rol: 'DFC' },
    { id: 4, top: '70%', left: '60%', rol: 'DFC' },
    { id: 5, top: '65%', left: '80%', rol: 'LD' },
    { id: 6, top: '40%', left: '20%', rol: 'MI' },
    { id: 7, top: '45%', left: '40%', rol: 'MC' },
    { id: 8, top: '45%', left: '60%', rol: 'MC' },
    { id: 9, top: '40%', left: '80%', rol: 'MD' },
    { id: 10, top: '20%', left: '35%', rol: 'DC' },
    { id: 11, top: '20%', left: '65%', rol: 'DC' },
  ],

  "4-3-3 ofensiva": [
    { id: 1, top: '85%', left: '50%', rol: 'POR' },
    { id: 2, top: '65%', left: '20%', rol: 'LI' },
    { id: 3, top: '70%', left: '40%', rol: 'DFC' },
    { id: 4, top: '70%', left: '60%', rol: 'DFC' },
    { id: 5, top: '65%', left: '80%', rol: 'LD' },
    { id: 6, top: '50%', left: '35%', rol: 'MC' },
    { id: 7, top: '40%', left: '50%', rol: 'MO' },
    { id: 8, top: '50%', left: '65%', rol: 'MC' },
    { id: 9, top: '25%', left: '20%', rol: 'EXI' },
    { id: 10, top: '20%', left: '50%', rol: 'DC' },
    { id: 11, top: '25%', left: '80%', rol: 'EXD' },
  ],

  "4-3-3 defensiva": [
    { id: 1, top: '85%', left: '50%', rol: 'POR' },
    { id: 2, top: '65%', left: '20%', rol: 'LI' },
    { id: 3, top: '70%', left: '40%', rol: 'DFC' },
    { id: 4, top: '70%', left: '60%', rol: 'DFC' },
    { id: 5, top: '65%', left: '80%', rol: 'LD' },
    { id: 6, top: '43%', left: '35%', rol: 'MC' },
    { id: 7, top: '55%', left: '50%', rol: 'MCD' },
    { id: 8, top: '43%', left: '65%', rol: 'MC' },
    { id: 9, top: '25%', left: '20%', rol: 'EXI' },
    { id: 10, top: '20%', left: '50%', rol: 'DC' },
    { id: 11, top: '25%', left: '80%', rol: 'EXD' },
  ],

  "3-5-2": [
    { id: 1, top: '85%', left: '50%', rol: 'POR' },
    { id: 2, top: '70%', left: '30%', rol: 'DFC' },
    { id: 3, top: '70%', left: '50%', rol: 'DFC' },
    { id: 4, top: '70%', left: '70%', rol: 'DFC' },
    { id: 5, top: '45%', left: '37%', rol: 'MC' },
    { id: 6, top: '55%', left: '50%', rol: 'MCD' },
    { id: 7, top: '45%', left: '63%', rol: 'MC' },
    { id: 8, top: '40%', left: '15%', rol: 'MI' },
    { id: 9, top: '20%', left: '35%', rol: 'DC' },
    { id: 10, top: '20%', left: '65%', rol: 'DC' },
    { id: 11, top: '40%', left: '85%', rol: 'MD' },
  ],

  "4-2-3-1": [
    { id: 1, top: '85%', left: '50%', rol: 'POR' },
    { id: 2, top: '65%', left: '20%', rol: 'LI' },
    { id: 3, top: '70%', left: '40%', rol: 'DFC' },
    { id: 4, top: '70%', left: '60%', rol: 'DFC' },
    { id: 5, top: '65%', left: '80%', rol: 'LD' },
    { id: 6, top: '55%', left: '40%', rol: 'MCD' },
    { id: 7, top: '55%', left: '60%', rol: 'MCD' },
    { id: 8, top: '38%', left: '50%', rol: 'MO' },
    { id: 9, top: '30%', left: '20%', rol: 'EXI' },
    { id: 10, top: '20%', left: '50%', rol: 'DC' },
    { id: 11, top: '30%', left: '80%', rol: 'EXD' },
  ],
};

interface GameState {
  dificultad: number;
  tiempo: number;
  formacion: string;
}

type EstadoJuego = 'jugando' | 'ganado' | 'perdido';

const NOMBRES_EQUIPOS = Equipos.reduce((acc, equipo) => {
  acc[equipo.id] = equipo.nombre;
  return acc;
}, {} as Record<number, string>);

const IMAGENES_EQUIPOS = Equipos.reduce((acc, equipo) => {
  acc[equipo.id] = equipo.url_foto;
  return acc;
}, {} as Record<number, string>);

const MAPA_POSICIONES: Record<string, string[]> = {
  "POR": ["Portero"],
  "LI": ["Lateral izquierdo"],
  "LD": ["Lateral derecho"],
  "DFC": ["Defensa central", "Libero"],
  "MC": ["Mediocentro"],
  "MI": ["Interior izquierdo", "Extremo izquierdo"],
  "MD": ["Interior derecho", "Extremo derecho"],
  "MCD": ["Mediocentro defensivo", "Pivote"],
  "MO": ["Mediapunta", "Mediocentro ofensivo"],
  "EXI": ["Extremo izquierdo", "Interior izquierdo"],
  "EXD": ["Extremo derecho", "Interior derecho"],
  "DC": ["Delantero centro", "Mediapunta"]
};

function jugadorJuegaEnPosicion(jugador: Jugador, rol: string): boolean {
  const posicionesValidas = MAPA_POSICIONES[rol] || [];
  return (
    posicionesValidas.includes(jugador.posicionPrincipal) ||
    jugador.posicionesSecundarias.some(pos => posicionesValidas.includes(pos))
  );
}

interface Props {
  modoRevision?: boolean;
  resultadoGuardado?: ResultadoGuardado;
}

export default function JuegoNuevoOnce({ modoRevision = false, resultadoGuardado }: Props) {
  // --- ESTADOS ---
  const [data, setData] = useState<GameState | null>(null);
  const [cargando, setCargando] = useState(true);

  // Estado del Tablero
  const [equipoArmado, setEquipoArmado] = useState<Record<number, Jugador | null>>({});
  const [idsUsados, setIdsUsados] = useState<Set<number>>(new Set());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Flujo de búsqueda
  const [jugadorPendiente, setJugadorPendiente] = useState<Jugador | null>(null);
  const [posicionesDisponibles, setPosicionesDisponibles] = useState<number[]>([]);
  const [posicionElegida, setPosicionElegida] = useState<number | null>(null);
  const [buscadorKey, setBuscadorKey] = useState(0);

  // Lógica de Juego
  const [ordenEquipos, setOrdenEquipos] = useState<number[]>([]);
  const [turnoActual, setTurnoActual] = useState<number>(0);
  const [tiempoRestante, setTiempoRestante] = useState<number>(0);
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>('jugando');

  // Modal de resultado
  const [mostrarModal, setMostrarModal] = useState(false);

  // --- MODO REVISIÓN: inicializar desde resultado guardado ---
  useEffect(() => {
    if (!modoRevision || !resultadoGuardado) return;

    const formacion = resultadoGuardado.formacion;
    setData({ dificultad: 0, tiempo: 0, formacion });
    setOrdenEquipos(resultadoGuardado.ordenEquipos);
    setTurnoActual(resultadoGuardado.turnoActual);

    // Reconstruir equipoArmado con datos mínimos para renderizado
    const slots: Record<number, Jugador | null> = {};
    for (const [slotIdStr, playerData] of Object.entries(resultadoGuardado.slots)) {
      const slotId = Number(slotIdStr);
      if (playerData) {
        slots[slotId] = playerData as unknown as Jugador;
      } else {
        slots[slotId] = null;
      }
    }
    setEquipoArmado(slots);
    setIdsUsados(new Set(Object.values(resultadoGuardado.slots).filter(p => p !== null).map(p => (p as any).id)));
    setEstadoJuego(resultadoGuardado.estado);
    setMostrarModal(true);
    setCargando(false);
  }, [modoRevision, resultadoGuardado]);

  // --- 1. CARGA INICIAL (RECUPERAR O INICIAR NUEVO) ---
  useEffect(() => {
    if (modoRevision) return;

    const partidaGuardada = localStorage.getItem(STORAGE_KEY);
    
    if (partidaGuardada) {
        try {
            const parsed = JSON.parse(partidaGuardada);
            
            if (parsed.estadoJuego === 'jugando') {
                console.log("🔄 Partida recuperada del almacenamiento.");
                setData(parsed.data);
                setEquipoArmado(parsed.equipoArmado);
                setOrdenEquipos(parsed.ordenEquipos);
                setTurnoActual(parsed.turnoActual);
                setTiempoRestante(parsed.tiempoRestante);
                setEstadoJuego(parsed.estadoJuego);
                setIdsUsados(new Set(parsed.idsUsados));
                setCargando(false);
                return;
            }
        } catch (error) {
            console.error("Error al leer partida guardada, reiniciando...", error);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    const timer = setTimeout(() => {
        const dif = localStorage.getItem('nuevoOnce_dificultad');
        const time = localStorage.getItem('nuevoOnce_tiempo');
        const form = localStorage.getItem('nuevoOnce_formacion');

        if (time && form) {
            const tiempoNum = Number(time);
            setData({ dificultad: Number(dif), tiempo: tiempoNum, formacion: form });
            setTiempoRestante(tiempoNum);
        }

        const idsDisponibles = Equipos.map(e => e.id);
        const equiposMezclados = idsDisponibles.sort(() => 0.5 - Math.random());
        setOrdenEquipos(equiposMezclados.slice(0, 11));
        
        setCargando(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [modoRevision]);

  // --- 2. PERSISTENCIA (GUARDADO AUTOMÁTICO) ---
  useEffect(() => {
      if (cargando || !data || modoRevision) return;

      const estadoSnapshot = {
          data,
          equipoArmado,
          ordenEquipos,
          turnoActual,
          tiempoRestante,
          estadoJuego,
          idsUsados: Array.from(idsUsados)
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoSnapshot));

  }, [data, equipoArmado, ordenEquipos, turnoActual, tiempoRestante, estadoJuego, idsUsados, cargando, modoRevision]);

  // --- 3. CRONÓMETRO ---
  useEffect(() => {
    if (!data || data.tiempo === 0 || estadoJuego !== 'jugando' || modoRevision) return;

    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          setEstadoJuego('perdido');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [data, estadoJuego, modoRevision]);

  // --- GUARDAR RESULTADO AL TERMINAR ---
  useEffect(() => {
    if (estadoJuego === 'jugando' || !data) return;
    if (mostrarModal) return; // ya se guardó

    const slots: Record<string, { id: number; nombre: string; url_foto: string } | null> = {};
    for (const [slotId, player] of Object.entries(equipoArmado)) {
      if (player) {
        slots[slotId] = { id: player.id, nombre: player.nombre, url_foto: player.url_foto };
      } else {
        slots[slotId] = null;
      }
    }

    const resultado: ResultadoGuardado = {
      dia: new Date().toISOString().split('T')[0],
      estado: estadoJuego,
      idsAcertados: idsUsados.size,
      formacion: data.formacion,
      slots,
      ordenEquipos: [...ordenEquipos],
      turnoActual
    };

    localStorage.setItem(RESULTADO_KEY, JSON.stringify(resultado));
    localStorage.removeItem(STORAGE_KEY);

    setMostrarModal(true);
  }, [estadoJuego]);

  // --- LÓGICA DE JUEGO ---

  const colocarJugadorEnSlot = (jugador: Jugador, slotId: number) => {
    setEquipoArmado(prev => ({ ...prev, [slotId]: jugador }));
    setIdsUsados(prev => new Set(prev).add(jugador.id));
    setJugadorPendiente(null);
    setPosicionesDisponibles([]);
    setPosicionElegida(null);
    setBuscadorKey(prev => prev + 1);
    setErrorMsg(null);

    if (turnoActual >= 10) {
        setEstadoJuego('ganado');
    } else {
        setTurnoActual(prev => prev + 1);
    }
  };

  const handleJugadorSeleccionado = (jugador: Jugador) => {
    if (modoRevision) return;
    setErrorMsg(null);
    setPosicionElegida(null);

    if (idsUsados.has(jugador.id)) {
        setErrorMsg(`El jugador ${jugador.nombre} ya ha sido seleccionado.`);
        return;
    }

    const equipoEsperadoId = ordenEquipos[turnoActual];
    const jugoEnElEquipo = jugador.equiposJugados.some(hist => hist.id_equipo === equipoEsperadoId);

    if (!jugoEnElEquipo) {
        const nombreEquipo = NOMBRES_EQUIPOS[equipoEsperadoId] || 'el equipo correspondiente';
        setErrorMsg(`El jugador ${jugador.nombre} no ha jugado en ${nombreEquipo}.`);
        return;
    }

    const formacionActual = COORDENADAS[data!.formacion];
    const todasLasPosiciones: number[] = [];

    for (const slot of formacionActual) {
        if (jugadorJuegaEnPosicion(jugador, slot.rol)) {
            todasLasPosiciones.push(slot.id);
        }
    }

    if (todasLasPosiciones.length === 0) {
        setErrorMsg(`El jugador ${jugador.nombre} no juega en ninguna posición de la formación (${data!.formacion}).`);
        return;
    }

    const posicionesLibres = todasLasPosiciones.filter(slotId => !equipoArmado[slotId]);

    if (posicionesLibres.length === 0) {
        setErrorMsg(`Todas las posiciones donde juega ${jugador.nombre} ya están cubiertas.`);
        return;
    }

    const rolesUnicos: string[] = [];
    const primerSlotPorRol: Record<string, number> = {};

    for (const slotId of posicionesLibres) {
        const rol = formacionActual.find(p => p.id === slotId)?.rol || '';
        if (!rolesUnicos.includes(rol)) {
            rolesUnicos.push(rol);
            primerSlotPorRol[rol] = slotId;
        }
    }

    if (rolesUnicos.length === 1) {
        colocarJugadorEnSlot(jugador, primerSlotPorRol[rolesUnicos[0]]);
        return;
    }

    setJugadorPendiente(jugador);
    setPosicionesDisponibles(rolesUnicos.map(rol => primerSlotPorRol[rol]));
  };

  const handleColocarJugador = () => {
    if (!jugadorPendiente || posicionElegida === null) return;
    setErrorMsg(null);
    colocarJugadorEnSlot(jugadorPendiente, posicionElegida);
  };

  const handleRendirse = () => {
    reiniciarJuegoTotalmente();
    setEstadoJuego('perdido');
  };

  const reiniciarJuegoTotalmente = () => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('nuevoOnce_dificultad');
      localStorage.removeItem('nuevoOnce_tiempo');
      localStorage.removeItem('nuevoOnce_formacion');
      localStorage.removeItem('nuevoOnce_iniciado');
  };

  const volver = () => {
    reiniciarJuegoTotalmente();
    window.location.reload();
  }

  // --- RENDERIZADO ---
  if (cargando || !data) return <Spinner size="lg" mensaje="Cargando partida..." />;

  const formacionActual = COORDENADAS[data.formacion] || [];
  const idEquipoActual = ordenEquipos[turnoActual];

  const formatoTiempo = (segundos: number) => {
      if (data.tiempo === 0) return "∞";
      const min = Math.floor(segundos / 60);
      const sec = segundos % 60;
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const esJuegoTerminado = estadoJuego !== 'jugando';

  return (
    <>
    <div className="juego-container fade-in">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">

          <div className="col-11 col-lg-6 contenedor-juego">

          {/* 1. INFORMACIÓN SUPERIOR: Formación + Tiempo */}
          <div className="info-superior contenedor-informacion">
            <div className="row justify-content-evenly align-items-center">
              <div className="col-5 text-center">
                <p className='texto-titulo-informacion'>Formación:</p>
                <span className='texto-informacion'>{data.formacion}</span>
              </div>
              <div className="col-5 text-center">
                <p className='texto-titulo-informacion'>Tiempo restante:</p>
                <span 
                    className='texto-informacion'
                    style={{ 
                        color: (data.tiempo > 0 && tiempoRestante <= 10) ? '#ef4444' : 'white',
                        fontSize: '1.2rem'
                    }}
                >
                    ️ {formatoTiempo(tiempoRestante)}
                </span>
              </div>
            </div>
          </div>

          {/* 2. CAMPO DE FÚTBOL (solo visual) */}
          <div className="cancha-wrapper">
            <div className="cancha">
              {formacionActual.map((pos) => {
                  const jugadorEnPosicion = equipoArmado[pos.id];
              
                  return (
                    <div
                      key={pos.id}
                      className={`jugador-slot ${jugadorEnPosicion ? 'ocupado' : ''}`}
                      style={{ top: pos.top, left: pos.left }}
                    >
                      {jugadorEnPosicion ? (
                        <img 
                          src={jugadorEnPosicion.url_foto} 
                          alt={jugadorEnPosicion.nombre}
                          className="img-jugador-cancha"
                        />
                      ) : (
                        <div className="icono-mas">?</div>
                      )}

                      <span className="rol-texto">
                          {jugadorEnPosicion ? jugadorEnPosicion.nombre.split(' ')[0] : pos.rol}
                      </span>
                    </div>
                  );
              })}
            </div>
          </div>

          {/* ALERTA DE ERROR */}
          {errorMsg && (
            <div className="alerta-error-row">
              <div className='contenedor-alerta-fallo'>
                 ⚠️ {errorMsg}
              </div>
            </div>
          )}

          {/* 3 + 4: TURNO (IZQ) + BUSCADOR (DER) */}
          <div className="turno-buscador-row">
            <div className="row align-items-start">
              <div className="col-12 col-lg-5 turno-banner-wrapper">
                <div className="turno-banner">
                    <p className="turno-texto">
                        Turno {turnoActual + 1} / 11
                    </p>
                    <div className="turno-equipo-row">
                      <img 
                        src={IMAGENES_EQUIPOS[idEquipoActual!]}
                        alt={NOMBRES_EQUIPOS[idEquipoActual!]}
                        className="turno-escudo"
                      />
                      <p className="turno-nombre-equipo">
                        {NOMBRES_EQUIPOS[idEquipoActual!]}
                      </p>
                    </div>
                    <p className="turno-instruccion">
                        Coloca un jugador de este equipo.
                    </p>
                </div>
              </div>

              <div className="col-12 col-lg-7 panel-seleccion-container">

                {!modoRevision && (
                  <>
                    <div className="col-12">
                      <Buscador onJugadorSeleccionado={handleJugadorSeleccionado} key={buscadorKey} />
                    </div>

                    {jugadorPendiente && posicionesDisponibles.length > 1 && (
                      <div className="position-picker">
                        <div className="picker-options">
                          {posicionesDisponibles.map((slotId) => {
                            const rol = formacionActual.find(p => p.id === slotId)?.rol || '';
                            return (
                              <label key={slotId} className="picker-option">
                                <input
                                  type="radio"
                                  name="posicion-picker"
                                  value={slotId}
                                  checked={posicionElegida === slotId}
                                  onChange={() => setPosicionElegida(slotId)}
                                />
                                <span>{rol}</span>
                              </label>
                            );
                          })}
                        </div>
                        <button
                          className="btn-colocar"
                          onClick={handleColocarJugador}
                          disabled={posicionElegida === null}
                        >
                          Colocar
                        </button>
                      </div>
                    )}

                    <div className="text-center mt-2">
                      <button 
                          className="btn btn-danger btn-sm btn-rendirse"
                          onClick={handleRendirse}
                      >
                          ️ 🏳️ Rendirse
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          </div>

        </div>
      </div>
    </div>

    {/* MODAL DE RESULTADO */}
    {mostrarModal && (
      <div className="modal-overlay">
        <div className="modal-contenido">
          <h1 
            className='texto-estado-juego' 
            style={{ color: estadoJuego === 'ganado' ? '#22c55e' : '#ef4444' }}
          >
            {estadoJuego === 'ganado' ? '¡VICTORIA!' : 'JUEGO TERMINADO'}
          </h1>
          
          <p className='texto-explicacion-estado'>
            {estadoJuego === 'ganado' 
                ? 'Has completado el once ideal correctamente.' 
                : 'No lograste completar el equipo a tiempo o te rendiste.'}
          </p>

          <div className="modal-stats">
            <p className='texto-explicacion-estado'>Jugadores acertados: {idsUsados.size} / 11</p>
          </div>

          {modoRevision ? (
            <button 
                className="btn-modal btn-modal-volver"
                onClick={() => window.location.reload()}
            >
                Volver al Menú
            </button>
          ) : (
            <button 
                className="btn-modal btn-modal-jugar"
                onClick={volver}
            >
                Jugar de Nuevo
            </button>
          )}
        </div>
      </div>
    )}

    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-10 col-lg-8 contenedor-descripcion-minijuego">

          <div className="row justify-content-center align-items-center">

              <div className="col-10 col-lg-10">
                <h2 className='titulo-descripcion-minijuego'>El Nuevo Once: Para el Hincha de Verdad</h2>
              </div>

              <div className="col-11 col-lg-10">
                <p className="texto-descripcion-minijuego">
                  ¿Crees que conoces la <strong>Liga 1</strong> a fondo? <strong>El Nuevo Once</strong> no es para aficionados casuales; es el reto definitivo para el verdadero conocedor del fútbol peruano. El juego te pondrá a prueba turno a turno: aparecerán los escudos de <strong>11 equipos históricos</strong> que pasaron por la <strong>Primera División entre 2010 y 2026</strong>, y tu misión es elegir a <strong>un solo jugador por cada club</strong>. Pero cuidado, no basta con recordar nombres al azar: deberás encajar a cada futbolista en su <strong>posición correcta sobre el campo</strong> para completar una formación táctica válida. ¿Serás capaz de recordar a ese lateral izquierdo que brilló en provincia o al portero que fue muralla en un equipo que ya no está en Primera? Arma tu equipo, respeta las posiciones y demuestra que eres <strong>el estratega que más sabe de nuestra bendita liga.</strong>
                </p>
              </div>

          </div>

        </div>
      </div>
    </div>
    </>
  );
}
