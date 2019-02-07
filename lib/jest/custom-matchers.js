/* global jasmine */
// Import any custom matchers here
import 'jest-styled-components';
import findByTestId from './find-by-test-id';
// Add with the function name as key to the Jasmine namespace
jasmine.addMatchers({ hasNodeWithTestId: findByTestId });
