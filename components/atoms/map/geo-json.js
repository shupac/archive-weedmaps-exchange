// @flow
import { Component } from 'react';
import uniqueKey from 'lib/common/unique-key';
import { type Geometry } from 'lib/geo';
import MapContext from './context';

type Props = {
  geometry: Geometry,
  fill: string,
  outline: string,
  opacity: number,
  label: string,
  layerKey?: string,
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
  drawn = false;

  componentDidMount() {
    // the map might not be available on first mount
    const map = this.context;
    if (map) {
      this.setupLayer(this.props);
    }
  }

  componentDidUpdate(prevProps: Props) {
    this.setupLayer(prevProps);
  }

  setupLayer(prevProps: Props) {
    const map = this.context;
    const { fill, opacity, outline, layerKey } = this.props;
    const key = layerKey || this.layerKey;

    if (prevProps.fill !== fill) {
      map.setPaintProperty(key, 'fill-color', fill);
    }

    if (prevProps.outline !== outline) {
      map.setPaintProperty(key, 'fill-outline-color', outline);
    }

    if (prevProps.opacity !== opacity) {
      map.setPaintProperty(key, 'fill-opacity', opacity);
    }

    if (!this.disposeClickHandler) {
      this.disposeClickHandler = this.addClickHandler();
    }

    if (map.loaded) {
      this.addGeoJsonLayer();
    } else if (!this.disposeLoadHandler) {
      this.disposeLoadHandler = this.addLoadHandler();
    }
  }

  componentWillUnmount() {
    if (this.disposeClickHandler) {
      this.disposeClickHandler();
    }

    if (this.disposeLoadHandler) {
      this.disposeLoadHandler();
    }

    this.cleanupLayers();
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
    const { layerKey } = this.props;
    const key = layerKey || this.layerKey;
    const map = this.context;
    map.on('click', key, this.onLayerClick);
    return () => {
      map.off('click', key, this.onLayerClick);
    };
  }

  cleanupLayers() {
    const { layerKey } = this.props;
    const key = layerKey || this.layerKey;
    const map = this.context;

    if (map) {
      map.removeLayer(key);
      map.removeLayer(`${key}-symbols`);
    }
  }

  addGeoJsonLayer = () => {
    const map = this.context;
    const { geometry, fill, opacity, label, outline, layerKey } = this.props;
    const key = layerKey || this.layerKey;
    if (this.drawn) return;

    if (!map.getSource(`${key}-source`)) {
      map.addSource(`${key}-source`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry,
          properties: {
            title: label,
          },
        },
      });
    }

    if (!map.getLayer(key)) {
      map.addLayer({
        id: key,
        type: 'fill',
        source: `${key}-source`,
        paint: {
          'fill-outline-color': outline,
          'fill-color': fill,
          'fill-opacity': opacity,
        },
      });
    }

    if (!map.getLayer(`${key}-symbols`)) {
      map.addLayer({
        id: `${key}-symbols`,
        type: 'symbol',
        source: `${key}-source`,
        layout: {
          'symbol-placement': 'point',
          'text-field': '{title}',
          'text-size': 16,
        },
      });
    }

    this.drawn = true;
  };

  render() {
    return null;
  }
}
