import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import basicSsl from '@vitejs/plugin-basic-ssl'
import svgr from 'vite-plugin-svgr';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
export default defineConfig({
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    // proxy: {
    //   // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
    //   '/extension/profile': {
    //     target: 'https://localhost:3000/users/profile',
    //     headers: {
    //       origin: 'https://127.0.0.1:5173'
    //     },
    
    //     changeOrigin: false,
    //     secure: false,
    //     configure: (proxy, options) => {
    //       proxy.on('proxyReq', (proxyReq, req, res) => {
    //         // add custom header to request
    //         console.warn('saa')
    //       });
    //     }
    //   },
    //   // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   }
      
    // }
  },
  plugins: [
    react(),
    basicSsl({
      certDir: path.resolve(__dirname, './certs'),
      domains: ['localhost'],
      name: 'E'
    }),
    svgr(),
    wasm(),
    topLevelAwait(),
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})