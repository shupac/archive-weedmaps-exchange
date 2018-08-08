import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Loader from './index';

describe('The Loader', () => {
  it('will render without a provided title ', () => {
    const tree = toJson(shallow(<Loader />));
    expect(tree).toMatchSnapshot();
  });
  it('will render with a provided title ', () => {
    const tree = toJson(shallow(<Loader loaderText="Loader text" />));
    expect(tree).toMatchSnapshot();
  });
});
