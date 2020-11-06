/* ./babel.config.js */
/* eslint-disable */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
            components: './components',
            context: './context',
            constants: './services',
            navigation: './navigation',
            screens: './screens',
            hooks: './hooks',
            services: './services',
          },
        },
      ],
    ],
  };
};
