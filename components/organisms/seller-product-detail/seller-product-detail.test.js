import { shallow } from 'enzyme';
import { SellerProductDetails } from './';

function setup(props) {
  const mockStore = {};

  const component = (
    <SellerProductDetails store={mockStore} productId="123" {...props} />
  );
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  return { wrapper, mockStore };
}

describe('Seller Product Details Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });
});
