import { n as nowData } from '../../chunks/now_CNa5BHsc.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async () => {
  const result = {
    type: "project",
    value: nowData.status,
    project: nowData.project,
    task: nowData.task,
    project_zh: nowData.project_zh,
    task_zh: nowData.task_zh,
    status_zh: nowData.status_zh
  };
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
