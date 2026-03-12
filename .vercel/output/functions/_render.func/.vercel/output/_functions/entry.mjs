import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_D8wt2aEc.mjs';
import { manifest } from './manifest_CLw1JaBF.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/now-playing.astro.mjs');
const _page3 = () => import('./pages/api/status.astro.mjs');
const _page4 = () => import('./pages/api/update-project.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/creative.astro.mjs');
const _page7 = () => import('./pages/work/arxtect.astro.mjs');
const _page8 = () => import('./pages/work/diannedesign-me.astro.mjs');
const _page9 = () => import('./pages/work/flare.astro.mjs');
const _page10 = () => import('./pages/work/miirrai.astro.mjs');
const _page11 = () => import('./pages/work/_slug_.astro.mjs');
const _page12 = () => import('./pages/work.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/now-playing.ts", _page2],
    ["src/pages/api/status.ts", _page3],
    ["src/pages/api/update-project.ts", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/creative/index.astro", _page6],
    ["src/pages/work/arxtect.astro", _page7],
    ["src/pages/work/diannedesign-me.astro", _page8],
    ["src/pages/work/flare.astro", _page9],
    ["src/pages/work/miirrai.astro", _page10],
    ["src/pages/work/[slug].astro", _page11],
    ["src/pages/work/index.astro", _page12],
    ["src/pages/index.astro", _page13]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "42ff8257-f148-47f9-a12b-471c3fc13cee",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
