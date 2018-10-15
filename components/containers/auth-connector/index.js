import React, { Component } from 'react';
import {
  redirectByName,
  redirectUnauthenticatedUser,
} from 'lib/common/redirect-unauthenticated-user';

function resolveUnauthenticatedRedirect(props, stores) {
  if (process.env.NODE_ENV === 'development') {
    logger.debug('In DEV mode! Showing Dev Login Page');
    return {
      statusCode: 401,
      redirected: redirectByName(props, 'dev-login', {
        login: 'login',
      }),
    };
  }
  return {
    statusCode: 401,
    redirected: redirectUnauthenticatedUser(props, stores),
  };
}

/**
 * AuthConnector is a HOC for subscribing to the Auth store. It
 * gets the initial Auth of the user and populates the Auth store
 * @param ComponentToCompose
 */
export const AuthConnectorWrapper = ComponentToCompose => {
  // determine the displayName
  const displayName =
    ComponentToCompose.displayName || ComponentToCompose.name || 'Component';

  class AuthConnector extends Component {
    static ComposedComponent = ComponentToCompose;
    static displayName = `${AuthConnectorWrapper.displayName}(${displayName})`;

    static async getInitialProps(props, store) {
      const { authStore } = store;

      let initialProps = {};

      logger.debug('Checking if we are authenticated (hasTokens?)');

      // Check user status
      if (authStore.isAuthenticated) {
        // Auth tokens exists, try and fetch the user
        try {
          logger.debug('Fetching user!');
          await authStore.fetchUser();
        } catch (e) {
          logger.debug('Fetching user FAIL');
          return resolveUnauthenticatedRedirect(props, store);
        }
      } else {
        return resolveUnauthenticatedRedirect(props, store);
      }

      // run component getInitialProps on the composed component
      if (ComponentToCompose.getInitialProps) {
        initialProps = ComponentToCompose.getInitialProps(props, store);
      }
      // return any initial props
      return initialProps;
    }

    render() {
      return <ComponentToCompose {...this.props} />;
    }
  }

  return AuthConnector;
};

AuthConnectorWrapper.displayName = 'AuthConnector';
export default AuthConnectorWrapper;
