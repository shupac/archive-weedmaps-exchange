import { getDefaultPrice } from 'lib/common/prices';

describe('Common lib Prices', () => {
  describe('should be able to get a default price', () => {
    let price;
    beforeEach(() => {
      price = {
        ounce: null,
        unit: null,
        gram: null,
      };
    });

    it('of an eighth when we have an eighth in `price`', () => {
      price.ounce = [{ units: '1/8', price: 420 }];
      const defaultPrice = getDefaultPrice(price);
      expect(defaultPrice).toEqual({
        label: '1/8',
        price: 420,
        measurement: 'eighth_ounce',
        type: 'ounce',
      });
    });

    it('of the cheapest gram unit if no eighth price present', () => {
      price = {
        gram: [
          {
            units: '1/2',
            price: 10,
          },
          {
            units: '1',
            price: 20,
          },
        ],
        ounce: [
          {
            units: '1/4',
            price: 75,
          },
          {
            units: '1/2',
            price: 120,
          },
        ],
      };
      const defaultPrice = getDefaultPrice(price);
      expect(defaultPrice).toEqual({
        label: '0.5G',
        price: 10,
        measurement: 'half_gram',
        type: 'gram',
      });
    });

    it('of the cheapest ounce when no grams and no eigth ounce', () => {
      price = {
        ounce: [
          {
            units: '1/4',
            price: 75,
          },
          {
            units: '1/2',
            price: 120,
          },
        ],
      };
      const defaultPrice = getDefaultPrice(price);
      expect(defaultPrice).toEqual({
        label: '1/4',
        price: 75,
        measurement: 'quarter_ounce',
        type: 'ounce',
      });
    });

    it('of an unit when we have an unit in `price`', () => {
      price = {
        unit: { units: '1', price: 420 },
      };
      const defaultPrice = getDefaultPrice(price);
      expect(defaultPrice).toEqual({
        label: 'EACH',
        price: 420,
        measurement: 'unit',
        type: 'unit',
      });
    });
  });
});
