import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CH_ZwYLk.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useRef, useEffect } from 'react';
/* empty css                                    */
import { J as Jugadores } from '../../chunks/jugadores_obtenidos_BRpnsaQX.mjs';
export { renderers } from '../../renderers.mjs';

function NexosMenu({ onJugar, deshabilitado = false }) {
  return /* @__PURE__ */ jsx("div", { className: "contenedor-configuracion", children: /* @__PURE__ */ jsxs("div", { className: "menu-nexos-full-bg fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "nexos-overlay-fondo" }),
    /* @__PURE__ */ jsxs("div", { className: "nexos-contenido-contenedor", children: [
      /* @__PURE__ */ jsxs("div", { className: "nexos-cabecera text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "menu-nexos-badge", children: "RETO DIARIO" }),
        /* @__PURE__ */ jsx("h1", { className: "menu-nexos-titulo", children: "NEXOS" }),
        /* @__PURE__ */ jsx("p", { className: "menu-nexos-subtitulo", children: "El Templo de las Conexiones" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "nexos-cuerpo-accion text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "menu-nexos-descripcion", children: [
          "¿Te consideras un ",
          /* @__PURE__ */ jsx("strong", { children: "verdadero especialista" }),
          " en el mercado de pases de nuestra liga? ",
          /* @__PURE__ */ jsx("strong", { children: "Nexos" }),
          " es el laboratorio donde los vestuarios, las trayectorias y la historia del fútbol peruano se entrelazan. El desafío pondrá a prueba tu memoria de forma milimétrica: debes ",
          /* @__PURE__ */ jsx("strong", { children: "conectar a dos futbolistas" }),
          " de épocas o estilos totalmente distintos construyendo un ",
          /* @__PURE__ */ jsx("strong", { children: "puente de compañeros de equipo" }),
          " que compartieron club y año, y que hayan jugado en la primera división entre 2010 y 2026. ¿Serás capaz de trazar la ",
          /* @__PURE__ */ jsx("strong", { children: "ruta perfecta con la menor cantidad de pases posibles" }),
          " o te quedarás sin ideas a mitad del camino? ¡Demuestra que conoces el recorrido de cada camiseta y encuentra el nexo del día! ",
          /* @__PURE__ */ jsx("strong", { children: "Reto diario" })
        ] }),
        deshabilitado && /* @__PURE__ */ jsxs("div", { className: "menu-nexos-ya-jugado", children: [
          /* @__PURE__ */ jsx("span", { className: "menu-nexos-ya-jugado-icono", children: "⏳" }),
          /* @__PURE__ */ jsx("span", { children: "Ya jugaste Nexos hoy. Vuelve mañana." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `menu-nexos-btn ${deshabilitado ? "menu-nexos-btn-deshabilitado" : ""}`,
            onClick: () => onJugar(),
            disabled: deshabilitado,
            type: "button",
            children: "JUGAR"
          }
        )
      ] })
    ] })
  ] }) });
}

function NexosChain({ cadena, destino, nexoFallido, valido = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "nexos-chain", children: [
    cadena.map((jugador, idx) => /* @__PURE__ */ jsxs("div", { className: "nexos-nodo-container", children: [
      /* @__PURE__ */ jsxs("div", { className: `nexos-nodo ${nexoFallido === idx ? "nexos-nodo-error" : ""} ${valido ? "nexos-nodo-valido" : ""}`, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: jugador.url_foto,
            alt: jugador.nombre,
            className: "nexos-nodo-foto"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "nexos-nodo-nombre", children: jugador.nombre })
      ] }),
      idx < cadena.length - 1 && /* @__PURE__ */ jsx("div", { className: `nexos-flecha ${nexoFallido === idx + 1 ? "nexos-flecha-error" : ""}`, children: "↓" })
    ] }, `${jugador.id}-${idx}`)),
    destino && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: `nexos-flecha ${nexoFallido === cadena.length ? "nexos-flecha-error" : ""}`, children: "↓" }),
      /* @__PURE__ */ jsx("div", { className: "nexos-nodo-container", children: /* @__PURE__ */ jsxs("div", { className: `nexos-nodo nexos-nodo-destino ${nexoFallido === cadena.length ? "nexos-nodo-error" : ""} ${valido ? "nexos-nodo-valido" : ""}`, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: destino.url_foto,
            alt: destino.nombre,
            className: "nexos-nodo-foto"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "nexos-nodo-nombre", children: destino.nombre })
      ] }) })
    ] })
  ] });
}

function normalizar(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function NexosBuscador({ jugadores, onAgregar }) {
  const [busqueda, setBusqueda] = useState("");
  const filtrados = useMemo(() => {
    if (!busqueda.trim()) return [];
    const lower = normalizar(busqueda);
    return jugadores.filter((j) => normalizar(j.nombre).includes(lower)).slice(0, 8);
  }, [jugadores, busqueda]);
  return /* @__PURE__ */ jsxs("div", { className: "nexos-buscador", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "nexos-buscador-input",
        placeholder: "Buscar jugador...",
        value: busqueda,
        onChange: (e) => setBusqueda(e.target.value)
      }
    ),
    filtrados.length > 0 && /* @__PURE__ */ jsx("div", { className: "nexos-buscador-lista", children: filtrados.map((j) => /* @__PURE__ */ jsx(
      "button",
      {
        className: "nexos-buscador-item",
        onClick: () => {
          onAgregar(j);
          setBusqueda("");
        },
        children: j.nombre
      },
      j.id
    )) })
  ] });
}

function NexosModal({ tipo, estrellas, label, onVolver }) {
  let titulo = "";
  let icono = "";
  let mensaje = "";
  if (tipo === "victoria") {
    titulo = "¡VICTORIA!";
    icono = "🏆";
    mensaje = label ?? "";
  } else if (tipo === "derrota") {
    titulo = "DERROTA";
    icono = "❌";
    mensaje = "No lograste conectar el nexo. Vuelve mañana para intentarlo de nuevo.";
  } else {
    titulo = "TE RINDISTE";
    icono = "🏳️";
    mensaje = "Has abandonado el reto. Vuelve mañana para intentarlo de nuevo.";
  }
  const mostrarEstrellas = tipo === "victoria" && (estrellas ?? 0) > 0;
  return /* @__PURE__ */ jsx("div", { className: "nexos-modal-overlay", onClick: onVolver, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `nexos-modal nexos-modal-${tipo}`,
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsx("div", { className: "nexos-modal-icono", children: icono }),
        /* @__PURE__ */ jsx("h2", { className: "nexos-modal-titulo", children: titulo }),
        mostrarEstrellas ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "nexos-modal-estrellas", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
            "span",
            {
              className: `nexos-modal-estrella ${i <= (estrellas ?? 0) ? "nexos-modal-estrella-llena" : ""}`,
              children: "⭐"
            },
            i
          )) }),
          mensaje && /* @__PURE__ */ jsx("p", { className: "nexos-modal-label", children: mensaje })
        ] }) : tipo === "victoria" ? /* @__PURE__ */ jsx("p", { className: "nexos-modal-label", children: mensaje }) : /* @__PURE__ */ jsx("p", { className: "nexos-modal-mensaje", children: mensaje }),
        /* @__PURE__ */ jsx("button", { className: "nexos-modal-btn", onClick: onVolver, type: "button", children: "VOLVER AL MENÚ" })
      ]
    }
  ) });
}

const AÑO_ACTUAL = 2026;
function normalizarPeriodo(periodo) {
  return periodo.map((p) => p === -1 ? AÑO_ACTUAL : p);
}
function periodoIntersecta(periodo1, periodo2) {
  const [inicio1, fin1] = normalizarPeriodo(periodo1);
  const [inicio2, fin2] = normalizarPeriodo(periodo2);
  return inicio1 <= fin2 && inicio2 <= fin1;
}
function equiposEnComun(jugadorA, jugadorB) {
  const communes = [];
  for (const equipoA of jugadorA.equiposJugados) {
    for (const equipoB of jugadorB.equiposJugados) {
      if (equipoA.id_equipo === equipoB.id_equipo) {
        for (const perA of equipoA.periodos) {
          for (const perB of equipoB.periodos) {
            if (periodoIntersecta(perA, perB)) {
              if (!communes.includes(equipoA.id_equipo)) {
                communes.push(equipoA.id_equipo);
              }
            }
          }
        }
      }
    }
  }
  return communes;
}
function validarCadena(jugadores, destino) {
  if (jugadores.length < 2) {
    return { valido: false, mensaje: "Se necesitan al menos 2 jugadores" };
  }
  for (let i = 0; i < jugadores.length - 1; i++) {
    const jugadorA = jugadores[i];
    const jugadorB = jugadores[i + 1];
    const clubes = equiposEnComun(jugadorA, jugadorB);
    if (clubes.length === 0) {
      return {
        valido: false,
        nexoFallido: i + 1,
        clubFallo: -1,
        mensaje: `Nexo ${i + 1}: ${jugadorA.nombre} → ${jugadorB.nombre} no comparten club ni año`
      };
    }
  }
  if (destino) {
    const ultimoIntermedio = jugadores[jugadores.length - 1];
    const clubesDestino = equiposEnComun(ultimoIntermedio, destino);
    if (clubesDestino.length === 0) {
      return {
        valido: false,
        nexoFallido: jugadores.length,
        clubFallo: -1,
        mensaje: `Último jugador → ${destino.nombre} no comparten club ni año`
      };
    }
  }
  return { valido: true };
}
function calcularEstrellas(cantidadIntermedios) {
  if (cantidadIntermedios <= 2) {
    return { estrellas: 3, label: "Clase Mundial" };
  } else if (cantidadIntermedios <= 4) {
    return { estrellas: 2, label: "Conocedor de la pelotita" };
  } else if (cantidadIntermedios === 5) {
    return { estrellas: 1, label: "Sufriendo en los descuentos" };
  } else {
    return { estrellas: 0, label: "¡Ruta muy larga! Pero al menos llegaste" };
  }
}

const datosRetos = [
	{
		origen: 2679,
		destino: 1234
	},
	{
		origen: 2539,
		destino: 2625
	},
	{
		origen: 474,
		destino: 2301
	},
	{
		origen: 422,
		destino: 1362
	},
	{
		origen: 2111,
		destino: 201
	},
	{
		origen: 493,
		destino: 2190
	},
	{
		origen: 2587,
		destino: 435
	},
	{
		origen: 295,
		destino: 3183
	},
	{
		origen: 1100,
		destino: 2085
	},
	{
		origen: 150,
		destino: 1615
	},
	{
		origen: 736,
		destino: 487
	},
	{
		origen: 1127,
		destino: 1577
	},
	{
		origen: 2970,
		destino: 2532
	},
	{
		origen: 3062,
		destino: 2316
	},
	{
		origen: 3125,
		destino: 613
	},
	{
		origen: 431,
		destino: 1038
	},
	{
		origen: 1542,
		destino: 2902
	},
	{
		origen: 2661,
		destino: 3176
	},
	{
		origen: 3117,
		destino: 680
	},
	{
		origen: 2241,
		destino: 2953
	},
	{
		origen: 593,
		destino: 2253
	},
	{
		origen: 1519,
		destino: 1304
	},
	{
		origen: 2968,
		destino: 2819
	},
	{
		origen: 389,
		destino: 701
	},
	{
		origen: 1085,
		destino: 460
	},
	{
		origen: 2887,
		destino: 683
	},
	{
		origen: 3044,
		destino: 1124
	},
	{
		origen: 1255,
		destino: 1424
	},
	{
		origen: 3185,
		destino: 1516
	},
	{
		origen: 151,
		destino: 459
	},
	{
		origen: 481,
		destino: 3238
	},
	{
		origen: 698,
		destino: 1508
	},
	{
		origen: 2776,
		destino: 1729
	},
	{
		origen: 3006,
		destino: 68
	},
	{
		origen: 2651,
		destino: 496
	}
];

function NexosJuego() {
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [cadena, setCadena] = useState([]);
  const [hoyJugado, setHoyJugado] = useState(false);
  const [errorCadena, setErrorCadena] = useState("");
  const [resultado, setResultado] = useState(null);
  const [nexoFallido, setNexoFallido] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [verificadoValido, setVerificadoValido] = useState(false);
  const timeoutRef = useRef(null);
  const jugadoresMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    Jugadores.forEach((j) => {
      map.set(j.id, {
        id: j.id,
        nombre: j.nombre,
        url_foto: j.url_foto,
        equiposJugados: j.equiposJugados
      });
    });
    return map;
  }, []);
  const retoActual = useMemo(() => {
    const epoch = (/* @__PURE__ */ new Date("2026-01-01")).getTime();
    const dias = Math.floor((Date.now() - epoch) / (1e3 * 60 * 60 * 24));
    return datosRetos[dias % datosRetos.length];
  }, []);
  const jugadorOrigen = jugadoresMap.get(retoActual.origen);
  const jugadorDestino = jugadoresMap.get(retoActual.destino);
  useEffect(() => {
    const guardado = localStorage.getItem("nexos-hoy");
    if (guardado) {
      const { dia } = JSON.parse(guardado);
      if (dia === (/* @__PURE__ */ new Date()).toDateString()) {
        setHoyJugado(true);
      }
    }
    const progresoGuardado = localStorage.getItem("nexos-progreso");
    if (progresoGuardado) {
      const { activo, cadenaGuardada, dia } = JSON.parse(progresoGuardado);
      if (activo && dia === (/* @__PURE__ */ new Date()).toDateString()) {
        setJuegoActivo(true);
        if (cadenaGuardada && cadenaGuardada.length > 0) {
          setCadena(cadenaGuardada);
        } else if (jugadorOrigen) {
          setCadena([jugadorOrigen]);
        }
      } else if (jugadorOrigen) {
        setCadena([jugadorOrigen]);
      }
    } else if (jugadorOrigen) {
      setCadena([jugadorOrigen]);
    }
  }, [jugadorOrigen]);
  useEffect(() => {
    if (juegoActivo && !resultado && !hoyJugado) {
      localStorage.setItem("nexos-progreso", JSON.stringify({
        activo: true,
        cadenaGuardada: cadena,
        dia: (/* @__PURE__ */ new Date()).toDateString()
      }));
    }
  }, [juegoActivo, cadena, resultado, hoyJugado]);
  useEffect(() => {
    if (hoyJugado) {
      localStorage.removeItem("nexos-progreso");
    }
  }, [hoyJugado]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const finalizarJuego = (tipo, estrellas = 0, label = "") => {
    setResultado({ tipo, estrellas, label });
    setHoyJugado(true);
    setErrorCadena("");
    setNexoFallido(null);
    setProcesando(true);
    setVerificadoValido(false);
    localStorage.setItem("nexos-hoy", JSON.stringify({ dia: (/* @__PURE__ */ new Date()).toDateString() }));
    localStorage.removeItem("nexos-progreso");
  };
  const agregarIntermedio = (jugador) => {
    setCadena((prev) => [...prev, jugador]);
    setErrorCadena("");
    setNexoFallido(null);
  };
  const quitarUltimo = () => {
    if (cadena.length <= 1) return;
    setCadena((prev) => prev.slice(0, -1));
    setErrorCadena("");
    setNexoFallido(null);
  };
  const verificarNexos = () => {
    if (procesando) return;
    if (cadena.length < 2) {
      setErrorCadena("Agrega al menos un jugador intermedio");
      return;
    }
    setProcesando(true);
    const res = validarCadena(cadena, jugadorDestino);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (res.valido) {
      const result = calcularEstrellas(cadena.length - 2);
      setErrorCadena("");
      setNexoFallido(null);
      setVerificadoValido(true);
      timeoutRef.current = setTimeout(() => {
        finalizarJuego("victoria", result.estrellas, result.label);
      }, 1200);
    } else {
      setNexoFallido(res.nexoFallido ?? null);
      setErrorCadena(res.mensaje ?? "Nexo inválido");
      timeoutRef.current = setTimeout(() => {
        finalizarJuego("derrota");
      }, 1800);
    }
  };
  const rendirse = () => {
    if (procesando) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProcesando(true);
    finalizarJuego("rendicion");
  };
  if (!juegoActivo || hoyJugado && !resultado) {
    return /* @__PURE__ */ jsx(NexosMenu, { onJugar: () => setJuegoActivo(true), deshabilitado: hoyJugado });
  }
  return /* @__PURE__ */ jsx("div", { className: "nexos-container", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-6 text-center d-flex flex-column justify-content-center align-items-center contenedor-juego", children: [
    /* @__PURE__ */ jsxs("div", { className: "nexos-header", children: [
      /* @__PURE__ */ jsx("h2", { className: "nexos-titulo", children: "NEXOS" }),
      /* @__PURE__ */ jsx("p", { className: "nexos-subtitulo", children: "Encuentra la cadena de nexos" })
    ] }),
    /* @__PURE__ */ jsx(
      NexosChain,
      {
        cadena,
        destino: jugadorDestino ?? null,
        nexoFallido,
        valido: verificadoValido
      }
    ),
    /* @__PURE__ */ jsx(
      NexosBuscador,
      {
        jugadores: Array.from(jugadoresMap.values()),
        onAgregar: agregarIntermedio
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "nexos-acciones", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "nexos-btn-quitar",
          onClick: quitarUltimo,
          disabled: cadena.length <= 1 || procesando,
          children: "Quitar último"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "nexos-btn-verificar",
          onClick: verificarNexos,
          disabled: procesando,
          children: "Verificar Nexos"
        }
      )
    ] }),
    errorCadena && /* @__PURE__ */ jsxs("div", { className: "nexos-error", children: [
      /* @__PURE__ */ jsx("span", { className: "nexos-error-icono", children: "⚠️" }),
      /* @__PURE__ */ jsx("span", { children: errorCadena })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "nexos-btn-rendirse",
        onClick: rendirse,
        disabled: procesando,
        type: "button",
        children: "🏳️ Rendirse"
      }
    ),
    resultado && /* @__PURE__ */ jsx(
      NexosModal,
      {
        tipo: resultado.tipo,
        estrellas: resultado.estrellas,
        label: resultado.label,
        onVolver: () => {
          setResultado(null);
          setJuegoActivo(false);
        }
      }
    )
  ] }) }) }) });
}

const $$Nexos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "titulo": "Nexos - FutPer\xFA", "data-astro-cid-pwdcmt6p": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-pwdcmt6p> <div class="container-fluid" data-astro-cid-pwdcmt6p> <div class="row" data-astro-cid-pwdcmt6p> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-pwdcmt6p> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-pwdcmt6p> <div class="col-6" data-astro-cid-pwdcmt6p> <h1 class="text-center titulo-calculadora" data-astro-cid-pwdcmt6p>MINIJUEGO "NEXOS"</h1> </div> </div> </div> </div> </div> ${renderComponent($$result2, "NexosJuego", NexosJuego, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/minijuegos/nexos/NexosJuego", "client:component-export": "default", "data-astro-cid-pwdcmt6p": true })} </main> ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/nexos.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/nexos.astro";
const $$url = "/minijuegos/nexos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Nexos,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
