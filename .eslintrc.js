module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:storybook/recommended',
    'plugin:vue/essential',
    'google',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/no-reserved-component-names': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-for-template-key-on-child': 'error',
  },
};
