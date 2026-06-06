import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C4OFR9jt.mjs';
import { manifest } from './manifest_xxWzC3nj.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/calculadora.astro.mjs');
const _page2 = () => import('./pages/copa-liga.astro.mjs');
const _page3 = () => import('./pages/equipos/_id_.astro.mjs');
const _page4 = () => import('./pages/equipos.astro.mjs');
const _page5 = () => import('./pages/minijuegos/abc.astro.mjs');
const _page6 = () => import('./pages/minijuegos/el-once.astro.mjs');
const _page7 = () => import('./pages/minijuegos/el-once-actualidad.astro.mjs');
const _page8 = () => import('./pages/minijuegos/el-once-leyendas.astro.mjs');
const _page9 = () => import('./pages/minijuegos/el-tapadito.astro.mjs');
const _page10 = () => import('./pages/minijuegos/nexos.astro.mjs');
const _page11 = () => import('./pages/minijuegos/subeybaja.astro.mjs');
const _page12 = () => import('./pages/minijuegos/top-goleadores.astro.mjs');
const _page13 = () => import('./pages/minijuegos.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/calculadora.astro", _page1],
    ["src/pages/copa-liga.astro", _page2],
    ["src/pages/equipos/[id].astro", _page3],
    ["src/pages/equipos.astro", _page4],
    ["src/pages/minijuegos/abc.astro", _page5],
    ["src/pages/minijuegos/el-once.astro", _page6],
    ["src/pages/minijuegos/el-once-actualidad.astro", _page7],
    ["src/pages/minijuegos/el-once-leyendas.astro", _page8],
    ["src/pages/minijuegos/el-tapadito.astro", _page9],
    ["src/pages/minijuegos/nexos.astro", _page10],
    ["src/pages/minijuegos/subeybaja.astro", _page11],
    ["src/pages/minijuegos/top-goleadores.astro", _page12],
    ["src/pages/minijuegos.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "647d2a73-d03d-45d5-9d9f-659f1f9d5459",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
