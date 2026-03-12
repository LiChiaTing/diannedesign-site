/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Spotify
  readonly SPOTIFY_CLIENT_ID: string;
  readonly SPOTIFY_CLIENT_SECRET: string;
  readonly SPOTIFY_REFRESH_TOKEN: string;

  // Google Calendar
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_REFRESH_TOKEN: string;
  readonly GOOGLE_CALENDAR_ID: string;

  // Project status update (shell hook secret)
  readonly STATUS_SECRET: string;

  // GitHub API (for update-project endpoint)
  readonly GITHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
