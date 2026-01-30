import { useState, useEffect } from 'react';
import Buscador from '../../../buscador';
import Equipos from '../../../../data/minijuegos/equipos.json'; 
import type { Jugador } from '../../../../types/minijuegos/jugador.interface';
import './styles.css';

// --- CONSTANTES Y CONFIGURACIÓN ---

const STORAGE_KEY = 'elOnceActualidad_partidaGuardada';

// Obtener IDs de todos los equipos actuales (mediante su campo que indica su division)
const EquiposActuales = Equipos.filter(e => e.divisionActual === 1);

const nombresEquiposActuales : Record<string, number> = {
  "Atlético Grau": 35,
  "Alianza Lima": 1,
  "Alianza Atl.": 11,
  "AD Tarma": 37,
  "Cienciano": 6,
  "Comerciantes": 27,
  "Cusco FC": 19,
  "Dep. Garcilaso": 38,
  "Dep. Moquegua": 41,
  "FBC Melgar": 4,
  "FC Cajamarca": 42,
  "Juan Pablo II": 40,
  "Los Chankas": 39,
  "Sport Boys": 5,
  "Sport Huancayo": 10,
  "Sport. Cristal": 3,
  "Universitario": 2,
  "UTC": 21
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

export default function JuegoElOnceActualidad() {
  // --- ESTADOS ---
  const [data, setData] = useState<GameState | null>(null);
  const [cargando, setCargando] = useState(true);

  // Estado del Tablero
  const [equipoArmado, setEquipoArmado] = useState<Record<number, Jugador | null>>({});
  const [slotSeleccionado, setSlotSeleccionado] = useState<number | null>(null);
  const [idsUsados, setIdsUsados] = useState<Set<number>>(new Set());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Lógica de Juego
  const [ordenEquipos, setOrdenEquipos] = useState<number[]>([]);
  const [turnoActual, setTurnoActual] = useState<number>(0);
  const [tiempoRestante, setTiempoRestante] = useState<number>(0);
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>('jugando');

  // --- 1. CARGA INICIAL (RECUPERAR O INICIAR NUEVO) ---
  useEffect(() => {
    // A) Intentar recuperar partida guardada
    const partidaGuardada = localStorage.getItem(STORAGE_KEY);
    
    if (partidaGuardada) {
        try {
            const parsed = JSON.parse(partidaGuardada);
            
            // Solo recuperamos si el juego guardado estaba en progreso ('jugando')
            // Si estaba terminado, preferimos iniciar uno nuevo (o podrías mostrar el resultado anterior)
            if (parsed.estadoJuego === 'jugando') {
                console.log("🔄 Partida recuperada del almacenamiento.");
                setData(parsed.data);
                setEquipoArmado(parsed.equipoArmado);
                setOrdenEquipos(parsed.ordenEquipos);
                setTurnoActual(parsed.turnoActual);
                setTiempoRestante(parsed.tiempoRestante);
                setEstadoJuego(parsed.estadoJuego);
                
                // ¡IMPORTANTE! JSON transforma Sets en Arrays, hay que reconvertirlo
                setIdsUsados(new Set(parsed.idsUsados));
                
                setCargando(false);
                return; // Salimos para no ejecutar la lógica de "Juego Nuevo"
            }
        } catch (error) {
            console.error("Error al leer partida guardada, reiniciando...", error);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // B) Iniciar Juego Nuevo (si no había nada guardado o estaba corrupto)
    const timer = setTimeout(() => {
        const dif = localStorage.getItem('elOnceActualidad_dificultad');
        const time = localStorage.getItem('elOnceActualidad_tiempo');
        const form = localStorage.getItem('elOnceActualidad_formacion');
        
        //if (dif && time && form) {
        //    const tiempoNum = Number(time);
        //    setData({ dificultad: Number(dif), tiempo: tiempoNum, formacion: form });
        //    setTiempoRestante(tiempoNum);
        //}

        if (time && form) {
            const tiempoNum = Number(time);
            setData({ dificultad: Number(dif), tiempo: tiempoNum, formacion: form });
            setTiempoRestante(tiempoNum);
        }

        // Generar 11 equipos aleatorios únicos entre los 18 equipos de la Liga 1 2026
        const idsDisponibles = EquiposActuales.map(e => e.id);
        const equiposMezclados = idsDisponibles.sort(() => 0.5 - Math.random());
        setOrdenEquipos(equiposMezclados.slice(0, 11));
        
        setCargando(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // --- 2. PERSISTENCIA (GUARDADO AUTOMÁTICO) ---
  useEffect(() => {
      // No guardamos si no hay datos o estamos cargando
      if (cargando || !data) return;

      const estadoSnapshot = {
          data,
          equipoArmado,
          ordenEquipos,
          turnoActual,
          tiempoRestante,
          estadoJuego,
          // Convertimos el Set a Array para poder guardarlo en JSON
          idsUsados: Array.from(idsUsados)
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoSnapshot));

  }, [data, equipoArmado, ordenEquipos, turnoActual, tiempoRestante, estadoJuego, idsUsados, cargando]);

  // --- 3. CRONÓMETRO ---
  useEffect(() => {
    if (!data || data.tiempo === 0 || estadoJuego !== 'jugando') return;

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
  }, [data, estadoJuego]);

  // --- LÓGICA DE JUEGO ---

  const agregarJugadorAlEquipo = (jugador: Jugador) => {
    if (slotSeleccionado === null) return;
    setErrorMsg(null);

    // 1. Validar Club Actual
    const equipoEsperadoId = ordenEquipos[turnoActual];

    // Buscamos si el club actual del jugador esta en el listado de nombres de equipos actuales
    const idEquipoActual = nombresEquiposActuales[jugador.clubActual];

    if (!idEquipoActual) {
        setErrorMsg(`El jugador ${jugador.nombre} no juega en la Liga 1 actualmente.`);
        return;
    }

    if (idEquipoActual !== equipoEsperadoId) {
        const nombreEquipo = NOMBRES_EQUIPOS[equipoEsperadoId] || 'el equipo correspondiente';
        setErrorMsg(`El jugador ${jugador.nombre} no juega en ${nombreEquipo}.`);
        return;
    }

    // 2. Validar Duplicado
    if (idsUsados.has(jugador.id)) {
        setErrorMsg(`El jugador ${jugador.nombre} ya ha sido seleccionado.`);
        return;
    }

    // 3. Validar Posición
    const formacionActual = COORDENADAS[data!.formacion];
    const posicionSlot = formacionActual.find(p => p.id === slotSeleccionado);
    const rolSeleccionado = posicionSlot?.rol;
    const posicionesValidas = MAPA_POSICIONES[rolSeleccionado || ''] || [];

    const esPosicionValida = 
        posicionesValidas.includes(jugador.posicionPrincipal) || 
        jugador.posicionesSecundarias.some(pos => posicionesValidas.includes(pos));

    if (!esPosicionValida) {
        setErrorMsg(`El jugador ${jugador.nombre} no juega como ${rolSeleccionado}.`);
        return;
    }

    // --- ÉXITO ---
    setEquipoArmado(prev => ({ ...prev, [slotSeleccionado]: jugador }));
    setIdsUsados(prev => new Set(prev).add(jugador.id));
    
    setSlotSeleccionado(null);
    setErrorMsg(null);

    // Verificar Victoria
    if (turnoActual >= 10) {
        setEstadoJuego('ganado');
    } else {
        setTurnoActual(prev => prev + 1);
    }
  };

  const handleRendirse = () => {
      setEstadoJuego('perdido');
  };

  // FUNCIÓN PARA REINICIAR Y VOLVER AL MENÚ
  const reiniciarJuegoTotalmente = () => {
      // 1. Borrar snapshot de la partida
      localStorage.removeItem(STORAGE_KEY);
      
      // 2. Borrar configuración inicial para que MenuOnce muestre el form
      localStorage.removeItem('elOnceActualidad_dificultad');
      localStorage.removeItem('elOnceActualidad_tiempo');
      localStorage.removeItem('elOnceActualidad_formacion');
      localStorage.removeItem('juegoIniciadoElOnceActualidad');

      // 3. Recargar página para limpiar estado de React y volver al inicio
      window.location.reload();
  };

  // --- RENDERIZADO: PANTALLA FIN DE JUEGO ---
  if (estadoJuego !== 'jugando') {
      return (
          <div className="juego-container fade-in d-flex justify-content-center align-items-center">
              <div className="text-center contenedor-menu-fin" style={{ border: `2px solid ${estadoJuego === 'ganado' ? '#22c55e' : '#ef4444'}` }}>
                  <h1 className='texto-estado-juego' style={{ color: estadoJuego === 'ganado' ? '#22c55e' : '#ef4444' }}>
                      {estadoJuego === 'ganado' ? '¡VICTORIA!' : 'JUEGO TERMINADO'}
                  </h1>
                  
                  <p className='texto-explicacion-estado'>
                      {estadoJuego === 'ganado' 
                          ? 'Has completado el once de la actualidad correctamente.' 
                          : 'No lograste completar el equipo a tiempo o te rendiste.'}
                  </p>

                  <div style={{ marginTop: '30px' }}>
                      <p className='texto-explicacion-estado'>Jugadores acertados: {idsUsados.size} / 11</p>
                      
                      <button 
                          className="btn btn-primary mt-3"
                          onClick={reiniciarJuegoTotalmente} // Llama a la limpieza total
                      >
                          Jugar de Nuevo
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  // --- RENDERIZADO: JUEGO ACTIVO ---
  if (cargando || !data) return <div className='texto-cargando'>Cargando...</div>;

  const posiciones = COORDENADAS[data.formacion] || [];
  const rolSeleccionado = posiciones.find(p => p.id === slotSeleccionado)?.rol;
  const idEquipoActual = ordenEquipos[turnoActual];

  // Helper Tiempo
  const formatoTiempo = (segundos: number) => {
      if (data.tiempo === 0) return "∞";
      const min = Math.floor(segundos / 60);
      const sec = segundos % 60;
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (

    <>
    <div className="juego-container fade-in">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">

          <div className="col-10 col-lg-8 contenedor-juego">

          <div className="row justify-content-center align-items-center">

          {/* COLUMNA IZQUIERDA: PANELES */}
          <div className="col-11 col-lg-6">
            <div className="row justify-content-center align-items-center">
              
              <div className="col-8 contenedor-informacion">

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
                        ⏱️ {formatoTiempo(tiempoRestante)}
                    </span>
                  </div>
                </div>

              </div>

              {/* Banner de Turno */}
              <div className="col-10 d-flex justify-content-center mt-3">
                  <div className="turno-banner">
                      <p className="turno-texto">
                          Turno {turnoActual + 1} / 11
                      </p>

                      <div className="container-fluid">
                        <div className="row align-items-center justify-content-center">

                          <div className="col-3">
                            <img 
                              src={IMAGENES_EQUIPOS[idEquipoActual!]}
                              alt={NOMBRES_EQUIPOS[idEquipoActual!]}
                              style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '5px', borderRadius: '5px', border: '2px solid white', backgroundColor: 'white' }}
                              className='img-fluid'
                            />
                          </div>

                          <div className="col-7">
                            <p className="turno-nombre-equipo">
                              {NOMBRES_EQUIPOS[idEquipoActual!]}
                            </p>
                          </div>

                        </div>
                      </div>
                      <p className="turno-instruccion">
                          Coloca un jugador retirado de este equipo en cualquier posición libre.
                      </p>
                  </div>
              </div>

              {/* Panel Buscador / Selección */}
              <div className="col-10 panel-seleccion-container">
                {slotSeleccionado ? (
                    <div className="panel-seleccion w-100">
                        <div className="row">
                            <div className="col-12 text-center contenedor-titulo-seleccion">
                                <span className="texto-posicion">Posición: <strong>{rolSeleccionado}</strong></span>
                            </div>

                            {errorMsg && (
                              <div className="col-12 text-center" style={{ margin: '10px 0' }}>
                                <div className='contenedor-alerta-fallo'>
                                   ⚠️ {errorMsg}
                                </div>
                              </div>
                            )}

                            <div className="col-12">
                              <Buscador onJugadorSeleccionado={agregarJugadorAlEquipo} key={slotSeleccionado} />
                            </div>

                            <div className="col-12 text-center contenedor-botones-seleccion">
                              <button 
                                onClick={() => {
                                  setSlotSeleccionado(null);
                                  setErrorMsg(null);
                                }}
                                className='boton-cancelar-seleccion'
                              >
                                Cancelar selección
                              </button>
                              <button 
                                  className="btn btn-danger btn-sm mt-2 btn-rendirse"
                                  onClick={handleRendirse}
                              >
                                  🏳️ Rendirse
                              </button>
                            </div>
                        </div>
                    </div>
                ) : (
                  <div className='text-center contenedor-orientativo'>
                      <p className='texto-orientacion'>
                          Selecciona una posición vacía (+) para agregar al jugador retirado.
                      </p>
                      <button 
                          className="btn btn-danger btn-sm mt-2 btn-rendirse"
                          onClick={handleRendirse}
                      >
                          🏳️ Rendirse
                      </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: CANCHA */}
          <div className="col-11 col-lg-6">
            <div className="cancha">
              {posiciones.map((pos) => {
                  const jugadorEnPosicion = equipoArmado[pos.id];
                  const esElSeleccionado = slotSeleccionado === pos.id;
              
                  return (
                    <div
                      key={pos.id}
                      className={`jugador-slot ${esElSeleccionado ? 'slot-activo' : ''} ${jugadorEnPosicion ? 'ocupado' : ''}`}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => {
                        if (jugadorEnPosicion) return;
                        setSlotSeleccionado(pos.id);
                        setErrorMsg(null);
                      }}
                    >
                      {jugadorEnPosicion ? (
                        <img 
                          src={jugadorEnPosicion.url_foto} 
                          alt={jugadorEnPosicion.nombre}
                          className="img-jugador-cancha"
                        />
                      ) : (
                        <div className="icono-mas">+</div>
                      )}

                      <span className="rol-texto">
                          {jugadorEnPosicion ? jugadorEnPosicion.nombre.split(' ')[0] : pos.rol}
                      </span>
                    </div>
                  );
              })}
            </div>
          </div>

          </div>

          </div>

        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-10 col-lg-8 contenedor-descripcion-minijuego">

          <div className="row justify-content-center align-items-center">

              <div className="col-10 col-lg-10">
                <h2 className='titulo-descripcion-minijuego'>El Once - Actualidad: Escribe la Historia de Hoy</h2>
              </div>

              <div className="col-11 col-lg-10">
                <p className="texto-descripcion-minijuego">
                  El fútbol no se detiene y la <strong>Liga 1 2026</strong> ya está escribiendo sus propios mitos. En este modo, el reto es demostrar que estás conectado con lo que pasa cada fin de semana en las canchas de nuestro país. Aquí la moneda de cambio es la <strong>actualidad</strong>: desde los refuerzos que llegaron con cartel de figuras hasta los juveniles que están dando el salto este año. El cronómetro corre y los escudos de los equipos actuales te desafían a elegir con precisión quirúrgica. Debes armar tu esquema táctico seleccionando un jugador vigente por club, asegurándote de que cada pieza encaje perfectamente en su rol sobre el césped. Olvida el pasado por un momento y enfócate en el rendimiento, los fichajes y el momento de forma de los protagonistas. Es hora de demostrar que tienes <strong>el análisis más afinado del fútbol peruano hoy.</strong>
                </p>
              </div>

          </div>

        </div>
      </div>
    </div>
    </>
  );
}