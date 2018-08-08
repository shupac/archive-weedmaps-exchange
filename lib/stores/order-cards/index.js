// @Flow
import { observable, computed, action } from 'mobx';
import Store from 'lib/stores/base';
import { OrderCard } from 'lib/types/order-card';
import { OrderPackage } from 'lib/types/order-package';
import { Socket } from 'phoenix';
import urlConfig from 'lib/common/url-config';
import { WmTheme } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';

export const ORDER_STATUS = {
  NOT_STARTED: 'order_placed',
  IN_PROGRESS: 'picking',
  READY: 'ready_for_pickup',
  FINISHED: 'finished',
  CANCELED: 'canceled',
  AWAITS_CONFIRMATION: 'awaits_confirmation',
};

export const ORDER_STATUS_NAME = {
  order_placed: 'not started',
  picking: 'in progress',
  ready_for_pickup: 'ready',
  finished: 'finished',
  canceled: 'canceled',
  awaits_confirmation: 'awaits confirmation',
};

const { state } = WmTheme.style;
export const STATUS_COLOR = {
  [ORDER_STATUS.NOT_STARTED]: state.info,
  [ORDER_STATUS.IN_PROGRESS]: theme.colors.amethyst,
  [ORDER_STATUS.READY]: state.primaryCompanion,
  [ORDER_STATUS.FINISHED]: state.primary,
  [ORDER_STATUS.CANCELED]: state.danger,
};

export const ORDER_STATUSES = [
  { text: 'Unassign', value: 'unassign' },
  { text: 'Complete', value: 'complete' },
  { text: 'Cancel', value: 'cancel' },
];

export const PICKUP_CANCEL_REASONS = [
  { text: 'Recipient unavailable', value: 'Recipient unavailable' },
  { text: 'Out of stock', value: 'Out of stock' },
  {
    text: 'Refused - incorrect or missing items',
    value: 'Refused - incorrect or missing items',
  },
  { text: 'Refused - damaged good', value: 'Refused - damaged good' },
  { text: 'Customer changed mind', value: 'Customer changed mind' },
  { text: 'Unable to complete order', value: 'Unable to complete order' },
  { text: 'Other', value: 'Other' },
];

export const ROUTE_CANCEL_REASONS = [
  { text: 'Driver / Vehicle incident ', value: 'Driver / Vehicle incident ' },
  { text: 'Destination unavailable', value: 'Destination unavailable' },
  ...PICKUP_CANCEL_REASONS,
];

export default class OrderCards extends Store {
  @observable cards: Array<OrderCard> = [];
  @observable package: OrderPackage = {};
  @observable card: OrderCard = {};
  @observable orderInView = false;
  channel = null;

  @computed
  get notStarted() {
    return this.cards.filter(
      order => order.attributes.status === ORDER_STATUS.NOT_STARTED,
    );
  }

  @computed
  get isPackageSet() {
    return this.package && this.package.id;
  }

  @computed
  get inProgress() {
    return this.cards.filter(
      order => order.attributes.status === ORDER_STATUS.IN_PROGRESS,
    );
  }

  @computed
  get ready() {
    return this.cards.filter(
      order => order.attributes.status === ORDER_STATUS.READY,
    );
  }

  @action
  createCard(newCard: OrderCard) {
    this.cards.push(newCard);
  }

  @action
  setCards(cards: Array<OrderCard>) {
    this.cards = cards;
  }

  @action
  updateCards(updatedCard: OrderCard) {
    const cardInCards = this.cards.find(card => card.id === updatedCard.id);
    cardInCards.attributes.status = updatedCard.attributes.status;
  }

  @action
  updateCard(updatedCard: OrderCard) {
    this.card.attributes.status = updatedCard.attributes.status;
  }

  @action
  patchLocalCard(id, status = ORDER_STATUS.AWAITS_CONFIRMATION) {
    const patchCard = this.cards.find(card => card.id === id);
    patchCard.attributes.status = status;
  }

  @action
  setPackage(orderPackage: OrderPackage) {
    this.package = orderPackage;
  }

  @action
  setCard(orderCard: OrderCard) {
    this.card = orderCard;
  }

  @action
  viewOrder() {
    this.orderInView = true;
  }

  @action
  hideOrder() {
    this.orderInView = false;
  }

  async initChannel(channel) {
    const { logistics: logisticsModule } = this.sdk;
    const token = await logisticsModule.channelToken();
    const socket = new Socket(urlConfig.logisticsChannelUrl, {
      params: {
        token,
      },
    });
    socket.connect();

    this.channel = socket.channel(channel);
  }

  closeChannel() {
    this.channel.leave().receive('ok', () => {
      this.channel = null;
    });
  }

  patchCard = (id: string, status: string, reason?: string) => {
    const body = {
      id,
      data: {
        attributes: {
          status,
        },
      },
    };
    if (reason && typeof reason === 'string' && reason.length > 0) {
      body.data.attributes.reason = reason;
    }
    this.channel.push('patch_card', body);
  };

  fetchAndSetOrder = (id: string) => {
    const body = {
      id,
      include: 'package',
    };
    this.channel.push('get_card', body).receive('ok', resp => {
      this.setCard(resp.data);
      this.setPackage(resp.included[0]);
    });
  };

  fetchSetAndViewOrder = (id: string) => {
    this.fetchAndSetOrder(id);
    this.viewOrder();
  };

  dehydrate() {
    return {
      card: this.card,
      cards: this.cards,
      package: this.package,
      packageInView: this.packageInView,
    };
  }
}
