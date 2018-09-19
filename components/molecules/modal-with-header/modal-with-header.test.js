import React from 'react';
import { shallow } from 'enzyme';
import { ModalWithHeaderTemplate } from './index';
import SellerDetailModal from './seller-detail-modal';

describe('ModalHeader', () => {
  const store = {
    uiStore: { modalIsOpen: false, onCloseModal: jest.fn() },
  };
  it('should handle have a modal header', () => {
    const component = shallow(<ModalWithHeaderTemplate store={store} />);
    expect(component.exists()).toEqual(true);
  });
  it('should render the SellerDetailModal', () => {
    const props = {
      seller: {
        name: 'STIIZY',
        phone: '(555)-555-5555',
        email: 'weedmaps@weedmaps.com',
        licenses: [{ number: 'ACE-123-123-123', type: 'Medical Retailer' }],
      },
    };
    const component = shallow(<SellerDetailModal {...props} />);
    expect(component.exists()).toEqual(true);
  });
});
