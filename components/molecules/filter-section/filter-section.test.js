import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import CheckboxGroup from 'components/atoms/checkbox-group';
import ComboCheckbox from 'components/atoms/combo-checkbox';
import { FilterSection } from './';

function setup(brandsQuery) {
  const mockRouter = {
    query: {
      tab: 'catalog',
      brands: brandsQuery,
    },
  };
  if (!brandsQuery) delete mockRouter.query.brands;

  const mockOptions = [
    {
      id: '1',
      name: 'Brand1',
    },
    {
      id: '2',
      name: 'Brand2',
    },
    {
      id: '3',
      name: 'Brand3',
    },
    {
      id: '4',
      name: 'Brand4',
    },
  ];

  const component = (
    <FilterSection
      router={mockRouter}
      paramKey="brands"
      options={mockOptions}
      title="Brands"
      defaultLabel="All Brands"
      route="marketplace"
      routeParams={{ tab: 'catalog' }}
    />
  );
  const wrapper = shallow(component);

  return wrapper;
}

describe('FilterSection', () => {
  it('should render the filter section', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render a section of checkbox groups', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup).exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup)).toHaveLength(4);
  });

  it('should set the checked states with none selections', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
    const checkboxes = wrapper.find(CheckboxGroup);
    expect(checkboxes.at(0).props().state.checked).toEqual(false);
    expect(checkboxes.at(1).props().state.checked).toEqual(false);
    expect(checkboxes.at(2).props().state.checked).toEqual(false);
    expect(checkboxes.at(3).props().state.checked).toEqual(false);
  });

  it('should set the checked states with one selection', () => {
    const wrapper = setup('1');
    expect(wrapper.exists()).toEqual(true);
    const checkboxes = wrapper.find(CheckboxGroup);
    expect(checkboxes.at(0).props().state.checked).toEqual(true);
    expect(checkboxes.at(1).props().state.checked).toEqual(false);
    expect(checkboxes.at(2).props().state.checked).toEqual(false);
    expect(checkboxes.at(3).props().state.checked).toEqual(false);
  });

  it('should set the checked states with multiple selections', () => {
    const wrapper = setup('1/2');
    expect(wrapper.exists()).toEqual(true);
    const checkboxes = wrapper.find(CheckboxGroup);
    expect(checkboxes.at(0).props().state.checked).toEqual(true);
    expect(checkboxes.at(1).props().state.checked).toEqual(true);
    expect(checkboxes.at(2).props().state.checked).toEqual(false);
    expect(checkboxes.at(3).props().state.checked).toEqual(false);
  });

  it('should update the query params when an option is clicked', () => {
    const wrapper = setup('1/2');
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const checkboxes = wrapper.find(CheckboxGroup);
    checkboxes
      .at(2)
      .dive()
      .find(ComboCheckbox)
      .dive()
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      brands: ['1', '2', '3'],
    });
    pushRoute.mockRestore();
  });

  it('should delete query param when all options are unchecked', () => {
    const wrapper = setup('1');
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const checkboxes = wrapper.find(CheckboxGroup);
    checkboxes
      .at(0)
      .dive()
      .find(ComboCheckbox)
      .dive()
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
    });
    pushRoute.mockRestore();
  });

  it('should display the correct filter labels', () => {
    const wrapper = setup('1/2');
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('Brand1, Brand2');
  });

  it('should display the default label with no selections', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('All Brands');
  });

  it('should display the default label with all selections', () => {
    const wrapper = setup('1/2/3/4');
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('All Brands');
  });
});
