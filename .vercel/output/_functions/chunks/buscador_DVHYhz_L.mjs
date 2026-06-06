import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { J as Jugadores } from './jugadores_obtenidos_BRpnsaQX.mjs';
/* empty css                                      */

const JUGADORES = Jugadores;
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function Buscador({ onJugadorSeleccionado }) {
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (busqueda.length > 1) {
      const resultados = JUGADORES.filter(
        (jugador) => normalizarTexto(jugador.nombre.toLocaleLowerCase()).includes(normalizarTexto(busqueda))
      );
      setSugerencias(resultados);
      setMostrarLista(true);
    } else {
      setSugerencias([]);
      setMostrarLista(false);
    }
  }, [busqueda]);
  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };
  const handleSelect = (jugador) => {
    onJugadorSeleccionado(jugador);
    setBusqueda("");
    setMostrarLista(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "buscador-container", children: /* @__PURE__ */ jsxs("div", { className: "buscador-wrapper", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        placeholder: "Escribe el nombre del jugador...",
        value: busqueda,
        onChange: handleInputChange,
        className: "input-buscador"
      }
    ),
    mostrarLista && sugerencias.length > 0 && /* @__PURE__ */ jsx("ul", { className: "lista-sugerencias", children: sugerencias.map((jugador) => /* @__PURE__ */ jsxs(
      "li",
      {
        onClick: () => handleSelect(jugador),
        style: {
          padding: "10px",
          borderBottom: "1px solid #eee",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
          color: "#333"
        },
        onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#f0f0f0",
        onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "white",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: jugador.url_foto !== "https://img.a.transfermarkt.technology/portrait/header/default.jpg?lm=1" ? jugador.url_foto : "/img/minijuegos/default.webp",
              alt: jugador.nombre,
              style: { width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }
            }
          ),
          /* @__PURE__ */ jsx("div", { style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left"
          }, children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "bold" }, children: jugador.nombre }) })
        ]
      },
      jugador.id
    )) })
  ] }) });
}

export { Buscador as B };
