import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import basicSsl from '@vitejs/plugin-basic-ssl'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      certDir: path.resolve(__dirname, './certs'),
      domains: ['localhost'],
      name: 'yo'
    }),
    svgr()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})