import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { ribes: ['Ribes', 'Georgia', 'serif'] },
      colors: {
        white: '#FFFFFF',
        blue: '#1C4CF4',
        black: '#0A0A0A',
      },
    },
  },
  plugins: [],
}
export default config
