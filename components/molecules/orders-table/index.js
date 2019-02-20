import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import get from 'lodash.get';
import { formatDate } from 'lib/common/date';
import { formatDollars } from 'lib/common/strings';
import StatusPill from 'components/atoms/order-status-pill';
import StyledLink from 'components/atoms/styled-link';
import { SortButton } from 'components/atoms/sort-button';
import EmptyState from 'components/atoms/empty-state';
import ContextMenu, { MenuItem } from 'components/molecules/context-menu';
import { STATUS_TYPES } from 'lib/common/constants';
import { PurchaseOrderType } from 'models/purchase-order';
import StatusPillDropDown from 'components/atoms/order-status-pill/status-pill-dropdown';
import { Table, HeadCol, Border, ActionHead } from './styles';

type State = {
  activeSort: string,
  sortDirection: string,
};

type Props = {
  orders: PurchaseOrderType[],
  setSort: string => void,
  onCancelOrder: string => void,
  onReorder: string => void,
  buyersTable: false,
  onStatusChange: string => void,
};

export class OrdersTable extends Component<Props, State> {
  state = {
    activeSort: 'date_ordered',
    sortDirection: '-',
  };

  onSort = key => {
    const { setSort } = this.props;
    const { sortDirection, activeSort } = this.state;
    let newSortDirection = sortDirection;

    if (activeSort === key) {
      newSortDirection = sortDirection === '' ? '-' : '';
    }

    setSort(`${newSortDirection}${key}`);
    this.setState({ activeSort: key, sortDirection: newSortDirection });
  };

  get isPointedUp() {
    return this.state.sortDirection === '-';
  }

  render() {
    const {
      orders,
      onCancelOrder,
      onReorder,
      buyersTable,
      onStatusChange,
    } = this.props;
    const { activeSort } = this.state;
    const customerType = buyersTable ? 'buyer' : 'seller';

    return (
      <Table>
        <ActionHead />
        <Fragment>
          <HeadCol>
            <SortButton
              onClick={() => this.onSort('purchase_order_id')}
              isActive={activeSort === 'purchase_order_id'}
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
          {buyersTable ? (
            <HeadCol>
              <SortButton
                onClick={() => this.onSort('brand_name')}
                isActive={activeSort === 'brand_name'}
                pointsUp={this.isPointedUp}
              >
                seller
              </SortButton>
            </HeadCol>
          ) : (
            <HeadCol>
              <SortButton
                onClick={() => this.onSort('buyer')}
                isActive={activeSort === 'buyer'}
                pointsUp={this.isPointedUp}
              >
                buyer
              </SortButton>
            </HeadCol>
          )}
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
              {buyersTable ? 'expected ship date' : 'zone'}
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

        {orders.length === 0 && (
          <EmptyState
            data-test-id="empty-results"
            image="no_results_found"
            title="No Orders Found"
            body="Try adjusting your search or filters to find what you're
            looking for."
          />
        )}

        {orders.map(order => {
          const cancelable = get(
            STATUS_TYPES,
            [order.status, 'cancelable'],
            false,
          );

          const {
            id,
            orderDate,
            sellerData,
            buyerData,
            expectedShipDateMin,
            expectedShipDateMax,
            zoneName,
            total,
            status,
            statusChangeOptions,
            selectedOption,
          } = order;

          return (
            <Fragment key={id}>
              <StyledLink route={`/${customerType}/orders/${id}`}>
                {id.substring(0, 6).toUpperCase()}
              </StyledLink>
              <p>{formatDate(orderDate)}</p>
              <p>
                {customerType === 'buyer'
                  ? sellerData.sellerName
                  : buyerData.buyerName}
              </p>
              <p>{buyerData.buyerLocationName}</p>
              {customerType === 'buyer' ? (
                <p>
                  {formatDate(expectedShipDateMin)}-
                  {formatDate(expectedShipDateMax)}
                </p>
              ) : (
                <p>{zoneName}</p>
              )}
              <p>{formatDollars(Number(total))}</p>
              {buyersTable ? (
                <StatusPill status={status} />
              ) : (
                <StatusPillDropDown
                  status={status}
                  orderId={id}
                  options={statusChangeOptions}
                  selectedOption={selectedOption}
                  onChange={onStatusChange(id)}
                />
              )}
              {buyersTable && (
                <ContextMenu>
                  {cancelable && (
                    <MenuItem onClick={() => onCancelOrder(id)}>
                      Cancel
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => onReorder(id)}>Reorder</MenuItem>
                </ContextMenu>
              )}
              <Border />
            </Fragment>
          );
        })}
      </Table>
    );
  }
}

export default observer(OrdersTable);
