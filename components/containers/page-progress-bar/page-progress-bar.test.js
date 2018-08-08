/* eslint-disable import/first, no-unused-vars */
import PageProgressBar, { getProgressBar } from './index';

describe('PageProgressBar', () => {
  let NProgress;
  let Router;
  beforeEach(() => {
    NProgress = require('nprogress');
    Router = require('next/router');
  });

  it('behaves like an HOC', () => {
    expect(PageProgressBar).toBeAHoc();
  });

  describe('when the site has an error when changing pages', () => {
    beforeEach(() => {
      NProgress.done = jest.fn();
    });
    it('will complete the progress bar', () => {
      // Create instance of component with progress bar
      const ProgressComponent = getProgressBar(<div />);
      const instance = new ProgressComponent();
      // call mount
      instance.componentDidMount();
      // error on the route change
      Router.default.onRouteChangeError();
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
      const ProgressComponent = getProgressBar(<div />);
      const instance = new ProgressComponent();
      // call mount
      instance.componentDidMount();
      // complete the route change
      Router.default.onRouteChangeComplete();
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
      const ProgressComponent = getProgressBar(<div />);
      const instance = new ProgressComponent();
      // call mount
      instance.componentDidMount();
      // call route change start
      Router.default.onRouteChangeStart();
      // component should hear the event, and start progress
      expect(NProgress.start).toHaveBeenCalled();
    });
  });

  describe('When the component is rendered on the page', () => {
    it('will register to listen to route events', () => {
      // Create instance of component with progress bar
      const ProgressComponent = getProgressBar(<div />);
      const instance = new ProgressComponent();
      // call mount
      instance.componentDidMount();
      // expect all the route handlers to be asssigned
      expect(Router.default.onRouteChangeStart).toBe(
        instance.onRouteChangeStart,
      );
      expect(Router.default.onRouteChangeComplete).toBe(
        instance.onRouteChangeComplete,
      );
      expect(Router.default.onRouteChangeError).toBe(
        instance.onRouteChangeError,
      );
    });
  });

  describe('when the component is removed from the page', () => {
    beforeEach(() => {
      NProgress.remove = jest.fn();
    });

    it('will un-register from route events', () => {
      // Create instance of component with progress bar
      const ProgressComponent = getProgressBar(<div />);
      const instance = new ProgressComponent();
      // setup  route handlers
      instance.componentDidMount();
      // unmount component which should clean then up
      instance.componentWillUnmount();
      // expect all the route handlers to be null
      expect(Router.default.onRouteChangeStart).toBe(null);
      expect(Router.default.onRouteChangeComplete).toBe(null);
      expect(Router.default.onRouteChangeError).toBe(null);
    });

    it('will cleanup the progress bar', () => {
      // Create instance of component with progress bar
      const ProgressComponent = getProgressBar(<div />);
      const instance = new ProgressComponent();
      // Call unmount
      instance.componentWillUnmount();
      // verify that the nprogress element is removed
      expect(NProgress.remove).toHaveBeenCalled();
    });
  });
});
