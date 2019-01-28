// @flow
import React, { Component } from 'react';
import { Flex } from '@ghostgroup/grid-styled';
import styled from 'styled-components';

const ErrorWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
`;

type Props = {
  statusCode: number,
};

export class ErrorPage extends Component<Props> {
  static displayName = 'ErrorPage';

  static defaultProps = {
    statusCode: 500,
  };

  static async getInitialProps(ctx: any) {
    const initialProps = {};
    initialProps.statusCode = ctx.res ? ctx.res.statusCode : 200;

    /**
     * Next.js swallows error when thrown within the `getInitialProps` cycle
     * but passes the error down through the props to this error page. From
     * here we can then return it to the result so we can properly report it
     * to Honeybadger.
     */

    if (ctx.err && ctx.res && !ctx.res.capturedError) {
      ctx.res.capturedError = ctx.err;
    }

    return initialProps;
  }

  render() {
    return (
      <ErrorWrapper
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <h1>{this.props.statusCode}</h1>
        <p>An unexpected error occurred</p>
      </ErrorWrapper>
    );
  }
}

export default ErrorPage;
