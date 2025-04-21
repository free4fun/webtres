import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    tsconfigPaths()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
  
});
