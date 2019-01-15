// @flow
import { types, getEnv, flow } from 'mobx-state-tree';
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
    updateZone: flow(function* updateZone(zone: ZoneType) {
      // Create new Zone
      yield getEnv(self).client.patch(`/seller/zones/${zone.id}`, {
        data: {
          type: 'zone',
          attributes: {
            name: zone.name,
            color: zone.color,
            region_ids: zone.regions.map(
              region => region.wmRegionId || region.id,
            ),
          },
        },
      });
    }),
    createZone: flow(function* createZone(zone: ZoneType) {
      // Create new Zone
      yield getEnv(self).client.post(`/seller/zones`, {
        data: {
          type: 'zone',
          attributes: {
            name: zone.name,
            color: zone.color,
            region_ids: zone.regions.map(region =>
              parseInt(region.wmRegionId || region.id, 10),
            ),
          },
        },
      });
    }),
    deleteZone: flow(function* deleteZone(zone: ZoneType) {
      try {
        yield getEnv(self).client.delete(`/seller/zones/${zone.id}`);
        self.zones = self.zones.filter(z => z.id !== zone.id);
      } catch (e) {
        console.log(e);
      }
    }),
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
            .then(res => res.json())
            .then(result => ({
              id: region.wmRegionId,
              name: region.name,
              geometry: result.data.geometry,
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
        .then(res => res.json());

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
  }));

export type ZonesType = {
  uniqueRegions: number[],
  zoneRegionsById: {
    [regionId: number]: { zone: ZoneType, region: RegionType },
  },
  updateZone: (zone: ZoneType) => void,
  createZone: (zone: ZoneType) => void,
  addZone: (zone: ZoneType) => void,
  removeZone: (zone: ZoneType) => void,
  fetchZones: () => void,
  fetchRegionsForZones: () => void,
  fetchRegionsInBounds: (customBBox?: WSENBounds) => void,
  deleteZone: (zone: ZoneType) => void,
  zones: ZoneType[],
  zoneRegions: RegionType[],
  regionsWithoutZones: RegionWithGeometry[],
  regionsWithGeometry: Map<number, RegionWithGeometry>,
};

export default Zones;
