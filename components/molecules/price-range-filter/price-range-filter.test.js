// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import FilterContainer from 'components/atoms/filter-container';
import TextInput from 'components/atoms/forms/text-input';
import { PriceRangeFilter } from './';
import { Wrapper, ErrorMessage } from './styles';

type queryType = {
  minPrice?: string,
  maxPrice?: string,
  page?: number,
};

function setup({ minPrice, maxPrice, page }: queryType) {
  const mockRouter = jest.genMockFromModule('next/router');
  mockRouter.query = {
    tab: 'catalog',
    minPrice,
    maxPrice,
    page,
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
    expect(wrapper.state('min')).toEqual('2');
    expect(wrapper.state('max')).toEqual('5');
  });

  it('should update the router query params on state change', () => {
    const wrapper = setup({});
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('max')({ target: { value: '10' } });
    instance.setPrice('min')({ target: { value: '2' } });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '2.00',
        maxPrice: '10.00',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should remove the query params if values are falsy', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('min')({ target: { value: '' } });
    instance.setPrice('max')({ target: { value: '' } });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      { tab: 'catalog' },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should keep the page query param', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5', page: 2 });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('min')({ target: { value: '' } });
    instance.setPrice('max')({ target: { value: '' } });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        page: 2,
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should format prices to 2 decimal places', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5.1' });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('min')({ target: { value: '2' } });
    instance.setPrice('max')({ target: { value: '5.88888' } });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '2.00',
        maxPrice: '5.89',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should handle valid price change', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('min')({
      target: {
        value: '3',
      },
    });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '3.00',
        maxPrice: '5.00',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should handle negative price', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('min')({
      target: {
        value: '-1',
      },
    });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '1.00',
        maxPrice: '5.00',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should handle non-numeric price', () => {
    const wrapper = setup({ minPrice: '2', maxPrice: '5' });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setPrice('min')({
      target: {
        value: 'a',
      },
    });
    instance.updateState();
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        maxPrice: '5.00',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
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

  it('should submit data for fetch onBlur', () => {
    const wrapper = setup({});
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const first = wrapper.find(TextInput).first();
    const last = wrapper.find(TextInput).last();
    first.simulate('focus');
    first.simulate('change', { target: { value: '5' } });
    expect(pushRoute).not.toHaveBeenCalled();
    first.simulate('blur');
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '5.00',
      },
      { shallow: true },
    );
    last.simulate('focus');
    last.simulate('change', { target: { value: '20' } });
    last.simulate('blur');
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '5.00',
        maxPrice: '20.00',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
  });

  it('should not submit data for fetch onBlur if min > max', () => {
    const wrapper = setup({ minPrice: '50.00' });
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const last = wrapper.find(TextInput).last();
    last.simulate('focus');
    last.simulate('change', { target: { value: '20' } });
    last.simulate('blur');
    expect(pushRoute).not.toHaveBeenCalled();
    pushRoute.mockRestore();
  });

  it('should update state on Enter key', () => {
    const wrapper = setup({});
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const first = wrapper.find(TextInput).first();
    const last = wrapper.find(TextInput).last();
    first.simulate('focus');
    first.simulate('change', { target: { value: '5' } });
    expect(pushRoute).not.toHaveBeenCalled();
    first.simulate('keypress', { key: 'Enter' });
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '5.00',
      },
      { shallow: true },
    );
    last.simulate('focus');
    last.simulate('change', { target: { value: '20' } });
    last.simulate('keypress', { key: 'Enter' });
    expect(pushRoute).toHaveBeenCalledWith(
      'marketplace',
      {
        tab: 'catalog',
        minPrice: '5.00',
        maxPrice: '20.00',
      },
      { shallow: true },
    );
    pushRoute.mockRestore();
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

  it('should update internal state when props change', () => {
    const query = { minPrice: '2', maxPrice: '5' };
    const wrapper = setup(query);
    const instance = wrapper.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    const nextProps = { router: { query: {} } };
    const thisProps = { router: { query } };
    wrapper.setProps(nextProps);
    instance.componentDidUpdate(thisProps);
    expect(setState).toHaveBeenCalledWith({
      min: '',
      max: '',
    });
    setState.mockRestore();
  });

  it('should not update internal state when props are the same', () => {
    const query = { minPrice: '2', maxPrice: '5' };
    const wrapper = setup(query);
    const instance = wrapper.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    const nextProps = { router: { query } };
    wrapper.setProps(nextProps);
    instance.componentDidUpdate(nextProps);
    expect(setState).not.toHaveBeenCalled();
    setState.mockRestore();
  });
});
