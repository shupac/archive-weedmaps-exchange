import DeliveryDashboard from './index';
import {
  mockIndex,
  mockBaseIndex,
  mockNewRoute,
  mockNewDelivery,
  mockNewDriver,
} from './mocks';

describe('DeliveryDashboard store', () => {
  it('should be able to receive raw JSON-api bulk index data and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});

    store.sync(mockIndex);

    expect(store.driversStore.drivers.length).toEqual(3);
    const driver = store.driversStore.drivers[0];

    expect(store.deliveriesStore.deliveries.length).toEqual(3);
    const delivery = store.deliveriesStore.deliveries[0];

    expect(store.routesStore.routes.length).toEqual(2);
    const route = store.routesStore.routes[0];

    expect(driver.routes[0]).toBe(route);
    expect(route.driver).toBe(driver);
    expect(route.deliveries[0]).toBe(delivery);

    expect(store.toJSON()).toMatchObject({
      deliveries: [
        {
          contactEmail: 'atirado@weedmaps.com',
          contactNumber: '123-123-1234',
          destinationAddress: '1234',
          destinationLatitude: 90,
          destinationLongitude: 90,
          id: '1',
          itemCount: 4,
          orderId: '1234',
          orderedAt: '2018-05-08T23:00:42.075253Z',
          recipientName: 'Alan Tirado',
          status: 'started',
          total: 1,
        },
        {
          contactEmail: 'bob@truman.com',
          contactNumber: '343-345-3452',
          destinationAddress: '11234 W S St',
          destinationLatitude: 90,
          destinationLongitude: 90,
          id: '2',
          itemCount: 4,
          orderId: '3421',
          orderedAt: '2018-05-08T23:00:42.075253Z',
          recipientName: 'Bob Truman',
          status: 'created',
          total: 3455,
        },
        {
          contactEmail: 'bob@truman.com',
          contactNumber: '343-345-3452',
          destinationAddress: '11234 W S St',
          destinationLatitude: 90,
          destinationLongitude: 90,
          id: '3',
          itemCount: 4,
          orderId: '3421',
          orderedAt: '2018-05-08T23:00:42.075253Z',
          recipientName: 'Bob Truman',
          status: 'started',
          total: 3455,
        },
      ],
      drivers: [
        {
          avatarUrl:
            'https://images.weedmaps.com/users/002/120/830/avatar/square_fill/1510575803-1508943687-owl.png',
          id: '1',
          insertedAt: '2018-05-08T23:00:42.075253Z',
          name: 'Bob',
          phoneNumber: '714-277-9631',
          routes: ['1'],
          status: 'on_duty',
        },
        {
          avatarUrl:
            'https://images.weedmaps.com/users/000/331/653/avatar/square_fill/1510567490-ShortRound.jpg?development=1',
          id: '2',
          insertedAt: '2018-05-08T23:00:42.075253Z',
          name: 'James',
          phoneNumber: '123-123-1234',
          routes: ['2'],
          status: 'on_duty',
        },
        {
          avatarUrl: null,
          id: '3',
          insertedAt: '2018-05-08T23:00:42.075253Z',
          name: 'Val',
          phoneNumber: '666-666-5656',
          routes: [],
          status: 'off_duty',
        },
      ],
      routes: [
        {
          deliveries: ['1'],
          driverId: '1',
          id: '1',
          insertedAt: '2018-05-08T23:00:42.075253Z',
          status: 'assigned',
        },
        {
          deliveries: ['3'],
          driverId: '2',
          id: '2',
          insertedAt: '2018-05-08T23:00:42.075253Z',
          status: 'in_progress',
        },
      ],
    });
  });

  it('should be able to receive raw JSON-api "insert" of a new route and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});

    store.sync(mockBaseIndex);
    store.syncRoute(mockNewRoute);

    expect(store.driversStore.drivers.length).toEqual(1);
    const driver = store.driversStore.drivers[0];

    expect(store.deliveriesStore.deliveries.length).toEqual(1);
    const delivery = store.deliveriesStore.deliveries[0];

    expect(store.routesStore.routes.length).toEqual(1);
    const route = store.routesStore.routes[0];

    expect(driver.routes[0]).toBe(route);
    expect(route.driver).toBe(driver);
    expect(route.deliveries[0]).toBe(delivery);
  });

  it('should be able to receive raw JSON-api "update" of a route and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});
    const mockChangeRoute = { ...mockNewRoute };
    mockChangeRoute.data.attributes.status = 'accepted';

    store.sync(mockIndex);
    store.syncRoute(mockChangeRoute);

    expect(store.routesStore.routes[0].status).toEqual('accepted');
  });

  it('should be able to receive raw JSON-api "update" of a route changing status to "completed" and clean up', () => {
    const store = DeliveryDashboard.createStore({});
    const mockChangeRoute = { ...mockNewRoute };
    mockChangeRoute.data.attributes.status = 'completed';

    store.sync(mockIndex);

    const route = store.routesStore.find(mockChangeRoute.data.id);
    const routeId = route.id;
    const deliveriesId = route.deliveries.map(delivery => delivery.id);
    const driverId = route.driver.id;

    store.syncRoute(mockChangeRoute);

    const driver = store.driversStore.find(driverId);
    expect(driver.routes.some(r => r.id === routeId)).toEqual(false);
    deliveriesId.forEach(id => {
      expect(store.deliveriesStore.has(id)).toEqual(false);
    });
    expect(store.routesStore.has(routeId)).toEqual(false);
  });

  it('should be able to receive raw JSON-api "insert" of a new delivery and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});

    store.syncDelivery(mockNewDelivery);

    expect(store.deliveriesStore.deliveries[0].toJSON()).toMatchObject({
      contactNumber: '123-123-1234',
      destinationAddress: '41 Discovery',
      destinationLatitude: 33.666629,
      destinationLongitude: -117.756304,
      id: '2',
      itemCount: 4,
      orderId: '420',
      recipientName: 'Alan Tirado',
      status: 'created',
      total: 420,
    });
  });

  it('should be able to receive raw JSON-api "update" of a delivery and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});
    const mockChangedDelivery = { ...mockNewDelivery };
    mockChangedDelivery.data.attributes.status = 'started';

    store.syncDelivery(mockNewDelivery);
    store.syncDelivery(mockChangedDelivery);

    expect(store.deliveriesStore.deliveries[0].toJSON()).toMatchObject({
      contactNumber: '123-123-1234',
      destinationAddress: '41 Discovery',
      destinationLatitude: 33.666629,
      destinationLongitude: -117.756304,
      id: '2',
      itemCount: 4,
      orderId: '420',
      recipientName: 'Alan Tirado',
      status: 'started',
      total: 420,
    });
  });

  it('should be able to receive raw JSON-api "insert" of a new driver and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});

    store.syncDriver(mockNewDriver);

    expect(store.driversStore.drivers[0].toJSON()).toMatchObject({
      avatarUrl:
        'https://images.weedmaps.com/users/002/120/830/avatar/square_fill/1510575803-1508943687-owl.png',
      id: '3',
      insertedAt: '2018-05-08T23:00:42.075253Z',
      name: 'Bob',
      phoneNumber: '123-123-1234',
      routes: [],
      status: 'off_duty',
    });
  });

  it('should be able to receive raw JSON-api "update" of a driver and sync it with the stores', () => {
    const store = DeliveryDashboard.createStore({});
    const mockChangedDriver = { ...mockNewDriver };
    mockChangedDriver.data.attributes.status = 'started';

    store.syncDriver(mockNewDriver);
    store.syncDriver(mockChangedDriver);

    expect(store.driversStore.drivers[0].toJSON()).toMatchObject({
      avatarUrl:
        'https://images.weedmaps.com/users/002/120/830/avatar/square_fill/1510575803-1508943687-owl.png',
      id: '3',
      insertedAt: '2018-05-08T23:00:42.075253Z',
      name: 'Bob',
      phoneNumber: '123-123-1234',
      routes: [],
      status: 'started',
    });
  });
});
