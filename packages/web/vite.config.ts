import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: 'http://localhost:8080',
        proxy: {
            '/api': {
                target: process.env.API_URL || 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
});
