module.exports = {
	content: [
		// "./app/**/*.{js,ts,jsx,tsx,mdx}",
    	"./node_modules/flowbite-react/lib/**/*.js",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#003366",
				secondary: "#fefefe",
				"font-color": "#262d34",
				"dark-font": "#002447",
				grey: "#e5e6e7",
				inactive: "#73777c",
			},
			fontFamily: {
				body: ["Cairo"],
			},
		},
	},
	plugins: [
    	require("flowbite/plugin")
	],
};