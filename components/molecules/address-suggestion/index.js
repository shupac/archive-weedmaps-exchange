// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import type { StoreType } from 'lib/types/store';
import {
  AddressSuggestionInput,
  GoogleBadge,
  AddressSuggestionWrapper,
  SuggestionList,
  SuggestionListItem,
} from './styles';

type Props = {
  store: StoreType,
};

type State = {
  isAddressCommitted: boolean,
};

class AddressSuggestions extends Component<Props, State> {
  state = {
    isAddressCommitted: false,
  };

  dispose = reaction(
    () => {
      const { addressSuggestions } = this.props.store;
      return addressSuggestions.addressInput;
    },
    input => {
      const { addressSuggestions } = this.props.store;
      addressSuggestions.getAddressSuggestions(input);
    },
    { delay: 500 },
  );

  componentWillUnmount() {
    this.dispose();
  }

  onAddressQuery = event => {
    const { addressSuggestions } = this.props.store;
    this.setState({ isAddressCommitted: false });
    if (!event.target.value.length) {
      addressSuggestions.clearAddressSuggestions();
      addressSuggestions.getAddressSuggestions(event.target.value);
    }
    addressSuggestions.setQuery(event.target.value);
  };

  onAddressSuggestion = suggestion => async () => {
    const { addressSuggestions } = this.props.store;
    addressSuggestions.setQuery(suggestion.address);
    this.setState({ isAddressCommitted: true });
  };

  render() {
    const { isAddressCommitted } = this.state;
    const {
      suggestedAddresses,
      addressInput,
    } = this.props.store.addressSuggestions;
    return (
      <AddressSuggestionWrapper>
        <AddressSuggestionInput
          placeholder="Enter address"
          name="addressQuery"
          value={addressInput}
          onChange={this.onAddressQuery}
        />
        {!isAddressCommitted &&
          suggestedAddresses &&
          suggestedAddresses.length > 0 && (
            <SuggestionList>
              {suggestedAddresses.map(suggestion => (
                <SuggestionListItem
                  onClick={this.onAddressSuggestion(suggestion)}
                  name="addressSuggestion"
                  key={suggestion.address}
                >
                  {suggestion.address}
                </SuggestionListItem>
              ))}
              <GoogleBadge>
                <img
                  alt="Powered By Google"
                  src="/static/images/powered_by_google_on_white.png"
                />
              </GoogleBadge>
            </SuggestionList>
          )}
      </AddressSuggestionWrapper>
    );
  }
}

export default inject('store')(observer(AddressSuggestions));
