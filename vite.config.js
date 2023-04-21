import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  define: {
    global: "globalThis"
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      process: "process/browser",
      util: "util"
    }
  },
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"]
    }
  })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.tsx"),
      name: "Test Component",
      formats: ["es", "umd"],
      fileName: (format) => `test-component.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
        }
      }
    }
  }
})
