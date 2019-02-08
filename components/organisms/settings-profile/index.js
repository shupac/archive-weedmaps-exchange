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
    authStore.fetchBrand(authStore.activeSellerBrand.value);
  }

  componentWillUnmount() {
    this.onBrandChange();
  }

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
    const { org, activeContext, brand } = this.props.store.authStore;
    if (!org || !brand) return <Loader />;
    return (
      <ProfileSettingsForm
        settingsData={activeContext === 'seller' ? brand : org}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default inject('store')(observer(SettingsProfile));
