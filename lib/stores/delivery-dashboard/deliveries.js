// @flow
import * as mobx from 'mobx';
import type { IObservableArray } from 'mobx';
import Delivery from './delivery';
import { MissingResource } from './errors';
import type { DeliveryCardData, FlatDeliveryData } from './types';

const { observable, action, computed } = mobx;

export default class Deliveries {
  deliveries: IObservableArray<Delivery> = observable.array([], {
    deep: false,
  });

  @computed
  get total(): number {
    return this.deliveries.length;
  }

  has(id: string): boolean {
    return this.deliveries.some(item => item.id === id);
  }

  find(id: string): Delivery {
    const delivery = this.deliveries.find(item => item.id === id);

    if (delivery instanceof Delivery) {
      return delivery;
    }

    throw new MissingResource('Delivery', id);
  }

  @action
  bulkCreate(deliveries: Array<DeliveryCardData>) {
    const bulk: Array<Delivery> = [];
    deliveries.reduce((acc: Array<Delivery>, item: DeliveryCardData) => {
      acc.push(new Delivery(this.toDelivery(item)));
      return acc;
    }, bulk);
    this.deliveries.replace(bulk);
  }

  @action
  createDelivery(data: FlatDeliveryData): Delivery {
    const delivery = new Delivery(data);
    this.deliveries.push(delivery);
    return delivery;
  }

  @action
  clear(): void {
    this.deliveries.clear();
  }

  @action
  remove(delivery: Delivery): void {
    this.deliveries.remove(delivery);
  }

  toJSON() {
    return this.deliveries.map(delivery => delivery.toJSON());
  }

  toDelivery(delivery: DeliveryCardData): FlatDeliveryData {
    return {
      id: delivery.id,
      ...delivery.attributes,
      packageId: delivery.relationships.package.data.id,
    };
  }
}
