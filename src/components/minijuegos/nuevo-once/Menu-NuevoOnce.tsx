import { useState, useEffect } from 'react';
import JuegoNuevoOnce from './juego/juego-nuevo-once';
import type { ResultadoGuardado } from './juego/juego-nuevo-once';
import Spinner from '../Spinner';
import './styles.css';

const RESULTADO_KEY = 'nuevoOnce_ultimoResultado';

// --- DATOS CONSTANTES ---
const DIFICULTADES = [
  { label: "Normal", value: 0 },
  { label: "Difícil", value: 1 }
];

const TIEMPOS = [
  { label: "Sin Tiempo", value: 0 },
  { label: "45s", value: 45 },
  { label: "60s", value: 60 },
  { label: "90s", value: 90 }
];

const FORMACIONES = [
    "4-4-2",
    "4-3-3 ofensiva",
    "4-3-3 defensiva",
    "3-5-2",
    "4-2-3-1",
];

// --- COMPONENTE PRINCIPAL ---
export default function MenuNuevoOnce() {
  const [dificultad, setDificultad] = useState<number | null>(null);
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [formacion, setFormacion] = useState<string | null>(null);
  
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [verResultado, setVerResultado] = useState(false);
  const [resultadoGuardado, setResultadoGuardado] = useState<ResultadoGuardado | null>(null);

  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL (Montaje)
  useEffect(() => {
    // A) Chequear si hay resultado guardado
    const resultadoStr = localStorage.getItem(RESULTADO_KEY);
    if (resultadoStr) {
      try {
        setResultadoGuardado(JSON.parse(resultadoStr));
      } catch (e) {
        console.error("Error al leer resultado guardado", e);
      }
    }

    // B) Chequear si hay una partida en curso (Recuperación de estado)
    const iniciadoPrevio = localStorage.getItem('nuevoOnce_iniciado');
    
    if (iniciadoPrevio === 'true') {
        const difGuardada = localStorage.getItem('nuevoOnce_dificultad');
        const tiempoGuardado = localStorage.getItem('nuevoOnce_tiempo');
        const formacionGuardada = localStorage.getItem('nuevoOnce_formacion');

        if (difGuardada) setDificultad(Number(difGuardada));
        if (tiempoGuardado) setTiempo(Number(tiempoGuardado));
        if (formacionGuardada) setFormacion(formacionGuardada);

        setJuegoIniciado(true);
    }

    setLoading(false);

  }, []);

  // 2. LOGGING (Opcional, para debug)
  useEffect(() => {
    if (juegoIniciado && formacion) {
        console.log("Estado del juego actualizado:", { dificultad, tiempo, formacion });
    }
  }, [juegoIniciado, formacion]);

  // 3. GUARDADO (Al dar Click)
  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();

    if (tiempo !== null) {
      const indexRandom = Math.floor(Math.random() * FORMACIONES.length);
      const nuevaFormacion = FORMACIONES[indexRandom];
      
      setFormacion(nuevaFormacion);
      setJuegoIniciado(true);

      localStorage.setItem('nuevoOnce_dificultad', dificultad !== null ? dificultad.toString() : '');
      localStorage.setItem('nuevoOnce_tiempo', tiempo.toString());
      localStorage.setItem('nuevoOnce_formacion', nuevaFormacion);
      localStorage.setItem('nuevoOnce_iniciado', 'true');
    }
  };

  const handleVerResultado = () => {
    setVerResultado(true);
  };

  if (loading) {
    return <Spinner size="lg" mensaje="Preparando El Nuevo Once..." />;
  }

  // --- VISTA DEL JUEGO (normal) ---
  if (juegoIniciado && tiempo !== null && formacion !== null) {
    return (
      <div className="fade-in">
         <JuegoNuevoOnce />
      </div>
    );
  }

  // --- VISTA DE RESULTADO (VER RESULTADO) ---
  if (verResultado && resultadoGuardado) {
    return (
      <div className="fade-in">
        <JuegoNuevoOnce modoRevision resultadoGuardado={resultadoGuardado} />
      </div>
    );
  }

  // --- MENÚ PRINCIPAL ---
  return (
    <div className="contenedor-configuracion once-menu-wrapper">
      <div className="menu-juego-once-full-bg fade-in">
        
        <div className="once-contenido-contenedor">
          
          <div className="once-cabecera text-center">
            <span className="badge-categoria-once">RETO</span>
            <h1 className="titulo-hero-once">EL NUEVO ONCE</h1>
            <h2 className="subtitulo-hero-once">EL TEMPLO DE LA MEMORIA</h2>
          </div>

          <div className="once-cuerpo-accion text-center">
            <p className="descripcion-juego-once text-justify">
              Quince años de fútbol peruano (2010-2026) resumidos en once decisiones. <strong>Reto ilimitado</strong> 
            </p>

            <div id="sliderNuevoOnce" className="carousel slide once-slider" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#sliderNuevoOnce" data-bs-slide-to="0" className="active" aria-label="Slide 1" />
                <button type="button" data-bs-target="#sliderNuevoOnce" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#sliderNuevoOnce" data-bs-slide-to="2" aria-label="Slide 3" />
                <button type="button" data-bs-target="#sliderNuevoOnce" data-bs-slide-to="3" aria-label="Slide 4" />
              </div>
              <div className="carousel-inner">
                {[
                  { emoji: '🏟️', title: 'Clubes Aleatorios', text: 'Recibirás una selección de clubes de la Liga 1 (2010-2026). Cada turno te tocará un club distinto.', img: 'slide-1.webp' },
                  { emoji: '👤', title: 'Un Jugador por Club', text: 'Debes elegir 1 jugador que haya estado en ese club en algún momento entre 2010 y 2026. Solo uno por club.', img: 'slide-2.webp' },
                  { emoji: '🚫', title: 'Sin Repetir', text: 'No puedes repetir jugadores en el once. Recuerda a quienes ya usaste.', img: 'slide-3.webp' },
                  { emoji: '🏆', title: 'Completa los 11', text: 'Llena los 11 puestos con la formación asignada. Ganas si completas el equipo.', img: 'slide-4.webp' },
                ].map((slide, i) => (
                  <div key={slide.title} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                    <div className="once-slide-inner">
                      <div className="once-slide-placeholder">
                        <span className="once-slide-emoji">{slide.emoji}</span>
                      </div>
                      <img
                        src={`/img/minijuegos/tutoriales/nuevo-once/${slide.img}`}
                        alt={slide.title}
                        className="once-slide-img"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="once-slide-caption">
                      <h5>{slide.title}</h5>
                      <p>{slide.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#sliderNuevoOnce" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#sliderNuevoOnce" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>

            <form onSubmit={handleContinuar} className="seccion-accion-once">
              
              <div className="contenedor-config-tiempo">
                <h3 className="titulo-config-once">⏱️ Selecciona tu tiempo:</h3>
                <div className="selector-tiempo-once">
                  {TIEMPOS.map((item) => (
                    <div key={item.label} className="opcion-radio-wrapper">
                      <input
                        type="radio"
                        id={`tiempo-${item.label}`}
                        name="tiempo"
                        value={item.value}
                        className="radio-oculto-once"
                        onChange={() => setTiempo(item.value)}
                        checked={tiempo === item.value}
                      />
                      <label htmlFor={`tiempo-${item.label}`} className="radio-label-once">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="botones-accion-row">
                {resultadoGuardado && (
                  <button
                    type="button"
                    className="btn-ver-resultado-once"
                    onClick={handleVerResultado}
                  >
                    VER ÚLTIMO RESULTADO
                  </button>
                )}
                <button
                  id="btn-continuar"
                  type="submit"
                  className="btn-iniciar-reto-once"
                  disabled={tiempo === null}
                >
                  JUGAR AHORA
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
