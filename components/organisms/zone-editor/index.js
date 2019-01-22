// @flow
import * as React from 'react';
import SearchBox from 'components/atoms/search-box';
import ZoneCard from 'components/atoms/zone-card';
import { ButtonPrimary, ButtonWhite } from 'components/atoms/button';
import { Box } from '@ghostgroup/grid-styled';
import { inject, observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import type { ObservableMap } from 'mobx';
import { type StoreType } from 'lib/types/store';
import Zone, { type ZoneType } from 'lib/data-access/models/zone';
import Region, {
  type RegionType,
  type RegionWithGeometryType,
} from 'lib/data-access/models/region';
import { type Bounds } from 'lib/geo';
import GeoJson from 'components/atoms/map/geo-json';
import debounce from 'lodash.debounce';
import { CSSTransition } from 'react-transition-group';
import uniqueKey from 'lib/common/unique-key';
import {
  Container,
  FullWidthMap,
  ZoneCount,
  ZoneList,
  NoZones,
  MapContainer,
  ActionContainer,
  ZoneListContent,
} from './styles';
import ZoneForm from './zone-form';

type Props = {
  store: StoreType,
};

export class ZoneEditor extends React.Component<Props> {
  @observable loading = false;
  @observable dirty = false;
  @observable searchQuery = '';
  /**
   * Has the map been moved from the initial bounds
   * @type {boolean}
   */
  @observable boundsBroken = false;
  @observable creatingEditingZone = false;
  /**
   * selectedZoneRegions track the regions in the zone and any new selections
   * @type {ObservableMap<string, RegionType>}
   */
  @observable selectedZoneRegions: ObservableMap<
    string,
    RegionType,
  > = new observable.map();
  /**
   * regionsToAdd track only the regions that have been added before a commit
   * operation
   * @type {Map<*, *>}
   */
  regionsToAdd: Map<string, RegionType> = new Map();
  /**
   * regionsToRemove track only the regions that have been added before a commit
   * operation
   * @type {Map<*, *>}
   */
  regionsToRemove: Map<string, RegionType> = new Map();
  /**
   * The current selected Zone for editing
   */
  @observable selectedZone: ZoneType;

  @computed
  get filteredZones(): ZoneType[] {
    const { zones } = this.props.store;
    return zones.zones.filter(zone => {
      const query = this.searchQuery.toLowerCase();
      const zoneNameMatch = !!zone.name.toLowerCase().match(query);
      const regionNameMatch = zone.regions.some(region =>
        region.name.toLowerCase().match(query),
      );
      return zoneNameMatch || regionNameMatch;
    });
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
    const { zones } = this.props.store;
    this.loading = true;
    await zones.fetchZones();
    await zones.fetchRegionsForZones();
    if (zones.zones.length) {
      await zones.fetchRegionsInBounds();
    }
    this.loading = false;
  };

  onZoneDelete = (zone: ZoneType) => {
    const { zones } = this.props.store;
    zones.deleteZone(zone);
  };

  onZoneEdit = (zone: ZoneType) => {
    // show the edit form
    this.creatingEditingZone = true;
    // set the selected zone
    this.selectedZone = zone;
    // clear the existing set of zoneEditedRegions
    this.selectedZoneRegions.clear();
    // clear the transient region selections
    this.regionsToAdd.clear();
    this.regionsToRemove.clear();
    // Setup the selectedRegions to include the existing regions for that zone
    zone.regions.forEach(region => {
      this.selectedZoneRegions.set(region.wmRegionId.toString(), region);
    });
  };

  @action
  onZoneCreate = () => {
    this.creatingEditingZone = true;
    this.selectedZone = Zone.create({
      cId: uniqueKey(),
      id: '',
      name: '',
      color: '#fff',
    });
    const { zones } = this.props.store;
    // timeout for animation delay
    setTimeout(() => {
      zones.addZone(this.selectedZone);
    }, 500);
  };

  @action
  onRemoveRegionFromZone = (zone: ZoneType, region: RegionType) => {
    this.toggleRegion(region);
  };

  @action
  onZoneSave = async () => {
    if (!this.selectedZone.id) {
      await this.selectedZone.create();
    } else {
      await this.selectedZone.update();
    }

    this.regionsToAdd.clear();
    this.regionsToRemove.clear();
    this.selectedZoneRegions.clear();
    this.creatingEditingZone = false;
  };

  @action
  onZoneCreateCancel = () => {
    const { zones } = this.props.store;

    // This is a new region, so just remove it from the parent and
    // let it destroy any children
    if (!this.selectedZone.id) {
      zones.removeZone(this.selectedZone);
    } else {
      // remove transient regions from Zone
      Array.from(this.regionsToAdd.values()).forEach(region => {
        this.selectedZone.removeRegion(region);
      });
      // add back any removals
      Array.from(this.regionsToRemove.values()).forEach(region => {
        this.selectedZone.addRegion(region);
      });
    }
    // clear the local set
    this.selectedZoneRegions.clear();
    this.creatingEditingZone = false;
    // clear regionsToAdd and regionsToRemove
    this.regionsToAdd.clear();
    this.regionsToRemove.clear();
  };

  onMapMove = debounce(async (bounds: Bounds, e: any) => {
    const { zones } = this.props.store;
    // Event has ignore context, don't re-fetch data
    if (e.ignore) return;
    // Event is from the intial render, so fetch the current viewport
    // but don't break the bounds
    if (e.initialMove) {
      await zones.fetchRegionsInBounds([
        bounds.sw.lat,
        bounds.sw.lng,
        bounds.ne.lat,
        bounds.ne.lng,
      ]);
      return;
    }
    // Event is
    this.boundsBroken = true;
    await zones.fetchRegionsInBounds([
      bounds.sw.lat,
      bounds.sw.lng,
      bounds.ne.lat,
      bounds.ne.lng,
    ]);
  }, 500);

  onZoneSearch = (val: string) => {
    this.dirty = true;
    this.searchQuery = val;
  };

  removeTemporaryRegion = (region: RegionType | RegionWithGeometryType) => {
    let id;
    if (region.wmRegionId) {
      // $FlowFixMe
      id = region.wmRegionId.toString();
    } else {
      id = region.id.toString();
    }
    this.selectedZoneRegions.delete(id);
    // $FlowFixMe
    this.selectedZone.removeRegion(region);
    this.regionsToAdd.delete(id);
    // $FlowFixMe
    this.regionsToRemove.set(id, region);
  };

  addNewRegionfromCoreRegion = (region: RegionWithGeometryType) => {
    const id = region.id.toString();
    const regionModel = Region.create({
      id,
      wmRegionId: region.id,
      name: region.name,
    });
    this.selectedZone.addRegion(regionModel);
    this.regionsToAdd.set(id, regionModel);
  };

  toggleRegion = (region: RegionType | RegionWithGeometryType) => {
    if (this.creatingEditingZone) {
      // get region ID
      let id;
      if (region.wmRegionId) {
        // $FlowFixMe
        id = region.wmRegionId.toString();
      } else {
        id = region.id.toString();
      }

      if (this.selectedZoneRegions.has(id)) {
        this.removeTemporaryRegion(region);
      } else {
        const zone = region.zone || null;
        // We are trying to add a region to zone, that already
        // has a Zone asscociated, so do nothing for now
        if (zone) {
          // TODO throw error or modal to remove?
          return;
        }
        // no existing zone, add it to this one
        // $FlowFixMe
        this.selectedZoneRegions.set(id, region);
        this.addNewRegionfromCoreRegion((region: any));
      }
    }
  };

  geoJsonLayers = () => {
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
              onClick={() => this.toggleRegion(region)}
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

    const availableRegions = zones.regionsWithoutZones.map(region => {
      const { geometry } = region;
      return (
        <GeoJson
          onClick={() => this.toggleRegion(region)}
          key={region.id.toString()}
          layerKey={region.id.toString()}
          geometry={geometry}
          fill="#fff"
          outline="#a6acbc"
          opacity={0.8}
          label={region.name.replace('Brands', '')}
        />
      );
    });

    return [...zoneRegions, availableRegions];
  };

  render() {
    const { zones } = this.props.store;
    return (
      <Container>
        <ActionContainer flex={[0.85]}>
          <CSSTransition
            in={this.creatingEditingZone}
            timeout={250}
            classNames="new-zone"
            unmountOnExit
          >
            <ZoneForm
              onCancel={this.onZoneCreateCancel}
              onSubmit={this.onZoneSave}
              onRemoveRegionFromZone={this.onRemoveRegionFromZone}
              selectedRegions={this.selectedZoneRegions}
              zone={this.selectedZone}
            />
          </CSSTransition>

          <CSSTransition
            in={!this.creatingEditingZone}
            timeout={250}
            classNames="zone-list"
            unmountOnExit
          >
            <ZoneListContent>
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
                  {zones.zones.length} Zones
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
            </ZoneListContent>
          </CSSTransition>
        </ActionContainer>
        <MapContainer flex={[2.15]}>
          <FullWidthMap fit={!this.boundsBroken} onMoveEnd={this.onMapMove}>
            {!this.loading && this.geoJsonLayers()}
          </FullWidthMap>
        </MapContainer>
      </Container>
    );
  }
}

export default inject('store')(observer(ZoneEditor));
