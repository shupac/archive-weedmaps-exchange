import { shallow } from 'enzyme';

import InputError from './form-input-error';

function setup(newProps) {
  const props = {
    errors: {},
    touched: {},
    name: 'name',
  };

  const component = <InputError {...props} {...newProps} />;
  const wrapper = shallow(component);
  return { wrapper, props };
}

describe('Seller Product Details Form Input Error', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should display an error message', () => {
    const { wrapper } = setup({
      errors: {
        name: 'Test error',
      },
      touched: {
        name: true,
      },
      name: 'name',
    });
    expect(
      wrapper
        .find('ErrorMessage')
        .dive()
        .text(),
    ).toEqual('Test error');
  });
});
