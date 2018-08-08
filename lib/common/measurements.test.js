import measurementLabelMap from 'lib/common/measurements';

describe('Measurement Map', () => {
  it('should map half gram to .5G', () => {
    const test = measurementLabelMap.half_gram;
    expect(test).toEqual('.5G');
  });
  it('should map gram to 1G', () => {
    const test = measurementLabelMap.gram;
    expect(test).toEqual('1G');
  });
  it('should map two grams to 2G', () => {
    const test = measurementLabelMap.two_gram;
    expect(test).toEqual('2G');
  });
  it('should map eighth ounce to 1/8', () => {
    const test = measurementLabelMap.eighth_ounce;
    expect(test).toEqual('1/8');
  });
  it('should map quarter ounce to 1/4', () => {
    const test = measurementLabelMap.quarter_ounce;
    expect(test).toEqual('1/4');
  });
  it('should map half ounce to 1/2', () => {
    const test = measurementLabelMap.half_ounce;
    expect(test).toEqual('1/2');
  });
  it('should map an ounce to OZ', () => {
    const test = measurementLabelMap.ounce;
    expect(test).toEqual('OZ');
  });
});
