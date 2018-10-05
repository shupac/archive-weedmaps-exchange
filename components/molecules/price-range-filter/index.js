// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { type RouterType } from 'lib/types/router';
import TextInput from 'components/atoms/forms/text-input';
import FilterContainer from 'components/atoms/filter-container';
import { Wrapper, Seperator, ErrorMessage } from './styles';

type Event = {
  target: {
    value: string,
  },
};

type Props = {
  router: RouterType,
};

class PriceRangeFilter extends React.Component<Props> {
  componentDidMount() {
    this.formatValues();
  }

  getState = () => {
    const {
      router: { query },
    } = this.props;
    return {
      minPrice: query.minPrice || '',
      maxPrice: query.maxPrice || '',
    };
  };

  updateState = ({
    minPrice,
    maxPrice,
  }: {
    minPrice: string,
    maxPrice: string,
  }) => {
    const { router } = this.props;

    const nextParams = {
      ...router.query,
      minPrice,
      maxPrice,
    };

    if (!minPrice) delete nextParams.minPrice;
    if (!maxPrice) delete nextParams.maxPrice;

    Router.pushRoute('marketplace', nextParams);
  };

  checkError = () => {
    const { minPrice, maxPrice } = this.getState();

    if (minPrice === '' || maxPrice === '') return false;
    return +minPrice > +maxPrice;
  };

  formatValues = () => {
    const { minPrice, maxPrice } = this.getState();

    this.updateState({
      minPrice: minPrice ? parseFloat(minPrice).toFixed(2) : '',
      maxPrice: maxPrice ? parseFloat(maxPrice).toFixed(2) : '',
    });
  };

  handlePriceChange = (type: string) => (e: Event) => {
    let value = +e.target.value;

    if (value <= 0 || Number.isNaN(value)) value = '';

    this.updateState({
      ...this.getState(),
      [type]: value.toString(),
    });
  };

  getLabel = () => {
    const { minPrice, maxPrice } = this.getState();

    const hasError = this.checkError();
    if (hasError) return 'Invalid price range';

    if (!maxPrice && !minPrice) return 'Any';

    const noTrailingZeros = number => number.toString().replace('.00', '');

    const minLabel = minPrice ? `$${noTrailingZeros(minPrice)}` : 'Any';
    const maxLabel = maxPrice ? `$${noTrailingZeros(maxPrice)}` : 'Any';

    return `${minLabel} to ${maxLabel}`;
  };

  render() {
    const { minPrice, maxPrice } = this.getState();

    return (
      <FilterContainer title="Price Range" filters={this.getLabel()}>
        <Wrapper>
          <TextInput
            onBlur={this.formatValues}
            name="minimum"
            type="number"
            placeholder="$0.00"
            value={minPrice}
            onChange={this.handlePriceChange('minPrice')}
            hasError={Number.isNaN(Number(minPrice)) || this.checkError()}
            errorMessage={
              Number.isNaN(Number(minPrice)) ? 'Must be a Number' : ''
            }
          />
          <Seperator>-</Seperator>
          <TextInput
            onBlur={this.formatValues}
            name="maximum"
            type="number"
            placeholder="$0.00"
            value={maxPrice}
            onChange={this.handlePriceChange('maxPrice')}
            hasError={Number.isNaN(Number(maxPrice)) || this.checkError()}
            errorMessage={
              Number.isNaN(Number(maxPrice)) ? 'Must be a Number' : ''
            }
          />
        </Wrapper>
        {this.checkError() ? (
          <ErrorMessage>Min Price must be lower than Max Price</ErrorMessage>
        ) : (
          ''
        )}
      </FilterContainer>
    );
  }
}

export default withRouter(PriceRangeFilter);
export { PriceRangeFilter };
