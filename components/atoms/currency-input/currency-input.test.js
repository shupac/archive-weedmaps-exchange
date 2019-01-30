import { shallow } from 'enzyme';
import CurrencyInput from './';

function setup() {
  const props = {
    value: '10.00',
    customHandleChange: k => k,
  };
  const component = <CurrencyInput {...props} />;
  const wrapper = shallow(component);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('CurrencyInput', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should handle change', () => {
    const { instance } = setup();
    const longNumberEvent = {
      currentTarget: {
        value: '15.00',
      },
    };
    expect(instance.state.value).toEqual('10.00');
    instance.handleChange(longNumberEvent);
    expect(instance.state.value).toEqual('15.00');

    const shortNumberEvent = {
      currentTarget: {
        value: '1.0',
      },
    };
    expect(instance.state.value).toEqual('15.00');
    instance.handleChange(shortNumberEvent);
    expect(instance.state.value).toEqual('0.10');
  });
});
