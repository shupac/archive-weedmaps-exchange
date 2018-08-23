// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Flex } from '@ghostgroup/grid-styled';
import { ErrorWrapper, ErrorTitle } from './styled-components';

type State = {
  hasError: boolean,
  info: any,
  error: any,
};

type CustomErrorMessage = ((error: any, info: any) => ?string) | null;
type CustomErrorComponent =
  | ((error: any, info: any) => ?React$Element<any>)
  | null;

type Props = {
  customErrorMessage?: CustomErrorMessage,
  customError?: CustomErrorComponent,
  children?: Node,
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: {},
      info: {},
    };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error, info });
    logger.debug('Component Error!', error, info);
  }

  renderError(message: string) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <ErrorWrapper>
          <div>
            <ErrorTitle>Error!</ErrorTitle>
            <span>
              &nbsp;
              {message}
            </span>
          </div>
        </ErrorWrapper>
      </Flex>
    );
  }

  render() {
    const { customError, customErrorMessage } = this.props;
    const { hasError, error, info } = this.state;

    if (hasError) {
      const customizedError = customError && customError(error, info);

      if (customizedError) {
        return customizedError;
      }

      const errorMessage =
        (customErrorMessage && customErrorMessage(error, info)) ||
        error.message;

      return this.renderError(errorMessage);
    }

    return this.props.children;
  }
}
