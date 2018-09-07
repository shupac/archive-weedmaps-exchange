import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import { ToastManager } from './';

const mockUiStore = {
  notifications: [
    {
      title: 'Toast Title One',
      body: 'this is the toast body',
      id: '1234',
    },
    {
      title: 'Toast Title Two',
      body: 'this is the toast body 2',
      id: '5678',
    },
  ],
  notifyToast: jest.fn(),
  dismissToast: jest.fn(),
};

const mockStore = {
  uiStore: UiStore.create(mockUiStore),
};

describe('Toast Manager', () => {
  it('should render notifications', () => {
    const component = shallow(<ToastManager store={mockStore} />);
    expect(
      component
        .find('NotificationTitle')
        .first()
        .dive()
        .text(),
    ).toEqual('Toast Title One');
    expect(
      component
        .find('NotificationMessage')
        .first()
        .dive()
        .text(),
    ).toEqual('this is the toast body');
    expect(
      component
        .find('NotificationTitle')
        .last()
        .dive()
        .text(),
    ).toEqual('Toast Title Two');
    expect(
      component
        .find('NotificationMessage')
        .last()
        .dive()
        .text(),
    ).toEqual('this is the toast body 2');
  });
  it('should dismiss toast notifications', () => {
    const component = shallow(<ToastManager store={mockStore} />);
    const dismissToast = jest.spyOn(mockStore.uiStore, 'dismissToast');
    const closeButton = component.find('NotificationCloseButton').first();
    closeButton.simulate('click');
    expect(dismissToast).toHaveBeenCalledWith('1234');
  });
});
