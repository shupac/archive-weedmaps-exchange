import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import { ALERT_STATUS } from 'lib/common/constants';
import { getStatusBorder } from './styles';
import { ToastManager } from './';

function setup() {
  const uiStore = UiStore.create({}, {});
  return { uiStore };
}

describe('Toast Manager', () => {
  it('should render notification without link', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title',
      body: 'toast body',
      status: ALERT_STATUS.SUCCESS,
    });
    const component = shallow(<ToastManager store={{ uiStore }} />);
    expect(
      component
        .find('NotificationTitle')
        .first()
        .dive()
        .text(),
    ).toEqual('toast title');
    expect(
      component
        .find('NotificationMessage')
        .first()
        .dive()
        .text(),
    ).toEqual('toast body');
  });
  it('should render notification with link', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title with link',
      body: 'toast body with link',
      status: ALERT_STATUS.ERROR,
      link: { label: 'link label', route: '/link-route' },
    });
    const component = shallow(<ToastManager store={{ uiStore }} />);
    expect(
      component
        .find('NotificationTitle')
        .first()
        .dive()
        .text(),
    ).toEqual('toast title with link');
    expect(
      component
        .find('NotificationMessage')
        .first()
        .dive()
        .text(),
    ).toEqual('toast body with link');
    expect(
      component
        .find('NotificationLink')
        .first()
        .dive()
        .text(),
    ).toEqual('link label');
  });
  it('should render success status prop', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title with link',
      body: 'toast body with link',
      status: ALERT_STATUS.SUCCESS,
    });
    const component = shallow(<ToastManager store={{ uiStore }} />);
    expect(component.find('NotificationCard').props().status).toEqual(
      'SUCCESS',
    );
  });
  it('should render error status prop', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title with link',
      body: 'toast body with link',
      status: ALERT_STATUS.ERROR,
    });
    const component = shallow(<ToastManager store={{ uiStore }} />);

    expect(component.find('NotificationCard').props().status).toEqual('ERROR');
  });
  it('should render green border for success status', () => {
    const successStatus = getStatusBorder(ALERT_STATUS.SUCCESS);
    expect(successStatus).toEqual('3px solid #00B359');
    const errorStatus = getStatusBorder(ALERT_STATUS.ERROR);
    expect(errorStatus).toEqual('3px solid #D0021B');
    const noStatus = getStatusBorder();
    expect(noStatus).toEqual('unset');
  });
  it('should be able to pause and resume auto dismiss timers when mouse enters and leaves a notification card', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title with link',
      body: 'toast body with link',
      status: 'ERROR',
      link: { label: 'link label', route: '/link-route' },
    });

    const pause = jest.spyOn(uiStore, 'pause').mockReturnValue();
    const resume = jest.spyOn(uiStore, 'resume').mockReturnValue();

    const tree = shallow(<ToastManager store={{ uiStore }} />);
    const card = tree.find('NotificationCard').first();

    card.simulate('mouseEnter');
    expect(pause).toHaveBeenCalled();

    card.simulate('mouseLeave');
    expect(resume).toHaveBeenCalled();
  });

  it('should dismiss toast notifications', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title with link',
      body: 'toast body with link',
      status: 'ERROR',
      link: { label: 'link label', route: '/link-route' },
    });
    const component = shallow(<ToastManager store={{ uiStore }} />);
    const dismissToast = jest.spyOn(uiStore, 'dismissToast');
    const closeButton = component.find('NotificationCloseButton').first();
    closeButton.simulate('click');
    expect(dismissToast).toHaveBeenCalled();
  });
});
