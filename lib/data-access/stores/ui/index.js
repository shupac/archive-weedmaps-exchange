import { types } from 'mobx-state-tree';
import uniqueKey from 'lib/common/unique-key';
import { SimpleTimer } from '@ghostgroup/ui';
import { Toast, Timer } from '../../models/ui';

const UiStore = types
  .model('UiStore', {
    isLoading: false,
    notifications: types.array(Toast),
    modalIsOpen: false,
  })
  .volatile(() => ({
    timers: [],
  }))
  .actions(self => ({
    notifyToast(alert) {
      const notification = {
        id: uniqueKey(),
        body: alert.body,
        title: alert.title,
        status: alert.status,
        link: alert.link,
      };
      if (alert.autoDismiss && typeof alert.autoDismiss === 'number') {
        notification.autoDismiss = alert.autoDismiss;

        self.setDismissTimer(notification.id, notification.autoDismiss);
      }
      self.notifications.push(notification);
      return notification.id;
    },
    setDismissTimer(id: string, delay: number) {
      self.timers.push({
        id,
        timer: new SimpleTimer(self.dismissTimer(id), delay, true),
      });
    },
    dismissTimer(id: string): () => void {
      return () => {
        self.removeTimer(id);
        self.dismissToast(id);
      };
    },
    removeTimer(id: string): void {
      const index = self.timers.findIndex(timer => timer.id === id);
      if (index !== -1) {
        self.timers.splice(index, 1);
      }
    },
    dismissToast(id) {
      const notificationToClear = self.notifications.find(
        notification => notification.id === id,
      );
      self.notifications.remove(notificationToClear);
    },
    pause() {
      self.timers.forEach(timer => {
        timer.timer.pause();
      });
    },
    resume() {
      self.timers.forEach(timer => {
        timer.timer.resume();
      });
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
  notifications: NotificationsType[],
  modalIsOpen: boolean,
};

export default UiStore;
