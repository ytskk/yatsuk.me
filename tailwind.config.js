module.exports = {
  darkMode: "media",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "105%": "105%",
      },
      colors: {
        "label-color": {
          primary: {
            light: "#000000",
            dark: "#ffffff",
          },
          secondary: {
            light: "#6A747D",
            dark: "#AEAEB2",
          },
        },
        background: {
          primary: {
            light: "#ffffff",
            dark: "#000000",
          },
          secondary: {
            light: "#FCFCFD",
            dark: "#121212",
          },
          third: {
            light: "#F5F5F7",
            dark: "#1D1D1F",
          },
        },
        gray: {
          light: "#6A747D",
          dark: "#AEAEB2",
          surface: "#A9A3BD48",
        },
        brand: {
          "brand-primary": "#00A6FF",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-headings": theme("colors.label-color.primary.light"),
            p: {
              color: theme("colors.label-color.primary.light"),
            },
            code: {
              background: theme("colors.gray.surface"),
              padding: "0.125rem 0.25rem",
              borderRadius: "0.25rem",
            },
            pre: {
              background: theme("colors.background.third.light"),
              padding: "1.25rem 1.75rem",
              border: `1px solid ${theme("colors.gray.surface")}`,
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-headings": theme("colors.label-color.primary.dark"),
            p: {
              color: theme("colors.label-color.primary.dark"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
