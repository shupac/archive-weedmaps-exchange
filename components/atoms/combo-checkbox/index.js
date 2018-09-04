// @flow
import React from 'react';
import { Check } from 'components/atoms/icons';
import { Container, PartialCheck } from './styles';

type Checked = 0 | 1 | 2 | boolean;

type Props = {
  checked: Checked,
  allowPartial?: ?boolean,
  onChange: (checked: Checked) => void,
};

class ComboCheckbox extends React.Component<Props> {
  static defaultProps = {
    allowPartial: false,
  };

  handleClick = () => {
    const { checked, allowPartial, onChange } = this.props;

    let next;

    if (allowPartial) {
      if (!checked) next = 1;
      else if (checked === 1) next = 2;
      else next = 0;
    } else {
      next = !checked;
    }

    onChange(next);
  };

  render() {
    const { checked } = this.props;

    let checkmark = null;

    if (checked)
      checkmark = (
        <Check fill="white" size={{ width: '10px', height: '10px' }} />
      );
    if (checked === 1) checkmark = <PartialCheck />;

    return (
      <Container checked={checked} onClick={this.handleClick}>
        {checkmark}
      </Container>
    );
  }
}

export default ComboCheckbox;
export { Check, PartialCheck };
