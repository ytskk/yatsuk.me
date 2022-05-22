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
            table: {
              width: "auto",
            },
            th: {
              fontWeight: "normal",
              color: theme("colors.label-color.primary.light"),
            },
            tbody: {
              color: theme("colors.label-color.primary.light"),
            },
            p: {
              color: theme("colors.label-color.primary.light"),
            },
            code: {
              background: theme("colors.gray.surface"),
              padding: "0.125rem 0.25rem",
              borderRadius: "0.25rem",
            },
            "pre > code > .function": {
              color: "#4b21b0",
              fontWeight: "600",
            },
            "pre > code > .punctuation": {
              color: "#404040",
            },
            "pre > code > .class-name": {
              color: "#703daa",
              fontWeight: "600",
            },
            "pre > code > .generics": {
              color: "#ba2da2",
              fontWeight: "500",
            },
            "pre > code > .generics > .punctuation": {
              color: "#404040",
            },
            "pre > code > .operator": {
              color: "#947100",
            },
            "pre > code > .keyword": {
              color: "#AD3DA5",
              fontWeight: "600",
            },
            "pre > code > .comment": {
              color: "#707f8c",
            },
            pre: {
              color: "black",
              background: theme("colors.background.third.light"),
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
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
            "pre > code > .function": {
              color: "#dabaff",
            },
            "pre > code > .punctuation": {
              color: "#d5d8df",
            },
            "pre > code > .class-name": {
              color: "#dabaff",
            },
            "pre > code > .generics": {
              color: "#b281eb",
            },
            "pre > code > .generics > .punctuation": {
              color: "#d5d8df",
            },
            "pre > code > .operator": {
              color: "#ffa14f",
            },
            "pre > code > .keyword": {
              color: "#ff7ab2",
            },
            "pre > code > .comment": {
              color: "#7f8c98",
            },
            pre: {
              color: "white",
              background: theme("colors.background.third.dark"),
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
              border: `1px solid ${theme("colors.gray.surface")}`,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
