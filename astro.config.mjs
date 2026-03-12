import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.diannedesign.me',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'hybrid',
  adapter: vercel(),
});
