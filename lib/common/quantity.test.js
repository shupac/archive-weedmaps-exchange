import { canChangeQuantity, changeQuantity } from 'lib/common/quantity';

describe('Quantity Change ', () => {
  it('should allow quantity change if more than 0 items', () => {
    const test = canChangeQuantity(5);
    expect(test).toEqual(true);
  });
  it('should not allow quantity change if 0 or less items', () => {
    const test = canChangeQuantity(0);
    expect(test).toEqual(false);
  });
  it('should be able to handle changing the quantity', () => {
    changeQuantity(1, 1, newValue => {
      expect(newValue).toEqual(2);
    })();
    changeQuantity(-1, 2, newValue => {
      expect(newValue).toEqual(1);
    })();
    const fakeOnChange = jest.fn();
    changeQuantity(-1, 1, fakeOnChange)();
    expect(fakeOnChange).not.toBeCalled();
  });
});
