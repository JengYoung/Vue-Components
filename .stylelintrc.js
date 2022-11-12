module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order'
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-empty-first-line': null,
    'no-empty-source': null
  }
}
