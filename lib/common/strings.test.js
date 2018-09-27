import {
  getToday,
  stripNonNumbers,
  toPrice,
  formatCentsToDollars,
  formatDollars,
  stringIsEmpty,
  normalizePhoneNumber,
  truncate,
} from 'lib/common/strings';

describe('Strings', () => {
  it('should be able to get a whole price', () => {
    const price = toPrice(24.0);
    expect(price).toEqual('$24');
  });

  it('should be able to get a price with cents', () => {
    const price = toPrice(2.4);
    expect(price).toEqual('$2.40');
  });

  it('should be able to format dollar amounts', () => {
    const price = formatDollars(187.0);
    expect(price).toEqual('$187.00');
  });

  it('should be able to handle dollar amounts if price is not a number', () => {
    const price = formatDollars(null);
    expect(price).toEqual('--');
  });

  it('should be able to convert cents to dollars', () => {
    const price = formatCentsToDollars(240);
    expect(price).toEqual('$2.40');
  });

  it('should be able to format price of 0 dollar amounts', () => {
    const price = formatCentsToDollars(0);
    expect(price).toEqual('$0.00');
  });

  it('should be able to handle if price is not a number', () => {
    const price = formatCentsToDollars(null);
    expect(price).toEqual('--');
  });

  it('should be able to strip non number characters from a string', () => {
    const clean = stripNonNumbers('+1-800-123-2336');
    expect(clean).toEqual('18001232336');
  });

  it('should be able to truncate a very long sentence', () => {
    const truncated = truncate(
      ' Hello, my name is, my name is, my name is, Slim Shady. Great I do not even know what I am typing about now just mumbling nothing like a mumble rapper ',
      100,
    );
    expect(truncated).toEqual(
      'Hello, my name is, my name is, my name is, Slim Shady. Great I do not even know what I am typing abo...',
    );
  });

  describe('getToday', () => {
    beforeEach(() => {
      const constantDate = new Date('1989-06-17T04:20:00');
      /* eslint no-global-assign:off */
      Date = class extends Date {
        constructor() {
          super();
          return constantDate;
        }
      };
    });
    afterAll(() => {
      Date = class extends Date {
        constructor() {
          super();
          return this;
        }
      };
    });
    it('should be able to get back today', () => {
      const day = getToday();
      expect(day).toEqual('saturday');
    });
  });
  describe('stringIsEmpty', () => {
    it('should return true if string is empty', () => {
      const blank = stringIsEmpty('');
      expect(blank).toEqual(true);
    });

    it('should return false if string is not empty', () => {
      const address = stringIsEmpty('addy');
      expect(address).toEqual(false);
    });
  });
  describe('normalizePhoneNumber', () => {
    it('should return a formatted phone # if has 10 digits', () => {
      const formatted = normalizePhoneNumber('555-123-4567');
      expect(formatted).toEqual('(555) 123-4567');
    });

    it('should return a stripped phone # if not 10 digits', () => {
      const formatted = normalizePhoneNumber('123-4567');
      expect(formatted).toEqual('123-4567');
    });
  });
});
