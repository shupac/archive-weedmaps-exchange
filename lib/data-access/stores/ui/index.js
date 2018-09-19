import { types } from 'mobx-state-tree';
import uniqueKey from 'lib/common/unique-key';
import Toast from '../../models/ui';

const UiStore = types
  .model('UiStore', {
    isLoading: false,
    notifications: types.array(Toast),
    modalIsOpen: false,
  })
  .actions(self => ({
    notifyToast(alert) {
      const notification = {
        id: uniqueKey(),
        body: alert.body,
        title: alert.title,
      };
      self.notifications.push(notification);
    },
    dismissToast(id) {
      const notificationToClear = self.notifications.find(
        notification => notification.id === id,
      );
      self.notifications.remove(notificationToClear);
    },
    onOpenModal() {
      self.modalIsOpen = true;
    },
    onCloseModal() {
      self.modalIsOpen = false;
    },
  }));

type NotificationsType = {
  id: string,
  body: string,
  title: string,
};

export type UIStoreType = {
  onOpenModal: () => void,
  onCloseModal: () => void,
  isLoading: boolean,
  notifications: Array<NotificationsType>,
  modalIsOpen: boolean,
};

export default UiStore;
