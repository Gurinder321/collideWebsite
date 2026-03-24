/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/views/**/*.{js,ts,jsx,tsx,mdx}",


  ],
  theme: {
  	extend: {
		boxShadow:{
			default:"20px 20px 40px 0px rgba(0,0,0,0.61);"
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			pink:' #d178b0'
			
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
	
		  fontFamily: {
			poppins: ['var(--font-poppins)', 'sans-serif'],
			stix:['var(--font-stix)','sans-serif'],
			metal:['var(--font-metal)','serif'],
			sriracha:['var(--font-sriracha)'],
			puppies:['var(--font-puppies)','cursive'],
			joaneitalic: ['var(--font-joaneitalic)', 'cursive'],
			allinpiska:['var(--font-allinpiska)'],
			amerigo:['var(--font-amerigo)','serif'],
			dmserif:['var(--font-dmserif)'],
			winslowtitle:['var(--font-winslowtitle)'],
			montserrat:['var(--font-montserrat)'],
			adobejenson:['var(--font-adobejenson)'],
      kievitSerif:['var(--font-kievitSerif)'],
      kievitSerifBold:['var(--font-kievitSerifBold)'],
		  },
		  gridTemplateColumns: {

			'layout': 'repeat(12, 1fr)'
 
		  }
		  
  	}
  },
  plugins: [
	// require("tailwindcss-animate"),
],
};
