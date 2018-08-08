/* global jest */
const styleSheet = jest.genMockFromModule(
  'styled-components/lib/models/StyleSheet',
);
styleSheet.rules = jest.fn();
styleSheet.rules.mockReturnValue([]);
module.exports = styleSheet;
