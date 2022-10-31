module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/.prettierrc.js',
    '/tests/**/*',
    '/.eslintrc.js',
    '/jest.config.ts',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    'require-jsdoc': ['off'],
    'no-case-declarations': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    'import/no-unresolved': 0,
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
  },
}
