// @flow
// General
import * as React from 'react';
import Head from 'next/head';
import { inject } from 'mobx-react';
import urlConfig from 'lib/common/url-config';
import { PageLayout } from 'components/layouts/page-layout';
import { SIDE_NAV_FEATURE_FLAGS } from 'components/layouts/page-layout/page-side-nav';
import SlideInPanelContainer from 'components/atoms/panel/slide-in-panel';
import DeliveriesPanel from 'components/organisms/deliveries-panel';
import DriversPanel from 'components/organisms/drivers-panel';
import DeliveryMap from 'components/organisms/delivery-map';
// HOCs
import RouterProvider from 'components/containers/router-provider';
import AuthConnector from 'components/containers/auth-connector';
import getFeatureFlags from 'components/containers/page-feature-flags';
import withStores from 'lib/stores/focused-store-provider';
// Stores & Services
import AuthStore from 'lib/stores/auth';
import DeliveryDashboard from 'lib/stores/delivery-dashboard';
import ModalStore from 'lib/stores/modal';

// Page API
type Props = {
  modal: ModalStore,
  auth: AuthStore,
  url: {
    query: {
      wmid: string,
    },
  },
  deliveryDashboard: DeliveryDashboard,
};

export class Delivery extends React.Component<Props> {
  componentDidMount() {
    const { deliveryDashboard: deliveryDashboardStore, url } = this.props;
    const { query } = url;

    // Initialize page's channel
    deliveryDashboardStore.initChannel(query.wmid);

    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event: any) => {
    const {
      deliveryDashboard: deliveryDashboardStore,
      modal: modalStore,
    } = this.props;

    if (event.key === 'Escape' && !modalStore.modalInView) {
      if (deliveryDashboardStore.selectedDelivery) {
        deliveryDashboardStore.clearSelectedDelivery();
      }
      if (deliveryDashboardStore.selectedDriver) {
        deliveryDashboardStore.clearSelectedDriver();
      }
    } else if (event.key === 'Escape' && modalStore.modalInView) {
      modalStore.hideModal();
    }
  };

  render() {
    const {
      auth: authStore,
      deliveryDashboard: deliveryDashboardStore,
    } = this.props;

    return (
      <PageLayout
        activeLink="delivery"
        user={authStore.user}
        pageScrollX
        contentScrollX={false}
      >
        <Head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>

        <SlideInPanelContainer
          left={<DeliveriesPanel store={deliveryDashboardStore} />}
          right={<DriversPanel store={deliveryDashboardStore} />}
        >
          <DeliveryMap />
        </SlideInPanelContainer>
      </PageLayout>
    );
  }
}

// Stores needed to be injected
const MobXAwareDelivery = inject('auth', 'deliveryDashboard', 'modal')(
  Delivery,
);
// HOCs that power page's framework
const ConnectedDelivery = AuthConnector(RouterProvider(MobXAwareDelivery));
// Store Definition Object (stores that must be bundled with page)
const pageStores = {
  auth: { Store: AuthStore },
  deliveryDashboard: { Store: DeliveryDashboard },
  modal: { Store: ModalStore },
};
export default getFeatureFlags(
  withStores(ConnectedDelivery, pageStores),
  { baseUrl: urlConfig.featureFlagApiUrl },
  [...SIDE_NAV_FEATURE_FLAGS],
);
