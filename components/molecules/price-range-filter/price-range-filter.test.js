import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import FilterContainer from 'components/atoms/filter-container';
import TextInput from 'components/atoms/forms/text-input';
import { PriceRangeFilter } from './';
import { Wrapper, ErrorMessage } from './styles';

function setup({ minPrice, maxPrice }) {
  const mockRouter = {
    query: {
      tab: 'catalog',
      minPrice,
      maxPrice,
    },
  };
  if (!minPrice) delete mockRouter.query.minPrice;
  if (!maxPrice) delete mockRouter.query.maxPrice;

  const component = <PriceRangeFilter router={mockRouter} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });

  return wrapper;
}

describe('Price Range Filter', () => {
  it('should render the price range filter component', () => {
    const wrapper = setup({});
    expect(wrapper.find(FilterContainer).exists()).toEqual(true);
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should get the state from the router', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    expect(instance.getState()).toEqual({
      minPrice: '2',
      maxPrice: '5',
    });
  });

  it('should update the router query params on state change', () => {
    const wrapper = setup({});
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.updateState({ minPrice: '2', maxPrice: '5' });
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      minPrice: '2',
      maxPrice: '5',
    });
    pushRoute.mockRestore();
  });

  it('should remove the query params if values are falsy', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.updateState({});
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
    });
    pushRoute.mockRestore();
  });

  it('should format values on mount', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    instance.formatValues = jest.fn();
    instance.componentDidMount();
    expect(instance.formatValues).toHaveBeenCalled();
  });

  it('should format prices to 2 decimal places', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5.1' });
    const instance = wrapper.instance();
    const updateState = jest.spyOn(instance, 'updateState').mockReturnValue();
    instance.formatValues();
    expect(updateState).toHaveBeenCalledWith({
      minPrice: '2.00',
      maxPrice: '5.10',
    });
  });

  it('should format prices with no values', () => {
    const wrapper = setup({});
    const instance = wrapper.instance();
    const updateState = jest.spyOn(instance, 'updateState').mockReturnValue();
    instance.formatValues();
    expect(updateState).toHaveBeenCalledWith({
      minPrice: '',
      maxPrice: '',
    });
    updateState.mockRestore();
  });

  it('should handle valid price change', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const updateState = jest.spyOn(instance, 'updateState').mockReturnValue();
    instance.handlePriceChange('minPrice')({
      target: {
        value: '3',
      },
    });
    expect(updateState).toHaveBeenCalledWith({
      minPrice: '3',
      maxPrice: '5',
    });
    updateState.mockRestore();
  });

  it('should handle negative price', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const updateState = jest.spyOn(instance, 'updateState').mockReturnValue();
    instance.handlePriceChange('minPrice')({
      target: {
        value: '-1',
      },
    });
    expect(updateState).toHaveBeenCalledWith({
      minPrice: '',
      maxPrice: '5',
    });
    updateState.mockRestore();
  });

  it('should handle non-numeric price', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const updateState = jest.spyOn(instance, 'updateState').mockReturnValue();
    instance.handlePriceChange('minPrice')({
      target: {
        value: 'a',
      },
    });
    expect(updateState).toHaveBeenCalledWith({
      minPrice: '',
      maxPrice: '5',
    });
    updateState.mockRestore();
  });

  it('should not display an error with valid price values', () => {
    const wrapper = setup({ minPrice: '1', maxPrice: '2' });
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should display error when min is greater than max', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '1' });

    expect(
      wrapper
        .find(TextInput)
        .first()
        .props().hasError,
    ).toEqual(true);

    expect(
      wrapper
        .find(TextInput)
        .last()
        .props().hasError,
    ).toEqual(true);

    expect(
      wrapper
        .find('ErrorMessage')
        .dive()
        .text(),
    ).toEqual('Min Price must be lower than Max Price');
  });

  it('should display error for invalid prices', () => {
    const wrapper = setup({ minPrice: 'foo', maxPrice: 'bar' });
    expect(
      wrapper
        .find(TextInput)
        .first()
        .props().hasError,
    ).toEqual(true);
    expect(
      wrapper
        .find(TextInput)
        .last()
        .props().hasError,
    ).toEqual(true);
  });

  it('should not display an error when min price is not set', () => {
    const wrapper = setup({ maxPrice: '2' });
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should not display an error when max price is not set', () => {
    const wrapper = setup({ minPrice: '2' });
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should not display an error when neither price is set', () => {
    const wrapper = setup({});
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should display label as "Any" price when neither price is set', () => {
    const wrapper = setup({});
    const label = wrapper.find(FilterContainer).props().filters;
    expect(label).toEqual('Any');
  });

  it('should display label as "Any to {max}" price when only max price is set', () => {
    const wrapper = setup({ maxPrice: '2' });
    const label = wrapper.find(FilterContainer).props().filters;
    expect(label).toEqual('Any to $2');
  });

  it('should display label as "{min} to Any" price when only min price is set', () => {
    const wrapper = setup({ minPrice: '2' });
    const label = wrapper.find(FilterContainer).props().filters;
    expect(label).toEqual('$2 to Any');
  });

  it('should display label as "{min} to {max}" price when min and max prices are set', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const label = wrapper.find(FilterContainer).props().filters;
    expect(label).toEqual('$2 to $5');
  });

  it('should display label as invalid min price is greater than max price', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '1' });
    const label = wrapper.find(FilterContainer).props().filters;
    expect(label).toEqual('Invalid price range');
  });
});
