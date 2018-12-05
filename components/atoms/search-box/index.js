// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import {
  SearchWrapper,
  InputText,
  SearchSubmit,
  SearchClear,
  SearchIcon,
  CloseIcon,
} from './styles';

type Props = {
  placeholder?: string,
  onHandleSearch: string => void,
};

export class SearchBox extends Component<Props> {
  static defaultProps = {
    placeholder: 'Search',
  };

  @observable
  query: string = '';

  @computed
  get isActive(): boolean {
    return !!this.query.length;
  }

  @action
  onChange = (input: { target: HTMLInputElement }) => {
    this.query = input.target.value;
  };

  @action
  onClearQuery = () => {
    this.query = '';
    this.props.onHandleSearch('');
  };

  onKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearchSubmit();
    }
  };

  onSearchSubmit = () => {
    this.props.onHandleSearch(this.query);
  };

  render() {
    const { placeholder } = this.props;
    return (
      <SearchWrapper>
        <SearchSubmit onClick={this.onSearchSubmit} disabled={!this.isActive}>
          <SearchIcon isActive={this.isActive} />
        </SearchSubmit>
        <InputText
          value={this.query}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder={placeholder}
        />
        {this.isActive && (
          <SearchClear onClick={this.onClearQuery}>
            <CloseIcon />
          </SearchClear>
        )}
      </SearchWrapper>
    );
  }
}

export default observer(SearchBox);
