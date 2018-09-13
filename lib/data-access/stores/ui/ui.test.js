import { getSnapshot } from 'mobx-state-tree';
import UiStore from './';

const mockUiStore = {
  notifications: [
    {
      title: 'Toast Title One',
      body: 'this is the toast body',
      id: '1234',
    },
    {
      title: 'Toast Title Two',
      body: 'this is the toast body',
      id: '5678',
    },
  ],
  modalIsOpen: false,
  notifyToast: jest.fn(),
};

describe('UI Store', () => {
  it('can create an instance of a model', () => {
    const uiStore = UiStore.create(mockUiStore);
    expect(getSnapshot(uiStore)).toMatchSnapshot();
  });

  it('handles adding a toast alert', () => {
    const uiStore = UiStore.create(mockUiStore);
    uiStore.notifyToast({
      title: 'toast title',
      body: 'toast body',
    });
    expect(uiStore.notifications.length).toEqual(3);
  });

  it('handles dismissing a toast alert', () => {
    const uiStore = UiStore.create(mockUiStore);
    uiStore.dismissToast('1234');
    expect(uiStore.notifications.length).toEqual(1);
  });

  it('handles opening and closing Modal', () => {
    const uiStore = UiStore.create(mockUiStore);
    expect(uiStore.modalIsOpen).toEqual(false);
    uiStore.onOpenModal();
    expect(uiStore.modalIsOpen).toEqual(true);
    uiStore.onCloseModal();
    expect(uiStore.modalIsOpen).toEqual(false);
  });
});
