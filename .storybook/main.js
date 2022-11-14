const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, '..'),
      'node_modules',
      'src/css',
    ];

    config.module.rules.push(
      {
        test: /.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "@css/vars.scss";
              `,
            },
          },
        ],
      },
      {}
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@css': path.resolve(__dirname, '../src/css'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
    };

    return config;
  },
};
