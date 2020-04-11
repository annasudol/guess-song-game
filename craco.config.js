/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  babel: {
    presets: [],
    plugins: ['@babel/plugin-proposal-optional-chaining'],
  },

  style: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({
          autoprefixer: { grid: true },
          features: {
            'color-mod-function': {
              unresolved: 'warn',
            },
            'custom-properties': {
              preserve: false,
            },
            'nesting-rules': true,
          },
        }),
        require('tailwindcss')('./src/tailwind/tailwind.config.js'),
        require('postcss-nested')(),
      ],
    },
  },
  typescript: {
    enableTypeChecking: true,
  },
};
