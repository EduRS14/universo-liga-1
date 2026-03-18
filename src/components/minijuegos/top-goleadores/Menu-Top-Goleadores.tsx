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
         <JuegoTopGoleadores />
      </div>
    );
  }

  // --- NUEVA VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion">
      <div className="menu-juego-top-full-bg fade-in">
        
        {/* OVERLAY GENERAL */}
        <div className="top-overlay-fondo"></div>

        {/* CONTENIDO FLOTANTE */}
        <div className="top-contenido-contenedor">
          
          {/* Cabecera del Juego */}
          <div className="top-cabecera text-center mb-5">
            <span className="badge-categoria-top">RETO DIARIO</span>
            <h1 className="titulo-hero-top">EL TOP</h1>
            <h2 className="subtitulo-hero-top">GOLEADORES: LA MEMORIA DEL GOL</h2>
          </div>

          {/* Cuerpo y Acción */}
          <div className="top-cuerpo-accion text-center">
            <p className="descripcion-juego-top text-justify">
              ¿Qué queda de una temporada cuando se apagan las luces? <strong>El Top</strong> es la arena definitiva donde las estadísticas cobran vida. Tu misión es reconstruir la tabla de máximos anotadores de una <strong>temporada al azar</strong> antes de que el tiempo se agote. Es un examen a tu archivo mental, donde cada apellido correcto es un tributo a la eficacia. <strong>¿Tienes la precisión necesaria para reclamar el Botín de Oro de la nostalgia?</strong>
            </p>

            {yaJugoHoy ?  (
              <div className="alerta-jugado-top fade-in">
                <span className="alerta-icono-top">🏆</span>
                <p>Ya jugaste la edición de hoy<br/><strong>Vuelve mañana por una nueva temporada</strong></p>
              </div>
            ) : (
              <form onSubmit={handleContinuar} className="seccion-accion-top">
                
                {/* SELECTOR DE TIEMPO MODERNO */}
                <div className="contenedor-config-tiempo">
                  <h3 className="titulo-config-top">⏱️ Selecciona tu tiempo:</h3>
                  <div className="selector-tiempo-top">
                    {TIEMPOS.map((item) => (
                      <div key={item.label} className="opcion-radio-wrapper">
                        <input
                          type="radio"
                          id={`tiempo-${item.label}`}
                          name="tiempo"
                          value={item.value}
                          className="radio-oculto-top"
                          onChange={() => setTiempo(item.value)}
                          checked={tiempo === item.value}
                        />
                        <label htmlFor={`tiempo-${item.label}`} className="radio-label-top">
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
                  className="btn-iniciar-reto-top mt-4"
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