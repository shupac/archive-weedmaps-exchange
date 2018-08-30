import React, { Component } from 'react';
import { PageContent } from 'components/layouts/page-layout';
import { inject, observer } from 'mobx-react';
import provide from 'lib/data-access/stores/provider';
import DevLoginForm from 'components/dev/login';
import { withRouter } from 'next/router';

type Props = {
  auth: AuthStore,
  store: any,
};

export class Login extends Component<Props> {
  static displayName = 'LoginPage';

  render() {
    const { store } = this.props;

    return (
      <PageContent>
        <DevLoginForm store={store} />
      </PageContent>
    );
  }
}

export default provide(withRouter(Login));
