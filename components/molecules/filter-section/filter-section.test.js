import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  categories,
  brands,
} from 'components/molecules/filter-panel/mock-data';
import CheckboxTree from 'components/atoms/checkbox-tree';
import CheckboxGroup from 'components/atoms/checkbox-group';
import { FiltersLabel } from 'components/atoms/filter-container/styles';
import FilterSection from './';

describe('FilterSection', () => {
  it('should render the filter section', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        type="tree"
        title="Categories"
        defaultLabel="All Categories"
        state={[]}
        onChange={onChange}
      />
    );
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render a section of checkbox trees', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        type="tree"
        title="Categories"
        defaultLabel="All Categories"
        state={categories}
        onChange={onChange}
      />
    );
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(CheckboxTree).exists()).toEqual(true);
    expect(wrapper.find(CheckboxTree)).toHaveLength(3);
  });

  it('should render a section of checkbox groups', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        title="Brands"
        defaultLabel="All Brands"
        state={brands}
        onChange={onChange}
      />
    );
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup).exists()).toEqual(true);
    expect(wrapper.find(CheckboxGroup)).toHaveLength(15);
  });

  it('should aggregate the selected filters for a series of trees', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        type="tree"
        title="Categories"
        defaultLabel="All Categories"
        state={[
          {
            parent: {
              id: '1',
              name: 'parent1',
            },
            children: [
              {
                id: '11',
                name: 'child1',
                checked: true,
              },
              {
                id: '12',
                name: 'child2',
                checked: false,
              },
            ],
          },
          {
            parent: {
              id: '2',
              name: 'parent2',
            },
            children: [
              {
                id: '21',
                name: 'child3',
                checked: true,
              },
              {
                id: '22',
                name: 'child4',
                checked: true,
              },
            ],
          },
        ]}
        onChange={onChange}
      />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('parent1')).toEqual(false);
    expect(label.includes('parent2')).toEqual(true);
    expect(label.includes('child1')).toEqual(true);
    expect(label.includes('child2')).toEqual(false);
    expect(label.includes('child3')).toEqual(false);
    expect(label.includes('child4')).toEqual(false);
  });

  it('should show the default label for a series of trees with no selection', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        type="tree"
        title="Categories"
        defaultLabel="All Categories"
        state={[
          {
            parent: {
              id: '1',
              name: 'parent1',
            },
            children: [
              {
                id: '11',
                name: 'child1',
                checked: false,
              },
              {
                id: '12',
                name: 'child2',
                checked: false,
              },
            ],
          },
          {
            parent: {
              id: '2',
              name: 'parent2',
            },
            children: [
              {
                id: '21',
                name: 'child3',
                checked: false,
              },
              {
                id: '22',
                name: 'child4',
                checked: false,
              },
            ],
          },
        ]}
        onChange={onChange}
      />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('parent1')).toEqual(false);
    expect(label.includes('parent2')).toEqual(false);
    expect(label.includes('child1')).toEqual(false);
    expect(label.includes('child2')).toEqual(false);
    expect(label.includes('child3')).toEqual(false);
    expect(label.includes('child4')).toEqual(false);
    expect(label.includes('All Categories')).toEqual(true);
  });

  it('should show the default label for a series of trees with all selected', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        type="tree"
        title="Categories"
        defaultLabel="All Categories"
        state={[
          {
            parent: {
              id: '1',
              name: 'parent1',
            },
            children: [
              {
                id: '11',
                name: 'child1',
                checked: true,
              },
              {
                id: '12',
                name: 'child2',
                checked: true,
              },
            ],
          },
          {
            parent: {
              id: '2',
              name: 'parent2',
            },
            children: [
              {
                id: '21',
                name: 'child3',
                checked: true,
              },
              {
                id: '22',
                name: 'child4',
                checked: true,
              },
            ],
          },
        ]}
        onChange={onChange}
      />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('parent1')).toEqual(false);
    expect(label.includes('parent2')).toEqual(false);
    expect(label.includes('child1')).toEqual(false);
    expect(label.includes('child2')).toEqual(false);
    expect(label.includes('child3')).toEqual(false);
    expect(label.includes('child4')).toEqual(false);
    expect(label.includes('All Categories')).toEqual(true);
  });

  it('should aggregate the selected filters for a series of trees', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        title="Brands"
        defaultLabel="All Brands"
        state={[
          {
            id: '1',
            name: 'option1',
            checked: true,
          },
          {
            id: '2',
            name: 'option2',
            checked: true,
          },
          {
            id: '3',
            name: 'option3',
            checked: false,
          },
        ]}
        onChange={onChange}
      />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();

    expect(label.includes('option1')).toEqual(true);
    expect(label.includes('option2')).toEqual(true);
    expect(label.includes('option3')).toEqual(false);
  });

  it('should show the default label for a series of trees with no selection', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        title="Brands"
        defaultLabel="All Brands"
        state={[
          {
            id: '1',
            name: 'option1',
            checked: false,
          },
          {
            id: '2',
            name: 'option2',
            checked: false,
          },
          {
            id: '3',
            name: 'option3',
            checked: false,
          },
        ]}
        onChange={onChange}
      />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('option1')).toEqual(false);
    expect(label.includes('option2')).toEqual(false);
    expect(label.includes('option3')).toEqual(false);
    expect(label.includes('All Brands')).toEqual(true);
  });

  it('should show the default label for a series of trees with all selected', () => {
    const onChange = jest.fn();
    const component = (
      <FilterSection
        title="Brands"
        defaultLabel="All Brands"
        state={[
          {
            id: '1',
            name: 'option1',
            checked: true,
          },
          {
            id: '2',
            name: 'option2',
            checked: true,
          },
          {
            id: '3',
            name: 'option3',
            checked: true,
          },
        ]}
        onChange={onChange}
      />
    );
    const wrapper = mount(component);

    const label = wrapper.find(FiltersLabel).text();
    expect(label.includes('option1')).toEqual(false);
    expect(label.includes('option2')).toEqual(false);
    expect(label.includes('option3')).toEqual(false);
    expect(label.includes('All Brands')).toEqual(true);
  });
});
