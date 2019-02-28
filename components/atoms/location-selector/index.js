// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { type StoreType } from 'lib/types/store';
import { type LocationType } from 'lib/data-access/models/location';
import { MapPin } from 'components/atoms/icons';
import { SelectWrapper, Select } from './styles';

type Props = {
  store: StoreType,
  isHidden: boolean,
};

export class LocationSelector extends Component<Props> {
  dispose = reaction(
    () => {
      const { buyerSettings } = this.props.store;
      return buyerSettings.activeLocation;
    },
    (location: LocationType) => {
      const { buyerSettings } = this.props.store;
      buyerSettings.syncActiveLocation(location.id);
    },
    { name: 'syncActiveLocation on location change' },
  );

  componentWillUnmount() {
    this.dispose();
  }

  /**
   * Formats active selection for Select
   * @param location
   * @returns {text: LocationType.name, value: LocationType.id}
   */
  setActiveSelection = (location: LocationType) => {
    if (location) {
      return {
        text: location.name,
        value: location.id,
      };
    }
    return null;
  };

  /**
   * Formats the locations array options for Select consumption
   * @param locations
   * @returns {{text: LocationType.name, value: LocationType.id}[]}
   */
  setLocationOptions = (locations: LocationType[]) =>
    // $FlowFixMe
    locations.map(({ name, id }) => ({
      text: name,
      value: id,
    }));

  /**
   * Select onChange handler
   * @param locationSelected
   */
  handleSelectChange = async ({ value: locationId }: { value: string }) => {
    const { buyerSettings, uiStore } = this.props.store;
    const success = await buyerSettings.updateActiveLocation(locationId);
    if (!success) {
      uiStore.notifyToast({
        title: 'Location Error',
        body: 'Location was deleted by another user.',
        autoDismiss: 8000,
        status: 'ERROR',
      });
    }
  };

  render() {
    const { isHidden } = this.props;
    const { buyerSettings } = this.props.store;
    const { locations, activeLocation } = buyerSettings;

    if (isHidden) return null;

    return (
      <SelectWrapper>
        <MapPin size={16} />
        <Select
          items={this.setLocationOptions(locations)}
          selectedItem={this.setActiveSelection(activeLocation)}
          itemToString={item => item && item.text}
          onChange={this.handleSelectChange}
          placeholder="Loading locations.."
        />
      </SelectWrapper>
    );
  }
}

export default inject('store')(observer(LocationSelector));
