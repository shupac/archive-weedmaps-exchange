// @flow
import { types, getEnv, flow, destroy } from 'mobx-state-tree';
import Zone, { type ZoneType } from 'models/zone';
import { RegionWithGeometry, type RegionType } from 'models/region';
import { getBoundingBox } from 'lib/geo';
import config from 'config';
import type { WSENBounds } from 'lib/geo';

const Zones = types
  .model('Zones', {
    zones: types.array(Zone),
    regionsWithGeometry: types.map(RegionWithGeometry),
  })
  .views(self => ({
    get regionsWithoutZones() {
      const regions = self.regionsWithGeometry.values();
      return Array.from(regions).filter(
        region => !self.zoneRegionsById[region.id],
      );
    },
    get zoneRegions() {
      const regions = [];
      self.zones.forEach(z => {
        z.regions.forEach(r => {
          regions.push(r);
        });
      });
      return regions;
    },
    get zoneRegionsById() {
      const regionsById = {};
      self.zones.forEach(z => {
        z.regions.forEach(r => {
          regionsById[r.wmRegionId] = { zone: z, region: r };
        });
      });
      return regionsById;
    },
  }))
  .actions(self => ({
    fetchZones: flow(function* fetchZones() {
      try {
        const { data } = yield getEnv(self).client.fetch(`/seller/zones`);
        self.zones = data;
      } catch (e) {
        console.log(e);
      }
    }),
    fetchRegionsForZones: flow(function* fetchRegionsForZones() {
      const promises = [];
      // eslint-disable-next-line
      for (const region of self.zoneRegions) {
        promises.push(
          getEnv(self)
            .wmSdk.fetch(
              `${config.apiGatewayUrl}/discovery/v1/regions/${
                region.wmRegionId
              }?include[]=geometry`,
            )
            .then(res => res && res.json())
            .then(result => ({
              id: region.wmRegionId,
              name: region.name,
              geometry: result && result.data.geometry,
            })),
        );
      }
      const results = yield Promise.all(promises);

      results.forEach(region => {
        self.regionsWithGeometry.set(region.id, region);
      });
    }),
    fetchRegionsInBounds: flow(function* fetchRegionsInBounds(
      customBbox?: WSENBounds,
    ) {
      const regionWithGeometries = self.zoneRegions.map(region =>
        self.regionsWithGeometry.get(region.wmRegionId),
      );

      let bbox = '';
      if (regionWithGeometries.length && !customBbox) {
        const [swlng, swlat, nelng, nelat] =
          getBoundingBox(regionWithGeometries.map(r => r.geometry)) || [];
        // swap the lat/lng for Discovery API
        bbox = [swlat, swlng, nelat, nelng].join(',');
      } else if (customBbox) {
        bbox = customBbox.join(',');
      }

      const {
        data: { regions },
      } = yield getEnv(self)
        .wmSdk.fetch(
          `${
            config.apiGatewayUrl
          }/discovery/v1/regions?include[]=geometry&filter[bounding_box]=${bbox}&filter[published_for][]=brands&limit=25`,
        )
        .then(res => res && res.json());

      regions.forEach(region => {
        self.regionsWithGeometry.set(region.id, region);
      });
    }),
    addZone(zone) {
      self.zones.push(zone);
    },
    removeZone(zone) {
      self.zones.remove(zone);
    },
    deleteZone: flow(function* deleteZone(zone: ZoneType) {
      try {
        yield zone.delete();
        // Destroy the zone
        destroy(zone);
      } catch (e) {
        console.error(e);
      }
    }),
  }));

export type ZonesType = {
  uniqueRegions: number[],
  zoneRegionsById: {
    [regionId: number]: { zone: ZoneType, region: RegionType },
  },
  deleteZone: (zone: ZoneType) => void,
  addZone: (zone: ZoneType) => void,
  removeZone: (zone: ZoneType) => void,
  fetchZones: () => void,
  fetchRegionsForZones: () => void,
  fetchRegionsInBounds: (customBBox?: WSENBounds) => void,
  zones: ZoneType[],
  zoneRegions: RegionType[],
  regionsWithoutZones: RegionWithGeometry[],
  regionsWithGeometry: Map<number, RegionWithGeometry>,
};

export default Zones;
