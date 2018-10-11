import { shallow } from 'enzyme';
import AspectRatio, { AspectRatioWrapper } from './';

describe('AspectRatio', () => {
  it('sets padding top for a 16/9 ratio', () => {
    const component = shallow(<AspectRatio aspectRatio={16 / 9} />);
    expect(component.find(AspectRatioWrapper).dive()).toHaveStyleRule(
      'padding-top',
      '56.25%',
    );
  });

  it('sets padding top for a 4/3 ratio', () => {
    const component = shallow(<AspectRatio aspectRatio={4 / 3} />);
    expect(component.find(AspectRatioWrapper).dive()).toHaveStyleRule(
      'padding-top',
      '75%',
    );
  });
});
