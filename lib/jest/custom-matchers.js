/* global jasmine */
// Import any custom matchers here
import 'jest-styled-components';
import isHoc from './is-hoc';
// Add with the function name as key to the Jasmine namespace
jasmine.addMatchers({ toBeAHoc: isHoc });

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', reason => {
    throw reason;
  });
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}

global.amplitude = {
  getInstance() {
    return this;
  },
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
  logEvent: jest.fn(),
};
