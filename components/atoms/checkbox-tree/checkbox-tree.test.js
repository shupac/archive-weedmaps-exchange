// @flow
import React from 'react';
import { mount } from 'enzyme';

import { categories } from 'components/molecules/filter-panel/mock-data';

import Checkbox, { Check, PartialCheck } from 'components/atoms/combo-checkbox';
import CheckboxGroup from 'components/atoms/checkbox-group';
import CheckboxTree, { Children } from './';

const defaultData = categories[0];

describe('CheckboxTree', () => {
  it('should render the checkbox tree', () => {
    const onChange = jest.fn();

    const component = <CheckboxTree state={defaultData} onChange={onChange} />;
    const wrapper = mount(component);
    const children = wrapper.find(Children);

    expect(wrapper.exists()).toEqual(true);
    expect(children.exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup)).toHaveLength(6);
    expect(children.find(CheckboxGroup)).toHaveLength(5);
  });

  it('should show partially checked state', () => {
    const onChange = jest.fn();

    const data = {
      parent: {
        id: '1',
        name: 'Flower',
        checked: 1,
      },
      children: [
        {
          id: '11',
          name: 'Indica',
          checked: true,
        },
        {
          id: '12',
          name: 'Sativa',
          checked: true,
        },
        {
          id: '13',
          name: 'Hybrid',
          checked: false,
        },
        {
          id: '14',
          name: 'Pre Rolls',
          checked: false,
        },
        {
          id: '15',
          name: 'Seeds & Clones',
          checked: false,
        },
      ],
    };

    const component = <CheckboxTree state={data} onChange={onChange} />;
    const wrapper = mount(component);
    const children = wrapper.find(Children);

    expect(wrapper.exists()).toEqual(true);
    expect(children.exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup)).toHaveLength(6);
    expect(children.find(CheckboxGroup)).toHaveLength(5);
    expect(wrapper.find(Check)).toHaveLength(2);
    expect(wrapper.find(PartialCheck)).toHaveLength(1);
  });

  it('should show fully checked state', () => {
    const onChange = jest.fn();

    const data = {
      parent: {
        id: '1',
        name: 'Flower',
        checked: 2,
      },
      children: [
        {
          id: '11',
          name: 'Indica',
          checked: true,
        },
        {
          id: '12',
          name: 'Sativa',
          checked: true,
        },
        {
          id: '13',
          name: 'Hybrid',
          checked: true,
        },
        {
          id: '14',
          name: 'Pre Rolls',
          checked: true,
        },
        {
          id: '15',
          name: 'Seeds & Clones',
          checked: true,
        },
      ],
    };

    const component = <CheckboxTree state={data} onChange={onChange} />;
    const wrapper = mount(component);
    const children = wrapper.find(Children);

    expect(wrapper.exists()).toEqual(true);
    expect(children.exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup)).toHaveLength(6);
    expect(children.find(CheckboxGroup)).toHaveLength(5);
    expect(wrapper.find(Check)).toHaveLength(6);
    expect(wrapper.find(PartialCheck)).toHaveLength(0);
  });

  it('should handle child click and set partial check for parent', () => {
    const onChange = jest.fn();

    const component = <CheckboxTree state={defaultData} onChange={onChange} />;
    const wrapper = mount(component);
    const children = wrapper.find(Children);

    children
      .find(Checkbox)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.parent.checked).toEqual(1);
    expect(nextState.children[0].checked).toEqual(true);
  });

  it('should check all children when unchecked parent is checked', () => {
    const onChange = jest.fn();

    const component = <CheckboxTree state={defaultData} onChange={onChange} />;
    const wrapper = mount(component);

    wrapper
      .find(Checkbox)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.parent.checked).toEqual(2);
    expect(
      nextState.children.forEach(child => {
        expect(child.checked).toEqual(true);
      }),
    );
  });

  it('should check all children when partially checked parent is checked', () => {
    const onChange = jest.fn();

    const data = {
      parent: {
        id: '1',
        name: 'Flower',
        checked: 1,
      },
      children: [
        {
          id: '11',
          name: 'Indica',
          checked: true,
        },
        {
          id: '12',
          name: 'Sativa',
          checked: true,
        },
        {
          id: '13',
          name: 'Hybrid',
          checked: false,
        },
        {
          id: '14',
          name: 'Pre Rolls',
          checked: false,
        },
        {
          id: '15',
          name: 'Seeds & Clones',
          checked: false,
        },
      ],
    };

    const component = <CheckboxTree state={data} onChange={onChange} />;
    const wrapper = mount(component);

    expect(wrapper.find(Check)).toHaveLength(2);
    expect(wrapper.find(PartialCheck)).toHaveLength(1);

    wrapper
      .find(Checkbox)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.parent.checked).toEqual(2);
    expect(
      nextState.children.forEach(child => {
        expect(child.checked).toEqual(true);
      }),
    );
  });

  it('should uncheck all children when checked parent is unchecked', () => {
    const onChange = jest.fn();

    const data = {
      parent: {
        id: '1',
        name: 'Flower',
        checked: 2,
      },
      children: [
        {
          id: '11',
          name: 'Indica',
          checked: true,
        },
        {
          id: '12',
          name: 'Sativa',
          checked: true,
        },
        {
          id: '13',
          name: 'Hybrid',
          checked: true,
        },
        {
          id: '14',
          name: 'Pre Rolls',
          checked: true,
        },
        {
          id: '15',
          name: 'Seeds & Clones',
          checked: true,
        },
      ],
    };

    const component = <CheckboxTree state={data} onChange={onChange} />;
    const wrapper = mount(component);

    expect(wrapper.find(Check)).toHaveLength(6);
    expect(wrapper.find(PartialCheck)).toHaveLength(0);

    wrapper
      .find(Checkbox)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.parent.checked).toEqual(0);
    expect(
      nextState.children.forEach(child => {
        expect(child.checked).toEqual(false);
      }),
    );
  });

  it('should check parent with no children', () => {
    const onChange = jest.fn();

    const data = {
      parent: {
        id: '1',
        name: 'Flower',
        checked: 0,
      },
      children: [],
    };

    const component = <CheckboxTree state={data} onChange={onChange} />;
    const wrapper = mount(component);

    expect(wrapper.find(Check)).toHaveLength(0);
    expect(wrapper.find(PartialCheck)).toHaveLength(0);

    wrapper
      .find(Checkbox)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.parent.checked).toEqual(2);
  });

  it('should uncheck parent with no children', () => {
    const onChange = jest.fn();

    const data = {
      parent: {
        id: '1',
        name: 'Flower',
        checked: 2,
      },
      children: [],
    };

    const component = <CheckboxTree state={data} onChange={onChange} />;
    const wrapper = mount(component);

    expect(wrapper.find(Check)).toHaveLength(1);
    expect(wrapper.find(PartialCheck)).toHaveLength(0);

    wrapper
      .find(Checkbox)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();

    const nextState = onChange.mock.calls[0][0];
    expect(nextState.parent.checked).toEqual(0);
  });
});
