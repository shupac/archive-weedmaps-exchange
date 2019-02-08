import * as MST from 'mobx-state-tree';
import * as Geo from 'lib/geo';
import logger from 'lib/common/logger';
import mockZones from 'lib/mocks/zones';
import mockRegions from 'lib/mocks/regions';
import mockRegion from 'lib/mocks/region';
import Zones from './';

describe('Zones store', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mutate zones', () => {
    it('can fetch zones data', async done => {
      const mockClient = {
        fetch: jest.fn().mockResolvedValue({ data: mockZones }),
      };
      const zones = Zones.create({}, { client: mockClient });
      await zones.fetchZones();
      expect(mockClient.fetch).toHaveBeenCalledWith('/seller/zones');
      expect(zones.zones.length).toBe(mockZones.length);
      done();
    });

    it('can add a zone', () => {
      const zones = Zones.create({});
      zones.addZone(mockZones[0]);
      expect(zones.zones.length).toEqual(1);
    });

    it('can remove a zone', () => {
      const zones = Zones.create({ zones: mockZones });
      zones.removeZone(zones.zones[0]);
      expect(zones.zones.length).toEqual(mockZones.length - 1);
    });

    it('can delete a zone', async done => {
      const zones = Zones.create({ zones: mockZones });
      const zone = zones.zones[0];
      const zoneDelete = jest.spyOn(zone, 'delete').mockResolvedValue();
      const destroy = jest.spyOn(MST, 'destroy');
      await zones.deleteZone(zone);
      expect(zoneDelete).toHaveBeenCalled();
      expect(destroy).toHaveBeenCalledWith(zone);
      done();
    });

    it('can handle errors when fetching zones', async done => {
      const error = new Error('Test');
      const mockClient = {
        fetch: jest.fn().mockRejectedValue(error),
      };
      const zones = Zones.create({}, { client: mockClient });
      const logError = jest.spyOn(logger, 'error').mockReturnValue();
      await zones.fetchZones();
      expect(mockClient.fetch).toHaveBeenCalledWith('/seller/zones');
      expect(logError).toHaveBeenCalledWith(error);
      expect(zones.zones.length).toBe(0);
      done();
    });

    it('can handle errors when deleting a zone', async done => {
      const zones = Zones.create({ zones: mockZones });
      const zone = zones.zones[0];
      const error = new Error('Test');
      const zoneDelete = jest.spyOn(zone, 'delete').mockRejectedValue(error);
      const destroy = jest.spyOn(MST, 'destroy');
      const logError = jest.spyOn(logger, 'error').mockReturnValue();
      await zones.deleteZone(zone);
      expect(zoneDelete).toHaveBeenCalled();
      expect(destroy).not.toHaveBeenCalled();
      expect(logError).toHaveBeenCalledWith(error);
      done();
    });
  });

  describe('fetch regions', () => {
    it('can fetch regions for zones', async done => {
      const mockSdk = {
        // $FlowFixMe
        fetch: jest.fn().mockResolvedValue({
          json: () => Promise.resolve({ data: mockRegion }),
        }),
      };
      const zones = Zones.create({ zones: mockZones }, { wmSdk: mockSdk });
      await zones.fetchRegionsForZones();
      expect(MST.getSnapshot(zones.regionsWithGeometry)).toMatchSnapshot();
      done();
    });

    it('can fetch region geometries with custom bounding box', async done => {
      const mockSdk = {
        // $FlowFixMe
        fetch: async url => {
          const mockData = url.includes('/regions?') ? mockRegions : mockRegion;

          return {
            json: () => Promise.resolve({ data: mockData }),
          };
        },
      };
      const zones = Zones.create({ zones: mockZones }, { wmSdk: mockSdk });
      await zones.fetchRegionsForZones();
      const customBbox = [33.71, -118.58, 34.33, -118.13];
      await zones.fetchRegionsInBounds(customBbox);
      expect(MST.getSnapshot(zones.regionsWithGeometry)).toMatchSnapshot();
      done();
    });

    it('can fetch region geometries without bounding box', async done => {
      const mockSdk = {
        // $FlowFixMe
        fetch: async url => {
          const mockData = url.includes('/regions?') ? mockRegions : mockRegion;

          return {
            json: () => Promise.resolve({ data: mockData }),
          };
        },
      };
      const zones = Zones.create({ zones: mockZones }, { wmSdk: mockSdk });
      await zones.fetchRegionsForZones();
      await zones.fetchRegionsInBounds();
      expect(MST.getSnapshot(zones.regionsWithGeometry)).toMatchSnapshot();
      done();
    });

    it('can fetch region geometries with empty bounding box', async done => {
      jest.spyOn(Geo, 'getBoundingBox').mockReturnValue();
      const mockSdk = {
        // $FlowFixMe
        fetch: async url => {
          const mockData = url.includes('/regions?') ? mockRegions : mockRegion;

          return {
            json: () => Promise.resolve({ data: mockData }),
          };
        },
      };
      const zones = Zones.create({ zones: mockZones }, { wmSdk: mockSdk });
      await zones.fetchRegionsForZones();
      await zones.fetchRegionsInBounds();
      expect(MST.getSnapshot(zones.regionsWithGeometry)).toMatchSnapshot();
      done();
    });

    it('can fetch region geometries for empty regions', async done => {
      const mockSdk = {
        // $FlowFixMe
        fetch: async url => {
          const mockData = url.includes('/regions?') ? mockRegions : mockRegion;

          return {
            json: () => Promise.resolve({ data: mockData }),
          };
        },
      };
      const zones = Zones.create({}, { wmSdk: mockSdk });
      await zones.fetchRegionsForZones();
      await zones.fetchRegionsInBounds();
      expect(MST.getSnapshot(zones.regionsWithGeometry)).toMatchSnapshot();
      done();
    });
  });

  describe('views', () => {
    let zones;

    beforeEach(async () => {
      const mockSdk = {
        // $FlowFixMe
        fetch: async url => {
          const mockData = url.includes('/regions?') ? mockRegions : mockRegion;

          return {
            json: () => Promise.resolve({ data: mockData }),
          };
        },
      };
      zones = Zones.create({ zones: mockZones }, { wmSdk: mockSdk });
      await zones.fetchRegionsForZones();
    });

    it('can compute regionsWithoutZones', () => {
      expect(zones.regionsWithoutZones).toMatchSnapshot();
    });

    it('can compute zoneRegions', () => {
      expect(zones.zoneRegions).toMatchSnapshot();
    });

    it('can compute zoneRegionsById', () => {
      expect(zones.zoneRegionsById).toMatchSnapshot();
    });
  });
});
