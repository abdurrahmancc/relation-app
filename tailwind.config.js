module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#171c2a",
          secondary: "#11141f",
          accent: "#1f222e",
          neutral: "#fff",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#52d794",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
