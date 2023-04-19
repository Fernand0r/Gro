import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as path from "path";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import { default as dts } from "rollup-plugin-dts";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import externals from "rollup-plugin-node-externals";
import sass from "rollup-plugin-scss";

const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const transpile = {
  input: "src/components/index.ts",
  external: (source) => {
    return source.startsWith("@ethersproject/");
  },
  plugins: [
    externals({
      exclude: [/\.json$/, /\.css$/],
      deps: true,
      peerDeps: true
    }),
    resolve({ extensions: EXTENSIONS }),
    json(),
    url({ include: ["**/*.png", "**/*.svg", "**/*.gif"], limit: Infinity }),
    svgr({ jsxRuntime: "automatic" }),
    sass(),
    commonjs(),

    babel({
      babelHelpers: "runtime",
      extensions: EXTENSIONS,
      skipPreflightCheck: true,
    }),
    inject({ React: "react" })
  ],
  onwarn: (warning, warn) => {
    if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
    if (warning.code === "THIS_IS_UNDEFINED") return;
    if (warning.code === "CIRCULAR_DEPENDENCY") return;

    warn(warning);
    console.log(warning.loc, "\n");
  }
};

const esm = {
  ...transpile,
  output: {
    file: "dist/index.js",
    format: "esm",
    sourcemap: true
  }
};

const cjs = {
  ...transpile,
  output: {
    dir: "dist/cjs",
    entryFileNames: "[name].cjs",
    chunkFileNames: "[name]-[hash].cjs",
    format: "cjs",
    sourcemap: true
  },
  watch: false
};

const types = {
  input: "dts/index.d.ts",
  output: { file: "dist/index.d.ts" },
  external: (source) =>
    source.endsWith(".css") || source.endsWith("/external.d.ts"),
  plugins: [dts({ compilerOptions: { baseUrl: "dts" } })],
  watch: false
};

const config = [esm, cjs, types];
// @ts-ignore
config.config = { ...esm, output: { ...esm.output, sourcemap: true } };

// module.exports = config;

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
      "@": path.resolve(__dirname, "src"),
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
    rollupOptions: config
  }
});
