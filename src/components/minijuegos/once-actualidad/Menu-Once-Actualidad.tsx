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
        // ¡IMPORTANTE! Recuperamos los valores guardados para no perderlos al recargar
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
         {/* Pasamos los datos como props al componente del juego real */}
         <JuegoElOnceActualidad />
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

              <img src="/img/minijuegos/juegos/el-once-actualidad.webp" alt="El Once Actualidad" className='img-fluid img-el-once'/>

            </div>
            <div className="col-10 col-lg-4">

              <p className='presentacion-el-once'>
                La pelota ya rueda y los planteles están cerrados, pero la última palabra sobre quiénes deben saltar al campo <strong>la tienes tú.</strong> En esta edición actualizada de El Once, el desafío se traslada al presente absoluto: <strong>la Liga 1 2026.</strong> Aquí no hay espacio para la nostalgia ni para el archivo histórico; tu conocimiento se pone a prueba con los <strong>fichajes bomba, las jóvenes promesas y los referentes</strong> que defienden hoy mismo los colores de los <strong>18 clubes de la Primera División.</strong> El reto mantiene su esencia competitiva: selecciona un representante por cada equipo sorteado y encájalo en tu esquema táctico sin margen de error. ¿Quién es el lateral más en forma del torneo? ¿Qué delantero extranjero está rompiendo las redes este año? Demuestra que estás al día con el <strong>mercado de pases y el rendimiento actual</strong> para armar el equipo ideal de la temporada en curso.
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