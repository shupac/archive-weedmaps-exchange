// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { ToastAlertType } from 'lib/data-access/models/ui';
import { Link } from 'lib/routes';

import {
  NotificationDeck,
  Notification,
  NotificationMessage,
  NotificationCloseButton,
  NotificationTitle,
  NotificationContainer,
} from '@ghostgroup/ui.toast-notifications';
import { NotificationList, NotificationCard, NotificationLink } from './styles';

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

  pauseHandler = () => {
    const { uiStore } = this.props.store;
    uiStore.pause();
  };

  resumeHandler = () => {
    const { uiStore } = this.props.store;
    uiStore.resume();
  };

  renderNotification(notification: ToastAlertType) {
    return (
      <Notification key={notification.id}>
        <NotificationCard
          status={notification.status}
          onMouseEnter={this.pauseHandler}
          onMouseLeave={this.resumeHandler}
        >
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
          {notification.link !== null && (
            <Link to={notification.link.route}>
              <NotificationLink>{notification.link.label}</NotificationLink>
            </Link>
          )}
        </NotificationCard>
      </Notification>
    );
  }

  render() {
    const { notifications } = this.props.store.uiStore;

    return (
      <NotificationContainer>
        <NotificationList>
          {notifications.length && (
            <NotificationDeck top right>
              {notifications.map(notification =>
                this.renderNotification(notification),
              )}
            </NotificationDeck>
          )}
        </NotificationList>
      </NotificationContainer>
    );
  }
}

export default inject('store')(observer(ToastManager));
