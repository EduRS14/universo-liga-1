import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CH_ZwYLk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useMemo, useCallback, useEffect } from 'react';
/* empty css                                  */
import { E as Equipos } from '../../chunks/equipos_CyvvOnT7.mjs';
import { J as Jugadores } from '../../chunks/jugadores_obtenidos_BRpnsaQX.mjs';
export { renderers } from '../../renderers.mjs';

const CONECTORES_INVALIDOS = ["de", "del", "la", "las", "los", "da", "y", "van", "von"];
const normalizarTexto = (texto) => {
  if (!texto) return "";
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};
const obtenerStringApellidos = (nombreCompleto) => {
  const partes = normalizarTexto(nombreCompleto).split(" ");
  if (partes.length <= 1) return partes[0];
  return partes.slice(1).join(" ");
};
const buscarPorApellido = (inputUsuario, listaJugadores, letraActual) => {
  const inputClean = normalizarTexto(inputUsuario);
  const letraClean = normalizarTexto(letraActual);
  if (!inputClean || CONECTORES_INVALIDOS.includes(inputClean)) {
    return [];
  }
  return listaJugadores.filter((jugador) => {
    const apellidosFull = obtenerStringApellidos(jugador.nombre);
    if (!apellidosFull.startsWith(letraClean)) return false;
    try {
      const inputEscapado = inputClean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${inputEscapado}\\b`, "i");
      return regex.test(apellidosFull);
    } catch (e) {
      return false;
    }
  });
};

const ModalSeleccion = ({
  candidatos,
  onSelect,
  onClose
}) => {
  if (!candidatos || candidatos.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
    /* @__PURE__ */ jsx("h3", { children: "¿A quién te refieres?" }),
    /* @__PURE__ */ jsx("p", { children: "Encontramos varios jugadores con ese apellido." }),
    /* @__PURE__ */ jsx("div", { className: "grid-jugadores", children: candidatos.map((jugador) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "card-candidato",
        onClick: () => onSelect(jugador),
        role: "button",
        tabIndex: 0,
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: jugador.url_foto || "/img/minijuegos/default.webp",
              alt: jugador.nombre,
              className: "img-candidato",
              onError: (e) => {
                const target = e.target;
                target.src = "/img/minijuegos/default.webp";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "nombre-candidato", children: jugador.nombre })
        ]
      },
      jugador.id
    )) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "btn-cancelar",
        onClick: onClose,
        children: "Cancelar / Intentar otro apellido"
      }
    )
  ] }) });
};

const ALFABETO = "ABCDEFGHIJLMNOPQRSTUVZ".split("");
const STORAGE_KEY = "elABC_sesion_v2";
const JuegoElABC = ({ todosLosEquipos, todosLosJugadores }) => {
  const [cargando, setCargando] = useState(true);
  const [indiceLetra, setIndiceLetra] = useState(0);
  const [secuenciaEquipos, setSecuenciaEquipos] = useState([]);
  const [puntaje, setPuntaje] = useState(0);
  const [saltosDisponibles, setSaltosDisponibles] = useState(3);
  const [estadoJuego, setEstadoJuego] = useState("jugando");
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [candidatos, setCandidatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const letraActual = ALFABETO[indiceLetra];
  const equipoActual = secuenciaEquipos[indiceLetra] || null;
  const mapaLetrasEquipos = useMemo(() => {
    const mapa = {};
    ALFABETO.forEach((l) => mapa[l] = /* @__PURE__ */ new Set());
    todosLosJugadores.forEach((jugador) => {
      const apellidos = obtenerStringApellidos(jugador.nombre);
      if (!apellidos) return;
      const inicial = apellidos.charAt(0).toUpperCase();
      if (mapa[inicial]) {
        jugador.equiposJugados.forEach((e) => {
          const id = typeof e === "number" ? e : e.id_equipo || e.equipoId || e.id;
          if (id) mapa[inicial].add(Number(id));
        });
      }
    });
    return mapa;
  }, [todosLosJugadores]);
  const guardarProgreso = (datos) => {
    const actualRaw = localStorage.getItem(STORAGE_KEY);
    const actual = actualRaw ? JSON.parse(actualRaw) : {};
    const nuevoEstado = { ...actual, ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoEstado));
  };
  const iniciarNuevaPartida = useCallback(() => {
    const nuevaSecuencia = ALFABETO.map((letra) => {
      const idsValidosSet = mapaLetrasEquipos[letra];
      const equiposCandidatos = Array.from(idsValidosSet).map((id) => todosLosEquipos.find((e) => e.id === id)).filter((e) => e !== void 0);
      if (equiposCandidatos.length === 0) {
        const randomFallback = Math.floor(Math.random() * todosLosEquipos.length);
        return todosLosEquipos[randomFallback];
      }
      const randomIndex = Math.floor(Math.random() * equiposCandidatos.length);
      return equiposCandidatos[randomIndex];
    });
    const estadoInicial = {
      indice: 0,
      puntaje: 0,
      saltos: 3,
      estado: "jugando",
      secuenciaIds: nuevaSecuencia.map((e) => e.id)
    };
    setSecuenciaEquipos(nuevaSecuencia);
    setIndiceLetra(0);
    setPuntaje(0);
    setSaltosDisponibles(3);
    setEstadoJuego("jugando");
    setProcesando(false);
    guardarProgreso(estadoInicial);
  }, [todosLosEquipos, mapaLetrasEquipos]);
  useEffect(() => {
    const partidaGuardada = localStorage.getItem(STORAGE_KEY);
    if (partidaGuardada) {
      try {
        const datos = JSON.parse(partidaGuardada);
        const secuenciaReconstruida = datos.secuenciaIds.map(
          (id) => todosLosEquipos.find((e) => e.id === id) || todosLosEquipos[0]
        );
        setIndiceLetra(datos.indice);
        setPuntaje(datos.puntaje);
        setSaltosDisponibles(datos.saltos);
        setEstadoJuego(datos.estado);
        setSecuenciaEquipos(secuenciaReconstruida);
      } catch (e) {
        iniciarNuevaPartida();
      }
    } else {
      iniciarNuevaPartida();
    }
    setCargando(false);
  }, [iniciarNuevaPartida, todosLosEquipos]);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (procesando) return;
    if (e.key === "Enter") handleSubmit();
  };
  const handleSubmit = () => {
    if (procesando || !inputValue.trim()) return;
    const encontrados = buscarPorApellido(inputValue, todosLosJugadores, letraActual);
    if (encontrados.length === 0) {
      setErrorMsg(`No encontramos apellido "${inputValue}" con letra ${letraActual}.`);
      return;
    }
    if (encontrados.length === 1) {
      validarJugador(encontrados[0]);
    } else {
      setCandidatos(encontrados);
      setShowModal(true);
      setErrorMsg(null);
    }
  };
  const validarJugador = (jugador) => {
    if (!equipoActual) return;
    setShowModal(false);
    const jugoEnEquipo = jugador.equiposJugados.some(
      (e) => typeof e === "number" ? e === equipoActual.id : e.id_equipo === equipoActual.id || e.id_equipo === equipoActual.id || e.equipoId === equipoActual.id
    );
    if (jugoEnEquipo) {
      setProcesando(true);
      const puntosGanados = Math.round(100 * equipoActual.multiplicador);
      const nuevoPuntaje = puntaje + puntosGanados;
      setPuntaje(nuevoPuntaje);
      setErrorMsg(`¡CORRECTO! ${jugador.nombre} jugó en ${equipoActual.nombre}. (+${puntosGanados} pts)`);
      guardarProgreso({ puntaje: nuevoPuntaje });
      setTimeout(() => {
        avanzarJuego();
      }, 1500);
    } else {
      setErrorMsg(`INCORRECTO. ${jugador.nombre} no figura en ${equipoActual.nombre}.`);
    }
  };
  const handleSaltarEquipo = () => {
    if (procesando || saltosDisponibles <= 0) return;
    if (saltosDisponibles <= 0) {
      setErrorMsg("No te quedan saltos disponibles.");
      setTimeout(() => setErrorMsg(null), 2e3);
      return;
    }
    setProcesando(true);
    const nuevosSaltos = saltosDisponibles - 1;
    setSaltosDisponibles(nuevosSaltos);
    guardarProgreso({ saltos: nuevosSaltos });
    setErrorMsg(`Saltaste este equipo. Te quedan ${nuevosSaltos} saltos.`);
    setTimeout(() => {
      avanzarJuego();
    }, 1500);
  };
  const avanzarJuego = () => {
    const siguienteIndice = indiceLetra + 1;
    setInputValue("");
    setErrorMsg(null);
    if (siguienteIndice >= ALFABETO.length) {
      setEstadoJuego("ganado");
      setIndiceLetra(siguienteIndice);
      guardarProgreso({ indice: siguienteIndice, estado: "ganado" });
    } else {
      setIndiceLetra(siguienteIndice);
      guardarProgreso({ indice: siguienteIndice });
    }
    setProcesando(false);
  };
  const handleRendirse = () => {
    if (procesando) return;
    setEstadoJuego("perdido");
    guardarProgreso({ estado: "perdido" });
  };
  const volver = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("juegoIniciadoElABC");
    window.location.reload();
  };
  const getColorDificultad = (multiplicador) => {
    if (multiplicador >= 3) return "#fbbf24";
    if (multiplicador >= 1.5) return "#d946ef";
    return "#0ea5e9";
  };
  if (cargando) return /* @__PURE__ */ jsx("div", { className: "loading", children: "Cargando partida..." });
  if (estadoJuego !== "jugando") {
    return /* @__PURE__ */ jsx("div", { className: "juego-container fade-in d-flex justify-content-center align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center contenedor-menu-fin", style: { border: `2px solid ${estadoJuego === "ganado" ? "#22c55e" : "#ef4444"}` }, children: [
      /* @__PURE__ */ jsx("h1", { className: "texto-estado-juego", style: { color: estadoJuego === "ganado" ? "#22c55e" : "#ef4444" }, children: estadoJuego === "ganado" ? "¡VICTORIA!" : "JUEGO TERMINADO" }),
      /* @__PURE__ */ jsx("p", { className: "texto-explicacion-estado", children: estadoJuego === "ganado" ? `¡Fin del Reto! Puntaje Final: ${puntaje}` : "Has decidido rendirte." }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: "30px" }, children: [
        estadoJuego === "ganado" ? /* @__PURE__ */ jsx("p", { className: "texto-explicacion-estado", children: "¡Lograste completar el reto!" }) : /* @__PURE__ */ jsxs("p", { className: "texto-explicacion-estado", children: [
          'Lograste llegar hasta la "',
          ALFABETO[indiceLetra],
          '"'
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
  if (!equipoActual) return /* @__PURE__ */ jsx("div", { className: "loading", children: "Generando desafío..." });
  const colorActual = getColorDificultad(equipoActual.multiplicador);
  return /* @__PURE__ */ jsxs("div", { className: "abc-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "reto-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "badge-puntaje", children: [
        "PTS: ",
        puntaje
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "badge-progreso", children: [
        "LETRA: ",
        indiceLetra + 1,
        " / ",
        ALFABETO.length
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "reto-card", style: { "--glow-color": colorActual }, children: [
      /* @__PURE__ */ jsx("div", { className: "letra-grande", children: letraActual }),
      /* @__PURE__ */ jsxs("div", { className: "contenedor-equipo", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: equipoActual.url_foto,
            alt: equipoActual.nombre,
            className: "equipo-escudo"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "equipo-nombre", children: equipoActual.nombre })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "badge-dificultad", children: equipoActual.multiplicador >= 3 ? "🐐 MUY DIFÍCIL (x3)" : equipoActual.multiplicador >= 2 ? "🔥 DIFÍCIL (x2.0)" : equipoActual.multiplicador >= 1.5 ? "⚡ MEDIO (x1.5)" : "🌟 FÁCIL (x1.0)" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "contenedor-input-area", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-evenly align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-8 col-lg-5 d-flex justify-content-center", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "input-apellido",
          placeholder: `Apellido con ${letraActual}...`,
          value: inputValue,
          onChange: handleInputChange,
          onKeyDown: handleKeyDown,
          autoFocus: true,
          disabled: procesando
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-4 col-lg-3", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-enviar",
          onClick: handleSubmit,
          disabled: procesando,
          children: "VERIFICAR"
        }
      ) }),
      errorMsg && /* @__PURE__ */ jsx("div", { className: "col-12 d-block d-lg-none", children: /* @__PURE__ */ jsx("div", { className: "feedback-msg", children: errorMsg }) }),
      /* @__PURE__ */ jsx("div", { className: "col-6 col-lg-2", children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: "btn-rendirse",
          onClick: handleSaltarEquipo,
          disabled: procesando || saltosDisponibles === 0,
          children: [
            "🚩 SALTAR (",
            saltosDisponibles,
            ")"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-6 col-lg-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-rendirse",
          onClick: handleRendirse,
          disabled: procesando,
          children: "🏳️ RENDIRSE"
        }
      ) })
    ] }) }),
    errorMsg && /* @__PURE__ */ jsx("div", { className: "d-none d-lg-block", children: /* @__PURE__ */ jsx("div", { className: "feedback-msg", children: errorMsg }) }),
    showModal && /* @__PURE__ */ jsx(
      ModalSeleccion,
      {
        candidatos,
        onSelect: validarJugador,
        onClose: () => setShowModal(false)
      }
    )
  ] });
};

const todosLosEquipos = Equipos;
const todosLosJugadores = Jugadores;
function MenuABC() {
  const [tiempo, setTiempo] = useState(null);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const jugado = localStorage.getItem("juegoJugadoElABC");
    if (jugado) {
      setYaJugoHoy(true);
    }
    const iniciadoPrevio = localStorage.getItem("juegoIniciadoElABC");
    if (iniciadoPrevio === "true") {
      setJuegoIniciado(true);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (juegoIniciado) {
      console.log("Estado del juego actualizado:", { tiempo });
    }
  }, [juegoIniciado]);
  const handleContinuar = (e) => {
    e.preventDefault();
    setJuegoIniciado(true);
    localStorage.setItem("juegoIniciadoElABC", "true");
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsx("p", { className: "texto-cargando", children: "Cargando..." }) });
  }
  if (juegoIniciado) {
    return /* @__PURE__ */ jsx("div", { className: "fade-in", children: /* @__PURE__ */ jsx(JuegoElABC, { todosLosEquipos, todosLosJugadores }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsxs("div", { className: "menu-juego-abc-full-bg fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "abc-overlay-fondo" }),
    /* @__PURE__ */ jsxs("div", { className: "abc-contenido-contenedor", children: [
      /* @__PURE__ */ jsxs("div", { className: "abc-cabecera text-center mb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "badge-categoria-abc", children: "RETO" }),
        /* @__PURE__ */ jsx("h1", { className: "titulo-hero-abc", children: "EL ABC" }),
        /* @__PURE__ */ jsx("h2", { className: "subtitulo-hero-abc", children: "LA RULETA DE NOMBRES" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "abc-cuerpo-accion text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "descripcion-juego-abc text-justify", children: [
          "No basta con saber quién fue campeón. En ",
          /* @__PURE__ */ jsx("strong", { children: "El ABC" }),
          ", el azar es el verdadero rival. Te enfrentamos a una ruta de 22 letras, y en cada parada te esperará un ",
          /* @__PURE__ */ jsx("strong", { children: "escudo diferente" }),
          " de la Primera División (2010-2026). Podrías tener que recordar a un crack de la 'U' con la A, y al segundo siguiente, buscar a uno de San Simón con la B. ",
          /* @__PURE__ */ jsx("strong", { children: "¿Tienes el archivo mental para completar el abecedario? Reto ilimitado" })
        ] }),
        yaJugoHoy ? /* @__PURE__ */ jsxs("div", { className: "alerta-jugado-abc fade-in", children: [
          /* @__PURE__ */ jsx("span", { className: "alerta-icono-abc", children: "⏳" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Ya completaste el reto de hoy",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Vuelve mañana para un nuevo alfabeto" })
          ] })
        ] }) : /* @__PURE__ */ jsx("form", { onSubmit: handleContinuar, className: "seccion-accion-abc", children: /* @__PURE__ */ jsx(
          "button",
          {
            id: "btn-continuar",
            type: "submit",
            className: "btn-iniciar-reto-abc",
            children: "JUGAR AHORA"
          }
        ) })
      ] })
    ] })
  ] }) });
}

const $$Abc = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-nlw54fj5": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid" data-astro-cid-nlw54fj5> <div class="row" data-astro-cid-nlw54fj5> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-nlw54fj5> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-nlw54fj5> <div class="col-6" data-astro-cid-nlw54fj5> <h1 class="text-center titulo-calculadora" data-astro-cid-nlw54fj5>MINIJUEGO "EL ABC"</h1> </div> </div> </div> </div> </div> ${renderComponent($$result2, "MenuABC", MenuABC, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/minijuegos/abc/Menu-ABC.tsx", "client:component-export": "default", "data-astro-cid-nlw54fj5": true })} ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/abc.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/abc.astro";
const $$url = "/minijuegos/abc";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Abc,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
