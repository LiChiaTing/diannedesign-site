export const prerender = false;

import type { APIRoute } from 'astro';

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

// Cache the access token in module scope — reuse until 5 min before expiry
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  cachedToken = data.access_token;
  // Spotify tokens are valid for 3600s; refresh 5 min early to be safe
  tokenExpiresAt = now + (data.expires_in - 300) * 1000;
  return cachedToken as string;
}

export const GET: APIRoute = async () => {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return new Response(JSON.stringify({ error: 'Spotify not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = await getAccessToken();

    // Try currently playing first
    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (nowRes.status === 200) {
      const nowData = await nowRes.json();
      if (nowData?.item) {
        return new Response(
          JSON.stringify({
            title: nowData.item.name,
            artist: nowData.item.artists.map((a: { name: string }) => a.name).join(', '),
            isPlaying: nowData.is_playing,
            albumArt: nowData.item.album.images[2]?.url ?? null,
          }),
          { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' } }
        );
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const recentData = await recentRes.json();
    const track = recentData?.items?.[0]?.track;

    if (track) {
      return new Response(
        JSON.stringify({
          title: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(', '),
          isPlaying: false,
          albumArt: track.album.images[2]?.url ?? null,
        }),
        { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60, stale-while-revalidate=120' } }
      );
    }

    return new Response(JSON.stringify({ error: 'No track data' }), {
      status: 204,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Spotify fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
