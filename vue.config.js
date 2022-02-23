/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@components': path.resolve('src/components'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
  },
};
