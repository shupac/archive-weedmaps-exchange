import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import get from 'lodash.get';
import { Select, Icons, WmTheme } from '@ghostgroup/ui';
import { Router } from 'lib/routes';
import { type StoreType } from 'lib/types/store';
import { type RouterType } from 'lib/types/router';

import {
  SearchBarWrapper,
  SearchIcon,
  SearchInputText,
  SelectWrapper,
} from './styles';

const { Search } = Icons;
const { state } = WmTheme.style;

type Props = {
  showCategory: boolean,
  store: StoreType,
  router: RouterType,
};

type State = {
  searchValue: string,
  categorySelected: any,
};

type CategorySelected = {
  value: string,
  text: string,
};

const allOption = {
  value: 'all',
  text: 'All',
};

class SearchBar extends Component<Props, State> {
  static displayName = 'SearchBar';

  static defaultProps = {
    showCategory: true,
  };

  state = {
    searchValue: '',
    categorySelected: allOption,
  };

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.asPath !== this.props.router.asPath)
      this.updateState();
  }

  updateState = () => {
    const { search, category } = this.props.router.query;

    const options = this.getOptions();
    const categorySelected = options.find(i => i.value === category);

    this.setState({
      searchValue: search || '',
      categorySelected: categorySelected || options[0],
    });
  };

  getOptions = () => {
    const { departments } = this.props.store.buyerSettings;

    const options = departments.map(({ id, name }) => ({
      value: id,
      text: name,
    }));

    options.unshift(allOption);

    return options;
  };

  handleSelectChange = (categorySelected: CategorySelected) => {
    this.setState({ categorySelected });
  };

  handleSearchInputChange = (searchInput: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ searchValue: get(searchInput, 'target.value', '') });
  };

  onKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSearch();
    }
  };

  handleSearch = () => {
    const { showCategory, router } = this.props;
    const { query: existingQuery } = router;

    const { searchValue, categorySelected } = this.state;

    const queryParams = {
      ...existingQuery,
      tab: 'catalog',
      search: searchValue,
    };

    if (showCategory && categorySelected.value !== 'all') {
      queryParams.categories = categorySelected.value;
    }
    if (!searchValue) {
      delete queryParams.search;
    }

    Router.pushRoute('marketplace', queryParams);
  };

  render() {
    const { showCategory } = this.props;
    const { searchValue, categorySelected } = this.state;

    const options = this.getOptions();

    return (
      <SearchBarWrapper>
        {showCategory && (
          <SelectWrapper>
            <Select
              items={options}
              selectedItem={categorySelected}
              onChange={this.handleSelectChange}
            />
          </SelectWrapper>
        )}
        <SearchInputText
          value={searchValue}
          onChange={this.handleSearchInputChange}
          onKeyDown={this.onKeyDown}
          placeholder="What are you looking for?"
          showBorder={!showCategory}
        />
        <SearchIcon onClick={this.handleSearch}>
          <Search fill={state.secondary} size="16px" />
        </SearchIcon>
      </SearchBarWrapper>
    );
  }
}

export default withRouter(inject('store')(observer(SearchBar)));
export { SearchBar };
