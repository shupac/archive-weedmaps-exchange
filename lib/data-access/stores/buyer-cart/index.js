import { types } from 'mobx-state-tree';

export const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';

const BuyerCart = types
  .model('BuyerCart', {
    cart: '',
  })
  .views(() => ({}))
  .actions(() => ({
    mockAddToCart() {
      return new Promise(resolve => {
        setTimeout(() => resolve(`mockAddToCart response`), 3000);
      });
    },
  }));

export type BuyerCartType = {
  mockAddToCart: () => string,
};

export default BuyerCart;
