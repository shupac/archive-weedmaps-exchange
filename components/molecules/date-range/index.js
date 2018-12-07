// @flow
import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import uniqueKey from 'lib/common/unique-key';
import CalendarStyles from 'components/atoms/calendar-styles';
import { ChevronLeft, ChevronRight } from 'components/atoms/icons';

type DateRangeType = {
  startDate: moment,
  endDate: moment,
};

type Props = {
  setDateRange: DateRangeType => void,
  dateRange: DateRangeType,
};

type State = {
  focusedInput: ?boolean,
};

export class DateRange extends Component<Props, State> {
  state = {
    focusedInput: null,
  };

  render() {
    const { dateRange } = this.props;

    return (
      <CalendarStyles focusedInput={this.state.focusedInput}>
        <DateRangePicker
          startDate={dateRange.startDate}
          startDateId={uniqueKey()}
          endDate={dateRange.endDate}
          endDateId={uniqueKey()}
          onDatesChange={({ startDate, endDate }) =>
            this.props.setDateRange({ startDate, endDate })
          }
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          showDefaultInputIcon
          navPrev={<ChevronLeft />}
          navNext={<ChevronRight />}
          customArrowIcon={<span>&ndash;</span>}
          startDatePlaceholderText="Start date"
          endDatePlaceholderText="End Date"
          daySize={36}
          horizontalMonthPadding={16}
          horizontalMargin={200}
          verticalSpacing={1}
          showClearDates
          isOutsideRange={() => false}
        />
      </CalendarStyles>
    );
  }
}

export default DateRange;
