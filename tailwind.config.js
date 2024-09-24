module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#000000', // Default text color (light mode)
        'dark-default': '#FFFFFF', // Default text color (dark mode)
        body: '#000000',    // Text color for body text (light mode)
        'dark-body': '#FFFFFF',    // Text color for body text (dark mode)
        heading: '#000000', // Text color for headings (light mode)
        'dark-heading': '#FFFFFF', // Text color for headings (dark mode)
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
          },
        },
        invert: {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            h5: {
              color: theme('colors.white'),
            },
            h6: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.white'),
            '--tw-prose-hr': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-quote-borders': theme('colors.white'),
            '--tw-prose-captions': theme('colors.white'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.white'),
            '--tw-prose-td-borders': theme('colors.white'),
            '--tw-prose-body': theme('colors.white')
            
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