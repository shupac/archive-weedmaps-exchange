import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { STATUS_TYPES } from 'lib/common/constants';
import DateRange from 'components/molecules/date-range';
import { ComboSelect } from '@ghostgroup/ui';
import SearchBox from 'components/atoms/search-box';
import FiltersRow from './styles';

export class OrdersFilters extends Component<Props, State> {
  onStatusFilter = selections => {
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
    const { setSearch } = this.props;
    return (
      <FiltersRow>
        <SearchBox onHandleSearch={setSearch} />
        <DateRange
          dateRange={this.props.dateRange}
          setDateRange={this.props.setDateRange}
        />
        <ComboSelect
          items={this.statusOptions}
          buttonId="StatusFilter"
          placeholder="All Statuses"
          onSelectionChange={this.onStatusFilter}
        />
      </FiltersRow>
    );
  }
}

export default inject('store')(observer(OrdersFilters));
