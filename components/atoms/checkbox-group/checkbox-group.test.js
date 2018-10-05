import React from 'react';
import { mount } from 'enzyme';
import Checkbox, { Check, PartialCheck } from 'components/atoms/combo-checkbox';
import CheckboxGroup from './';

describe('CheckboxGroup', () => {
  it('should render the checkbox group', () => {
    const state = { name: 'Test', checked: false };
    const component = <CheckboxGroup state={state} />;
    const wrapper = mount(component);

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find('span').exists()).toEqual(true);
    expect(wrapper.find('span').text()).toEqual(state.name);
  });

  it('should display unchecked state when checked is 0', () => {
    const state = { name: 'Test', checked: 0 };
    const component = <CheckboxGroup state={state} />;
    const wrapper = mount(component);

    expect(wrapper.find(Checkbox).exists()).toEqual(true);
    expect(wrapper.find(Check).exists()).toEqual(false);
    expect(wrapper.find(PartialCheck).exists()).toEqual(false);
    expect(wrapper.find('span').exists()).toEqual(true);
    expect(wrapper.find('span').text()).toEqual(state.name);
  });

  it('should display unchecked state when checked is false', () => {
    const state = { name: 'Test', checked: false };
    const component = <CheckboxGroup state={state} />;
    const wrapper = mount(component);

    expect(wrapper.find(Checkbox).exists()).toEqual(true);
    expect(wrapper.find(PartialCheck).exists()).toEqual(false);
    expect(wrapper.find(Check).exists()).toEqual(false);
    expect(wrapper.find('span').exists()).toEqual(true);
    expect(wrapper.find('span').text()).toEqual(state.name);
  });

  it('should display partially checked state when checked is 1', () => {
    const state = { name: 'Test', checked: 1, allowPartial: true };
    const component = <CheckboxGroup state={state} />;
    const wrapper = mount(component);

    expect(wrapper.find(Checkbox).exists()).toEqual(true);
    expect(wrapper.find(PartialCheck).exists()).toEqual(true);
    expect(wrapper.find(Check).exists()).toEqual(false);
    expect(wrapper.find('span').exists()).toEqual(true);
    expect(wrapper.find('span').text()).toEqual(state.name);
  });

  it('should display checked state when checked is 2', () => {
    const state = { name: 'Test', checked: 2, allowPartial: true };
    const component = <CheckboxGroup state={state} />;
    const wrapper = mount(component);

    expect(wrapper.find(Checkbox).exists()).toEqual(true);
    expect(wrapper.find(PartialCheck).exists()).toEqual(false);
    expect(wrapper.find(Check).exists()).toEqual(true);
    expect(wrapper.find('span').exists()).toEqual(true);
    expect(wrapper.find('span').text()).toEqual(state.name);
  });

  it('should display checked state when checked is true', () => {
    const state = { name: 'Test', checked: true };
    const component = <CheckboxGroup state={state} />;
    const wrapper = mount(component);

    expect(wrapper.find(Checkbox).exists()).toEqual(true);
    expect(wrapper.find(PartialCheck).exists()).toEqual(false);
    expect(wrapper.find(Check).exists()).toEqual(true);
    expect(wrapper.find('span').exists()).toEqual(true);
    expect(wrapper.find('span').text()).toEqual(state.name);
  });

  it('should toggle state from false to true when clicked', () => {
    const onToggle = jest.fn();

    const state = { name: 'Test', checked: false };
    const component = <CheckboxGroup state={state} onChange={onToggle} />;
    const wrapper = mount(component);

    wrapper.find(Checkbox).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith({ ...state, checked: true });
  });

  it('should toggle state from true to false when clicked', () => {
    const onToggle = jest.fn();

    const state = { name: 'Test', checked: true };
    const component = <CheckboxGroup state={state} onChange={onToggle} />;
    const wrapper = mount(component);

    wrapper.find(Checkbox).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith({ ...state, checked: false });
  });

  it('should toggle state from 0 to 1 when clicked', () => {
    const onToggle = jest.fn();

    const state = { name: 'Test', checked: 0, allowPartial: true };
    const component = <CheckboxGroup state={state} onChange={onToggle} />;
    const wrapper = mount(component);

    wrapper.find(Checkbox).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith({ ...state, checked: 1 });
  });

  it('should toggle state from 1 to 2 when clicked', () => {
    const onToggle = jest.fn();

    const state = { name: 'Test', checked: 1, allowPartial: true };
    const component = <CheckboxGroup state={state} onChange={onToggle} />;
    const wrapper = mount(component);

    wrapper.find(Checkbox).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith({ ...state, checked: 2 });
  });

  it('should toggle state from 2 to 0 when clicked', () => {
    const onToggle = jest.fn();

    const state = { name: 'Test', checked: 2, allowPartial: true };
    const component = <CheckboxGroup state={state} onChange={onToggle} />;
    const wrapper = mount(component);

    wrapper.find(Checkbox).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith({ ...state, checked: 0 });
  });

  it('should call click on checkbox when label is clicked', () => {
    const onToggle = jest.fn();

    const state = { name: 'Test', checked: false };
    const component = <CheckboxGroup state={state} onChange={onToggle} />;
    const wrapper = mount(component);
    const instance = wrapper.instance();
    instance.checkbox = {
      handleClick: jest.fn(),
    };
    wrapper.find('span').simulate('click');
    expect(instance.checkbox.handleClick).toHaveBeenCalled();
  });
});
