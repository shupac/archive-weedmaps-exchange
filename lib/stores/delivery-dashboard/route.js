// @flow
import type { IObservableArray } from 'mobx';
import * as mobx from 'mobx';
import type { FlatRouteData, RouteCardData } from './types';
import DeliveryDashboard from './';
import Delivery from './delivery';
import Driver from './driver';

const { observable, action } = mobx;

const STATUSES_THAT_SHOULD_ONLY_REMOVE_ROUTES = ['declined', 'unassigned'];

export default class Route {
  id: string = '';
  insertedAt: string = '';
  @observable status: string = '';
  @observable.ref driver: Driver;
  deliveries: IObservableArray<Delivery> = observable.array([], {
    deep: false,
  });
  root: DeliveryDashboard;

  constructor(data: FlatRouteData, root: DeliveryDashboard) {
    this.id = data.id;
    this.insertedAt = data.inserted_at;
    this.status = data.status;
    this.driver = data.driver;
    this.deliveries.replace(data.deliveries);
    this.root = root;
  }

  @action
  sync(data: RouteCardData): void {
    const { attributes } = data;
    const { root: deliveryDashboardStore } = this;

    this.status = attributes.status;

    if (this.status === 'completed') {
      deliveryDashboardStore.cleanUpRoute(this);
    } else if (STATUSES_THAT_SHOULD_ONLY_REMOVE_ROUTES.includes(this.status)) {
      deliveryDashboardStore.removeRouteOnly(this);
    }
  }

  toJSON() {
    return {
      id: this.id,
      insertedAt: this.insertedAt,
      status: this.status,
      driverId: this.driver instanceof Driver ? this.driver.id : '',
      deliveries: this.deliveries.map(delivery => delivery.id),
    };
  }
}
