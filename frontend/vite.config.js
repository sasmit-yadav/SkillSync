import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    port: 5175,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5175, // Match your frontend port
    }
  }
};