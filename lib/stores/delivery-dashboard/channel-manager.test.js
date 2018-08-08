/* eslint-disable import/first */
jest.mock('phoenix');
import {
  mockIndex,
  mockNewDelivery,
  mockNewDriver,
  mockNewRoute,
} from './mocks';
import DeliveryDashboard from './';

function setup() {
  const { Socket } = require('phoenix');

  Socket.mock();
  const store = DeliveryDashboard.createStore({});
  const { channelManager } = store;

  return { store, Socket, channelManager };
}

describe('ChannelManager', () => {
  it('should be able to initialize a channel and join it', () => {
    const { Socket, channelManager } = setup();

    const on = jest.spyOn(Socket.mockChannel, 'on');
    const onError = jest.spyOn(Socket.mockChannel, 'onError');
    const join = jest.spyOn(Socket.mockChannel, 'join');

    channelManager.init('mockwmid', 'mocktoken');

    expect(on).toHaveBeenCalledTimes(4);
    expect(on).toHaveBeenNthCalledWith(
      1,
      'insert_or_update_driver_card',
      channelManager.handleDriver,
    );
    expect(on).toHaveBeenNthCalledWith(
      2,
      'insert_or_update_delivery_card',
      channelManager.handleDelivery,
    );
    expect(on).toHaveBeenNthCalledWith(
      3,
      'insert_or_update_route_card',
      channelManager.handleRoute,
    );
    expect(on).toHaveBeenNthCalledWith(
      4,
      'insert_or_update_driver_location',
      channelManager.handleDriver,
    );

    expect(join).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(channelManager.handleChannelError);
  });

  it('should be able to handle an index call by syncing it throughout all the stores', () => {
    const { store, channelManager } = setup();

    const sync = jest.spyOn(store, 'sync');

    channelManager.handleIndex(mockIndex);

    expect(sync).toHaveBeenCalledWith(mockIndex);
  });

  it('should be able to handle syncing driver information', () => {
    const { store, channelManager } = setup();

    const syncDriver = jest.spyOn(store, 'syncDriver');

    channelManager.handleDriver(mockNewDriver);

    expect(syncDriver).toHaveBeenCalledWith(mockNewDriver);
  });

  it('should be able to handle syncing delivery information', () => {
    const { store, channelManager } = setup();

    const syncDelivery = jest.spyOn(store, 'syncDelivery');

    channelManager.handleDelivery(mockNewDelivery);

    expect(syncDelivery).toHaveBeenCalledWith(mockNewDelivery);
  });

  it('should be able to handle syncing route information', () => {
    const { store, channelManager } = setup();

    const syncRoute = jest.spyOn(store, 'syncRoute');

    channelManager.handleIndex(mockIndex);
    channelManager.handleRoute(mockNewRoute);

    expect(syncRoute).toHaveBeenCalledWith(mockNewRoute);
  });

  it("should be able to sync a route's packages", () => {
    const { store, channelManager, Socket } = setup();

    const push = jest.spyOn(Socket.mockChannel, 'push');
    channelManager.init('mockwmid', 'mocktoken');
    const getPackage = jest.spyOn(channelManager, 'getPackage');
    channelManager.handleIndex(mockIndex);
    const route = store.routesStore.find('1');

    channelManager.syncRoutePackages(route);

    expect(getPackage).toHaveBeenCalledWith('1');
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenLastCalledWith('get_package', { id: '1' });
  });

  it('should be able to clear the dashboard store when an error on the channel occurs', () => {
    const { store, channelManager } = setup();
    channelManager.handleIndex(mockIndex);

    const clear = jest.spyOn(store, 'clear');

    channelManager.handleChannelError();

    expect(clear).toHaveBeenCalled();
    expect(store.deliveriesStore.total).toEqual(0);
    expect(store.driversStore.total).toEqual(0);
    expect(store.routesStore.routes.length).toEqual(0);
  });

  it('should be able to create a route', () => {
    const { store, channelManager, Socket } = setup();
    channelManager.handleIndex(mockIndex);

    const push = jest.spyOn(Socket.mockChannel, 'push');
    channelManager.init('mockwmid', 'mocktoken');

    channelManager.createRoute('1', [store.deliveriesStore.find('1')]);

    expect(push).toHaveBeenCalledWith('create_route', {
      data: {
        type: 'route',
        relationships: {
          driver: {
            data: {
              type: 'driver_card',
              id: '1',
            },
          },
          delivery_cards: {
            data: [
              {
                type: 'delivery_card',
                id: '1',
              },
            ],
          },
        },
      },
    });
  });
});
