// @flow
import * as React from 'react'; // React, { Component, Fragment, createRef, Children } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import config from 'config';
import GeoJson from './geo-json';
import MapContext from './context';
import {
  getBoundingBox,
  INITIAL_DEFAULT_MAP_ZOOM_LEVEL,
  MAX_ZOOM,
  DEFAULT_CENTER,
  type Point,
  type Bounds,
} from './utils';

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

mapboxgl.accessToken = config.mapboxAccessToken;

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

    if (fit) {
      this.fitMap();
    }

    this.setState({ map: this.map });
  };

  fitMap = () => {
    const { children } = this.props;
    const geometries = [];
    if (children) {
      React.Children.forEach(children, child => {
        geometries.push(child.props.geometry);
      });
      const bounds = getBoundingBox(geometries);
      this.map.fitBounds(
        [[bounds.sw.lng, bounds.sw.lat], [bounds.ne.lng, bounds.ne.lat]],
        {
          linear: true,
          padding: { top: 10, bottom: 10, left: 10, right: 10 },
        },
      );
    }
  };

  render() {
    // allow overriding of styles via styled-components
    const { className, children } = this.props;

    return (
      <>
        <Head>
          <link
            data-test-id="map-style-tag"
            key="mapbox-styles"
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <div ref={this.mapRef} className={className} />
        <MapContext.Provider value={this.state.map} data-test-id="map-provider">
          {children}
        </MapContext.Provider>
      </>
    );
  }
}
