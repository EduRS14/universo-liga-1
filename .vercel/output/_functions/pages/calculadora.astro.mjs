import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                       */
import { E as EquiposData } from '../chunks/equipos_CqqkVLn1.mjs';
import { $ as $$Layout } from '../chunks/Layout_CH_ZwYLk.mjs';
export { renderers } from '../renderers.mjs';

function Resultados$1({
  equipos,
  fechaActual,
  onCambiarFecha,
  listaAuxiliar,
  onCambiarListaAuxiliar
}) {
  const guardarResultados = () => {
    const listaFecha = listaAuxiliar[`fecha${fechaActual}`] || [];
    const listaActualizada = listaFecha.map((p) => {
      const partido = { ...p };
      const golesLocal = partido.goles_local;
      const golesVisitante = partido.goles_visitante;
      if (golesLocal !== null && golesVisitante !== null) {
        if (golesLocal > golesVisitante) {
          partido.ganador = partido.equipo_local;
        } else if (golesLocal < golesVisitante) {
          partido.ganador = partido.equipo_visitante;
        } else {
          partido.ganador = 0;
        }
        partido.jugado = true;
      }
      return partido;
    });
    onCambiarListaAuxiliar((prev) => ({
      ...prev,
      [`fecha${fechaActual}`]: listaActualizada
    }));
    localStorage.setItem(
      `fecha${fechaActual}_apertura`,
      JSON.stringify(listaActualizada)
    );
    setEstadoCambio(false);
  };
  const reiniciarFecha = async () => {
    try {
      const response = await fetch(`/data/fechas/apertura/fecha${fechaActual}.json`);
      if (!response.ok) {
        throw new Error("Error al cargar los datos originales de los partidos");
      }
      const nuevaListaFecha = await response.json();
      onCambiarListaAuxiliar((prev) => ({
        ...prev,
        [`fecha${fechaActual}`]: nuevaListaFecha
      }));
      localStorage.setItem(`fecha${fechaActual}_apertura`, JSON.stringify(nuevaListaFecha));
      setEstadoReset(false);
      setEstadoCambio(false);
    } catch (error) {
      console.error(error);
    }
  };
  const [estadoCambio, setEstadoCambio] = useState(false);
  const [estadoReset, setEstadoReset] = useState(false);
  useEffect(() => {
    const listaFecha = listaAuxiliar[`fecha${fechaActual}`] || [];
    for (let partido of listaFecha) {
      const local = partido.goles_local;
      const visita = partido.goles_visitante;
      const esInvalido = local === null && visita !== null || local !== null && visita === null;
      if (esInvalido) {
        setEstadoCambio(false);
        return;
      }
    }
    const guardado = localStorage.getItem(`fecha${fechaActual}_apertura`);
    const listaGuardada = guardado ? JSON.parse(guardado) : [];
    const hayCambios = JSON.stringify(listaFecha) !== JSON.stringify(listaGuardada);
    setEstadoCambio(hayCambios);
  }, [listaAuxiliar, fechaActual]);
  useEffect(() => {
    setEstadoCambio(false);
  }, [fechaActual]);
  useEffect(() => {
    const listaFecha = listaAuxiliar[`fecha${fechaActual}`] || [];
    let estado = false;
    for (let i = 0; i < listaFecha.length; i++) {
      const partido = listaFecha[i];
      if (partido.goles_local !== null || partido.goles_visitante !== null) {
        estado = true;
        break;
      }
    }
    setEstadoReset(estado);
  }, [listaAuxiliar, fechaActual]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-resultados", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-opciones", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-3 texto text-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-primary btn-opciones",
          onClick: () => {
            if (fechaActual > 1) onCambiarFecha(fechaActual - 1);
          },
          disabled: fechaActual <= 1,
          children: "Anterior"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-3 texto text-center", children: /* @__PURE__ */ jsxs("h2", { className: "titulo-fecha", children: [
        "Fecha ",
        fechaActual
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-3 texto text-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-primary btn-opciones",
          onClick: () => {
            if (fechaActual < 17) onCambiarFecha(fechaActual + 1);
          },
          disabled: fechaActual >= 17,
          children: "Siguiente"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-calculadora", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: listaAuxiliar[`fecha${fechaActual}`]?.map(
      (partido, index) => {
        const equipoLocal = equipos.find((equipo) => equipo.id === partido.equipo_local);
        const equipoVisitante = equipos.find((equipo) => equipo.id === partido.equipo_visitante);
        let golesLocal = partido.goles_local ?? "";
        let golesVisitante = partido.goles_visitante ?? "";
        partido.ganador ?? null;
        let jugado = partido.jugado ?? false;
        return /* @__PURE__ */ jsx("div", { className: "col-10 contenedor-partido", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-between align-items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "col-3 col-md-4 p-0", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-5 col-lg-8 m-0 p-0 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "texto-equipos d-none d-lg-block", children: equipoLocal?.nombre }),
              /* @__PURE__ */ jsx("span", { className: "texto-equipos d-block d-lg-none", children: equipoLocal?.diminutivo })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-6 col-lg-4 m-0 text-center contenedor-escudo-2", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: equipoLocal?.url_foto,
                alt: "escudo_local",
                className: "img-fluid img-escudo"
              }
            ) })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "col-6 col-md-4 contenedor-inputs-resultado", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "col-5 px-0 text-center", children: /* @__PURE__ */ jsx(
              "input",
              {
                className: "input-resultado",
                type: "number",
                placeholder: "-",
                min: 0,
                value: golesLocal,
                onChange: (e) => {
                  const valor = e.target.value === "" ? null : parseInt(e.target.value);
                  onCambiarListaAuxiliar((prev) => {
                    const listaFecha = prev[`fecha${fechaActual}`] || [];
                    const nuevaLista = listaFecha.map(
                      (p, i) => i === index ? { ...p, goles_local: valor } : p
                    );
                    return {
                      ...prev,
                      [`fecha${fechaActual}`]: nuevaLista
                    };
                  });
                },
                disabled: jugado
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-2 text-center p-0", children: /* @__PURE__ */ jsx("span", { className: "texto-separador", children: " - " }) }),
            /* @__PURE__ */ jsx("div", { className: "col-5 px-0 text-center", children: /* @__PURE__ */ jsx(
              "input",
              {
                className: "input-resultado",
                type: "number",
                placeholder: "-",
                min: 0,
                value: golesVisitante,
                onChange: (e) => {
                  const valor = e.target.value === "" ? null : parseInt(e.target.value);
                  onCambiarListaAuxiliar((prev) => {
                    const listaFecha = prev[`fecha${fechaActual}`] || [];
                    const nuevaLista = listaFecha.map(
                      (p, i) => i === index ? { ...p, goles_visitante: valor } : p
                    );
                    return {
                      ...prev,
                      [`fecha${fechaActual}`]: nuevaLista
                    };
                  });
                },
                disabled: jugado
              }
            ) })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "col-3 col-md-4 p-0", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "col-6 col-lg-4 m-0 text-center contenedor-escudo", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: equipoVisitante?.url_foto,
                alt: "escudo_visitante",
                className: "img-fluid img-escudo"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "col-5 col-lg-8 m-0 p-0 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "texto-equipos d-none d-lg-block", children: equipoVisitante?.nombre }),
              /* @__PURE__ */ jsx("span", { className: "texto-equipos d-block d-lg-none", children: equipoVisitante?.diminutivo })
            ] })
          ] }) }) })
        ] }) }) }, index);
      }
    ) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-opciones", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-5 col-lg-4 text-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-success btn-opciones",
          disabled: !estadoCambio,
          onClick: guardarResultados,
          children: "Guardar Resultados"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-5 col-lg-4 text-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-success btn-opciones",
          disabled: !estadoReset,
          onClick: reiniciarFecha,
          children: "Reiniciar Fecha"
        }
      ) })
    ] }) }) })
  ] }) }) });
}

function Resultados({ equipos, listaFechas }) {
  const [resultados, setResultados] = useState([]);
  useEffect(() => {
    const nuevosResultados = equipos.map((equipo) => {
      let partidosJugados = 0;
      let puntos = 0;
      let victorias = 0;
      let empates = 0;
      let derrotas = 0;
      let golesFavor = 0;
      let golesContra = 0;
      for (const fecha in listaFechas) {
        listaFechas[fecha].forEach((partido) => {
          if (partido.jugado === true) {
            if (partido.equipo_local === equipo.id || partido.equipo_visitante === equipo.id) {
              partidosJugados++;
              let golesLocal = partido.goles_local ?? 0;
              let golesVisitante = partido.goles_visitante ?? 0;
              if (partido.equipo_local === equipo.id) {
                golesFavor += golesLocal;
                golesContra += golesVisitante;
                if (golesLocal > golesVisitante) {
                  victorias++;
                  puntos += 3;
                } else if (golesLocal === golesVisitante) {
                  empates++;
                  puntos += 1;
                } else {
                  derrotas++;
                }
              } else {
                golesFavor += golesVisitante;
                golesContra += golesLocal;
                if (golesVisitante > golesLocal) {
                  victorias++;
                  puntos += 3;
                } else if (golesVisitante === golesLocal) {
                  empates++;
                  puntos += 1;
                } else {
                  derrotas++;
                }
              }
            }
          }
        });
      }
      return {
        equipo: equipo.nombre,
        diminutivo: equipo.diminutivo,
        puntos,
        partidosJugados,
        victorias,
        empates,
        derrotas,
        golesFavor,
        golesContra,
        diferenciaGoles: golesFavor - golesContra
      };
    });
    nuevosResultados.sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos;
      } else if (b.diferenciaGoles !== a.diferenciaGoles) {
        return b.diferenciaGoles - a.diferenciaGoles;
      } else if (b.golesFavor !== a.golesFavor) {
        return b.golesFavor - a.golesFavor;
      } else {
        return a.equipo.localeCompare(b.equipo);
      }
    });
    setResultados(nuevosResultados);
  }, [listaFechas, equipos]);
  return /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-tabla", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-titulo-tabla", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-6 texto text-center", children: /* @__PURE__ */ jsx("h2", { className: "titulo-fecha", children: "Tabla - Torneo Apertura" }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-cuerpo-tabla", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-encabezado-tabla", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center justify-content-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center contenedor-numero-tabla", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "#" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-3", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "Equipo" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "PJ" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "PG" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "PE" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "PP" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 d-none d-lg-block text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "GF" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 d-none d-lg-block text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "GC" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "DG" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: "PTS" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "separador" }),
      resultados.map((resultado, index) => /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-resultado-tabla", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center justify-content-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center contenedor-numero-tabla", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-100 h-100",
            style: index + 1 == 1 ? { backgroundColor: "#f0b535", borderRadius: "5px" } : index + 1 <= 4 ? { backgroundColor: "#32a869", borderRadius: "5px" } : index + 1 <= 8 ? { backgroundColor: "#e0944d", borderRadius: "5px" } : index + 1 >= 16 ? { backgroundColor: "#e5533d", borderRadius: "5px" } : {},
            children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: index + 1 })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-3 d-none d-lg-block texto-tabla", children: resultado.equipo }),
        /* @__PURE__ */ jsx("div", { className: "col-3 d-block d-lg-none texto-tabla", children: resultado.diminutivo }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center texto-tabla", children: resultado.partidosJugados }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center texto-tabla", children: resultado.victorias }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center texto-tabla", children: resultado.empates }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center texto-tabla", children: resultado.derrotas }),
        /* @__PURE__ */ jsx("div", { className: "col-1 d-none d-lg-block text-center texto-tabla", children: resultado.golesFavor }),
        /* @__PURE__ */ jsx("div", { className: "col-1 d-none d-lg-block text-center texto-tabla", children: resultado.golesContra }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center texto-tabla", children: resultado.diferenciaGoles }),
        /* @__PURE__ */ jsx("div", { className: "col-1 text-center texto-tabla", children: /* @__PURE__ */ jsx("strong", { className: "texto-tabla", children: resultado.puntos }) })
      ] }) }) }, index))
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-10 col-md-5", children: /* @__PURE__ */ jsx("div", { className: "container-fluid contenedor-leyenda", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 text-center contenedor-leyenda-tabla", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-2 contenedor-cuadrado-leyenda", children: /* @__PURE__ */ jsx("div", { className: "cuadrado-amarillo" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-10 texto-tabla", children: /* @__PURE__ */ jsx("p", { className: "texto-leyenda", children: "Campeón del Torneo Apertura" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-12 text-center contenedor-leyenda-tabla", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-2 contenedor-cuadrado-leyenda", children: /* @__PURE__ */ jsx("div", { className: "cuadrado-verde" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-10 texto-tabla", children: /* @__PURE__ */ jsx("p", { className: "texto-leyenda", children: "Clasificación a Copa Libertadores" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-12 text-center contenedor-leyenda-tabla", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-2 contenedor-cuadrado-leyenda", children: /* @__PURE__ */ jsx("div", { className: "cuadrado-naranja" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-10 texto-tabla", children: /* @__PURE__ */ jsx("p", { className: "texto-leyenda", children: "Clasificación a Copa Sudamericana" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-12 text-center contenedor-leyenda-tabla", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-2 contenedor-cuadrado-leyenda", children: /* @__PURE__ */ jsx("div", { className: "cuadrado-rojo" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-10 texto-tabla", children: /* @__PURE__ */ jsx("p", { className: "texto-leyenda", children: "Descenso a Segunda División" }) })
      ] }) }) })
    ] }) }) })
  ] }) });
}

function App() {
  const [dataEquipos, setDataEquipos] = useState([]);
  const [fechaActual, setFechaActual] = useState(17);
  const [listaPartidosAuxiliares, setListaPartidosAuxiliares] = useState({});
  const [sincronizando, setSincronizando] = useState(false);
  const sincronizarDatosReales = async () => {
    setSincronizando(true);
    const confirmar = window.confirm(
      "¿Deseas actualizar a los resultados reales? Esto sobrescribirá TODAS tus simulaciones."
    );
    if (!confirmar) {
      setSincronizando(false);
      return;
    }
    try {
      const TOTAL_FECHAS = 17;
      const nuevaListaAuxiliar = {};
      for (let i = 1; i <= TOTAL_FECHAS; i++) {
        const response = await fetch(`/data/fechas/apertura/fecha${i}.json`);
        if (!response.ok) {
          throw new Error(`Error al obtener fecha ${i}`);
        }
        const datos = await response.json();
        nuevaListaAuxiliar[`fecha${i}`] = datos;
        localStorage.setItem(
          `fecha${i}_apertura`,
          JSON.stringify(datos)
        );
      }
      setListaPartidosAuxiliares(nuevaListaAuxiliar);
      alert("Todas las fechas fueron sincronizadas con resultados oficiales.");
    } catch (error) {
      console.error("Error al sincronizar:", error);
      alert("No se pudo sincronizar con los datos oficiales.");
    } finally {
      setSincronizando(false);
    }
  };
  useEffect(() => {
    setDataEquipos(EquiposData);
  }, []);
  useEffect(() => {
    async function cargarTodasLasFechas() {
      const nuevaListaAuxiliar = {};
      const TOTAL_FECHAS = 17;
      for (let i = 1; i <= TOTAL_FECHAS; i++) {
        const fechaGuardada = localStorage.getItem(`fecha${i}_apertura`);
        if (fechaGuardada) {
          nuevaListaAuxiliar[`fecha${i}`] = JSON.parse(fechaGuardada);
        } else {
          try {
            const response = await fetch(`/data/fechas/apertura/fecha${i}.json`);
            if (!response.ok) {
              throw new Error("Error al cargar datos");
            }
            const datos = await response.json();
            nuevaListaAuxiliar[`fecha${i}`] = datos;
            localStorage.setItem(`fecha${i}_apertura`, JSON.stringify(datos));
          } catch (error) {
            console.error(error);
          }
        }
      }
      setListaPartidosAuxiliares(nuevaListaAuxiliar);
    }
    cargarTodasLasFechas();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsx("div", { className: "col-12 contenedor-titulo-calculadora", children: /* @__PURE__ */ jsx("div", { className: "row gx-0 justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-6", children: /* @__PURE__ */ jsx("h1", { className: "text-center titulo-calculadora", children: "LA CALCULADORA 2026" }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "col-12 col-md-6", children: /* @__PURE__ */ jsx(
      Resultados$1,
      {
        equipos: dataEquipos,
        fechaActual,
        onCambiarFecha: setFechaActual,
        listaAuxiliar: listaPartidosAuxiliares,
        onCambiarListaAuxiliar: setListaPartidosAuxiliares
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "col-12 col-md-6", children: /* @__PURE__ */ jsx(Resultados, { equipos: dataEquipos, listaFechas: listaPartidosAuxiliares }) }),
    /* @__PURE__ */ jsx("div", { className: "col-12 col-md-6 text-center mb-4", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `btn-sincronizar ${sincronizando ? "btn-esperando" : ""}`,
        disabled: sincronizando,
        onClick: sincronizarDatosReales,
        children: sincronizando ? "Sincronizando..." : "Sincronizar datos reales"
      }
    ) })
  ] }) });
}

const $$Calculadora = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-cwjzrvva": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "App", App, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/App.tsx", "client:component-export": "default", "data-astro-cid-cwjzrvva": true })} ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/calculadora.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/calculadora.astro";
const $$url = "/calculadora";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Calculadora,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
