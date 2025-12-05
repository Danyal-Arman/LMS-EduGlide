/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      /* -------------------------
         FONTS (old + new)
      ------------------------- */
      fontFamily: {
        // Old fonts (preserve)
        kanit: ['Kanit', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],

        // New design-system font (safe new name)
        outfit: ['Outfit', 'sans-serif'],
      },

      /* -------------------------
         RADIUS (preserve)
      ------------------------- */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      /* =========================
         COLORS
         - keep OLD tokens *exactly* as before (no alpha change)
         - add NEW DS tokens prefixed with `ds-` with alpha support
         ========================= */
      colors: {
        /* -------------------------
           OLD tokens (kept intact)
           ------------------------- */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        /* -------------------------
           NEW DS tokens (safe new names)
           - use these when you want the new design system
           - alpha-ready so bg-ds-primary/60, text-ds-primary, etc. work
           ------------------------- */

        'ds-primary': {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },

        'ds-card': {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },

        'ds-popover': {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },

        'ds-accent': {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },

        'ds-muted': {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },

        'ds-destructive': {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },

        'ds-border': 'hsl(var(--border) / <alpha-value>)',
        'ds-input': 'hsl(var(--input) / <alpha-value>)',
        'ds-ring': 'hsl(var(--ring) / <alpha-value>)',

        /* Glass tokens from new file */
        'ds-glass': {
          bg: 'hsl(var(--glass-bg) / <alpha-value>)',
          border: 'hsl(var(--glass-border) / <alpha-value>)',
        },

        /* Glow token */
        'ds-glow': {
          primary: 'hsl(var(--glow-primary) / <alpha-value>)',
        },

        /* Sidebar DS tokens */
        'ds-sidebar': {
          bg: 'hsl(var(--sidebar-background) / <alpha-value>)',
          fg: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
          primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
          primaryfg: 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
          accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
          accentfg: 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
          border: 'hsl(var(--sidebar-border) / <alpha-value>)',
          ring: 'hsl(var(--sidebar-ring) / <alpha-value>)',
        },

        /* DS chart tokens (preserve chart vars but expose ds- prefixed too) */
        'ds-chart': {
          1: 'hsl(var(--chart-1) / <alpha-value>)',
          2: 'hsl(var(--chart-2) / <alpha-value>)',
          3: 'hsl(var(--chart-3) / <alpha-value>)',
          4: 'hsl(var(--chart-4) / <alpha-value>)',
          5: 'hsl(var(--chart-5) / <alpha-value>)',
        },
      },

      /* -------------------------
         BOX SHADOWS
         - keep old shadows (if any)
         - add ds-shadow variants
      ------------------------- */
      boxShadow: {
        // DS glow shadows (use `shadow-ds-glow`)
        'ds-glow': '0 8px 40px -10px hsl(var(--glow-primary) / 0.12)',
        'ds-glow-sm': '0 6px 20px -8px hsl(var(--glow-primary) / 0.10)',
        'ds-inner-glow': 'inset 0 0 30px -10px hsl(var(--glow-primary) / 0.12)',
      },

      /* -------------------------
         KEYFRAMES & ANIMATIONS (merge)
      ------------------------- */
      keyframes: {
        bounceball: {
          '0%': {
            top: '30px',
            height: '5px',
            borderRadius: '60px 60px 20px 20px',
            transform: 'scaleX(2)',
          },
          '35%': {
            height: '15px',
            borderRadius: '50%',
            transform: 'scaleX(1)',
          },
          '100%': {
            top: '0px',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        bounceball: 'bounceball 0.5s ease infinite alternate',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
