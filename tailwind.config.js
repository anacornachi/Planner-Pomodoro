module.exports = {
  purge: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary__gray: "#E3E3E3",
        primary__red: "#D10D00",
        secondary__red: "#FF9F99",
        bg__gray: "rgba(243, 243, 243, 0.25);",
        secondary__gray: "rgba(196, 196, 196, 0.24)",
      },
      fontFamily: {
        sans: ["Roboto"],
        serif: ["Poppins"],
        cursive: ["Schoolbell"],
      },
      fontSize: {
        timer: ["12rem", { lineHeight: "1" }],
      },
    },
  },
  variants: {},
  plugins: [],
};
