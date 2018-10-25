import DAYS from 'lib/common/date';
import Slugify from 'slugify';
import config from 'config';

export function isPriceInvalid(price) {
  return !price || !Number.isFinite(price);
}

/**
 * Tagged template for urls
 * @example
 * const MyUrl = urls`/listings/${'type'}/${'slug'}`;
 * console.log(MyUrl({type: 'deliveries', slug: 'my-slug'}));
 * // https://api-acceptance.weedmaps.com/api/v2/listings/deliveries/my-slug
 */
export function urls(base = config.esWrapperUrl) {
  return (urlStr, ...params) => variables => {
    const clean = /[\n\s]/g;
    const path = params.reduce((prev, cur, i) => {
      let cookedStr;
      if (typeof cur === 'function') {
        cookedStr = cur(variables);
      } else {
        cookedStr = variables[cur];
      }
      return prev + cookedStr + urlStr[i + 1].replace(clean, '');
    }, urlStr[0].replace(clean, ''));
    return `${base.replace(/\/$/, '')}${path}`;
  };
}

export function fixMissingImageUrl(imageUrl) {
  if (
    imageUrl.indexOf('avatars/users/square_missing.png') !== -1 ||
    imageUrl.indexOf('avatars/deliveries/square_missing.png') !== -1
  ) {
    return `${config.coreHost}${imageUrl}`;
  }
  return imageUrl;
}

export function stripNonNumbers(rawString) {
  return rawString.replace(/[^\d]/g, '');
}

export function toPrice(price) {
  if (isPriceInvalid(price)) {
    return '--';
  }
  let fixedPrice = parseFloat(price).toFixed(2);
  if (fixedPrice.indexOf('.00') !== -1) {
    fixedPrice = parseInt(fixedPrice, 10);
  }
  return `$${fixedPrice}`;
}

export function centsToDollars(cents) {
  return cents / 100;
}

export function formatCentsToDollars(
  price,
  locales = 'en-US',
  localCurrency = 'USD',
) {
  const priceInDollars = centsToDollars(price);
  if (price === 0) {
    return '$0.00';
  } else if (isPriceInvalid(price)) {
    return '--';
  }
  return priceInDollars.toLocaleString(locales, {
    style: 'currency',
    currency: localCurrency,
  });
}

export function formatDollars(price, locales = 'en-US', localCurrency = 'USD') {
  if (isPriceInvalid(price)) {
    return '--';
  }
  return price.toLocaleString(locales, {
    style: 'currency',
    currency: localCurrency,
  });
}

export function slugify(val) {
  return Slugify(val).toLowerCase();
}

export function getToday() {
  return DAYS[new Date().getDay()];
}

export function stringIsEmpty(str) {
  if (str) {
    return false;
  }
  return true;
}

export function normalizePhoneNumber(phone) {
  // normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, '');

  // check if number length equals to 10
  if (phone.length === 10) {
    // reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  return phone.replace(/(\d{3})(\d{4})/, '$1-$2');
}

export function shortifyOrderCardId(cardId) {
  return cardId.substr(cardId.length - 7);
}

export function truncate(sentence, num) {
  if (sentence && num && num < sentence.trim().length) {
    return `${sentence.trim().slice(0, num)}...`;
  }

  return sentence;
}

export function clearTags(string) {
  return string.replace(/<[^>]*>/g, '');
}

export function stripNonNumbersWithDot(string) {
  return string
    .replace(/[^0-9.]+/g, '')
    .replace(/\./, 'x')
    .replace(/\./g, '')
    .replace(/x/, '.');
}
