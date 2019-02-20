// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { type StoreType } from 'lib/types/store';
import { concatAddy } from 'lib/common/strings';
import unique from 'lib/common/unique-key';
import Loader from 'components/atoms/loader';
import LocationModal from 'components/molecules/location-modal';
import EmptyCartPage from 'components/organisms/buyer-cart/empty-cart';
import Breadcrumbs from 'components/molecules/breadcrumbs/index';
import CartOrderSummary from 'components/molecules/cart-order-summary';
import ShipmentCard from 'components/molecules/shipment-card';
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
    this.props.store.buyerCart.setCartSubmittingStatus(false);
  }

  render() {
    const { buyerCart, uiStore } = this.props.store;

    const {
      loadingCart,
      submittingCart,
      cartItemCount,
      cartItemsByBrand,
      cart,
      checkoutCart,
      allItemsUnavailable,
    } = buyerCart;

    if (loadingCart && !submittingCart) {
      return <Loader />;
    }

    if (!cartItemCount) {
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
            <CartMain>
              {this.renderAddressManager()}
              {uiStore.activeModal === 'cartModal' && <LocationModal />}
              {cartItemsByBrand &&
                cartItemsByBrand.map((brandItems, idx) => (
                  <ShipmentCard
                    key={unique()}
                    cartItems={brandItems}
                    index={idx}
                    count={cartItemsByBrand.length}
                  />
                ))}
            </CartMain>
            <CartSidebar>
              <CartOrderSummary
                cart={cart}
                onSubmit={checkoutCart}
                quantity={cart.items.length}
                isLoading={submittingCart}
                allItemsUnavailable={allItemsUnavailable}
              />
            </CartSidebar>
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
