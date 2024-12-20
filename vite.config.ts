import dsv from "@rollup/plugin-dsv";
import autoprefixer from "autoprefixer";
import postCSSNesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { ViteMinifyPlugin } from "vite-plugin-minify";

import type { UserConfig } from "vite";

export default {
  plugins: [dsv(), ViteMinifyPlugin(), ViteImageOptimizer()],
  css: {
    postcss: {
      plugins: [tailwindcssNesting(postCSSNesting()), tailwindcss(), autoprefixer()],
    },
  },
  build: {
    target: "ES2017",
    rollupOptions: {
      output: {
        assetFileNames: "[name].[hash].[ext]",
        chunkFileNames: "[name].[hash].js",
        entryFileNames: "[name].[hash].js",
        hashCharacters: "hex",
      },
    },
  },
} satisfies UserConfig;
