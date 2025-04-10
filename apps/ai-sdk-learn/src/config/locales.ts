export interface Locale {
	label: string
	code: string
}

export interface LocaleConfig {
	locales: Locale[]
	defaultLocale: string
}

export interface Config {
	locale: 'en' | 'fr' | 'es' | 'de' | 'ja' | string
}

export const localeConfig: LocaleConfig = {
	locales: [
		{
			label: 'English',
			code: 'en',
		},
		{
			label: 'Français',
			code: 'fr',
		},
		{
			label: 'Español',
			code: 'es',
		},
		{
			label: 'Deutsch',
			code: 'de',
		},
		{
			label: 'Japanese',
			code: 'ja',
		},
	],
	defaultLocale: 'en',
} as const

export const locales = localeConfig.locales.map((locale) => locale.code)
export const defaultLocale = localeConfig.defaultLocale

// Locale display names based on the config
export const localeNames: Record<string, string> = Object.fromEntries(
	localeConfig.locales.map((locale) => [locale.code, locale.label]),
)

// Locale direction
export const localeDirections: Record<string, 'ltr' | 'rtl'> = {
	en: 'ltr',
	fr: 'ltr',
	es: 'ltr',
	de: 'ltr',
	ja: 'ltr',
}
