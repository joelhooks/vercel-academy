/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	// darkMode: ["selector", '[data-theme="dark"]', "class"],
	darkMode: ['class'],
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
	prefix: '',
	safelist: [
		'lg:col-span-4',
		'lg:col-span-6',
		'lg:col-span-8',
		'lg:col-span-12',
		'border-border',
		'bg-card',
		'border-error',
		'bg-error/30',
		'border-success',
		'bg-success/30',
		'border-warning',
		'bg-warning/30',
	],
	theme: {
		container: {
			center: true,
			padding: {
				'2xl': '2rem',
				DEFAULT: '1rem',
				lg: '2rem',
				md: '2rem',
				sm: '1rem',
				xl: '2rem',
			},
			screens: {
				'2xl': '86rem',
				lg: '64rem',
				md: '48rem',
				sm: '40rem',
				xl: '80rem',
			},
		},
		extend: {
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'collapsible-down': 'collapsible-down 0.2s ease-out',
				'collapsible-up': 'collapsible-up 0.2s ease-out',
				float: 'float 3s ease-in-out infinite',
				'book-entrance': 'book-entrance 1200ms ease-in-out forwards',
				'bubble-fade-in': 'bubble-fade-in 700ms ease-out forwards',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				background: 'hsl(var(--background))',
				border: 'hsla(var(--border))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				foreground: 'hsl(var(--foreground))',
				input: 'hsl(var(--input))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				ring: 'hsl(var(--ring))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				success: 'hsl(var(--success))',
				error: 'hsl(var(--error))',
				warning: 'hsl(var(--warning))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},
			fontFamily: {
				mono: ['var(--font-geist-mono)'],
				sans: ['var(--font-geist-sans)'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
				'collapsible-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-collapsible-content-height)',
					},
				},
				'collapsible-up': {
					from: {
						height: 'var(--radix-collapsible-content-height)',
					},
					to: {
						height: '0',
					},
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(2px)' },
				},
				'book-entrance': {
					'0%': { transform: 'translateY(400px) rotate(-24deg)' },
					'100%': { transform: 'translateY(0) rotate(6deg)' },
				},
				'bubble-fade-in': {
					'0%': { opacity: '0', filter: 'blur(5px)' },
					'100%': { opacity: '1', filter: 'blur(0)' },
				},
			},
		},
	},
}
