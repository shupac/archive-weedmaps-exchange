module.exports = {
  extends: ['@ghostgroup/eslint-config-react'],
  plugins: ['flowtype'],
  rules: {
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/sort-comp': 0,
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    'no-return-assign': 1,
    'no-plusplus': 1,
    'no-unused-vars': 1,
    'no-underscore-dangle': 1
  },
  globals: {
    IS_SERVER: true,
    Honeybadger: true,
    logger: true,
  },
};
