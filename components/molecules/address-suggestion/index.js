// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { type StoreType } from 'lib/types/store';
import {
  AddressSuggestionInput,
  GoogleBadge,
  AddressSuggestionWrapper,
  SuggestionList,
  SuggestionListItem,
} from './styles';

type Props = {
  store: StoreType,
  id: string,
  name: string,
  onBlur: (event: any) => void,
  onChange: (event: any) => void,
  type: string,
  error: boolean,
  setFieldValue: ('address', string) => void,
};

class AddressSuggestions extends Component<Props> {
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
    addressSuggestions.setAddressCommitted(false);
    if (!event.target.value.length) {
      addressSuggestions.clearAddressSuggestions();
      addressSuggestions.getAddressSuggestions(event.target.value);
    }
    addressSuggestions.setQuery(event.target.value);
    this.props.onChange(event);
  };

  onAddressSuggestion = suggestion => () => {
    const { addressSuggestions } = this.props.store;
    addressSuggestions.setQuery(suggestion.address);
    addressSuggestions.setAddressCommitted(true);
    this.props.setFieldValue('address', suggestion.address);
  };

  render() {
    const { error, name, type, onBlur, id, store } = this.props;
    const {
      suggestedAddresses,
      addressInput,
      isAddressCommitted,
    } = store.addressSuggestions;

    return (
      <AddressSuggestionWrapper>
        <AddressSuggestionInput
          data-test-id={id}
          type={type}
          placeholder="Enter address"
          name={name}
          value={addressInput}
          onChange={this.onAddressQuery}
          onBlur={onBlur}
          error={error}
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
