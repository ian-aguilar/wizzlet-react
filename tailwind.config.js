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
          greyBorder: "#D8DCE4",
      },
      backgroundImage:{
        authPattern: "url('/images/bgPatternAuth.png');",
        CMSPageTop: "url('/images/bgCMSPattern.png');",
        CMSPageTile: "url('/images/bg-dots-tile-CMS.png');",
      },
      fontFamily:{
        jost : "Jost",
      },
      container: {
        // you can configure the container to be centered
        center: true,
        // or have default horizontal padding
        padding: '1rem',
        screens: {
          sm: '600px',
          md: '768px',
          lg: '990px',
          xl: '1280px',
          '2xl': '1340px',
        },
      },
      boxShadow:{
        headerWeb: " 0px 4px 4px 0px #0000000A",
        aboutBox: "0px 18.22px 42.51px 0px #0000000D"
      }
    },
  },
  plugins: [],
};
