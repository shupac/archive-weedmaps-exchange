import { shallow } from 'enzyme';
import { SellerProductsPage } from 'pages/seller-products';

function setup(props) {
  const mockStore = {};

  const url = {
    pathname: '/seller/products/123',
    query: { productId: '123' },
  };

  const component = (
    <SellerProductsPage {...props} store={mockStore} url={url} />
  );

  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });

  return { wrapper, mockStore };
}

describe('SellerProductsPage', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });
});
