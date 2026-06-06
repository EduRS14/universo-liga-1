import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CH_ZwYLk.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { J as Jugadores } from '../../chunks/jugadores_obtenidos_BRpnsaQX.mjs';
/* empty css                                          */
import { E as Equipos } from '../../chunks/equipos_CyvvOnT7.mjs';
export { renderers } from '../../renderers.mjs';

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const TECLAS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];
const TecladoVirtual = ({ letrasUsadas, onKeyPress, disabled }) => {
  return /* @__PURE__ */ jsx("div", { className: `tapadito-teclado ${disabled ? "disabled" : ""}`, children: TECLAS.map((fila, i) => /* @__PURE__ */ jsx("div", { className: "teclado-fila", children: fila.map((tecla) => {
    const estado = letrasUsadas[tecla];
    const esEnter = tecla === "ENTER";
    const esBorrar = tecla === "BACKSPACE";
    const label = esBorrar ? "⌫" : tecla;
    return /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => !disabled && onKeyPress(tecla),
        disabled,
        className: `tecla ${estado || ""} ${esEnter || esBorrar ? "tecla-especial" : ""}`,
        children: label
      },
      tecla
    );
  }) }, i)) });
};

const JUGADORES$1 = Jugadores;
const EQUIPOS = Equipos;
const obtenerApellidoLimpio = (nombre) => {
  const norm = normalizarTexto(nombre);
  const apellido = norm.split(" ").slice(1).join("");
  return apellido.toUpperCase();
};
const JuegoElTapadito = () => {
  const [config, setConfig] = useState(null);
  const [targetWord, setTargetWord] = useState("");
  const [datosJugador, setDatosJugador] = useState(null);
  const [currentGuess, setCurrentGuess] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [mostrarModalFin, setMostrarModalFin] = useState(false);
  useEffect(() => {
    const partidaGuardada = localStorage.getItem("configuracionTapadito");
    if (partidaGuardada) {
      const datos = JSON.parse(partidaGuardada);
      setConfig(datos);
      setTargetWord(datos.nombreJugador.replace(/\s/g, "").toUpperCase());
      setDatosJugador(datos.datosJugador);
      if (datos.estado !== "jugando") {
        setMostrarModalFin(true);
      }
    }
  }, []);
  const diccionarioApellidos = useMemo(() => {
    const setApellidos = /* @__PURE__ */ new Set();
    JUGADORES$1.forEach((j) => {
      setApellidos.add(obtenerApellidoLimpio(j.nombre));
    });
    return setApellidos;
  }, []);
  const actualizarConfiguracion = (nuevaConfig) => {
    if (!config) return;
    const configActualizada = { ...config, ...nuevaConfig };
    setConfig(configActualizada);
    localStorage.setItem("configuracionTapadito", JSON.stringify(configActualizada));
  };
  const mostrarError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 2e3);
  };
  const handleKeyPress = useCallback((key) => {
    if (!config || config.estado !== "jugando" || procesando) return;
    if (key === "ENTER") {
      if (currentGuess.length !== targetWord.length) {
        mostrarError("Faltan letras");
        return;
      }
      if (!diccionarioApellidos.has(currentGuess)) {
        mostrarError("El apellido no figura en la base de datos");
        return;
      }
      submitGuess();
    } else if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      setErrorMsg(null);
    } else if (/^[A-ZÑ]$/.test(key)) {
      if (currentGuess.length < targetWord.length) {
        setCurrentGuess((prev) => prev + key);
        setErrorMsg(null);
      }
    }
  }, [currentGuess, targetWord, config, procesando, diccionarioApellidos]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let key = e.key.toUpperCase();
      if (e.key === "Backspace") key = "BACKSPACE";
      if (e.key === "Enter") key = "ENTER";
      handleKeyPress(key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);
  const submitGuess = () => {
    if (!config) return;
    setProcesando(true);
    const nuevasPalabras = [...config.palabrasUsadas];
    const indexVacio = nuevasPalabras.indexOf(null);
    if (indexVacio !== -1) {
      nuevasPalabras[indexVacio] = currentGuess;
    }
    let nuevoEstado = config.estado;
    if (currentGuess === targetWord) {
      nuevoEstado = "ganado";
    } else if (!nuevasPalabras.includes(null)) {
      nuevoEstado = "perdido";
    }
    actualizarConfiguracion({
      palabrasUsadas: nuevasPalabras,
      estado: nuevoEstado
    });
    setCurrentGuess("");
    setTimeout(() => {
      setProcesando(false);
      if (nuevoEstado !== "jugando") {
        localStorage.setItem("tapaditoUltimaPartida", config.fechaUltimaPartida);
        setMostrarModalFin(true);
      }
    }, 2e3);
  };
  const evaluarPalabra = (guess) => {
    const resultado = Array(targetWord.length).fill("gris");
    const targetArr = targetWord.split("");
    const guessArr = guess.split("");
    for (let i = 0; i < targetWord.length; i++) {
      if (guessArr[i] === targetArr[i]) {
        resultado[i] = "verde";
        targetArr[i] = null;
        guessArr[i] = null;
      }
    }
    for (let i = 0; i < targetWord.length; i++) {
      if (guessArr[i] !== null && targetArr.includes(guessArr[i])) {
        resultado[i] = "amarillo";
        targetArr[targetArr.indexOf(guessArr[i])] = null;
      }
    }
    return resultado;
  };
  const letrasUsadas = useMemo(() => {
    const mapa = {};
    if (!config) return mapa;
    config.palabrasUsadas.forEach((guess) => {
      if (!guess) return;
      const evaluacion = evaluarPalabra(guess);
      guess.split("").forEach((letra, index) => {
        const estadoActual = mapa[letra];
        const nuevoEstado = evaluacion[index];
        if (nuevoEstado === "verde") mapa[letra] = "verde";
        else if (nuevoEstado === "amarillo" && estadoActual !== "verde") mapa[letra] = "amarillo";
        else if (nuevoEstado === "gris" && !estadoActual) mapa[letra] = "gris";
      });
    });
    return mapa;
  }, [config?.palabrasUsadas, targetWord]);
  if (!config) return /* @__PURE__ */ jsx("div", { className: "loading", children: "Cargando tablero..." });
  const intentoActualIndex = config.palabrasUsadas.indexOf(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "tapadito-container", children: [
      /* @__PURE__ */ jsx("div", { className: "tapadito-board mt-4", children: config.palabrasUsadas.map((palabraGuardada, i) => {
        const isCurrentRow = i === intentoActualIndex;
        const guessTexto = isCurrentRow ? currentGuess : palabraGuardada || "";
        const evaluacion = palabraGuardada ? evaluarPalabra(palabraGuardada) : null;
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `tapadito-row ${isCurrentRow && errorMsg ? "shake" : ""}`,
            children: Array.from({ length: targetWord.length }).map((_, j) => {
              const letra = guessTexto[j] || "";
              const estadoCasilla = evaluacion ? evaluacion[j] : letra ? "lleno" : "vacio";
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: `tapadito-cell ${estadoCasilla} ${letra && isCurrentRow ? "pop" : ""}`,
                  children: letra
                },
                j
              );
            })
          },
          i
        );
      }) }),
      errorMsg && /* @__PURE__ */ jsx("div", { className: "feedback-msg mt-3 text-center", children: errorMsg }),
      !mostrarModalFin && /* @__PURE__ */ jsx(
        TecladoVirtual,
        {
          letrasUsadas,
          onKeyPress: handleKeyPress,
          disabled: procesando || config.estado !== "jugando"
        }
      ),
      mostrarModalFin && /* @__PURE__ */ jsx("div", { className: "tapadito-overlay-fin fade-in", children: /* @__PURE__ */ jsxs("div", { className: "tapadito-modal-fin text-center", children: [
        /* @__PURE__ */ jsx("h2", { style: { color: config.estado === "ganado" ? "#22c55e" : "#ef4444" }, className: "titulo-estado-fin", children: config.estado === "ganado" ? "¡LA CLAVASTE AL ÁNGULO!" : "FIN DEL JUEGO" }),
        /* @__PURE__ */ jsxs("div", { className: "texto-explicacion-estado mt-3 mb-4", children: [
          /* @__PURE__ */ jsx("p", { children: "El tapadito era:" }),
          /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "col-12 d-flex justify-content-center", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: datosJugador?.url_foto,
                alt: datosJugador?.nombre,
                className: "img-fluid foto-jugador"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "col-12 mt-4 mt-lg-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "nombre-jugador-fin", children: datosJugador?.nombre }),
              /* @__PURE__ */ jsx("p", { className: "datos-jugador-fin", children: datosJugador?.posicionPrincipal }),
              /* @__PURE__ */ jsxs("p", { className: "datos-jugador-fin", children: [
                "Club actual: ",
                datosJugador?.clubActual
              ] }),
              /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("p", { className: "datos-jugador-fin", children: "Jugó en:" }) }),
                datosJugador?.equiposJugados.map((club, index) => /* @__PURE__ */ jsx("div", { className: "col-3", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: EQUIPOS.find((e) => e.id === club.id_equipo)?.url_foto || "",
                    alt: EQUIPOS.find((e) => e.id === club.id_equipo)?.nombre || "Desconocido",
                    className: "img-fluid foto-equipo"
                  }
                ) }, index))
              ] }) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-primary btn-volver",
            onClick: () => window.location.reload(),
            children: "Volver al Menú"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-8 contenedor-descripcion-minijuego", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-10", children: /* @__PURE__ */ jsx("h2", { className: "titulo-descripcion-minijuego", children: "El Tapadito: El Enigma del Vestuario" }) }),
      /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-10", children: /* @__PURE__ */ jsxs("p", { className: "texto-descripcion-minijuego", children: [
        "¿Tienes el ojo clínico para reconocer a un jugador con solo un puñado de pistas? En nuestro fútbol, siempre hay un nombre que se esconde bajo la manga, ese jugador sorpresa que nadie vio venir. ",
        /* @__PURE__ */ jsx("strong", { children: "El Tapadito" }),
        " es el desafío definitivo para los que leen hasta la letra chica de las alineaciones en la ",
        /* @__PURE__ */ jsx("strong", { children: "Liga 1." }),
        " Tu misión es descubrir el ",
        /* @__PURE__ */ jsx("strong", { children: "apellido" }),
        " de un futbolista oculto que pasó por nuestro campeonato ",
        /* @__PURE__ */ jsx("strong", { children: "entre 2010 y 2026." }),
        " El reto exige precisión táctica: tienes solo ",
        /* @__PURE__ */ jsx("strong", { children: "seis intentos" }),
        " y el tablero te indicará la cantidad exacta de letras iniciales. Con cada apellido válido que ingreses, el sistema te dará el reporte: la casilla en ",
        /* @__PURE__ */ jsx("strong", { children: "verde" }),
        " confirmará que la letra está en el lugar correcto, en ",
        /* @__PURE__ */ jsx("strong", { children: "amarillo" }),
        " te indicará que la letra es parte del nombre pero debes reubicarla, y en ",
        /* @__PURE__ */ jsx("strong", { children: "gris" }),
        " te obligará a buscar por otra banda. Solo un verdadero ojeador de nuestra historia es capaz de ",
        /* @__PURE__ */ jsx("strong", { children: "descifrar la identidad del jugador antes del pitazo final." })
      ] }) })
    ] }) }) }) })
  ] });
};

const JUGADORES = Jugadores;
function MenuElTapadito() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const ultimaPartida = localStorage.getItem("tapaditoUltimaPartida");
    if (ultimaPartida) {
      const hoy = /* @__PURE__ */ new Date();
      const hoyStr = hoy.toISOString().split("T")[0];
      if (ultimaPartida === hoyStr) {
        setYaJugoHoy(true);
        setLoading(false);
        return;
      }
    }
    const partidaGuardada = localStorage.getItem("configuracionTapadito");
    if (partidaGuardada) {
      const config = JSON.parse(partidaGuardada);
      if (config.estado === "jugando") {
        setJuegoIniciado(true);
      }
    }
    setLoading(false);
  }, []);
  const handleContinuar = (e) => {
    e.preventDefault();
    console.log("Iniciando nueva partida de El Tapadito...");
    if (juegoIniciado === false) {
      setLoading(true);
      const jugadorAleatorio = JUGADORES[Math.floor(Math.random() * JUGADORES.length)];
      const nombreJugador = normalizarTexto(jugadorAleatorio.nombre);
      const apellidoJugador = nombreJugador.split(" ").slice(1).join(" ");
      const cantidadLetras = apellidoJugador.length;
      const nombresColocados = [null, null, null, null, null, null];
      const hoy = /* @__PURE__ */ new Date();
      const hoyStr = hoy.toISOString().split("T")[0];
      const nuevaConfiguracion = {
        estado: "jugando",
        fechaUltimaPartida: hoyStr,
        nombreJugador: apellidoJugador,
        datosJugador: jugadorAleatorio,
        palabrasUsadas: nombresColocados,
        cantidadLetras
      };
      localStorage.setItem("configuracionTapadito", JSON.stringify(nuevaConfiguracion));
      setJuegoIniciado(true);
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsx("p", { className: "texto-cargando", children: "Cargando..." }) });
  }
  if (juegoIniciado) {
    return /* @__PURE__ */ jsx("div", { className: "fade-in", children: /* @__PURE__ */ jsx(JuegoElTapadito, {}) });
  }
  return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsxs("div", { className: "menu-juego-tapadito-full-bg fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "tapadito-overlay-fondo" }),
    /* @__PURE__ */ jsxs("div", { className: "tapadito-contenido-contenedor", children: [
      /* @__PURE__ */ jsxs("div", { className: "tapadito-cabecera text-center mb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "badge-categoria-tapadito", children: "RETO DIARIO" }),
        /* @__PURE__ */ jsx("h1", { className: "titulo-hero-tapadito", children: "EL TAPADITO" }),
        /* @__PURE__ */ jsx("h2", { className: "subtitulo-hero-tapadito", children: "EL WORDLE DE LA LIGA 1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "tapadito-cuerpo-accion text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "descripcion-juego-tapadito text-justify", children: [
          "En nuestro fútbol, siempre hay un nombre que se esconde bajo la manga. En esta versión del clásico ",
          /* @__PURE__ */ jsx("strong", { children: "Wordle" }),
          ", tu misión es descubrir la identidad de un futbolista oculto que pasó por nuestro campeonato ",
          /* @__PURE__ */ jsx("strong", { children: "entre 2010 y 2026." }),
          " Tienes ",
          /* @__PURE__ */ jsx("strong", { children: "seis intentos" }),
          ". El verde te confirmará el éxito, el amarillo la reubicación y el gris el error. ",
          /* @__PURE__ */ jsx("strong", { children: "¿Tienes la visión de juego para descifrar el enigma? Reto diario" })
        ] }),
        yaJugoHoy ? /* @__PURE__ */ jsxs("div", { className: "alerta-jugado-tapadito fade-in", children: [
          /* @__PURE__ */ jsx("span", { className: "alerta-icono-tapadito", children: "⏳" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Ya completaste el reto de hoy",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Vuelve mañana para un nuevo tapadito" })
          ] })
        ] }) : /* @__PURE__ */ jsx("form", { onSubmit: handleContinuar, className: "seccion-accion-tapadito", children: /* @__PURE__ */ jsx(
          "button",
          {
            id: "btn-continuar",
            type: "submit",
            className: "btn-iniciar-reto-tapadito",
            children: "JUGAR AHORA"
          }
        ) })
      ] })
    ] })
  ] }) });
}

const $$ElTapadito = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-jiae6e66": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid" data-astro-cid-jiae6e66> <div class="row" data-astro-cid-jiae6e66> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-jiae6e66> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-jiae6e66> <div class="col-6" data-astro-cid-jiae6e66> <h1 class="text-center titulo-calculadora" data-astro-cid-jiae6e66>MINIJUEGO "EL TAPADITO"</h1> </div> </div> </div> </div> </div> ${renderComponent($$result2, "MenuElTapadito", MenuElTapadito, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/minijuegos/tapadito/Menu-Tapadito", "client:component-export": "default", "data-astro-cid-jiae6e66": true })} ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/el-tapadito.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/el-tapadito.astro";
const $$url = "/minijuegos/el-tapadito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ElTapadito,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
