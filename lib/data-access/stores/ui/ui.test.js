import { getSnapshot } from 'mobx-state-tree';
import UiStore from './';

jest.useFakeTimers();

function setup() {
  const uiStore = UiStore.create({}, {});
  return { uiStore };
}

describe('UI Store', () => {
  it('can create an instance of a model', () => {
    const { uiStore } = setup();
    expect(getSnapshot(uiStore)).toMatchSnapshot();
  });

  it('handles adding a toast alert', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '1234',
      title: 'toast title',
      body: 'toast body',
      status: 'SUCCESS',
    });
    expect(uiStore.notifications.length).toEqual(1);
  });

  it('handles dismissing a toast alert', () => {
    const { uiStore } = setup();
    uiStore.dismissToast('1234');
    expect(uiStore.notifications.length).toEqual(0);
  });

  it('should be able to receive a notification that will be auto dismissed', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '2345',
      title: 'toast title',
      body: 'toast body',
      autoDismiss: 3000,
      status: 'SUCCESS',
    });
    expect(uiStore.timers.length).toEqual(1);
    jest.runOnlyPendingTimers();
    expect(uiStore.timers.length).toEqual(0);
  });

  it('should be able to clear an auto-dismissible notification', () => {
    const { uiStore } = setup();
    uiStore.notifyToast({
      id: '2345',
      title: 'toast title',
      body: 'toast body',
      autoDismiss: 3000,
      status: 'SUCCESS',
    });
    expect(uiStore.timers.length).toEqual(1);
    expect(uiStore.notifications.length).toEqual(1);
  });
  it('should be able to pause and resume all auto-dismissible notifications', () => {
    const { uiStore } = setup();

    uiStore.notifyToast({
      id: '2345',
      title: 'toast title',
      body: 'toast body',
      autoDismiss: 3000,
      status: 'SUCCESS',
    });

    // Check to see that we do have a timer
    expect(uiStore.timers.length).toEqual(1);
    // and that the timer is not yet finished
    expect(uiStore.timers[0].timer.isFinished).toBe(false);

    // We pause all the timers
    uiStore.pause();

    // We attempt to run any timers that are set (which should be none)
    jest.runAllTimers();

    // We check that our timer is still not yet finished because it has been paused
    expect(uiStore.timers[0].timer.isFinished).toBe(false);

    uiStore.resume();

    jest.runAllTimers();

    // The timer should have run out and dismissed itself
    expect(uiStore.timers.length).toEqual(0);
  });

  it('handles opening and closing Modal', () => {
    const { uiStore } = setup();
    expect(uiStore.modalIsOpen).toEqual(false);
    uiStore.onOpenModal();
    expect(uiStore.modalIsOpen).toEqual(true);
    uiStore.onCloseModal();
    expect(uiStore.modalIsOpen).toEqual(false);
  });

  it('should handle setLocationId', () => {
    const { uiStore } = setup();
    uiStore.setLocationId('1234');
    expect(uiStore.locationId).toEqual('1234');
  });
});
