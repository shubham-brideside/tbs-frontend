/** @type {import("tailwindcss").Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'off-white': '#F9F9F9',
				'tiffany-blue': '#000000',
				'tiffany-blue-dark': '#000000',
				'primary-black': '#000000',
				'secondary-black': '#1A1A1A',
			},
		},
	},
	plugins: [],
};
