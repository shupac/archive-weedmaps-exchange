import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import CheckboxTree from 'components/atoms/checkbox-tree';
import CheckboxGroup from 'components/atoms/checkbox-group';
import ComboCheckbox from 'components/atoms/combo-checkbox';
import { TreeFilterSection } from './';

function setup(categoriesQuery) {
  const mockRouter = {
    query: {
      tab: 'catalog',
      categories: categoriesQuery,
    },
  };
  if (!categoriesQuery) delete mockRouter.query.categories;

  const mockTrees = [
    {
      parent: {
        id: '1',
        name: 'Category1',
      },
      children: [
        {
          id: '11',
          name: 'Subcategory1',
        },
        {
          id: '12',
          name: 'Subcategory2',
        },
        {
          id: '13',
          name: 'Subcategory3',
        },
        {
          id: '14',
          name: 'Subcategory4',
        },
      ],
    },
    {
      parent: {
        id: '2',
        name: 'Category2',
      },
      children: [
        {
          id: '21',
          name: 'Subcategory21',
        },
        {
          id: '22',
          name: 'Subcategory22',
        },
        {
          id: '23',
          name: 'Subcategory23',
        },
        {
          id: '24',
          name: 'Subcategory24',
        },
      ],
    },
  ];

  const component = (
    <TreeFilterSection
      router={mockRouter}
      paramKey="categories"
      trees={mockTrees}
      title="Categories"
      defaultLabel="All Categories"
    />
  );
  const wrapper = shallow(component);

  return wrapper;
}

describe('TreeFilterSection', () => {
  it('should render the filter section', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render a section of checkbox trees', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(CheckboxTree).exists()).toEqual(true);
    expect(wrapper.find(CheckboxTree)).toHaveLength(2);
  });

  it('should set the checked states with none selections', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
    const trees = wrapper.find(CheckboxTree);
    expect(trees.at(0).props().state.parent.checked).toEqual(0);
    expect(trees.at(0).props().state.children[0].checked).toEqual(false);
    expect(trees.at(0).props().state.children[1].checked).toEqual(false);
    expect(trees.at(0).props().state.children[2].checked).toEqual(false);
    expect(trees.at(0).props().state.children[3].checked).toEqual(false);
    expect(trees.at(1).props().state.parent.checked).toEqual(0);
    expect(trees.at(1).props().state.children[0].checked).toEqual(false);
    expect(trees.at(1).props().state.children[1].checked).toEqual(false);
    expect(trees.at(1).props().state.children[2].checked).toEqual(false);
    expect(trees.at(1).props().state.children[3].checked).toEqual(false);
  });

  it('should set the checked states with one parent selection', () => {
    const wrapper = setup('1');
    const trees = wrapper.find(CheckboxTree);
    expect(trees.at(0).props().state.parent.checked).toEqual(2);
    expect(trees.at(0).props().state.children[0].checked).toEqual(true);
    expect(trees.at(0).props().state.children[1].checked).toEqual(true);
    expect(trees.at(0).props().state.children[2].checked).toEqual(true);
    expect(trees.at(0).props().state.children[3].checked).toEqual(true);
    expect(trees.at(1).props().state.parent.checked).toEqual(0);
    expect(trees.at(1).props().state.children[0].checked).toEqual(false);
    expect(trees.at(1).props().state.children[1].checked).toEqual(false);
    expect(trees.at(1).props().state.children[2].checked).toEqual(false);
    expect(trees.at(1).props().state.children[3].checked).toEqual(false);
  });

  it('should set the checked states with one child selection', () => {
    const wrapper = setup('11');
    const trees = wrapper.find(CheckboxTree);
    expect(trees.at(0).props().state.parent.checked).toEqual(1);
    expect(trees.at(0).props().state.children[0].checked).toEqual(true);
    expect(trees.at(0).props().state.children[1].checked).toEqual(false);
    expect(trees.at(0).props().state.children[2].checked).toEqual(false);
    expect(trees.at(0).props().state.children[3].checked).toEqual(false);
    expect(trees.at(1).props().state.parent.checked).toEqual(0);
    expect(trees.at(1).props().state.children[0].checked).toEqual(false);
    expect(trees.at(1).props().state.children[1].checked).toEqual(false);
    expect(trees.at(1).props().state.children[2].checked).toEqual(false);
    expect(trees.at(1).props().state.children[3].checked).toEqual(false);
  });

  it('should set the checked states with multiple child selections', () => {
    const wrapper = setup('11/12/21/22');
    const trees = wrapper.find(CheckboxTree);
    expect(trees.at(0).props().state.parent.checked).toEqual(1);
    expect(trees.at(0).props().state.children[0].checked).toEqual(true);
    expect(trees.at(0).props().state.children[1].checked).toEqual(true);
    expect(trees.at(0).props().state.children[2].checked).toEqual(false);
    expect(trees.at(0).props().state.children[3].checked).toEqual(false);
    expect(trees.at(1).props().state.parent.checked).toEqual(1);
    expect(trees.at(1).props().state.children[0].checked).toEqual(true);
    expect(trees.at(1).props().state.children[1].checked).toEqual(true);
    expect(trees.at(1).props().state.children[2].checked).toEqual(false);
    expect(trees.at(1).props().state.children[3].checked).toEqual(false);
  });

  it('should set the checked states with all child selections', () => {
    const wrapper = setup('11/12/13/14/21/22/23/24');
    const trees = wrapper.find(CheckboxTree);
    expect(trees.at(0).props().state.parent.checked).toEqual(2);
    expect(trees.at(0).props().state.children[0].checked).toEqual(true);
    expect(trees.at(0).props().state.children[1].checked).toEqual(true);
    expect(trees.at(0).props().state.children[2].checked).toEqual(true);
    expect(trees.at(0).props().state.children[3].checked).toEqual(true);
    expect(trees.at(1).props().state.parent.checked).toEqual(2);
    expect(trees.at(1).props().state.children[0].checked).toEqual(true);
    expect(trees.at(1).props().state.children[1].checked).toEqual(true);
    expect(trees.at(1).props().state.children[2].checked).toEqual(true);
    expect(trees.at(1).props().state.children[3].checked).toEqual(true);
  });

  it('should update the query params when a parent option is clicked', () => {
    const wrapper = setup();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find(CheckboxTree)
      .at(0)
      .dive()
      .find(CheckboxGroup)
      .at(0)
      .dive()
      .find(ComboCheckbox)
      .dive()
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      categories: ['1'],
    });
    pushRoute.mockRestore();
  });

  it('should update the query params when a child option is clicked', () => {
    const wrapper = setup();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find(CheckboxTree)
      .at(0)
      .dive()
      .find(CheckboxGroup)
      .at(1)
      .dive()
      .find(ComboCheckbox)
      .dive()
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      categories: ['11'],
    });
    pushRoute.mockRestore();
  });

  it('should update the query params when all child options are clicked', () => {
    const wrapper = setup('11/12/13');
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find(CheckboxTree)
      .at(0)
      .dive()
      .find(CheckboxGroup)
      .at(4)
      .dive()
      .find(ComboCheckbox)
      .dive()
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      categories: ['1'],
    });
    pushRoute.mockRestore();
  });

  it('should delete query param when all parent options are unchecked', () => {
    const wrapper = setup('1');
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find(CheckboxTree)
      .at(0)
      .dive()
      .find(CheckboxGroup)
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

  it('should delete query param when all child options are unchecked', () => {
    const wrapper = setup('11');
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find(CheckboxTree)
      .at(0)
      .dive()
      .find(CheckboxGroup)
      .at(1)
      .dive()
      .find(ComboCheckbox)
      .dive()
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
    });
    pushRoute.mockRestore();
  });

  it('should display the parent label for parent selection', () => {
    const wrapper = setup('1');
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('Category1');
  });

  it('should display the parent label when some children are selected', () => {
    const wrapper = setup('11/12/13');
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('Subcategory1, Subcategory2, Subcategory3');
  });

  it('should display the default label with no selections', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('All Categories');
  });

  it('should display the default label with all selections', () => {
    const wrapper = setup('1/2');
    const instance = wrapper.instance();
    const labels = instance.getLabels();
    expect(labels).toEqual('All Categories');
  });
});
