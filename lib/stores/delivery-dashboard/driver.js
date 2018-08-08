// @flow
import * as mobx from 'mobx';
import type { IObservableArray } from 'mobx';
import type {
  DriverCardData,
  FlatDriverData,
  DriverLocationData,
} from './types';
import Route from './route';
import Delivery from './delivery';

const { observable, action, computed } = mobx;

type DriverLocation = {
  latitude: number,
  longitude: number,
  occurredAt: string,
};

export default class Driver {
  id: string = '';
  name: string = '';
  phoneNumber: string = '';
  avatarUrl: string = '';
  insertedAt: string = '';
  @observable status: string = '';
  routes: IObservableArray<Route> = observable.array([], { deep: false });
  @observable
  location: DriverLocation = {
    latitude: 0,
    longitude: 0,
    occurredAt: '',
  };

  constructor(data: FlatDriverData) {
    this.id = data.id;
    this.name = data.name;
    this.phoneNumber = data.phone_number;
    this.avatarUrl = data.avatar_url;
    this.insertedAt = data.inserted_at;
    this.status = data.status;
  }

  @computed
  get hasValidLocation(): boolean {
    return this.location.occurredAt !== '';
  }

  @computed
  get lnglat(): [number, number] {
    return [this.location.longitude, this.location.latitude];
  }

  @computed
  get hasOrders(): boolean {
    return this.orderCount > 0;
  }

  @computed
  get orderCount(): number {
    return this.routes
      .map(route => route.deliveries.length)
      .reduce((sum, curr) => sum + curr, 0);
  }

  @computed
  get orders(): Array<Delivery> {
    return this.routes
      .map(route => route.deliveries)
      .reduce((del, cur) => [...del, ...cur], []);
  }

  @computed
  get orderCountLabel(): string {
    return `Order${this.orderCount !== 1 ? 's' : ''}`;
  }

  @action
  linkRoute(route: Route): void {
    this.routes.push(route);
  }

  @action
  unlinkRoute(route: Route): void {
    this.routes.remove(route);
  }

  @action
  sync(data: DriverCardData | DriverLocationData) {
    if (data.type === 'driver_card') {
      // The status won't change often
      this.status = data.attributes.status;
    } else {
      // Most of the time this will be what is triggered
      // driver_location
      this.location = {
        latitude: data.attributes.latitude,
        longitude: data.attributes.longitude,
        occurredAt: data.attributes.occurred_at,
      };
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      avatarUrl: this.avatarUrl,
      insertedAt: this.insertedAt,
      status: this.status,
      routes: this.routes.map(route => route.id),
      location: this.location,
    };
  }
}
