module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"], // Switchable themes
  },
  plugins: [require("daisyui")],
};
