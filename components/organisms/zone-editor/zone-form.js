// @flow
import * as React from 'react';
import { ButtonPrimary, ButtonWhite } from 'components/atoms/button';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import ZoneColorSelect from 'components/atoms/zone-color-select';
import { type ZoneType } from 'lib/data-access/models/zone';
import { type RegionType } from 'lib/data-access/models/region';
import RequiredAsteriskLabel from 'components/atoms/required-asterisk';
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
  ZoneListCta,
  StyledTextInput,
} from './styles';

type Props = {
  zone: ZoneType,
  selectedRegions: RegionType[],
  onRemoveRegionFromZone: (zone: ZoneType, region: RegionType) => void,
  onCancel: () => void,
  onSubmit: () => void,
  zoneNames: string[],
  isEdit: boolean,
};

export class ZoneForm extends React.Component<Props> {
  @observable name = this.props.zone.name;
  @observable color = this.props.zone.color;
  @observable errorMsg = '';
  originalColor = this.props.zone.color;

  onColorSelect = (color: string) => {
    this.props.zone.setColor(color);
  };

  @action
  onNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.name = e.currentTarget.value;
    const dupeName = this.props.zoneNames.some(
      name => name.trim() === this.name.toLowerCase().trim(),
    );
    if (this.name.trim().length < 3 || this.name.trim().length > 250) {
      this.errorMsg =
        'Zone name must have a minimum 3 characters and maximum 250 characters.';
    } else if (dupeName) {
      this.errorMsg = 'There is an existing zone with this name';
    } else {
      this.errorMsg = '';
    }
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
    const {
      onRemoveRegionFromZone,
      zone,
      selectedRegions,
      isEdit,
    } = this.props;
    return (
      <NewZoneContainer>
        <ZoneFormHeader p={[12]}>
          <NewZoneHeader>{isEdit ? 'Edit Zone' : 'New Zone'}</NewZoneHeader>
          <FormControl>
            <RequiredAsteriskLabel required>
              <label htmlFor="zone-name">Zone Name</label>
            </RequiredAsteriskLabel>
            <StyledTextInput
              data-test-id="zone-name-input"
              hasError={!!this.errorMsg}
              errorMessage={this.errorMsg}
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
        <ZoneCount>Selected Regions</ZoneCount>
        <ZoneListCta data-test-id="zone-cta">
          Please select available regions from the map
        </ZoneListCta>
        <ZoneRegionList>
          {selectedRegions &&
            selectedRegions.map(r => (
              <ZoneRegionListItem key={r.id}>
                {r.name.replace('Brands', '')}
                <ClearButton onClick={() => onRemoveRegionFromZone(zone, r)}>
                  <ZoneRegionListDelete />
                </ClearButton>
              </ZoneRegionListItem>
            ))}
        </ZoneRegionList>
        <NewZoneFooter justifyContent="space-around" alignItems="center">
          <ButtonWhite onClick={this.onCancel}>Cancel</ButtonWhite>
          <ButtonPrimary
            data-test-id="save-button"
            disabled={
              (selectedRegions && !selectedRegions.length) ||
              !!this.errorMsg ||
              !this.name
            }
            onClick={this.onSubmit}
          >
            Save
          </ButtonPrimary>
        </NewZoneFooter>
      </NewZoneContainer>
    );
  }
}

export default inject('store')(observer(ZoneForm));
