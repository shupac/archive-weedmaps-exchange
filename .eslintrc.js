module.exports = {
  extends: ['@ghostgroup/eslint-config-react'],
  plugins: ['flowtype', 'react-hooks'],
  rules: {
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/sort-comp': 0,
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    'no-return-assign': 1,
    'no-plusplus': 1,
    'no-underscore-dangle': 1,
    'new-cap': 1,
    'jsx-a11y/label-has-for': 1,
    'react/default-props-match-prop-types': 1,
    'react-hooks/rules-of-hooks': 'error',
  },
  globals: {
    IS_SERVER: true,
    Honeybadger: true,
  },
};
