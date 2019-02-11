// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import ZoneCard from 'components/atoms/zone-card';
import type { StoreType } from 'lib/types/store';
import GeoJson from 'components/atoms/map/geo-json';
import {
  LegendContainer,
  ZoneList,
  MapWrapper,
  SquareMap,
  NoZones,
} from './styles';

type Props = {
  store: StoreType,
};

export class ZoneLegend extends React.Component<Props> {
  @observable loading = false;

  @computed
  get hasZones(): boolean {
    const { zones } = this.props.store;
    return zones.zones.length > 0;
  }

  componentDidMount() {
    this.loadZones();
  }

  @action
  loadZones = async () => {
    const { zones } = this.props.store;
    this.loading = true;
    await zones.fetchZones();
    await zones.fetchRegionsForZones();

    this.loading = false;
  };

  geoJsonLayers = (): React.Node => {
    const { zones } = this.props.store;
    const zoneRegions = zones.zoneRegions
      .map(region => {
        const { zone } = zones.zoneRegionsById[region.wmRegionId];
        const regionWithGeometry = zones.regionsWithGeometry.get(
          region.wmRegionId,
        );
        if (regionWithGeometry && regionWithGeometry.geometry) {
          return (
            <GeoJson
              key={region.id.toString()}
              layerKey={region.id.toString()}
              geometry={regionWithGeometry.geometry}
              fill={zone.color}
              outline="#333"
              opacity={0.4}
              label={region.name.replace('Brands', '')}
            />
          );
        }

        return null;
      })
      .filter(el => el);

    return zoneRegions;
  };

  render() {
    const { zones } = this.props.store;

    if (!this.hasZones) {
      return (
        <NoZones data-test-id="no-zones">
          <h3>No Zones</h3>
          <p>Click the Manage Zones button above to create your first zone.</p>
        </NoZones>
      );
    }
    return (
      <LegendContainer>
        <MapWrapper>
          <SquareMap fit data-test-id="map-legend">
            {!this.loading && this.geoJsonLayers()}
          </SquareMap>
        </MapWrapper>
        <ZoneList>
          {zones.zones.map(z => (
            <ZoneCard
              key={z.id}
              zone={z}
              data-test-id="zone-card"
              withMenu={false}
            />
          ))}
        </ZoneList>
      </LegendContainer>
    );
  }
}

export default inject('store')(observer(ZoneLegend));
