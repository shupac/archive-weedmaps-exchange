// @flow
import React, { Component } from 'react';
import { observable, action, reaction, ObservableMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { getPaginationText } from 'lib/common/strings';
import { type StoreType } from 'lib/types/store';
import EmptyState from 'components/atoms/empty-state';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import OrdersFilters from 'components/molecules/orders-filters';
import OrdersTable from 'components/molecules/orders-table';
import PagingControls from 'components/molecules/paging-controls';
import { PageWrapper, TableWrapper, Pagination } from './styles';

type DateRange = {
  startDate?: moment | null,
  endDate?: moment | null,
};

type Props = {
  store: StoreType,
  onCancelOrder: string => void,
  onReorder: string => void,
};

type State = {
  mounted: boolean,
};

export class BuyerPurchaseOrders extends Component<Props, State> {
  state = {
    mounted: false,
  };

  query = new ObservableMap();

  defaultQuery = {
    sort: '-date_ordered',
  };

  @observable
  dateRange = {};

  @action
  setFilter = (column: string, filters: string) => {
    this.query.set([`filter[${column}]`], filters);
  };

  @action
  setSort = (sort: string) => {
    this.query.set('sort', sort);
  };

  @action
  setPage = (pageNo: number) => {
    this.query.set([`page[number]`], pageNo);
  };

  @action
  setSearch = (searchQuery: string) => {
    this.query.set('purchase_order_query', searchQuery);
  };

  stringifyDate = (momentObj: ?moment) => {
    if (momentObj === null) {
      return '';
    }
    return moment(momentObj).format('YYYY-MM-DD');
  };

  setDateRange = (dateRange: DateRange) => {
    this.dateRange = dateRange;
    this.setFilter('start_date', this.stringifyDate(dateRange.startDate));
    this.setFilter('end_date', this.stringifyDate(dateRange.endDate));
  };

  disposeFetchOrders = reaction(
    () => this.query.toJSON(),
    query => {
      const { buyerOrders } = this.props.store;

      buyerOrders.fetchPurchaseOrders({
        ...this.defaultQuery,
        ...query,
      });
    },
    { name: 'Search and fetch filters data' },
  );

  componentDidMount() {
    const { store } = this.props;

    store.buyerOrders.fetchPurchaseOrders(this.defaultQuery);

    store.buyerOrders.fetchPOSellers();
    // eslint-disable-next-line
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.disposeFetchOrders();
  }

  render() {
    const { mounted } = this.state;
    const { store, onCancelOrder, onReorder } = this.props;
    const { buyerOrders } = store;
    const { ordersLoading } = buyerOrders;
    const { totalEntries, pageSize, pageNumber } = buyerOrders.ordersListMeta;
    const paginationText = getPaginationText(
      totalEntries,
      pageSize,
      pageNumber,
      'Orders',
    );

    const { ordersList } = buyerOrders;

    if ((!mounted || ordersLoading) && !this.query.size) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    if (!ordersList.length && !this.query.size) {
      return (
        <EmptyState
          image="no_orders_yet"
          title="No Orders Yet"
          body="Once you submit an order, it will show up here. Then you can track the status of current orders and view order history."
          route="/buyer/marketplace/discover"
          buttonLabel="browse products"
        />
      );
    }

    return (
      <PageWrapper>
        <OrdersFilters
          setFilter={this.setFilter}
          setDateRange={this.setDateRange}
          dateRange={this.dateRange}
          setSearch={this.setSearch}
          ordersStore={buyerOrders}
          buyersTable
        />
        <TableWrapper>
          <OrdersTable
            // force MST to update component when order status changes
            orders={ordersList.map(o => ({ ...o }))}
            setSort={this.setSort}
            onCancelOrder={onCancelOrder}
            onReorder={onReorder}
            buyersTable
          />

          {totalEntries >= 1 && (
            <Pagination>
              <p>{paginationText}</p>
              <PagingControls
                pageCount={Math.ceil(totalEntries / pageSize)}
                currentPage={pageNumber && Number(pageNumber)}
                onSelectPage={this.setPage}
              />
            </Pagination>
          )}
        </TableWrapper>
      </PageWrapper>
    );
  }
}

export default inject('store')(observer(BuyerPurchaseOrders));
