import { shallow } from 'enzyme';
import Loader from './index';

describe('The Loader', () => {
  it('will render without a provided title ', () => {
    const tree = shallow(<Loader />);
    expect(tree.exists()).toEqual(true);
  });
  it('will render with a provided title ', () => {
    const tree = shallow(<Loader loaderText="Loader text" />);
    expect(tree.exists()).toEqual(true);
  });
});
