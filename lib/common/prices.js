/* eslint-disable arrow-body-style */
import get from 'lodash.get';
import sortby from 'lodash.sortby';

export const priceTypes = ['gram', 'ounce', 'unit'];

export const priceLabelMap = {
  half_gram: '0.5G',
  gram: '1G',
  two_gram: '2G',
  eighth_ounce: '1/8',
  quarter_ounce: '1/4',
  half_ounce: '1/2',
  ounce: 'OZ',
  unit: 'EACH',
};

export const unitLabelMap = {
  gram: {
    '1/2': 'half_',
    '1': '',
    '2': 'two_',
  },
  ounce: {
    '1/8': 'eighth_',
    '1/4': 'quarter_',
    '1/2': 'half_',
    '1': '',
  },
};

/**
 * Returns the default price for an item
 * @param {object} price - Price object
 * @return {{label: string, price: number, key: string, type: string}}
 */
export function getDefaultPrice(price) {
  const blank = { label: '--', price: 0 };
  const ounce = get(price, 'ounce', false);
  const gram = get(price, 'gram', false);
  const unit = get(price, 'unit', {});
  const hasEighth = ounce && ounce.some(p => p.units === '1/8');
  const lowestOunce = sortby(ounce, price)[0];
  const lowestGram = sortby(gram, price)[0];
  let defaultUnitPrice;

  switch (true) {
    // Show the 1/8oz price if we have one
    case hasEighth:
      defaultUnitPrice = {
        ...get(
          ounce.filter(unitPrice => unitPrice.units === '1/8'),
          '[0]',
          blank,
        ),
      };
      defaultUnitPrice.measurement = 'eighth_ounce';
      defaultUnitPrice.type = 'ounce';
      break;
    // Show the lowest gram price if there is no 1/8 oz present
    case 'gram' in price:
      defaultUnitPrice = {
        ...get(
          gram.filter(unitPrice => unitPrice.units === lowestGram.units),
          '[0]',
          blank,
        ),
      };
      defaultUnitPrice.measurement = `${
        unitLabelMap.gram[defaultUnitPrice.units]
      }gram`;
      defaultUnitPrice.type = 'gram';
      break;
    // Show the lowest oz price if there is no 1/8 oz or grams prices present
    case 'ounce' in price:
      defaultUnitPrice = {
        ...get(
          ounce.filter(unitPrice => unitPrice.units === lowestOunce.units),
          '[0]',
          blank,
        ),
      };
      defaultUnitPrice.measurement = `${
        unitLabelMap.ounce[defaultUnitPrice.units]
      }ounce`;
      defaultUnitPrice.type = 'ounce';
      break;
    // Show the unit price
    default:
      defaultUnitPrice = { ...unit };
      defaultUnitPrice.type = 'unit';
      defaultUnitPrice.measurement = 'unit';
      break;
  }
  return {
    label: priceLabelMap[defaultUnitPrice.measurement],
    price: defaultUnitPrice.price,
    type: defaultUnitPrice.type,
    measurement: defaultUnitPrice.measurement,
  };
}

export function generateMeasurementKey(prices, type) {
  return prices[type].map(unitPrice => {
    return {
      measurement: `${unitLabelMap[type][unitPrice.units]}${type}`,
      ...unitPrice,
    };
  });
}

export default function flattenPrices(prices) {
  return priceTypes
    .map(type => {
      if (prices[type]) {
        return generateMeasurementKey(prices, type);
      }
      return [];
    })
    .reduce((flatPrice, price) => flatPrice.concat(price));
}
