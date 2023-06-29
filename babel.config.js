module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            assets: './assets',
            components: './src/components',
            constants: './src/constants',
            hooks: './src/hooks',
            libs: './src/libs',
            navigation: './src/navigation',
            screens: './src/screens',
            contexts: './src/contexts',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
