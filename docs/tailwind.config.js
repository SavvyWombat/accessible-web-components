module.exports = {
  content: require('fast-glob').sync([
    'source/**/*.{blade.php,md,html,vue}',
    '!source/**/_tmp/*'
  ],{ dot: true }),
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#dae4f6',
          200: '#b6c9ed',
          300: '#91aee4',
          400: '#6d93db',
          500: '#4878d2',
          600: '#2e60bd',
          700: '#254d97',
          800: '#1c3a71',
          900: '#13264b',
        },
        gray: {
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#6b6b6b',
          700: '#555555',
          800: '#404040',
          900: '#2b2b2b',
        },
        red: {
          100: '#fac3c7',
          200: '#f4868f',
          300: '#ef4a58',
          400: '#e21426',
          500: '#a60f1e',
          600: '#8a0d17',
          700: '#6f0a12',
          800: '#53080e',
          900: '#370509',
        },
      },

      boxShadow: {
        'code': 'inset 0 0 0.5rem 0.1rem #b3b3b3',
        'inner': 'inset 0 0 1rem #13264b',
        'inner-bottom': 'inset 0 -2rem 1rem -1rem #13264b',
        'inner-top': 'inset 0 2rem 1rem -1rem #13264b',
      },

      gridTemplateAreas: {
        'layout-default': [
          'header header header',
          'nav    main   .',
          '.      main   .',
          'footer footer footer'
        ],
      },

      gridTemplateColumns: {
        'layout-default': '30ch 80ch 1fr',
      },

      gridTemplateRows: {
        'layout-default': 'auto auto minmax(max-content, 1fr) auto',
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
};
