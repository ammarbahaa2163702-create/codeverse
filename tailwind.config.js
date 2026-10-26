/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0d9488',
          tealDark: '#0f766e',
          tealLight: '#14b8a6',
          indigo: '#6366f1',
          indigoDark: '#4f46e5',
        },
        surface: {
          base: 'var(--color-bg-base)',
          card: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          muted: 'var(--color-bg-muted)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
        text: {
          primary: 'var(--color-text-base)',
          secondary: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Cairo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      transitionDuration: {
        'micro': '150ms',
        'base': '250ms',
      }
    },
  },
  plugins: [],
}
