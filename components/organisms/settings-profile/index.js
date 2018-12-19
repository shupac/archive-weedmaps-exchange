// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import BuyerProfile from './buyer-profile-form';

type Props = {
  store: StoreType,
};

class Profile extends Component<Props> {
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
    console.log('organization data', org)
    if (!org) return null;
    return (
      <div>
        <BuyerProfile
          organization={org}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default inject('store')(observer(Profile));
