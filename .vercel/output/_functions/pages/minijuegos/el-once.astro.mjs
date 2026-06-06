import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CH_ZwYLk.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Buscador } from '../../chunks/buscador_DVHYhz_L.mjs';
import { E as Equipos } from '../../chunks/equipos_CyvvOnT7.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const STORAGE_KEY = "elOnce_partidaGuardada";
const COORDENADAS = {
  "4-4-2": [
    { id: 1, top: "85%", left: "50%", rol: "POR" },
    { id: 2, top: "65%", left: "20%", rol: "LI" },
    { id: 3, top: "70%", left: "40%", rol: "DFC" },
    { id: 4, top: "70%", left: "60%", rol: "DFC" },
    { id: 5, top: "65%", left: "80%", rol: "LD" },
    { id: 6, top: "40%", left: "20%", rol: "MI" },
    { id: 7, top: "45%", left: "40%", rol: "MC" },
    { id: 8, top: "45%", left: "60%", rol: "MC" },
    { id: 9, top: "40%", left: "80%", rol: "MD" },
    { id: 10, top: "20%", left: "35%", rol: "DC" },
    { id: 11, top: "20%", left: "65%", rol: "DC" }
  ],
  "4-3-3 ofensiva": [
    { id: 1, top: "85%", left: "50%", rol: "POR" },
    { id: 2, top: "65%", left: "20%", rol: "LI" },
    { id: 3, top: "70%", left: "40%", rol: "DFC" },
    { id: 4, top: "70%", left: "60%", rol: "DFC" },
    { id: 5, top: "65%", left: "80%", rol: "LD" },
    { id: 6, top: "50%", left: "35%", rol: "MC" },
    { id: 7, top: "40%", left: "50%", rol: "MO" },
    { id: 8, top: "50%", left: "65%", rol: "MC" },
    { id: 9, top: "25%", left: "20%", rol: "EXI" },
    { id: 10, top: "20%", left: "50%", rol: "DC" },
    { id: 11, top: "25%", left: "80%", rol: "EXD" }
  ],
  "4-3-3 defensiva": [
    { id: 1, top: "85%", left: "50%", rol: "POR" },
    { id: 2, top: "65%", left: "20%", rol: "LI" },
    { id: 3, top: "70%", left: "40%", rol: "DFC" },
    { id: 4, top: "70%", left: "60%", rol: "DFC" },
    { id: 5, top: "65%", left: "80%", rol: "LD" },
    { id: 6, top: "43%", left: "35%", rol: "MC" },
    { id: 7, top: "55%", left: "50%", rol: "MCD" },
    { id: 8, top: "43%", left: "65%", rol: "MC" },
    { id: 9, top: "25%", left: "20%", rol: "EXI" },
    { id: 10, top: "20%", left: "50%", rol: "DC" },
    { id: 11, top: "25%", left: "80%", rol: "EXD" }
  ],
  "3-5-2": [
    { id: 1, top: "85%", left: "50%", rol: "POR" },
    { id: 2, top: "70%", left: "30%", rol: "DFC" },
    { id: 3, top: "70%", left: "50%", rol: "DFC" },
    { id: 4, top: "70%", left: "70%", rol: "DFC" },
    { id: 5, top: "45%", left: "37%", rol: "MC" },
    { id: 6, top: "55%", left: "50%", rol: "MCD" },
    { id: 7, top: "45%", left: "63%", rol: "MC" },
    { id: 8, top: "40%", left: "15%", rol: "MI" },
    { id: 9, top: "20%", left: "35%", rol: "DC" },
    { id: 10, top: "20%", left: "65%", rol: "DC" },
    { id: 11, top: "40%", left: "85%", rol: "MD" }
  ],
  "4-2-3-1": [
    { id: 1, top: "85%", left: "50%", rol: "POR" },
    { id: 2, top: "65%", left: "20%", rol: "LI" },
    { id: 3, top: "70%", left: "40%", rol: "DFC" },
    { id: 4, top: "70%", left: "60%", rol: "DFC" },
    { id: 5, top: "65%", left: "80%", rol: "LD" },
    { id: 6, top: "55%", left: "40%", rol: "MCD" },
    { id: 7, top: "55%", left: "60%", rol: "MCD" },
    { id: 8, top: "38%", left: "50%", rol: "MO" },
    { id: 9, top: "30%", left: "20%", rol: "EXI" },
    { id: 10, top: "20%", left: "50%", rol: "DC" },
    { id: 11, top: "30%", left: "80%", rol: "EXD" }
  ]
};
const NOMBRES_EQUIPOS = Equipos.reduce((acc, equipo) => {
  acc[equipo.id] = equipo.nombre;
  return acc;
}, {});
const IMAGENES_EQUIPOS = Equipos.reduce((acc, equipo) => {
  acc[equipo.id] = equipo.url_foto;
  return acc;
}, {});
const MAPA_POSICIONES = {
  "POR": ["Portero"],
  "LI": ["Lateral izquierdo"],
  "LD": ["Lateral derecho"],
  "DFC": ["Defensa central", "Libero"],
  "MC": ["Mediocentro"],
  "MI": ["Interior izquierdo", "Extremo izquierdo"],
  "MD": ["Interior derecho", "Extremo derecho"],
  "MCD": ["Mediocentro defensivo", "Pivote"],
  "MO": ["Mediapunta", "Mediocentro ofensivo"],
  "EXI": ["Extremo izquierdo", "Interior izquierdo"],
  "EXD": ["Extremo derecho", "Interior derecho"],
  "DC": ["Delantero centro", "Mediapunta"]
};
function JuegoElOnce() {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [equipoArmado, setEquipoArmado] = useState({});
  const [slotSeleccionado, setSlotSeleccionado] = useState(null);
  const [idsUsados, setIdsUsados] = useState(/* @__PURE__ */ new Set());
  const [errorMsg, setErrorMsg] = useState(null);
  const [ordenEquipos, setOrdenEquipos] = useState([]);
  const [turnoActual, setTurnoActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState("jugando");
  useEffect(() => {
    const partidaGuardada = localStorage.getItem(STORAGE_KEY);
    if (partidaGuardada) {
      try {
        const parsed = JSON.parse(partidaGuardada);
        if (parsed.estadoJuego === "jugando") {
          console.log("🔄 Partida recuperada del almacenamiento.");
          setData(parsed.data);
          setEquipoArmado(parsed.equipoArmado);
          setOrdenEquipos(parsed.ordenEquipos);
          setTurnoActual(parsed.turnoActual);
          setTiempoRestante(parsed.tiempoRestante);
          setEstadoJuego(parsed.estadoJuego);
          setIdsUsados(new Set(parsed.idsUsados));
          setCargando(false);
          return;
        }
      } catch (error) {
        console.error("Error al leer partida guardada, reiniciando...", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    const timer = setTimeout(() => {
      const dif = localStorage.getItem("elOnce_dificultad");
      const time = localStorage.getItem("elOnce_tiempo");
      const form = localStorage.getItem("elOnce_formacion");
      if (time && form) {
        const tiempoNum = Number(time);
        setData({ dificultad: Number(dif), tiempo: tiempoNum, formacion: form });
        setTiempoRestante(tiempoNum);
      }
      const idsDisponibles = Equipos.map((e) => e.id);
      const equiposMezclados = idsDisponibles.sort(() => 0.5 - Math.random());
      setOrdenEquipos(equiposMezclados.slice(0, 11));
      setCargando(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (cargando || !data) return;
    const estadoSnapshot = {
      data,
      equipoArmado,
      ordenEquipos,
      turnoActual,
      tiempoRestante,
      estadoJuego,
      // Convertimos el Set a Array para poder guardarlo en JSON
      idsUsados: Array.from(idsUsados)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoSnapshot));
  }, [data, equipoArmado, ordenEquipos, turnoActual, tiempoRestante, estadoJuego, idsUsados, cargando]);
  useEffect(() => {
    if (!data || data.tiempo === 0 || estadoJuego !== "jugando") return;
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
  const agregarJugadorAlEquipo = (jugador) => {
    if (slotSeleccionado === null) return;
    setErrorMsg(null);
    if (idsUsados.has(jugador.id)) {
      setErrorMsg(`El jugador ${jugador.nombre} ya ha sido seleccionado.`);
      return;
    }
    const formacionActual = COORDENADAS[data.formacion];
    const posicionSlot = formacionActual.find((p) => p.id === slotSeleccionado);
    const rolSeleccionado2 = posicionSlot?.rol;
    const posicionesValidas = MAPA_POSICIONES[rolSeleccionado2 || ""] || [];
    const esPosicionValida = posicionesValidas.includes(jugador.posicionPrincipal) || jugador.posicionesSecundarias.some((pos) => posicionesValidas.includes(pos));
    if (!esPosicionValida) {
      setErrorMsg(`El jugador ${jugador.nombre} no juega como ${rolSeleccionado2}.`);
      return;
    }
    const equipoEsperadoId = ordenEquipos[turnoActual];
    const jugoEnElEquipo = jugador.equiposJugados.some((hist) => hist.id_equipo === equipoEsperadoId);
    if (!jugoEnElEquipo) {
      const nombreEquipo = NOMBRES_EQUIPOS[equipoEsperadoId] || "el equipo correspondiente";
      setErrorMsg(`El jugador ${jugador.nombre} no ha jugado en ${nombreEquipo}.`);
      return;
    }
    setEquipoArmado((prev) => ({ ...prev, [slotSeleccionado]: jugador }));
    setIdsUsados((prev) => new Set(prev).add(jugador.id));
    setSlotSeleccionado(null);
    setErrorMsg(null);
    if (turnoActual >= 10) {
      setEstadoJuego("ganado");
    } else {
      setTurnoActual((prev) => prev + 1);
    }
  };
  const handleRendirse = () => {
    reiniciarJuegoTotalmente();
    setEstadoJuego("perdido");
  };
  const reiniciarJuegoTotalmente = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("elOnce_dificultad");
    localStorage.removeItem("elOnce_tiempo");
    localStorage.removeItem("elOnce_formacion");
    localStorage.removeItem("juegoIniciadoElOnce");
  };
  const volver = () => {
    reiniciarJuegoTotalmente();
    window.location.reload();
  };
  if (estadoJuego !== "jugando") {
    return /* @__PURE__ */ jsx("div", { className: "juego-container fade-in d-flex justify-content-center align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center contenedor-menu-fin", style: { border: `2px solid ${estadoJuego === "ganado" ? "#22c55e" : "#ef4444"}` }, children: [
      /* @__PURE__ */ jsx("h1", { className: "texto-estado-juego", style: { color: estadoJuego === "ganado" ? "#22c55e" : "#ef4444" }, children: estadoJuego === "ganado" ? "¡VICTORIA!" : "JUEGO TERMINADO" }),
      /* @__PURE__ */ jsx("p", { className: "texto-explicacion-estado", children: estadoJuego === "ganado" ? "Has completado el once ideal correctamente." : "No lograste completar el equipo a tiempo o te rendiste." }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: "30px" }, children: [
        /* @__PURE__ */ jsxs("p", { className: "texto-explicacion-estado", children: [
          "Jugadores acertados: ",
          idsUsados.size,
          " / 11"
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
  const posiciones = COORDENADAS[data.formacion] || [];
  const rolSeleccionado = posiciones.find((p) => p.id === slotSeleccionado)?.rol;
  const idEquipoActual = ordenEquipos[turnoActual];
  const formatoTiempo = (segundos) => {
    if (data.tiempo === 0) return "∞";
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "juego-container fade-in", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-8 contenedor-juego", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-6", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-8 contenedor-informacion", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-evenly align-items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "texto-titulo-informacion", children: "Formación:" }),
            /* @__PURE__ */ jsx("span", { className: "texto-informacion", children: data.formacion })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "texto-titulo-informacion", children: "Tiempo restante:" }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: "texto-informacion",
                style: {
                  color: data.tiempo > 0 && tiempoRestante <= 10 ? "#ef4444" : "white",
                  fontSize: "1.2rem"
                },
                children: [
                  "⏱️ ",
                  formatoTiempo(tiempoRestante)
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-10 d-flex justify-content-center mt-3", children: /* @__PURE__ */ jsxs("div", { className: "turno-banner", children: [
          /* @__PURE__ */ jsxs("p", { className: "turno-texto", children: [
            "Turno ",
            turnoActual + 1,
            " / 11"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center justify-content-center", children: [
            /* @__PURE__ */ jsx("div", { className: "col-3", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: IMAGENES_EQUIPOS[idEquipoActual],
                alt: NOMBRES_EQUIPOS[idEquipoActual],
                style: { width: "60px", height: "60px", objectFit: "contain", marginBottom: "5px", borderRadius: "5px", border: "2px solid white", backgroundColor: "white" },
                className: "img-fluid"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-7", children: /* @__PURE__ */ jsx("p", { className: "turno-nombre-equipo", children: NOMBRES_EQUIPOS[idEquipoActual] }) })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "turno-instruccion", children: "Coloca un jugador de este equipo en cualquier posición libre." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-10 panel-seleccion-container", children: slotSeleccionado ? /* @__PURE__ */ jsx("div", { className: "panel-seleccion w-100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsx("div", { className: "col-12 text-center contenedor-titulo-seleccion", children: /* @__PURE__ */ jsxs("span", { className: "texto-posicion", children: [
            "Posición: ",
            /* @__PURE__ */ jsx("strong", { children: rolSeleccionado })
          ] }) }),
          errorMsg && /* @__PURE__ */ jsx("div", { className: "col-12 text-center", style: { margin: "10px 0" }, children: /* @__PURE__ */ jsxs("div", { className: "contenedor-alerta-fallo", children: [
            "⚠️ ",
            errorMsg
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(Buscador, { onJugadorSeleccionado: agregarJugadorAlEquipo }, slotSeleccionado) }),
          /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setSlotSeleccionado(null);
                setErrorMsg(null);
              },
              className: "boton-cancelar-seleccion",
              children: "Cancelar selección"
            }
          ) })
        ] }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center contenedor-orientativo", children: [
          /* @__PURE__ */ jsx("p", { className: "texto-orientacion", children: "Selecciona una posición vacía (+) para agregar al jugador." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn btn-danger btn-sm mt-2 btn-rendirse",
              onClick: handleRendirse,
              children: "🏳️ Rendirse"
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-6", children: /* @__PURE__ */ jsx("div", { className: "cancha", children: posiciones.map((pos) => {
        const jugadorEnPosicion = equipoArmado[pos.id];
        const esElSeleccionado = slotSeleccionado === pos.id;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `jugador-slot ${esElSeleccionado ? "slot-activo" : ""} ${jugadorEnPosicion ? "ocupado" : ""}`,
            style: { top: pos.top, left: pos.left },
            onClick: () => {
              if (jugadorEnPosicion) return;
              setSlotSeleccionado(pos.id);
              setErrorMsg(null);
            },
            children: [
              jugadorEnPosicion ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: jugadorEnPosicion.url_foto,
                  alt: jugadorEnPosicion.nombre,
                  className: "img-jugador-cancha"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "icono-mas", children: "+" }),
              /* @__PURE__ */ jsx("span", { className: "rol-texto", children: jugadorEnPosicion ? jugadorEnPosicion.nombre.split(" ")[0] : pos.rol })
            ]
          },
          pos.id
        );
      }) }) })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-8 contenedor-descripcion-minijuego", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-10", children: /* @__PURE__ */ jsx("h2", { className: "titulo-descripcion-minijuego", children: "El Once: Para el Hincha de Verdad" }) }),
      /* @__PURE__ */ jsx("div", { className: "col-11 col-lg-10", children: /* @__PURE__ */ jsxs("p", { className: "texto-descripcion-minijuego", children: [
        "¿Crees que conoces la ",
        /* @__PURE__ */ jsx("strong", { children: "Liga 1" }),
        " a fondo? ",
        /* @__PURE__ */ jsx("strong", { children: "El Once" }),
        " no es para aficionados casuales; es el reto definitivo para el verdadero conocedor del fútbol peruano. El juego te pondrá a prueba turno a turno: aparecerán los escudos de ",
        /* @__PURE__ */ jsx("strong", { children: "11 equipos históricos" }),
        " que pasaron por la ",
        /* @__PURE__ */ jsx("strong", { children: "Primera División entre 2010 y 2026" }),
        ", y tu misión es elegir a ",
        /* @__PURE__ */ jsx("strong", { children: "un solo jugador por cada club" }),
        ". Pero cuidado, no basta con recordar nombres al azar: deberás encajar a cada futbolista en su ",
        /* @__PURE__ */ jsx("strong", { children: "posición correcta sobre el campo" }),
        " para completar una formación táctica válida. ¿Serás capaz de recordar a ese lateral izquierdo que brilló en provincia o al portero que fue muralla en un equipo que ya no está en Primera? Arma tu equipo, respeta las posiciones y demuestra que eres ",
        /* @__PURE__ */ jsx("strong", { children: "el estratega que más sabe de nuestra bendita liga." })
      ] }) })
    ] }) }) }) })
  ] });
}

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
  "4-2-3-1"
];
function MenuOnce() {
  const [dificultad, setDificultad] = useState(null);
  const [tiempo, setTiempo] = useState(null);
  const [formacion, setFormacion] = useState(null);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [yaJugoHoy, setYaJugoHoy] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const jugado = localStorage.getItem("juegoJugadoElOnce");
    if (jugado) {
      setYaJugoHoy(true);
    }
    const iniciadoPrevio = localStorage.getItem("juegoIniciadoElOnce");
    if (iniciadoPrevio === "true") {
      const difGuardada = localStorage.getItem("elOnce_dificultad");
      const tiempoGuardado = localStorage.getItem("elOnce_tiempo");
      const formacionGuardada = localStorage.getItem("elOnce_formacion");
      if (difGuardada) setDificultad(Number(difGuardada));
      if (tiempoGuardado) setTiempo(Number(tiempoGuardado));
      if (formacionGuardada) setFormacion(formacionGuardada);
      setJuegoIniciado(true);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (juegoIniciado && formacion) {
      console.log("Estado del juego actualizado:", { dificultad, tiempo, formacion });
    }
  }, [juegoIniciado, formacion]);
  const handleContinuar = (e) => {
    e.preventDefault();
    if (tiempo !== null) {
      const indexRandom = Math.floor(Math.random() * FORMACIONES.length);
      const nuevaFormacion = FORMACIONES[indexRandom];
      setFormacion(nuevaFormacion);
      setJuegoIniciado(true);
      localStorage.setItem("elOnce_dificultad", dificultad !== null ? dificultad.toString() : "");
      localStorage.setItem("elOnce_tiempo", tiempo.toString());
      localStorage.setItem("elOnce_formacion", nuevaFormacion);
      localStorage.setItem("juegoIniciadoElOnce", "true");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsx("p", { className: "texto-cargando", children: "Cargando..." }) });
  }
  if (juegoIniciado && tiempo !== null && formacion !== null) {
    return /* @__PURE__ */ jsx("div", { className: "fade-in", children: /* @__PURE__ */ jsx(JuegoElOnce, {}) });
  }
  return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsxs("div", { className: "menu-juego-once-full-bg fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "once-overlay-fondo" }),
    /* @__PURE__ */ jsxs("div", { className: "once-contenido-contenedor", children: [
      /* @__PURE__ */ jsxs("div", { className: "once-cabecera text-center mb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "badge-categoria-once", children: "RETO" }),
        /* @__PURE__ */ jsx("h1", { className: "titulo-hero-once", children: "EL ONCE" }),
        /* @__PURE__ */ jsx("h2", { className: "subtitulo-hero-once", children: "EL TEMPLO DE LA MEMORIA" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "once-cuerpo-accion text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "descripcion-juego-once text-justify", children: [
          "¿Cuántos nombres han pasado por nuestros ojos en más de ",
          /* @__PURE__ */ jsx("strong", { children: "quince años de fútbol peruano?" }),
          " El Once es el espacio donde el conocimiento y la nostalgia se encuentran. El desafío es simple pero implacable: debes ",
          /* @__PURE__ */ jsx("strong", { children: "construir un equipo equilibrado utilizando un solo representante que haya jugado entre el 2010 y 2026 por cada club seleccionado." }),
          " ¿Estás listo para dar la charla técnica y demostrar que tu memoria es de campeonato? ",
          /* @__PURE__ */ jsx("strong", { children: "Reto ilimitado" })
        ] }),
        yaJugoHoy ? /* @__PURE__ */ jsxs("div", { className: "alerta-jugado-once fade-in", children: [
          /* @__PURE__ */ jsx("span", { className: "alerta-icono-once", children: "📋" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Ya diste la charla técnica de hoy",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Vuelve mañana para armar un nuevo equipo" })
          ] })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleContinuar, className: "seccion-accion-once", children: [
          /* @__PURE__ */ jsxs("div", { className: "contenedor-config-tiempo", children: [
            /* @__PURE__ */ jsx("h3", { className: "titulo-config-once", children: "⏱️ Selecciona tu tiempo:" }),
            /* @__PURE__ */ jsx("div", { className: "selector-tiempo-once", children: TIEMPOS.map((item) => /* @__PURE__ */ jsxs("div", { className: "opcion-radio-wrapper", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: `tiempo-${item.label}`,
                  name: "tiempo",
                  value: item.value,
                  className: "radio-oculto-once",
                  onChange: () => setTiempo(item.value),
                  checked: tiempo === item.value
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: `tiempo-${item.label}`, className: "radio-label-once", children: item.label })
            ] }, item.label)) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              id: "btn-continuar",
              type: "submit",
              className: "btn-iniciar-reto-once mt-4",
              disabled: tiempo === null,
              children: "JUGAR AHORA"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}

const $$ElOnce = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-3tewunqe": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid" data-astro-cid-3tewunqe> <div class="row" data-astro-cid-3tewunqe> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-3tewunqe> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-3tewunqe> <div class="col-6" data-astro-cid-3tewunqe> <h1 class="text-center titulo-calculadora" data-astro-cid-3tewunqe>MINIJUEGO "EL ONCE"</h1> </div> </div> </div> </div> </div> ${renderComponent($$result2, "MenuOnce", MenuOnce, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/minijuegos/once/Menu-Once", "client:component-export": "default", "data-astro-cid-3tewunqe": true })} ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/el-once.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/el-once.astro";
const $$url = "/minijuegos/el-once";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ElOnce,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
