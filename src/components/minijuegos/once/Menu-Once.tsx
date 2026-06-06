import { useState, useEffect } from 'react';
import JuegoElOnce from './juego/juego-el-once';
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
    return (
      <div className="contenedor-configuracion">
        <p className='texto-cargando'>Cargando...</p>
      </div>
    );
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
    <div className="contenedor-configuracion">
      <div className="menu-juego-once-full-bg fade-in">
        
        {/* OVERLAY GENERAL */}
        <div className="once-overlay-fondo"></div>

        {/* CONTENIDO FLOTANTE */}
        <div className="once-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="once-cabecera text-center mb-5">
            <span className="badge-categoria-once">RETO</span>
            <h1 className="titulo-hero-once">EL ONCE</h1>
            <h2 className="subtitulo-hero-once">EL TEMPLO DE LA MEMORIA</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="once-cuerpo-accion text-center">
            <p className="descripcion-juego-once text-justify">
              ¿Cuántos nombres han pasado por nuestros ojos en más de <strong>quince años de fútbol peruano?</strong> El Once es el espacio donde el conocimiento y la nostalgia se encuentran. El desafío es simple pero implacable: debes <strong>construir un equipo equilibrado utilizando un solo representante que haya jugado entre el 2010 y 2026 por cada club seleccionado.</strong> ¿Estás listo para dar la charla técnica y demostrar que tu memoria es de campeonato? <strong>Reto ilimitado</strong> 
            </p>

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
                  className="btn-iniciar-reto-once mt-4"
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