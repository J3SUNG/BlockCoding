module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: ['@kos/styleguide/comment', '@kos/styleguide/es3', '@kos/styleguide/es2015', '@kos/styleguide/typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
}
