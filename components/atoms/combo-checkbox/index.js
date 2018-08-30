// @flow
import React from 'react';
import { Check } from 'components/atoms/icons';
import { Container, Row, PartialCheck } from './styles';

type CheckboxProps = {
  checked: mixed,
  allowPartial?: ?boolean,
  onChange?: mixed => void,
};

type GroupProps = {
  name: string,
  checked: mixed,
  allowPartial?: ?boolean,
  onChange: mixed => void,
};

const getNextState = (checked, allowPartial) => {
  if (allowPartial) {
    if (!checked) return 1;
    if (checked === 1) return 2;
    return 0;
  }
  return !checked;
};

export const ComboCheckbox = ({
  checked,
  allowPartial,
  onChange,
}: CheckboxProps) => {
  let result = null;

  if (checked)
    result = <Check fill="white" size={{ width: '10px', height: '10px' }} />;
  if (checked === 1) result = <PartialCheck />;

  return (
    <Container
      checked={checked}
      onClick={() => {
        const nextState = getNextState(checked, allowPartial);
        if (onChange) onChange(nextState);
      }}
    >
      {result}
    </Container>
  );
};

ComboCheckbox.defaultProps = {
  allowPartial: false,
};

const CheckboxGroup = ({
  name,
  checked,
  allowPartial,
  onChange,
}: GroupProps) => (
  <Row
    onClick={() => {
      const nextState = getNextState(checked, allowPartial);
      onChange(nextState);
    }}
  >
    <ComboCheckbox checked={checked} allowPartial={allowPartial} />
    <span>{name}</span>
  </Row>
);

export default ComboCheckbox;
export { CheckboxGroup, Row, Check, PartialCheck };
