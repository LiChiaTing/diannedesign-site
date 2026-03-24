export const prerender = false;

import type { APIRoute } from 'astro';
import nowData from '../../data/now.json';

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = import.meta.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_CALENDAR_ID = import.meta.env.GOOGLE_CALENDAR_ID;

// Cache the access token in module scope — reuse until 5 min before expiry
let cachedGoogleToken: string | null = null;
let googleTokenExpiresAt = 0;

async function getGoogleAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedGoogleToken && now < googleTokenExpiresAt) {
    return cachedGoogleToken;
  }
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  cachedGoogleToken = data.access_token;
  // Google tokens are valid for 3600s; refresh 5 min early to be safe
  googleTokenExpiresAt = now + (data.expires_in - 300) * 1000;
  return cachedGoogleToken as string;
}

async function getActiveCalendarEvent(): Promise<string | null> {
  const token = await getGoogleAccessToken();
  const now = new Date();
  const timeMin = now.toISOString();
  // Look for events that started before now and end after now
  const timeMax = new Date(now.getTime() + 60 * 1000).toISOString(); // 1 minute window

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events`
  );
  url.searchParams.set('timeMin', new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString()); // events that started up to 4h ago
  url.searchParams.set('timeMax', timeMax);
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  url.searchParams.set('maxResults', '5');

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  // Find an event that is currently active (started <= now <= ended)
  const active = data.items?.find((event: { start?: { dateTime?: string }; end?: { dateTime?: string }; summary?: string }) => {
    const start = event.start?.dateTime;
    const end = event.end?.dateTime;
    if (!start || !end) return false;
    return new Date(start) <= now && new Date(end) >= now;
  });

  return active?.summary ?? null;
}

export const GET: APIRoute = async () => {
  const result = {
    type: 'project' as 'event' | 'project',
    value: nowData.status,
    project: nowData.project,
    task: nowData.task ?? null,
    project_zh: nowData.project_zh ?? nowData.project,
    task_zh: nowData.task_zh ?? nowData.task ?? null,
    status_zh: nowData.status_zh ?? nowData.status,
  };

  // Try Google Calendar if configured
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN && GOOGLE_CALENDAR_ID) {
    try {
      const activeEvent = await getActiveCalendarEvent();
      if (activeEvent) {
        result.type = 'event';
        result.value = activeEvent;
      }
    } catch {
      // Fall through to project display
    }
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60, stale-while-revalidate=120' },
  });
};
