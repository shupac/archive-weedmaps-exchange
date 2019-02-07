// @flow
import React, { Component } from 'react';
import { Flex } from '@ghostgroup/grid-styled';
import { toCurrency } from 'lib/common/strings.js';
import { DollarSignWrapper, Input } from './styles';

type Props = {
  placeholder?: string,
  setFieldValue?: (name: ?string, value: string) => void,
  name?: string,
  value: string,
};

type State = {
  value: string,
};

export class CurrencyInput extends Component<Props, State> {
  state = {
    value: this.props.value || '',
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { setFieldValue, name } = this.props;
    const valueAsCurrency = toCurrency(e.currentTarget.value);

    this.setState({ value: valueAsCurrency });

    if (setFieldValue) {
      setFieldValue(name, valueAsCurrency);
    }
  };

  get value(): string {
    return this.props.value || this.state.value;
  }

  render() {
    const {
      handleChange,
      props: { placeholder, ...rest },
      value,
    } = this;

    return (
      <Flex>
        <DollarSignWrapper>$</DollarSignWrapper>
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
        />
      </Flex>
    );
  }
}

export default CurrencyInput;
