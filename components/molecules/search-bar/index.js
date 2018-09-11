import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash.get';
import { Select, Icons, WmTheme } from '@ghostgroup/ui';
import qs from 'qs';
import { Router } from 'lib/routes';

import {
  SearchBarWrapper,
  SearchIcon,
  SearchInputText,
  SelectWrapper,
} from './styles';

const { Search } = Icons;
const { state } = WmTheme.style;

type Props = {
  dispatch: any => void,
  query: string,
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

  state = {
    searchValue: '',
    categorySelected: allOption,
  };

  // componentWillMount() {
  //   // this.updateState(this.props);
  // }
  //
  // componentWillReceiveProps(nextProps: Props) {
  //   // this.updateState(nextProps);
  // }

  // updateState(props: Props) {
  //   const { query } = props;
  //   const { search, department } = qs.parse(query);
  //
  //   const category = items.find(i => i.value === department);
  //
  //   this.setState({
  //     searchValue: search || '',
  //     categorySelected: category || items[0],
  //   });
  // }

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

  handleSearch() {
    const { searchValue, categorySelected } = this.state;

    Router.pushRoute('marketplace', {
      tab: 'catalog',
      search: searchValue,
      category: categorySelected && categorySelected.value,
    });
  }

  render() {
    const {
      store: {
        categoryStore: { departments },
      },
    } = this.props;
    const { searchValue, categorySelected } = this.state;

    const items = departments.map(({ id, name }) => ({
      value: id,
      text: name,
    }));
    items.unshift(allOption);

    return (
      <SearchBarWrapper>
        <SelectWrapper>
          <Select
            items={items}
            selectedItem={categorySelected}
            onChange={this.handleSelectChange}
          />
        </SelectWrapper>
        <SearchInputText
          value={searchValue}
          onChange={this.handleSearchInputChange}
          onKeyDown={this.onKeyDown}
          placeholder="What are you looking for?"
        />
        <SearchIcon onClick={() => this.handleSearch()}>
          <Search fill={state.secondary} size="16px" />
        </SearchIcon>
      </SearchBarWrapper>
    );
  }
}

export default inject('store')(observer(SearchBar));
