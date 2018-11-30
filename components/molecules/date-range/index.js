import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import uniqueKey from 'lib/common/unique-key';
import CalendarStyles from 'components/atoms/calendar-styles';
import { ChevronLeft, ChevronRight } from 'components/atoms/icons';

export class DateRange extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: false,
  };

  render() {
    return (
      <CalendarStyles focusedInput={this.state.focusedInput}>
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId={uniqueKey()}
          endDate={this.state.endDate}
          endDateId={uniqueKey()}
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
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
