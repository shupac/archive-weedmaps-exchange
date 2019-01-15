// @flow
import * as React from 'react';
import TextInput from 'components/atoms/forms/text-input';
import { ButtonPrimary, ButtonWhite } from 'components/atoms/button';
import { inject, observer } from 'mobx-react';
import { observable, type ObservableMap } from 'mobx';
import ZoneColorSelect from 'components/atoms/zone-color-select';
import { type ZoneType } from 'lib/data-access/models/zone';
import { type RegionType } from 'lib/data-access/models/region';
import {
  NewZoneContainer,
  NewZoneFooter,
  NewZoneHeader,
  ZoneRegionList,
  ZoneRegionListItem,
  ZoneCount,
  ZoneFormHeader,
  ZoneRegionListDelete,
  ClearButton,
  FormControl,
} from './styles';

type Props = {
  zone: ZoneType,
  selectedRegions: ObservableMap<number, RegionType>,
  onRemoveRegionFromZone: (zone: ZoneType, region: RegionType) => void,
  onCancel: () => void,
  onSubmit: () => void,
};

export class ZoneForm extends React.Component<Props> {
  @observable name = this.props.zone.name;
  @observable color = this.props.zone.color;
  originalColor = this.props.zone.color;

  onColorSelect = (color: string) => {
    this.props.zone.setColor(color);
  };

  onNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.name = e.currentTarget.value;
  };

  onCancel = () => {
    // reset color
    if (this.props.onCancel) {
      this.props.zone.setColor(this.originalColor);
      this.props.onCancel();
    }
  };

  onSubmit = () => {
    if (this.props.onSubmit) {
      // commit the name change
      this.props.zone.setName(this.name);
      this.props.onSubmit();
    }
  };

  render() {
    return (
      <NewZoneContainer>
        <ZoneFormHeader p={[12]}>
          <NewZoneHeader>New Zone</NewZoneHeader>
          <FormControl>
            <label htmlFor="zone-name">Zone Name</label>
            <TextInput
              hasError={false}
              errorMessage=""
              placeholder="Zone Name e.g. West Coast Zone"
              name="zone-name"
              onChange={this.onNameChange}
              value={this.name}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="zone-color">Zone Color</label>
            <ZoneColorSelect
              initialSelection={this.color}
              onColorSelect={this.onColorSelect}
            />
          </FormControl>
        </ZoneFormHeader>
        <ZoneCount data-test-id="zone-count">Selected Regions</ZoneCount>
        <ZoneRegionList>
          {Array.from(this.props.selectedRegions.values()).map(r => (
            <ZoneRegionListItem key={r.id}>
              {r.name.replace('Brands', '')}
              <ClearButton
                onClick={() =>
                  this.props.onRemoveRegionFromZone(this.props.zone, r)
                }
              >
                <ZoneRegionListDelete />
              </ClearButton>
            </ZoneRegionListItem>
          ))}
        </ZoneRegionList>
        <NewZoneFooter justifyContent="space-around" alignItems="center">
          <ButtonWhite onClick={this.onCancel}>Cancel</ButtonWhite>
          <ButtonPrimary onClick={this.onSubmit}>Save</ButtonPrimary>
        </NewZoneFooter>
      </NewZoneContainer>
    );
  }
}

export default inject('store')(observer(ZoneForm));
