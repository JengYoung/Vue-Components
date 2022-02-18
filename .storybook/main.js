const path = require('path');
const custom = require('../node_modules/@vue/cli-service/webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            // indentedSyntax: true,
            // sass-loader version >= 8
            sassOptions: {
              indentedSyntax: true,
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
