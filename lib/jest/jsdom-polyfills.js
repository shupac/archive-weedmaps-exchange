// https://github.com/facebook/jest/issues/4545
// Polyfill RAF until JSDOM supports it
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
