// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { Notification as NotificationType } from 'lib/types/notifications';
import {
  NotificationDeck,
  Notification,
  NotificationCard,
  NotificationMessage,
  NotificationCloseButton,
  NotificationTitle,
  NotificationContainer,
} from '@ghostgroup/ui';

NotificationTitle.displayName = 'NotificationTitle';
NotificationMessage.displayName = 'NotificationMessage';

type Props = {
  store: {
    uiStore: any,
  },
};

export class ToastManager extends Component<Props> {
  createCloseHandler(id: string): () => void {
    return () => {
      const { uiStore } = this.props.store;
      uiStore.dismissToast(id);
    };
  }

  renderNotification(notification: NotificationType) {
    const notificationCardProps = {};

    return (
      <Notification key={notification.id}>
        <NotificationCard {...notificationCardProps}>
          <NotificationCloseButton
            onClick={this.createCloseHandler(notification.id)}
          />
          {notification.title !== null && (
            <NotificationTitle>
              {typeof notification.title === 'string' && notification.title}
            </NotificationTitle>
          )}
          {notification.body !== null && (
            <NotificationMessage>
              {typeof notification.body === 'string' && notification.body}
            </NotificationMessage>
          )}
        </NotificationCard>
      </Notification>
    );
  }

  render() {
    const { notifications } = this.props.store.uiStore;

    return (
      <NotificationContainer>
        {notifications.length && (
          <NotificationDeck top right>
            {notifications.map(notification =>
              this.renderNotification(notification),
            )}
          </NotificationDeck>
        )}
      </NotificationContainer>
    );
  }
}

export default inject('store')(observer(ToastManager));
