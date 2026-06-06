import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B6zpe3EO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CH_ZwYLk.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Subeybaja = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-ktg7snop": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid" data-astro-cid-ktg7snop> <div class="row" data-astro-cid-ktg7snop> <div class="col-12 contenedor-titulo-calculadora" data-astro-cid-ktg7snop> <div class="row gx-0 justify-content-center align-items-center" data-astro-cid-ktg7snop> <div class="col-6" data-astro-cid-ktg7snop> <h1 class="text-center titulo-calculadora" data-astro-cid-ktg7snop>MINIJUEGO "SUBE Y BAJA"</h1> </div> </div> </div> </div> </div> ${renderComponent($$result2, "MenuSubeBaja", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-ktg7snop": true, "client:component-path": "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/components/minijuegos/subeybaja/Menu-SubeBaja", "client:component-export": "default" })} ` })} `;
}, "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/subeybaja.astro", void 0);

const $$file = "C:/Users/eduga/Desktop/Repo/universo-liga-1/src/pages/minijuegos/subeybaja.astro";
const $$url = "/minijuegos/subeybaja";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Subeybaja,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
