// @flow
import { types } from 'mobx-state-tree';
import Region, { type RegionType } from 'models/region';

const Zone = types.model('ZoneModel', {
  id: types.identifier,
  name: types.string,
  color: types.string,
  regions: types.array(Region),
});

export default Zone;

export type ZoneType = {
  id: string,
  name: string,
  color: string,
  regions: RegionType[],
};
