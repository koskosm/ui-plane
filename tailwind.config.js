module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#FFFFFF', // Default text color
        body: '#FFFFFF',    // Text color for body text
        heading: '#FFFFFF', // Text color for headings
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('textColor.body'),
            h1: {
              color: theme('textColor.heading'),
            },
            h2: {
              color: theme('textColor.heading'),
            },
            h3: {
              color: theme('textColor.heading'),
            },
            h4: {
              color: theme('textColor.heading'),
            },
            h5: {
              color: theme('textColor.heading'),
            },
            h6: {
              color: theme('textColor.heading'),
            },
            strong: {
              color: theme('textColor.heading'),
            },
            // You can add more elements here if needed
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}