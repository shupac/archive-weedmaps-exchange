import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import Subheader from 'components/atoms/subheader';

type Props = {
  store?: any,
};

export class Toast extends Component<Props> {
  callToastAction = () => {
    const { store } = this.props;
    store.uiStore.notifyToast({
      title: 'toast title',
      body: 'toast body',
    });
  };
  render() {
    return (
      <PageLayout>
        <PageContent>
          <Subheader>
            <h2>Toast Test Page</h2>
          </Subheader>
          <button onClick={this.callToastAction}>Fire toast</button>
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(inject('store')(Toast));
