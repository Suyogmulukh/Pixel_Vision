/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{css,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      display: ["poppins","sans-serif"]
    },
    extend: {
      // color used are this project
      colors:{
        primary: "#05B6D3",
        secondary:"#EF863E",
      },
      backgroundImage:{
        'login-bg-img': "url('./src/assets/login.png')",
        'SignUp-bg-img': "url('./src/assets/signUP.png')",
        'homepage-bg-img': "url('./src/assets/homepage.jpg')",       
      }
    },
  },
  plugins: [],
}