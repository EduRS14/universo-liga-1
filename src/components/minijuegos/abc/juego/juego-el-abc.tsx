// src/components/ElABC.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { buscarPorApellido, obtenerStringApellidos } from '../../../../utils/minijuegos/el-abc/logica';
import type { Equipo } from '../../../../types/minijuegos/equipo';
import type { Jugador } from '../../../../types/minijuegos/jugador.interface';
import Spinner from '../../Spinner';
import { ModalSeleccion } from './Modal';
import './styles.css';

// Props que recibe la Isla desde Astro
interface ElABCProps {
  todosLosEquipos: Equipo[];
  todosLosJugadores: Jugador[];
  dificultad: 'facil' | 'intermedio' | 'dificil';
}

// Interfaz para guardar el estado completo en LocalStorage
interface EstadoPartida {
  indice: number;
  puntaje: number;
  saltos: number;
  estado: 'jugando' | 'ganado' | 'perdido';
  secuenciaIds: number[]; 
}

const ALFABETO: string[] = "ABCDEFGHIJLMNOPQRSTUVZ".split('');
const STORAGE_KEY = 'elABC_sesion_v2'; 

const MAX_MULTIPLICADOR = {
  facil: 1.5,
  intermedio: 2.0,
  dificil: Infinity,
};

export const JuegoElABC: React.FC<ElABCProps> = ({ todosLosEquipos, todosLosJugadores, dificultad }) => {
  // ESTADOS VISUALES
  const [cargando, setCargando] = useState<boolean>(true);
  const [indiceLetra, setIndiceLetra] = useState<number>(0);
  const [secuenciaEquipos, setSecuenciaEquipos] = useState<Equipo[]>([]);
  const [puntaje, setPuntaje] = useState<number>(0);
  const [saltosDisponibles, setSaltosDisponibles] = useState<number>(3);
  const [estadoJuego, setEstadoJuego] = useState<'jugando' | 'ganado' | 'perdido'>('jugando');

  // INPUT Y FEEDBACK
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // ESTADO DE BLOQUEO (Nuevo)
  // Evita interacciones mientras se muestra la animación/mensaje de éxito o salto
  const [procesando, setProcesando] = useState<boolean>(false);

  // MODAL
  const [candidatos, setCandidatos] = useState<Jugador[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Derivado
  const letraActual = ALFABETO[indiceLetra];
  const equipoActual = secuenciaEquipos[indiceLetra] || null;

  // --------------------------------------------------------------------------
  // 1. OPTIMIZACIÓN (useMemo)
  // --------------------------------------------------------------------------
  const mapaLetrasEquipos = useMemo(() => {
    const mapa: Record<string, Set<number>> = {};
    ALFABETO.forEach(l => mapa[l] = new Set());

    todosLosJugadores.forEach(jugador => {
      const apellidos = obtenerStringApellidos(jugador.nombre);
      if (!apellidos) return;
      const inicial = apellidos.charAt(0).toUpperCase();

      if (mapa[inicial]) {
        jugador.equiposJugados.forEach(e => {
          const id = typeof e === 'number' ? e : ((e as any).id_equipo || (e as any).equipoId || (e as any).id);
          if (id) mapa[inicial].add(Number(id));
        });
      }
    });
    return mapa;
  }, [todosLosJugadores]);

  // --------------------------------------------------------------------------
  // 2. LÓGICA DE GENERACIÓN Y PERSISTENCIA
  // --------------------------------------------------------------------------

  const guardarProgreso = (datos: Partial<EstadoPartida>) => {
    const actualRaw = localStorage.getItem(STORAGE_KEY);
    const actual = actualRaw ? JSON.parse(actualRaw) : {};
    const nuevoEstado = { ...actual, ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoEstado));
  };

  const iniciarNuevaPartida = useCallback(() => {
    const maxMult = MAX_MULTIPLICADOR[dificultad];
    const nuevaSecuencia = ALFABETO.map((letra) => {
      const idsValidosSet = mapaLetrasEquipos[letra];
      const equiposCandidatos = Array.from(idsValidosSet)
        .map(id => todosLosEquipos.find(e => e.id === id))
        .filter(e => e !== undefined && e.multiplicador <= maxMult) as Equipo[];

      if (equiposCandidatos.length === 0) {
        const equiposFiltrados = todosLosEquipos.filter(e => e.multiplicador <= maxMult);
        const fallback = equiposFiltrados.length > 0 ? equiposFiltrados : todosLosEquipos;
        const randomFallback = Math.floor(Math.random() * fallback.length);
        return fallback[randomFallback];
      }

      const randomIndex = Math.floor(Math.random() * equiposCandidatos.length);
      return equiposCandidatos[randomIndex];
    });

    const estadoInicial: EstadoPartida = {
      indice: 0,
      puntaje: 0,
      saltos: 3,
      estado: 'jugando',
      secuenciaIds: nuevaSecuencia.map(e => e.id)
    };

    setSecuenciaEquipos(nuevaSecuencia);
    setIndiceLetra(0);
    setPuntaje(0);
    setSaltosDisponibles(3);
    setEstadoJuego('jugando');
    setProcesando(false); // Aseguramos que inicie desbloqueado
    guardarProgreso(estadoInicial);
  }, [todosLosEquipos, mapaLetrasEquipos, dificultad]);

  useEffect(() => {
    const partidaGuardada = localStorage.getItem(STORAGE_KEY);
    if (partidaGuardada) {
      try {
        const datos: EstadoPartida = JSON.parse(partidaGuardada);
        const secuenciaReconstruida = datos.secuenciaIds.map(id => 
          todosLosEquipos.find(e => e.id === id) || todosLosEquipos[0]
        );
        setIndiceLetra(datos.indice);
        setPuntaje(datos.puntaje);
        setSaltosDisponibles(datos.saltos);
        setEstadoJuego(datos.estado);
        setSecuenciaEquipos(secuenciaReconstruida);
      } catch (e) {
        iniciarNuevaPartida();
      }
    } else {
      iniciarNuevaPartida();
    }
    setCargando(false);
  }, [iniciarNuevaPartida, todosLosEquipos]);

  // --------------------------------------------------------------------------
  // 3. HANDLERS
  // --------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Bloqueamos Enter si está procesando
    if (procesando) return;
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    if (procesando || !inputValue.trim()) return;

    const encontrados = buscarPorApellido(inputValue, todosLosJugadores, letraActual);

    if (encontrados.length === 0) {
      setErrorMsg(`No encontramos apellido "${inputValue}" con letra ${letraActual}.`);
      return;
    }

    if (encontrados.length === 1) {
      validarJugador(encontrados[0]);
    } else {
      setCandidatos(encontrados);
      setShowModal(true);
      setErrorMsg(null);
    }
  };

  const validarJugador = (jugador: Jugador) => {
    if (!equipoActual) return;

    setShowModal(false);
    
    const jugoEnEquipo = jugador.equiposJugados.some((e) =>
      typeof e === 'number'
        ? e === equipoActual.id
        : (e.id_equipo === equipoActual.id || (e as any).id_equipo === equipoActual.id || (e as any).equipoId === equipoActual.id)
    );

    if (jugoEnEquipo) {
      // 1. Bloqueamos la UI inmediatamente
      setProcesando(true);
      
      const puntosGanados = Math.round(100 * equipoActual.multiplicador);
      const nuevoPuntaje = puntaje + puntosGanados;
      
      setPuntaje(nuevoPuntaje);
      setErrorMsg(`¡CORRECTO! ${jugador.nombre} jugó en ${equipoActual.nombre}. (+${puntosGanados} pts)`);
      guardarProgreso({ puntaje: nuevoPuntaje });

      setTimeout(() => {
        avanzarJuego();
      }, 1500);

    } else {
      // Si falla, NO bloqueamos, dejamos que intente de nuevo
      setErrorMsg(`INCORRECTO. ${jugador.nombre} no figura en ${equipoActual.nombre}.`);
    }
  };

  const handleSaltarEquipo = () => {
    // Si ya está procesando o no hay saltos, no hacemos nada
    if (procesando || saltosDisponibles <= 0) return;

    if (saltosDisponibles <= 0) {
      setErrorMsg('No te quedan saltos disponibles.');
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }

    // 1. Bloqueamos UI
    setProcesando(true);

    const nuevosSaltos = saltosDisponibles - 1;
    setSaltosDisponibles(nuevosSaltos);
    guardarProgreso({ saltos: nuevosSaltos });

    setErrorMsg(`Saltaste este equipo. Te quedan ${nuevosSaltos} saltos.`);
    
    setTimeout(() => {
      avanzarJuego();
    }, 1500);
  };

  const avanzarJuego = () => {
    const siguienteIndice = indiceLetra + 1;

    setInputValue('');
    setErrorMsg(null);
    
    if (siguienteIndice >= ALFABETO.length) {
      setEstadoJuego('ganado');
      setIndiceLetra(siguienteIndice);
      guardarProgreso({ indice: siguienteIndice, estado: 'ganado' });
    } else {
      setIndiceLetra(siguienteIndice);
      guardarProgreso({ indice: siguienteIndice });
    }
    
    // IMPORTANTE: Liberamos la UI para el siguiente turno
    setProcesando(false);
  };

  const handleRendirse = () => {
    if (procesando) return;
    setEstadoJuego('perdido');
    guardarProgreso({ estado: 'perdido' });
  };

  const volver = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('juegoIniciadoElABC');
    window.location.reload();
  };

  const getColorDificultad = (multiplicador: number): string => {
    if (multiplicador >= 3) return '#fbbf24';
    if (multiplicador >= 1.5) return '#d946ef';
    return '#0ea5e9';
  };

  // --------------------------------------------------------------------------
  // 4. RENDER
  // --------------------------------------------------------------------------

  if (cargando) return <Spinner size="lg" mensaje="Cargando partida..." />;

  if (estadoJuego !== 'jugando') {
    return (
      <div className="juego-container fade-in d-flex justify-content-center align-items-center">
        <div className="text-center contenedor-menu-fin" style={{ border: `2px solid ${estadoJuego === 'ganado' ? '#22c55e' : '#ef4444'}` }}>
          <h1 className='texto-estado-juego' style={{ color: estadoJuego === 'ganado' ? '#22c55e' : '#ef4444' }}>
            {estadoJuego === 'ganado' ? '¡VICTORIA!' : 'JUEGO TERMINADO'}
          </h1>
          
          <p className='texto-explicacion-estado'>
            {estadoJuego === 'ganado'
              ? `¡Fin del Reto! Puntaje Final: ${puntaje}` 
              : 'Has decidido rendirte.'}
          </p>

          <div style={{ marginTop: '30px' }}>
            {
              estadoJuego === 'ganado' ? (
                <p className='texto-explicacion-estado'>¡Lograste completar el reto!</p>
              ) :
              <p className='texto-explicacion-estado'>Lograste llegar hasta la "{ALFABETO[indiceLetra]}"</p>
            }
            
            <button 
              className="btn btn-primary mt-3"
              onClick={volver}
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!equipoActual) return <Spinner size="md" mensaje="Generando desafío..." />;

  const colorActual = getColorDificultad(equipoActual.multiplicador);

  return (
    <div className="abc-container">
      <div className="reto-header">
        <div className="badge-puntaje">PTS: {puntaje}</div>
        <div className="badge-progreso">LETRA: {indiceLetra + 1} / {ALFABETO.length}</div>
      </div>

      <div className="reto-card" style={{ '--glow-color': colorActual } as React.CSSProperties}>
        <div className="letra-grande">{letraActual}</div>
        <div className="contenedor-equipo">
          <img 
            src={equipoActual.url_foto} 
            alt={equipoActual.nombre} 
            className="equipo-escudo" 
          />
          <div className="equipo-nombre">{equipoActual.nombre}</div>
        </div>
        
        <div className="badge-dificultad">
          {equipoActual.multiplicador >= 3 ? '🐐 MUY DIFÍCIL (x3)' 
          : equipoActual.multiplicador >= 2.0 ? "🔥 DIFÍCIL (x2.0)"
          : equipoActual.multiplicador >= 1.5  ? "⚡ MEDIO (x1.5)" 
          : '🌟 FÁCIL (x1.0)'}
        </div>
      </div>

      <div className="contenedor-input-area">
        <div className="row justify-content-evenly align-items-center">

          <div className="col-8 col-lg-5 d-flex justify-content-center">
            <input 
              type="text" 
              className="input-apellido"
              placeholder={`Apellido con ${letraActual}...`}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={procesando} /* AQUÍ BLOQUEAMOS EL INPUT */
            />
          </div>

          <div className="col-4 col-lg-3">
            <button 
              className="btn-enviar" 
              onClick={handleSubmit}
              disabled={procesando} /* BLOQUEADO AL PROCESAR */
            >
              VERIFICAR
            </button>
          </div>

          {errorMsg && (
            <div className="col-12 d-block d-lg-none">
              <div className="feedback-msg">
                {errorMsg}
              </div>
            </div>
          )}

          <div className="col-6 col-lg-2">
            <button 
              className="btn-rendirse" 
              onClick={handleSaltarEquipo} 
              /* Deshabilitado si: 1. Está procesando OR 2. No hay saltos */
              disabled={procesando || saltosDisponibles === 0}
            >
              🚩 SALTAR ({saltosDisponibles})
            </button>
          </div>

          <div className="col-6 col-lg-2">
            <button 
              className="btn-rendirse" 
              onClick={handleRendirse}
              disabled={procesando} /* BLOQUEADO AL PROCESAR */
            >
              🏳️ RENDIRSE
            </button>
          </div>

        </div>
      </div>

      {errorMsg && (
        <div className="d-none d-lg-block">
          <div className="feedback-msg">
            {errorMsg}
          </div>
        </div>
      )}

      {showModal && (
        <ModalSeleccion 
          candidatos={candidatos}
          onSelect={validarJugador}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};