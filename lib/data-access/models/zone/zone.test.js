import Region from 'models/region';
import Zone from './';

describe('zone', () => {
  let zone;

  beforeEach(() => {
    zone = Zone.create({
      cId: '123',
      id: '123',
      name: 'Some Zone',
      color: '#333',
      regions: [
        {
          id: '1',
          name: 'South OC',
          wmRegionId: 3,
        },
      ],
    });
  });

  it('can change its name', () => {
    zone.setName('New Zone Name');
    expect(zone.name).toBe('New Zone Name');
  });

  it('can change its color', () => {
    zone.setColor('#444');
    expect(zone.color).toBe('#444');
  });

  it('can add a region', () => {
    zone.addRegion(
      Region.create({
        id: '2',
        name: 'North OC',
        wmRegionId: 4,
      }),
    );
    expect(zone.regions.toJSON()).toEqual([
      { id: '1', name: 'South OC', wmRegionId: 3 },
      { id: '2', name: 'North OC', wmRegionId: 4 },
    ]);
  });

  it('can remove a region', () => {
    const region = Region.create({
      id: '2',
      name: 'North OC',
      wmRegionId: 4,
    });

    zone.addRegion(region);
    expect(zone.regions.toJSON()).toEqual([
      { id: '1', name: 'South OC', wmRegionId: 3 },
      { id: '2', name: 'North OC', wmRegionId: 4 },
    ]);

    zone.removeRegion(region);
    expect(zone.regions.toJSON()).toEqual([
      { id: '1', name: 'South OC', wmRegionId: 3 },
    ]);
  });

  describe('when creating on the client', () => {
    describe('when it succeeds', () => {
      let clientZone;
      let sdkClient;

      beforeEach(() => {
        sdkClient = {
          post: jest.fn().mockResolvedValue({
            data: {
              id: '1234',
              name: 'Some Zone',
              color: '#333',
              regions: [
                {
                  id: '1',
                  name: 'South OC',
                  wmRegionId: 3,
                },
              ],
            },
          }),
        };

        clientZone = Zone.create(
          {
            cId: '123',
            id: '',
            name: 'Some Zone',
            color: '#333',
            regions: [
              {
                id: '1',
                name: 'South OC',
                wmRegionId: 3,
              },
            ],
          },
          {
            client: sdkClient,
          },
        );
      });

      it('will create it on the server and update the client version', async () => {
        await clientZone.create();
        expect(sdkClient.post).toHaveBeenCalledWith('/seller/zones', {
          data: {
            attributes: { color: '#333', name: 'Some Zone', region_ids: [3] },
            type: 'zone',
          },
        });
        expect(clientZone.id).toBe('1234');
      });
    });

    describe('when it fails', () => {
      let clientZone;
      let sdkClient;

      beforeEach(() => {
        sdkClient = {
          post: jest.fn().mockRejectedValue(new Error('test')),
        };

        clientZone = Zone.create(
          {
            cId: '123',
            id: '',
            name: 'Some Zone',
            color: '#333',
            regions: [
              {
                id: '1',
                name: 'South OC',
                wmRegionId: 3,
              },
            ],
          },
          {
            client: sdkClient,
          },
        );
      });

      it('will set the model as being out of sync', async () => {
        await clientZone.create();
        expect(sdkClient.post).toHaveBeenCalledWith('/seller/zones', {
          data: {
            attributes: { color: '#333', name: 'Some Zone', region_ids: [3] },
            type: 'zone',
          },
        });
        expect(clientZone.id).toBe('');
        expect(clientZone.inSync).toBe(false);
        expect(clientZone.lastError).toBeInstanceOf(Error);
      });
    });
  });

  describe('when updating on the client', () => {
    describe('when it succeeds', () => {
      let clientZone;
      let sdkClient;

      beforeEach(() => {
        sdkClient = {
          patch: jest.fn().mockResolvedValue({
            data: {
              id: '123',
              name: 'Some Zone',
              color: '#333',
              regions: [
                {
                  id: '1',
                  name: 'South OC',
                  wmRegionId: 3,
                },
              ],
            },
          }),
        };

        clientZone = Zone.create(
          {
            cId: '123',
            id: '123',
            name: 'Some Zone',
            color: '#333',
            regions: [
              {
                id: '1',
                name: 'South OC',
                wmRegionId: 3,
              },
            ],
          },
          {
            client: sdkClient,
          },
        );
      });

      it('will update it on the server and update the client version', async () => {
        clientZone.setColor('#444');
        await clientZone.update();
        expect(sdkClient.patch).toHaveBeenCalledWith('/seller/zones/123', {
          data: {
            attributes: { color: '#444', name: 'Some Zone', region_ids: [3] },
            type: 'zone',
          },
        });
        expect(clientZone.id).toBe('123');
      });
    });

    describe('when it fails', () => {
      let clientZone;
      let sdkClient;

      beforeEach(() => {
        sdkClient = {
          patch: jest.fn().mockRejectedValue(new Error('test')),
        };

        clientZone = Zone.create(
          {
            cId: '123',
            id: '123',
            name: 'Some Zone',
            color: '#333',
            regions: [
              {
                id: '1',
                name: 'South OC',
                wmRegionId: 3,
              },
            ],
          },
          {
            client: sdkClient,
          },
        );
      });

      it('will set the model as being out of sync', async () => {
        clientZone.setColor('#444');
        await clientZone.update();
        expect(sdkClient.patch).toHaveBeenCalledWith('/seller/zones/123', {
          data: {
            attributes: { color: '#444', name: 'Some Zone', region_ids: [3] },
            type: 'zone',
          },
        });
        expect(clientZone.inSync).toBe(false);
        expect(clientZone.lastError).toBeInstanceOf(Error);
      });
    });
  });

  describe('when deleting on the client', () => {
    describe('and it succeeds', () => {
      let clientZone;
      let sdkClient;
      beforeEach(() => {
        sdkClient = {
          delete: jest.fn().mockResolvedValue({}),
        };

        clientZone = Zone.create(
          {
            cId: '123',
            id: '123',
            name: 'Some Zone',
            color: '#333',
            regions: [
              {
                id: '1',
                name: 'South OC',
                wmRegionId: 3,
              },
            ],
          },
          {
            client: sdkClient,
          },
        );
      });

      it('will delete on the server', async () => {
        await clientZone.delete();
        expect(sdkClient.delete).toHaveBeenCalledWith('/seller/zones/123');
      });
    });

    describe('and it fails', () => {
      let clientZone;
      let sdkClient;

      beforeEach(() => {
        sdkClient = {
          delete: jest.fn().mockRejectedValue(new Error('test')),
        };

        clientZone = Zone.create(
          {
            cId: '123',
            id: '123',
            name: 'Some Zone',
            color: '#333',
            regions: [
              {
                id: '1',
                name: 'South OC',
                wmRegionId: 3,
              },
            ],
          },
          {
            client: sdkClient,
          },
        );
      });

      it('will set the model as being out of sync', async () => {
        expect(clientZone.inSync).toBe(true);
        await clientZone.delete();
        expect(clientZone.inSync).toBe(false);
        expect(clientZone.lastError).toBeInstanceOf(Error);
      });
    });
  });
});
