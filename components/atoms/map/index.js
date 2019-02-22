// @flow
import * as React from 'react'; // React, { Component, Fragment, createRef, Children } from 'react';
import config from 'config';
import {
  getBoundingBox,
  INITIAL_DEFAULT_MAP_ZOOM_LEVEL,
  MAX_ZOOM,
  DEFAULT_CENTER,
  type Point,
  type Bounds,
} from 'lib/geo';
import GeoJson from './geo-json';
import MapContext from './context';

type Props = {
  className?: string,
  children?: React.ChildrenArray<React.Element<typeof GeoJson>>,
  fit: boolean,
  center: Point,
  onMoveEnd?: (bounds: Bounds, event: any) => void,
};

type State = {
  map: any,
};

export default class Map extends React.Component<Props, State> {
  // $FlowFixMe createRef does exist stupid flow
  mapRef: { current: null | HTMLDivElement } = React.createRef();
  map: any;
  state = { map: null };

  componentDidMount() {
    this.setupMap();
  }

  componentWillUnmount() {
    this.map.off('moveend', this.onMoveEnd);
  }

  componentDidUpdate() {
    const currentChildrenCount = React.Children.count(this.props.children);
    const hasChildren = currentChildrenCount > 0;

    if (hasChildren && this.props.fit) {
      this.fitMap();
    }
  }

  onMoveEnd = (e: any) => {
    if (this.props.onMoveEnd) {
      const mapboxBounds = this.map.getBounds();
      if (this.props.onMoveEnd) {
        this.props.onMoveEnd(
          {
            ne: {
              lat: mapboxBounds._ne.lat,
              lng: mapboxBounds._ne.lng,
            },
            sw: {
              lat: mapboxBounds._sw.lat,
              lng: mapboxBounds._sw.lng,
            },
          },
          e,
        );
      }
    }
  };

  setupMap = () => {
    const { fit, center } = this.props;
    const mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = config.mapboxAccessToken;

    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style:
        'mapbox://styles/ghostgroup/cjq8knzhydg062roc4ci7rsng?optimize=true',
      zoom: INITIAL_DEFAULT_MAP_ZOOM_LEVEL,
      center: center || DEFAULT_CENTER,
      maxZoom: MAX_ZOOM,
      doubleClickZoom: false,
    });

    // Setup handlers
    this.map.on('moveend', this.onMoveEnd);
    // Fire initial move
    this.onMoveEnd({ initialMove: true });

    if (fit) {
      this.fitMap();
    }

    this.setState({ map: this.map });
  };

  fitMap = () => {
    const { children } = this.props;
    if (!children) return;
    const geometries = [];

    React.Children.forEach(children, child => {
      if (child.props.geometry) {
        geometries.push(child.props.geometry);
      }
    });

    if (!geometries.length) return;
    const bounds = getBoundingBox(geometries);
    this.map.fitBounds(
      bounds,
      {
        linear: true,
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
      },
      { ignore: true },
    );
  };

  render() {
    // allow overriding of styles via styled-components
    const { className, children } = this.props;

    return (
      <>
        <div ref={this.mapRef} className={className} />
        <MapContext.Provider value={this.state.map} data-test-id="map-provider">
          {children}
        </MapContext.Provider>
      </>
    );
  }
}
