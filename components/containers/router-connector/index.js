import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * RouterConnector is a HOC for providing the router information as a prop.
 * @param ComponentToCompose
 */
export const RouterConnectorWrapper = ComponentToCompose => {
  class RouterConnector extends Component {
    static async getInitialProps(props, stores) {
      let initialProps = {};

      // run component getInitialProps on the composed component
      if (ComponentToCompose.getInitialProps) {
        initialProps = await ComponentToCompose.getInitialProps(props, stores);
      }

      // return any initial props
      return { ...initialProps };
    }

    static contextTypes = {
      url: PropTypes.object,
    };

    render() {
      return <ComponentToCompose {...this.props} url={this.context.url} />;
    }
  }

  // determine the displayName
  const displayName =
    ComponentToCompose.displayName || ComponentToCompose.name || 'Component';

  // Annotate the final component with the displayName and the ComposedComponent instance
  RouterConnector.displayName = `${
    RouterConnectorWrapper.displayName
  }(${displayName})`;
  RouterConnector.ComposedComponent = ComponentToCompose;

  return RouterConnector;
};

RouterConnectorWrapper.displayName = 'RouterProvider';
export default RouterConnectorWrapper;
