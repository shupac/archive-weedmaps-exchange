import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import Subheader from 'components/atoms/subheader';
import { ALERT_STATUS } from 'components/molecules/toast-manager/constants';

type Props = {
  store?: any,
};

export class Toast extends Component<Props> {
  callToastAction = () => {
    const { store } = this.props;
    store.uiStore.notifyToast({
      title: 'toast title',
      body: '40 units | $2,608.00',
      link: { label: 'VIEW CART', route: '/buyer/marketplace/catalog' },
      status: ALERT_STATUS.SUCCESS,
      autoDismiss: 3500,
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
