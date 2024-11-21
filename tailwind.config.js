import defaultTheme  from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './shadcn-landing-page/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "tw-",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			transparent: 'transparent',
  			current: 'currentColor',
  			'primary-foreground': {
  				'50': 'var(--primary-foreground-50)',
  				'100': 'var(--primary-foreground-100)',
  				'200': 'var(--primary-foreground-200)',
  				'300': 'var(--primary-foreground-300)',
  				'400': 'var(--primary-foreground-400)',
  				'500': 'var(--primary-foreground-500)',
  				'600': 'var(--primary-foreground-600)',
  				'700': 'var(--primary-foreground-700)',
  				'800': 'var(--primary-foreground-800)',
  				'900': 'var(--primary-foreground-900)',
  				'1000': 'var(--primary-foreground-1000)',
  				DEFAULT: 'var(--primary-foreground)'
  			},
  			'accent': {
  				'50': 'var(--accent-50)',
  				'100': 'var(--accent-100)',
  				'200': 'var(--accent-200)',
  				'300': 'var(--accent-300)',
  				'400': 'var(--accent-400)',
  				'500': 'var(--accent-500)',
  				'600': 'var(--accent-600)',
  				'700': 'var(--accent-700)',
  				'800': 'var(--accent-800)',
  				'900': 'var(--accent-900)',
  				'1000': 'var(--accent-1000)',
  				DEFAULT: 'var(--accent)'
  			},
  			'primary': {
  				'50': 'var(--primary-50)',
  				'100': 'var(--primary-100)',
  				'200': 'var(--primary-100)',
  				'300': 'var(--primary-300)',
  				'400': 'var(--primary-400)',
  				'500': 'var(--primary-500)',
  				'600': 'var(--primary-600)',
  				'700': 'var(--primary-700)',
  				'800': 'var(--primary-800)',
  				'900': 'var(--primary-900)',
  				'1000': 'var(--primary-1000)',
  				DEFAULT: 'var(--primary)'
  			},
  			'secondary': {
  				'50': 'var(--secondary-50)',
  				'100': 'var(--secondary-100)',
  				'200': 'var(--secondary-200)',
  				'300': 'var(--secondary-300)',
  				'400': 'var(--secondary-400)',
  				'500': 'var(--secondary-500)',
  				'600': 'var(--secondary-600)',
  				'700': 'var(--secondary-700)',
  				'800': 'var(--secondary-800)',
  				'900': 'var(--secondary-900)',
  				'1000': 'var(--secondary-1000)',
  				DEFAULT: 'var(--secondary)'
  			},
  			'secondary-foreground': {
  				'50': 'var(--secondary-foreground-50)',
  				'100': 'var(--secondary-foreground-100)',
  				'200': 'var(--secondary-foreground-200)',
  				'300': 'var(--secondary-foreground-300)',
  				'400': 'var(--secondary-foreground-400)',
  				'500': 'var(--secondary-foreground-500)',
  				'600': 'var(--secondary-foreground-600)',
  				'700': 'var(--secondary-foreground-700)',
  				'800': 'var(--secondary-foreground-800)',
  				'900': 'var(--secondary-foreground-900)',
  				'1000': 'var(--secondary-foreground-1000)',
  				DEFAULT: 'var(--secondary-foreground)'
  			},
  			'good': {
  				'50': 'var(--good-50)',
  				'100': 'var(--good-100)',
  				'200': 'var(--good-200)',
  				'300': 'var(--good-300)',
  				'400': 'var(--good-400)',
  				'500': 'var(--good-500)',
  				'600': 'var(--good-600)',
  				'700': 'var(--good-700)',
  				'800': 'var(--good-800)',
  				'900': 'var(--good-900)',
  				'1000': 'var(--good-1000)',
  				DEFAULT: 'var(--good)'
  			},
  			'bad': {
  				'50': 'var(--bad-50)',
  				'100': 'var(--bad-100)',
  				'200': 'var(--bad-200)',
  				'300': 'var(--bad-300)',
  				'400': 'var(--bad-400)',
  				'500': 'var(--bad-500)',
  				'600': 'var(--bad-600)',
  				'700': 'var(--bad-700)',
  				'800': 'var(--bad-800)',
  				'900': 'var(--bad-900)',
  				'1000': 'var(--bad-1000)',
  				DEFAULT: 'var(--bad)'
  			},
  			'background': 'var(--background)'
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
  			'scroll': {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			},
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate") , addVariablesForColors],
}

