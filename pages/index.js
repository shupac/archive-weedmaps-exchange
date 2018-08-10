// @flow
import React, { Component } from 'react';
import RouterProvider from 'components/containers/router-provider';
import AuthConnector from 'components/containers/auth-connector';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import withStores from 'lib/stores/focused-store-provider';
import AuthStore from 'lib/stores/auth';
import { inject, observer } from 'mobx-react';

type Props = {};

export class Home extends Component<Props> {
  static displayName = 'HomePage';

  render() {
    return (
      <PageLayoutWithProgressBar>
        <PageContent>
          <h1>Well, hello der</h1>
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

const pageStores = {
  auth: { Store: AuthStore },
};

export default withStores(
  AuthConnector(RouterProvider(inject('auth')(observer(Home)))),
  pageStores,
);
