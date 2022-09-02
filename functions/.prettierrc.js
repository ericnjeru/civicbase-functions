module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  jsxBracketSameLine: false,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  importOrder: [
    '^(firebase/(.*)$)|^(firebase$)', // Imports by "firebase"
    '<THIRD_PARTY_MODULES>',
    '^config/(.*)$',
    '^utils/(.*)$',
    '^[./]', // Other imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
