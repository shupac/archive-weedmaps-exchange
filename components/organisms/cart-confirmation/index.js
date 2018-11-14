// @flow
import React, { Component } from 'react';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import { type PurchaseOrderType } from 'models/purchase-order';
import Breadcrumbs from 'components/molecules/breadcrumbs/index';
import OrderSummary from 'components/molecules/cart-order-summary';
import Loader from 'components/atoms/loader';
import {
  CartWrapper,
  CartLayout,
  CartMain,
  CartSidebar,
} from 'components/organisms/buyer-cart/styles';
import {
  OrderWrapper,
  OrderHeader,
  PurchaseOrders,
  POWrapper,
  POHeader,
  POButton,
} from './styles';

type Props = {
  orderId: string,
  store: StoreType,
};

class CartConfirmation extends Component<Props> {
  componentDidMount() {
    const { orderId, store } = this.props;
    store.buyerCart.fetchCartOrder(orderId);
  }

  viewPO = (id: string) => {
    Router.push(`/buyer/orders/${id}`);
  };

  render() {
    const { cartOrder } = this.props.store.buyerCart;

    if (!cartOrder) return <Loader />;

    return (
      <CartWrapper>
        <Breadcrumbs
          links={[
            { label: 'Buyer Home', route: '/buyer/marketplace/discover' },
          ]}
          activeLabel="Shopping Cart"
        />
        <CartLayout>
          <CartMain>
            <OrderWrapper>
              <OrderHeader>Order Submitted</OrderHeader>
              <PurchaseOrders>
                {this.renderPurchaseOrders(cartOrder.purchaseOrders)}
              </PurchaseOrders>
            </OrderWrapper>
          </CartMain>
          <CartSidebar>
            <OrderSummary
              cart={{
                ...cartOrder,
                items: [],
                brands: [],
                cartErrors: [],
              }}
              quantity={cartOrder.totalItems}
            />
          </CartSidebar>
        </CartLayout>
      </CartWrapper>
    );
  }

  renderPurchaseOrders = (purchaseOrders: PurchaseOrderType[]) =>
    purchaseOrders.map((po, index) => {
      const { id, sellerData } = po;
      const { name, phone, email, location } = sellerData;
      const {
        street_address: streetAddress,
        city,
        territory,
        postal_code: postalCode,
        country,
      } = JSON.parse(location.address);

      return (
        <POWrapper key={id}>
          <POHeader>
            Shipment {index + 1}: {name}
          </POHeader>
          <div>{streetAddress}</div>
          <div>
            {city}, {territory} {postalCode}
          </div>
          <div>{country}</div>
          <div>Phone: {phone}</div>
          <div>Email: {email}</div>
          <POButton onClick={() => this.viewPO(id)}>
            View Purchase Order
          </POButton>
        </POWrapper>
      );
    });
}

export default inject('store')(observer(CartConfirmation));
export { CartConfirmation };
