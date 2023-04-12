import react            from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path        from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      process: 'process/browser',
      util: 'util'
    }
  },
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"]
    }
  })]
})
