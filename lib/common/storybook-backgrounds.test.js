import storybookBackgrounds from './storybook-backgrounds';

describe('storybookBackgrounds', () => {
  it('should have the following backgrounds', () => {
    const backgrounds = storybookBackgrounds()();
    expect(backgrounds.props.backgrounds).toEqual([
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
  });
});
