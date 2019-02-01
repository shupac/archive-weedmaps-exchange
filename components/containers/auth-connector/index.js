import React, { Component } from 'react';
import { redirectUnauthenticatedUser } from 'lib/common/redirect-unauthenticated-user';
import ErrorPageComponent from 'components/layouts/error-page';
import logger from 'lib/common/logger';

function resolveUnauthenticatedRedirect(props, stores) {
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
      const { authStore, buyerCart, buyerSettings } = store;

      let initialProps = {};
      logger.debug('Checking if we are authenticated');
      // Check user status
      if (authStore.isAuthenticated) {
        // Auth tokens exists, try and fetch the user
        try {
          logger.debug('Fetching user!');
          await authStore.fetchUser();
          if (authStore.loggedIn) {
            // fetch cart and locations
            const promises = [];
            promises.push(buyerCart.fetchCart());
            promises.push(buyerSettings.getLocations());
            await Promise.all(promises);
          }
        } catch (e) {
          logger.debug('Fetching user FAIL', e);
          if (e.response) {
            const body = await e.response.json();
            if (body.errors[0].status === '403') {
              initialProps.userNotEnabled = true;
            } else {
              return resolveUnauthenticatedRedirect(props, store);
            }
          } else {
            return resolveUnauthenticatedRedirect(props, store);
          }
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
      if (this.props.userNotEnabled) {
        return <ErrorPageComponent statusCode={403} />;
      }
      return <ComponentToCompose {...this.props} />;
    }
  }

  return AuthConnector;
};

AuthConnectorWrapper.displayName = 'AuthConnector';
export default AuthConnectorWrapper;
