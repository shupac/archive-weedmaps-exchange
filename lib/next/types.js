// @flow
import type { $Request, $Response } from 'express';
import type Client from '@ghostgroup/wm-sdk-js';
import * as React from 'react';

export type RequestWithIntl = $Request & {
  locale: any,
  sdkClient: Client,
};

export type ResponseWithCapturedError = $Response & {
  capturedError?: Error,
};

export type NextContext = {
  asPath: string,
  pathname: string,
  query: Object,
  req?: RequestWithIntl,
  res?: ResponseWithCapturedError,
  // $Response is Express, Response is Fetch Response https://developer.mozilla.org/en-US/docs/Web/API/Response
  jsonPageRes?: Response,
  err?: Error,
};

export type GetInitialPropsFunc = (NextContext, any) => Promise<any>;

export type NextClassComponent<T> = Class<React$Component<T, any>> & {
  +getInitialProps: GetInitialPropsFunc,
};
export type NextStatelessComponent<
  T,
> = React$StatelessFunctionalComponent<T> & {
  +getInitialProps: GetInitialPropsFunc,
};

export type NextComponentType<Props> =
  | NextClassComponent<Props>
  | NextStatelessComponent<Props>;

export type RouteToGetInitialPropsFunc = { [string]: GetInitialPropsFunc };

export type Module = {
  default: {
    matches?: RouteToGetInitialPropsFunc,
  },
};

export type DynamicOptions = {
  loading?: React.Node,
  ssr: boolean,
};
