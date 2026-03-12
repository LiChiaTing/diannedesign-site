export const prerender = false;

import type { APIRoute } from 'astro';

const STATUS_SECRET = import.meta.env.STATUS_SECRET;
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
const GITHUB_REPO = 'dianneting/diannedesign-site'; // update if different

export const POST: APIRoute = async ({ request }) => {
  let body: { project?: string; task?: string; task_zh?: string; secret?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (!STATUS_SECRET || body.secret !== STATUS_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  if (!body.project) {
    return new Response(JSON.stringify({ error: 'project required' }), { status: 400 });
  }

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: 'GitHub not configured' }), { status: 503 });
  }

  try {
    // Fetch current now.json from GitHub
    const fileRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/now.json`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' } }
    );
    const fileData = await fileRes.json();
    const current = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

    // Skip if project hasn't changed
    if (current.project === body.project) {
      return new Response(JSON.stringify({ status: 'unchanged' }), { status: 200 });
    }

    // Update fields
    const updated = {
      ...current,
      project: body.project,
      project_zh: body.project,
      ...(body.task ? { task: body.task } : {}),
      ...(body.task_zh ? { task_zh: body.task_zh } : {}),
      updated: new Date().toISOString().split('T')[0],
    };

    const content = Buffer.from(JSON.stringify(updated, null, 2) + '\n').toString('base64');

    await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/now.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `update status: working on ${body.project}`,
          content,
          sha: fileData.sha,
        }),
      }
    );

    return new Response(JSON.stringify({ status: 'updated', project: body.project }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'GitHub update failed' }), { status: 500 });
  }
};
