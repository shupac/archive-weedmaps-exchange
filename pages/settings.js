// @flow
import React, { Component, Fragment } from 'react';
import { inject } from 'mobx-react';
import { Tabs } from '@ghostgroup/ui';
import TabButton from 'components/atoms/tab-button';
import { Link } from 'lib/routes';
import { type StoreType } from 'lib/types/store';
import AuthConnector from 'components/containers/auth-connector';
import provide from 'lib/data-access/stores/provider';
import Subheader from 'components/atoms/subheader';
import ShowIfRoute from 'components/atoms/show-if-route';
import LocationModal from 'components/molecules/location-modal';
import Locations from 'components/organisms/settings-locations';
import Profile from 'components/organisms/settings-profile';
import {
  PageContent,
  PageLayout,
  TabContent,
} from 'components/layouts/page-layout';

type Props = {
  store?: StoreType,
  url: any,
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
    const { url } = this.props;
    const { query, pathname } = url;
    const { tab } = query;
    console.log('this is the store', this.props.store);

    return (
      <PageLayout pathname={pathname}>
        <PageContent>
          <Subheader>
            <Fragment>
              <Tabs>
                {tabs.map(({ path, label }) => (
                  <TabButton key={label} isSelected={path === url.query.tab}>
                    <Link route="settings" params={{ tab: path }}>
                      <a>{label}</a>
                    </Link>
                  </TabButton>
                ))}
              </Tabs>
            </Fragment>
            {tab === 'locations' && <LocationModal />}
          </Subheader>
          <TabContent>
            <ShowIfRoute match="/buyer/settings/profile">
              <Profile />
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

export default provide(AuthConnector(inject('store')(Settings)));
