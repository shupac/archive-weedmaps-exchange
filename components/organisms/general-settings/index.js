// @flow
import React, { Component } from 'react';
import { computed, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import Loader from 'components/atoms/loader';
import { type AuthStoreType } from 'lib/data-access/stores/auth';
import { type Brands } from 'lib/data-access/models/brand';
import { type StoreType } from 'lib/types/store';
import GeneralSettingsForm from './general-settings-form';

const ETATimes = [
  { text: 'Minute(s)', value: 'min' },
  { text: 'Hour(s)', value: 'hr' },
  { text: 'Day(s)', value: 'day' },
  { text: 'Week(s)', value: 'week' },
];

type formValues = {
  minimumPurchasePrice: number,
  shippingFee: number,
  etaMin: number,
  etaMax: number,
  etaMinUnit: string,
  etaMaxUnit: string,
};

type Props = {
  store: StoreType,
};

export class GeneralSettings extends Component<Props> {
  get authStore(): AuthStoreType {
    return this.props.store.authStore;
  }

  @computed
  get brand(): Brands {
    return this.props.store.authStore.brand;
  }

  dispose = reaction(
    () => this.authStore.activeSellerBrand.value,
    brand => this.authStore.fetchBrand(brand),
  );

  componentDidMount() {
    this.authStore.fetchBrand(this.authStore.activeSellerBrand.value);
  }

  componentWillUnmount() {
    this.dispose();
  }

  handleSubmit = async (values: formValues) => {
    const brand = {
      minimum_purchase_price: values.minimumPurchasePrice,
      shipping_fee: values.shippingFee,
      delivery_eta: {
        eta_min_unit: values.etaMinUnit,
        eta_min: values.etaMin,
        eta_max_unit: values.etaMaxUnit,
        eta_max: values.etaMax,
      },
      name: this.authStore.activeSellerBrand.text,
      id: this.authStore.activeSellerBrand.value,
    };
    const successFlag = await this.authStore.updateBrand(brand);
    this.onConfirmToast(successFlag);
  };

  onConfirmToast = (successFlag: boolean) => {
    const { uiStore } = this.props.store;
    let notification;
    if (successFlag) {
      notification = {
        title: 'Settings Success',
        body: 'Your settings have been saved',
        autoDismiss: 3000,
        status: 'SUCCESS',
      };
      uiStore.closeModal();
    } else {
      notification = {
        title: 'Settings Error',
        body:
          'There was a problem saving your settings. Please check for any errors and try again',
        autoDismiss: 8000,
        status: 'ERROR',
      };
    }

    uiStore.notifyToast(notification);
  };

  render() {
    if (!this.brand) return <Loader />;

    return (
      <GeneralSettingsForm
        brand={this.brand}
        onSubmit={this.handleSubmit}
        etaTimes={ETATimes}
      />
    );
  }
}

export default inject('store')(observer(GeneralSettings));
