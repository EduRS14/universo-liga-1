import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CH_ZwYLk.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useCallback } from 'react';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const equiposData = [
	{
		id: 1,
		nombre: "Alianza Lima",
		diminutivo: "ALI",
		url_foto: "/img/equipos/alima.webp",
		ciudad: "Lima",
		division: "Liga 1"
	},
	{
		id: 2,
		nombre: "Alianza Atlético",
		diminutivo: "AAS",
		url_foto: "/img/equipos/aas.webp",
		ciudad: "Sullana",
		division: "Liga 1"
	},
	{
		id: 3,
		nombre: "César Vallejo",
		diminutivo: "UCV",
		url_foto: "/img/equipos/ucv.webp",
		ciudad: "Trujillo",
		division: "Liga 1"
	},
	{
		id: 4,
		nombre: "Carlos A. Mannucci",
		diminutivo: "CAM",
		url_foto: "/img/equipos/mannucci.webp",
		ciudad: "Trujillo",
		division: "Liga 1"
	},
	{
		id: 5,
		nombre: "Comerciantes Unidos",
		diminutivo: "COM",
		url_foto: "/img/equipos/comerciantes.webp",
		ciudad: "Cutervo",
		division: "Liga 1"
	},
	{
		id: 6,
		nombre: "Juan Pablo II College",
		diminutivo: "JPA",
		url_foto: "/img/equipos/jpii.webp",
		ciudad: "Moyobamba",
		division: "Liga 2"
	},
	{
		id: 7,
		nombre: "ADA Jaén",
		diminutivo: "ADA",
		url_foto: "/img/equipos/ada.webp",
		ciudad: "Jaén",
		division: "Liga 2"
	},
	{
		id: 8,
		nombre: "UTC",
		diminutivo: "UTC",
		url_foto: "/img/equipos/utc.webp",
		ciudad: "Cajamarca",
		division: "Liga 1"
	},
	{
		id: 9,
		nombre: "FC Cajamarca",
		diminutivo: "CAJ",
		url_foto: "/img/equipos/cajamarca.webp",
		ciudad: "Cajamarca",
		division: "Liga 2"
	},
	{
		id: 10,
		nombre: "Deportivo Llacuabamba",
		diminutivo: "LLA",
		url_foto: "/img/equipos/llacuabamba.webp",
		ciudad: "Llacuabamba",
		division: "Liga 2"
	},
	{
		id: 11,
		nombre: "Universitario",
		diminutivo: "UNI",
		url_foto: "/img/equipos/u.webp",
		ciudad: "Lima",
		division: "Liga 1"
	},
	{
		id: 12,
		nombre: "Atlético Grau",
		diminutivo: "CAG",
		url_foto: "/img/equipos/ag.webp",
		ciudad: "Piura",
		division: "Liga 1"
	},
	{
		id: 13,
		nombre: "Pirata FC",
		diminutivo: "PIR",
		url_foto: "/img/equipos/pirata.webp",
		ciudad: "Chiclayo",
		division: "Liga 2"
	},
	{
		id: 14,
		nombre: "Sport Huancayo",
		diminutivo: "HUA",
		url_foto: "/img/equipos/huancayo.webp",
		ciudad: "Huancayo",
		division: "Liga 1"
	},
	{
		id: 15,
		nombre: "ADT",
		diminutivo: "ADT",
		url_foto: "/img/equipos/adt.webp",
		ciudad: "Tarma",
		division: "Liga 1"
	},
	{
		id: 16,
		nombre: "Alianza UDH",
		diminutivo: "AUD",
		url_foto: "/img/equipos/au.webp",
		ciudad: "Huánuco",
		division: "Liga 2"
	},
	{
		id: 17,
		nombre: "Unión Minas",
		diminutivo: "UMI",
		url_foto: "/img/equipos/um.webp",
		ciudad: "Cerro de Pasco",
		division: "Liga 2"
	},
	{
		id: 18,
		nombre: "Cusco FC",
		diminutivo: "CUS",
		url_foto: "/img/equipos/cusco.webp",
		ciudad: "Cusco",
		division: "Liga 1"
	},
	{
		id: 19,
		nombre: "Cienciano",
		diminutivo: "CIE",
		url_foto: "/img/equipos/cienciano.webp",
		ciudad: "Cusco",
		division: "Liga 1"
	},
	{
		id: 20,
		nombre: "Deportivo Garcilaso",
		diminutivo: "GAR",
		url_foto: "/img/equipos/garcilaso.webp",
		ciudad: "Cusco",
		division: "Liga 1"
	},
	{
		id: 21,
		nombre: "Deportivo Binacional",
		diminutivo: "BIN",
		url_foto: "/img/equipos/binacional.webp",
		ciudad: "Juliaca",
		division: "Liga 2"
	},
	{
		id: 22,
		nombre: "Los Chankas",
		diminutivo: "CHA",
		url_foto: "/img/equipos/chankas.webp",
		ciudad: "Andahuaylas",
		division: "Liga 1"
	},
	{
		id: 23,
		nombre: "Santos FC",
		diminutivo: "SAN",
		url_foto: "/img/equipos/santos.webp",
		ciudad: "Ica",
		division: "Liga 2"
	},
	{
		id: 24,
		nombre: "Ayacucho FC",
		diminutivo: "AYA",
		url_foto: "/img/equipos/ayacucho.webp",
		ciudad: "Ayacucho",
		division: "Liga 2"
	},
	{
		id: 25,
		nombre: "FBC Melgar",
		diminutivo: "MEL",
		url_foto: "/img/equipos/melgar.webp",
		ciudad: "Arequipa",
		division: "Liga 1"
	},
	{
		id: 26,
		nombre: "Deportivo Moquegua",
		diminutivo: "MOQ",
		url_foto: "/img/equipos/moquegua.webp",
		ciudad: "Moquegua",
		division: "Liga 1"
	},
	{
		id: 27,
		nombre: "Bentín Tacna Heroica",
		diminutivo: "BTH",
		url_foto: "/img/equipos/bth.webp",
		ciudad: "Tacna",
		division: "Liga 2"
	},
	{
		id: 28,
		nombre: "Sport Boys",
		diminutivo: "SBA",
		url_foto: "/img/equipos/sb.webp",
		ciudad: "Callao",
		division: "Liga 1"
	},
	{
		id: 29,
		nombre: "Academia Cantolao",
		diminutivo: "CAN",
		url_foto: "/img/equipos/cantolao.webp",
		ciudad: "Callao",
		division: "Liga 2"
	},
	{
		id: 30,
		nombre: "Universidad San Martín",
		diminutivo: "USM",
		url_foto: "/img/equipos/usmp.webp",
		ciudad: "Lima",
		division: "Liga 2"
	},
	{
		id: 31,
		nombre: "Sporting Cristal",
		diminutivo: "CSC",
		url_foto: "/img/equipos/sc.webp",
		ciudad: "Lima",
		division: "Liga 1"
	},
	{
		id: 32,
		nombre: "Unión Comercio",
		diminutivo: "UCO",
		url_foto: "/img/equipos/uc.webp",
		ciudad: "Nueva Cajamarca",
		division: "Liga 2"
	},
	{
		id: 33,
		nombre: "Comerciantes FC",
		diminutivo: "CFC",
		url_foto: "/img/equipos/comfc.webp",
		ciudad: "Sullana",
		division: "Liga 2"
	},
	{
		id: 34,
		nombre: "Estudiantil CNI",
		diminutivo: "CNI",
		url_foto: "/img/equipos/cni.webp",
		ciudad: "Iquitos",
		division: "Liga 2"
	}
];

const getEquipo = (id) => {
  const e = equiposData.find((eq) => eq.id === id);
  if (!e) throw new Error(`Equipo no encontrado: ${id}`);
  return e;
};
const gruposCopa = [
  {
    letra: "A",
    tipo: "cuatro",
    equipos: [getEquipo(1), getEquipo(2), getEquipo(3), getEquipo(4)]
  },
  {
    letra: "B",
    tipo: "tres",
    equipos: [getEquipo(5), getEquipo(6), getEquipo(7)]
  },
  {
    letra: "C",
    tipo: "tres",
    equipos: [getEquipo(8), getEquipo(9), getEquipo(10)]
  },
  {
    letra: "D",
    tipo: "tres",
    equipos: [getEquipo(11), getEquipo(12), getEquipo(13)]
  },
  {
    letra: "E",
    tipo: "cuatro",
    equipos: [getEquipo(14), getEquipo(15), getEquipo(16), getEquipo(17)]
  },
  {
    letra: "F",
    tipo: "cuatro",
    equipos: [getEquipo(18), getEquipo(19), getEquipo(20), getEquipo(21)]
  },
  {
    letra: "G",
    tipo: "tres",
    equipos: [getEquipo(22), getEquipo(23), getEquipo(24)]
  },
  {
    letra: "H",
    tipo: "tres",
    equipos: [getEquipo(25), getEquipo(26), getEquipo(27)]
  },
  {
    letra: "I",
    tipo: "tres",
    equipos: [getEquipo(28), getEquipo(29), getEquipo(30)]
  },
  {
    letra: "J",
    tipo: "cuatro",
    equipos: [getEquipo(31), getEquipo(32), getEquipo(33), getEquipo(34)]
  }
];

function generarFechasGrupo(grupo) {
  const { equipos, letra, tipo } = grupo;
  if (letra === "A") {
    const [e12, e22, e32, e4] = equipos;
    return [
      { numero: 1, partidos: [crearPartido(letra, 1, e4, e22), crearPartido(letra, 2, e32, e12)] },
      { numero: 2, partidos: [crearPartido(letra, 3, e22, e32), crearPartido(letra, 4, e4, e12)] },
      { numero: 3, partidos: [crearPartido(letra, 5, e32, e4), crearPartido(letra, 6, e12, e22)] }
    ];
  }
  if (letra === "E") {
    const [e12, e22, e32, e4] = equipos;
    return [
      { numero: 1, partidos: [crearPartido(letra, 1, e4, e22), crearPartido(letra, 2, e32, e12)] },
      { numero: 2, partidos: [crearPartido(letra, 3, e22, e32), crearPartido(letra, 4, e4, e12)] },
      { numero: 3, partidos: [crearPartido(letra, 5, e32, e4), crearPartido(letra, 6, e12, e22)] }
    ];
  }
  if (letra === "F") {
    const [e12, e22, e32, e4] = equipos;
    return [
      { numero: 1, partidos: [crearPartido(letra, 1, e4, e22), crearPartido(letra, 2, e32, e12)] },
      { numero: 2, partidos: [crearPartido(letra, 3, e22, e32), crearPartido(letra, 4, e4, e12)] },
      { numero: 3, partidos: [crearPartido(letra, 5, e32, e4), crearPartido(letra, 6, e12, e22)] }
    ];
  }
  if (letra === "J") {
    const [e12, e22, e32, e4] = equipos;
    return [
      { numero: 1, partidos: [crearPartido(letra, 1, e32, e12), crearPartido(letra, 2, e4, e22)] },
      { numero: 2, partidos: [crearPartido(letra, 3, e22, e32), crearPartido(letra, 4, e4, e12)] },
      { numero: 3, partidos: [crearPartido(letra, 5, e32, e4), crearPartido(letra, 6, e12, e22)] }
    ];
  }
  if (tipo === "tres") {
    const [e12, e22, e32] = equipos;
    if (letra === "B") {
      return [
        { numero: 1, partidos: [crearPartido(letra, 1, e32, e12)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e22, e32)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e12, e22)] }
      ];
    }
    if (letra === "C") {
      return [
        { numero: 1, partidos: [crearPartido(letra, 1, e32, e12)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e22, e32)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e12, e22)] }
      ];
    }
    if (letra === "D") {
      return [
        { numero: 1, partidos: [crearPartido(letra, 1, e32, e12)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e22, e32)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e12, e22)] }
      ];
    }
    if (letra === "G") {
      return [
        { numero: 1, partidos: [crearPartido(letra, 1, e32, e12)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e22, e32)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e12, e22)] }
      ];
    }
    if (letra === "H") {
      return [
        { numero: 1, partidos: [crearPartido(letra, 1, e32, e12)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e22, e32)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e12, e22)] }
      ];
    }
    if (letra === "I") {
      return [
        { numero: 1, partidos: [crearPartido(letra, 1, e32, e12)] },
        { numero: 2, partidos: [crearPartido(letra, 2, e22, e32)] },
        { numero: 3, partidos: [crearPartido(letra, 3, e12, e22)] }
      ];
    }
  }
  const [e1, e2, e3] = equipos;
  return [
    { numero: 1, partidos: [crearPartido(letra, 1, e3, e1)] },
    { numero: 2, partidos: [crearPartido(letra, 2, e2, e3)] },
    { numero: 3, partidos: [crearPartido(letra, 3, e1, e2)] }
  ];
}
function crearPartido(grupoLetra, fechaNum, local, visitante) {
  return {
    id: `G${grupoLetra}-F${fechaNum}-P${Math.random().toString(36).substr(2, 5)}`,
    equipo_local_id: local.id,
    equipo_visitante_id: visitante.id,
    goles_local: null,
    goles_visitante: null,
    jugado: false
  };
}

function calcularTablaGrupo(grupo, fechas) {
  const tabla = grupo.equipos.map((eq) => ({
    equipo_id: eq.id,
    puntos: 0,
    partidosJugados: 0,
    victorias: 0,
    empates: 0,
    derrotas: 0,
    golesFavor: 0,
    golesContra: 0,
    diferenciaGoles: 0
  }));
  for (const fecha of fechas) {
    for (const partido of fecha.partidos) {
      if (!partido.jugado || partido.goles_local === null || partido.goles_visitante === null) continue;
      const local = tabla.find((t) => t.equipo_id === partido.equipo_local_id);
      const visitante = tabla.find((t) => t.equipo_id === partido.equipo_visitante_id);
      local.partidosJugados++;
      visitante.partidosJugados++;
      local.golesFavor += partido.goles_local;
      local.golesContra += partido.goles_visitante;
      visitante.golesFavor += partido.goles_visitante;
      visitante.golesContra += partido.goles_local;
      if (partido.goles_local > partido.goles_visitante) {
        local.puntos += 3;
        local.victorias++;
        visitante.derrotas++;
      } else if (partido.goles_local < partido.goles_visitante) {
        visitante.puntos += 3;
        visitante.victorias++;
        local.derrotas++;
      } else {
        local.puntos += 1;
        visitante.puntos += 1;
        local.empates++;
        visitante.empates++;
      }
    }
  }
  tabla.forEach((t) => {
    t.diferenciaGoles = t.golesFavor - t.golesContra;
  });
  tabla.sort((a, b) => {
    if (b.puntos !== a.puntos) return b.puntos - a.puntos;
    if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
    if (b.golesFavor !== a.golesFavor) return b.golesFavor - a.golesFavor;
    return 0;
  });
  return tabla;
}

function calcularPromedio(tabla) {
  return tabla.map((t) => {
    const pj = t.partidosJugados || 1;
    return {
      equipo_id: t.equipo_id,
      puntos: t.puntos,
      partidosJugados: t.partidosJugados,
      diferenciaGoles: t.diferenciaGoles,
      golesFavor: t.golesFavor,
      promedioPuntos: t.puntos / pj,
      promedioDG: t.diferenciaGoles / pj,
      promedioGF: t.golesFavor / pj
    };
  });
}
function ordenarPorPromedio(equipos) {
  return [...equipos].sort((a, b) => {
    if (Math.abs(b.promedioPuntos - a.promedioPuntos) > 1e-3) return b.promedioPuntos - a.promedioPuntos;
    if (Math.abs(b.promedioDG - a.promedioDG) > 1e-3) return b.promedioDG - a.promedioDG;
    if (Math.abs(b.promedioGF - a.promedioGF) > 1e-3) return b.promedioGF - a.promedioGF;
    return 0;
  });
}

function obtenerClasificacion(grupos, todasLasFechas) {
  const primeros = [];
  const segundos = [];
  const segundosGruposDeTres = [];
  for (const grupo of grupos) {
    const fechas = todasLasFechas[grupo.letra] || [];
    const tabla = calcularTablaGrupo(grupo, fechas);
    const conPromedio = calcularPromedio(tabla);
    const primero = conPromedio[0];
    const segundo = conPromedio[1];
    primeros.push({
      grupoLetra: grupo.letra,
      equipo_id: primero.equipo_id,
      promedio: primero
    });
    segundos.push({
      grupoLetra: grupo.letra,
      equipo_id: segundo.equipo_id,
      promedio: segundo
    });
    if (grupo.tipo === "tres") {
      segundosGruposDeTres.push({
        grupoLetra: grupo.letra,
        equipo_id: segundo.equipo_id,
        promedio: segundo
      });
    }
  }
  const ordenados = ordenarPorPromedio(segundosGruposDeTres);
  const mejoresSegundos = ordenados.slice(0, 2);
  return {
    primeros,
    segundos,
    mejoresSegundosGruposDeTres: mejoresSegundos
  };
}

const GRUPOS_DE_CUATRO = /* @__PURE__ */ new Set(["A", "E", "F", "J"]);
function generarSembrado(clasificacion, equiposMap) {
  const todosPrimeros = clasificacion.primeros.map((p) => ({
    ...p.promedio,
    esPrimero: true
  }));
  const segundosDeGruposDeCuatro = clasificacion.segundos.filter((s) => GRUPOS_DE_CUATRO.has(s.grupoLetra)).map((s) => ({ ...s.promedio, esPrimero: false }));
  const mejoresSegundosDeTres = clasificacion.mejoresSegundosGruposDeTres.map((s) => ({ ...s.promedio, esPrimero: false }));
  const restantes = [
    ...segundosDeGruposDeCuatro,
    ...mejoresSegundosDeTres
  ];
  const primerosOrdenados = ordenarPorPromedio(todosPrimeros);
  const restantesOrdenados = ordenarPorPromedio(restantes);
  const sembrado = [];
  primerosOrdenados.forEach((p, i) => {
    sembrado.push({
      posicion: i + 1,
      equipo: equiposMap.get(p.equipo_id),
      puntos: p.puntos,
      partidosJugados: p.partidosJugados,
      diferenciaGoles: p.diferenciaGoles,
      promedioPuntos: p.promedioPuntos,
      promedioDG: p.promedioDG,
      esPrimero: true
    });
  });
  restantesOrdenados.forEach((p, i) => {
    sembrado.push({
      posicion: primerosOrdenados.length + i + 1,
      equipo: equiposMap.get(p.equipo_id),
      puntos: p.puntos,
      partidosJugados: p.partidosJugados,
      diferenciaGoles: p.diferenciaGoles,
      promedioPuntos: p.promedioPuntos,
      promedioDG: p.promedioDG,
      esPrimero: false
    });
  });
  return sembrado;
}

function generarCrucesOctavos(sembrado) {
  const cruces = [
    [1, 16],
    [2, 15],
    [3, 14],
    [4, 13],
    [5, 12],
    [6, 11],
    [7, 10],
    [8, 9]
  ];
  return cruces.map(([seedLocal, seedVisitante], i) => {
    const local = sembrado.find((s) => s.posicion === seedLocal);
    const visitante = sembrado.find((s) => s.posicion === seedVisitante);
    return {
      id: `octavos-${i + 1}`,
      equipo_local: local ? local.equipo : null,
      equipo_visitante: visitante ? visitante.equipo : null,
      goles_local: null,
      goles_visitante: null,
      penales_local: null,
      penales_visitante: null,
      ganador: null,
      jugado: false
    };
  });
}
function generarCuartos(partidosOctavos) {
  const cruces = [
    [0, 7],
    [1, 6],
    [2, 5],
    [3, 4]
  ];
  return cruces.map(([idx1, idx2], i) => {
    const g1 = partidosOctavos[idx1]?.ganador || null;
    const g2 = partidosOctavos[idx2]?.ganador || null;
    return {
      id: `cuartos-${String.fromCharCode(65 + i)}`,
      equipo_local: g1,
      equipo_visitante: g2,
      goles_local: null,
      goles_visitante: null,
      penales_local: null,
      penales_visitante: null,
      ganador: null,
      jugado: false
    };
  });
}
function generarSemifinales(partidosCuartos) {
  const cruces = [
    [0, 3],
    [1, 2]
  ];
  return cruces.map(([idx1, idx2], i) => {
    const g1 = partidosCuartos[idx1]?.ganador || null;
    const g2 = partidosCuartos[idx2]?.ganador || null;
    return {
      id: `semifinal-${i + 1}`,
      equipo_local: g1,
      equipo_visitante: g2,
      goles_local: null,
      goles_visitante: null,
      penales_local: null,
      penales_visitante: null,
      ganador: null,
      jugado: false
    };
  });
}
function generarFinal(partidosSemifinales) {
  const g1 = partidosSemifinales[0]?.ganador || null;
  const g2 = partidosSemifinales[1]?.ganador || null;
  return {
    id: "final",
    equipo_local: g1,
    equipo_visitante: g2,
    goles_local: null,
    goles_visitante: null,
    penales_local: null,
    penales_visitante: null,
    ganador: null,
    jugado: false
  };
}

const KEYS_FASES = [
  "copa-liga-octavos",
  "copa-liga-cuartos",
  "copa-liga-semifinales",
  "copa-liga-final",
  "copa-liga-ganador"
];
function invalidarHaciaAdelante(fase) {
  switch (fase) {
    case "grupos":
      KEYS_FASES.forEach((key) => localStorage.removeItem(key));
      break;
    case "octavos":
      ["copa-liga-cuartos", "copa-liga-semifinales", "copa-liga-final", "copa-liga-ganador"].forEach((key) => localStorage.removeItem(key));
      break;
    case "cuartos":
      ["copa-liga-semifinales", "copa-liga-final", "copa-liga-ganador"].forEach((key) => localStorage.removeItem(key));
      break;
    case "semifinales":
      ["copa-liga-final", "copa-liga-ganador"].forEach((key) => localStorage.removeItem(key));
      break;
  }
}

function GruposGrid({ grupos, grupoSeleccionado, onSeleccionar, fechasPorGrupo }) {
  const getProgreso = (grupo) => {
    const fechas = fechasPorGrupo[grupo.letra];
    if (!fechas) return { jugados: 0, total: 0 };
    let total = 0;
    let jugados = 0;
    for (const fecha of fechas) {
      for (const p of fecha.partidos) {
        total++;
        if (p.jugado) jugados++;
      }
    }
    return { jugados, total };
  };
  return /* @__PURE__ */ jsxs("div", { className: "container-fluid", children: [
    /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-12 text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "titulo-seccion", children: "FASE DE GRUPOS" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "row justify-content-center g-3", children: grupos.map((grupo) => {
      const progreso = getProgreso(grupo);
      const completo = progreso.jugados === progreso.total && progreso.total > 0;
      const seleccionado = grupoSeleccionado?.letra === grupo.letra;
      return /* @__PURE__ */ jsx("div", { className: "col-6 col-md-4 col-lg-3 col-xl-2", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `card-grupo ${completo ? "card-completo" : ""} ${seleccionado ? "card-seleccionado" : ""}`,
          onClick: () => onSeleccionar(grupo),
          children: [
            /* @__PURE__ */ jsx("div", { className: "d-none d-md-block", children: /* @__PURE__ */ jsxs("div", { className: "card-grupo-header", children: [
              /* @__PURE__ */ jsxs("span", { className: "card-grupo-letra", children: [
                "GRUPO ",
                grupo.letra
              ] }),
              /* @__PURE__ */ jsx("span", { className: "card-grupo-tipo", children: grupo.tipo === "cuatro" ? "4 equipos" : "3 equipos" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "d-block d-md-none", children: /* @__PURE__ */ jsx("div", { className: "card-grupo-header", children: /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row justify-content-center align-items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsxs("span", { className: "card-grupo-letra", children: [
                "GRUPO ",
                grupo.letra
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsx("span", { className: "card-grupo-tipo", children: grupo.tipo === "cuatro" ? "4 equipos" : "3 equipos" }) })
            ] }) }) }) }),
            /* @__PURE__ */ jsx("div", { className: "card-grupo-equipos", children: grupo.equipos.map((eq) => /* @__PURE__ */ jsxs("div", { className: "card-grupo-equipo", children: [
              /* @__PURE__ */ jsx("img", { src: eq.url_foto, alt: eq.nombre, className: "card-grupo-logo" }),
              /* @__PURE__ */ jsx("span", { className: "card-grupo-nombre", children: eq.diminutivo })
            ] }, eq.id)) }),
            /* @__PURE__ */ jsxs("div", { className: "card-grupo-progreso", children: [
              /* @__PURE__ */ jsx("div", { className: "progreso-bar", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "progreso-fill",
                  style: { width: `${progreso.total > 0 ? progreso.jugados / progreso.total * 100 : 0}%` }
                }
              ) }),
              /* @__PURE__ */ jsxs("span", { className: "progreso-texto", children: [
                progreso.jugados,
                "/",
                progreso.total
              ] })
            ] })
          ]
        }
      ) }, grupo.letra);
    }) })
  ] });
}

function ResultadosGrupo({ grupo, fechas, onFechasActualizadas }) {
  const [fechaIdx, setFechaIdx] = useState(0);
  const [fechasLocal, setFechasLocal] = useState(fechas);
  useEffect(() => {
    setFechasLocal(fechas);
  }, [fechas]);
  const fechaActual = fechasLocal[fechaIdx];
  if (!fechaActual) return null;
  const equiposMap = new Map(grupo.equipos.map((e) => [e.id, e]));
  const actualizarPartido = (partidoIdx, campo, valor) => {
    const nuevasFechas = fechasLocal.map((f, fi) => {
      if (fi !== fechaIdx) return f;
      return {
        ...f,
        partidos: f.partidos.map((p, pi) => {
          if (pi !== partidoIdx) return p;
          return { ...p, [campo]: valor };
        })
      };
    });
    setFechasLocal(nuevasFechas);
  };
  const guardarResultados = () => {
    const nuevasFechas = fechasLocal.map((f, fi) => {
      if (fi !== fechaIdx) return f;
      return {
        ...f,
        partidos: f.partidos.map((p) => {
          if (p.goles_local === null || p.goles_visitante === null) return p;
          return { ...p, jugado: true };
        })
      };
    });
    setFechasLocal(nuevasFechas);
    onFechasActualizadas(nuevasFechas);
  };
  const reiniciarFecha = () => {
    const nuevasFechas = fechasLocal.map((f, fi) => {
      if (fi !== fechaIdx) return f;
      return {
        ...f,
        partidos: f.partidos.map((p) => ({ ...p, goles_local: null, goles_visitante: null, jugado: false }))
      };
    });
    setFechasLocal(nuevasFechas);
    onFechasActualizadas(nuevasFechas);
  };
  const hayCambiosSinGuardar = fechaActual.partidos.some(
    (p) => (p.goles_local !== null || p.goles_visitante !== null) && !p.jugado
  );
  const hayResultados = fechaActual.partidos.some((p) => p.goles_local !== null || p.goles_visitante !== null);
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-resultados-copa text-center", children: [
    /* @__PURE__ */ jsxs("h3", { className: "titulo-grupo", children: [
      "GRUPO ",
      grupo.letra
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "contenedor-navegacion-fechas text-center", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-fecha-nav",
          disabled: fechaIdx === 0,
          onClick: () => setFechaIdx(fechaIdx - 1),
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "titulo-fecha-copa", children: [
        "Fecha ",
        fechaActual.numero
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-fecha-nav",
          disabled: fechaIdx >= fechasLocal.length - 1,
          onClick: () => setFechaIdx(fechaIdx + 1),
          children: "Siguiente"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lista-partidos", children: fechaActual.partidos.map((partido, idx) => {
      const local = equiposMap.get(partido.equipo_local_id);
      const visitante = equiposMap.get(partido.equipo_visitante_id);
      return /* @__PURE__ */ jsxs("div", { className: "partido-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "partido-equipo", children: [
          /* @__PURE__ */ jsx("img", { src: local?.url_foto, alt: local?.nombre, className: "partido-logo" }),
          /* @__PURE__ */ jsx("span", { className: "partido-nombre d-none d-md-inline", children: local?.nombre }),
          /* @__PURE__ */ jsx("span", { className: "partido-nombre d-inline d-md-none", children: local?.diminutivo })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "partido-inputs", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              placeholder: "-",
              value: partido.goles_local ?? "",
              onChange: (e) => actualizarPartido(idx, "goles_local", e.target.value === "" ? null : parseInt(e.target.value)),
              disabled: partido.jugado,
              className: "input-goles"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "separador-goles", children: "-" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              placeholder: "-",
              value: partido.goles_visitante ?? "",
              onChange: (e) => actualizarPartido(idx, "goles_visitante", e.target.value === "" ? null : parseInt(e.target.value)),
              disabled: partido.jugado,
              className: "input-goles"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "partido-equipo visitante", children: [
          /* @__PURE__ */ jsx("img", { src: visitante?.url_foto, alt: visitante?.nombre, className: "partido-logo" }),
          /* @__PURE__ */ jsx("span", { className: "partido-nombre d-none d-md-inline", children: visitante?.nombre }),
          /* @__PURE__ */ jsx("span", { className: "partido-nombre d-inline d-md-none", children: visitante?.diminutivo })
        ] })
      ] }, idx);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "contenedor-botones-fecha", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-copa btn-guardar",
          disabled: !hayCambiosSinGuardar,
          onClick: guardarResultados,
          children: "Guardar"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn-copa btn-reiniciar",
          disabled: !hayResultados,
          onClick: reiniciarFecha,
          children: "Reiniciar"
        }
      )
    ] })
  ] });
}

function TablaGrupo({ grupo, fechas }) {
  const tabla = calcularTablaGrupo(grupo, fechas);
  const equiposMap = new Map(grupo.equipos.map((e) => [e.id, e]));
  const clasificados = grupo.tipo === "cuatro" ? 2 : 1;
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-tabla-copa", children: [
    /* @__PURE__ */ jsxs("h3", { className: "titulo-tabla-copa", children: [
      "Tabla - Grupo ",
      grupo.letra
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "tabla-encabezado", children: [
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-pos", children: "#" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-equipo", children: "Equipo" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: "PJ" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: "PG" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: "PE" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: "PP" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num d-none d-lg-block", children: "GF" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num d-none d-lg-block", children: "GC" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: "DG" }),
      /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: "PTS" })
    ] }),
    tabla.map((fila, idx) => {
      const equipo = equiposMap.get(fila.equipo_id);
      const esClasificado = idx < clasificados;
      return /* @__PURE__ */ jsxs("div", { className: `tabla-fila ${esClasificado ? "fila-clasificado" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-pos", children: /* @__PURE__ */ jsx("div", { className: "pos-indicator", style: { backgroundColor: esClasificado ? "#32a869" : "transparent" }, children: idx + 1 }) }),
        /* @__PURE__ */ jsxs("div", { className: "tabla-col col-equipo", children: [
          /* @__PURE__ */ jsx("img", { src: equipo?.url_foto, alt: equipo?.nombre, className: "tabla-logo" }),
          /* @__PURE__ */ jsx("span", { className: "d-none d-lg-inline", children: equipo?.nombre }),
          /* @__PURE__ */ jsx("span", { className: "d-inline d-lg-none", children: equipo?.diminutivo })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: fila.partidosJugados }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: fila.victorias }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: fila.empates }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: fila.derrotas }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num d-none d-lg-block", children: fila.golesFavor }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num d-none d-lg-block", children: fila.golesContra }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num", children: fila.diferenciaGoles }),
        /* @__PURE__ */ jsx("div", { className: "tabla-col col-num pts", children: fila.puntos })
      ] }, fila.equipo_id);
    }),
    /* @__PURE__ */ jsx("div", { className: "tabla-leyenda", children: /* @__PURE__ */ jsxs("div", { className: "leyenda-item", children: [
      /* @__PURE__ */ jsx("div", { className: "leyenda-color", style: { backgroundColor: "#32a869" } }),
      /* @__PURE__ */ jsx("span", { children: "Clasificado" })
    ] }) })
  ] });
}

function TablaSembrado({ sembrado }) {
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-sembrado", children: [
    /* @__PURE__ */ jsx("h2", { className: "titulo-seccion", children: "TABLA DE CLASIFICADOS" }),
    /* @__PURE__ */ jsx("p", { className: "subtitulo-sembrado", children: "Ordenados por promedio de puntos y diferencia de goles promedio" }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row align-items-center justify-content-center", children: /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "tabla-sembrado-header", children: [
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-pos", children: "#" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-equipo", children: "Equipo" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: "Tipo" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: "PTS" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: "PJ" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: "Prom PTS" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: "DG" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: "Prom DG" })
      ] }),
      sembrado.map((item, pos) => /* @__PURE__ */ jsxs("div", { className: `tabla-sembrado-row ${pos === sembrado.length - 1 ? "fila-final" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-pos", children: /* @__PURE__ */ jsx("div", { className: "pos-indicator", style: { backgroundColor: item.posicion <= 8 ? "#f0b535" : "#e0944d" }, children: item.posicion }) }),
        /* @__PURE__ */ jsxs("div", { className: "ts-col ts-equipo", children: [
          /* @__PURE__ */ jsx("img", { src: item.equipo.url_foto, alt: item.equipo.nombre, className: "tabla-logo" }),
          /* @__PURE__ */ jsx("span", { className: "d-none d-lg-inline", children: item.equipo.nombre }),
          /* @__PURE__ */ jsx("span", { className: "d-inline d-lg-none", children: item.equipo.diminutivo })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: item.esPrimero ? "1°" : "2°" }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: item.puntos }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: item.partidosJugados }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: item.promedioPuntos.toFixed(3) }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: item.diferenciaGoles }),
        /* @__PURE__ */ jsx("div", { className: "ts-col ts-num", children: item.promedioDG.toFixed(3) })
      ] }, item.posicion)),
      /* @__PURE__ */ jsxs("div", { className: "tabla-leyenda", children: [
        /* @__PURE__ */ jsxs("div", { className: "leyenda-item", children: [
          /* @__PURE__ */ jsx("div", { className: "leyenda-color", style: { backgroundColor: "#f0b535" } }),
          /* @__PURE__ */ jsx("span", { children: "Seed 1-8 (Local en Octavos)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "leyenda-item", children: [
          /* @__PURE__ */ jsx("div", { className: "leyenda-color", style: { backgroundColor: "#e0944d" } }),
          /* @__PURE__ */ jsx("span", { children: "Seed 9-16 (Visita en Octavos)" })
        ] })
      ] })
    ] }) }) })
  ] });
}

function BracketOctavos({ partidos, onPartidosActualizados }) {
  const [editandoIdx, setEditandoIdx] = useState(null);
  const [tempLocal, setTempLocal] = useState("");
  const [tempVisitante, setTempVisitante] = useState("");
  const [tempPenalesLocal, setTempPenalesLocal] = useState("");
  const [tempPenalesVisitante, setTempPenalesVisitante] = useState("");
  const iniciarEdicion = (idx) => {
    const p = partidos[idx];
    setEditandoIdx(idx);
    setTempLocal(p.goles_local?.toString() ?? "");
    setTempVisitante(p.goles_visitante?.toString() ?? "");
    setTempPenalesLocal(p.penales_local?.toString() ?? "");
    setTempPenalesVisitante(p.penales_visitante?.toString() ?? "");
  };
  const guardarResultado = (idx) => {
    const gl = tempLocal === "" ? null : parseInt(tempLocal);
    const gv = tempVisitante === "" ? null : parseInt(tempVisitante);
    if (gl === null || gv === null) {
      setEditandoIdx(null);
      return;
    }
    let pl = null;
    let pv = null;
    let jugado = true;
    if (gl === gv) {
      pl = tempPenalesLocal === "" ? null : parseInt(tempPenalesLocal);
      pv = tempPenalesVisitante === "" ? null : parseInt(tempPenalesVisitante);
      if (pl === null || pv === null || pl === pv) {
        alert("En caso de empate, ingresa penales válidos (no pueden ser iguales).");
        return;
      }
    }
    const ganador = gl > gv ? partidos[idx].equipo_local : gv > gl ? partidos[idx].equipo_visitante : pl > pv ? partidos[idx].equipo_local : partidos[idx].equipo_visitante;
    const nuevos = [...partidos];
    nuevos[idx] = {
      ...nuevos[idx],
      goles_local: gl,
      goles_visitante: gv,
      penales_local: pl,
      penales_visitante: pv,
      ganador,
      jugado
    };
    onPartidosActualizados(nuevos);
    setEditandoIdx(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-bracket", children: [
    /* @__PURE__ */ jsx("h2", { className: "titulo-seccion", children: "OCTAVOS DE FINAL" }),
    /* @__PURE__ */ jsx("p", { className: "subtitulo-bracket", children: "Partido único - Localía del mejor posicionado" }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-start", children: partidos.map((partido, idx) => /* @__PURE__ */ jsxs("div", { className: "col-10 col-lg-3 llave-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "llave-header", children: [
        "Llave ",
        idx + 1
      ] }),
      editandoIdx === idx ? /* @__PURE__ */ jsxs("div", { className: "llave-editando", children: [
        /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre }),
          /* @__PURE__ */ jsxs("span", { className: "llave-seed", children: [
            "(",
            partido.equipo_local ? `Pos. ${partidos.findIndex((p) => p.equipo_local?.id === partido.equipo_local?.id) + 1}` : "",
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              value: tempLocal,
              onChange: (e) => setTempLocal(e.target.value),
              className: "input-goles-sm",
              placeholder: "-"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre }),
          /* @__PURE__ */ jsxs("span", { className: "llave-seed", children: [
            "(",
            partido.equipo_visitante ? `Pos. ${16 - partidos.findIndex((p) => p.equipo_visitante?.id === partido.equipo_visitante?.id)}` : "",
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              value: tempVisitante,
              onChange: (e) => setTempVisitante(e.target.value),
              className: "input-goles-sm",
              placeholder: "-"
            }
          )
        ] }),
        tempLocal === tempVisitante && tempLocal !== "" && /* @__PURE__ */ jsxs("div", { className: "penales-section", children: [
          /* @__PURE__ */ jsx("span", { className: "penales-label", children: "Penales:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              value: tempPenalesLocal,
              onChange: (e) => setTempPenalesLocal(e.target.value),
              className: "input-goles-sm",
              placeholder: "-"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: " - " }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              value: tempPenalesVisitante,
              onChange: (e) => setTempPenalesVisitante(e.target.value),
              className: "input-goles-sm",
              placeholder: "-"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "llave-botones", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-guardar", onClick: () => guardarResultado(idx), children: "Guardar" }),
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-cancelar", onClick: () => setEditandoIdx(null), children: "Cancelar" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "llave-resultado", onClick: () => iniciarEdicion(idx), children: [
        /* @__PURE__ */ jsxs("div", { className: `llave-equipo-display ${partido.ganador?.id === partido.equipo_local?.id ? "ganador" : ""}`, children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre ?? "Por definir" }),
          /* @__PURE__ */ jsx("span", { className: "llave-goles", children: partido.goles_local !== null ? partido.goles_local : "-" }),
          partido.penales_local !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
            "(",
            partido.penales_local,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `llave-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? "ganador" : ""}`, children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
          /* @__PURE__ */ jsx("span", { className: "llave-goles", children: partido.goles_visitante !== null ? partido.goles_visitante : "-" }),
          partido.penales_visitante !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
            "(",
            partido.penales_visitante,
            ")"
          ] })
        ] }),
        partido.jugado && partido.ganador && /* @__PURE__ */ jsxs("div", { className: "llave-ganador-badge", children: [
          "✓ ",
          partido.ganador.nombre
        ] })
      ] })
    ] }, partido.id)) }) })
  ] });
}

function BracketCuartos({ partidos, onPartidosActualizados }) {
  const [editandoIdx, setEditandoIdx] = useState(null);
  const [tempLocal, setTempLocal] = useState("");
  const [tempVisitante, setTempVisitante] = useState("");
  const [tempPenalesLocal, setTempPenalesLocal] = useState("");
  const [tempPenalesVisitante, setTempPenalesVisitante] = useState("");
  const iniciarEdicion = (idx) => {
    const p = partidos[idx];
    setEditandoIdx(idx);
    setTempLocal(p.goles_local?.toString() ?? "");
    setTempVisitante(p.goles_visitante?.toString() ?? "");
    setTempPenalesLocal(p.penales_local?.toString() ?? "");
    setTempPenalesVisitante(p.penales_visitante?.toString() ?? "");
  };
  const guardarResultado = (idx) => {
    const gl = tempLocal === "" ? null : parseInt(tempLocal);
    const gv = tempVisitante === "" ? null : parseInt(tempVisitante);
    if (gl === null || gv === null) {
      setEditandoIdx(null);
      return;
    }
    let pl = null;
    let pv = null;
    if (gl === gv) {
      pl = tempPenalesLocal === "" ? null : parseInt(tempPenalesLocal);
      pv = tempPenalesVisitante === "" ? null : parseInt(tempPenalesVisitante);
      if (pl === null || pv === null || pl === pv) {
        alert("Ingresa penales válidos (no pueden ser iguales).");
        return;
      }
    }
    const ganador = gl > gv ? partidos[idx].equipo_local : gv > gl ? partidos[idx].equipo_visitante : pl > pv ? partidos[idx].equipo_local : partidos[idx].equipo_visitante;
    const nuevos = [...partidos];
    nuevos[idx] = { ...nuevos[idx], goles_local: gl, goles_visitante: gv, penales_local: pl, penales_visitante: pv, ganador, jugado: true };
    onPartidosActualizados(nuevos);
    setEditandoIdx(null);
  };
  const nombres = ["Cuarto A", "Cuarto B", "Cuarto C", "Cuarto D"];
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-bracket", children: [
    /* @__PURE__ */ jsx("h2", { className: "titulo-seccion", children: "CUARTOS DE FINAL" }),
    /* @__PURE__ */ jsx("p", { className: "subtitulo-bracket", children: "Partido único" }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-start", children: partidos.map((partido, idx) => /* @__PURE__ */ jsxs("div", { className: "col-10 col-lg-3 llave-card", children: [
      /* @__PURE__ */ jsx("div", { className: "llave-header", children: nombres[idx] }),
      editandoIdx === idx ? /* @__PURE__ */ jsxs("div", { className: "llave-editando", children: [
        /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre ?? "Por definir" }),
          /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempLocal, onChange: (e) => setTempLocal(e.target.value), className: "input-goles-sm", placeholder: "-" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
          /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempVisitante, onChange: (e) => setTempVisitante(e.target.value), className: "input-goles-sm", placeholder: "-" })
        ] }),
        tempLocal === tempVisitante && tempLocal !== "" && /* @__PURE__ */ jsxs("div", { className: "penales-section", children: [
          /* @__PURE__ */ jsx("span", { className: "penales-label", children: "Penales:" }),
          /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempPenalesLocal, onChange: (e) => setTempPenalesLocal(e.target.value), className: "input-goles-sm", placeholder: "-" }),
          /* @__PURE__ */ jsx("span", { children: " - " }),
          /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempPenalesVisitante, onChange: (e) => setTempPenalesVisitante(e.target.value), className: "input-goles-sm", placeholder: "-" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "llave-botones", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-guardar", onClick: () => guardarResultado(idx), children: "Guardar" }),
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-cancelar", onClick: () => setEditandoIdx(null), children: "Cancelar" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "llave-resultado", onClick: () => iniciarEdicion(idx), children: [
        /* @__PURE__ */ jsxs("div", { className: `llave-equipo-display ${partido.ganador?.id === partido.equipo_local?.id ? "ganador" : ""}`, children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre ?? "Por definir" }),
          /* @__PURE__ */ jsx("span", { className: "llave-goles", children: partido.goles_local !== null ? partido.goles_local : "-" }),
          partido.penales_local !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
            "(",
            partido.penales_local,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `llave-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? "ganador" : ""}`, children: [
          /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
          /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
          /* @__PURE__ */ jsx("span", { className: "llave-goles", children: partido.goles_visitante !== null ? partido.goles_visitante : "-" }),
          partido.penales_visitante !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
            "(",
            partido.penales_visitante,
            ")"
          ] })
        ] }),
        partido.jugado && partido.ganador && /* @__PURE__ */ jsxs("div", { className: "llave-ganador-badge", children: [
          "✓ ",
          partido.ganador.nombre
        ] })
      ] })
    ] }, partido.id)) }) })
  ] });
}

function BracketSemifinales({ partidos, onPartidosActualizados }) {
  const [editandoIdx, setEditandoIdx] = useState(null);
  const [tempIdaLocal, setTempIdaLocal] = useState("");
  const [tempIdaVisitante, setTempIdaVisitante] = useState("");
  const [tempVueltaLocal, setTempVueltaLocal] = useState("");
  const [tempVueltaVisitante, setTempVueltaVisitante] = useState("");
  const [tempPenalesLocal, setTempPenalesLocal] = useState("");
  const [tempPenalesVisitante, setTempPenalesVisitante] = useState("");
  const iniciarEdicion = (idx) => {
    const p = partidos[idx];
    setEditandoIdx(idx);
    setTempIdaLocal(p.goles_local?.toString() ?? "");
    setTempIdaVisitante(p.goles_visitante?.toString() ?? "");
    setTempVueltaLocal(p.goles_local_vuelta?.toString() ?? "");
    setTempVueltaVisitante(p.goles_visitante_vuelta?.toString() ?? "");
    setTempPenalesLocal(p.penales_local?.toString() ?? "");
    setTempPenalesVisitante(p.penales_visitante?.toString() ?? "");
  };
  const guardarResultado = (idx) => {
    const il = tempIdaLocal === "" ? null : parseInt(tempIdaLocal);
    const iv = tempIdaVisitante === "" ? null : parseInt(tempIdaVisitante);
    const vl = tempVueltaLocal === "" ? null : parseInt(tempVueltaLocal);
    const vv = tempVueltaVisitante === "" ? null : parseInt(tempVueltaVisitante);
    if (il === null || iv === null || vl === null || vv === null) {
      setEditandoIdx(null);
      return;
    }
    const globalLocal = il + vl;
    const globalVisitante = iv + vv;
    let pl = null;
    let pv = null;
    if (globalLocal === globalVisitante) {
      pl = tempPenalesLocal === "" ? null : parseInt(tempPenalesLocal);
      pv = tempPenalesVisitante === "" ? null : parseInt(tempPenalesVisitante);
      if (pl === null || pv === null || pl === pv) {
        alert("En caso de empate en el global, ingresa penales válidos.");
        return;
      }
    }
    const ganador = globalLocal > globalVisitante ? partidos[idx].equipo_local : globalVisitante > globalLocal ? partidos[idx].equipo_visitante : pl > pv ? partidos[idx].equipo_local : partidos[idx].equipo_visitante;
    const nuevos = [...partidos];
    nuevos[idx] = {
      ...nuevos[idx],
      goles_local: il,
      goles_visitante: iv,
      penales_local: pl,
      penales_visitante: pv,
      ganador,
      jugado: true
    };
    nuevos[idx].goles_local_vuelta = vl;
    nuevos[idx].goles_visitante_vuelta = vv;
    onPartidosActualizados(nuevos);
    setEditandoIdx(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-bracket", children: [
    /* @__PURE__ */ jsx("h2", { className: "titulo-seccion", children: "SEMIFINALES" }),
    /* @__PURE__ */ jsx("p", { className: "subtitulo-bracket", children: "Ida y vuelta - Ganador por marcador global" }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-start", children: partidos.map((partido, idx) => {
      const vl = partido.goles_local_vuelta;
      const vv = partido.goles_visitante_vuelta;
      const gl = partido.goles_local !== null && vl !== void 0 ? partido.goles_local + vl : null;
      const gv = partido.goles_visitante !== null && vv !== void 0 ? partido.goles_visitante + vv : null;
      return /* @__PURE__ */ jsxs("div", { className: "col-10 col-lg-5 llave-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "llave-header", children: [
          "Semifinal ",
          idx + 1
        ] }),
        editandoIdx === idx ? /* @__PURE__ */ jsxs("div", { className: "llave-editando", children: [
          /* @__PURE__ */ jsx("div", { className: "partido-label", children: "Ida:" }),
          /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
            /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
            /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre ?? "Por definir" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempIdaLocal, onChange: (e) => setTempIdaLocal(e.target.value), className: "input-goles-sm", placeholder: "-" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
            /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
            /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempIdaVisitante, onChange: (e) => setTempIdaVisitante(e.target.value), className: "input-goles-sm", placeholder: "-" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "partido-label mt-2", children: "Vuelta:" }),
          /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
            /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
            /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre ?? "Por definir" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempVueltaLocal, onChange: (e) => setTempVueltaLocal(e.target.value), className: "input-goles-sm", placeholder: "-" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row", children: [
            /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
            /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempVueltaVisitante, onChange: (e) => setTempVueltaVisitante(e.target.value), className: "input-goles-sm", placeholder: "-" })
          ] }),
          tempIdaLocal !== "" && tempVueltaLocal !== "" && tempIdaVisitante !== "" && tempVueltaVisitante !== "" && parseInt(tempIdaLocal) + parseInt(tempVueltaLocal) === parseInt(tempIdaVisitante) + parseInt(tempVueltaVisitante) && /* @__PURE__ */ jsxs("div", { className: "penales-section", children: [
            /* @__PURE__ */ jsx("span", { className: "penales-label", children: "Penales:" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempPenalesLocal, onChange: (e) => setTempPenalesLocal(e.target.value), className: "input-goles-sm", placeholder: "-" }),
            /* @__PURE__ */ jsx("span", { children: " - " }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempPenalesVisitante, onChange: (e) => setTempPenalesVisitante(e.target.value), className: "input-goles-sm", placeholder: "-" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "llave-botones", children: [
            /* @__PURE__ */ jsx("button", { className: "btn-copa btn-guardar", onClick: () => guardarResultado(idx), children: "Guardar" }),
            /* @__PURE__ */ jsx("button", { className: "btn-copa btn-cancelar", onClick: () => setEditandoIdx(null), children: "Cancelar" })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "llave-resultado", onClick: () => iniciarEdicion(idx), children: [
          /* @__PURE__ */ jsxs("div", { className: `llave-equipo-display ${partido.ganador?.id === partido.equipo_local?.id ? "ganador" : ""}`, children: [
            /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo" }),
            /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_local?.nombre ?? "Por definir" }),
            /* @__PURE__ */ jsxs("span", { className: "llave-goles", children: [
              "IDA: ",
              partido.goles_local !== null ? partido.goles_local : "-"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "llave-goles", children: [
              "VUELTA: ",
              vl !== void 0 ? vl : "-"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "llave-goles global", children: [
              "GLOBAL: ",
              gl !== null ? gl : "-"
            ] }),
            partido.penales_local !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
              "(",
              partido.penales_local,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `llave-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? "ganador" : ""}`, children: [
            /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo" }),
            /* @__PURE__ */ jsx("span", { className: "llave-nombre", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
            /* @__PURE__ */ jsxs("span", { className: "llave-goles", children: [
              "IDA: ",
              partido.goles_visitante !== null ? partido.goles_visitante : "-"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "llave-goles", children: [
              "VUELTA: ",
              vv !== void 0 ? vv : "-"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "llave-goles global", children: [
              "GLOBAL: ",
              gv !== null ? gv : "-"
            ] }),
            partido.penales_visitante !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
              "(",
              partido.penales_visitante,
              ")"
            ] })
          ] }),
          partido.jugado && partido.ganador && /* @__PURE__ */ jsxs("div", { className: "llave-ganador-badge", children: [
            "✓ ",
            partido.ganador.nombre
          ] })
        ] })
      ] }, partido.id);
    }) }) })
  ] });
}

function BracketFinal({ partido, onPartidoActualizado }) {
  const [editando, setEditando] = useState(false);
  const [tempLocal, setTempLocal] = useState("");
  const [tempVisitante, setTempVisitante] = useState("");
  const [tempPenalesLocal, setTempPenalesLocal] = useState("");
  const [tempPenalesVisitante, setTempPenalesVisitante] = useState("");
  const iniciarEdicion = () => {
    setEditando(true);
    setTempLocal(partido.goles_local?.toString() ?? "");
    setTempVisitante(partido.goles_visitante?.toString() ?? "");
    setTempPenalesLocal(partido.penales_local?.toString() ?? "");
    setTempPenalesVisitante(partido.penales_visitante?.toString() ?? "");
  };
  const guardarResultado = () => {
    const gl = tempLocal === "" ? null : parseInt(tempLocal);
    const gv = tempVisitante === "" ? null : parseInt(tempVisitante);
    if (gl === null || gv === null) {
      setEditando(false);
      return;
    }
    let pl = null;
    let pv = null;
    if (gl === gv) {
      pl = tempPenalesLocal === "" ? null : parseInt(tempPenalesLocal);
      pv = tempPenalesVisitante === "" ? null : parseInt(tempPenalesVisitante);
      if (pl === null || pv === null || pl === pv) {
        alert("Ingresa penales válidos (no pueden ser iguales).");
        return;
      }
    }
    const ganador = gl > gv ? partido.equipo_local : gv > gl ? partido.equipo_visitante : pl > pv ? partido.equipo_local : partido.equipo_visitante;
    onPartidoActualizado({
      ...partido,
      goles_local: gl,
      goles_visitante: gv,
      penales_local: pl,
      penales_visitante: pv,
      ganador,
      jugado: true
    });
    setEditando(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "contenedor-final", children: [
    /* @__PURE__ */ jsx("h2", { className: "titulo-seccion", children: "GRAN FINAL" }),
    /* @__PURE__ */ jsx("p", { className: "subtitulo-final", children: "15 de noviembre 2026 - Sede neutral" }),
    /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-6 final-card", children: editando ? /* @__PURE__ */ jsxs("div", { className: "llave-editando", children: [
      /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row final-equipo", children: [
        /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo-lg" }),
        /* @__PURE__ */ jsx("span", { className: "llave-nombre-lg", children: partido.equipo_local?.nombre ?? "Por definir" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempLocal, onChange: (e) => setTempLocal(e.target.value), className: "input-goles-lg", placeholder: "-" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "vs-text", children: "VS" }),
      /* @__PURE__ */ jsxs("div", { className: "llave-equipo-row final-equipo", children: [
        /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo-lg" }),
        /* @__PURE__ */ jsx("span", { className: "llave-nombre-lg", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempVisitante, onChange: (e) => setTempVisitante(e.target.value), className: "input-goles-lg", placeholder: "-" })
      ] }),
      tempLocal === tempVisitante && tempLocal !== "" && /* @__PURE__ */ jsxs("div", { className: "penales-section", children: [
        /* @__PURE__ */ jsx("span", { className: "penales-label", children: "Penales:" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempPenalesLocal, onChange: (e) => setTempPenalesLocal(e.target.value), className: "input-goles-sm", placeholder: "-" }),
        /* @__PURE__ */ jsx("span", { children: " - " }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: tempPenalesVisitante, onChange: (e) => setTempPenalesVisitante(e.target.value), className: "input-goles-sm", placeholder: "-" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "llave-botones", children: [
        /* @__PURE__ */ jsx("button", { className: "btn-copa btn-guardar", onClick: guardarResultado, children: "Guardar Resultado" }),
        /* @__PURE__ */ jsx("button", { className: "btn-copa btn-cancelar", onClick: () => setEditando(false), children: "Cancelar" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "final-display", onClick: iniciarEdicion, children: [
      /* @__PURE__ */ jsxs("div", { className: `final-equipo-display ${partido.ganador?.id === partido.equipo_local?.id ? "campeon" : ""}`, children: [
        /* @__PURE__ */ jsx("img", { src: partido.equipo_local?.url_foto, alt: "", className: "llave-logo-lg" }),
        /* @__PURE__ */ jsx("span", { className: "llave-nombre-lg", children: partido.equipo_local?.nombre ?? "Por definir" }),
        /* @__PURE__ */ jsx("span", { className: "llave-goles-lg", children: partido.goles_local !== null ? partido.goles_local : "-" }),
        partido.penales_local !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
          "(",
          partido.penales_local,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "vs-text", children: "VS" }),
      /* @__PURE__ */ jsxs("div", { className: `final-equipo-display ${partido.ganador?.id === partido.equipo_visitante?.id ? "campeon" : ""}`, children: [
        /* @__PURE__ */ jsx("img", { src: partido.equipo_visitante?.url_foto, alt: "", className: "llave-logo-lg" }),
        /* @__PURE__ */ jsx("span", { className: "llave-nombre-lg", children: partido.equipo_visitante?.nombre ?? "Por definir" }),
        /* @__PURE__ */ jsx("span", { className: "llave-goles-lg", children: partido.goles_visitante !== null ? partido.goles_visitante : "-" }),
        partido.penales_visitante !== null && /* @__PURE__ */ jsxs("span", { className: "llave-penales", children: [
          "(",
          partido.penales_visitante,
          ")"
        ] })
      ] }),
      partido.jugado && partido.ganador && /* @__PURE__ */ jsxs("div", { className: "final-ganador-badge", children: [
        "🏆 ",
        partido.ganador.nombre
      ] })
    ] }) }) }) })
  ] });
}

function ChampionDisplay({ equipo }) {
  return /* @__PURE__ */ jsx("div", { className: "contenedor-campeon", children: /* @__PURE__ */ jsxs("div", { className: "campeon-card", children: [
    /* @__PURE__ */ jsx("div", { className: "campeon-trofeo", children: "🏆" }),
    /* @__PURE__ */ jsx("h2", { className: "campeon-label", children: "¡CAMPEÓN DE LA COPA DE LA LIGA 2026!" }),
    /* @__PURE__ */ jsx("img", { src: equipo.url_foto, alt: equipo.nombre, className: "campeon-logo" }),
    /* @__PURE__ */ jsx("h1", { className: "campeon-nombre", children: equipo.nombre }),
    /* @__PURE__ */ jsxs("p", { className: "campeon-info", children: [
      equipo.ciudad,
      " - ",
      equipo.division
    ] }),
    /* @__PURE__ */ jsx("div", { className: "campeon-premios", children: /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "+2 puntos" }),
      " en la tabla acumulada 2027 de su liga"
    ] }) })
  ] }) });
}

function CopaLigaModal() {
  const [visible, setVisible] = useState(false);
  const [noMostrar, setNoMostrar] = useState(false);
  useEffect(() => {
    const guardado = localStorage.getItem("copa-liga-modal-no-mostrar");
    if (!guardado) {
      setVisible(true);
    }
  }, []);
  const handleCerrar = () => {
    if (noMostrar) {
      localStorage.setItem("copa-liga-modal-no-mostrar", "true");
    }
    setVisible(false);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxs("div", { className: "modal-copa", children: [
    /* @__PURE__ */ jsx("div", { className: "modal-copa-img", children: /* @__PURE__ */ jsx("img", { src: "/img/copa-liga/trofeo-copa-liga.webp", alt: "Copa de la Liga" }) }),
    /* @__PURE__ */ jsxs("div", { className: "modal-copa-body", children: [
      /* @__PURE__ */ jsx("h2", { className: "modal-copa-titulo", children: "Copa de la Liga 2026" }),
      /* @__PURE__ */ jsx("p", { className: "modal-copa-texto", children: "¡Llega la Copa de la Liga 2026! Un nuevo torneo donde 34 equipos de Liga 1 y Liga 2 se enfrentarán en 10 grupos, seguidos de llaves de eliminación directa (octavos, cuartos, semis y final) en busca de la gloria. ¡Entra ya a nuestro simulador, pronostica cada una de las fases y arma todo el camino hasta la gran final para ver quién será el campeón!" }),
      /* @__PURE__ */ jsxs("label", { className: "modal-copa-check", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: noMostrar,
            onChange: (e) => setNoMostrar(e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "No mostrar este mensaje nuevamente" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "modal-copa-btn", onClick: handleCerrar, children: "Entendido" })
    ] })
  ] }) });
}

function AppCopaLiga() {
  const [faseActiva, setFaseActiva] = useState("grupos");
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [fechasPorGrupo, setFechasPorGrupo] = useState({});
  const [sincronizando, setSincronizando] = useState(false);
  const [partidosOctavos, setPartidosOctavos] = useState([]);
  const [partidosCuartos, setPartidosCuartos] = useState([]);
  const [partidosSemifinales, setPartidosSemifinales] = useState([]);
  const [partidoFinal, setPartidoFinal] = useState(null);
  const [ganador, setGanador] = useState(null);
  const [sembrado, setSembrado] = useState([]);
  const equiposMap = new Map(equiposData.map((e) => [e.id, e]));
  useEffect(() => {
    const inicial = {};
    gruposCopa.forEach((grupo) => {
      inicial[grupo.letra] = generarFechasGrupo(grupo);
    });
    setFechasPorGrupo(inicial);
  }, []);
  useEffect(() => {
    gruposCopa.forEach((grupo) => {
      const guardado = localStorage.getItem(`copa-liga-grupo-${grupo.letra}`);
      if (guardado) {
        setFechasPorGrupo((prev) => ({ ...prev, [grupo.letra]: JSON.parse(guardado) }));
      }
    });
    const oct = localStorage.getItem("copa-liga-octavos");
    if (oct) setPartidosOctavos(JSON.parse(oct));
    const cuar = localStorage.getItem("copa-liga-cuartos");
    if (cuar) setPartidosCuartos(JSON.parse(cuar));
    const semi = localStorage.getItem("copa-liga-semifinales");
    if (semi) setPartidosSemifinales(JSON.parse(semi));
    const fin = localStorage.getItem("copa-liga-final");
    if (fin) setPartidoFinal(JSON.parse(fin));
    const gan = localStorage.getItem("copa-liga-ganador");
    if (gan) setGanador(JSON.parse(gan));
  }, []);
  const verificarFaseGruposCompleta = useCallback(() => {
    for (const grupo of gruposCopa) {
      const fechas = fechasPorGrupo[grupo.letra];
      if (!fechas) return false;
      for (const fecha of fechas) {
        for (const p of fecha.partidos) {
          if (!p.jugado) return false;
        }
      }
    }
    return true;
  }, [fechasPorGrupo]);
  const generarEliminatorias = useCallback(() => {
    const clasificacion = obtenerClasificacion(gruposCopa, fechasPorGrupo);
    const sembradoResult = generarSembrado(clasificacion, equiposMap);
    setSembrado(sembradoResult);
    const octavosGuardados = localStorage.getItem("copa-liga-octavos");
    let octavos;
    if (octavosGuardados) {
      const existentes = JSON.parse(octavosGuardados);
      const nuevos = generarCrucesOctavos(sembradoResult);
      octavos = nuevos.map((n) => {
        const existente = existentes.find((e) => e.id === n.id);
        if (existente && existente.jugado) return existente;
        return n;
      });
    } else {
      octavos = generarCrucesOctavos(sembradoResult);
    }
    setPartidosOctavos(octavos);
    localStorage.setItem("copa-liga-octavos", JSON.stringify(octavos));
    const cuartosGuardados = localStorage.getItem("copa-liga-cuartos");
    let cuartos;
    if (cuartosGuardados) {
      const existentes = JSON.parse(cuartosGuardados);
      const nuevos = generarCuartos(octavos);
      cuartos = nuevos.map((n) => {
        const existente = existentes.find((e) => e.id === n.id);
        if (existente && existente.jugado) return existente;
        return n;
      });
    } else {
      cuartos = generarCuartos(octavos);
    }
    setPartidosCuartos(cuartos);
    localStorage.setItem("copa-liga-cuartos", JSON.stringify(cuartos));
    const semisGuardadas = localStorage.getItem("copa-liga-semifinales");
    let semis;
    if (semisGuardadas) {
      const existentes = JSON.parse(semisGuardadas);
      const nuevos = generarSemifinales(cuartos);
      semis = nuevos.map((n) => {
        const existente = existentes.find((e) => e.id === n.id);
        if (existente && existente.jugado) return existente;
        return n;
      });
    } else {
      semis = generarSemifinales(cuartos);
    }
    setPartidosSemifinales(semis);
    localStorage.setItem("copa-liga-semifinales", JSON.stringify(semis));
    const finalGuardado = localStorage.getItem("copa-liga-final");
    let final;
    if (finalGuardado) {
      const existente = JSON.parse(finalGuardado);
      const nuevo = generarFinal(semis);
      final = existente.jugado ? existente : nuevo;
    } else {
      final = generarFinal(semis);
    }
    setPartidoFinal(final);
    localStorage.setItem("copa-liga-final", JSON.stringify(final));
    localStorage.removeItem("copa-liga-ganador");
    setGanador(null);
  }, [fechasPorGrupo, equiposMap]);
  const handleGrupoSeleccionado = (grupo) => {
    setGrupoSeleccionado(grupo);
  };
  const handleFechasActualizadas = (grupoLetra, fechas) => {
    setFechasPorGrupo((prev) => ({ ...prev, [grupoLetra]: fechas }));
    localStorage.setItem(`copa-liga-grupo-${grupoLetra}`, JSON.stringify(fechas));
    invalidarHaciaAdelante("grupos");
    setPartidosOctavos([]);
    setPartidosCuartos([]);
    setPartidosSemifinales([]);
    setPartidoFinal(null);
    setGanador(null);
    setSembrado([]);
  };
  const handleSincronizar = async () => {
    const confirmar = window.confirm("¿Deseas actualizar a los resultados reales? Esto sobrescribirá TODAS tus simulaciones.");
    if (!confirmar) return;
    setSincronizando(true);
    try {
      const nuevasFechas = {};
      for (const grupo of gruposCopa) {
        const grupoKey = grupo.letra.toLowerCase();
        const fechas = [];
        const totalFechas = grupo.tipo === "cuatro" ? 3 : 3;
        for (let i = 1; i <= totalFechas; i++) {
          const resp = await fetch(`/data/copa-liga/fechas/grupo-${grupoKey}/fecha${i}.json`);
          if (!resp.ok) throw new Error(`Error grupo ${grupo.letra} fecha ${i}`);
          const data = await resp.json();
          fechas.push({ numero: i, partidos: data });
        }
        nuevasFechas[grupo.letra] = fechas;
        localStorage.setItem(`copa-liga-grupo-${grupo.letra}`, JSON.stringify(fechas));
      }
      setFechasPorGrupo(nuevasFechas);
      invalidarHaciaAdelante("grupos");
      setPartidosOctavos([]);
      setPartidosCuartos([]);
      setPartidosSemifinales([]);
      setPartidoFinal(null);
      setGanador(null);
      setSembrado([]);
      alert("Resultados sincronizados correctamente.");
    } catch (e) {
      console.error(e);
      alert("No se pudo sincronizar con los datos oficiales.");
    } finally {
      setSincronizando(false);
    }
  };
  const handleAvanzarFase = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (faseActiva === "grupos" && verificarFaseGruposCompleta()) {
      generarEliminatorias();
      setFaseActiva("sembrado");
    } else if (faseActiva === "sembrado") {
      setFaseActiva("octavos");
    } else if (faseActiva === "octavos") {
      const todosJugados = partidosOctavos.every((p) => p.jugado);
      if (todosJugados) {
        const nuevosCuartos = generarCuartos(partidosOctavos);
        const cuartosGuardados = localStorage.getItem("copa-liga-cuartos");
        let cuartos;
        if (cuartosGuardados) {
          const existentes = JSON.parse(cuartosGuardados);
          cuartos = nuevosCuartos.map((n) => {
            const existente = existentes.find((e) => e.id === n.id);
            if (existente && existente.jugado) return existente;
            return n;
          });
        } else {
          cuartos = nuevosCuartos;
        }
        setPartidosCuartos(cuartos);
        localStorage.setItem("copa-liga-cuartos", JSON.stringify(cuartos));
        setFaseActiva("cuartos");
      }
    } else if (faseActiva === "cuartos") {
      const todosJugados = partidosCuartos.every((p) => p.jugado);
      if (todosJugados) {
        const nuevasSemis = generarSemifinales(partidosCuartos);
        const semisGuardadas = localStorage.getItem("copa-liga-semifinales");
        let semis;
        if (semisGuardadas) {
          const existentes = JSON.parse(semisGuardadas);
          semis = nuevasSemis.map((n) => {
            const existente = existentes.find((e) => e.id === n.id);
            if (existente && existente.jugado) return existente;
            return n;
          });
        } else {
          semis = nuevasSemis;
        }
        setPartidosSemifinales(semis);
        localStorage.setItem("copa-liga-semifinales", JSON.stringify(semis));
        setFaseActiva("semifinales");
      }
    } else if (faseActiva === "semifinales") {
      const todosJugados = partidosSemifinales.every((p) => p.jugado);
      if (todosJugados) {
        const nuevaFinal = generarFinal(partidosSemifinales);
        const finalGuardado = localStorage.getItem("copa-liga-final");
        let final;
        if (finalGuardado) {
          const existente = JSON.parse(finalGuardado);
          final = existente.jugado ? existente : nuevaFinal;
        } else {
          final = nuevaFinal;
        }
        setPartidoFinal(final);
        localStorage.setItem("copa-liga-final", JSON.stringify(final));
        setFaseActiva("final");
      }
    }
  };
  const todosGruposCompletos = verificarFaseGruposCompleta();
  const octavosCompletos = partidosOctavos.length > 0 && partidosOctavos.every((p) => p.jugado);
  const cuartosCompletos = partidosCuartos.length > 0 && partidosCuartos.every((p) => p.jugado);
  const semisCompletos = partidosSemifinales.length > 0 && partidosSemifinales.every((p) => p.jugado);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CopaLigaModal, {}),
    /* @__PURE__ */ jsxs("div", { className: "container-fluid copa-liga-app", children: [
      /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12 contenedor-titulo-copa", children: /* @__PURE__ */ jsx("div", { className: "row gx-0 justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("h1", { className: "text-center titulo-copa", children: "COPA DE LA LIGA 2026" }) }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "row mt-3 justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-10 text-center mb-3", children: /* @__PURE__ */ jsxs("div", { className: "fase-indicator", children: [
        /* @__PURE__ */ jsx("span", { className: faseActiva === "grupos" ? "fase-activa" : "fase-completada", children: "Fase de Grupos" }),
        /* @__PURE__ */ jsx("span", { className: "fase-separador", children: "→" }),
        /* @__PURE__ */ jsx("span", { className: faseActiva === "sembrado" ? "fase-activa" : todosGruposCompletos ? "fase-completada" : "fase-bloqueada", children: "Clasificados" }),
        /* @__PURE__ */ jsx("span", { className: "fase-separador", children: "→" }),
        /* @__PURE__ */ jsx("span", { className: faseActiva === "octavos" ? "fase-activa" : partidosOctavos.length > 0 && partidosOctavos.every((p) => p.jugado) ? "fase-completada" : partidosOctavos.length > 0 ? "fase-pendiente" : "fase-bloqueada", children: "Octavos" }),
        /* @__PURE__ */ jsx("span", { className: "fase-separador", children: "→" }),
        /* @__PURE__ */ jsx("span", { className: faseActiva === "cuartos" ? "fase-activa" : partidosCuartos.length > 0 && partidosCuartos.every((p) => p.jugado) ? "fase-completada" : partidosCuartos.length > 0 ? "fase-pendiente" : "fase-bloqueada", children: "Cuartos" }),
        /* @__PURE__ */ jsx("span", { className: "fase-separador", children: "→" }),
        /* @__PURE__ */ jsx("span", { className: faseActiva === "semifinales" ? "fase-activa" : partidosSemifinales.length > 0 && partidosSemifinales.every((p) => p.jugado) ? "fase-completada" : partidosSemifinales.length > 0 ? "fase-pendiente" : "fase-bloqueada", children: "Semifinales" }),
        /* @__PURE__ */ jsx("span", { className: "fase-separador", children: "→" }),
        /* @__PURE__ */ jsx("span", { className: faseActiva === "final" ? "fase-activa" : partidoFinal && partidoFinal.jugado ? "fase-completada" : partidoFinal ? "fase-pendiente" : "fase-bloqueada", children: "Final" })
      ] }) }) }),
      faseActiva === "grupos" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "row justify-content-center align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col-11", children: /* @__PURE__ */ jsx(GruposGrid, { grupos: gruposCopa, grupoSeleccionado, onSeleccionar: handleGrupoSeleccionado, fechasPorGrupo }) }) }),
        grupoSeleccionado && /* @__PURE__ */ jsxs("div", { className: "row mt-4 justify-content-center align-items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-5", children: /* @__PURE__ */ jsx(
            ResultadosGrupo,
            {
              grupo: grupoSeleccionado,
              fechas: fechasPorGrupo[grupoSeleccionado.letra] || [],
              onFechasActualizadas: (fechas) => handleFechasActualizadas(grupoSeleccionado.letra, fechas)
            },
            `resultados-${grupoSeleccionado.letra}`
          ) }),
          /* @__PURE__ */ jsx("div", { className: "col-10 col-lg-5", children: /* @__PURE__ */ jsx(
            TablaGrupo,
            {
              grupo: grupoSeleccionado,
              fechas: fechasPorGrupo[grupoSeleccionado.letra] || []
            },
            `tabla-${grupoSeleccionado.letra}`
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "row mt-4", children: /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn-copa ${sincronizando ? "btn-esperando" : ""}`,
            disabled: sincronizando,
            onClick: handleSincronizar,
            children: sincronizando ? "Sincronizando..." : "Sincronizar datos reales"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "row mt-3 mb-4", children: /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn-copa btn-avanzar",
            disabled: !todosGruposCompletos,
            onClick: () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              generarEliminatorias();
              setFaseActiva("sembrado");
            },
            children: "Siguiente Fase: Clasificados"
          }
        ) }) })
      ] }),
      faseActiva === "sembrado" && sembrado.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(TablaSembrado, { sembrado }) }) }),
        /* @__PURE__ */ jsx("div", { className: "row mt-3 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "col-12 text-center d-flex justify-content-center gap-3", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-volver", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) || setFaseActiva("grupos"), children: "Volver: Fase de Grupos" }),
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-avanzar", onClick: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setFaseActiva("octavos");
          }, children: "Siguiente Fase: Octavos de Final" })
        ] }) })
      ] }),
      faseActiva === "octavos" && partidosOctavos.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(
          BracketOctavos,
          {
            partidos: partidosOctavos,
            onPartidosActualizados: (partidos) => {
              setPartidosOctavos(partidos);
              localStorage.setItem("copa-liga-octavos", JSON.stringify(partidos));
              invalidarHaciaAdelante("octavos");
            }
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "row mt-3 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "col-12 text-center d-flex justify-content-center gap-3", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-volver", onClick: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setFaseActiva("sembrado");
          }, children: "Volver: Clasificados" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn-copa btn-avanzar",
              disabled: !octavosCompletos,
              onClick: () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                handleAvanzarFase();
              },
              children: "Siguiente Fase: Cuartos de Final"
            }
          )
        ] }) })
      ] }),
      faseActiva === "cuartos" && partidosCuartos.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(
          BracketCuartos,
          {
            partidos: partidosCuartos,
            onPartidosActualizados: (partidos) => {
              setPartidosCuartos(partidos);
              localStorage.setItem("copa-liga-cuartos", JSON.stringify(partidos));
              invalidarHaciaAdelante("cuartos");
            }
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "row mt-3 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "col-12 text-center d-flex justify-content-center gap-3", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-volver", onClick: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setFaseActiva("octavos");
          }, children: "Volver: Octavos de Final" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn-copa btn-avanzar",
              disabled: !cuartosCompletos,
              onClick: () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                handleAvanzarFase();
              },
              children: "Siguiente Fase: Semifinales"
            }
          )
        ] }) })
      ] }),
      faseActiva === "semifinales" && partidosSemifinales.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(
          BracketSemifinales,
          {
            partidos: partidosSemifinales,
            onPartidosActualizados: (partidos) => {
              setPartidosSemifinales(partidos);
              localStorage.setItem("copa-liga-semifinales", JSON.stringify(partidos));
              invalidarHaciaAdelante("semifinales");
            }
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "row mt-3 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "col-12 text-center d-flex justify-content-center gap-3", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-copa btn-volver", onClick: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setFaseActiva("cuartos");
          }, children: "Volver: Cuartos de Final" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn-copa btn-avanzar",
              disabled: !semisCompletos,
              onClick: () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                handleAvanzarFase();
              },
              children: "Siguiente Fase: Gran Final"
            }
          )
        ] }) })
      ] }),
      faseActiva === "final" && partidoFinal && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(
          BracketFinal,
          {
            partido: partidoFinal,
            onPartidoActualizado: (partido) => {
              setPartidoFinal(partido);
              localStorage.setItem("copa-liga-final", JSON.stringify(partido));
              if (partido.ganador) {
                setGanador(partido.ganador);
                localStorage.setItem("copa-liga-ganador", JSON.stringify(partido.ganador));
              }
            }
          }
        ) }) }),
        ganador && /* @__PURE__ */ jsx("div", { className: "row mt-4", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(ChampionDisplay, { equipo: ganador }) }) }),
        /* @__PURE__ */ jsx("div", { className: "row mt-3 mb-4", children: /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsx("button", { className: "btn-copa btn-volver", onClick: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setFaseActiva("semifinales");
        }, children: "Volver: Semifinales" }) }) })
      ] })
    ] })
  ] });
}

const $$CopaLiga = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "titulo": "Copa de la Liga 2026" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "AppCopaLiga", AppCopaLiga, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/copa-liga/AppCopaLiga", "client:component-export": "default" })} </main> ` })}`;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/copa-liga.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/copa-liga.astro";
const $$url = "/copa-liga";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$CopaLiga,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
