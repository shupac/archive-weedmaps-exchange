/* eslint-disable import/first, no-unused-vars */
import { shallow } from 'enzyme';
import NProgressBar from './index';

describe('NProgressBar', () => {
  let NProgress;
  let router;
  let emitter;
  beforeEach(() => {
    NProgress = require('nprogress');
    router = require('next/router');
    emitter = router.Router.events;
  });

  describe('when the site has an error when changing pages', () => {
    beforeEach(() => {
      NProgress.done = jest.fn();
    });
    it('will complete the progress bar', () => {
      // Create instance of component with progress bar
      const instance = new NProgressBar();
      // call mount
      instance.componentDidMount();
      // error on the route change
      emitter.emit('routeChangeError');
      // component should hear the event, and complete progress
      expect(NProgress.done).toHaveBeenCalled();
    });
  });

  describe('when the site is done transitioning', () => {
    beforeEach(() => {
      NProgress.done = jest.fn();
    });
    it('will complete the progress bar', () => {
      // Create instance of component with progress bar
      const instance = new NProgressBar();
      // call mount
      instance.componentDidMount();
      // complete the route change
      emitter.emit('routeChangeComplete');
      // component should hear the event, and complete progress
      expect(NProgress.done).toHaveBeenCalled();
    });
  });

  describe('when the site is transitioning from a route', () => {
    beforeEach(() => {
      NProgress.start = jest.fn();
    });
    it('will show the progress bar', () => {
      // Create instance of component with progress bar
      const instance = new NProgressBar();
      // call mount
      instance.componentDidMount();
      // call route change start
      emitter.emit('routeChangeStart');
      // component should hear the event, and start progress
      expect(NProgress.start).toHaveBeenCalled();
    });
  });

  describe('When the component is rendered on the page', () => {
    let onSpy;
    beforeEach(() => {
      onSpy = jest.spyOn(emitter, 'on');
    });
    it('will register to listen to route events', () => {
      // Create instance of component with progress bar
      const instance = new NProgressBar();
      // call mount
      instance.componentDidMount();
      // expect all the route handlers to be asssigned
      expect(onSpy).toHaveBeenCalledWith(
        'routeChangeStart',
        instance.onRouteChangeStart,
      );
      expect(onSpy).toHaveBeenCalledWith(
        'routeChangeComplete',
        instance.onRouteChangeComplete,
      );
      expect(onSpy).toHaveBeenCalledWith(
        'routeChangeError',
        instance.onRouteChangeError,
      );
    });
  });

  describe('when the component is removed from the page', () => {
    let offSpy;
    beforeEach(() => {
      NProgress.remove = jest.fn();
      offSpy = jest.spyOn(emitter, 'off');
    });

    it('will un-register from route events', () => {
      // Create instance of component with progress bar
      const instance = new NProgressBar();
      // setup  route handlers
      instance.componentDidMount();
      // unmount component which should clean then up
      instance.componentWillUnmount();
      expect(offSpy).toHaveBeenCalledWith(
        'routeChangeStart',
        instance.onRouteChangeStart,
      );
      expect(offSpy).toHaveBeenCalledWith(
        'routeChangeComplete',
        instance.onRouteChangeComplete,
      );
      expect(offSpy).toHaveBeenCalledWith(
        'routeChangeError',
        instance.onRouteChangeError,
      );
    });

    it('will cleanup the progress bar', () => {
      // Create instance of component with progress bar
      const instance = new NProgressBar();
      // Call unmount
      instance.componentWillUnmount();
      // verify that the nprogress element is removed
      expect(NProgress.remove).toHaveBeenCalled();
    });
  });
});
