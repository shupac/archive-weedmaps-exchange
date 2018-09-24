import React from 'react';
import { shallow } from 'enzyme';
import { CancelOrderModalTemplate } from './index';

describe('Cancel Order modal', () => {
  const onConfirm = jest.fn();

  const store = {
    uiStore: { modalIsOpen: false, onCloseModal: jest.fn() },
  };

  const component = shallow(
    <CancelOrderModalTemplate store={store} onConfirm={onConfirm} />,
  );

  it('should exist', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should triggers a passed down function when ButtonPrimary is clicked', () => {
    component.setState({ description: 'asdf' });
    component.find('ButtonPrimary').simulate('click');
    expect(onConfirm).toHaveBeenCalledWith('asdf');
    expect(component.state().description).toEqual('');
  });

  it('should handle the changes', () => {
    const instance = component.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    instance.handleChange('asdf');
    expect(setState).toHaveBeenCalledWith({ description: 'asdf' });
  });
});
