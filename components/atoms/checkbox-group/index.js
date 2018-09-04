// @flow
import React from 'react';
import ComboCheckbox from 'components/atoms/combo-checkbox';
import { Row } from './styles';

type State = {
  name: string,
  checked: 0 | 1 | 2 | boolean,
  allowPartial?: ?boolean,
};

type Props = {
  state: State,
  onChange: mixed => void,
};

class CheckboxGroup extends React.Component<Props> {
  checkbox: any;

  render() {
    const { state, onChange } = this.props;

    return (
      <Row>
        <ComboCheckbox
          ref={n => {
            this.checkbox = n;
          }}
          checked={state.checked}
          allowPartial={state.allowPartial}
          onChange={checked => onChange({ ...state, checked })}
        />
        <span onClick={() => this.checkbox.handleClick()}>{state.name}</span>
      </Row>
    );
  }
}

export default CheckboxGroup;
export { Row };
