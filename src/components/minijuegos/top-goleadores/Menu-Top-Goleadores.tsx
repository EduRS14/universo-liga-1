import { useState, useEffect } from 'react';
import JuegoTopGoleadores from './juego/juego-top-goleadores';
import GoleadoresTemporadasData from '../../../data/minijuegos/goleadores_temporada.json';
import type { ConfiguracionTop } from '../../../types/minijuegos/tops/configuracion-top';
import type { GoleadoresTemporadas } from '../../../types/minijuegos/tops/goleadores';
import './styles.css';

const TIEMPOS = [
  { label: "Sin Tiempo", value: 0 },
  { label: "1m", value: 60 },
  { label: "2m", value: 120 },
  { label: "3m", value: 180 }
];

const GOLEADORES_TEMPORADAS : GoleadoresTemporadas[] = GoleadoresTemporadasData;

// --- COMPONENTE PRINCIPAL ---
export default function MenuTopGoleadores() {
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL 
  useEffect(() => {

    setLoading(true);

    // Verificamos si ya jugó hoy
    const ultimaPartida = localStorage.getItem('topGoleadoresUltimaPartida');
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
    const partidaGuardada = localStorage.getItem('configuracionTopGoleadores');
    if (partidaGuardada) {
      const config: ConfiguracionTop = JSON.parse(partidaGuardada);
      const fechaUltimaPartida = config.fechaUltimaPartida;

      // Generamos un date para comparar fechas
      const hoy = new Date();
      const hoyStr = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      
      setTiempo(config.tiempoRestante);
      setJuegoIniciado(true);

    }

    setLoading(false);

  }, []);

  // Guardado de la configuración inicial al continuar
  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();

    if (tiempo !== null) {

      setLoading(true);

      // Seleccionamos una temporada aleatoria de goleadores
      const temporadaAleatoria = GOLEADORES_TEMPORADAS[Math.floor(Math.random() * GOLEADORES_TEMPORADAS.length)];

      // Generamos un array de 10 ceros para los índices de los goleadores completados
      const indicesCompletados: number[] = Array(10).fill(0);

      // Obtenemos la fecha de hoy en formato YYYY-MM-DD
      const hoy = new Date();
      const hoyStr = hoy.toISOString().split('T')[0];

      // Guardamos la configuración inicial
      const nuevaConfiguracion: ConfiguracionTop = {
        estado: 'jugando',
        tiempoRestante: tiempo,
        goleadoresTemporada: temporadaAleatoria,
        indicesGoleadoresCompletados: indicesCompletados,
        fechaUltimaPartida: hoyStr,
        numeroJugadoresCompletados: 0
      };

      localStorage.setItem('configuracionTopGoleadores', JSON.stringify(nuevaConfiguracion));

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
  if (juegoIniciado && tiempo !== null) {
    return (
      <div className="fade-in">
         {/* Pasamos los datos como props al componente del juego real */}
         <JuegoTopGoleadores />
      </div>
    );
  }

  return (
      <div className="contenedor-configuracion">

        <div className="container-fluid">
          <div className="row justify-content-evenly align-items-center">

            <div className="col-10 col-lg-4 d-flex justify-content-center">

              <img src="/img/minijuegos/juegos/top-goleadores.webp" alt="Top Goleadores" className='img-fluid img-minijuego'/>

            </div>
            <div className="col-10 col-lg-4">

              <p className='presentacion-el-once'>
                ¿Qué queda de una temporada cuando se apagan las luces? <strong>El Top</strong> es la arena definitiva donde las estadísticas cobran vida y la memoria se convierte en trofeo. En esta edición, <strong>Goleadores</strong>, el reto es honrar a los dueños del grito sagrado en la <strong>Liga 1.</strong> No basta con recordar al campeón; aquí la gloria pertenece a los artilleros que, <strong>con camisetas grandes o chicas, perforaron redes desde Tumbes hasta Tacna.</strong> El desafío es directo: una temporada al azar, diez casilleros vacíos y la misión de <strong>reconstruir la tabla de máximos anotadores antes de que el tiempo se agote.</strong> Es un examen a tu archivo mental, donde cada apellido correcto es un tributo a la eficacia. <strong>¿Tienes la precisión necesaria para completar la lista y reclamar el Botín de Oro de la nostalgia?</strong>
              </p>


              {yaJugoHoy ?  (
                <div style={{ backgroundColor: 'rgba(255, 255, 0, 0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                     <p style={{ color: '#ffd700', textAlign: 'center', margin: 0 }}>
                        ⚠️ Nota: Ya has jugado el reto diario de hoy.
                    </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleContinuar}>

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
                </>
              )
              }
            </div>

          </div>
        </div>
      </div>
  );

}