/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors:{
          greenPrimary : "#09A17A",
          blackPrimary : "#242425",
          grayText: "#6C778B",
          grayLightBody:"#97A0B2",
          inputAuthBg: "#EAEDF3",
      },
      backgroundImage:{
        authPattern: "url('/images/bgPatternAuth.png');",
      },
      fontFamily:{
        jost : "Jost",
      }
    },
  },
  plugins: [],
};
