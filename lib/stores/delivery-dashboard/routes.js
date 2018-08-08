// @flow
import type { IObservableArray } from 'mobx';
import * as mobx from 'mobx';
import type { FlatRouteData, RouteCardData } from './types';
import Route from './route';
import Driver from './driver';
import DeliveryDashboard from './';
import { MissingResource } from './errors';

const { observable, action } = mobx;

export default class Routes {
  routes: IObservableArray<Route> = observable.array([], { deep: false });

  has(id: string): boolean {
    return this.routes.some(item => item.id === id);
  }

  find(id: string): Route {
    const route = this.routes.find(item => item.id === id);

    if (route instanceof Route) {
      return route;
    }

    throw new MissingResource('Route', id);
  }

  constructRoute(data: FlatRouteData, root: DeliveryDashboard) {
    const route = new Route(data, root);
    if (route.driver instanceof Driver) {
      route.driver.linkRoute(route);
    }
    route.deliveries.forEach(delivery => {
      delivery.linkRoute(route);
    });
    return route;
  }

  @action
  bulkCreate(routes: Array<RouteCardData>, root: DeliveryDashboard) {
    const bulk: Array<Route> = [];
    routes.reduce((acc: Array<Route>, item: RouteCardData) => {
      acc.push(this.constructRoute(this.toRoute(item, root), root));
      return acc;
    }, bulk);
    this.routes.replace(bulk);
  }

  @action
  createRoute(data: FlatRouteData, root: DeliveryDashboard): Route {
    const route = this.constructRoute(data, root);

    this.routes.push(route);
    return route;
  }

  @action
  remove(route: Route): boolean {
    return this.routes.remove(route);
  }

  @action
  clear() {
    this.routes.clear();
  }

  toJSON() {
    return this.routes.map(route => route.toJSON());
  }

  toRoute(route: RouteCardData, root: DeliveryDashboard): FlatRouteData {
    const { deliveriesStore, driversStore } = root;
    const { delivery_cards: deliveryCards, driver } = route.relationships;
    return {
      id: route.id,
      ...route.attributes,
      // Loop through deliveries of this route and link them
      deliveries: deliveryCards.data.map(d => deliveriesStore.find(d.id)),
      // Find the driver assigned to this route and link
      driver: driversStore.find(driver.data.id),
    };
  }
}
