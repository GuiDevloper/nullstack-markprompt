module.exports = {
  extends: 'plugin:nullstack/recommended',
  rules: {
    'nullstack/prettier': [
      'warn',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        printWidth: 80,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
