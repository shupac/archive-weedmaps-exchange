// @flow
import React, { Component } from 'react';
import type { StoreType } from 'lib/types/store';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { observable, action, reaction, ObservableMap } from 'mobx';
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
};

export class BuyerPurchaseOrders extends Component<Props> {
  query = new ObservableMap();

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
    this.query.set('query', searchQuery);
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

  dispose = reaction(
    () => this.query.toJSON(),
    query => {
      const { buyerOrders } = this.props.store;
      buyerOrders.fetchPurchaseOrders(query);
    },
    { name: 'Search and fetch filters data' },
  );

  componentDidMount() {
    const { store } = this.props;
    store.buyerOrders.fetchPurchaseOrders({
      sort: '-date_ordered',
    });
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const { ordersListMeta } = this.props.store.buyerOrders;

    const { totalEntries, pageSize, pageNumber } = ordersListMeta;

    return (
      <PageWrapper>
        <OrdersFilters
          setFilter={this.setFilter}
          setDateRange={this.setDateRange}
          dateRange={this.dateRange}
          setSearch={this.setSearch}
        />
        <TableWrapper>
          <OrdersTable setSort={this.setSort} />

          <Pagination>
            <p>
              Showing {pageSize} of {totalEntries} Orders
            </p>
            <PagingControls
              pageCount={Math.ceil(totalEntries / pageSize)}
              currentPage={pageNumber && Number(pageNumber)}
              onSelectPage={this.setPage}
            />
          </Pagination>
        </TableWrapper>
      </PageWrapper>
    );
  }
}
export default inject('store')(observer(BuyerPurchaseOrders));
