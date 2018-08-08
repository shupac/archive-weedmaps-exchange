// @flow
import { Socket, Channel } from 'phoenix';
import logger from 'lib/common/logger';
import urlConfig from 'lib/common/url-config';
import DeliveryDashboard from './';
import Delivery from './delivery';
import Route from './route';
import type {
  RawJSONApiDeliveryCard,
  RawJSONApiDriverCard,
  RawJSONApiRouteCard,
  RawJSONApiError,
  RawJSONApiIndexCard,
  Push,
} from './types';

export default class ChannelManager {
  channel: Channel;
  root: DeliveryDashboard;
  constructor(root: DeliveryDashboard) {
    this.root = root;
  }

  init(wmid: string, token: string): void {
    const socket = new Socket(urlConfig.logisticsChannelUrl, {
      params: {
        token,
      },
    });
    socket.connect();

    this.channel = socket.channel(`deliveries:WMID ${wmid}`);

    this.channel.on('insert_or_update_driver_card', this.handleDriver);
    this.channel.on('insert_or_update_delivery_card', this.handleDelivery);
    this.channel.on('insert_or_update_route_card', this.handleRoute);
    this.channel.on('insert_or_update_driver_location', this.handleDriver);

    this.channel.onError(this.handleChannelError);

    this.channel
      .join()
      .receive('ok', this.handleIndex)
      .receive('error', this.handleErrorJoining);
  }

  handleChannelError = () => {
    const { root: deliveryDashboardStore } = this;

    logger.warn('Error in Channel! Clearing stores...');
    deliveryDashboardStore.clear();
  };

  handleIndex = (response: RawJSONApiIndexCard): void => {
    const { root: deliveryDashboardStore } = this;
    logger.debug('Handling incoming index card');

    deliveryDashboardStore.sync(response);
  };

  handleDriver = (response: RawJSONApiDriverCard): void => {
    const { root: deliveryDashboardStore } = this;

    deliveryDashboardStore.syncDriver(response);
  };

  handleDelivery = (response: RawJSONApiDeliveryCard): void => {
    const { root: deliveryDashboardStore } = this;

    deliveryDashboardStore.syncDelivery(response);
  };

  handleRoute = (response: RawJSONApiRouteCard): void => {
    const { root: deliveryDashboardStore } = this;

    deliveryDashboardStore.syncRoute(response);
  };

  handleErrorJoining = (response: RawJSONApiError): void => {
    // If there is an error join, Phoenix.js will continue to retry in a safe fashion
    logger.error('Error Joining!', response);
  };

  syncRoutePackages(route: Route): void {
    route.deliveries.map(delivery => this.syncDeliveryPackage(delivery));
  }

  syncDeliveryPackage(delivery: Delivery): void {
    if (!delivery.hasPackageDetail) {
      delivery.syncPackage(this.getPackage(delivery.packageId));
    }
  }

  getPackage(id: string): Push {
    return this.channel.push('get_package', { id });
  }

  createRoute(driverId: string, deliveries: Array<Delivery>): Push {
    return this.channel.push('create_route', {
      data: {
        type: 'route',
        relationships: {
          driver: {
            data: {
              type: 'driver_card',
              id: driverId,
            },
          },
          delivery_cards: {
            data: deliveries.map(delivery => ({
              type: 'delivery_card',
              id: delivery.id,
            })),
          },
        },
      },
    });
  }
}
