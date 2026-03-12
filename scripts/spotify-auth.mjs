/**
 * One-time Spotify OAuth helper
 * Run: node scripts/spotify-auth.mjs
 *
 * Prerequisites:
 *   1. Go to https://developer.spotify.com/dashboard
 *   2. Create an app (any name)
 *   3. In app settings, add Redirect URI: http://localhost:3000/callback
 *   4. Copy Client ID and Client Secret below (or set as env vars)
 */

import http from 'http';
import { exec } from 'child_process';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'PASTE_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'PASTE_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

console.log('\n🎵 Spotify Auth Helper\n');
console.log('Opening browser for authorization...\n');

// Open browser
const open = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
exec(`${open} "${authUrl}"`);

// Start local server to catch the callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  if (url.pathname !== '/callback') return;

  const code = url.searchParams.get('code');
  if (!code) {
    res.end('Error: no code received');
    return;
  }

  // Exchange code for tokens
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokens = await tokenRes.json();

  res.end('<html><body><h2>✅ Success! Check your terminal.</h2></body></html>');
  server.close();

  console.log('✅ Got tokens!\n');
  console.log('Add these to your Vercel environment variables:\n');
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log('\nDone! You can close this terminal.\n');
});

server.listen(3000, () => {
  console.log('Waiting for Spotify authorization on http://localhost:3000...\n');
});
