import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CH_ZwYLk.mjs';
import { E as EquiposData } from '../chunks/equipos_CqqkVLn1.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Equipos = createComponent(($$result, $$props, $$slots) => {
  const equipos = EquiposData;
  const urls_img_alternas = [
    "/img/equipos/bn/adt.webp",
    "/img/equipos/bn/aas.webp",
    "/img/equipos/bn/alima.webp",
    "/img/equipos/bn/ag.webp",
    "/img/equipos/bn/cienciano.webp",
    "/img/equipos/bn/comerciantes.webp",
    "/img/equipos/bn/cusco.webp",
    "/img/equipos/bn/garcilaso.webp",
    "/img/equipos/bn/moquegua.webp",
    "/img/equipos/bn/melgar.webp",
    "/img/equipos/bn/cajamarca.webp",
    "/img/equipos/bn/jpii.webp",
    "/img/equipos/bn/chankas.webp",
    "/img/equipos/bn/sb.webp",
    "/img/equipos/bn/huancayo.webp",
    "/img/equipos/bn/sc.webp",
    "/img/equipos/bn/u.webp",
    "/img/equipos/bn/utc.webp"
  ];
  const background_equipos = [
    "linear-gradient(90deg,rgba(171, 153, 15, 0.77) 0%, rgba(25, 86, 255, 0.73) 100%)",
    "linear-gradient(90deg,rgba(227, 227, 227, 0.78) 0%, rgba(70, 148, 232, 0.87) 100%)",
    "linear-gradient(90deg,rgba(209, 207, 207, 0.77) 0%, rgba(13, 16, 117, 0.72) 100%)",
    "linear-gradient(90deg,rgba(171, 15, 15, 0.77) 0%, rgba(251, 244, 27, 0.72) 100%)",
    "linear-gradient(90deg,rgba(186, 189, 207, 0.77) 0%, rgba(115, 6, 6, 0.77) 100%)",
    "linear-gradient(90deg,rgba(42, 112, 42, 0.77) 0%, rgba(77, 5, 87, 0.77) 100%)",
    "linear-gradient(90deg,rgba(102, 88, 19, 0.77) 0%, rgba(26, 24, 6, 0.87) 100%)",
    "linear-gradient(90deg,rgba(56, 150, 144, 0.82) 0%, rgba(145, 28, 28, 0.87) 100%)",
    "linear-gradient(90deg,rgba(217, 217, 217, 0.78) 0%, rgba(59, 57, 57, 0.87) 100%)",
    "linear-gradient(90deg,rgba(138, 21, 25, 0.82) 0%, rgba(5, 0, 0, 0.87) 100%)",
    "linear-gradient(90deg,rgba(240, 234, 67, 0.78) 0%, rgba(64, 64, 194, 0.87) 100%)",
    "linear-gradient(90deg,rgba(181, 176, 25, 0.82) 0%, rgba(217, 166, 104, 0.87) 100%)",
    "linear-gradient(90deg,rgba(237, 151, 76, 0.77) 0%, rgba(140, 14, 81, 0.72) 100%)",
    "linear-gradient(90deg,rgba(191, 73, 144, 0.78) 0%, rgba(5, 0, 0, 0.87) 100%)",
    "linear-gradient(90deg,rgba(153, 149, 44, 0.82) 0%, rgba(168, 12, 12, 0.87) 100%)",
    "linear-gradient(90deg,rgba(240, 240, 240, 0.78) 0%, rgba(0, 158, 158, 0.87) 100%)",
    "linear-gradient(90deg,rgba(255, 225, 176, 0.78) 0%, rgba(158, 0, 0, 0.87) 100%)",
    "linear-gradient(90deg,rgba(199, 167, 161, 0.78) 0%, rgba(232, 70, 70, 0.87) 100%)"
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-ngybtctu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-ngybtctu> <div class="container-fluid" data-astro-cid-ngybtctu> <div class="row" data-astro-cid-ngybtctu> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-ngybtctu> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-ngybtctu> <div class="col-6" data-astro-cid-ngybtctu> <h1 class="text-center titulo-calculadora" data-astro-cid-ngybtctu>EQUIPOS LIGA 1 2026</h1> </div> </div> </div> </div> </div> <div class="container-fluid contenedor-equipos" data-astro-cid-ngybtctu> <div class="row justify-content-center align-items-center" data-astro-cid-ngybtctu> <div class="col-11 col-lg-10" data-astro-cid-ngybtctu> <div class="row justify-content-center align-items-center" data-astro-cid-ngybtctu> ${equipos.map((equipo, index) => renderTemplate`<div${addAttribute(`equipo-${equipo.id}`, "id")} class="col-4 col-lg-2 contenedor-carta-equipo text-center p-3" data-astro-cid-ngybtctu> <div class="carta" data-astro-cid-ngybtctu> <div class="carta-inner" data-astro-cid-ngybtctu> <!-- Cara frontal --> <div class="carta-front" data-astro-cid-ngybtctu> <img class="img-fluid img-equipo"${addAttribute(`${equipo.url_foto}`, "src")}${addAttribute(`Logo de ${equipo.nombre}`, "alt")} data-astro-cid-ngybtctu> </div> <!-- Cara trasera --> <div class="carta-back"${addAttribute(`background: ${background_equipos[index % background_equipos.length]}`, "style")} data-astro-cid-ngybtctu> <h3 class="nombre-equipo" data-astro-cid-ngybtctu>${equipo.nombre}</h3> <img class="img-fluid img-equipo-secundario"${addAttribute(`${urls_img_alternas[index % urls_img_alternas.length]}`, "src")}${addAttribute(`Logo alternativo de ${equipo.nombre}`, "alt")} data-astro-cid-ngybtctu> <a class="btn-ver-mas"${addAttribute(`/equipos/${equipo.id}`, "href")} data-astro-cid-ngybtctu>Ver más</a> </div> </div> </div> </div>`)} </div> </div> </div> </div> </main> ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/equipos.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/equipos.astro";
const $$url = "/equipos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Equipos,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
