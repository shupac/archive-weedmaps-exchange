import theme from './theme';
import { color, dimension, text, breakpoint } from './theme-getters';

describe('given a theme', () => {
  describe('color', () => {
    it('should return a function that returns a requested color', () => {
      const getTealColor = color('teal');

      expect(getTealColor({ theme })).toBe('#00CDBE');
    });
  });

  describe('dimension', () => {
    it('should return a function that returns a requested dimension', () => {
      const getHeaderDimension = dimension('desktopHeader');

      expect(getHeaderDimension({ theme })).toBe(75);
    });
  });

  describe('text', () => {
    it('should return a function that returns a requested text', () => {
      const getFontFamily = text('fontFamily');

      expect(getFontFamily({ theme })).toBe(
        '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
      );
    });
  });

  describe('breakpoint', () => {
    it('should return a function that returns a requested breakpoint', () => {
      const getBreakpoint = breakpoint('sm');

      expect(getBreakpoint({ theme })).toBe(40);
    });
  });
});
