// @flow
import React from 'react';
import ContextMenu, { MenuItem } from 'components/molecules/context-menu';
import { type ZoneType } from 'lib/data-access/models/zone';
import { ZoneWrapper, RegionRow, TitleRow, ColorKey } from './styles';

type Props = {
  zone: ZoneType,
  withMenu: boolean,
};

const regionNames = regions => regions.map(({ name }) => name);

const ZoneCard = ({ zone, withMenu }: Props) => (
  <ZoneWrapper data-test-id="zone-card-wrapper">
    <TitleRow>
      <ColorKey color={zone.color} data-test-id="zone-card-color" />
      <p>{zone.name}</p>
      {withMenu && (
        <ContextMenu>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </ContextMenu>
      )}
    </TitleRow>
    <RegionRow>{regionNames(zone.regions).join(', ')}</RegionRow>
  </ZoneWrapper>
);

export default ZoneCard;
