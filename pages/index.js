import React, { Component } from 'react';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import RouterProvider from 'components/containers/router-provider';
import AuthStore from 'lib/stores/auth';

type Props = {
  auth: AuthStore,
};

export class Home extends Component<Props> {
  static displayName = 'HomePage';

  render() {
    const { auth: authStore } = this.props;
    return (
      <PageLayoutWithProgressBar>
        <PageContent>
          <h1>Admin</h1>
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

export default RouterProvider(Home);
