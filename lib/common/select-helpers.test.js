import { licenseToSelect } from './select-helpers';

describe('Select Helpers', () => {
  it('should convert license object to object with text / value', () => {
    const license = {
      licenseType: '1',
      number: '12345678',
    };
    const converted = licenseToSelect(license);
    expect(converted).toEqual({ text: '1', value: '12345678' });
  });
});
