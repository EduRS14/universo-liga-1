import { useState, useEffect } from 'react';
import JuegoElOnce from './juego/juego-el-once';
import Spinner from '../Spinner';
import './styles.css';

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
export default function MenuOnce() {
  const [dificultad, setDificultad] = useState<number | null>(null);
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [formacion, setFormacion] = useState<string | null>(null);
  
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);

  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL (Montaje)
  useEffect(() => {
    // A) Chequear si ya jugó hoy (bloqueo diario)
    const jugado = localStorage.getItem('juegoJugadoElOnce');
    if (jugado) {
      setYaJugoHoy(true);
    }
    
    // B) Chequear si hay una partida en curso (Recuperación de estado)
    const iniciadoPrevio = localStorage.getItem('juegoIniciadoElOnce');
    
    if (iniciadoPrevio === 'true') {
        const difGuardada = localStorage.getItem('elOnce_dificultad');
        const tiempoGuardado = localStorage.getItem('elOnce_tiempo');
        const formacionGuardada = localStorage.getItem('elOnce_formacion');

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
      // Generar formación aleatoria
      const indexRandom = Math.floor(Math.random() * FORMACIONES.length);
      const nuevaFormacion = FORMACIONES[indexRandom];
      
      // Guardar en Estado
      setFormacion(nuevaFormacion);
      setJuegoIniciado(true);

      // Guardar en LocalStorage
      localStorage.setItem('elOnce_dificultad', dificultad !== null ? dificultad.toString() : '');
      localStorage.setItem('elOnce_tiempo', tiempo.toString());
      localStorage.setItem('elOnce_formacion', nuevaFormacion);
      localStorage.setItem('juegoIniciadoElOnce', 'true');
    }
  };

  if (loading) {
    return <Spinner size="lg" mensaje="Preparando El Once..." />;
  }

  // --- VISTA DEL JUEGO ---
  if (juegoIniciado && tiempo !== null && formacion !== null) {
    return (
      <div className="fade-in">
         <JuegoElOnce />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion once-menu-wrapper">
      <div className="menu-juego-once-full-bg fade-in">
        
        {/* CONTENIDO FLOTANTE */}
        <div className="once-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="once-cabecera text-center">
            <span className="badge-categoria-once">RETO</span>
            <h1 className="titulo-hero-once">EL ONCE</h1>
            <h2 className="subtitulo-hero-once">EL TEMPLO DE LA MEMORIA</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="once-cuerpo-accion text-center">
            <p className="descripcion-juego-once text-justify">
              Quince años de fútbol peruano (2010-2026) resumidos en once decisiones. <strong>Reto ilimitado</strong> 
            </p>

            <div className="once-deprecado-banner">
              <span className="once-deprecado-icono">⚠️</span>
              <div className="once-deprecado-texto">
                <p className="once-deprecado-titulo">Versión Legacy</p>
                <p className="once-deprecado-sub">Esta versión será descontinuada. Prueba <a href="/minijuegos/nuevo-once" className="once-deprecado-link">El Nuevo Once</a>, la edición renovada.</p>
              </div>
            </div>

            {/* SLIDER DE INSTRUCCIONES VISUALES */}
            <div id="sliderOnce" className="carousel slide once-slider" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#sliderOnce" data-bs-slide-to="0" className="active" aria-label="Slide 1" />
                <button type="button" data-bs-target="#sliderOnce" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#sliderOnce" data-bs-slide-to="2" aria-label="Slide 3" />
                <button type="button" data-bs-target="#sliderOnce" data-bs-slide-to="3" aria-label="Slide 4" />
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
                        src={`/img/minijuegos/tutoriales/el-once/${slide.img}`}
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
              <button className="carousel-control-prev" type="button" data-bs-target="#sliderOnce" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#sliderOnce" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>

            {yaJugoHoy ?  (
              <div className="alerta-jugado-once fade-in">
                <span className="alerta-icono-once">📋</span>
                <p>Ya diste la charla técnica de hoy<br/><strong>Vuelve mañana para armar un nuevo equipo</strong></p>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="seccion-accion-once">
                
                {/* SELECTOR DE TIEMPO MODERNO */}
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
                
                {/* BOTÓN JUGAR */}
                <button
                  id="btn-continuar"
                  type="submit"
                  className="btn-iniciar-reto-once mt-2"
                  disabled={tiempo === null}
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