import React from 'react';
import { shallow } from 'enzyme';
import { ModalWithHeaderTemplate } from './index';

describe('ModalHeader', () => {
  const store = {
    uiStore: { modalIsOpen: false, onCloseModal: jest.fn() },
  };
  it('should handle have a modal header', () => {
    const component = shallow(<ModalWithHeaderTemplate store={store} />);
    expect(component.exists()).toEqual(true);
  });
});
