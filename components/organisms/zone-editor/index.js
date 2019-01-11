// @flow
import * as React from 'react';
import SearchBox from 'components/atoms/search-box';
import ZoneCard from 'components/atoms/zone-card';
import { ButtonPrimary, ButtonWhite } from 'components/atoms/button';
import { Box } from '@ghostgroup/grid-styled';
import { inject, observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { type StoreType } from 'lib/types/store';
import { type ZoneType } from 'lib/data-access/models/zone';
import { type Bounds } from 'components/atoms/map/utils';
import {
  Container,
  FullWidthMap,
  ZoneCount,
  ZoneList,
  NoZones,
  MapContainer,
} from './styles';

type Props = {
  store: StoreType,
};

export class ZoneEditor extends React.Component<Props> {
  @observable loading = false;
  @observable dirty = false;
  @observable searchQuery = '';

  @computed
  get filteredZones(): ZoneType[] {
    const { sellerSettings } = this.props.store;
    return sellerSettings.zones.filter(
      zone => !!zone.name.toLowerCase().match(this.searchQuery.toLowerCase()),
    );
  }

  @computed
  get hasZones(): boolean {
    return this.filteredZones.length > 0;
  }

  @computed
  get shouldShowSearch(): boolean {
    return this.hasZones || (!this.hasZones && this.dirty);
  }

  componentDidMount() {
    this.loadZones();
  }

  @action
  loadZones = async () => {
    const { sellerSettings } = this.props.store;
    this.loading = true;
    await sellerSettings.fetchZones();
    this.loading = false;
  };

  onZoneDelete = (zone: ZoneType) => {
    console.log(zone);
  };

  onZoneEdit = (zone: ZoneType) => {
    console.log(zone);
  };

  onZoneCreate = () => {
    console.log('Creating Zone');
  };

  onMapMove = (bounds: Bounds) => {
    console.log(bounds);
  };

  onZoneSearch = (val: string) => {
    this.dirty = true;
    this.searchQuery = val;
  };

  render() {
    const { sellerSettings } = this.props.store;
    return (
      <Container>
        <Box flex={[0.85]}>
          {this.shouldShowSearch && (
            <Box p={[12]}>
              <Box pb={12}>
                <ButtonWhite
                  data-test-id="add-zone"
                  onClick={this.onZoneCreate}
                >
                  Add Zone
                </ButtonWhite>
              </Box>
              <SearchBox
                data-test-id="search-box"
                onHandleSearch={this.onZoneSearch}
              />
            </Box>
          )}
          {!this.hasZones && !this.searchQuery && (
            <NoZones
              flexDirection="column"
              alignItems="center"
              data-test-id="no-zones"
            >
              <h3>No Zones</h3>
              <p>
                Click the &ldquo;Add Zone&rdquo; button to create your first
                zone
              </p>
              <ButtonPrimary
                data-test-id="no-zones-add-zone"
                onClick={this.onZoneCreate}
              >
                Add Zone
              </ButtonPrimary>
            </NoZones>
          )}
          {!!this.filteredZones.length && (
            <ZoneCount data-test-id="zone-count">
              {sellerSettings.zones.length} Zones
            </ZoneCount>
          )}
          <ZoneList>
            {this.filteredZones.map(z => (
              <ZoneCard
                key={z.id}
                withMenu
                zone={z}
                data-test-id="zone-card"
                onEdit={this.onZoneEdit}
                onDelete={this.onZoneDelete}
              />
            ))}
          </ZoneList>
        </Box>
        <MapContainer flex={[2.15]}>
          <FullWidthMap fit onMoveEnd={this.onMapMove} />
        </MapContainer>
      </Container>
    );
  }
}

export default inject('store')(observer(ZoneEditor));
