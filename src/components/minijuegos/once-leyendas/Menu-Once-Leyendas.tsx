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
        // ¡IMPORTANTE! Recuperamos los valores guardados para no perderlos al recargar
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
         {/* Pasamos los datos como props al componente del juego real */}
         <JuegoElOnceLeyendas />
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

              <img src="/img/minijuegos/juegos/el-once-leyendas.webp" alt="El Once Leyendas" className='img-fluid img-el-once'/>

            </div>
            <div className="col-10 col-lg-4">

              <p className='presentacion-el-once'>
                El tiempo pasa, pero <strong>la clase es eterna.</strong> En esta edición especial de El Once, las puertas del vestuario se abren exclusivamente para aquellos que colgaron los botines pero dejaron una <strong>huella imborrable</strong> en nuestra liga. Aquí no cuentan los fichajes del presente; tu misión es invocar a los <strong>ídolos de antaño,</strong> a esos referentes que rugieron en los estadios del Perú entre 2010 y 2025 y que hoy ya forman parte del <strong>mito</strong>. El reto mantiene su rigor: once equipos distintos, once posiciones fijas y un solo jugador retirado para cada una. ¿Recuerdas quién era el caudillo de esa defensa que ya no existe o quién era el "10" extranjero que llegó sin nombre y se fue como <strong>leyenda?</strong> Prepárate para un viaje al pasado donde tu único recurso es la <strong>memoria.</strong> Es momento de rendir tributo a los que se fueron por la puerta grande y armar el <strong>equipo histórico definitivo.</strong>
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