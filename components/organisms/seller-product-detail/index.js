// @flow
import React, { Component, Fragment } from 'react';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import { type SellerProductType } from 'models/seller-product';
import { type ZoneType } from 'models/zone';
import { Formik } from 'formik';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import UnsavedChangesModal from 'components/atoms/unsaved-changes-modal';
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

type Event = {
  preventDefault: () => void,
  returnValue: string,
};

export class SellerProductDetails extends Component<Props, State> {
  componentDidMount() {
    const { productId, store } = this.props;

    store.sellerProducts.fetchProductDetails(productId);
    store.zones.fetchZones();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });

    Router.events.on('routeChangeStart', this.handleRouteChange);
    Router.events.on('beforeHistoryChange', this.handleRouteChange);
    window.addEventListener('beforeunload', this.handleBrowserUnload);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChange);
    Router.events.off('beforeHistoryChange', this.handleRouteChange);
    window.removeEventListener('beforeunload', this.handleBrowserUnload);
  }

  state = {
    mounted: false,
  };

  isDirty: boolean;

  confirmRouteChange: boolean;

  nextRoute: string;

  handleRouteChange = (url: string) => {
    if (!this.isDirty || this.confirmRouteChange) return;

    const { uiStore } = this.props.store;
    this.nextRoute = url;
    uiStore.openModal('unsavedChanges');
    throw new Error('Unsaved changes: Seller product details');
  };

  handleBrowserUnload = (event: Event): ?string => {
    if (!this.isDirty || this.confirmRouteChange) return null;

    event.preventDefault();
    event.returnValue = 'You have unsaved changes!';
    return 'You have unsaved changes!';
  };

  onSubmit = async (values: SellerProductType, actions: FormikActions) => {
    const { sellerProducts } = this.props.store;
    actions.setSubmitting(true);
    await sellerProducts.updateSellerProduct(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  leavePage = () => {
    const { uiStore } = this.props.store;
    uiStore.closeModal();
    this.confirmRouteChange = true;
    Router.push(this.nextRoute);
  };

  render() {
    const { store } = this.props;

    const { mounted } = this.state;

    const {
      fetchingProductDetails,
      sellerProductDetails,
    } = store.sellerProducts;

    const { activeModal, closeModal } = store.uiStore;

    // so MobX updates component after zones load
    // $FlowFixMe
    const zones = store.zones.zones.toJSON();

    if (!mounted || fetchingProductDetails) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    return (
      <Fragment>
        <Formik
          initialValues={sellerProductDetails}
          onSubmit={this.onSubmit}
          render={this.renderForm(zones)}
        />
        {activeModal === 'unsavedChanges' && (
          <UnsavedChangesModal onStay={closeModal} onLeave={this.leavePage} />
        )}
      </Fragment>
    );
  }

  renderForm = (zones: ZoneType[]) => (formikProps: FormikProps) => {
    this.isDirty = formikProps.dirty;
    return <ProductForm zones={zones} {...formikProps} />;
  };
}

export default inject('store')(observer(SellerProductDetails));
