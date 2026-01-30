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
        // ¡IMPORTANTE! Recuperamos los valores guardados para no perderlos al recargar
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
         {/* Pasamos los datos como props al componente del juego real */}
         <JuegoElOnce />
      </div>
    );
  }

  return (
      <div className="contenedor-configuracion">
        {yaJugoHoy && (
          <div style={{ backgroundColor: 'rgba(255, 255, 0, 0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
               <p style={{ color: '#ffd700', textAlign: 'center', margin: 0 }}>
                  ⚠️ Nota: Ya has completado el reto diario de hoy.
              </p>
          </div>
        )}

        <div className="container-fluid">
          <div className="row justify-content-evenly align-items-center">

            <div className="col-10 col-lg-4 d-flex justify-content-center">

              <img src="/img/minijuegos/juegos/el-once.webp" alt="El Once" className='img-fluid img-el-once'/>

            </div>
            <div className="col-10 col-lg-4">

              <p className='presentacion-el-once'>
                ¿Cuántos nombres han pasado por nuestros ojos en más de <strong>quince años de fútbol peruano?</strong> El Once es el espacio donde el conocimiento y la nostalgia se encuentran para desafiar a los que dicen saberlo todo sobre la <strong>Liga 1.</strong> Aquí, la gloria no se gana en la cancha, sino recordando a esos guerreros que defendieron camisetas <strong>desde las alturas del Cusco hasta el calor de Moyobamba.</strong> El desafío es simple pero implacable: debes <strong>construir un equipo equilibrado utilizando un solo representante por cada club seleccionado.</strong> Es un viaje por el tiempo y la geografía de nuestro campeonato, donde cada posición vacante es una pregunta y cada nombre que eliges es una prueba de tu lealtad a la historia del fútbol nacional. <strong>¿Estás listo para dar la charla técnica y demostrar que tu memoria es de campeonato?</strong>
              </p>

              <form onSubmit={handleContinuar}>
                {/* DIFICULTAD 
                <h3 className="texto-general">Dificultad:</h3>
                <div className="contenedor-opciones">
                  {DIFICULTADES.map((item) => (
                    <div key={item.label}>
                      <input
                        type="radio"
                        id={`dificultad-${item.label}`}
                        name="dificultad"
                        value={item.value}
                        className="texto-opcion radio-oculto"
                        onChange={() => setDificultad(item.value)}
                        checked={dificultad === item.value}
                      />
                      <label htmlFor={`dificultad-${item.label}`} className="texto-opcion radio-label">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                */}
                
                {/* TIEMPO */}
                <h3 className="texto-general">Tiempo:</h3>
                <div className="contenedor-opciones">
                  {TIEMPOS.map((item) => (
                    <div key={item.label}>
                      <input
                        type="radio"
                        id={`tiempo-${item.label}`}
                        name="tiempo"
                        value={item.value}
                        className="texto-opcion radio-oculto"
                        onChange={() => setTiempo(item.value)}
                        checked={tiempo === item.value}
                      />
                      <label htmlFor={`tiempo-${item.label}`} className="texto-opcion radio-label">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                
                {/* BOTÓN */}
                <div style={{ marginTop: '2rem' }}>
                  <button
                    id="btn-continuar"
                    type="submit"
                    className="btn btn-jugar"
                    disabled={tiempo === null}
                  >
                    Jugar
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
  );

}