// @flow
import React, { Component } from 'react';
import uniqueKey from 'lib/common/unique-key';
import MapContext from './context';
import { type Geometry } from './utils';

type Props = {
  geometry: Geometry,
  fill: string,
  opacity: number,
  label: string,
  onClick?: () => void,
};

export default class GeoJson extends Component<Props> {
  static contextType = MapContext;
  /**
   * The layerKey keeps track of the layer being added to the map.
   * By default we will auto-generate one. This is important as it scopes
   * event handlers to the particular layer
   */
  layerKey: string = uniqueKey();
  disposeClickHandler: () => void;
  disposeLoadHandler: () => void;

  componentDidUpdate(prevProps: Props) {
    const map = this.context;
    const { fill, opacity } = this.props;

    if (prevProps.fill !== fill) {
      map.setPaintProperty(this.layerKey, 'fill-color', fill);
      map.setPaintProperty(this.layerKey, 'fill-outline-color', fill);
    }

    if (prevProps.opacity !== opacity) {
      map.setPaintProperty(this.layerKey, 'fill-opacity', opacity);
    }

    if (!this.disposeClickHandler) {
      this.disposeClickHandler = this.addClickHandler();
    }

    if (!this.disposeLoadHandler) {
      this.disposeLoadHandler = this.addLoadHandler();
    }
  }

  componentWillUnmount() {
    this.disposeClickHandler();
    this.disposeLoadHandler();
  }

  onLayerClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  addLoadHandler() {
    const map = this.context;
    map.on('load', this.addGeoJsonLayer);
    return () => {
      map.off('load', this.addGeoJsonLayer);
    };
  }

  addClickHandler() {
    const map = this.context;
    map.on('click', this.layerKey, this.onLayerClick);
    return () => {
      map.off('click', this.layerKey, this.onLayerClick);
    };
  }

  addGeoJsonLayer = () => {
    const map = this.context;
    const { geometry, fill, opacity, label } = this.props;

    map.addSource(`${this.layerKey}-source`, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry,
        properties: {
          title: label,
        },
      },
    });

    map.addLayer({
      id: this.layerKey,
      type: 'fill',
      source: `${this.layerKey}-source`,
      paint: {
        'fill-outline-color': fill,
        'fill-color': fill,
        'fill-opacity': opacity,
      },
    });

    map.addLayer({
      id: `${this.layerKey}-symbols`,
      type: 'symbol',
      source: `${this.layerKey}-source`,
      layout: {
        'symbol-placement': 'point',
        'text-field': '{title}',
        'text-size': 16,
      },
    });
  };

  render() {
    return null;
  }
}
