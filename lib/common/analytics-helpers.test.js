/* eslint-disable import/first */
/* global it, expect, describe */
import * as analyticsHelpers from './analytics-helpers';

describe('analyticsHelpers', () => {
  describe('setAmplitudeUserProperties', () => {
    it('sets amplitude user properties', () => {
      analyticsHelpers.setAmplitudeUserProperties({
        'embedded webview': false,
      });
      expect(
        global.amplitude.getInstance().setUserProperties,
      ).toHaveBeenCalledWith({
        'embedded webview': false,
      });
    });
  });
  describe('logAmplitudeEvent', () => {
    it('logs an amplitude event', () => {
      analyticsHelpers.logAmplitudeEvent(
        'event fired',
        {
          'some param': 'some value',
        },
        'userid420',
      );
      expect(global.amplitude.getInstance().setUserId).toHaveBeenCalledWith(
        'userid420',
      );
      expect(global.amplitude.getInstance().logEvent).toHaveBeenCalledWith(
        'event fired',
        {
          'some param': 'some value',
        },
      );
    });
  });
});
