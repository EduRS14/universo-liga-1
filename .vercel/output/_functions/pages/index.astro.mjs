import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CH_ZwYLk.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const urls_img_bn = [
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-j7pv25f6> <div class="container-fluid" data-astro-cid-j7pv25f6> <div class="row justify-content-center align-items-center" data-astro-cid-j7pv25f6> <div class="col-12 text-center contenedor-bienvenida" data-astro-cid-j7pv25f6> <div class="row justify-content-center align-items-center" data-astro-cid-j7pv25f6> <div class="col-4 text-center my-4" data-astro-cid-j7pv25f6> <h1 class="texto-bienvenida" data-astro-cid-j7pv25f6>Bienvenido a</h1> </div> <div class="col-10 text-center" data-astro-cid-j7pv25f6> <h1 class="texto-titulo" data-astro-cid-j7pv25f6>UNIVERSO LIGA 1</h1> </div> <div class="col-10 col-lg-5 text-center my-3" data-astro-cid-j7pv25f6> <p class="texto-slogan" data-astro-cid-j7pv25f6>Datos, predicciones y diversión. El universo del fútbol peruano en un solo lugar.</p> </div> </div> </div> <div class="col-12 contenedor-carrusel" data-astro-cid-j7pv25f6> <div class="carousel" data-astro-cid-j7pv25f6> <div class="group" data-astro-cid-j7pv25f6> ${urls_img_bn.map((url) => renderTemplate`<div class="item" data-astro-cid-j7pv25f6> <img${addAttribute(url, "src")} alt="Equipo Liga 1" class="img-equipo" data-astro-cid-j7pv25f6> </div>`)} </div> <div aria-hidden="true" class="group" data-astro-cid-j7pv25f6> ${urls_img_bn.map((url) => renderTemplate`<div class="item" data-astro-cid-j7pv25f6> <img${addAttribute(url, "src")} alt="Equipo Liga 1" class="img-equipo" data-astro-cid-j7pv25f6> </div>`)} </div> </div> </div> <div class="col-12 contenedor-opciones" data-astro-cid-j7pv25f6> <div class="row justify-content-center align-items-center" data-astro-cid-j7pv25f6> <div class="col-10 text-center" data-astro-cid-j7pv25f6> <h2 class="texto-opciones" data-astro-cid-j7pv25f6>Explora las secciones disponibles</h2> </div> <div class="col-6 col-lg-3 d-flex justify-content-center my-3" data-astro-cid-j7pv25f6> <div class="box" data-astro-cid-j7pv25f6> <img src="/img/pagina-principal/wiki.webp" alt="Wiki Liga 1" class="img-fluid img-opcion" data-astro-cid-j7pv25f6> <div class="overlay" data-astro-cid-j7pv25f6> <h3 class="texto-titulo-card" data-astro-cid-j7pv25f6>Wiki Liga 1 2026</h3> <p class="texto-parrafo-card" data-astro-cid-j7pv25f6>Explora estadísticas detalladas, historia de equipos y jugadores de la Liga 1 2026.</p> <a href="/equipos" class="link-card" data-astro-cid-j7pv25f6>Wiki</a> </div> </div> </div> <div class="col-6 col-lg-3 d-flex justify-content-center my-3" data-astro-cid-j7pv25f6> <div class="box" data-astro-cid-j7pv25f6> <img src="/img/pagina-principal/calculadora.webp" alt="Calculadora Liga 1" class="img-fluid img-opcion" data-astro-cid-j7pv25f6> <div class="overlay" data-astro-cid-j7pv25f6> <h3 class="texto-titulo-card" data-astro-cid-j7pv25f6>Calculadora Liga 1 2026</h3> <p class="texto-parrafo-card" data-astro-cid-j7pv25f6>Simula los partidos fecha a fecha y predice quién será el campeón.</p> <a href="/calculadora" class="link-card" data-astro-cid-j7pv25f6>Calculadora</a> </div> </div> </div> <div class="col-6 col-lg-3 d-flex justify-content-center my-3" data-astro-cid-j7pv25f6> <div class="box" data-astro-cid-j7pv25f6> <img src="/img/pagina-principal/futperu.webp" alt="FutPerú" class="img-fluid img-opcion" data-astro-cid-j7pv25f6> <div class="overlay" data-astro-cid-j7pv25f6> <h3 class="texto-titulo-card" data-astro-cid-j7pv25f6>FutPerú</h3> <p class="texto-parrafo-card" data-astro-cid-j7pv25f6>Desafía tu conocimiento del fútbol peruano y disfruta de diferentes minijuegos.</p> <a href="/minijuegos" class="link-card" data-astro-cid-j7pv25f6>FutPerú</a> </div> </div> </div> </div> </div> </div> </div> </main> ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/index.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
