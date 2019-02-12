// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { type StoreType } from 'lib/types/store';
import Loader from 'components/atoms/loader';
import { type OrganizationType } from 'lib/data-access/models/organization';
import ProfileSettingsForm from './profile-form';

type Props = {
  store: StoreType,
};

export class SettingsProfile extends React.Component<Props> {
  onBrandChange = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.activeSellerBrand.value;
    },
    brand => {
      const { authStore } = this.props.store;
      authStore.fetchBrand(brand);
    },
    { name: 'Refetch Seller Profile on brand change' },
  );

  componentDidMount() {
    const { authStore } = this.props.store;
    if (authStore.activeContext === 'seller') {
      authStore.fetchBrand(authStore.activeSellerBrand.value);
    }
  }

  componentWillUnmount() {
    this.onBrandChange();
  }

  onConfirmToast = (successFlag: boolean) => {
    const { uiStore, authStore } = this.props.store;
    let notification;
    if (successFlag) {
      notification = {
        title: 'Success',
        body: `Your ${
          authStore.activeContext === 'buyer' ? 'organization' : 'brand'
        } has been saved`,
        autoDismiss: 3000,
        status: 'SUCCESS',
      };
    } else {
      notification = {
        title: 'Error',
        body: `There was a problem saving your ${
          authStore.activeContext === 'buyer' ? 'organization' : 'brand'
        }. Please check the address and try again`,
        autoDismiss: 8000,
        status: 'ERROR',
      };
    }

    uiStore.notifyToast(notification);
  };

  onSubmit = async (profileData: OrganizationType) => {
    const { authStore } = this.props.store;
    if (authStore.activeContext === 'buyer') {
      const successFlag = await authStore.updateOrganization(profileData);
      this.onConfirmToast(successFlag);
    } else {
      const successFlag = await authStore.updateBrand(profileData);
      this.onConfirmToast(successFlag);
    }
  };

  render() {
    const { org, activeContext, brand } = this.props.store.authStore;
    if (activeContext === 'buyer' && !org) return <Loader />;
    if (activeContext === 'seller' && !brand) return <Loader />;
    return (
      <ProfileSettingsForm
        settingsData={activeContext === 'seller' ? brand : org}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default inject('store')(observer(SettingsProfile));
