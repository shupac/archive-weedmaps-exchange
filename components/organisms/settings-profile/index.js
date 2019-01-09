// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import Profile from './profile-form';

type Props = {
  store: StoreType,
};

class SettingsProfile extends React.Component<Props> {
  onSubmit = organization => {
    const { uiStore, authStore } = this.props.store;
    const notification = {
      title: 'Success Alert',
      body: 'Profile was updated successfully.',
      autoDismiss: 3000,
      status: 'SUCCESS',
    };
    authStore.updateOrganization(organization);
    uiStore.notifyToast(notification);
  };

  render() {
    const { org } = this.props.store.authStore;
    if (!org) return null;
    return <Profile organization={org} onSubmit={this.onSubmit} />;
  }
}

export default inject('store')(observer(SettingsProfile));
