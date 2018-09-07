import { types } from 'mobx-state-tree';
import uniqueKey from 'lib/common/unique-key';
import Toast from '../../models/toast';

const UiStore = types
  .model('UiStore', {
    isLoading: false,
    notifications: types.array(Toast),
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
  }));

export default UiStore;
