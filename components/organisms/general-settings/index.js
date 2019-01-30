// @flow
import React, { Component } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import set from 'lodash.set';
import { observable, action } from 'mobx';
import { Flex } from '@ghostgroup/grid-styled';
import Select from 'components/atoms/select';
import TextInput from 'components/atoms/forms/text-input';
import CurrencyInput from 'components/atoms/currency-input';
import Loader from 'components/atoms/loader';
import { stripNonNumbers } from 'lib/common/strings.js';
import { type AuthStoreType } from 'lib/data-access/stores/auth';
import { type Brands } from 'lib/data-access/models/brand';
import { type StoreType } from 'lib/types/store';
import {
  GeneralWrapper,
  GeneralHeader,
  GeneralBody,
  GeneralFooter,
  ShippingHeader,
  ShippingMinInputWrapper,
  ShippingETAWrapper,
  ButtonWrapper,
  CancelButton,
  AddButton,
  InputTitle,
  ErrorMessage,
} from './styles';

const ETATimes = [
  { text: 'Minute(s)', value: 'min' },
  { text: 'Hour(s)', value: 'hr' },
  { text: 'Day(s)', value: 'day' },
  { text: 'Week(s)', value: 'week' },
];

type ETATime = {
  text: string,
  value: string,
};

type Props = {
  store: StoreType,
};

export class GeneralSettings extends Component<Props> {
  @observable
  minimumPurchasePrice = this.brand.minimumPurchasePrice;

  @observable
  shippingFee = this.brand.shippingFee;

  @observable
  deliveryEta = {
    etaMin: {
      value: this.brand.deliveryEta.etaMin,
      unit: this.brand.deliveryEta.etaMinUnit,
    },
    etaMax: {
      value: this.brand.deliveryEta.etaMax,
      unit: this.brand.deliveryEta.etaMaxUnit,
    },
    error: '',
  };

  get authStore(): AuthStoreType {
    return this.props.store.authStore;
  }

  get brand(): Brands {
    return this.props.store.authStore.brand;
  }

  componentDidMount() {
    this.authStore.fetchBrand(this.authStore.activeSellerBrand.value);
  }

  @action
  handleShippingFeeChange = (value: string) => {
    this.shippingFee = value === '0.00' ? '' : value;
  };

  @action
  handleMinPurchaseChange = (value: string) => {
    this.minimumPurchasePrice = value === '0.00' ? '' : value;
  };

  @action
  handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const rangeValue =
      e.currentTarget.name === 'min-delivery-eta' ? 'etaMin' : 'etaMax';
    const valueAsWholeNumber = stripNonNumbers(e.currentTarget.value);
    this.deliveryEta = set(
      this.deliveryEta,
      `${rangeValue}.value`,
      parseInt(valueAsWholeNumber, 10) || '',
    );
    this.checkDeliveryEtaRange();
  };

  @action
  handleSelectChange = (item: ETATime, minOrMax: string) => {
    this.deliveryEta = set(this.deliveryEta, `${minOrMax}.unit`, item.value);
    this.checkDeliveryEtaRange();
  };

  @action
  handleSubmit = async () => {
    const brand = {
      minimum_purchase_price: this.minimumPurchasePrice,
      shipping_fee: this.shippingFee,
      delivery_eta: {
        eta_min_unit: this.deliveryEta.etaMin.unit,
        eta_min: this.deliveryEta.etaMin.value,
        eta_max_unit: this.deliveryEta.etaMax.unit,
        eta_max: this.deliveryEta.etaMax.value,
      },
      name: this.authStore.activeSellerBrand.text,
      id: this.authStore.activeSellerBrand.value,
    };
    const successFlag = await this.authStore.updateBrand(brand);
    this.onConfirmToast(successFlag);
  };

  @action
  handleCancel = () => {
    this.minimumPurchasePrice = this.brand.minimumPurchasePrice;
    this.shippingFee = this.brand.shippingFee;
    this.deliveryEta = {
      etaMin: {
        value: this.brand.deliveryEta.etaMin,
        unit: this.brand.deliveryEta.etaMinUnit,
      },
      etaMax: {
        value: this.brand.deliveryEta.etaMax,
        unit: this.brand.deliveryEta.etaMaxUnit,
      },
      error: '',
    };
  };

  checkDeliveryEtaRange = () => {
    const { etaMin, etaMax } = this.deliveryEta;
    const units = {
      hr: 'hours',
      min: 'minutes',
      day: 'days',
      week: 'weeks',
    };
    const startDuration = moment
      .duration(etaMin.value, units[etaMin.unit])
      .asMilliseconds();
    const endDuration = moment
      .duration(etaMax.value, units[etaMax.unit])
      .asMilliseconds();
    if (startDuration >= endDuration) {
      this.deliveryEta.error =
        'The min. value must be less than the max. value';
    } else if (!startDuration && endDuration) {
      this.deliveryEta.error = 'Please select min. value';
    } else {
      this.deliveryEta.error = '';
    }
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
      <GeneralWrapper>
        <GeneralHeader>General</GeneralHeader>
        <GeneralBody>
          <ShippingHeader>Shipping Minimum</ShippingHeader>
          <Flex>
            <ShippingMinInputWrapper>
              <InputTitle>Minimum Purchase</InputTitle>
              <CurrencyInput
                placeholder="ex. $50.00"
                customHandleChange={(value: string) =>
                  this.handleMinPurchaseChange(value)
                }
                value={parseInt(this.minimumPurchasePrice || '0', 10).toFixed(
                  2,
                )}
                data-test-id="minimum-purchase"
              />
            </ShippingMinInputWrapper>
            <ShippingMinInputWrapper>
              <InputTitle>Shipping Fee</InputTitle>
              <CurrencyInput
                placeholder="ex. $50.00"
                customHandleChange={(value: string) =>
                  this.handleShippingFeeChange(value)
                }
                value={parseInt(this.shippingFee || '0', 10).toFixed(2)}
                data-test-id="shipping-fee"
              />
            </ShippingMinInputWrapper>
          </Flex>
          <ShippingHeader>ETA For Shipping</ShippingHeader>
          <Flex>
            <ShippingETAWrapper>
              <TextInput
                name="min-delivery-eta"
                type="text"
                onChange={this.handleInputChange}
                value={this.deliveryEta.etaMin.value}
                pattern="[0-9]"
                hasError={!!this.deliveryEta.error}
              />
            </ShippingETAWrapper>
            <ShippingETAWrapper>
              <Select
                items={ETATimes}
                itemToString={item => item.text}
                selectedItem={ETATimes.find(
                  times => times.value === this.deliveryEta.etaMin.unit,
                )}
                onChange={value => this.handleSelectChange(value, 'etaMin')}
                hasError={!!this.deliveryEta.error}
              />
            </ShippingETAWrapper>
            <ShippingETAWrapper>to</ShippingETAWrapper>
            <ShippingETAWrapper>
              <TextInput
                name="max-delivery-eta"
                type="text"
                onChange={this.handleInputChange}
                value={this.deliveryEta.etaMax.value}
                pattern="[0-9]"
                hasError={false}
              />
            </ShippingETAWrapper>
            <ShippingETAWrapper>
              <Select
                items={ETATimes}
                itemToString={item => item.text}
                selectedItem={ETATimes.find(
                  times => times.value === this.deliveryEta.etaMax.unit,
                )}
                onChange={value => this.handleSelectChange(value, 'etaMax')}
              />
            </ShippingETAWrapper>
          </Flex>
          {this.deliveryEta.error && (
            <ErrorMessage>{this.deliveryEta.error}</ErrorMessage>
          )}
        </GeneralBody>
        <GeneralFooter>
          <ButtonWrapper>
            <CancelButton
              data-test-id="button-cancel"
              type="button"
              onClick={this.handleCancel}
            >
              Cancel
            </CancelButton>
            <AddButton
              data-test-id="button-submit"
              type="submit"
              onClick={this.handleSubmit}
              disabled={this.deliveryEta.error}
            >
              Save
            </AddButton>
          </ButtonWrapper>
        </GeneralFooter>
      </GeneralWrapper>
    );
  }
}

export default inject('store')(observer(GeneralSettings));
