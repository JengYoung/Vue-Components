/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@assets': path.resolve('src/assets'),
        '@components': path.resolve('src/components'),
        '@hooks': path.resolve('src/hooks'),
        '@assets': path.resolve('src/assets')
      },
      extensions: ['.js', '.ts', '.vue', '.json'],
    },
  },
};
