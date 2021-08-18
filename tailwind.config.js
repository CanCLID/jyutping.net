module.exports = {
  important: true,
  purge: {
    enabled: true,
    content: ["./src/**/*"],
  },
  theme: {
    fontFamily: {
      sans: [
        "Open Sans",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
      serif: [
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
        "monospace",
      ],
    },
  },
  variants: {
    extend: {
      backgroundImage: ["hover"],
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss/plugin")(({ addUtilities }) => {
      addUtilities(
        Object.assign(
          Object.fromEntries(
            Array.from({ length: 20 }, (n, i) => (i + 1) * 50).map(n => [
              ".animation-delay-" + n,
              { animationDelay: n + "ms" },
            ])
          ),
          {
            ".animation-none": { animationName: "none" },
            ".animation-running": { animationPlayState: "running" },
            ".animation-paused": { animationPlayState: "paused" },
            ".animation-fill-none": { animationFillMode: "none" },
            ".animation-fill-forwards": { animationFillMode: "forwards" },
            ".animation-fill-backwards": { animationFillMode: "backwards" },
            ".animation-fill-both": { animationFillMode: "both" },
          }
        )
      );
    }),
  ],
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
  },
};
