// @flow
import * as mobx from 'mobx';
import logger from 'lib/common/logger';
import Store from 'lib/stores/base';
import ChannelManager from './channel-manager';
import Deliveries from './deliveries';
import Delivery from './delivery';
import Routes from './routes';
import Route from './route';
import Drivers from './drivers';
import Driver from './driver';
import type {
  RawJSONApiIndexCard,
  DeliveryCardData,
  DriverCardData,
  RouteCardData,
  RawJSONApiDeliveryCard,
  RawJSONApiDriverCard,
  RawJSONApiRouteCard,
  GeoJsonFeatureCollection,
} from './types';

const { computed, observable, action } = mobx;

type CardDataChunks = {
  deliveries: Array<DeliveryCardData>,
  drivers: Array<DriverCardData>,
  routes: Array<RouteCardData>,
};

const ROUTE_UI_ASSIGNED_STATUSES = ['assigned', 'accepted'];

function filterDelivery(delivery: Delivery, query: string): boolean {
  return `${delivery.recipientName}|${delivery.contactNumber}|${
    delivery.destinationAddress
  }`
    .toLowerCase()
    .includes(query.toLowerCase());
}

function filterRouteDeliveries(routes, query): Array<Route> {
  return routes.filter(
    route =>
      route.deliveries.filter(delivery => filterDelivery(delivery, query))
        .length > 0,
  );
}

function filterDriver(driver: Driver, query): boolean {
  return `${driver.name}|${driver.phoneNumber}`
    .toLowerCase()
    .includes(query.toLowerCase());
}

export default class DeliveryDashboard extends Store {
  routesStore: Routes = new Routes();
  deliveriesStore: Deliveries = new Deliveries();
  driversStore: Drivers = new Drivers();
  channelManager: ChannelManager = new ChannelManager(this);

  @observable selectedDelivery: null | Delivery = null;
  @observable selectedDriver: null | Driver = null;

  @observable deliveriesQueryFilter: string = '';
  @observable driversQueryFilter: string = '';

  async initChannel(wmid: string): Promise<void> {
    const token = await this.sdk.logistics.channelToken();
    this.channelManager.init(wmid, token);
  }

  @action
  clear(): void {
    logger.debug('Clearing DeliveryDashboard');

    this.deliveriesQueryFilter = '';
    this.driversQueryFilter = '';

    this.selectedDelivery = null;
    this.selectedDriver = null;
    this.selectedRoute = null;

    this.routesStore.clear();
    this.deliveriesStore.clear();
    this.driversStore.clear();
  }

  @computed
  get unassignedDeliveries(): Delivery[] {
    const unassignedDeliveries = this.deliveriesStore.deliveries.filter(
      delivery => delivery.route === null,
    );

    // If we have a search query, filter the result
    if (this.deliveriesQueryFilter !== '') {
      return unassignedDeliveries.filter(delivery =>
        filterDelivery(delivery, this.deliveriesQueryFilter),
      );
    }

    return unassignedDeliveries.sort(
      (a, b) => new Date(b.orderedAt) - new Date(a.orderedAt),
    );
  }

  @computed
  get driversGeoJsonData(): GeoJsonFeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.mappableDrivers.map(driver => ({
        type: 'Feature',
        properties: {
          type: 'available',
          id: driver.id,
        },
        geometry: {
          type: 'Point',
          coordinates: driver.lnglat,
        },
      })),
    };
  }

  @computed
  get unassignedDeliveriesGeoJsonData(): GeoJsonFeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.unassignedDeliveries.map(delivery => ({
        type: 'Feature',
        properties: {
          type: 'unassigned',
          id: delivery.id,
        },
        geometry: {
          type: 'Point',
          coordinates: delivery.lnglat,
        },
      })),
    };
  }

  @computed
  get assignedDeliveriesGeoJsonData(): GeoJsonFeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.assignedDeliveries.map(delivery => ({
        type: 'Feature',
        properties: {
          type: 'assigned',
          id: delivery.id,
        },
        geometry: {
          type: 'Point',
          coordinates: delivery.lnglat,
        },
      })),
    };
  }

  @computed
  get inProgressDeliveriesGeoJsonData(): GeoJsonFeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.inProgressDeliveries.map(delivery => ({
        type: 'Feature',
        properties: {
          type: 'assigned',
          id: delivery.id,
        },
        geometry: {
          type: 'Point',
          coordinates: delivery.lnglat,
        },
      })),
    };
  }

  @computed
  get inProgressDeliveries(): Delivery[] {
    return this.inProgressRoutes.reduce(
      (deliveries, route) => [...deliveries, ...route.deliveries],
      [],
    );
  }

  @computed
  get assignedDeliveries(): Delivery[] {
    return this.assignedRoutes.reduce(
      (deliveries, route) => [...deliveries, ...route.deliveries],
      [],
    );
  }

  @computed
  get inProgressRoutes(): Route[] {
    const inProgressRoutes = this.routesStore.routes.filter(
      route => route.status === 'in_progress',
    );

    // If we have a search query, filter the result
    if (this.deliveriesQueryFilter !== '') {
      return filterRouteDeliveries(
        inProgressRoutes,
        this.deliveriesQueryFilter,
      );
    }

    return inProgressRoutes;
  }

  @computed
  get assignedRoutes(): Route[] {
    const assignedRoutes = this.routesStore.routes.filter(route =>
      ROUTE_UI_ASSIGNED_STATUSES.includes(route.status),
    );

    // If we have a search query, filter the result
    if (this.deliveriesQueryFilter !== '') {
      return filterRouteDeliveries(assignedRoutes, this.deliveriesQueryFilter);
    }

    return assignedRoutes;
  }

  @computed
  get hasAssignableDrivers(): boolean {
    return this.assignableDrivers.length > 0;
  }

  @computed
  get assignableDrivers(): Driver[] {
    return this.availableDrivers.concat(this.inProgressDrivers);
  }

  @computed
  get availableDrivers(): Driver[] {
    const availableDrivers = this.driversStore.drivers
      .filter(driver => driver.status === 'on_duty')
      .filter(driver => !driver.hasOrders);

    if (this.driversQueryFilter !== '') {
      return availableDrivers.filter(driver =>
        filterDriver(driver, this.driversQueryFilter),
      );
    }

    return availableDrivers;
  }

  @computed
  get mappableDrivers(): Driver[] {
    return [...this.availableDrivers, ...this.inProgressDrivers].filter(
      driver => driver.hasValidLocation,
    );
  }

  @computed
  get inProgressDrivers(): Driver[] {
    const inProgressDrivers = this.driversStore.drivers
      .filter(driver => driver.status !== 'off_duty')
      .filter(driver => driver.hasOrders);

    if (this.driversQueryFilter !== '') {
      return inProgressDrivers.filter(driver =>
        filterDriver(driver, this.driversQueryFilter),
      );
    }

    return inProgressDrivers;
  }

  @computed
  get offDutyDrivers(): Driver[] {
    const offDutyDrivers = this.driversStore.drivers.filter(
      driver => driver.status === 'off_duty',
    );

    if (this.driversQueryFilter !== '') {
      return offDutyDrivers.filter(driver =>
        filterDriver(driver, this.driversQueryFilter),
      );
    }

    return offDutyDrivers;
  }

  @computed
  get totalDeliveries(): number {
    return this.deliveriesStore.deliveries.length;
  }

  @action
  clearSelectedDelivery = () => {
    this.selectedDelivery = null;
  };

  @action
  clearSelectedDriver = () => {
    this.selectedDriver = null;
  };

  @action
  selectDelivery(delivery: Delivery) {
    this.channelManager.syncDeliveryPackage(delivery);
    this.selectedDelivery = delivery;
  }

  @action
  selectDriver(driver: Driver) {
    this.selectedDriver = driver;
  }

  @action
  setDeliveriesQueryFilter(query: string) {
    this.deliveriesQueryFilter = query;
  }

  @action
  setDriversQueryFilter(query: string) {
    this.driversQueryFilter = query;
  }

  removeRouteOnly(route: Route): void {
    const { routesStore } = this;
    // Let's start by unlinking all deliveries of this route
    route.deliveries.forEach((delivery: Delivery) => {
      delivery.unlinkRoute();
    });
    // Then unlink the driver from this route
    route.driver.unlinkRoute(route);
    // Finally, remove the route from the routes container store
    routesStore.remove(route);
  }

  cleanUpRoute(route: Route): void {
    const { deliveriesStore, routesStore } = this;
    // Let's start by removing all deliveries in this route
    route.deliveries.forEach((delivery: Delivery) => {
      if (this.selectedDelivery === delivery) {
        this.clearSelectedDelivery();
      }
      deliveriesStore.remove(delivery);
    });
    // Then unlink the driver from this route
    route.driver.unlinkRoute(route);
    // Finally, remove the route from the routes container store
    routesStore.remove(route);
  }

  sync(rawJSON: RawJSONApiIndexCard) {
    const { deliveriesStore, driversStore, routesStore } = this;

    const chunks: CardDataChunks = {
      deliveries: [],
      drivers: [],
      routes: [],
    };
    rawJSON.included.reduce((acc: CardDataChunks, item) => {
      if (item.type === 'delivery_card') {
        acc.deliveries.push(item);
      } else if (item.type === 'driver_card') {
        acc.drivers.push(item);
      } else if (item.type === 'route_card') {
        acc.routes.push(item);
      }
      return acc;
    }, chunks);

    logger.debug('Creating Deliveries');
    deliveriesStore.bulkCreate(chunks.deliveries);

    logger.debug('Creating Drivers');
    driversStore.bulkCreate(chunks.drivers);

    logger.debug('Creating Routes');
    routesStore.bulkCreate(chunks.routes, this);
  }

  syncRoute(rawJSON: RawJSONApiRouteCard) {
    const { data } = rawJSON;
    const { id } = data;

    if (this.routesStore.has(id)) {
      // Handles when a route changes
      this.routesStore.find(id).sync(data);
    } else {
      // Handles a new route being created
      this.routesStore.createRoute(this.routesStore.toRoute(data, this), this);
    }
  }

  syncDelivery(rawJSON: RawJSONApiDeliveryCard) {
    const { data } = rawJSON;
    const { id } = data;

    if (this.deliveriesStore.has(id)) {
      // Handles when a delivery changes
      this.deliveriesStore.find(id).sync(data);
    } else {
      // Handles a new delivery
      this.deliveriesStore.createDelivery(
        this.deliveriesStore.toDelivery(data),
      );
    }
  }

  syncDriver(rawJSON: RawJSONApiDriverCard) {
    const { data } = rawJSON;
    const { id } = data;

    if (this.driversStore.has(id)) {
      logger.debug('Syncing existing driver...');
      // Handles when a driver changes
      this.driversStore.find(id).sync(data);
    } else {
      // Handles a new driver
      this.driversStore.createDriver(this.driversStore.toDriver(data));
    }
  }

  toJSON() {
    return {
      routes: this.routesStore.toJSON(),
      deliveries: this.deliveriesStore.toJSON(),
      drivers: this.driversStore.toJSON(),
    };
  }

  dehydrate(): {
    selectedDelivery: null | Delivery,
    selectedDriver: null | Driver,
    selectedRoute: null | Route,
  } {
    return {
      selectedDelivery: this.selectedDelivery,
      selectedDriver: this.selectedDriver,
      selectedRoute: this.selectedRoute,
    };
  }
}
