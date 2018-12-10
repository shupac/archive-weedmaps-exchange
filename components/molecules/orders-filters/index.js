import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { STATUS_TYPES } from 'lib/common/constants';
import DateRange from 'components/molecules/date-range';
import SearchBox from 'components/atoms/search-box';
import { FiltersRow, ComboSelect } from './styles';

export class OrdersFilters extends Component<Props, State> {
  onSelectBrands = selections => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter('brand', vals);
  };

  onSelectLocations = selections => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter('location', vals);
  };

  onSelectStatus = selections => {
    const { setFilter } = this.props;
    const vals = selections.map(({ value }) => value);
    setFilter('status', vals);
  };

  get statusOptions() {
    return Object.keys(STATUS_TYPES).map(value => ({
      value,
      text: STATUS_TYPES[value].text.toUpperCase(),
    }));
  }

  render() {
    const { setSearch, dateRange, setDateRange, buyerOrdersStore } = this.props;
    const { brandsFilterOptions, locationsFilterOptions } = buyerOrdersStore;

    return (
      <FiltersRow>
        <SearchBox onHandleSearch={setSearch} />
        <DateRange dateRange={dateRange} setDateRange={setDateRange} />
        <ComboSelect
          items={brandsFilterOptions}
          buttonId="BrandsFilter"
          placeholder="All Brands"
          onSelectionChange={this.onSelectBrands}
        />
        <ComboSelect
          items={locationsFilterOptions}
          buttonId="LocationFilter"
          placeholder="All Locations"
          onSelectionChange={this.onSelectLocations}
        />
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
