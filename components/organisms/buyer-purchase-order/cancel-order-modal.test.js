import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary } from 'components/atoms/button';
import CancelOrderModal from './cancel-order-modal';

function setup(props) {
  const store = { uiStore: UiStore.create() };
  const component = <CancelOrderModal store={store} {...props} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper };
}

describe('Cancel Order Modal', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should handle textarea onChange', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const onChange = jest.spyOn(instance, 'onChange');
    wrapper
      .find(TextArea)
      .first()
      .simulate('change', { target: { value: 'foo' } });
    expect(onChange).toHaveBeenCalledWith('foo');
    expect(instance.reason).toEqual('foo');
    onChange.mockRestore();
  });

  it('should submit the form', () => {
    const onSubmit = jest.fn();
    const { wrapper } = setup({
      status: 'not started',
      cancelable: true,
      onSubmit,
    });
    wrapper
      .find(TextArea)
      .first()
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find(ButtonPrimary)
      .first()
      .simulate('click');
    expect(onSubmit).toHaveBeenCalledWith('foo');
  });
});
