// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { type RouterType } from 'lib/types/router';
import flatten from 'lodash/flatten';
import FilterContainer from 'components/atoms/filter-container';
import CheckboxTree from 'components/atoms/checkbox-tree';

type Checked = 0 | 1 | 2 | boolean;

type Option = {
  id: string,
  name: string,
  checked: Checked,
};

type Tree = {
  parent: Option,
  children: Option[],
};

type Props = {
  router: RouterType,
  paramKey: string,
  trees: Tree[],
  title: string,
  defaultLabel: string,
};

class TreeFilterSection extends React.Component<Props> {
  getSelectedOptions = () => {
    const { router, paramKey } = this.props;
    const params = router.query;
    const selectedOptions = params[paramKey] ? params[paramKey].split('/') : [];
    const selectedHash = selectedOptions.reduce(
      (acc, id) => ({
        ...acc,
        [id]: true,
      }),
      {},
    );

    return selectedHash;
  };

  getLabels = () => {
    const { defaultLabel, trees } = this.props;

    const selectedOptions = this.getSelectedOptions();

    const parentLabels = trees
      .filter(tree => selectedOptions[tree.parent.id])
      .map(({ parent }) => parent.name);

    const childrenLabels = flatten(
      trees.map(tree =>
        tree.children
          .filter(child => selectedOptions[child.id])
          .map(({ name }) => name),
      ),
    );

    const labels = [...parentLabels, ...childrenLabels];

    if (labels.length === 0 || parentLabels.length === trees.length)
      return defaultLabel;
    return labels.join(', ');
  };

  onTreeStateChange = (tree: Tree) => {
    const { paramKey, router } = this.props;
    const { parent, children } = tree;

    const selectedOptions = this.getSelectedOptions();
    selectedOptions[parent.id] = parent.checked === 2;
    children.forEach(child => {
      selectedOptions[child.id] = parent.checked === 2 ? false : child.checked;
    });

    const nextOptions = Object.keys(selectedOptions).filter(
      id => selectedOptions[id],
    );

    const nextParams = {
      ...router.query,
      [paramKey]: nextOptions,
    };

    if (!nextOptions.length) delete nextParams[paramKey];

    Router.pushRoute('marketplace', nextParams);
  };

  getTreeState = (tree: Tree) => {
    const selectedOptions = this.getSelectedOptions();

    let parentCheckedState;
    const children = tree.children.map(child => {
      let checked;
      if (selectedOptions[tree.parent.id]) checked = true;
      else checked = selectedOptions[child.id] || false;
      return { ...child, checked };
    });
    const selectedChildren = children.filter(({ checked }) => checked);
    if (selectedChildren.length === tree.children.length) {
      parentCheckedState = 2;
    } else {
      parentCheckedState = selectedChildren.length ? 1 : 0;
    }

    return {
      parent: {
        ...tree.parent,
        checked: parentCheckedState,
      },
      children,
    };
  };

  render() {
    const { title, trees } = this.props;

    const components = trees.map(tree => (
      <CheckboxTree
        key={tree.parent.id}
        state={this.getTreeState(tree)}
        onChange={this.onTreeStateChange}
      />
    ));

    return (
      <FilterContainer title={title} filters={this.getLabels()}>
        {components}
      </FilterContainer>
    );
  }
}

export default withRouter(TreeFilterSection);
export { TreeFilterSection };
