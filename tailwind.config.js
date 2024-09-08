/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      colors: {
        background: "hsl(0, 0%, 100%)",
        shadow: "hsl(121,6%,65%)",
        foreground: "hsl(240, 10%, 3.9%)",
        card: "hsl(0, 0%, 100%)",
        "card-foreground": "hsl(240, 10%, 3.9%)",
        popover: "hsl(0, 0%, 100%)",
        "popover-foreground": "hsl(240, 10%, 3.9%)",
        primary: "hsl(230, 90%, 61%)",
        "primary-foreground": "hsl(0, 0%, 98%)",
        secondary: "hsl(240, 4.8%, 95.9%)",
        "secondary-foreground": "hsl(240, 5.9%, 10%)",
        muted: "hsl(240, 4.8%, 95.9%)",
        "muted-foreground": "hsl(240, 3.8%, 46.1%)",
        accent: "hsl(240, 4.8%, 95.9%)",
        "accent-foreground": "hsl(240, 5.9%, 10%)",
        destructive: "hsl(0, 84.2%, 60.2%)",

        "destructive-foreground": "hsl(0, 0%, 98%)",
        success: "hsl(121,52%,38%)",
        "success-foreground": "hsl(0, 0%, 98%)",
        border: "hsl(240, 50.9%, 90%)",
        input: "hsl(240, 5.9%, 90%)",
        ring: "hsl(240, 5.9%, 10%)",
      },
    },
  },
  plugins: [],
};
