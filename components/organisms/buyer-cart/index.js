// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { type StoreType } from 'lib/types/store';
import { concatAddy } from 'lib/common/strings';
import EmptyCartPage from 'components/organisms/buyer-cart/empty-cart';
import Breadcrumbs from 'components/molecules/breadcrumbs/index';
import AddressManager from 'components/molecules/address-manager';
import { CartWrapper, CartLayout, CartMain, CartSidebar } from './styles';

type Props = {
  store: StoreType,
};

export class BuyerCart extends Component<Props> {
  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.selectedLocation;
    },
    () => {
      const { buyerCart } = this.props.store;
      buyerCart.fetchCart();
    },
    { name: 'Refetch cart in BuyerCart' },
  );

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const { buyerCart } = this.props.store;

    if (buyerCart.cartItemCount < 1) {
      return <EmptyCartPage />;
    }
    return (
      <Fragment>
        <CartWrapper>
          <Breadcrumbs
            links={[
              { label: 'Buyer Home', route: '/buyer/marketplace/discover' },
            ]}
            activeLabel="Shopping Cart"
          />
          <CartLayout>
            <CartMain>{this.renderAddressManager()}</CartMain>
            <CartSidebar />
          </CartLayout>
        </CartWrapper>
      </Fragment>
    );
  }

  renderAddressManager() {
    const { buyerSettings } = this.props.store;
    const { locations, activeLocation } = buyerSettings;
    const addressOptions = locations.map(({ name, address, id }) => ({
      text: concatAddy(name, address),
      value: id,
    }));
    const activeAddress = activeLocation
      ? {
          text: concatAddy(activeLocation.name, activeLocation.address),
          value: activeLocation.id,
        }
      : null;

    return (
      <AddressManager
        addresses={addressOptions}
        selectedAddress={activeAddress}
        onSelectAddress={buyerSettings.updateActiveLocation}
      />
    );
  }
}

export default inject('store')(observer(BuyerCart));
