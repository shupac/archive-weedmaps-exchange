// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import { type SellerProductType } from 'models/seller-product';
import { type ZoneType } from 'models/zone';
import { Formik } from 'formik';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import ProductForm from './product-form';

type Props = {
  store: StoreType,
  productId: string,
};

type State = {
  mounted: boolean,
};

type FormikProps = {
  values: SellerProductType,
  handleChange: mixed => void,
  handleSubmit: mixed => void,
  handleReset: mixed => void,
  dirty: boolean,
  isSubmitting: boolean,
};

type FormikActions = {
  setSubmitting: boolean => void,
  resetForm: () => void,
};

export class SellerProductDetails extends Component<Props, State> {
  state = {
    mounted: false,
  };

  onSubmit = async (values: SellerProductType, actions: FormikActions) => {
    const { sellerProducts } = this.props.store;
    actions.setSubmitting(true);
    await sellerProducts.updateSellerProduct(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  componentDidMount() {
    const { productId, store } = this.props;

    store.sellerProducts.fetchProductDetails(productId);
    store.sellerSettings.fetchZones();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
  }

  render() {
    const { store } = this.props;

    const { mounted } = this.state;

    const {
      fetchingProductDetails,
      sellerProductDetails,
    } = store.sellerProducts;

    // so MobX updates component after zones load
    // $FlowFixMe
    const zones = store.sellerSettings.zones.toJSON();

    if (!mounted || fetchingProductDetails) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    return (
      <Formik
        initialValues={sellerProductDetails}
        onSubmit={this.onSubmit}
        render={this.renderForm(zones)}
      />
    );
  }

  renderForm = (zones: ZoneType[]) => (formikProps: FormikProps) => (
    <ProductForm zones={zones} {...formikProps} />
  );
}

export default inject('store')(observer(SellerProductDetails));
