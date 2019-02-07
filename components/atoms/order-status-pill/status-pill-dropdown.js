// @flow
import * as React from 'react';
import { StatusPillDropDownWrapper, StatusPillFinalState } from './styles';

type OptionType = {
  text: string,
  value: string,
};

type CategorySelected = {
  value: string,
  text: string,
};

type Props = {
  status: string,
  orderId: string,
  onChange: CategorySelected => void,
  options: OptionType[],
  selectedOption: OptionType,
};

export class StatusPillDropDown extends React.Component<Props> {
  render() {
    const { status, options, selectedOption, onChange } = this.props;

    return (
      <>
        {options.length ? (
          <StatusPillDropDownWrapper
            data-test-id="status-drop-down"
            status={status}
            items={options}
            itemToString={item => item.text}
            selectedItem={selectedOption}
            onChange={onChange}
          />
        ) : (
          <StatusPillFinalState data-test-id="final-pill" status={status}>
            {status}
          </StatusPillFinalState>
        )}
      </>
    );
  }
}

export default StatusPillDropDown;
