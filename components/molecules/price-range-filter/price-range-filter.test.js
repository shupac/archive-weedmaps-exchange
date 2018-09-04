import React from 'react';
import { shallow, mount } from 'enzyme';
import FilterContainer from 'components/atoms/filter-container';
import { FiltersLabel } from 'components/atoms/filter-container/styles';
import TextInput from 'components/atoms/forms/text-input';
import PriceRangeFilter from './';
import { Wrapper, ErrorMessage } from './styles';

describe('Price Range Filter', () => {
  it('should render the price range filter component', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 0, max: 0 }} onChange={onChange} />
    );
    const wrapper = shallow(component);

    expect(wrapper.find(FilterContainer).exists()).toEqual(true);
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should not display an error with valid price values', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 1, max: 2 }} onChange={onChange} />
    );
    const wrapper = shallow(component);

    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should display error when min is greater than max', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 2, max: 1 }} onChange={onChange} />
    );
    const wrapper = shallow(component);

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

  it('should not display an error when min price is not set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: 2 }} onChange={onChange} />
    );
    const wrapper = shallow(component);

    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should not display an error when max price is not set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 1, max: '' }} onChange={onChange} />
    );
    const wrapper = shallow(component);

    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should not display an error when neither price is set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: '' }} onChange={onChange} />
    );
    const wrapper = shallow(component);

    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(false);
    expect(wrapper.find(TextInput).length).toEqual(2);
  });

  it('should display label as "Any" price when neither price is set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: '' }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('Any')).toEqual(true);
  });

  it('should display label as "Any to {max}" price when only max price is set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: 2 }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('Any to $2')).toEqual(true);
  });

  it('should display label as "{min} to Any" price when only min price is set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 2, max: '' }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('$2 to Any')).toEqual(true);
  });

  it('should display label as "{min} to {max}" price when min and max prices are set', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 2, max: 5 }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('$2 to $5')).toEqual(true);
  });

  it('should display label as invalid min price is greater than max price', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 2, max: 1 }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('Invalid price range')).toEqual(true);
  });

  it('should add trailing zeros to input fields', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: 2, max: 5.1 }} onChange={onChange} />
    );
    mount(component);

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.min).toEqual('2.00');
    expect(nextState.max).toEqual('5.10');
  });

  it('should handle state change when min price is changed', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: '' }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const minInput = wrapper.find('input').first();
    minInput.simulate('change', { target: { value: 2 } });

    const nextState = onChange.mock.calls[1][0];
    expect(nextState.min).toEqual(2);
    expect(nextState.max).toEqual('');
  });

  it('should handle state change when max price is changed', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: '' }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const maxInput = wrapper.find('input').last();
    maxInput.simulate('change', { target: { value: 2 } });

    const nextState = onChange.mock.calls[1][0];
    expect(nextState.min).toEqual('');
    expect(nextState.max).toEqual(2);
  });

  it('should handle negative values', () => {
    const onChange = jest.fn();
    const component = (
      <PriceRangeFilter state={{ min: '', max: '' }} onChange={onChange} />
    );
    const wrapper = mount(component);

    const minInput = wrapper.find('input').last();
    const maxInput = wrapper.find('input').last();
    minInput.simulate('change', { target: { value: -2 } });
    maxInput.simulate('change', { target: { value: -2 } });

    const nextState = onChange.mock.calls[1][0];
    expect(nextState.min).toEqual('');
    expect(nextState.max).toEqual('');
  });
});
