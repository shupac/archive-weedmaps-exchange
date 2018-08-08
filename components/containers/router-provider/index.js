import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * RouterProvider is a HOC for providing the router information into the React Context.
 * @param ComponentToCompose
 */
export const RouterProviderWrapper = ComponentToCompose => {
  class RouterProvider extends Component {
    static async getInitialProps(props, stores) {
      let initialProps = {};

      // run component getInitialProps on the composed component
      if (ComponentToCompose.getInitialProps) {
        initialProps = await ComponentToCompose.getInitialProps(props, stores);
      }

      // return any initial props
      return { ...initialProps };
    }

    static childContextTypes = {
      url: PropTypes.object,
    };

    getChildContext() {
      const { url } = this.props;
      return { url };
    }

    render() {
      return <ComponentToCompose {...this.props} />;
    }
  }

  RouterProvider.defaultProps = {
    url: { query: {} },
  };

  RouterProvider.propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        type: PropTypes.string,
      }),
    }),
  };

  // determine the displayName
  const displayName =
    ComponentToCompose.displayName || ComponentToCompose.name || 'Component';

  // Annotate the final component with the displayName and the ComposedComponent instance
  RouterProvider.displayName = `${
    RouterProviderWrapper.displayName
  }(${displayName})`;
  RouterProvider.ComposedComponent = ComponentToCompose;

  return RouterProvider;
};

RouterProviderWrapper.displayName = 'RouterProvider';
export default RouterProviderWrapper;
