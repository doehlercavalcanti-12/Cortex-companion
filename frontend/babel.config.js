module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@screens': './src/screens',
        '@hooks': './src/hooks',
        '@services': './src/services',
        '@constants': './src/constants',
      },
    }],
    'react-native-reanimated/plugin',
  ],
};
