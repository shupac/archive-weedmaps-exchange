// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import { type OrganizationType } from 'lib/data-access/models/organization';
import Profile from './profile-form';

type Props = {
  store: StoreType,
};

export class SettingsProfile extends React.Component<Props> {
  onConfirmToast = (successFlag: boolean) => {
    const { uiStore } = this.props.store;
    let notification;
    if (successFlag) {
      notification = {
        title: 'Success',
        body: 'Your organization has been saved',
        autoDismiss: 3000,
        status: 'SUCCESS',
      };
    } else {
      notification = {
        title: 'Error',
        body:
          'There was a problem saving your organization. Please check the address and try again',
        autoDismiss: 8000,
        status: 'ERROR',
      };
    }

    uiStore.notifyToast(notification);
  };

  onSubmit = async (organization: OrganizationType) => {
    const { authStore } = this.props.store;
    const successFlag = await authStore.updateOrganization(organization);
    this.onConfirmToast(successFlag);
  };

  render() {
    const { org } = this.props.store.authStore;
    if (!org) return null;
    return <Profile organization={org} onSubmit={this.onSubmit} />;
  }
}

export default inject('store')(observer(SettingsProfile));
