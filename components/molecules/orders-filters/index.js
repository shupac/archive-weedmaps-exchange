// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { STATUS_TYPES } from 'lib/common/constants';
import DateRange from 'components/molecules/date-range';
import SearchBox from 'components/atoms/search-box';
import { ComboSelect, BuyerFiltersRow, SellerFiltersRow } from './styles';

type DateRangeType = {
  startDate: moment,
  endDate: moment,
};

type Selection = {
  value: string,
  text: string,
};

type OrderStore = {
  sellerBrandsFilterOptions: Selection[],
  sellerLocationsFilterOptions: Selection[],
  sellerZonesFilterOptions: Selection[],
  brandsFilterOptions: Selection[],
  locationsFilterOptions: Selection[],
};

type Props = {
  setFilter: (string, any) => void,
  dateRange: any,
  buyersTable: boolean,
  setDateRange: DateRangeType => void,
  setSearch: string => void,
  ordersStore: OrderStore,
};

export class OrdersFilters extends Component<Props> {
  onSelectFilter = (filter: string) => (selections: Selection[]) => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter(filter, vals);
  };

  get statusOptions(): Selection[] {
    return Object.keys(STATUS_TYPES).map(value => ({
      value,
      text: STATUS_TYPES[value].text.toUpperCase(),
    }));
  }

  render() {
    const {
      setSearch,
      dateRange,
      setDateRange,
      buyersTable,
      ordersStore,
    } = this.props;
    const {
      sellerBrandsFilterOptions,
      sellerLocationsFilterOptions,
      sellerZonesFilterOptions,
      brandsFilterOptions,
      locationsFilterOptions,
    } = ordersStore;

    const FiltersRow = buyersTable ? BuyerFiltersRow : SellerFiltersRow;

    return (
      <FiltersRow>
        <SearchBox onHandleSearch={setSearch} />
        <DateRange dateRange={dateRange} setDateRange={setDateRange} />
        {buyersTable ? (
          <ComboSelect
            data-test-id="select-status"
            items={brandsFilterOptions}
            itemToString={item => item.text}
            buttonId="BrandsFilter"
            placeholder="All Brands"
            onSelectionChange={this.onSelectFilter('brand')}
          />
        ) : (
          <ComboSelect
            items={sellerBrandsFilterOptions}
            itemToString={item => item.text}
            buttonId="OrganizationsFilter"
            placeholder="All Organizations"
            onSelectionChange={this.onSelectFilter('buyer')}
          />
        )}
        <ComboSelect
          items={
            buyersTable ? locationsFilterOptions : sellerLocationsFilterOptions
          }
          itemToString={item => item.text}
          buttonId="LocationFilter"
          placeholder="All Locations"
          onSelectionChange={this.onSelectFilter('location')}
        />
        {!buyersTable && (
          <ComboSelect
            items={sellerZonesFilterOptions}
            itemToString={item => item.text}
            buttonId="ZoneFilter"
            placeholder="All Zones"
            onSelectionChange={this.onSelectFilter('zone_ids')}
          />
        )}
        <ComboSelect
          items={this.statusOptions}
          itemToString={item => item.text}
          buttonId="StatusFilter"
          placeholder="All Statuses"
          onSelectionChange={this.onSelectFilter('status')}
        />
      </FiltersRow>
    );
  }
}

export default observer(OrdersFilters);
