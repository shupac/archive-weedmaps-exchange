// @flow
import React, { Component } from 'react';
import get from 'lodash.get';
import { Select, Icons, WmTheme } from '@ghostgroup/ui';
import queryString from 'query-string';

import {
  SearchBarWrapper,
  SearchIcon,
  SearchInputText,
  SelectWrapper,
} from './styles';

const { Search } = Icons;
const { state } = WmTheme.style;

// TODO: Pull in real data
const items = [
  { text: 'All', value: 'all' },
  { text: 'Indica', value: 'indica' },
  { text: 'Sativa', value: 'sativa' },
  { text: 'Hybrid', value: 'hybrid' },
  { text: 'Edible', value: 'edible' },
  { text: 'Concentrate', value: 'concentrate' },
  { text: 'Drink', value: 'drink' },
  { text: 'Clone', value: 'clone' },
  { text: 'Seed', value: 'seed' },
];

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
};

class SearchBar extends Component<Props, State> {
  state = {
    searchValue: '',
    categorySelected: null,
  };

  componentWillMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updateState(nextProps);
  }

  updateState(props: Props) {
    const { query } = props;
    const { search, department } = queryString.parse(query);

    const category = items.find(i => i.value === department);

    this.setState({
      searchValue: search || '',
      categorySelected: category || items[0],
    });
  }

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
    //const { dispatch } = this.props;
    const { searchValue, categorySelected } = this.state;

    const query = queryString.stringify({
      search: searchValue,
      department: categorySelected && categorySelected.value,
    });

    // dispatch(push(`/buyer/marketplace/catalog?${query}`));
  }

  render() {
    const { searchValue, categorySelected } = this.state;

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

export default SearchBar;
