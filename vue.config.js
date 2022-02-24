/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@components': path.resolve('src/components'),
        '@hooks': path.resolve('src/hooks'),
      },
      extensions: ['.js', '.ts', '.vue', '.json'],
    },
  },
};
