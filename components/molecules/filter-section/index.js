// @flow
import React from 'react';
import FilterContainer from 'components/atoms/filter-container';
import CheckboxTree from 'components/atoms/checkbox-tree';
import CheckboxGroup from 'components/atoms/checkbox-group';
import flatten from 'lodash/flatten';

type Checked = 0 | 1 | 2 | boolean;

type Option = {
  id: string,
  name: string,
  checked: Checked,
};

type Parent = {
  id: string,
  name: string,
};

type Group = {
  id: string,
  name: string,
  checked: Checked,
  allowPartial?: ?boolean,
  parent: Parent,
  children: Array<Option>,
};

type State = Array<Group>;

type Props = {
  type?: 'list' | 'tree',
  title: string,
  defaultLabel: string,
  state: State,
  onChange: () => void,
};

const getTreeSelection = tree => {
  const selctedChildren = tree.children.filter(({ checked }) => checked);
  if (selctedChildren.length !== tree.children.length) return selctedChildren;
  return [
    {
      id: tree.parent.id,
      name: tree.parent.name,
      checked: true,
    },
  ];
};

const FilterSection = (props: Props) => {
  const { type, title, defaultLabel, state, onChange } = props;

  let FilterComponent;
  let options = [];

  if (type === 'list') {
    FilterComponent = CheckboxGroup;
    options = state;
  }
  if (type === 'tree') {
    FilterComponent = CheckboxTree;
    options = flatten(state.map(group => getTreeSelection(group)));
  }

  const components = state.map(option => (
    <FilterComponent
      key={option.id || option.parent.id}
      state={option}
      onChange={onChange}
    />
  ));

  const selectedHash = options.reduce((acc, option) => {
    if (option.checked)
      return {
        ...acc,
        [option.id]: option,
      };
    return acc;
  }, {});

  // Have to use Object.keys to map because of flow error for Object.values
  const selected = Object.keys(selectedHash).map(id => selectedHash[id]);

  const allSelected =
    state.filter(group => selectedHash[group.id || group.parent.id]).length ===
    state.length;

  const labels =
    selected.length === 0 || allSelected
      ? defaultLabel
      : selected.map(({ name }) => name).join(', ');

  return (
    <FilterContainer title={title} filters={labels}>
      {components}
    </FilterContainer>
  );
};

FilterSection.defaultProps = {
  type: 'list',
};

export default FilterSection;
