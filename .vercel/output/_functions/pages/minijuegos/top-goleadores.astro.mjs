import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CH_ZwYLk.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Buscador } from '../../chunks/buscador_DVHYhz_L.mjs';
import { E as Equipos } from '../../chunks/equipos_CyvvOnT7.mjs';
import { J as Jugadores } from '../../chunks/jugadores_obtenidos_BRpnsaQX.mjs';
/* empty css                                             */
export { renderers } from '../../renderers.mjs';

const CONFIGURACION_KEY = "configuracionTopGoleadores";
const anio_actual = (/* @__PURE__ */ new Date()).getFullYear();
const EQUIPOS = Equipos.reduce((acc, equipo) => {
  acc[equipo.id] = { nombre: equipo.nombre, url_foto: equipo.url_foto };
  return acc;
}, {});
const JUGADORES = Jugadores;
function JuegoTopGoleadores() {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [goleadoresTemporadas, setGoleadoresTemporadas] = useState(null);
  const [indicesGoleadoresCompletados, setIndicesGoleadoresCompletados] = useState([]);
  const [numeroJugadoresCompletados, setNumeroJugadoresCompletados] = useState(0);
  const [jugadoresReducidos, setJugadoresReducidos] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState("jugando");
  const [seRindio, setSeRindio] = useState(false);
  useEffect(() => {
    setCargando(true);
    const partidaGuardada = localStorage.getItem(CONFIGURACION_KEY);
    if (!partidaGuardada) {
      localStorage.removeItem(CONFIGURACION_KEY);
      setCargando(false);
      window.location.replace("/minijuegos/top-goleadores");
      return;
    }
    try {
      const parsed = JSON.parse(partidaGuardada);
      if (parsed.estado === "jugando") {
        console.log("🔄 Partida recuperada del almacenamiento.");
        setData(parsed);
        setTiempoRestante(parsed.tiempoRestante);
        setGoleadoresTemporadas(parsed.goleadoresTemporada);
        setIndicesGoleadoresCompletados(parsed.indicesGoleadoresCompletados);
        setNumeroJugadoresCompletados(parsed.numeroJugadoresCompletados);
        setEstadoJuego(parsed.estado);
        const jugadores = JUGADORES.filter((j) => parsed.goleadoresTemporada.goleadores.some((g) => g.id_jugador === j.id)).map((j) => ({ id: j.id, nombre: j.nombre, url_foto: j.url_foto }));
        setJugadoresReducidos(jugadores.reduce((acc, jugador) => {
          acc[jugador.id] = jugador;
          return acc;
        }, {}));
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
      window.location.replace("/minijuegos/top-goleadores");
      return;
    }
  }, []);
  useEffect(() => {
    if (cargando || !data) return;
    const configuracionSnapshot = {
      estado: estadoJuego,
      tiempoRestante,
      goleadoresTemporada: goleadoresTemporadas,
      indicesGoleadoresCompletados,
      fechaUltimaPartida: data.fechaUltimaPartida,
      numeroJugadoresCompletados
    };
    localStorage.setItem(CONFIGURACION_KEY, JSON.stringify(configuracionSnapshot));
  }, [data, tiempoRestante, estadoJuego, cargando, goleadoresTemporadas, indicesGoleadoresCompletados, numeroJugadoresCompletados]);
  useEffect(() => {
    if (!data || data.tiempoRestante === 0 || estadoJuego !== "jugando") return;
    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          setEstadoJuego("perdido");
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(intervalo);
  }, [data, estadoJuego]);
  useEffect(() => {
    if (estadoJuego !== "jugando") {
      const hoy = /* @__PURE__ */ new Date();
      const hoyStr = hoy.toISOString().split("T")[0];
      localStorage.setItem("topGoleadoresUltimaPartida", hoyStr);
    }
  }, [estadoJuego]);
  const agregarJugadorAlTop = (jugador) => {
    setErrorMsg(null);
    const goleadoresLista = goleadoresTemporadas.goleadores;
    const jugadorGoleador = goleadoresLista.find((g) => g.id_jugador === jugador.id);
    if (!jugadorGoleador) {
      setErrorMsg(`El jugador ${jugador.nombre} no figura en el ranking de goleadores.`);
      return;
    }
    const indiceGoleador = jugadorGoleador.rank - 1;
    if (indicesGoleadoresCompletados[indiceGoleador] === 1) {
      setErrorMsg(`El jugador ${jugador.nombre} ya ha sido determinado previamente.`);
      return;
    }
    const nuevoIndices = [...indicesGoleadoresCompletados];
    nuevoIndices[indiceGoleador] = 1;
    setIndicesGoleadoresCompletados(nuevoIndices);
    setNumeroJugadoresCompletados(numeroJugadoresCompletados + 1);
    setErrorMsg(null);
  };
  useEffect(() => {
    if (numeroJugadoresCompletados >= 10) {
      setEstadoJuego("ganado");
    }
  }, [numeroJugadoresCompletados]);
  const handleRendirse = () => {
    setSeRindio(true);
    setTimeout(() => {
      setEstadoJuego("perdido");
    }, 5e3);
  };
  const reiniciarJuegoTotalmente = () => {
    localStorage.removeItem(CONFIGURACION_KEY);
  };
  const volver = () => {
    reiniciarJuegoTotalmente();
    window.location.reload();
  };
  if (estadoJuego !== "jugando") {
    return /* @__PURE__ */ jsx("div", { className: "juego-container fade-in d-flex justify-content-center align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center contenedor-menu-fin", style: { border: `2px solid ${estadoJuego === "ganado" ? "#22c55e" : "#ef4444"}` }, children: [
      /* @__PURE__ */ jsx("h1", { className: "texto-estado-juego", style: { color: estadoJuego === "ganado" ? "#22c55e" : "#ef4444" }, children: estadoJuego === "ganado" ? "¡VICTORIA!" : "JUEGO TERMINADO" }),
      /* @__PURE__ */ jsx("p", { className: "texto-explicacion-estado", children: estadoJuego === "ganado" ? "Has completado el top de goleadores con éxito. ¡Felicidades!" : "No lograste completar el top de goleadores a tiempo. ¡Suerte para la próxima!" }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: "30px" }, children: [
        /* @__PURE__ */ jsxs("p", { className: "texto-explicacion-estado", children: [
          "Goleadores encontrados: ",
          numeroJugadoresCompletados,
          " / 10"
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-primary mt-3",
            onClick: volver,
            children: "Jugar de Nuevo"
          }
        )
      ] })
    ] }) });
  }
  if (cargando || !data) return /* @__PURE__ */ jsx("div", { className: "texto-cargando", children: "Cargando..." });
  const formatoTiempo = (segundos) => {
    if (data.tiempoRestante === 0) return "∞";
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "juego-container fade-in", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-6 contenedor-juego", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsxs("h1", { className: "texto-titulo-top", children: [
        "TOP: GOLEADORES DE LA TEMPORADA ",
        data.goleadoresTemporada.temporada
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-10 mt-3", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: goleadoresTemporadas?.goleadores.map((goleador, index) => {
        const esCompletado = indicesGoleadoresCompletados[index] === 1;
        const jugadorInfo = jugadoresReducidos[goleador.id_jugador];
        const equiposInfo = goleador.id_equipo.map((id_eq) => EQUIPOS[id_eq]);
        return /* @__PURE__ */ jsx("div", { className: `col-11 col-lg-10 ${esCompletado ? "contenedor-fila-goleador-conseguido" : seRindio ? "contenedor-fila-goleador-rindio" : "contenedor-fila-goleador"} my-1`, children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center justify-content-center", children: [
          /* @__PURE__ */ jsx("div", { className: "col-1 col-lg-2 text-center", children: /* @__PURE__ */ jsx("p", { className: "texto-ranking-goleador", children: goleador.rank }) }),
          /* @__PURE__ */ jsx("div", { className: "col-7 text-center", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center justify-content-between", children: [
            esCompletado || seRindio ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "col-2 col-lg-3 text-center px-0", children: /* @__PURE__ */ jsx("img", { src: jugadorInfo?.url_foto, alt: jugadorInfo?.nombre, className: "img-fluid img-jugador-goleador" }) }),
              /* @__PURE__ */ jsx("div", { className: "col-7 text-center", children: /* @__PURE__ */ jsx("span", { className: "texto-nombre-jugador-goleador", children: jugadorInfo?.nombre }) })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "col-3 text-center" }),
              /* @__PURE__ */ jsx("div", { className: "col-7 text-center", children: /* @__PURE__ */ jsx("span", { className: "texto-nombre-jugador-goleador oculto", children: "??????????" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-2 text-end", children: /* @__PURE__ */ jsxs("span", { className: "texto-goles-jugador", children: [
              "(",
              goleador.goles,
              ")"
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-3", children: /* @__PURE__ */ jsx("div", { className: "row align-items-center justify-content-center", children: equiposInfo.map((eq, idx) => /* @__PURE__ */ jsx("div", { className: "col-4 text-center px-0", children: /* @__PURE__ */ jsx("img", { src: eq.url_foto, alt: eq.nombre, className: "img-fluid img-equipo-goleador" }) }, idx)) }) })
        ] }) }, index);
      }) }) }),
      !seRindio ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "col-8 text-center", children: errorMsg && /* @__PURE__ */ jsxs("div", { className: "alerta-equivocacion", role: "alert", children: [
          "⚠️ ",
          errorMsg
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-9 contenedor-controles", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-evenly align-items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "col-6 col-lg-4 d-flex justify-content-center align-items-center px-0", children: /* @__PURE__ */ jsxs("div", { className: "contenedor-tiempo", children: [
            /* @__PURE__ */ jsx("span", { className: "texto-tiempo-restante", children: "Tiempo Restante: " }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "texto-valor-tiempo-restante",
                style: {
                  color: tiempoRestante > 0 && tiempoRestante <= 10 ? "#ef4444" : "white",
                  fontSize: "1.2rem"
                },
                children: formatoTiempo(tiempoRestante)
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-5 d-flex justify-content-center align-items-center d-none d-lg-block", children: /* @__PURE__ */ jsx(
            Buscador,
            {
              onJugadorSeleccionado: agregarJugadorAlTop
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "col-4 col-lg-3 d-flex justify-content-center align-items-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-danger",
              onClick: handleRendirse,
              children: "🏳️ Rendirse"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "col-12 d-flex justify-content-center align-items-center d-block d-lg-none", children: /* @__PURE__ */ jsx(
            Buscador,
            {
              onJugadorSeleccionado: agregarJugadorAlTop
            }
          ) })
        ] }) })
      ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "col-8 text-center", children: /* @__PURE__ */ jsx("div", { className: "alerta-rendicion", role: "alert", children: "🏳️ Has decidido rendirte. Mostrando resultados..." }) }) })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-8 contenedor-descripcion-minijuego", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-10", children: /* @__PURE__ */ jsx("h2", { className: "titulo-descripcion-minijuego", children: "El Top - Goleadores: El Archivo del Gol" }) }),
      /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-10", children: /* @__PURE__ */ jsxs("p", { className: "texto-descripcion-minijuego", children: [
        "¿Tu memoria es tan letal como un '9' de área? ",
        /* @__PURE__ */ jsx("strong", { children: "El Top" }),
        " no es un juego de adivinanzas, es una prueba de precisión histórica. El sistema elegirá una ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "temporada al azar entre 2010 y ",
          anio_actual - 1
        ] }),
        ", y te presentará una tabla vacía con una misión clara: identificar a los ",
        /* @__PURE__ */ jsx("strong", { children: "10 máximos goleadores" }),
        " de aquel año. Tendrás como guía la ",
        /* @__PURE__ */ jsx("strong", { children: "cantidad de goles" }),
        " y el ",
        /* @__PURE__ */ jsx("strong", { children: "escudo del equipo" }),
        " que defendieron, pero el apellido lo pones tú. No te confíes con los nombres obvios; aquí tendrás que recordar al extranjero que tuvo una racha inolvidable o al ",
        /* @__PURE__ */ jsx("strong", { children: "héroe de provincia que sorprendió a todos." }),
        " Desempolva las estadísticas, afina la puntería y demuestra que eres ",
        /* @__PURE__ */ jsx("strong", { children: "la enciclopedia viviente del gol peruano." })
      ] }) })
    ] }) }) }) })
  ] });
}

const GoleadoresTemporadasData = /* #__PURE__ */ JSON.parse("[{\"temporada\":2010,\"goleadores\":[{\"rank\":1,\"id_jugador\":1271,\"goles\":24,\"id_equipo\":[7]},{\"rank\":2,\"id_jugador\":2170,\"goles\":23,\"id_equipo\":[13]},{\"rank\":3,\"id_jugador\":2064,\"goles\":22,\"id_equipo\":[15]},{\"rank\":4,\"id_jugador\":2965,\"goles\":21,\"id_equipo\":[16]},{\"rank\":5,\"id_jugador\":2461,\"goles\":19,\"id_equipo\":[3]},{\"rank\":6,\"id_jugador\":1100,\"goles\":18,\"id_equipo\":[7]},{\"rank\":7,\"id_jugador\":3242,\"goles\":17,\"id_equipo\":[10]},{\"rank\":8,\"id_jugador\":2190,\"goles\":16,\"id_equipo\":[8]},{\"rank\":9,\"id_jugador\":3450,\"goles\":16,\"id_equipo\":[14]},{\"rank\":10,\"id_jugador\":2737,\"goles\":15,\"id_equipo\":[8]}]},{\"temporada\":2011,\"goleadores\":[{\"rank\":1,\"id_jugador\":2190,\"goles\":17,\"id_equipo\":[8]},{\"rank\":2,\"id_jugador\":1267,\"goles\":16,\"id_equipo\":[15]},{\"rank\":3,\"id_jugador\":2778,\"goles\":16,\"id_equipo\":[17]},{\"rank\":4,\"id_jugador\":3242,\"goles\":14,\"id_equipo\":[10]},{\"rank\":5,\"id_jugador\":2781,\"goles\":14,\"id_equipo\":[1]},{\"rank\":6,\"id_jugador\":2970,\"goles\":11,\"id_equipo\":[6]},{\"rank\":7,\"id_jugador\":502,\"goles\":10,\"id_equipo\":[18]},{\"rank\":8,\"id_jugador\":1939,\"goles\":10,\"id_equipo\":[18]},{\"rank\":9,\"id_jugador\":1605,\"goles\":10,\"id_equipo\":[2]},{\"rank\":10,\"id_jugador\":231,\"goles\":9,\"id_equipo\":[4]}]},{\"temporada\":2012,\"goleadores\":[{\"rank\":1,\"id_jugador\":199,\"goles\":27,\"id_equipo\":[19]},{\"rank\":2,\"id_jugador\":2461,\"goles\":20,\"id_equipo\":[2]},{\"rank\":3,\"id_jugador\":2778,\"goles\":18,\"id_equipo\":[9]},{\"rank\":4,\"id_jugador\":1985,\"goles\":17,\"id_equipo\":[3]},{\"rank\":5,\"id_jugador\":1246,\"goles\":16,\"id_equipo\":[3]},{\"rank\":6,\"id_jugador\":435,\"goles\":16,\"id_equipo\":[5]},{\"rank\":7,\"id_jugador\":2190,\"goles\":15,\"id_equipo\":[8]},{\"rank\":8,\"id_jugador\":3242,\"goles\":15,\"id_equipo\":[3]},{\"rank\":9,\"id_jugador\":2970,\"goles\":14,\"id_equipo\":[10]},{\"rank\":10,\"id_jugador\":2299,\"goles\":13,\"id_equipo\":[12]}]},{\"temporada\":2013,\"goleadores\":[{\"rank\":1,\"id_jugador\":2679,\"goles\":21,\"id_equipo\":[2]},{\"rank\":2,\"id_jugador\":3062,\"goles\":21,\"id_equipo\":[17]},{\"rank\":3,\"id_jugador\":3242,\"goles\":18,\"id_equipo\":[3]},{\"rank\":4,\"id_jugador\":1100,\"goles\":18,\"id_equipo\":[9]},{\"rank\":5,\"id_jugador\":2661,\"goles\":18,\"id_equipo\":[6]},{\"rank\":6,\"id_jugador\":2781,\"goles\":17,\"id_equipo\":[8]},{\"rank\":7,\"id_jugador\":2970,\"goles\":16,\"id_equipo\":[10]},{\"rank\":8,\"id_jugador\":987,\"goles\":15,\"id_equipo\":[15]},{\"rank\":9,\"id_jugador\":2170,\"goles\":14,\"id_equipo\":[7]},{\"rank\":10,\"id_jugador\":1486,\"goles\":14,\"id_equipo\":[12]}]},{\"temporada\":2014,\"goleadores\":[{\"rank\":1,\"id_jugador\":2912,\"goles\":23,\"id_equipo\":[7]},{\"rank\":2,\"id_jugador\":3242,\"goles\":20,\"id_equipo\":[3]},{\"rank\":3,\"id_jugador\":2661,\"goles\":17,\"id_equipo\":[19]},{\"rank\":4,\"id_jugador\":543,\"goles\":17,\"id_equipo\":[17]},{\"rank\":5,\"id_jugador\":295,\"goles\":17,\"id_equipo\":[4]},{\"rank\":6,\"id_jugador\":422,\"goles\":16,\"id_equipo\":[3]},{\"rank\":7,\"id_jugador\":2679,\"goles\":14,\"id_equipo\":[2]},{\"rank\":8,\"id_jugador\":1246,\"goles\":13,\"id_equipo\":[8]},{\"rank\":9,\"id_jugador\":2030,\"goles\":13,\"id_equipo\":[10]},{\"rank\":10,\"id_jugador\":1076,\"goles\":12,\"id_equipo\":[1]}]},{\"temporada\":2015,\"goleadores\":[{\"rank\":1,\"id_jugador\":2085,\"goles\":24,\"id_equipo\":[17]},{\"rank\":2,\"id_jugador\":231,\"goles\":23,\"id_equipo\":[10]},{\"rank\":3,\"id_jugador\":435,\"goles\":19,\"id_equipo\":[6]},{\"rank\":4,\"id_jugador\":3062,\"goles\":19,\"id_equipo\":[21]},{\"rank\":5,\"id_jugador\":3170,\"goles\":19,\"id_equipo\":[4]},{\"rank\":6,\"id_jugador\":2190,\"goles\":18,\"id_equipo\":[8]},{\"rank\":7,\"id_jugador\":2679,\"goles\":17,\"id_equipo\":[2,4]},{\"rank\":8,\"id_jugador\":2485,\"goles\":17,\"id_equipo\":[4]},{\"rank\":9,\"id_jugador\":613,\"goles\":15,\"id_equipo\":[19]},{\"rank\":10,\"id_jugador\":2778,\"goles\":15,\"id_equipo\":[11]}]},{\"temporada\":2016,\"goleadores\":[{\"rank\":1,\"id_jugador\":2882,\"goles\":30,\"id_equipo\":[11]},{\"rank\":2,\"id_jugador\":2190,\"goles\":25,\"id_equipo\":[8]},{\"rank\":3,\"id_jugador\":295,\"goles\":21,\"id_equipo\":[4]},{\"rank\":4,\"id_jugador\":484,\"goles\":20,\"id_equipo\":[7]},{\"rank\":5,\"id_jugador\":700,\"goles\":19,\"id_equipo\":[17]},{\"rank\":6,\"id_jugador\":231,\"goles\":17,\"id_equipo\":[10]},{\"rank\":7,\"id_jugador\":846,\"goles\":17,\"id_equipo\":[26]},{\"rank\":8,\"id_jugador\":2085,\"goles\":17,\"id_equipo\":[1]},{\"rank\":9,\"id_jugador\":1246,\"goles\":15,\"id_equipo\":[2]},{\"rank\":10,\"id_jugador\":2401,\"goles\":14,\"id_equipo\":[24]}]},{\"temporada\":2017,\"goleadores\":[{\"rank\":1,\"id_jugador\":3242,\"goles\":22,\"id_equipo\":[3]},{\"rank\":2,\"id_jugador\":543,\"goles\":20,\"id_equipo\":[17]},{\"rank\":3,\"id_jugador\":613,\"goles\":19,\"id_equipo\":[19]},{\"rank\":4,\"id_jugador\":2190,\"goles\":18,\"id_equipo\":[2]},{\"rank\":5,\"id_jugador\":2370,\"goles\":17,\"id_equipo\":[10]},{\"rank\":6,\"id_jugador\":2112,\"goles\":15,\"id_equipo\":[1]},{\"rank\":7,\"id_jugador\":127,\"goles\":15,\"id_equipo\":[7]},{\"rank\":8,\"id_jugador\":59,\"goles\":13,\"id_equipo\":[2]},{\"rank\":9,\"id_jugador\":2667,\"goles\":13,\"id_equipo\":[3]},{\"rank\":10,\"id_jugador\":3117,\"goles\":12,\"id_equipo\":[15]}]},{\"temporada\":2018,\"goleadores\":[{\"rank\":1,\"id_jugador\":824,\"goles\":40,\"id_equipo\":[3]},{\"rank\":2,\"id_jugador\":431,\"goles\":27,\"id_equipo\":[10]},{\"rank\":3,\"id_jugador\":1076,\"goles\":26,\"id_equipo\":[3]},{\"rank\":4,\"id_jugador\":2370,\"goles\":22,\"id_equipo\":[15]},{\"rank\":5,\"id_jugador\":904,\"goles\":21,\"id_equipo\":[29]},{\"rank\":6,\"id_jugador\":50,\"goles\":18,\"id_equipo\":[7]},{\"rank\":7,\"id_jugador\":2190,\"goles\":16,\"id_equipo\":[5]},{\"rank\":8,\"id_jugador\":3117,\"goles\":15,\"id_equipo\":[17]},{\"rank\":9,\"id_jugador\":3021,\"goles\":13,\"id_equipo\":[28,4]},{\"rank\":10,\"id_jugador\":736,\"goles\":13,\"id_equipo\":[21]}]},{\"temporada\":2019,\"goleadores\":[{\"rank\":1,\"id_jugador\":295,\"goles\":27,\"id_equipo\":[4]},{\"rank\":2,\"id_jugador\":736,\"goles\":23,\"id_equipo\":[30]},{\"rank\":3,\"id_jugador\":2015,\"goles\":17,\"id_equipo\":[1]},{\"rank\":4,\"id_jugador\":2912,\"goles\":15,\"id_equipo\":[9]},{\"rank\":5,\"id_jugador\":2370,\"goles\":15,\"id_equipo\":[15]},{\"rank\":6,\"id_jugador\":2940,\"goles\":14,\"id_equipo\":[17]},{\"rank\":7,\"id_jugador\":431,\"goles\":14,\"id_equipo\":[10]},{\"rank\":8,\"id_jugador\":535,\"goles\":14,\"id_equipo\":[3]},{\"rank\":9,\"id_jugador\":1602,\"goles\":12,\"id_equipo\":[7]},{\"rank\":10,\"id_jugador\":68,\"goles\":11,\"id_equipo\":[30]}]},{\"temporada\":2020,\"goleadores\":[{\"rank\":1,\"id_jugador\":824,\"goles\":20,\"id_equipo\":[3]},{\"rank\":2,\"id_jugador\":3164,\"goles\":19,\"id_equipo\":[9]},{\"rank\":3,\"id_jugador\":2949,\"goles\":14,\"id_equipo\":[5]},{\"rank\":4,\"id_jugador\":2380,\"goles\":14,\"id_equipo\":[21]},{\"rank\":5,\"id_jugador\":613,\"goles\":14,\"id_equipo\":[19]},{\"rank\":6,\"id_jugador\":87,\"goles\":13,\"id_equipo\":[2]},{\"rank\":7,\"id_jugador\":2515,\"goles\":13,\"id_equipo\":[4]},{\"rank\":8,\"id_jugador\":1632,\"goles\":12,\"id_equipo\":[2]},{\"rank\":9,\"id_jugador\":1450,\"goles\":11,\"id_equipo\":[35]},{\"rank\":10,\"id_jugador\":2359,\"goles\":11,\"id_equipo\":[24]}]},{\"temporada\":2021,\"goleadores\":[{\"rank\":1,\"id_jugador\":2149,\"goles\":12,\"id_equipo\":[4]},{\"rank\":2,\"id_jugador\":958,\"goles\":12,\"id_equipo\":[32]},{\"rank\":3,\"id_jugador\":1079,\"goles\":11,\"id_equipo\":[29]},{\"rank\":4,\"id_jugador\":1581,\"goles\":11,\"id_equipo\":[5]},{\"rank\":5,\"id_jugador\":3027,\"goles\":11,\"id_equipo\":[11]},{\"rank\":6,\"id_jugador\":3183,\"goles\":11,\"id_equipo\":[2]},{\"rank\":7,\"id_jugador\":2298,\"goles\":10,\"id_equipo\":[30]},{\"rank\":8,\"id_jugador\":1239,\"goles\":10,\"id_equipo\":[1]},{\"rank\":9,\"id_jugador\":295,\"goles\":9,\"id_equipo\":[4]},{\"rank\":10,\"id_jugador\":2524,\"goles\":9,\"id_equipo\":[15]}]},{\"temporada\":2022,\"goleadores\":[{\"rank\":1,\"id_jugador\":2119,\"goles\":19,\"id_equipo\":[10]},{\"rank\":2,\"id_jugador\":1239,\"goles\":18,\"id_equipo\":[1]},{\"rank\":3,\"id_jugador\":613,\"goles\":16,\"id_equipo\":[6]},{\"rank\":4,\"id_jugador\":3164,\"goles\":15,\"id_equipo\":[9]},{\"rank\":5,\"id_jugador\":1380,\"goles\":15,\"id_equipo\":[30]},{\"rank\":6,\"id_jugador\":931,\"goles\":15,\"id_equipo\":[21]},{\"rank\":7,\"id_jugador\":295,\"goles\":14,\"id_equipo\":[4]},{\"rank\":8,\"id_jugador\":3451,\"goles\":13,\"id_equipo\":[35]},{\"rank\":9,\"id_jugador\":143,\"goles\":13,\"id_equipo\":[7]},{\"rank\":10,\"id_jugador\":1087,\"goles\":13,\"id_equipo\":[21]}]},{\"temporada\":2023,\"goleadores\":[{\"rank\":1,\"id_jugador\":2902,\"goles\":22,\"id_equipo\":[38]},{\"rank\":2,\"id_jugador\":295,\"goles\":17,\"id_equipo\":[4]},{\"rank\":3,\"id_jugador\":1239,\"goles\":17,\"id_equipo\":[1]},{\"rank\":4,\"id_jugador\":3452,\"goles\":17,\"id_equipo\":[11]},{\"rank\":5,\"id_jugador\":3164,\"goles\":17,\"id_equipo\":[9]},{\"rank\":6,\"id_jugador\":410,\"goles\":16,\"id_equipo\":[6]},{\"rank\":7,\"id_jugador\":3183,\"goles\":15,\"id_equipo\":[2]},{\"rank\":8,\"id_jugador\":3396,\"goles\":14,\"id_equipo\":[35]},{\"rank\":9,\"id_jugador\":330,\"goles\":13,\"id_equipo\":[3]},{\"rank\":10,\"id_jugador\":2298,\"goles\":10,\"id_equipo\":[17]}]},{\"temporada\":2024,\"goleadores\":[{\"rank\":1,\"id_jugador\":2301,\"goles\":35,\"id_equipo\":[3]},{\"rank\":2,\"id_jugador\":410,\"goles\":19,\"id_equipo\":[6]},{\"rank\":3,\"id_jugador\":1390,\"goles\":17,\"id_equipo\":[21]},{\"rank\":4,\"id_jugador\":2091,\"goles\":16,\"id_equipo\":[10]},{\"rank\":5,\"id_jugador\":295,\"goles\":15,\"id_equipo\":[4]},{\"rank\":6,\"id_jugador\":1239,\"goles\":14,\"id_equipo\":[1]},{\"rank\":7,\"id_jugador\":3396,\"goles\":14,\"id_equipo\":[35]},{\"rank\":8,\"id_jugador\":2903,\"goles\":14,\"id_equipo\":[3]},{\"rank\":9,\"id_jugador\":3183,\"goles\":13,\"id_equipo\":[2]},{\"rank\":10,\"id_jugador\":2357,\"goles\":13,\"id_equipo\":[27]}]},{\"temporada\":2025,\"goleadores\":[{\"rank\":1,\"id_jugador\":924,\"goles\":25,\"id_equipo\":[19]},{\"rank\":2,\"id_jugador\":1548,\"goles\":19,\"id_equipo\":[4]},{\"rank\":3,\"id_jugador\":3183,\"goles\":16,\"id_equipo\":[2]},{\"rank\":4,\"id_jugador\":1390,\"goles\":16,\"id_equipo\":[21]},{\"rank\":5,\"id_jugador\":2539,\"goles\":15,\"id_equipo\":[1]},{\"rank\":6,\"id_jugador\":2521,\"goles\":15,\"id_equipo\":[38]},{\"rank\":7,\"id_jugador\":2357,\"goles\":14,\"id_equipo\":[27]},{\"rank\":8,\"id_jugador\":87,\"goles\":14,\"id_equipo\":[6]},{\"rank\":9,\"id_jugador\":3164,\"goles\":14,\"id_equipo\":[31]},{\"rank\":10,\"id_jugador\":46,\"goles\":14,\"id_equipo\":[11]}]}]");

const TIEMPOS = [
  { label: "Sin Tiempo", value: 0 },
  { label: "1m", value: 60 },
  { label: "2m", value: 120 },
  { label: "3m", value: 180 }
];
const GOLEADORES_TEMPORADAS = GoleadoresTemporadasData;
function MenuTopGoleadores() {
  const [tiempo, setTiempo] = useState(null);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const ultimaPartida = localStorage.getItem("topGoleadoresUltimaPartida");
    if (ultimaPartida) {
      const hoy = /* @__PURE__ */ new Date();
      const hoyStr = hoy.toISOString().split("T")[0];
      if (ultimaPartida === hoyStr) {
        setYaJugoHoy(true);
        setLoading(false);
        return;
      }
    }
    const partidaGuardada = localStorage.getItem("configuracionTopGoleadores");
    if (partidaGuardada) {
      const config = JSON.parse(partidaGuardada);
      setTiempo(config.tiempoRestante);
      setJuegoIniciado(true);
    }
    setLoading(false);
  }, []);
  const handleContinuar = (e) => {
    e.preventDefault();
    if (tiempo !== null) {
      setLoading(true);
      const temporadaAleatoria = GOLEADORES_TEMPORADAS[Math.floor(Math.random() * GOLEADORES_TEMPORADAS.length)];
      const indicesCompletados = Array(10).fill(0);
      const hoy = /* @__PURE__ */ new Date();
      const hoyStr = hoy.toISOString().split("T")[0];
      const nuevaConfiguracion = {
        estado: "jugando",
        tiempoRestante: tiempo,
        goleadoresTemporada: temporadaAleatoria,
        indicesGoleadoresCompletados: indicesCompletados,
        fechaUltimaPartida: hoyStr,
        numeroJugadoresCompletados: 0
      };
      localStorage.setItem("configuracionTopGoleadores", JSON.stringify(nuevaConfiguracion));
      setJuegoIniciado(true);
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsx("p", { className: "texto-cargando", children: "Cargando..." }) });
  }
  if (juegoIniciado && tiempo !== null) {
    return /* @__PURE__ */ jsx("div", { className: "fade-in", children: /* @__PURE__ */ jsx(JuegoTopGoleadores, {}) });
  }
  return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsxs("div", { className: "menu-juego-top-full-bg fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "top-overlay-fondo" }),
    /* @__PURE__ */ jsxs("div", { className: "top-contenido-contenedor", children: [
      /* @__PURE__ */ jsxs("div", { className: "top-cabecera text-center mb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "badge-categoria-top", children: "RETO DIARIO" }),
        /* @__PURE__ */ jsx("h1", { className: "titulo-hero-top", children: "EL TOP" }),
        /* @__PURE__ */ jsx("h2", { className: "subtitulo-hero-top", children: "GOLEADORES: LA MEMORIA DEL GOL" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "top-cuerpo-accion text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "descripcion-juego-top text-justify", children: [
          "¿Qué queda de una temporada cuando se apagan las luces? ",
          /* @__PURE__ */ jsx("strong", { children: "El Top" }),
          " es la arena definitiva donde las estadísticas cobran vida. Tu misión es reconstruir la tabla de máximos anotadores de una ",
          /* @__PURE__ */ jsx("strong", { children: "temporada al azar entre 2010 y 2025" }),
          " antes de que el tiempo se agote. Es un examen a tu archivo mental, donde cada apellido correcto es un tributo a la eficacia. ",
          /* @__PURE__ */ jsx("strong", { children: "¿Tienes la precisión necesaria para reclamar la Bota de Oro de la nostalgia? Reto diario" })
        ] }),
        yaJugoHoy ? /* @__PURE__ */ jsxs("div", { className: "alerta-jugado-top fade-in", children: [
          /* @__PURE__ */ jsx("span", { className: "alerta-icono-top", children: "🏆" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Ya jugaste la edición de hoy",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Vuelve mañana por una nueva temporada" })
          ] })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleContinuar, className: "seccion-accion-top", children: [
          /* @__PURE__ */ jsxs("div", { className: "contenedor-config-tiempo", children: [
            /* @__PURE__ */ jsx("h3", { className: "titulo-config-top", children: "⏱️ Selecciona tu tiempo:" }),
            /* @__PURE__ */ jsx("div", { className: "selector-tiempo-top", children: TIEMPOS.map((item) => /* @__PURE__ */ jsxs("div", { className: "opcion-radio-wrapper", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: `tiempo-${item.label}`,
                  name: "tiempo",
                  value: item.value,
                  className: "radio-oculto-top",
                  onChange: () => setTiempo(item.value),
                  checked: tiempo === item.value
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: `tiempo-${item.label}`, className: "radio-label-top", children: item.label })
            ] }, item.label)) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              id: "btn-continuar",
              type: "submit",
              className: "btn-iniciar-reto-top mt-4",
              disabled: tiempo === null,
              children: "JUGAR AHORA"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}

const $$TopGoleadores = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-q2hp6x2d": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid" data-astro-cid-q2hp6x2d> <div class="row" data-astro-cid-q2hp6x2d> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-q2hp6x2d> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-q2hp6x2d> <div class="col-6" data-astro-cid-q2hp6x2d> <h1 class="text-center titulo-calculadora" data-astro-cid-q2hp6x2d>MINIJUEGO "TOP GOLEADORES"</h1> </div> </div> </div> </div> </div> ${renderComponent($$result2, "MenuTopGoleadores", MenuTopGoleadores, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/minijuegos/top-goleadores/Menu-Top-Goleadores", "client:component-export": "default", "data-astro-cid-q2hp6x2d": true })} ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/top-goleadores.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/top-goleadores.astro";
const $$url = "/minijuegos/top-goleadores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TopGoleadores,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
