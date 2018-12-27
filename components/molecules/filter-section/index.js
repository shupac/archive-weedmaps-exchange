// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { type RouterType } from 'lib/types/router';
import FilterContainer from 'components/atoms/filter-container';
import CheckboxGroup from 'components/atoms/checkbox-group';

type Checked = 0 | 1 | 2 | boolean;

type Option = {
  id: string,
  name: string,
  checked: Checked,
};

type Props = {
  router: RouterType,
  paramKey: string,
  options: Option[],
  title: string,
  defaultLabel: string,
  route: string,
  routeParams: mixed,
  singleSelection?: boolean,
};

class FilterSection extends React.Component<Props> {
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
    const { defaultLabel, options } = this.props;

    const selectedOptions = this.getSelectedOptions();

    const labels = options
      .filter(option => selectedOptions[option.id])
      .map(({ name }) => name);

    if (labels.length === 0 || labels.length === options.length)
      return defaultLabel;
    return labels.join(', ');
  };

  onOptionStateChange = (option: Option) => {
    const {
      paramKey,
      router,
      route,
      routeParams,
      singleSelection,
    } = this.props;

    const selectedOptions = singleSelection ? {} : this.getSelectedOptions();
    selectedOptions[option.id] = option.checked;

    const nextOptions = Object.keys(selectedOptions).filter(
      id => selectedOptions[id],
    );

    const nextParams = {
      ...router.query,
      ...routeParams,
      [paramKey]: nextOptions,
    };

    if (!nextOptions.length) delete nextParams[paramKey];
    delete nextParams.page;

    Router.pushRoute(route, nextParams);
  };

  render() {
    const { title, options } = this.props;

    const selectedOptions = this.getSelectedOptions();

    const components = options.map(option => (
      <CheckboxGroup
        key={option.id}
        state={{
          ...option,
          checked: selectedOptions[option.id] || false,
        }}
        onChange={this.onOptionStateChange}
      />
    ));

    return (
      <FilterContainer title={title} filters={this.getLabels()}>
        {components}
      </FilterContainer>
    );
  }
}

export default withRouter(FilterSection);
export { FilterSection };
