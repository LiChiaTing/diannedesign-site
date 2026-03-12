import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.diannedesign.me',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
});
