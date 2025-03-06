module.exports = {
  env: {
    browser: true, // Habilita variables globales del navegador (como window)
    es2021: true,  // Habilita características modernas de JavaScript
    'cypress/globals': true, // Habilita las variables globales de Cypress
    node: true, // Habilita variables globales de Node.js (como module, process, etc.)
  },
  extends: [
    'eslint:recommended', // Reglas recomendadas por ESLint
    'plugin:vue/vue3-essential', // Reglas específicas para Vue 3
  ],
  parser: '@babel/eslint-parser', // Usar Babel como parser
  parserOptions: {
    ecmaVersion: 2021, // Versión de ECMAScript
    sourceType: 'module', // Permite el uso de imports/exports
  },
  plugins: [
    'vue', // Plugin de Vue
    'cypress', // Plugin de Cypress
  ],
  rules: {
    'no-undef': 'error', // Marca errores si usas variables no definidas
    'semi': ['error', 'always'], // Requiere punto y coma al final de las líneas
  },
};