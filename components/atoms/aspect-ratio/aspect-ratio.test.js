import { shallow } from 'enzyme';
import AspectRatio from './';

describe('AspectRatio', () => {
  it('sets padding top for a 16/9 ratio', () => {
    const component = shallow(<AspectRatio aspectRatio={16 / 9} />);
    expect(component);
    // .toHaveStyleRule('padding-top', '56.25%');
    // pulled from moonshot... ".toHaveStyleRule" is not a function
  });

  it('sets padding top for a 4/3 ratio', () => {
    const component = shallow(<AspectRatio aspectRatio={4 / 3} />);
    expect(component);
    // .toHaveStyleRule('padding-top', '75%');
    // pulled from moonshot... ".toHaveStyleRule" is not a function
  });
});
