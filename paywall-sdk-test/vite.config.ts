import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['paywall-js-sdk'],
    force: true
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});


