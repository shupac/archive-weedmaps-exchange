/* eslint-disable import/first */
jest.mock('phoenix');
import OrderCards from 'lib/stores/order-cards';
import mockCards from 'lib/mocks/types/order-cards';
import mockPackage from 'lib/mocks/types/order-package';

import mockNewCard from 'lib/mocks/types/new-card';
import { ORDER_STATUS } from 'lib/stores/order-cards/index';
import toJson from 'enzyme-to-json';

describe('OrderCards store', () => {
  it('should be able to receive an array of cards', () => {
    const store = OrderCards.createStore();
    store.setCards(mockCards);

    expect(store.cards.length).toBe(6);
  });

  it('should be able to return only the "Not Started" cards', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    expect(store.notStarted.length).toBe(2);
  });

  it('should be able to return only the "In Progress" cards', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    expect(store.inProgress.length).toBe(2);
  });

  it('should be able to return only the "Ready" cards', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    expect(store.ready.length).toBe(2);
  });

  it('should be able to patch the status of a card', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });
    store.channel = {
      push: jest.fn(),
    };

    store.patchCard('fake-uuid-1', ORDER_STATUS.IN_PROGRESS);

    expect(store.channel.push).toHaveBeenCalledWith('patch_card', {
      id: 'fake-uuid-1',
      data: {
        attributes: {
          status: ORDER_STATUS.IN_PROGRESS,
        },
      },
    });
  });

  it('should be able to patch the status of a card and give a reason', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });
    store.channel = {
      push: jest.fn(),
    };

    store.patchCard('fake-uuid-1', ORDER_STATUS.IN_PROGRESS, 'Because');

    expect(store.channel.push).toHaveBeenCalledWith('patch_card', {
      id: 'fake-uuid-1',
      data: {
        attributes: {
          status: ORDER_STATUS.IN_PROGRESS,
          reason: 'Because',
        },
      },
    });
  });

  it('should be able to dehydrate the store with cards', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    const storesDehydratedState = store.dehydrate();

    expect(storesDehydratedState.cards).toBeDefined();
    expect(storesDehydratedState.cards.length).toBe(6);
  });

  it('should be able to update cards', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    store.updateCards({
      id: 'fake-uuid-1',
      attributes: {
        status: ORDER_STATUS.IN_PROGRESS,
      },
    });

    expect(store.notStarted.length).toBe(1);
  });

  it('should be able to update the drawer card', () => {
    const store = OrderCards.createStore({
      card: mockCards[0],
    });

    store.updateCard({
      id: 'fake-uuid-1',
      attributes: {
        status: ORDER_STATUS.IN_PROGRESS,
      },
    });

    expect(store.card.attributes.status).toEqual(ORDER_STATUS.IN_PROGRESS);
  });

  it('should be able to create a new card', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    expect(store.cards.length).toBe(6);
    store.createCard(mockNewCard);
    expect(store.cards.length).toBe(7);
  });

  it('should be able to set a package', () => {
    const store = OrderCards.createStore();
    store.setPackage(toJson(mockPackage));
    expect(store.packageDetail).toEqual(toJson(mockPackage));
  });

  it('should be able to patch a local card with the await status', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });

    store.patchLocalCard('fake-uuid-1');

    expect(store.notStarted.length).toBe(1);
  });

  it('should be able to view an order', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });
    expect(store.orderInView).toBe(false);
    store.viewOrder();
    expect(store.orderInView).toBe(true);
  });

  it('should be able to hide an order', () => {
    const store = OrderCards.createStore({
      cards: mockCards,
    });
    store.orderInView = true;
    store.hideOrder();
    expect(store.orderInView).toBe(false);
  });

  it('should be able to close a channel', () => {
    const store = OrderCards.createStore();
    const result = {
      receive(status, cb) {
        expect(status).toEqual('ok');
        cb();
      },
    };
    store.channel = {
      leave() {
        return result;
      },
    };

    store.closeChannel();
    expect(store.channel).toBeNull();
  });

  it('should be able to fetch and set an order', () => {
    const store = OrderCards.createStore();
    jest.spyOn(store, 'setCard');
    jest.spyOn(store, 'setPackage');
    const res = {
      data: mockCards[0],
      included: [mockPackage],
    };
    const result = {
      receive(status, cb) {
        expect(status).toEqual('ok');
        cb(res);
        expect(store.setCard).toHaveBeenCalledWith(mockCards[0]);
        expect(store.setPackage).toHaveBeenCalledWith(mockPackage);
      },
    };
    store.channel = {
      push() {
        return result;
      },
    };
    store.fetchAndSetOrder('fake-uuid-1');
  });

  it('should be able to fetch set and view an order', () => {
    const store = OrderCards.createStore();
    jest.spyOn(store, 'fetchAndSetOrder').mockReturnValue();
    jest.spyOn(store, 'viewOrder');
    store.fetchSetAndViewOrder('fake-uuid-1');
    expect(store.fetchAndSetOrder).toHaveBeenCalledWith('fake-uuid-1');
    expect(store.viewOrder).toHaveBeenCalled();
  });
});
