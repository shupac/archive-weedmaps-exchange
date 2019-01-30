// @flow
import { Component } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

export default class NProgressBar extends Component<any> {
  onRouteChangeComplete = () => {
    NProgress.done();
  };

  onRouteChangeError = () => {
    NProgress.done();
  };

  onRouteChangeStart = () => {
    NProgress.start();
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', this.onRouteChangeStart);
    Router.events.on('routeChangeComplete', this.onRouteChangeComplete);
    Router.events.on('routeChangeError', this.onRouteChangeError);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.onRouteChangeStart);
    Router.events.off('routeChangeComplete', this.onRouteChangeComplete);
    Router.events.off('routeChangeError', this.onRouteChangeError);
    // remove the element
    NProgress.remove();
  }

  render() {
    return null;
  }
}
