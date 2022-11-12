/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        "@css": path.resolve(__dirname, "src/css/"),
        "@stories": path.resolve(__dirname, "src/stories/")
      },
    },
  },
};
