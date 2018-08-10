import React, { Component } from 'react';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import RouterProvider from 'components/containers/router-provider';
import { inject, observer } from 'mobx-react';
import withStores from 'lib/stores/focused-store-provider';
import AuthStore from 'lib/stores/auth';
import DevLoginForm from 'components/dev/login';

type Props = {
  auth: AuthStore,
};

export class Login extends Component<Props> {
  static displayName = 'LoginPage';

  render() {
    const { auth: authStore } = this.props;
    return (
      <PageLayoutWithProgressBar user={authStore.user}>
        <PageContent>
          <DevLoginForm auth={authStore} />
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

const pageStores = {
  auth: { Store: AuthStore },
};
export default withStores(
  RouterProvider(inject('auth')(observer(Login))),
  pageStores,
);
