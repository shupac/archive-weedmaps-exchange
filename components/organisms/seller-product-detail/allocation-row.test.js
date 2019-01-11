import { shallow } from 'enzyme';
import mockProductDetails from 'mocks/seller-product-details';
import mockZones from 'mocks/zones';

import AllocationRow from './allocation-row';

function setup(newProps) {
  const allocation = mockProductDetails.product.variants[0].allocations[0];

  const props = {
    allocation,
    availableZones: mockZones,
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
  };

  const component = <AllocationRow {...props} {...newProps} />;
  const wrapper = shallow(component);
  return { wrapper, props };
}

describe('Seller Product Details Allocation Row', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render zone option name', () => {
    const { wrapper } = setup();
    const select = wrapper.find('StyledSelect');
    const option = { value: 'foo', text: 'bar' };
    expect(select.props().itemToString(option)).toEqual(option.text);
  });

  it('should update the zone', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('StyledSelect');
    const option = { value: 'foo', text: 'bar' };
    select.props().onChange(option);
    expect(props.onUpdate).toHaveBeenCalledWith({
      zone: { id: option.value, name: option.text },
    });
  });

  it('should update the price', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').first();
    const event = { target: { value: 10 } };
    select.props().onChange(event);
    expect(props.onUpdate).toHaveBeenCalledWith({ price: 10 });
  });

  it('should update the amount', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').last();
    const event = { target: { value: 10 } };
    select.props().onChange(event);
    expect(props.onUpdate).toHaveBeenCalledWith({ amount: 10 });
  });

  it('should update the active status', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('ToggleSwitch');
    select.props().onChange(true);
    expect(props.onUpdate).toHaveBeenCalledWith({ active: false });
  });
});
