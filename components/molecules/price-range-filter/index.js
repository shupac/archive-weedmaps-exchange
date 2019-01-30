// @flow
import { Component } from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { type RouterType } from 'lib/types/router';
import { stripNonNumbersWithDot } from 'lib/common/strings';
import TextInput from 'components/atoms/forms/text-input';
import FilterContainer from 'components/atoms/filter-container';
import { Wrapper, Seperator, ErrorMessage } from './styles';

type Event = {
  target: {
    value: string,
  },
};

type State = {
  min: string,
  max: string,
};

type Props = {
  router: RouterType,
};

class PriceRangeFilter extends Component<Props, State> {
  state = {
    min: this.props.router.query.minPrice || '',
    max: this.props.router.query.maxPrice || '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.router !== this.props.router) {
      const { minPrice, maxPrice } = this.props.router.query;
      // eslint-disable-next-line
      this.setState({
        min: minPrice || '',
        max: maxPrice || '',
      });
    }
  }

  format = (price: string) =>
    parseFloat(price)
      .toFixed(2)
      .toString();

  updateState = () => {
    const { min, max } = this.state;
    const { router } = this.props;

    const formattedMin = min && Number(min) ? this.format(min) : '';
    const formattedMax = max && Number(max) ? this.format(max) : '';

    const nextParams = {
      ...router.query,
      minPrice: formattedMin,
      maxPrice: formattedMax,
    };

    if (!min || !Number(min)) delete nextParams.minPrice;
    if (!max || !Number(max)) delete nextParams.maxPrice;
    if (!router.query.page) delete nextParams.page;

    this.setState({ min: formattedMin, max: formattedMax }, () => {
      if (this.checkError(formattedMin)(formattedMax)) return null;
      return Router.pushRoute('marketplace', nextParams, { shallow: true });
    });
  };

  setPrice = (type: string) => (e: Event) => {
    const value = stripNonNumbersWithDot(e.target.value);
    return type === 'min'
      ? this.setState({ min: value })
      : this.setState({ max: value });
  };

  checkError = (min: string) => (max: string) => {
    if (min === '' || max === '') return false;
    return +min > +max;
  };

  getLabel = () => {
    const { min, max } = this.state;
    const hasError = this.checkError(min)(max);

    if (hasError) return 'Invalid price range';
    if (!max && !min) return 'Any';

    const noTrailingZeros = number => number.toString().replace('.00', '');

    const minLabel = min ? `$${noTrailingZeros(min)}` : 'Any';
    const maxLabel = max ? `$${noTrailingZeros(max)}` : 'Any';

    return `${minLabel} to ${maxLabel}`;
  };

  render() {
    const { min, max } = this.state;
    return (
      <FilterContainer title="Price Range" filters={this.getLabel()}>
        <Wrapper>
          <TextInput
            name="minimum"
            type="text"
            placeholder="$0.00"
            value={min}
            onChange={this.setPrice('min')}
            onBlur={this.updateState}
            onKeyPress={({ key }) => key === 'Enter' && this.updateState()}
            hasError={Number.isNaN(Number(min)) || this.checkError(min)(max)}
            errorMessage={Number.isNaN(Number(min)) ? 'Must be a Number' : ''}
          />
          <Seperator>-</Seperator>
          <TextInput
            name="maximum"
            type="text"
            placeholder="$0.00"
            value={max}
            onChange={this.setPrice('max')}
            onBlur={this.updateState}
            onKeyPress={({ key }) => key === 'Enter' && this.updateState()}
            hasError={Number.isNaN(Number(max)) || this.checkError(min)(max)}
            errorMessage={Number.isNaN(Number(max)) ? 'Must be a Number' : ''}
          />
        </Wrapper>
        {this.checkError(min)(max) ? (
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
