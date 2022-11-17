const path = require('path');
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@css': path.resolve(__dirname, 'src/css/'),
        '@stories': path.resolve(__dirname, 'src/stories/'),
      },
    },
    loader: {
      module: {
        rules: [
          {
            test: /\.module.scss$/,
            use: [
              'vue-style-loader',
              { loader: 'css-loader', options: { modules: true } },
              'sass-loader',
            ],
          },
          {
            test: /\.scss$/,
            exclude: /\.module.scss$/,
            use: ['vue-style-loader', 'css-loader', 'sass-loader'],
          },
        ],
      },
    },
  },
});
