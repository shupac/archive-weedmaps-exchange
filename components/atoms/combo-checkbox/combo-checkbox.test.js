import React from 'react';
import { mount } from 'enzyme';
import Checkbox, { PartialCheck, Check } from './';
import { Container } from './styles';

describe('ComboCheckbox', () => {
  it('should render the combo checkbox', () => {
    const component = mount(<Checkbox checked={false} />);
    expect(component.exists()).toEqual(true);
  });

  it('should display unchecked state when checked is 0', () => {
    const component = mount(<Checkbox checked={0} />);
    expect(component.find(Container).exists()).toEqual(true);
    expect(component.find(Check).exists()).toEqual(false);
    expect(component.find(PartialCheck).exists()).toEqual(false);
  });

  it('should display unchecked state when checked is false', () => {
    const component = mount(<Checkbox checked={false} />);
    expect(component.find(Container).exists()).toEqual(true);
    expect(component.find(PartialCheck).exists()).toEqual(false);
    expect(component.find(Check).exists()).toEqual(false);
  });

  it('should display partially checked state when checked is 1', () => {
    const component = mount(<Checkbox checked={1} />);
    expect(component.find(Container).exists()).toEqual(true);
    expect(component.find(PartialCheck).exists()).toEqual(true);
    expect(component.find(Check).exists()).toEqual(false);
  });

  it('should display checked state when checked is 2', () => {
    const component = mount(<Checkbox checked={2} />);
    expect(component.find(Container).exists()).toEqual(true);
    expect(component.find(PartialCheck).exists()).toEqual(false);
    expect(component.find(Check).exists()).toEqual(true);
  });

  it('should display checked state when checked is true', () => {
    const component = mount(<Checkbox checked />);
    expect(component.find(Container).exists()).toEqual(true);
    expect(component.find(PartialCheck).exists()).toEqual(false);
    expect(component.find(Check).exists()).toEqual(true);
  });

  it('should toggle state from false to true when clicked', () => {
    const onToggle = jest.fn();

    const component = mount(<Checkbox checked={false} onChange={onToggle} />);

    component.find(Container).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith(true);
  });

  it('should toggle state from true to false when clicked', () => {
    const onToggle = jest.fn();

    const component = mount(<Checkbox checked onChange={onToggle} />);

    component.find(Container).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith(false);
  });

  it('should toggle state from 0 to 1 when clicked', () => {
    const onToggle = jest.fn();

    const component = mount(
      <Checkbox checked={0} allowPartial onChange={onToggle} />,
    );

    component.find(Container).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith(1);
  });

  it('should toggle state from 1 to 2 when clicked', () => {
    const onToggle = jest.fn();

    const component = mount(
      <Checkbox checked={1} allowPartial onChange={onToggle} />,
    );

    component.find(Container).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith(2);
  });

  it('should toggle state from 2 to 0 when clicked', () => {
    const onToggle = jest.fn();

    const component = mount(
      <Checkbox checked={2} allowPartial onChange={onToggle} />,
    );

    component.find(Container).simulate('click');
    expect(onToggle).toHaveBeenCalled();
    expect(onToggle).toBeCalledWith(0);
  });
});
