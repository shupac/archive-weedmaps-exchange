import React, { Component } from 'react';
import ErrorPage from 'pages/_error';
import { defaultPropsStatusCode, propTypesStatusCode } from 'lib/types/page';

export const errorHandlerConnector = ComponentToCompose => {
  class ErrorHandler extends Component {
    static defaultProps = {
      ...defaultPropsStatusCode,
    };

    static propTypes = {
      ...propTypesStatusCode,
    };

    static async getInitialProps(props, stores) {
      let initialProps = {};

      // run component getInitialProps on the composed component
      if (ComponentToCompose.getInitialProps) {
        logger.debug(
          'Running GIPs on composed component',
          ComponentToCompose.displayName,
        );
        initialProps = await ComponentToCompose.getInitialProps(props, stores);
      }

      // return any initial props
      return { ...initialProps };
    }

    render() {
      const { statusCode } = this.props;
      logger.debug('Status Code', statusCode);
      if (statusCode !== 200) {
        return <ErrorPage statusCode={statusCode} />;
      }
      return <ComponentToCompose {...this.props} />;
    }
  }

  const displayName =
    ComponentToCompose.displayName || ComponentToCompose.name || 'Component';
  ErrorHandler.displayName = `WithErrorHandler(${displayName})`;
  ErrorHandler.ComposedComponent = ComponentToCompose;
  return ErrorHandler;
};

errorHandlerConnector.displayName = 'WithErrorHandler';
export default errorHandlerConnector;
