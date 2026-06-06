import { useState, useEffect } from 'react';
import './styles.css';
import JuegoElOnceLeyendas from './juego/juego-el-once-leyendas';

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
export default function MenuOnceLeyendas() {
  const [dificultad, setDificultad] = useState<number | null>(null);
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [formacion, setFormacion] = useState<string | null>(null);
  
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);

  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL (Montaje)
  useEffect(() => {
    // A) Chequear si ya jugó hoy (bloqueo diario)
    const jugado = localStorage.getItem('juegoJugadoElOnceLeyendas');
    if (jugado) {
      setYaJugoHoy(true);
    }
    
    // B) Chequear si hay una partida en curso (Recuperación de estado)
    const iniciadoPrevio = localStorage.getItem('juegoIniciadoElOnceLeyendas');
    
    if (iniciadoPrevio === 'true') {
        const difGuardada = localStorage.getItem('elOnceLeyendas_dificultad');
        const tiempoGuardado = localStorage.getItem('elOnceLeyendas_tiempo');
        const formacionGuardada = localStorage.getItem('elOnceLeyendas_formacion');

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
      localStorage.setItem('elOnceLeyendas_dificultad', dificultad !== null ? dificultad.toString() : '');
      localStorage.setItem('elOnceLeyendas_tiempo', tiempo.toString());
      localStorage.setItem('elOnceLeyendas_formacion', nuevaFormacion);
      localStorage.setItem('juegoIniciadoElOnceLeyendas', 'true');
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
         <JuegoElOnceLeyendas />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion">
      <div className="menu-juego-leyendas-full-bg fade-in">
        
        {/* OVERLAY GENERAL */}
        <div className="leyendas-overlay-fondo"></div>

        {/* CONTENIDO FLOTANTE */}
        <div className="leyendas-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="leyendas-cabecera text-center mb-5">
            <span className="badge-categoria-leyendas">RETO</span>
            <h1 className="titulo-hero-leyendas">EL ONCE: LEYENDAS</h1>
            <h2 className="subtitulo-hero-leyendas">El equipo histórico definitivo</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="leyendas-cuerpo-accion text-center">
            <p className="descripcion-juego-leyendas text-justify">
              El tiempo pasa, pero <strong>la clase es eterna.</strong> En esta edición especial, tu misión es invocar a los <strong>ídolos de antaño</strong> que ya forman parte del mito. Debes armar un equipo utilizando <strong>un solo jugador que hay jugado en la primera división entre 2010 y 2026 y que ya esté retirado por cada club</strong> seleccionado. ¿Recuerdas quién era el caudillo de esa defensa que ya no existe? Es momento de rendir tributo. <strong>Reto ilimitado</strong>
            </p>

            {yaJugoHoy ?  (
              <div className="alerta-jugado-leyendas fade-in">
                <span className="alerta-icono-leyendas">👑</span>
                <p>Ya armaste tu equipo histórico hoy<br/><strong>Vuelve mañana para invocar nuevas leyendas</strong></p>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="seccion-accion-leyendas">
                
                {/* SELECTOR DE TIEMPO MODERNO */}
                <div className="contenedor-config-tiempo">
                  <h3 className="titulo-config-leyendas">⏱️ Selecciona tu tiempo:</h3>
                  <div className="selector-tiempo-leyendas">
                    {TIEMPOS.map((item) => (
                      <div key={item.label} className="opcion-radio-wrapper">
                        <input
                          type="radio"
                          id={`tiempo-${item.label}`}
                          name="tiempo"
                          value={item.value}
                          className="radio-oculto-leyendas"
                          onChange={() => setTiempo(item.value)}
                          checked={tiempo === item.value}
                        />
                        <label htmlFor={`tiempo-${item.label}`} className="radio-label-leyendas">
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
                  className="btn-iniciar-reto-leyendas mt-4"
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