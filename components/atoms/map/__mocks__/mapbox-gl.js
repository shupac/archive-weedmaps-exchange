const MockMap = jest.fn().mockImplementation(() => ({
  on(event, target, cb) {
    // fire immediately
    try {
      target();
    } catch (e) {
      cb();
    }
  },
  fitBounds: jest.fn(),
  getBounds: () => ({
    _sw: {
      lat: 33.97,
      lng: -116.23,
    },
    _ne: {
      lat: 33.29,
      lng: -117.25,
    },
  }),
}));

module.exports = { Map: MockMap };
