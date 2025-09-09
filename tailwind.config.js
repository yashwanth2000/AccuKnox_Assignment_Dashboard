export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // all your React files
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
