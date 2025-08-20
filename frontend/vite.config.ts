import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { defineConfig } from 'vite';
import csp from 'vite-plugin-csp-guard';

// Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports"
// Content-Security-Policy: default-src 'self'; report-to csp-endpoint

export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: 'sha256',
      dev: {
        run: false,
      },
      policy: {
        'script-src': ['\'self\'', 'https://www.google-analytics.com'],
        'connect-src': ['\'self\'', 'http:'],
        'style-src-elem': [
          '\'self\'',
          '\'unsafe-inline\'',
        ],
        'img-src': [
          '\'self\'',
        ],
        'frame-ancestors': ['\'none\''],
      },
      build: {
        sri: false,
      },
    }),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      assets: path.resolve(__dirname, 'src/assets'),
      comunes: path.resolve(__dirname, 'src/app/comunes'),
      store: path.resolve(__dirname, 'src/app/store'),
      hooks: path.resolve(__dirname, 'src/app/hooks'),
      autenticacion: path.resolve(__dirname, 'src/app/autenticacion'),
      configuraciones: path.resolve(__dirname, 'src/configuraciones'),
      modulos: path.resolve(__dirname, 'src/app/interfaz/modulos'),
      utilidades: path.resolve(__dirname, 'src/utilidades'),
      servidor: path.resolve(__dirname, 'src/servidor'),
    },
  },
  server: {
    port: 3000,
  },
});
