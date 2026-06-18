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
      const hoyStr = hoy.toISOString().split('T')[0];
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

    if (juegoIniciado === false) {

      setLoading(true);

      // Filtramos jugadores con exactamente 2 palabras (nombre + apellido simple)
      const jugadoresValidos = JUGADORES.filter(j => j.nombre.trim().split(/\s+/).length === 2);

      // Seleccionamos un jugador al azar de la lista filtrada
      const jugadorAleatorio = jugadoresValidos[Math.floor(Math.random() * jugadoresValidos.length)];

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
  if (juegoIniciado) {
    return (
      <div className="fade-in">
         <JuegoElTapadito />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ COMPACTO ---
  return (
    <div className="contenedor-configuracion tapadito-menu-wrapper">
      <div className="menu-juego-tapadito-full-bg fade-in">
        
        {/* OVERLAY GENERAL */}
        <div className="tapadito-overlay-fondo"></div>

        {/* CONTENIDO FLOTANTE */}
        <div className="tapadito-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="tapadito-cabecera text-center">
            <span className="badge-categoria-tapadito">RETO DIARIO</span>
            <h1 className="titulo-hero-tapadito">EL TAPADITO</h1>
            <h2 className="subtitulo-hero-tapadito">EL WORDLE DE LA LIGA 1</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="tapadito-cuerpo-accion text-center">
            <p className="descripcion-juego-tapadito text-justify">
              Descubre la identidad del futbolista oculto. Tienes <strong>seis intentos</strong> para adivinar su apellido.
            </p>

            {/* SLIDER DE INSTRUCCIONES VISUALES */}
            <div id="sliderTapadito" className="carousel slide tapadito-slider" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#sliderTapadito" data-bs-slide-to="0" className="active" aria-label="Slide 1" />
                <button type="button" data-bs-target="#sliderTapadito" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#sliderTapadito" data-bs-slide-to="2" aria-label="Slide 3" />
                <button type="button" data-bs-target="#sliderTapadito" data-bs-slide-to="3" aria-label="Slide 4" />
              </div>
              <div className="carousel-inner">
                {[
                  { emoji: '🎯', title: 'Jugador Oculto', text: 'Se te asigna un futbolista misterioso de la Liga 1. Debes adivinar su apellido en 6 intentos.', img: 'slide-1.webp' },
                  { emoji: '⌨️', title: 'Escribe tu Intento', text: 'Ingresa un apellido o palabra en español y ve descifrando el caso.', img: 'slide-2.webp' },
                  { emoji: '🟩🟨⬜', title: 'Pistas de Color', text: '🟩: letra correcta en posición correcta. 🟨: letra correcta en otra posición. ⬜: letra incorrecta.', img: 'slide-3.webp' },
                  { emoji: '🏆', title: 'Completa el Reto', text: 'Acierta el apellido en 6 intentos o menos. Cada día un nuevo jugador misterioso te espera.', img: 'slide-4.webp' },
                ].map((slide, i) => (
                  <div key={slide.title} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                    <div className="tapadito-slide-inner">
                      <div className="tapadito-slide-placeholder">
                        <span className="tapadito-slide-emoji">{slide.emoji}</span>
                      </div>
                      <img
                        src={`/img/minijuegos/tutoriales/el-tapadito/${slide.img}`}
                        alt={slide.title}
                        className="tapadito-slide-img"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="tapadito-slide-caption">
                      <h5>{slide.title}</h5>
                      <p>{slide.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#sliderTapadito" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#sliderTapadito" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>

            {yaJugoHoy ? (
              <div className="tapadito-ya-jugado fade-in">
                <span className="tapadito-ya-jugado-icono">⏳</span>
                <p>Ya completaste el reto de hoy<br /><strong>Vuelve mañana para un nuevo tapadito</strong></p>
                <button
                  type="button"
                  className="tapadito-btn-ver-resultado"
                  onClick={() => setJuegoIniciado(true)}
                >
                  VER RESULTADO
                </button>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="tapadito-seccion-accion">
                <button
                  id="btn-continuar"
                  type="submit"
                  className="tapadito-btn-jugar"
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
