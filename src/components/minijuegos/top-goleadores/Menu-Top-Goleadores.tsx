import { useState, useEffect } from 'react';
import JuegoTopGoleadores from './juego/juego-top-goleadores';
import Spinner from '../Spinner';
import GoleadoresTemporadasData from '../../../data/minijuegos/goleadores_temporada.json';
import JugadoresData from '../../../data/minijuegos/jugadores_obtenidos.json';
import EquiposData from '../../../data/minijuegos/equipos.json';
import type { ConfiguracionTop, ResultadoFinalTop } from '../../../types/minijuegos/tops/configuracion-top';
import type { GoleadoresTemporadas } from '../../../types/minijuegos/tops/goleadores';
import type { Jugador } from '../../../types/minijuegos/jugador.interface';
import './styles.css';

const TIEMPOS = [
  { label: "Sin Tiempo", value: 0 },
  { label: "1m", value: 60 },
  { label: "2m", value: 120 },
  { label: "3m", value: 180 }
];

const GOLEADORES_TEMPORADAS: GoleadoresTemporadas[] = GoleadoresTemporadasData;

const JUGADORES = JugadoresData as Jugador[];

interface ObjetoReducido {
  id?: number;
  nombre: string;
  url_foto: string;
}

const EQUIPOS = EquiposData.reduce((acc, equipo) => {
  acc[equipo.id] = { nombre: equipo.nombre, url_foto: equipo.url_foto };
  return acc;
}, {} as Record<number, ObjetoReducido>);

const RESULTADO_KEY = "topGoleadoresResultado";

// --- COMPONENTE PRINCIPAL ---
export default function MenuTopGoleadores() {
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState<ResultadoFinalTop | null>(null);
  const [verResultado, setVerResultado] = useState(false);

  // 1. CARGA INICIAL
  useEffect(() => {
    setLoading(true);

    // Verificamos si ya jugó hoy
    const ultimaPartida = localStorage.getItem('topGoleadoresUltimaPartida');
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

    if (ultimaPartida === hoyStr) {
      setYaJugoHoy(true);

      // Cargamos el resultado guardado para mostrarlo en VER RESULTADO
      const resultadoGuardado = localStorage.getItem(RESULTADO_KEY);
      if (resultadoGuardado) {
        try {
          const parsed = JSON.parse(resultadoGuardado) as ResultadoFinalTop;
          if (parsed.dia === hoyStr) {
            setResultado(parsed);
          }
        } catch {
          // ignorar
        }
      }
      setLoading(false);
      return;
    }

    // Verificamos si hay una partida en curso
    const partidaGuardada = localStorage.getItem('configuracionTopGoleadores');
    if (partidaGuardada) {
      const config: ConfiguracionTop = JSON.parse(partidaGuardada);
      setTiempo(config.tiempoRestante);
      setJuegoIniciado(true);
    }

    setLoading(false);
  }, []);

  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();
    if (tiempo === null) return;
    setLoading(true);

    const temporadaAleatoria = GOLEADORES_TEMPORADAS[Math.floor(Math.random() * GOLEADORES_TEMPORADAS.length)];
    const indicesCompletados: number[] = Array(10).fill(0);
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

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
  };

  if (loading) {
    return <Spinner size="lg" mensaje="Preparando Top Goleadores..." />;
  }

  // --- VISTA DEL JUEGO ---
  if (juegoIniciado && tiempo !== null) {
    return (
      <div className="fade-in">
        <JuegoTopGoleadores />
      </div>
    );
  }

  // --- VISTA DEL RESULTADO FINAL (VER RESULTADO) ---
  if (verResultado && resultado) {
    const jugadoresReducidos: Record<number, ObjetoReducido> = JUGADORES
      .filter((j) => resultado.goleadoresTemporada.goleadores.some((g) => g.id_jugador === j.id))
      .reduce((acc, j) => {
        acc[j.id] = { id: j.id, nombre: j.nombre, url_foto: j.url_foto };
        return acc;
      }, {} as Record<number, ObjetoReducido>);

    return (
      <div className="contenedor-configuracion">
        <div className="menu-juego-top-full-bg fade-in">
          <div className="top-contenido-contenedor top-resultado-contenedor">
            <div
              className="contenedor-menu-fin top-resultado-panel"
              style={{ border: `2px solid ${resultado.gano ? '#22c55e' : '#ef4444'}` }}
            >
              <h1
                className='texto-estado-juego'
                style={{ color: resultado.gano ? '#22c55e' : '#ef4444' }}
              >
                {resultado.gano ? '¡VICTORIA!' : 'JUEGO TERMINADO'}
              </h1>

              <p className='texto-explicacion-estado'>
                {resultado.gano
                  ? 'Has completado el top de goleadores con éxito. ¡Felicidades!'
                  : 'No lograste completar el top de goleadores. ¡Suerte para la próxima!'}
              </p>

              <div className="top-resultado-titulo-temporada">
                <h2 className='texto-titulo-top'>
                  TOP: GOLEADORES DE LA TEMPORADA {resultado.goleadoresTemporada.temporada}
                </h2>
              </div>

              <div className="row justify-content-center align-items-center top-resultado-lista">
                {resultado.goleadoresTemporada.goleadores.map((goleador, index) => {
                  const esCompletado = resultado.indicesGoleadoresCompletados[index] === 1;
                  const jugadorInfo = jugadoresReducidos[goleador.id_jugador];
                  const equiposInfo = goleador.id_equipo.map((id_eq) => EQUIPOS[id_eq]);
                  const claseFila = esCompletado
                    ? 'contenedor-fila-goleador-conseguido'
                    : 'contenedor-fila-goleador-rindio';
                  return (
                    <div className={`col-11 col-lg-10 mx-auto ${claseFila} my-1`} key={index}>
                      <div className="row align-items-center justify-content-center top-resultado-fila">
                        <div className="col-1 col-lg-1 text-center">
                          <p className='texto-ranking-goleador'>{goleador.rank}</p>
                        </div>
                        <div className="col-2 col-lg-2 text-center px-0">
                          <img
                            src={jugadorInfo?.url_foto}
                            alt={jugadorInfo?.nombre}
                            className='img-fluid img-jugador-goleador'
                          />
                        </div>
                        <div className="col-5 col-lg-5 text-center">
                          <span className='texto-nombre-jugador-goleador'>{jugadorInfo?.nombre}</span>
                        </div>
                        <div className="col-1 col-lg-1 text-center">
                          <span className='texto-goles-jugador'>({goleador.goles})</span>
                        </div>
                        <div className="col-3 col-lg-3">
                          <div className="row align-items-center justify-content-center">
                            {equiposInfo.map((eq, idx) => (
                              <div className="col-4 text-center px-0" key={idx}>
                                <img src={eq.url_foto} alt={eq.nombre} className='img-fluid img-equipo-goleador' />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="top-resultado-resumen">
                <p className='texto-explicacion-estado'>
                  Goleadores encontrados: {resultado.goleadoresCompletados} / 10
                </p>
                {resultado.seRindio && (
                  <p className='texto-explicacion-estado'>Te rendiste</p>
                )}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setVerResultado(false)}
                >
                  VOLVER AL MENÚ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA DEL MENÚ ---
  return (
    <div className="contenedor-configuracion">
      <div className="menu-juego-top-full-bg fade-in">

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
              ¿Qué queda de una temporada cuando se apagan las luces? <strong>El Top</strong> es la arena definitiva donde las estadísticas cobran vida. Tu misión es reconstruir la tabla de máximos anotadores de una <strong>temporada al azar entre 2010 y 2025</strong> antes de que el tiempo se agote. Es un examen a tu archivo mental, donde cada apellido correcto es un tributo a la eficacia. <strong>¿Tienes la precisión necesaria para reclamar la Bota de Oro de la nostalgia? Reto diario</strong>
            </p>

            {yaJugoHoy ? (
              <>
                <div className="alerta-jugado-top fade-in">
                  <span className="alerta-icono-top">🏆</span>
                  <p>
                    Ya jugaste la edición de hoy<br />
                    <strong>Vuelve mañana por una nueva temporada</strong>
                  </p>
                </div>
                {resultado && (
                  <button
                    id="btn-ver-resultado"
                    className="btn-ver-resultado-top mt-3"
                    onClick={() => setVerResultado(true)}
                  >
                    VER RESULTADO
                  </button>
                )}
              </>
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