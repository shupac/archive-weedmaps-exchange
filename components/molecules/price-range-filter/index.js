// @flow
import React from 'react';
import TextInput from 'components/atoms/forms/text-input';
import FilterContainer from 'components/atoms/filter-container';
import { Wrapper, Seperator, ErrorMessage } from './styles';

type Event = {
  target: {
    value: string,
  },
};

type State = {
  min: number | string,
  max: number | string,
};

type Props = {
  state: State,
  onChange: (state: State) => void,
};

class PriceRangeFilter extends React.Component<Props> {
  componentDidMount() {
    this.formatValues();
  }

  checkError = (state: State) => {
    const { min, max } = state;

    if (min === '' || max === '') return false;
    return +min > +max;
  };

  formatValues = () => {
    const { state, onChange } = this.props;
    const { min, max } = state;

    const nextState = {
      ...state,
      min: min ? parseFloat(min).toFixed(2) : '',
      max: max ? parseFloat(max).toFixed(2) : '',
    };

    onChange(nextState);
  };

  handlePriceChange = (type: string) => (e: Event) => {
    const { state, onChange } = this.props;

    let value = +e.target.value;

    if (value <= 0 || Number.isNaN(value)) value = '';

    const nextState = {
      ...state,
      [type]: value,
    };

    onChange({
      ...nextState,
    });
  };

  getLabel = () => {
    const { state } = this.props;
    const { min, max } = state;

    const hasError = this.checkError(state);
    if (hasError) return 'Invalid price range';

    if (!max && !min) return 'Any';

    const noTrailingZeros = number => number.toString().replace('.00', '');

    const minLabel = min ? `$${noTrailingZeros(min)}` : 'Any';
    const maxLabel = max ? `$${noTrailingZeros(max)}` : 'Any';

    return `${minLabel} to ${maxLabel}`;
  };

  render() {
    const { state } = this.props;

    return (
      <FilterContainer title="Price Range" filters={this.getLabel()}>
        <Wrapper>
          <TextInput
            onBlur={this.formatValues}
            name="minimum"
            type="number"
            placeholder="$0.00"
            value={state.min}
            onChange={this.handlePriceChange('min')}
            hasError={Number.isNaN(state.min) || this.checkError(state)}
            errorMessage={Number.isNaN(state.min) ? 'Must be a Number' : ''}
          />
          <Seperator>-</Seperator>
          <TextInput
            onBlur={this.formatValues}
            name="maximum"
            type="number"
            placeholder="$0.00"
            value={state.max}
            onChange={this.handlePriceChange('max')}
            hasError={Number.isNaN(state.max) || this.checkError(state)}
            errorMessage={Number.isNaN(state.max) ? 'Must be a Number' : ''}
          />
        </Wrapper>
        {this.checkError(state) ? (
          <ErrorMessage>Min Price must be lower than Max Price</ErrorMessage>
        ) : (
          ''
        )}
      </FilterContainer>
    );
  }
}

export default PriceRangeFilter;
