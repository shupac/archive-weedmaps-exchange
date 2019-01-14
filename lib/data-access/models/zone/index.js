// @flow
import { types } from 'mobx-state-tree';
import Region, { type RegionType } from 'models/region';

const Zone = types
  .model('ZoneModel', {
    id: types.identifier,
    name: types.string,
    color: types.string,
    regions: types.array(Region),
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setColor(color: string) {
      self.color = color;
    },
    addRegion(region: RegionType) {
      self.regions.push(region);
    },
    removeRegion(region: RegionType) {
      // eslint-disable-next-line
      self.regions.replace(self.regions.filter(r => r.id != region.id));
    },
  }));

export default Zone;

export type ZoneType = {
  id: string,
  name: string,
  color: string,
  regions: RegionType[],
  setName: (name: string) => void,
  setColor: (color: string) => void,
  addRegion: (region: RegionType) => void,
  removeRegion: (region: RegionType) => void,
};
