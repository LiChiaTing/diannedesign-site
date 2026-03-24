export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&current_weather=true&temperature_unit=celsius'
    );
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Weather fetch failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Weather unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
