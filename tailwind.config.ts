import daisyui from "daisyui";

import type { Config as DaisyUIConfig } from "daisyui";
import type { Config } from "tailwindcss";

export default {
  important: true,
  content: ["./index.html", "./src/**/*"],
  theme: {
    fontFamily: {
      sans: [
        "Chocolate Classical Sans",
        "Open Sans",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Ubuntu",
        "Helvetica Neue",
        "Noto Sans",
        "Liberation Sans",
        "Arial",
        "Microsoft JhengHei",
        "Microsoft JhengHei UI",
        "Noto Sans HK",
        "Noto Sans CJK HK",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#0d8af8",
          "primary-focus": "#066fcb",
          "primary-content": "#ffffff",
          "secondary": "#42c28b",
          "secondary-focus": "#31a573",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          "neutral": "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#e4e6e8",
          "base-content": "#1f2937",
          "info": "#2071f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff2f24",
        },
      },
    ],
  } satisfies DaisyUIConfig,
} satisfies Config;
