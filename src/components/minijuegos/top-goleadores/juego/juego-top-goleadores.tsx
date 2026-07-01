import { useState, useEffect } from 'react';
import Buscador from '../../../buscador';
import Equipos from '../../../../data/minijuegos/equipos.json';
import Jugadores from '../../../../data/minijuegos/jugadores_obtenidos.json';
import type { Jugador } from '../../../../types/minijuegos/jugador.interface';
import type { ConfiguracionTop, ResultadoFinalTop } from '../../../../types/minijuegos/tops/configuracion-top';
import type { GoleadoresTemporadas } from '../../../../types/minijuegos/tops/goleadores';
import Spinner from '../../Spinner';
import './styles.css';

// --- CONSTANTES Y CONFIGURACIÓN ---

const CONFIGURACION_KEY = "configuracionTopGoleadores";
const RESULTADO_KEY = "topGoleadoresResultado";
const DURACION_REVISION = 5000;

interface ObjetoReducido {
  id?: number;
  nombre: string;
  url_foto: string;
}

const anio_actual = new Date().getFullYear();

const EQUIPOS = Equipos.reduce((acc, equipo) => {
  acc[equipo.id] = { nombre: equipo.nombre, url_foto: equipo.url_foto };
  return acc;
}, {} as Record<number, ObjetoReducido>);

const JUGADORES = Jugadores as Jugador[];

export default function JuegoTopGoleadores() {

  // --- ESTADOS ---
  const [data, setData] = useState<ConfiguracionTop | null>(null);
  const [cargando, setCargando] = useState(true);

  // Estado del Juego
  const [goleadoresTemporadas, setGoleadoresTemporadas] = useState<GoleadoresTemporadas | null>(null);
  const [indicesGoleadoresCompletados, setIndicesGoleadoresCompletados] = useState<number[]>([]);
  const [numeroJugadoresCompletados, setNumeroJugadoresCompletados] = useState(0);
  const [jugadoresReducidos, setJugadoresReducidos] = useState<Record<number, ObjetoReducido>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tiempoRestante, setTiempoRestante] = useState<number>(0);
  const [estadoJuego, setEstadoJuego] = useState<string>('jugando');
  const [seRindio, setSeRindio] = useState(false);
  const [fase, setFase] = useState<'jugando' | 'revisando' | 'finalizado'>('jugando');
  const [tiempoTotal, setTiempoTotal] = useState<number>(0);

  // --- 1. CARGA INICIAL (RECUPERAR O INICIAR NUEVO) ---
  useEffect(() => {

    setCargando(true);

    const partidaGuardada = localStorage.getItem(CONFIGURACION_KEY);
    
    if (!partidaGuardada) {
      localStorage.removeItem(CONFIGURACION_KEY);
      setCargando(false);
      window.location.replace('/minijuegos/top-goleadores');
      return;
    }

    try {
      const parsed : ConfiguracionTop = JSON.parse(partidaGuardada);

      if (parsed.estado === 'jugando') {
        console.log("🔄 Partida recuperada del almacenamiento.");
        setData(parsed);
        setTiempoRestante(parsed.tiempoRestante);
        setGoleadoresTemporadas(parsed.goleadoresTemporada);
        setIndicesGoleadoresCompletados(parsed.indicesGoleadoresCompletados);
        setNumeroJugadoresCompletados(parsed.numeroJugadoresCompletados);
        setEstadoJuego(parsed.estado);

        // Obtenemos los jugadores goleadores de la temporada
        const jugadores : ObjetoReducido[] = JUGADORES.filter(j => parsed.goleadoresTemporada.goleadores.some(g => g.id_jugador === j.id))
        .map(j => ({ id: j.id, nombre: j.nombre, url_foto: j.url_foto }));

        // Lo convertimos a un objeto Record para acceso rápido
        setJugadoresReducidos(jugadores.reduce((acc, jugador) => {
            acc[jugador.id!] = jugador;
            return acc;
        }, {} as Record<number, ObjetoReducido>));

        console.log("⚽ Jugadores goleadores cargados:", jugadoresReducidos);

      } else {
        setNumeroJugadoresCompletados(parsed.numeroJugadoresCompletados);
        setEstadoJuego(parsed.estado);
      }

      setCargando(false);
      return;

    } catch (error) {
      console.error("Error al leer partida guardada, reiniciando...", error);
      localStorage.removeItem(CONFIGURACION_KEY);
      setCargando(false);
      window.location.replace('/minijuegos/top-goleadores');
      return;
    }

  }, []);

  // --- 2. PERSISTENCIA (GUARDADO AUTOMÁTICO) ---
  useEffect(() => {
      // No guardamos si no hay datos o estamos cargando
      if (cargando || !data) return;

      const configuracionSnapshot : ConfiguracionTop = {
          estado: estadoJuego,
          tiempoRestante: tiempoRestante,
          goleadoresTemporada: goleadoresTemporadas!,
          indicesGoleadoresCompletados: indicesGoleadoresCompletados,
          fechaUltimaPartida: data.fechaUltimaPartida,
          numeroJugadoresCompletados: numeroJugadoresCompletados
      };

      localStorage.setItem(CONFIGURACION_KEY, JSON.stringify(configuracionSnapshot));

  }, [data, tiempoRestante, estadoJuego, cargando, goleadoresTemporadas, indicesGoleadoresCompletados, numeroJugadoresCompletados]);

  // --- 3. CRONÓMETRO ---
  useEffect(() => {
    if (!data || data.tiempoRestante === 0 || estadoJuego !== 'jugando') return;

    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          setEstadoJuego('perdido');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [data, estadoJuego]);

  // Cronómetro total del juego (para mostrar tiempo total en el resultado)
  useEffect(() => {
    if (estadoJuego !== 'jugando' || !data) return;
    if (data.tiempoRestante === 0) return; // Sin tiempo, no contar
    const intervalo = setInterval(() => {
      setTiempoTotal((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [data, estadoJuego]);

  // Detectar fin del juego y guardar resultado
  useEffect(() => {
    if (estadoJuego === 'jugando' || !goleadoresTemporadas) return;
    if (fase !== 'jugando') return;

    // Guardar resultado en localStorage
    const resultado: ResultadoFinalTop = {
      dia: new Date().toISOString().split('T')[0],
      gano: estadoJuego === 'ganado',
      goleadoresCompletados: numeroJugadoresCompletados,
      goleadoresTemporada: goleadoresTemporadas,
      indicesGoleadoresCompletados: indicesGoleadoresCompletados,
      seRindio,
      tiempoTotalSegundos: tiempoTotal,
    };
    localStorage.setItem(RESULTADO_KEY, JSON.stringify(resultado));

    // Iniciar fase de revisión
    setFase('revisando');
    const timer = setTimeout(() => {
      setFase('finalizado');
    }, DURACION_REVISION);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estadoJuego]);

  // Efecto para generar variable en localStorage que indique que el juego ya se jugó hoy
  useEffect(() => {
    if (estadoJuego !== 'jugando') {
        const hoy = new Date();
        const hoyStr = hoy.toISOString().split('T')[0];
        localStorage.setItem('topGoleadoresUltimaPartida', hoyStr);
    }
  }, [estadoJuego]);

  // --- LÓGICA DE JUEGO ---

  const agregarJugadorAlTop = (jugador: Jugador) => {
    setErrorMsg(null);

    // 1. Verificamos si existe en la lista de goleadores
    const goleadoresLista = goleadoresTemporadas!.goleadores;
    const jugadorGoleador = goleadoresLista.find(g => g.id_jugador === jugador.id);
    if (!jugadorGoleador) {
        setErrorMsg(`El jugador ${jugador.nombre} no figura en el ranking de goleadores.`);
        return;
    }

    // 2. Verificamos que no haya sido determinado ya
    const indiceGoleador : number = jugadorGoleador.rank - 1;
    if (indicesGoleadoresCompletados[indiceGoleador] === 1) {
        setErrorMsg(`El jugador ${jugador.nombre} ya ha sido determinado previamente.`);
        return;
    }

    // --- ÉXITO ---
    const nuevoIndices = [...indicesGoleadoresCompletados];
    nuevoIndices[indiceGoleador] = 1;
    setIndicesGoleadoresCompletados(nuevoIndices);
    setNumeroJugadoresCompletados(numeroJugadoresCompletados + 1);
    setErrorMsg(null);
  };

  // Efecto para cuando se encuentra un nuevo goleador
  useEffect(() => {
    if (numeroJugadoresCompletados >= 10) {
        setEstadoJuego('ganado');
    }
  }, [numeroJugadoresCompletados]);

  const handleRendirse = () => {
    setSeRindio(true);
    setEstadoJuego('perdido');
  };

  // FUNCIÓN PARA REINICIAR Y VOLVER AL MENÚ
  const reiniciarJuegoTotalmente = () => {
      // 1. Borrar snapshot de la partida
      localStorage.removeItem(CONFIGURACION_KEY);
  };

  const volver = () => {
    reiniciarJuegoTotalmente();
    window.location.reload();
  }

  // --- RENDERIZADO: PANTALLA FIN DE JUEGO (panel final, tras revisión) ---
  if (fase === 'finalizado') {
      return (
          <div className="juego-container fade-in d-flex justify-content-center align-items-center">
              <div className="text-center contenedor-menu-fin" style={{ border: `2px solid ${estadoJuego === 'ganado' ? '#22c55e' : '#ef4444'}` }}>
                  <h1 className='texto-estado-juego' style={{ color: estadoJuego === 'ganado' ? '#22c55e' : '#ef4444' }}>
                      {estadoJuego === 'ganado' ? '¡VICTORIA!' : 'JUEGO TERMINADO'}
                  </h1>

                  <p className='texto-explicacion-estado'>
                      {estadoJuego === 'ganado'
                          ? 'Has completado el top de goleadores con éxito. ¡Felicidades!'
                          : 'No lograste completar el top de goleadores a tiempo. ¡Suerte para la próxima!'}
                  </p>

                  <div style={{ marginTop: '30px' }}>
                      <p className='texto-explicacion-estado'>Goleadores encontrados: {numeroJugadoresCompletados} / 10</p>
                      {seRindio && (
                          <p className='texto-explicacion-estado'>Te rendiste</p>
                      )}

                      <button
                          className="btn btn-primary mt-3"
                          onClick={volver}
                      >
                          VOLVER AL MENÚ
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  // --- RENDERIZADO: JUEGO ACTIVO ---
  if (cargando || !data) return <Spinner size="lg" mensaje="Cargando partida..." />;

  // Helper Tiempo
  const formatoTiempo = (segundos: number) => {
      if (data.tiempoRestante === 0) return "∞";
      const min = Math.floor(segundos / 60);
      const sec = segundos % 60;
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (

    <>
    <div className="juego-container fade-in">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">

          <div className="col-11 col-lg-6 contenedor-juego">

            <div className="row justify-content-center align-items-center">

              <div className="col-10">
                <h1 className='texto-titulo-top'>TOP: GOLEADORES DE LA TEMPORADA {data.goleadoresTemporada.temporada}</h1>
              </div>

              <div className="col-11 col-lg-10 mt-3">
                <div className="row justify-content-center align-items-center">

                  {
                    goleadoresTemporadas?.goleadores.map((goleador, index) => {
                      const esCompletado = indicesGoleadoresCompletados[index] === 1;
                      const mostrarRevelado = esCompletado || seRindio || fase !== 'jugando';
                      const jugadorInfo = jugadoresReducidos[goleador.id_jugador];
                      const equiposInfo = goleador.id_equipo.map(id_eq => EQUIPOS[id_eq]);
                      const claseFila = esCompletado
                        ? 'contenedor-fila-goleador-conseguido'
                        : (seRindio || fase !== 'jugando')
                          ? 'contenedor-fila-goleador-rindio'
                          : 'contenedor-fila-goleador';
                      return (
                        <div className={`col-11 col-lg-10 ${claseFila} my-1`} key={index}>
                          <div className="row align-items-center justify-content-center">

                            <div className="col-1 col-lg-2 text-center">
                              <p className='texto-ranking-goleador'>{goleador.rank}</p>
                            </div>

                            <div className="col-7 text-center">
                              <div className="row align-items-center justify-content-between">
                                {mostrarRevelado ? (
                                  <>
                                    <div className="col-2 col-lg-3 text-center px-0">
                                      <img src={jugadorInfo?.url_foto} alt={jugadorInfo?.nombre} className='img-fluid img-jugador-goleador'/>
                                    </div>
                                    <div className="col-7 text-center">
                                      <span className='texto-nombre-jugador-goleador'>{jugadorInfo?.nombre}</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="col-3 text-center">
                                      </div>
                                    <div className="col-7 text-center">
                                      <span className='texto-nombre-jugador-goleador oculto'>??????????</span>
                                    </div>
                                  </>
                                )}
                                <div className="col-2 text-end">
                                  <span className='texto-goles-jugador'>({goleador.goles})</span>
                                </div>
                              </div>
                            </div>

                            <div className="col-3">
                              <div className="row align-items-center justify-content-center">

                              { equiposInfo.map((eq, idx) => (
                                <div className="col-4 text-center px-0" key={idx}>
                                  <img src={eq.url_foto} alt={eq.nombre} className='img-fluid img-equipo-goleador'/>
                                </div>
                              ))}

                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })
                  }

                </div>
              </div>
              
              {
                !seRindio && fase === 'jugando' ? (
                  <>
                  <div className="col-8 text-center">
                    {errorMsg && (
                      <div className="alerta-equivocacion" role="alert">
                        ⚠️ {errorMsg}
                      </div>
                    )}
                  </div>

                  <div className="col-11 col-lg-9 contenedor-controles">
                    <div className="row justify-content-evenly align-items-center">
                   
                      <div className="col-6 col-lg-4 d-flex justify-content-center align-items-center px-0">
                        <div className='contenedor-tiempo'>
                          <span className='texto-tiempo-restante'>Tiempo Restante: </span>
                          <span className='texto-valor-tiempo-restante'
                          style={{
                                    color: (tiempoRestante > 0 && tiempoRestante <= 10) ? '#ef4444' : 'white',
                                    fontSize: '1.2rem'
                                }}>{formatoTiempo(tiempoRestante)}</span>
                        </div>
                      </div>
                             
                      <div className="col-5 d-flex justify-content-center align-items-center d-none d-lg-block">
                        <Buscador
                          onJugadorSeleccionado={agregarJugadorAlTop}
                        />
                      </div>
                             
                      <div className="col-4 col-lg-3 d-flex justify-content-center align-items-center">
                        <button
                          className="btn btn-danger"
                          onClick={handleRendirse}
                        >
                          🏳️ Rendirse
                        </button>
                      </div>

                      <div className="col-12 d-flex justify-content-center align-items-center d-block d-lg-none">
                        <Buscador
                          onJugadorSeleccionado={agregarJugadorAlTop}
                        />
                      </div>
                             
                    </div>
                  </div>
                  </>
                ) : seRindio ? (
                  <>
                  <div className="col-8 text-center">
                    <div className="alerta-rendicion" role="alert">
                      🏳️ Has decidido rendirte. Mostrando resultados...
                    </div>
                  </div>
                  </>
                ) : null
              }

            </div>

          </div>

        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-10 col-lg-8 contenedor-descripcion-minijuego">

          <div className="row justify-content-center align-items-center">

              <div className="col-10 col-lg-10">
                <h2 className='titulo-descripcion-minijuego'>El Top - Goleadores: El Archivo del Gol</h2>
              </div>

              <div className="col-11 col-lg-10">
                <p className="texto-descripcion-minijuego">
                  ¿Tu memoria es tan letal como un '9' de área? <strong>El Top</strong> no es un juego de adivinanzas, es una prueba de precisión histórica. El sistema elegirá una <strong>temporada al azar entre 2010 y {anio_actual - 1}</strong>, y te presentará una tabla vacía con una misión clara: identificar a los <strong>10 máximos goleadores</strong> de aquel año. Tendrás como guía la <strong>cantidad de goles</strong> y el <strong>escudo del equipo</strong> que defendieron, pero el apellido lo pones tú. No te confíes con los nombres obvios; aquí tendrás que recordar al extranjero que tuvo una racha inolvidable o al <strong>héroe de provincia que sorprendió a todos.</strong> Desempolva las estadísticas, afina la puntería y demuestra que eres <strong>la enciclopedia viviente del gol peruano.</strong>
                </p>
              </div>

          </div>

        </div>
      </div>
    </div>
    </>
  );
}