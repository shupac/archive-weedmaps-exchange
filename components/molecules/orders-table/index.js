import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import { formatDate } from 'lib/common/date';
import { formatDollars } from 'lib/common/strings';
import StatusPill from 'components/atoms/order-status-pill';
import StyledLink from 'components/atoms/styled-link';
import { SortButton } from 'components/atoms/sort-button';
import { Dots } from 'components/atoms/icons';
import { Table, HeadCol, Border, ActionHead } from './styles';

type State = {
  activeSort: string,
  sortDirection: string,
};

type Props = {
  store: StoreType,
};

export class OrdersTable extends Component<Props, State> {
  state = {
    activeSort: 'date_ordered',
    sortDirection: '-',
  };

  componentDidMount() {
    const { store } = this.props;
    store.buyerOrders.fetchPurchaseOrders({
      sort: '-date_ordered',
    });
  }

  onSort = key => {
    const { store } = this.props;
    const { sortDirection, activeSort } = this.state;
    let newSortDirection = sortDirection;
    if (activeSort === key) {
      newSortDirection = sortDirection === '' ? '-' : '';
    }
    store.buyerOrders.fetchPurchaseOrders({
      sort: `${sortDirection}${key}`,
    });
    this.setState({ activeSort: key, sortDirection: newSortDirection });
  };

  get isPointedUp() {
    return this.state.sortDirection === '-';
  }

  render() {
    const { store } = this.props;
    const { activeSort } = this.state;

    return (
      <Table>
        <ActionHead />
        <Fragment>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('order_id')}
              isActive={activeSort === 'order_id'}
              pointsUp={this.isPointedUp}
            >
              order id
            </SortButton>
          </HeadCol>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('date_ordered')}
              isActive={activeSort === 'date_ordered'}
              pointsUp={this.isPointedUp}
            >
              date ordered
            </SortButton>
          </HeadCol>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('brand_name')}
              isActive={activeSort === 'brand_name'}
              pointsUp={this.isPointedUp}
            >
              seller
            </SortButton>
          </HeadCol>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('location')}
              isActive={activeSort === 'location'}
              pointsUp={this.isPointedUp}
            >
              shipping location
            </SortButton>
          </HeadCol>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('expected_ship_date')}
              isActive={activeSort === 'expected_ship_date'}
              pointsUp={this.isPointedUp}
            >
              expected ship date
            </SortButton>
          </HeadCol>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('total')}
              isActive={activeSort === 'total'}
              pointsUp={this.isPointedUp}
            >
              {' '}
              total
            </SortButton>
          </HeadCol>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('status')}
              isActive={activeSort === 'status'}
              pointsUp={this.isPointedUp}
            >
              status
            </SortButton>
          </HeadCol>
          <span />
        </Fragment>

        {store.buyerOrders.ordersList.map(order => (
          <Fragment key={order.id}>
            <StyledLink href={`/buyer/orders/${order.id}`}>
              {order.id.substring(0, 6).toUpperCase()}
            </StyledLink>
            <p>{formatDate(order.orderDate)}</p>
            <p>{order.sellerData.sellerName}</p>
            <p>{order.buyerData.buyerLocationName}</p>
            <p>
              {formatDate(order.expectedShipDateMin)}-
              {formatDate(order.expectedShipDateMax)}
            </p>
            <p>{formatDollars(Number(order.total))}</p>
            <StatusPill status={order.status} />
            <Dots />
            <Border />
          </Fragment>
        ))}
      </Table>
    );
  }
}

export default inject('store')(observer(OrdersTable));
