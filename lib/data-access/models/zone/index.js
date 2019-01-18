// @flow
import { flow, getEnv, types, applySnapshot } from 'mobx-state-tree';
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
      if (self.regions) {
        // eslint-disable-next-line
        self.regions.replace(self.regions.filter(r => r.id != region.id));
      }
    },
    update: flow(function* updateZone() {
      try {
        const result = yield getEnv(self).client.patch(
          `/seller/zones/${self.id}`,
          {
            data: {
              type: 'zone',
              attributes: {
                name: self.name,
                color: self.color,
                region_ids: self.regions.map(
                  region => region.wmRegionId || region.id,
                ),
              },
            },
          },
        );

        if (result.data) {
          applySnapshot(self, { cId: self.cId, ...result.data });
          self.inSync = true;
        }
      } catch (e) {
        self.lastError = e;
        self.inSync = false;
      }
    }),
    create: flow(function* createZone() {
      try {
        // Create new Zone
        const result = yield getEnv(self).client.post(`/seller/zones`, {
          data: {
            type: 'zone',
            attributes: {
              name: self.name,
              color: self.color,
              region_ids: self.regions.map(region =>
                parseInt(region.wmRegionId || region.id, 10),
              ),
            },
          },
        });
        if (result.data) {
          applySnapshot(self, { cId: self.cId, ...result.data });
        }
      } catch (e) {
        self.lastError = e;
        self.inSync = false;
      }
    }),
    delete: flow(function* deleteZone() {
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
  update: () => void,
  create: () => void,
  delete: () => void,
};
