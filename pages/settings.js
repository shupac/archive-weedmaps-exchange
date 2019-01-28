// @flow
import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { inject } from 'mobx-react';
import { Tabs } from '@ghostgroup/ui';
import TabButton from 'components/atoms/tab-button';
import { ButtonPrimary } from 'components/atoms/button';
import { Link } from 'lib/routes';
import { type StoreType } from 'lib/types/store';
import AuthConnector from 'components/containers/auth-connector';
import provide from 'lib/data-access/stores/provider';
import Subheader from 'components/atoms/subheader';
import ShowIfRoute from 'components/atoms/show-if-route';
import Locations from 'components/organisms/settings-locations';
import SettingsProfile from 'components/organisms/settings-profile';
import {
  PageContent,
  PageLayout,
  TabContent,
} from 'components/layouts/page-layout';

type Props = {
  store: StoreType,
  router: any,
};

const tabs = [
  {
    path: 'profile',
    label: 'Profile',
  },
  {
    path: 'locations',
    label: 'Locations',
  },
];

export class Settings extends Component<Props> {
  static displayName = 'Settings';

  render() {
    const { router, store } = this.props;
    const { query } = router;
    const { uiStore, buyerSettings, addressSuggestions } = store;

    return (
      <PageLayout>
        <PageContent>
          <Subheader>
            <Fragment>
              <Tabs disableSelectionIndicatorBar>
                {tabs.map(({ path, label }) => (
                  <TabButton key={label} isSelected={path === query.tab}>
                    <Link route="settings" params={{ tab: path }}>
                      <a>{label}</a>
                    </Link>
                  </TabButton>
                ))}
              </Tabs>
            </Fragment>
            {query.tab !== 'locations' ? (
              false
            ) : (
              <ButtonPrimary
                onClick={() => {
                  buyerSettings.setEditingLocationId(null);
                  addressSuggestions.clearAddressSuggestions();
                  uiStore.openModal('locationModal');
                }}
                width={161}
              >
                New Location
              </ButtonPrimary>
            )}
          </Subheader>
          <TabContent>
            <ShowIfRoute match="/buyer/settings/profile">
              <SettingsProfile />
            </ShowIfRoute>

            <ShowIfRoute match="/buyer/settings/locations">
              <Locations />
            </ShowIfRoute>
          </TabContent>
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(withRouter(AuthConnector(inject('store')(Settings))));
