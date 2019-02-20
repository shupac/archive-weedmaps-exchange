// @flow
import { flow, getEnv, types, applySnapshot, detach } from 'mobx-state-tree';
import Region, { type RegionType } from 'models/region';

const Zone = types
  .model('ZoneModel', {
    cId: types.identifier,
    id: types.string,
    name: types.string,
    color: types.string,
    regions: types.array(Region),
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot && snapshot.id && !snapshot.cId) {
      snapshot.cId = snapshot.id;
    }
    return snapshot;
  })
  .volatile(() => ({
    inSync: true,
    lastError: null,
  }))
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
      detach(region);
    },
    update: flow(function* updateZone() {
      self.lastError = null;

      try {
        const result = yield getEnv(self).client.patch(
          `/seller/zones/${self.id}`,
          {
            data: {
              type: 'zone',
              attributes: {
                name: self.name,
                color: self.color,
                region_ids: self.regions.map(region => region.wmRegionId),
              },
            },
          },
        );
        applySnapshot(self, { cId: self.cId, ...result.data });
        self.inSync = true;
      } catch (e) {
        self.lastError = e;
        self.inSync = false;
      }
    }),
    create: flow(function* createZone() {
      self.lastError = null;

      try {
        // Create new Zone
        const result = yield getEnv(self).client.post(`/seller/zones`, {
          data: {
            type: 'zone',
            attributes: {
              name: self.name,
              color: self.color,
              region_ids: self.regions.map(region =>
                parseInt(region.wmRegionId, 10),
              ),
            },
          },
        });
        applySnapshot(self, { cId: self.cId, ...result.data });
      } catch (e) {
        self.lastError = e;
        self.inSync = false;
      }
    }),
    delete: flow(function* deleteZone() {
      self.lastError = null;

      try {
        yield getEnv(self).client.delete(`/seller/zones/${self.id}`);
      } catch (e) {
        self.lastError = e;
        self.inSync = false;
      }
    }),
  }));

export default Zone;

export type ZoneType = {
  cId: string,
  id: string,
  name: string,
  color: string,
  inSync: boolean,
  lastError: any,
  regions: RegionType[],
  setName: (name: string) => void,
  setColor: (color: string) => void,
  addRegion: (region: RegionType) => void,
  removeRegion: (region: RegionType) => void,
  update: () => any,
  create: () => any,
  delete: () => void,
};
