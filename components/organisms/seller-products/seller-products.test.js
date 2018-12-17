import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { SellerProducts } from './';

function setup(props) {
  const mockStore = {};

  const component = <SellerProducts store={mockStore} {...props} />;
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  return { wrapper, mockStore };
}

describe('Seller Products Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should update the url state on clear all', () => {
    const { wrapper } = setup({
      router: {
        query: {},
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.clearAll();
    expect(pushRoute).toHaveBeenCalledWith('sellerProducts', {});
    pushRoute.mockRestore();
  });

  it('should clear filters but keep search term', () => {
    const { wrapper } = setup({
      router: {
        query: {
          search: 'foo',
        },
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.clearAll();
    expect(pushRoute).toHaveBeenCalledWith('sellerProducts', { search: 'foo' });
    pushRoute.mockRestore();
  });
});
