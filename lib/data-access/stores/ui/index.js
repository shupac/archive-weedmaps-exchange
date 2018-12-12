// @flow
import { types } from 'mobx-state-tree';
import uniqueKey from 'lib/common/unique-key';
import { SimpleTimer } from '@ghostgroup/ui';
import { Toast } from 'models/ui';
import { MODAL_TRANSITION } from 'lib/common/constants';

type NotificationsType = {
  id?: string,
  body?: string,
  title: string,
  status: string,
  link?: {
    label: string,
    route: string,
  },
  autoDismiss?: number,
};

const UiStore = types
  .model('UiStore', {
    isLoading: false,
    notifications: types.array(Toast),
    activeModal: types.maybeNull(types.string),
    modalTransitioning: false,
  })
  .volatile(() => ({
    timers: [],
  }))
  .actions(self => ({
    notifyToast(alert: NotificationsType) {
      const notification = {
        id: uniqueKey(),
        body: alert.body,
        title: alert.title,
        status: alert.status,
        link: alert.link,
        autoDismiss: 0,
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
    openModal(activeModal) {
      if (!!self.activeModal !== !!activeModal) {
        self.setModalTransitioning(true);

        if (self.modalTimeout) clearTimeout(self.modalTimeout);

        self.modalTimeout = setTimeout(() => {
          self.setModalTransitioning(false);
          self.modalTimeout = undefined;
        }, MODAL_TRANSITION);
      }
      self.setActiveModal(activeModal);
    },
    closeModal() {
      self.openModal(null);
    },
    setActiveModal(activeModal) {
      self.activeModal = activeModal;
    },
    setModalTransitioning(transitioning) {
      self.modalTransitioning = transitioning;
    },
  }));

export type UIStoreType = {
  openModal: string => void,
  closeModal: () => void,
  modalTransitioning: boolean,
  isLoading: boolean,
  notifications: NotificationsType[],
  activeModal: string,
  notifyToast: (alert: NotificationsType) => string,
};

export default UiStore;
