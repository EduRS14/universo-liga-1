import { useState, useEffect } from 'react';
import {JuegoElTapadito} from './juego/juego-tapadito';
import type { ConfiguracionTapadito } from '../../../types/minijuegos/tapadito/configuracion-tapadito';
import Jugadores from '../../../data/minijuegos/jugadores_obtenidos.json';
import { normalizarTexto } from '../../../utils/minijuegos/wordle/logica';
import './styles.css';
import type { Jugador } from '../../../types/minijuegos/jugador.interface';

const JUGADORES : Jugador[] = Jugadores as Jugador[];

export default function MenuElTapadito() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL 
  useEffect(() => {

    setLoading(true);

    // Verificamos si ya jugó hoy
    const ultimaPartida = localStorage.getItem('tapaditoUltimaPartida');
    if (ultimaPartida) {
      const hoy = new Date();
      const hoyStr = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      if (ultimaPartida === hoyStr) {
        setYaJugoHoy(true);
        setLoading(false);
        return;
      }
    }

    // Verificamos si ya se ha jugado una partida
    const partidaGuardada = localStorage.getItem('configuracionTapadito');
    if (partidaGuardada) {
      const config: ConfiguracionTapadito = JSON.parse(partidaGuardada);
      if (config.estado === 'jugando') {
        setJuegoIniciado(true);
      }

    }

    setLoading(false);

  }, []);

  // Guardado de la configuración inicial al continuar
  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Iniciando nueva partida de El Tapadito...');

    if (juegoIniciado === false) {

      setLoading(true);

      // Seleccionamos un jugador al azar de la lista de goleadores
      const jugadorAleatorio = JUGADORES[Math.floor(Math.random() * JUGADORES.length)];

      // Obtenemos el nombre del jugador y lo normalizamos
      const nombreJugador = normalizarTexto(jugadorAleatorio.nombre);

      // Eliminamos la primera palabra, que es el nombre del jugador, y nos quedamos solo con el apellido
      const apellidoJugador = nombreJugador.split(' ').slice(1).join(' ');

      // Obtenemos la cantidad de letras del apellido del jugador
      const cantidadLetras = apellidoJugador.length;

      // Generamos un array de 6 espacios vacios, para representar las oportunidades de adivinar el nombre del jugador
      const nombresColocados: (string | null)[] = [null, null, null, null, null, null];

      // Obtenemos la fecha de hoy en formato YYYY-MM-DD
      const hoy = new Date();
      const hoyStr = hoy.toISOString().split('T')[0];

      // Guardamos la configuración inicial
      const nuevaConfiguracion: ConfiguracionTapadito = {
        estado: 'jugando',
        fechaUltimaPartida: hoyStr,
        nombreJugador: apellidoJugador,
        datosJugador: jugadorAleatorio,
        palabrasUsadas: nombresColocados,
        cantidadLetras: cantidadLetras,
      };

      localStorage.setItem('configuracionTapadito', JSON.stringify(nuevaConfiguracion));

      setJuegoIniciado(true);
      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="contenedor-configuracion">
        <p className='texto-cargando'>Cargando...</p>
      </div>
    );
  }

  // --- VISTA DEL JUEGO ---
  // --- VISTA DEL JUEGO ---
  if (juegoIniciado) {
    return (
      <div className="fade-in">
         <JuegoElTapadito />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion">
      <div className="menu-juego-tapadito-full-bg fade-in">
        
        {/* 1. EL OVERLAY GENERAL (Imprescindible para legibilidad) */}
        <div className="tapadito-overlay-fondo"></div>

        {/* 2. EL CONTENIDO FLOTANTE (Centrado y legible) */}
        <div className="tapadito-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="tapadito-cabecera text-center mb-5">
            <span className="badge-categoria-tapadito">RETO DIARIO</span>
            <h1 className="titulo-hero-tapadito">EL TAPADITO</h1>
            <h2 className="subtitulo-hero-tapadito">EL WORDLE DE LA LIGA 1</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="tapadito-cuerpo-accion text-center">
            <p className="descripcion-juego-tapadito text-justify">
              En nuestro fútbol, siempre hay un nombre que se esconde bajo la manga. En esta versión del clásico <strong>Wordle</strong>, tu misión es descubrir la identidad de un futbolista oculto que pasó por nuestro campeonato <strong>entre 2010 y 2026.</strong> Tienes <strong>seis intentos</strong>. El verde te confirmará el éxito, el amarillo la reubicación y el gris el error. <strong>¿Tienes la visión de juego para descifrar el enigma? Reto ilimitado</strong>
            </p>

            {yaJugoHoy ? (
              <div className="alerta-jugado-tapadito fade-in">
                <span className="alerta-icono-tapadito">⏳</span>
                <p>Ya completaste el reto de hoy<br/><strong>Vuelve mañana para un nuevo tapadito</strong></p>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="seccion-accion-tapadito">
                <button
                  id="btn-continuar"
                  type="submit"
                  className="btn-iniciar-reto-tapadito"
                >
                  JUGAR AHORA
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}