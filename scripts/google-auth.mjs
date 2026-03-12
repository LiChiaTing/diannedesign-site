/**
 * One-time Google Calendar OAuth helper
 * Run: node scripts/google-auth.mjs
 *
 * Prerequisites:
 *   1. Go to https://console.cloud.google.com
 *   2. Create a project (or use existing)
 *   3. Enable "Google Calendar API"
 *   4. Go to Credentials → Create OAuth 2.0 Client ID
 *      - Application type: Desktop app
 *   5. Download the credentials JSON, or paste Client ID + Secret below
 *   6. In OAuth consent screen, add your Gmail as a test user
 */

import http from 'http';
import { exec } from 'child_process';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'PASTE_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'PASTE_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:3001/callback';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&access_type=offline` +
  `&prompt=consent`;

console.log('\n📅 Google Calendar Auth Helper\n');
console.log('Opening browser for authorization...\n');

const open = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
exec(`${open} "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3001');
  if (url.pathname !== '/callback') return;

  const code = url.searchParams.get('code');
  if (!code) {
    res.end('Error: no code received');
    return;
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      code,
    }),
  });

  const tokens = await tokenRes.json();

  res.end('<html><body><h2>✅ Success! Check your terminal.</h2></body></html>');
  server.close();

  console.log('✅ Got tokens!\n');
  console.log('Add these to your Vercel environment variables:\n');
  console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`);
  console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log(`GOOGLE_CALENDAR_ID=your-design-gmail@gmail.com`);
  console.log('\n(Replace GOOGLE_CALENDAR_ID with your actual design Gmail address)\n');
});

server.listen(3001, () => {
  console.log('Waiting for Google authorization on http://localhost:3001...\n');
});
