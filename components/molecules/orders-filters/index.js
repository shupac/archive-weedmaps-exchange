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
  onSelectBrands = (selections: Selection[]) => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter('brand', vals);
  };

  onSelectLocations = (selections: Selection[]) => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter('location', vals);
  };

  onSelectStatus = (selections: Selection[]) => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter('status', vals);
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
        <ComboSelect
          items={buyersTable ? brandsFilterOptions : sellerBrandsFilterOptions}
          buttonId="BrandsFilter"
          placeholder="All Brands"
          onSelectionChange={this.onSelectBrands}
        />
        <ComboSelect
          items={
            buyersTable ? locationsFilterOptions : sellerLocationsFilterOptions
          }
          buttonId="LocationFilter"
          placeholder="All Locations"
          onSelectionChange={this.onSelectLocations}
        />
        {!buyersTable && (
          <ComboSelect
            items={sellerZonesFilterOptions}
            buttonId="ZoneFilter"
            placeholder="All Zones"
            onSelectionChange={this.onSelectStatus}
          />
        )}
        <ComboSelect
          items={this.statusOptions}
          buttonId="StatusFilter"
          placeholder="All Statuses"
          onSelectionChange={this.onSelectStatus}
        />
      </FiltersRow>
    );
  }
}

export default observer(OrdersFilters);
