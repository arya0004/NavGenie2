import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom theme colors
        'murky-teal': '#022831',
        'blue-lagoon': '#04566E',
        'pastel-green': '#689368',
        'green-pear': '#B4D330',
        'blustery-blue': '#D8DFE9',
        // System colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F5F7FA",
        foreground: "#022831",
        primary: {
          DEFAULT: '#04566E',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#689368',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: '#D8DFE9',
          foreground: '#022831',
        },
        accent: {
          DEFAULT: '#B4D330',
          foreground: '#022831',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#022831',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#022831',
        },
        // Keep existing heritage colors
        heritage: {
          terracotta: '#C75D3A',
          mustard: '#E3B448',
          blue: '#285C9F',
          gray: '#565656',
          cream: '#F7F3E9',
          dark: '#2D2D2D',
        },
        blue: {
          mystic: '#091D36',
          venice: '#0B4C84',
          danube: '#598EC2',
          iris: '#9BC1EE',
          bold: '#1B59D0'
        },
        green: {
          turf: '#136912',
          edamame: '#34A426',
          jade: '#48817A'
        },
        gray: {
          flash: '#F0EFF5'
        },
        boston: '#3C8CA7',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'carousel': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-5%)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'carousel': 'carousel 25s infinite alternate'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
