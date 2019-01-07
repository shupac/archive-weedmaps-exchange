import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import { WmTheme } from '@ghostgroup/ui';
import { color } from 'lib/styles/theme-getters';

const { state, background, border, text, icon } = WmTheme.style;

const CALENDAR_HEIGHT = '290px';

// react-dates classnames
const CalendarStyles = styled.div`
  .PresetDateRangePicker_panel {
    padding: 0 ${rem(22)} ${rem(11)};
  }
  .PresetDateRangePicker_button {
    position: relative;
    height: 100%;
    text-align: center;
    background: 0 0;
    border: ${rem(2)} solid #00a699;
    color: #00a699;
    padding: ${rem(4)} ${rem(12)};
    margin-right: ${rem(8)};
    font: inherit;
    font-weight: 700;
    line-height: normal;
    overflow: visible;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
  }
  .PresetDateRangePicker_button:active {
    outline: 0;
  }
  .PresetDateRangePicker_button__selected {
    color: #fff;
    background: #00a699;
  }
  .SingleDatePicker {
    position: relative;
    display: inline-block;
  }
  .SingleDatePicker__block {
    display: block;
  }
  .SingleDatePicker_picker {
    z-index: 5;
    background-color: ${color('white')};
    position: absolute;
    top: ${rem(43)} !important;
  }
  .SingleDatePicker_picker__rtl {
    direction: rtl;
  }
  .SingleDatePicker_picker__directionLeft {
    left: 0;
  }
  .SingleDatePicker_picker__directionRight {
    right: 0;
  }
  .SingleDatePicker_picker__portal {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .SingleDatePicker_picker__fullScreenPortal {
    background-color: #fff;
  }
  .SingleDatePicker_closeButton {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: ${rem(15)};
    z-index: 2;
  }
  .SingleDatePicker_closeButton:focus,
  .SingleDatePicker_closeButton:hover {
    color: darken(#cacccd, 10%);
    text-decoration: none;
  }
  .SingleDatePicker_closeButton_svg {
    height: ${rem(15)};
    width: ${rem(15)};
    fill: #cacccd;
  }
  .SingleDatePickerInput {
    display: flex;
    flex-direction: row-reverse;
    background-color: #fff;
  }
  .SingleDatePickerInput__withBorder {
    border: ${rem(1)} solid
      ${props => (props.focused ? color('teal') : color('iron'))};
    border-radius: ${rem(3)};
    height: ${rem(36)};
  }
  .SingleDatePickerInput__rtl {
    direction: rtl;
  }
  .SingleDatePickerInput__disabled {
    background-color: #f2f2f2;
  }
  .SingleDatePickerInput__block {
    display: block;
  }
  .SingleDatePickerInput__showClearDate {
    padding-right: ${rem(30)};
  }
  .SingleDatePickerInput_clearDate {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    padding: ${rem(10)};
    margin: 0 ${rem(10)} 0 ${rem(5)};
    position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .SingleDatePickerInput_clearDate__default:focus,
  .SingleDatePickerInput_clearDate__default:hover {
    background: #dbdbdb;
    border-radius: 50%;
  }
  .SingleDatePickerInput_clearDate__small {
    padding: ${rem(6)};
  }
  .SingleDatePickerInput_clearDate__hide {
    visibility: hidden;
  }
  .SingleDatePickerInput_clearDate_svg {
    fill: #82888a;
    height: ${rem(12)};
    width: ${rem(15)};
    vertical-align: middle;
  }
  .SingleDatePickerInput_clearDate_svg__small {
    height: ${rem(9)};
  }
  .SingleDatePickerInput_calendarIcon {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    padding: ${rem(5)} ${rem(10)} ${rem(10)} ${rem(10)};
    margin: 0 ${rem(5)} 0 ${rem(10)};
  }
  .SingleDatePickerInput_calendarIcon_svg {
    fill: ${props => (props.focused ? '#00cdbe' : '#999999')};
    height: ${rem(15)};
    width: ${rem(14)};
    vertical-align: middle;
  }
  .DateRangePicker {
    position: relative;
    display: inline-block;
  }
  .DateRangePicker__block {
    display: block;
  }
  .DateRangePicker_picker {
    z-index: 5;
    background-color: #fff;
    position: absolute;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .DateRangePicker_picker__rtl {
    direction: rtl;
  }
  .DateRangePicker_picker__directionLeft {
    left: 0;
  }
  .DateRangePicker_picker__directionRight {
    right: 0;
  }
  .DateRangePicker_picker__portal {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .DateRangePicker_picker__fullScreenPortal {
    background-color: #fff;
  }
  .DateRangePicker_closeButton {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: ${rem(15)};
    z-index: 2;
  }
  .DateRangePicker_closeButton:focus,
  .DateRangePicker_closeButton:hover {
    color: darken(#cacccd, 10%);
    text-decoration: none;
  }
  .DateRangePicker_closeButton_svg {
    height: ${rem(15)};
    width: ${rem(15)};
    fill: #cacccd;
  }
  .DayPicker {
    position: relative;
    text-align: left;
    left: ${rem(1)};
    &:after {
      content: '';
      width: 100%;
      height: 40px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${background.secondary};
      border-bottom: 1px solid ${icon.inverted};
      z-index: -1;
    }
    &:before {
      content: '';
      height: 100%;
      width: 1px;
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(50%);
      background-color: ${icon.inverted};
    }
  }
  .DayPicker__horizontal {
  }
  .DayPicker__verticalScrollable {
    height: 100%;
  }
  .DayPicker__hidden {
    visibility: hidden;
  }
  .DayPicker__withBorder {
    width: 580px !important;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.07);
    border: 1px solid transparent;
    border-radius: ${rem(3)};
  }
  .DayPicker_portal__horizontal {
    box-shadow: none;
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .DayPicker_portal__vertical {
    position: initial;
  }
  .DayPicker_focusRegion {
    outline: 0;
  }
  .DayPicker_weekHeaders {
    position: relative;
  }
  .DayPicker_weekHeaders__horizontal {
  }
  .DayPicker_weekHeader {
    width: 100%;
    color: ${text.normal};
    position: absolute;
    top: 50px;
    padding: 0;
    text-align: left;
    font-weight: 600;
    font-size: ${rem(14)};
  }
  .DayPicker_weekHeader__vertical {
    left: 50%;
  }

  .DayPicker_weekHeader_ul {
    list-style: none;
    margin: ${rem(1)} 0;
    padding-left: 0;
    padding-right: 0;
    font-size: ${rem(14)};
  }
  .DayPicker_weekHeader_li {
    display: inline-block;
    text-align: center;
  }
  .DayPicker_transitionContainer {
    height: 290px !important;
    position: relative;
    overflow: hidden;
    border-radius: ${rem(3)};
  }
  .DayPicker_transitionContainer__horizontal {
    -webkit-transition: height 0.2s ease-in-out;
    -moz-transition: height 0.2s ease-in-out;
    transition: height 0.2s ease-in-out;
  }
  .DayPicker_transitionContainer__vertical {
    width: 100%;
  }
  .DayPicker_transitionContainer__verticalScrollable {
    padding-top: ${rem(20)};
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: scroll;
  }
  .DayPickerKeyboardShortcuts_buttonReset {
    background: 0 0;
    border: 0;
    border-radius: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;
    cursor: pointer;
    font-size: ${rem(14)};
  }
  .DayPickerKeyboardShortcuts_buttonReset:active {
    outline: 0;
  }
  .DayPickerKeyboardShortcuts_show {
    width: ${rem(22)};
    position: absolute;
    z-index: 2;
    display: none;
  }
  .DayPickerKeyboardShortcuts_show__bottomRight {
    border-top: ${rem(26)} solid transparent;
    border-right: ${rem(33)} solid #00a699;
    bottom: 0;
    right: 0;
  }
  .DayPickerKeyboardShortcuts_show__bottomRight:hover {
    border-right: ${rem(33)} solid #008489;
    display: none;
  }
  .DayPickerKeyboardShortcuts_show__topRight {
    border-bottom: ${rem(26)} solid transparent;
    border-right: ${rem(33)} solid #00a699;
    top: 0;
    right: 0;
  }
  .DayPickerKeyboardShortcuts_show__topRight:hover {
    border-right: ${rem(33)} solid #008489;
  }
  .DayPickerKeyboardShortcuts_show__topLeft {
    border-bottom: ${rem(26)} solid transparent;
    border-left: ${rem(33)} solid #00a699;
    top: 0;
    left: 0;
  }
  .DayPickerKeyboardShortcuts_show__topLeft:hover {
    border-left: ${rem(33)} solid #008489;
  }
  .DayPickerKeyboardShortcuts_showSpan {
    color: #fff;
    position: absolute;
    display: none;
  }
  .DayPickerKeyboardShortcuts_showSpan__bottomRight {
    bottom: 0;
    right: -${rem(28)};
    display: none;
  }
  .DayPickerKeyboardShortcuts_showSpan__topRight {
    top: ${rem(1)};
    right: -${rem(28)};
    display: none;
  }
  .DayPickerKeyboardShortcuts_showSpan__topLeft {
    top: ${rem(1)};
    left: -${rem(28)};
    display: none;
  }
  .DayPickerKeyboardShortcuts_panel {
    overflow: auto;
    background: #fff;
    border: ${rem(1)} solid #dbdbdb;
    border-radius: ${rem(2)};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
    padding: ${rem(22)};
    margin: ${rem(33)};
    display: none;
  }
  .DayPickerKeyboardShortcuts_title {
    font-size: ${rem(16)};
    font-weight: 700;
    margin: 0;
  }
  .DayPickerKeyboardShortcuts_list {
    list-style: none;
    padding: 0;
    font-size: ${rem(14)};
  }
  .DayPickerKeyboardShortcuts_close {
    position: absolute;
    right: ${rem(22)};
    top: ${rem(22)};
    z-index: 2;
  }
  .DayPickerKeyboardShortcuts_close:active {
    outline: 0;
  }
  .DayPickerKeyboardShortcuts_closeSvg {
    height: ${rem(15)};
    width: ${rem(15)};
    fill: #cacccd;
  }
  .DayPickerKeyboardShortcuts_closeSvg:focus,
  .DayPickerKeyboardShortcuts_closeSvg:hover {
    fill: #82888a;
  }
  .KeyboardShortcutRow {
    list-style: none;
    margin: ${rem(6)} 0;
  }
  .KeyboardShortcutRow__block {
    margin-bottom: ${rem(16)};
  }
  .KeyboardShortcutRow_keyContainer {
    display: inline-block;
    white-space: nowrap;
    text-align: right;
    margin-right: ${rem(6)};
  }
  .KeyboardShortcutRow_keyContainer__block {
    text-align: left;
    display: inline;
  }
  .KeyboardShortcutRow_key {
    font-family: monospace;
    font-size: ${rem(12)};
    text-transform: uppercase;
    background: #f2f2f2;
    padding: ${rem(2)} ${rem(6)};
  }
  .KeyboardShortcutRow_action {
    display: inline;
    word-break: break-word;
    margin-left: ${rem(8)};
  }
  .DayPickerNavigation_container {
    position: relative;
    z-index: 2;
  }
  .DayPickerNavigation__horizontal {
  }

  .DayPickerNavigation_button {
    cursor: pointer;
    background: none;
    line-height: 0.78;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: none !important;
    &:last-of-type {
      right: 0;
    }
  }
  .DayPickerNavigation_button__default {
    border: 0 solid #e4e7e7;
    color: #ffffff;
  }
  .DayPickerNavigation_button__default:focus,
  .DayPickerNavigation_button__default:hover {
    border: 0 solid #c4c4c4;
  }
  .DayPickerNavigation_button__default:active {
    background: #f2f2f2;
  }
  .DayPickerNavigation_button__horizontal {
    border-radius: ${rem(3)};
    padding: 6px 16px;
    top: 8px;
    position: absolute;
    z-index: 10;
  }
  .DayPickerNavigation_leftButton__horizontal {
    left: 16px;
  }
  .DayPickerNavigation_rightButton__horizontal {
    right: 16px;
  }
  .DayPickerNavigation_button__vertical {
    display: inline-block;
    position: relative;
    height: 100%;
    width: 50%;
  }
  .DayPickerNavigation_button__vertical__default {
    padding: ${rem(5)};
  }
  .DayPickerNavigation_nextButton__vertical__default {
    border-left: 0;
  }
  .DayPickerNavigation_nextButton__verticalScrollable {
    width: 100%;
  }
  .DayPickerNavigation_svg__horizontal {
    height: ${rem(19)};
    width: ${rem(19)};
    fill: ${color('white')};
  }
  .DayPickerNavigation_svg__vertical {
    height: ${rem(42)};
    width: ${rem(42)};
    fill: #565a5c;
  }
  .CalendarMonthGrid {
    text-align: left;
    z-index: 0;
    margin-right: 24px;
  }
  .CalendarMonthGrid__animating {
    z-index: 1;
  }
  .CalendarMonthGrid__horizontal {
    height: ${CALENDAR_HEIGHT};
    position: absolute;
    left: 0;
    overflow: hidden;
  }
  .CalendarMonthGrid__vertical {
    margin: 0 auto;
  }
  .CalendarMonthGrid__vertical_scrollable {
    margin: 0 auto;
    overflow-y: scroll;
  }
  .CalendarMonthGrid_month__horizontal {
    display: inline-block;
    vertical-align: top;
  }
  .CalendarMonthGrid_month__hideForAnimation {
    position: absolute;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
  }
  .CalendarMonthGrid_month__hidden {
    visibility: hidden;
  }
  .CalendarMonth {
    text-align: center;
    padding: 0;
    vertical-align: top;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .CalendarMonth_table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: ${rem(36)};
  }
  .CalendarMonth_caption {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: ${text.normal};
    font-size: ${rem(14)};
    text-align: center;
    caption-side: initial;
    text-transform: uppercase;
    z-index: 5;
    strong {
      font-weight: 600;
    }
  }

  .CalendarDay {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    font-size: ${rem(14)};
    text-align: center;
    line-height: 2.3;
  }
  .CalendarDay:active {
    outline: 0;
  }
  .CalendarDay__defaultCursor {
    cursor: default;
  }
  .CalendarDay__default {
    border: 0 solid #e4e7e7;
    color: ${text.normal};
  }
  .CalendarDay__default:hover {
    border: 0 double #e4e7e7;
    color: inherit;
  }
  .CalendarDay__hovered_offset {
    background: #f4f5f5;
    border: 0 double #e4e7e7;
    color: inherit;
  }
  .CalendarDay__outside {
    border: 0;
    background: #fff;
    color: #dddddd;
  }
  .CalendarDay__blocked_minimum_nights {
    background: #fff;
  }
  .CalendarDay__blocked_minimum_nights:active,
  .CalendarDay__blocked_minimum_nights:hover {
    background: #fff;
    color: #cacccd;
  }
  .CalendarDay__highlighted_calendar {
    background: #ffe8bc;
    color: #565a5c;
  }
  .CalendarDay__highlighted_calendar:active,
  .CalendarDay__highlighted_calendar:hover {
    background: #ffce71;
    color: #565a5c;
  }
  .CalendarDay__selected_span {
    background: ${state.primary};
    color: #fff;
  }
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    background: ${state.primary};
    color: #fff;
  }
  .CalendarDay__last_in_range {
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${state.primary};
    color: #fff;
  }
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    background: #b2f1ec;
    border: ${rem(1)} solid #80e8e0;
    color: #007a87;
  }
  .CalendarDay__hovered_span:active {
    background: #80e8e0;
    border: ${rem(1)} solid #80e8e0;
    color: #007a87;
  }
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: #cacccd;
    border: 0 solid #cacccd;
    color: #82888a;
  }
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    border: 0 solid #e4e7e7;
    color: #cacccd;
  }
  .DateRangePickerInput {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    background-color: #fff;
    border-radius: 3px;
  }
  .DateRangePickerInput__disabled {
    background: #f2f2f2;
  }
  .DateRangePickerInput__withBorder {
    border: 1px solid
      ${({ focusedInput }) =>
        focusedInput ? `${state.primary}` : `${border.default}`};
  }
  .DateRangePickerInput__rtl {
    direction: rtl;
  }
  .DateRangePickerInput__block {
    display: block;
  }
  .DateRangePickerInput__showClearDates {
    padding-right: ${rem(30)};
  }
  .DateRangePickerInput_arrow {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    color: ${text.normal};
  }
  .DateRangePickerInput_arrow_svg {
    vertical-align: middle;
    fill: #565a5c;
    height: ${rem(24)};
    width: ${rem(24)};
  }
  .DateRangePickerInput_arrow_svg__small {
    height: ${rem(19)};
    width: ${rem(19)};
  }
  .DateRangePickerInput_clearDates {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    margin: 0 ${rem(8)} 0 ${rem(5)};
    position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .DateRangePickerInput_clearDates__small {
    padding: ${rem(6)};
  }
  .DateRangePickerInput_clearDates_default:focus,
  .DateRangePickerInput_clearDates_default:hover {
  }
  .DateRangePickerInput_clearDates__hide {
    visibility: hidden;
  }
  .DateRangePickerInput_clearDates_svg {
    fill: ${state.dark};
    height: ${rem(12)};
    width: ${rem(15)};
    vertical-align: middle;
  }
  .DateRangePickerInput_clearDates_svg__small {
    height: ${rem(9)};
  }
  .DateRangePickerInput_calendarIcon {
    background: 0 0;
    border: 0;
    padding-right: 8px;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
  .DateRangePickerInput_calendarIcon_svg {
    fill: ${state.dark};
    height: ${rem(15)};
    width: ${rem(14)};
    vertical-align: middle;
  }
  .DateInput {
    margin: 0;
    padding: 0;
    background: #fff;
    position: relative;
    display: inline-block;
    width: 100%;
    border-radius: ${rem(3)};
    vertical-align: middle;
  }
  .DateInput__small {
    width: ${rem(90)};
  }
  .DateInput__block {
    width: 100%;
  }
  .DateInput__disabled {
    background: #f2f2f2;
    color: #dbdbdb;
  }
  .DateInput_input {
    font-size: ${rem(14)};
    color: ${text.normal};
    background-color: #fff;
    border: none;
    width: 100%;
    max-width: 80px;
    &::placeholder {
      color: ${icon.light};
    }
  }
  .DateInput_input__small {
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    padding: ${rem(8)} ${rem(8)} ${rem(6)};
  }
  .DateInput_input__regular {
    font-weight: auto;
  }
  .DateInput_input__readOnly {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .DateInput_input__focused {
    outline: 0;
    background: #fff;
    border: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    color: #00cdbe;
  }
  .DateInput_input__disabled {
    background: #f2f2f2;
    font-style: italic;
  }
  .DateInput_screenReaderMessage {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: ${rem(1)};
    margin: -${rem(1)};
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: ${rem(1)};
  }
  .DateInput_fang {
    position: absolute;
    width: ${rem(20)};
    height: ${rem(10)};
    left: ${rem(22)};
    z-index: 2;
    display: none;
  }
  .DateInput_fangShape {
    fill: #fff;
  }
  .DateInput_fangStroke {
    stroke: #dbdbdb;
    fill: transparent;
  }
`;

CalendarStyles.defaultProps = {
  theme,
};

export default CalendarStyles;
