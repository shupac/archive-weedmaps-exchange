// @flow
import { computed, observable, action } from 'mobx';
import type {
  FlatDeliveryData,
  RawJSONApiError,
  RawJSONApiPackageCard,
  Push,
  PackageCardData,
  DeliveryCardData,
} from './types';
import Route from './route';

export default class Delivery {
  id: string = '';
  orderId: string = '';
  orderedAt: string = '';
  destinationAddress: string = '';
  destinationLatitude: number = 0;
  destinationLongitude: number = 0;
  recipientName: string = '';
  contactNumber: string = '';
  contactEmail: string = '';
  itemCount: number = 0;
  total: number = 0;
  packageId: string = '';
  @observable status: string = '';
  @observable.ref packageDetail = null;
  @observable.ref route = null;
  @observable.ref error = null;

  constructor(data: FlatDeliveryData) {
    this.id = data.id;
    this.orderId = data.order_id;
    this.orderedAt = data.ordered_at;
    this.destinationAddress = data.destination_address;
    this.destinationLatitude = data.destination_latitude;
    this.destinationLongitude = data.destination_longitude;
    this.recipientName = data.recipient_name;
    this.contactNumber = data.contact_number;
    this.contactEmail = data.contact_email;
    this.itemCount = data.item_count;
    this.total = data.total;
    this.status = data.status;
    this.packageId = data.packageId;
  }

  @computed
  get lnglat(): [number, number] {
    return [this.destinationLongitude, this.destinationLatitude];
  }

  @computed
  get hasPackageDetail(): boolean {
    return this.packageDetail !== null;
  }

  get itemCountLabel(): string {
    return `item${this.itemCount !== 1 ? 's' : ''}`;
  }

  syncPackage(response: Push): void {
    response
      .receive('ok', (result: RawJSONApiPackageCard) => this.sync(result.data))
      .receive('error', (error: RawJSONApiError) => this.setError(error));
  }

  @action
  setError(error: RawJSONApiError): void {
    this.error = error;
  }

  @action
  sync(data: PackageCardData | DeliveryCardData): void {
    if (data.type === 'package') {
      // This will only happen once
      this.packageDetail = data;
    } else {
      // This is used to sync the status of the delivery
      this.status = data.attributes.status;
    }
  }

  @action
  linkRoute(route: Route) {
    this.route = route;
  }

  @action
  unlinkRoute() {
    this.route = null;
  }

  toJSON() {
    return {
      id: this.id,
      routeId: this.route !== null ? this.route.id : null,
      orderId: this.orderId,
      orderedAt: this.orderedAt,
      destinationAddress: this.destinationAddress,
      destinationLatitude: this.destinationLatitude,
      destinationLongitude: this.destinationLongitude,
      recipientName: this.recipientName,
      contactNumber: this.contactNumber,
      contactEmail: this.contactEmail,
      itemCount: this.itemCount,
      total: this.total,
      status: this.status,
    };
  }
}
