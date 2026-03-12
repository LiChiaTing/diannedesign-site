import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BCbypmJ6.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_B9v7_eeZ.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dianneting/Works/Portfolio/My%20Site/diannedesign-site/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"creative/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/creative","isIndex":true,"type":"page","pattern":"^\\/creative\\/?$","segments":[[{"content":"creative","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/creative/index.astro","pathname":"/creative","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/arxtect/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/arxtect","isIndex":false,"type":"page","pattern":"^\\/work\\/arxtect\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"arxtect","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/arxtect.astro","pathname":"/work/arxtect","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/diannedesign-me/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/diannedesign-me","isIndex":false,"type":"page","pattern":"^\\/work\\/diannedesign-me\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"diannedesign-me","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/diannedesign-me.astro","pathname":"/work/diannedesign-me","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/flare/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/flare","isIndex":false,"type":"page","pattern":"^\\/work\\/flare\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"flare","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/flare.astro","pathname":"/work/flare","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/miirrai/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/miirrai","isIndex":false,"type":"page","pattern":"^\\/work\\/miirrai\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"miirrai","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/miirrai.astro","pathname":"/work/miirrai","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":true,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/index.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/now-playing","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/now-playing\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"now-playing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/now-playing.ts","pathname":"/api/now-playing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/status.ts","pathname":"/api/status","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/update-project","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/update-project\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"update-project","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/update-project.ts","pathname":"/api/update-project","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.diannedesign.me","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/creative/index.astro",{"propagation":"none","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/work/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/work/arxtect.astro",{"propagation":"none","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/work/diannedesign-me.astro",{"propagation":"none","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/work/flare.astro",{"propagation":"none","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/work/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/pages/work/miirrai.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/now-playing@_@ts":"pages/api/now-playing.astro.mjs","\u0000@astro-page:src/pages/api/status@_@ts":"pages/api/status.astro.mjs","\u0000@astro-page:src/pages/api/update-project@_@ts":"pages/api/update-project.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/creative/index@_@astro":"pages/creative.astro.mjs","\u0000@astro-page:src/pages/work/arxtect@_@astro":"pages/work/arxtect.astro.mjs","\u0000@astro-page:src/pages/work/diannedesign-me@_@astro":"pages/work/diannedesign-me.astro.mjs","\u0000@astro-page:src/pages/work/flare@_@astro":"pages/work/flare.astro.mjs","\u0000@astro-page:src/pages/work/miirrai@_@astro":"pages/work/miirrai.astro.mjs","\u0000@astro-page:src/pages/work/[slug]@_@astro":"pages/work/_slug_.astro.mjs","\u0000@astro-page:src/pages/work/index@_@astro":"pages/work.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/arxtect.md?astroContentCollectionEntry=true":"chunks/arxtect_CFIFWqTw.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/bpcr.md?astroContentCollectionEntry=true":"chunks/bpcr_B5FY7DAx.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/diannedesign-me.md?astroContentCollectionEntry=true":"chunks/diannedesign-me_B56mJltN.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/flare.md?astroContentCollectionEntry=true":"chunks/flare_DWwrJqHs.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/flexygig.md?astroContentCollectionEntry=true":"chunks/flexygig_D7JK_28k.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/miirrai.md?astroContentCollectionEntry=true":"chunks/miirrai_B_Nqka7I.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/arxtect.md?astroPropagatedAssets":"chunks/arxtect_CpieAlAn.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/bpcr.md?astroPropagatedAssets":"chunks/bpcr_DLb34vAD.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/diannedesign-me.md?astroPropagatedAssets":"chunks/diannedesign-me_DOcQ-041.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/flare.md?astroPropagatedAssets":"chunks/flare_C3IgUdKa.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/flexygig.md?astroPropagatedAssets":"chunks/flexygig_DwHOer3E.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/miirrai.md?astroPropagatedAssets":"chunks/miirrai_Dx6TsdHH.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/arxtect.md":"chunks/arxtect_WTdabQ7i.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/bpcr.md":"chunks/bpcr_DXEm34j0.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/diannedesign-me.md":"chunks/diannedesign-me_Dq4rPVCz.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/flare.md":"chunks/flare_Dy6BEUWp.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/flexygig.md":"chunks/flexygig_DIRf7iwR.mjs","/Users/dianneting/Works/Portfolio/My Site/diannedesign-site/src/content/work/miirrai.md":"chunks/miirrai_CFHLdtx3.mjs","\u0000@astrojs-manifest":"manifest_CLw1JaBF.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DI8d91pd.js","/astro/hoisted.js?q=1":"_astro/hoisted.BrnD4NRT.js","/astro/hoisted.js?q=2":"_astro/hoisted.Cd5K-yPq.js","/astro/hoisted.js?q=3":"_astro/hoisted.CR07d2xM.js","/astro/hoisted.js?q=4":"_astro/hoisted.BxA2dx4h.js","/astro/hoisted.js?q=5":"_astro/hoisted.DbeorJEt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.DrhlprgC.css","/_astro/flare.Y-QaZImC.css","/og-image.png","/_astro/hoisted.BrnD4NRT.js","/_astro/hoisted.BxA2dx4h.js","/_astro/hoisted.CR07d2xM.js","/_astro/hoisted.Cd5K-yPq.js","/_astro/hoisted.DI8d91pd.js","/_astro/hoisted.DbeorJEt.js","/data/now.json","/images/creative/post-alley.jpg","/images/creative/seattle-alley-night.jpg","/images/creative/seattle-crosswalk.jpg","/images/creative/seattle-windows.jpg","/images/creative/street-art.jpg","/images/projects/arxtect-cover.jpg","/images/projects/diannedesign-cover.jpg","/images/projects/flexygig-cover.jpg","/images/projects/arxtect/Cover1.png","/images/projects/arxtect/Figma working area.png","/images/projects/arxtect/Github repo.png","/images/projects/arxtect/Logo idea.png","/images/projects/arxtect/New Landing Page.png","/images/projects/arxtect/Old Landing Page V1.png","/images/projects/arxtect/arxtect logo.png","/images/projects/arxtect/prroduct analysis.png","/images/projects/flare/flare-feed.png","/images/projects/flare/flare-radar.png","/images/projects/flare/flare-seattle.png","/images/projects/flare/flare-settings.png","/images/projects/miirrai/WhatsApp Image 2026-03-06 at 16.26.34.jpeg","/images/projects/miirrai/figma-sketch.png","/images/projects/miirrai/iamap.png","/images/projects/miirrai/product-flow.jpg","/images/projects/miirrai/product-ui.jpg","/images/projects/miirrai/user personas.png","/about/index.html","/contact/index.html","/creative/index.html","/work/arxtect/index.html","/work/diannedesign-me/index.html","/work/flare/index.html","/work/miirrai/index.html","/work/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"jP8jnThrPaRDoGqaCWYtmESUz4r5w33MFEBmKiKP+aM=","experimentalEnvGetSecretEnabled":false});

export { manifest };
