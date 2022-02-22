const path = require('path');
const custom = require('../node_modules/@vue/cli-service/webpack.config.js');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.resolve.alias = { ...config.resolve.alias, "@/components": path.resolve(__dirname, "../src/components"), };
    
    return config;
  },
};
