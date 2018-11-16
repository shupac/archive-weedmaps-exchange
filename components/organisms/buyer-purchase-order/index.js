// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import BackArrow from 'components/atoms/icons/back-arrow';
// import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { formatOrderId } from 'lib/common/strings';
import {
  PurchaseOrderWrapper,
  PurchaseOrderHeader,
  // PurchaseOrderDetails,
  // HeaderButtons,
} from './styles';

// const purchaseOrderDetailHeaders = [
//   'Seller Name',
//   'Date Ordered',
//   'Shipping Address',
//   'Expected Shipping Date',
//   'Status',
//   'Reason for Cancellation',
// ];

type Props = {
  orderId: string,
};

export class BuyerPurchaseOrder extends Component<Props> {
  render() {
    const { orderId } = this.props;

    return (
      <PurchaseOrderWrapper>
        <PurchaseOrderHeader>
          <div>
            <Link href="/buyer/orders">
              <a>
                <BackArrow />
              </a>
            </Link>
            <span style={{ marginLeft: '16px' }}>
              Purchase Order: {formatOrderId(orderId)}
            </span>
          </div>
        </PurchaseOrderHeader>
      </PurchaseOrderWrapper>
    );
  }
}
export default inject('store')(observer(BuyerPurchaseOrder));
