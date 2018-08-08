import backgrounds from '@storybook/addon-backgrounds';

export default () =>
  backgrounds([
    {
      name: 'WM Background',
      value: '#F2F5F5',
      default: true,
    },
    {
      name: 'White',
      value: '#FFFFFF',
    },
    {
      name: 'Black',
      value: '#000000',
    },
  ]);
