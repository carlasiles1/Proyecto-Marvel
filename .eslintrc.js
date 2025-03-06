module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Soporte completo para Vue 3
  ],
  parser: 'vue-eslint-parser', // Parser específico para archivos .vue
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: '@babel/eslint-parser', // Sub-parser para JavaScript
  },
  plugins: ['vue', 'cypress'],
  rules: {
    'no-undef': 'error',
    'semi': ['error', 'always'],
  },
};