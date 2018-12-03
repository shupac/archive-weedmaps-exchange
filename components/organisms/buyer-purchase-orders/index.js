import React, { Component } from 'react';
import type { StoreType } from 'lib/types/store';
import OrdersTable from 'components/molecules/orders-table';
import PageWrapper from './styles';

type Props = {
  orderId: string,
  store: StoreType,
};

export class BuyerPurchaseOrders extends Component<Props> {
  render() {
    return (
      <PageWrapper>
        <OrdersTable />
      </PageWrapper>
    );
  }
}
export default BuyerPurchaseOrders;
