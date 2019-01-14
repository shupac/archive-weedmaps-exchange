// @flow
import { types, getParentOfType } from 'mobx-state-tree';
import type { Point } from 'lib/geo';
import Zone, { type ZoneType } from 'lib/data-access/models/zone';

const Region = types
  .model('RegionModel', {
    id: types.identifier,
    name: types.string,
    wmRegionId: types.number,
  })
  .views(self => ({
    get zone() {
      return getParentOfType(self, Zone);
    },
  }));

export const Geometry = types.model('GeometryModel', {
  type: types.string,
  coordinates: types.frozen(),
});

export const RegionWithGeometry = types.model('RegionWithGeometry', {
  id: types.number,
  name: types.string,
  geometry: types.maybeNull(Geometry),
});

export type GeometryType = {
  type: string,
  coordinates: Point[][] | Point[][][],
};

export type RegionWithGeometryType = {
  id: string,
  name: string,
  geometry: GeometryType,
};

export default Region;

export type RegionType = {
  id: string,
  name: string,
  wmRegionId: number,
  zone: ZoneType,
};
