import { useState, useEffect } from 'react';
import './styles.css';
import JuegoElOnceActualidad from './juego/juego-el-once-actualidad';

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
export default function MenuOnceActualidad() {
  const [dificultad, setDificultad] = useState<number | null>(null);
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [formacion, setFormacion] = useState<string | null>(null);
  
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);

  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL (Montaje)
  useEffect(() => {
    // A) Chequear si ya jugó hoy (bloqueo diario)
    const jugado = localStorage.getItem('juegoJugadoElOnceActualidad');
    if (jugado) {
      setYaJugoHoy(true);
    }
    
    // B) Chequear si hay una partida en curso (Recuperación de estado)
    const iniciadoPrevio = localStorage.getItem('juegoIniciadoElOnceActualidad');
    
    if (iniciadoPrevio === 'true') {
        const difGuardada = localStorage.getItem('elOnceActualidad_dificultad');
        const tiempoGuardado = localStorage.getItem('elOnceActualidad_tiempo');
        const formacionGuardada = localStorage.getItem('elOnceActualidad_formacion');

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
      localStorage.setItem('elOnceActualidad_dificultad', dificultad !== null ? dificultad.toString() : '');
      localStorage.setItem('elOnceActualidad_tiempo', tiempo.toString());
      localStorage.setItem('elOnceActualidad_formacion', nuevaFormacion);
      localStorage.setItem('juegoIniciadoElOnceActualidad', 'true');
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
         <JuegoElOnceActualidad />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion">
      <div className="menu-juego-actualidad-full-bg fade-in">
        
        {/* OVERLAY GENERAL */}
        <div className="actualidad-overlay-fondo"></div>

        {/* CONTENIDO FLOTANTE */}
        <div className="actualidad-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="actualidad-cabecera text-center mb-5">
            <span className="badge-categoria-actualidad">RETO</span>
            <h1 className="titulo-hero-actualidad">EL ONCE: ACTUALIDAD</h1>
            <h2 className="subtitulo-hero-actualidad">Los mejores jugadores del presente</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="actualidad-cuerpo-accion text-center">
            <p className="descripcion-juego-actualidad text-justify">
              La pelota ya rueda y los planteles están cerrados, pero la última palabra sobre quiénes deben saltar al campo <strong>la tienes tú.</strong> En esta edición, el desafío se traslada al presente absoluto. Aquí no hay espacio para la nostalgia; tu conocimiento se pone a prueba con los <strong>fichajes bomba, jóvenes promesas y los referentes</strong> que defienden hoy mismo los colores de la Primera División. <strong>¿Estás al día con el rendimiento actual?</strong>
            </p>

            {yaJugoHoy ?  (
              <div className="alerta-jugado-actualidad fade-in">
                <span className="alerta-icono-actualidad">🔥</span>
                <p>Ya dirigiste el partido de hoy<br/><strong>Vuelve mañana para una nueva jornada</strong></p>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="seccion-accion-actualidad">
                
                {/* SELECTOR DE TIEMPO MODERNO */}
                <div className="contenedor-config-tiempo">
                  <h3 className="titulo-config-actualidad">⏱️ Selecciona tu tiempo:</h3>
                  <div className="selector-tiempo-actualidad">
                    {TIEMPOS.map((item) => (
                      <div key={item.label} className="opcion-radio-wrapper">
                        <input
                          type="radio"
                          id={`tiempo-${item.label}`}
                          name="tiempo"
                          value={item.value}
                          className="radio-oculto-actualidad"
                          onChange={() => setTiempo(item.value)}
                          checked={tiempo === item.value}
                        />
                        <label htmlFor={`tiempo-${item.label}`} className="radio-label-actualidad">
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
                  className="btn-iniciar-reto-actualidad mt-4"
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