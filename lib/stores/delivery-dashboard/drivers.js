// @flow
import type { IObservableArray } from 'mobx';
import * as mobx from 'mobx';
import type { DriverCardData, FlatDriverData } from './types';
import Driver from './driver';
import { MissingResource } from './errors';

const { observable, action, computed } = mobx;

export default class Drivers {
  drivers: IObservableArray<Driver> = observable.array([], { deep: false });

  @computed
  get total(): number {
    return this.drivers.length;
  }

  has(id: string): boolean {
    return this.drivers.some(item => item.id === id);
  }

  find(id: string): Driver {
    const driver = this.drivers.find(item => item.id === id);

    if (driver instanceof Driver) {
      return driver;
    }

    throw new MissingResource('Driver', id);
  }

  @action
  bulkCreate(drivers: Array<DriverCardData>) {
    const bulk: Array<Driver> = [];
    drivers.reduce((acc: Array<Driver>, item: DriverCardData) => {
      acc.push(new Driver(this.toDriver(item)));
      return acc;
    }, bulk);
    this.drivers.replace(bulk);
  }

  @action
  createDriver(data: FlatDriverData): Driver {
    const driver = new Driver(data);
    this.drivers.push(driver);
    return driver;
  }

  @action
  clear() {
    this.drivers.clear();
  }

  toJSON() {
    return this.drivers.map(driver => driver.toJSON());
  }

  toDriver(driver: DriverCardData): FlatDriverData {
    return {
      id: driver.id,
      ...driver.attributes,
    };
  }
}
