import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages: if your site is at username.github.io/REPO-NAME/ then set base to '/REPO-NAME/'
  // (e.g. repo "Personal Portfolio" → base: '/Personal-Portfolio/'). Use './' for root or user sites.
  base: './',
  plugins: [
    react(),
    // GitHub Pages: serve index.html for 404s so client-side routing works
    {
      name: 'copy-404',
      closeBundle() {
        const out = path.resolve(__dirname, 'dist')
        const index = path.join(out, 'index.html')
        const notFound = path.join(out, '404.html')
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, notFound)
        }
      },
    },
  ],
})
