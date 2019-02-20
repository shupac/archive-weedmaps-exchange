// @flow
import React from 'react';
import ContextMenu, { MenuItem } from 'components/molecules/context-menu';
import { type ZoneType } from 'lib/data-access/models/zone';
import { ZoneWrapper, RegionRow, TitleRow, ColorKey } from './styles';

type Props = {
  zone: ZoneType,
  withMenu: boolean,
  onEdit?: (zone: ZoneType) => void,
  onDelete?: (zone: ZoneType) => void,
};

const regionNames = regions => regions.map(({ name }) => name);

const ZoneCard = ({ zone, withMenu, onEdit, onDelete }: Props) => (
  <ZoneWrapper
    data-test-id="zone-card-wrapper"
    onClick={() => onEdit && onEdit(zone)}
  >
    <TitleRow>
      <ColorKey color={zone.color} data-test-id="zone-card-color" />
      <p>{zone.name}</p>
      {withMenu && (
        <ContextMenu>
          {onEdit && <MenuItem onClick={() => onEdit(zone)}>Edit</MenuItem>}
          {onDelete && (
            <MenuItem
              onClick={e => {
                e.stopPropagation();
                onDelete(zone);
              }}
            >
              Delete
            </MenuItem>
          )}
        </ContextMenu>
      )}
    </TitleRow>
    <RegionRow>{regionNames(zone.regions).join(', ')}</RegionRow>
  </ZoneWrapper>
);

export default ZoneCard;
