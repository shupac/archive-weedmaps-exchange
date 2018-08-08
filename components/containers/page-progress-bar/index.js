import React, { Component } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

export const getProgressBar = ComponentToCompose => {
  class ProgressBar extends Component {
    componentDidMount() {
      Router.onRouteChangeStart = this.onRouteChangeStart;
      Router.onRouteChangeComplete = this.onRouteChangeComplete;
      Router.onRouteChangeError = this.onRouteChangeError;
    }

    componentWillUnmount() {
      Router.onRouteChangeStart = null;
      Router.onRouteChangeComplete = null;
      Router.onRouteChangeError = null;
      // remove the element
      NProgress.remove();
    }

    onRouteChangeComplete() {
      NProgress.done();
    }

    onRouteChangeError() {
      NProgress.done();
    }

    onRouteChangeStart() {
      NProgress.start();
    }

    render() {
      return <ComponentToCompose {...this.props} />;
    }
  }
  // Annotate the final component with the displayName and the ComposedComponent instance
  const displayName =
    ComponentToCompose.displayName || ComponentToCompose.name || 'Component';
  ProgressBar.displayName = `WithProgressBar(${displayName})`;
  ProgressBar.ComposedComponent = ComponentToCompose;
  return ProgressBar;
};

export const ProgressBarWrapper = ComponentToCompose =>
  getProgressBar(ComponentToCompose);

ProgressBarWrapper.displayName = 'WithProgressBar';
export default ProgressBarWrapper;
