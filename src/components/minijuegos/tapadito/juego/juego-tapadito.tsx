// src/components/minijuegos/el-tapadito/juego/juego-tapadito.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { ConfiguracionTapadito } from '../../../../types/minijuegos/tapadito/configuracion-tapadito';
import type { Jugador } from '../../../../types/minijuegos/jugador.interface';
import Jugadores from '../../../../data/minijuegos/jugadores_obtenidos.json';
import { normalizarTexto } from '../../../../utils/minijuegos/wordle/logica';
import { TecladoVirtual } from './teclado';
import Equipos from '../../../../data/minijuegos/equipos.json';
import type { Equipo } from '../../../../types/minijuegos/equipo';
import './styles.css';

const JUGADORES: Jugador[] = Jugadores as Jugador[];
const EQUIPOS: Equipo[] = Equipos as Equipo[];

// Helpers para limpiar el apellido (quitamos espacios y tildes para la validación pura)
const obtenerApellidoLimpio = (nombre: string) => {
  const norm = normalizarTexto(nombre);
  const apellido = norm.split(' ').slice(1).join(''); // Juntamos si tiene 2 apellidos para evitar espacios
  return apellido.toUpperCase();
};

export const JuegoElTapadito: React.FC = () => {
  // Estados leídos de la configuración
  const [config, setConfig] = useState<ConfiguracionTapadito | null>(null);
  const [targetWord, setTargetWord] = useState<string>('');

  // Datos completos del jugador para mostrar en el modal final
  const [datosJugador, setDatosJugador] = useState<Jugador | null>(null);
  
  // Estados interactivos
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [procesando, setProcesando] = useState<boolean>(false);
  
  // ---> NUEVO: Estado para retrasar la aparición del modal
  const [mostrarModalFin, setMostrarModalFin] = useState<boolean>(false);

  // 1. CARGA DE CONFIGURACIÓN
  useEffect(() => {
    const partidaGuardada = localStorage.getItem('configuracionTapadito');
    if (partidaGuardada) {
      const datos: ConfiguracionTapadito = JSON.parse(partidaGuardada);
      setConfig(datos);
      setTargetWord(datos.nombreJugador.replace(/\s/g, '').toUpperCase());
      setDatosJugador(datos.datosJugador);

      // Si cargamos una partida que ya había terminado, mostramos el modal de inmediato
      if (datos.estado !== 'jugando') {
        setMostrarModalFin(true);
      }
    }
  }, []);

  // 2. DICCIONARIO DE VALIDACIÓN (Ultra rápido)
  const diccionarioApellidos = useMemo(() => {
    const setApellidos = new Set<string>();
    JUGADORES.forEach(j => {
      setApellidos.add(obtenerApellidoLimpio(j.nombre));
    });
    return setApellidos;
  }, []);

  // 3. LÓGICA DE ACTUALIZACIÓN DE ESTADO
  const actualizarConfiguracion = (nuevaConfig: Partial<ConfiguracionTapadito>) => {
    if (!config) return;
    const configActualizada = { ...config, ...nuevaConfig };
    setConfig(configActualizada);
    localStorage.setItem('configuracionTapadito', JSON.stringify(configActualizada));
  };

  const mostrarError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 2000);
  };

  // 4. PROCESAMIENTO DE LETRAS
  const handleKeyPress = useCallback((key: string) => {
    if (!config || config.estado !== 'jugando' || procesando) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== targetWord.length) {
        mostrarError('Faltan letras');
        return;
      }
      
      if (!diccionarioApellidos.has(currentGuess)) {
        mostrarError('El apellido no figura en la base de datos');
        return;
      }

      submitGuess();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      setErrorMsg(null);
    } else if (/^[A-ZÑ]$/.test(key)) {
      if (currentGuess.length < targetWord.length) {
        setCurrentGuess(prev => prev + key);
        setErrorMsg(null);
      }
    }
  }, [currentGuess, targetWord, config, procesando, diccionarioApellidos]);

  // Soporte para teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let key = e.key.toUpperCase();
      if (e.key === 'Backspace') key = 'BACKSPACE';
      if (e.key === 'Enter') key = 'ENTER';
      handleKeyPress(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const submitGuess = () => {
    if (!config) return;
    setProcesando(true);

    // Encontrar el primer espacio null para meter la palabra
    const nuevasPalabras = [...config.palabrasUsadas];
    const indexVacio = nuevasPalabras.indexOf(null);
    if (indexVacio !== -1) {
      nuevasPalabras[indexVacio] = currentGuess;
    }

    let nuevoEstado = config.estado;
    if (currentGuess === targetWord) {
      nuevoEstado = 'ganado';
    } else if (!nuevasPalabras.includes(null)) {
      nuevoEstado = 'perdido'; // Ya no hay espacios null (se gastaron los 6)
    }

    actualizarConfiguracion({
      palabrasUsadas: nuevasPalabras,
      estado: nuevoEstado
    });

    setCurrentGuess('');
    
    setTimeout(() => {
      setProcesando(false);
      if (nuevoEstado !== 'jugando') {
        localStorage.setItem('tapaditoUltimaPartida', config.fechaUltimaPartida);
        setMostrarModalFin(true); 
      }
    }, 2000); 
  };

  // 5. EVALUADOR DE COLORES (Wordle Core Logic)
  const evaluarPalabra = (guess: string) => {
    const resultado: ('verde' | 'amarillo' | 'gris')[] = Array(targetWord.length).fill('gris');
    const targetArr = targetWord.split('');
    const guessArr = guess.split('');

    // Verdes
    for (let i = 0; i < targetWord.length; i++) {
      if (guessArr[i] === targetArr[i]) {
        resultado[i] = 'verde';
        targetArr[i] = null as any;
        guessArr[i] = null as any;
      }
    }
    // Amarillos
    for (let i = 0; i < targetWord.length; i++) {
      if (guessArr[i] !== null && targetArr.includes(guessArr[i])) {
        resultado[i] = 'amarillo';
        targetArr[targetArr.indexOf(guessArr[i])] = null as any;
      }
    }
    return resultado;
  };

  // 6. DERIVAR COLORES DEL TECLADO
  const letrasUsadas = useMemo(() => {
    const mapa: Record<string, 'verde' | 'amarillo' | 'gris'> = {};
    if (!config) return mapa;

    config.palabrasUsadas.forEach(guess => {
      if (!guess) return;
      const evaluacion = evaluarPalabra(guess);
      guess.split('').forEach((letra, index) => {
        const estadoActual = mapa[letra];
        const nuevoEstado = evaluacion[index];
        if (nuevoEstado === 'verde') mapa[letra] = 'verde';
        else if (nuevoEstado === 'amarillo' && estadoActual !== 'verde') mapa[letra] = 'amarillo';
        else if (nuevoEstado === 'gris' && !estadoActual) mapa[letra] = 'gris';
      });
    });
    return mapa;
  }, [config?.palabrasUsadas, targetWord]);

  if (!config) return <div className="loading">Cargando tablero...</div>;

  const intentoActualIndex = config.palabrasUsadas.indexOf(null);

  return (
    <>
    <div className="tapadito-container">
      <div className="tapadito-board mt-4">
        {config.palabrasUsadas.map((palabraGuardada, i) => {
          const isCurrentRow = i === intentoActualIndex;
          const guessTexto = isCurrentRow ? currentGuess : palabraGuardada || '';
          const evaluacion = palabraGuardada ? evaluarPalabra(palabraGuardada) : null;

          return (
            <div 
              key={i} 
              className={`tapadito-row ${isCurrentRow && errorMsg ? 'shake' : ''}`}
            >
              {Array.from({ length: targetWord.length }).map((_, j) => {
                const letra = guessTexto[j] || '';
                const estadoCasilla = evaluacion ? evaluacion[j] : (letra ? 'lleno' : 'vacio');
                
                return (
                  <div 
                    key={j} 
                    className={`tapadito-cell ${estadoCasilla} ${letra && isCurrentRow ? 'pop' : ''}`}
                  >
                    {letra}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <div className="feedback-msg mt-3 text-center">
          {errorMsg}
        </div>
      )}

      {/* Solo ocultamos el teclado si ya cargó el modal */}
      {!mostrarModalFin && (
        <TecladoVirtual 
          letrasUsadas={letrasUsadas} 
          onKeyPress={handleKeyPress} 
          disabled={procesando || config.estado !== 'jugando'}
        />
      )}

      {/* ---> MODIFICADO: Ahora depende de mostrarModalFin */}
      {mostrarModalFin && (
        <div className="tapadito-overlay-fin fade-in">
          <div className="tapadito-modal-fin text-center">
            <h2 style={{ color: config.estado === 'ganado' ? '#22c55e' : '#ef4444' }} className="titulo-estado-fin">
              {config.estado === 'ganado' ? '¡LA CLAVASTE AL ÁNGULO!' : 'FIN DEL JUEGO'}
            </h2>
            <div className="texto-explicacion-estado mt-3 mb-4">
              <p>El tapadito era:</p>
              <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                  <div className="col-12 d-flex justify-content-center">
                    <img 
                      src={datosJugador?.url_foto}
                      alt={datosJugador?.nombre}
                      className="img-fluid foto-jugador"
                    />
                  </div>
                  <div className="col-12 mt-4 mt-lg-0">
                    <h3 className="nombre-jugador-fin">{datosJugador?.nombre}</h3>
                    <p className="datos-jugador-fin">{datosJugador?.posicionPrincipal}</p>
                    <p className="datos-jugador-fin">Club actual: {datosJugador?.clubActual}</p>
                    <div className="container-fluid">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                          <p className="datos-jugador-fin">Jugó en:</p>
                        </div>
                        {datosJugador?.equiposJugados.map((club, index) => (
                          <div key={index} className="col-3">
                            <img src={EQUIPOS.find(e => e.id === club.id_equipo)?.url_foto || ''} alt={EQUIPOS.find(e => e.id === club.id_equipo)?.nombre || 'Desconocido'} 
                            className='img-fluid foto-equipo'/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-volver" 
              onClick={() => window.location.reload()}
            >
              Volver al Menú
            </button>
          </div>
        </div>
      )}
    </div>

    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-10 col-lg-8 contenedor-descripcion-minijuego">

          <div className="row justify-content-center align-items-center">

              <div className="col-10 col-lg-10">
                <h2 className='titulo-descripcion-minijuego'>El Tapadito: El Enigma del Vestuario</h2>
              </div>

              <div className="col-11 col-lg-10">
                <p className="texto-descripcion-minijuego">
                  ¿Tienes el ojo clínico para reconocer a un jugador con solo un puñado de pistas? En nuestro fútbol, siempre hay un nombre que se esconde bajo la manga, ese jugador sorpresa que nadie vio venir. <strong>El Tapadito</strong> es el desafío definitivo para los que leen hasta la letra chica de las alineaciones en la <strong>Liga 1.</strong> Tu misión es descubrir el <strong>apellido</strong> de un futbolista oculto que pasó por nuestro campeonato <strong>entre 2010 y 2026.</strong> El reto exige precisión táctica: tienes solo <strong>seis intentos</strong> y el tablero te indicará la cantidad exacta de letras iniciales. Con cada apellido válido que ingreses, el sistema te dará el reporte: la casilla en <strong>verde</strong> confirmará que la letra está en el lugar correcto, en <strong>amarillo</strong> te indicará que la letra es parte del nombre pero debes reubicarla, y en <strong>gris</strong> te obligará a buscar por otra banda. Solo un verdadero ojeador de nuestra historia es capaz de <strong>descifrar la identidad del jugador antes del pitazo final.</strong>
                </p>
              </div>

          </div>

        </div>
      </div>
    </div>
    </>
  );
};