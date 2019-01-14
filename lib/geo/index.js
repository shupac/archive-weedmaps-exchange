// @flow
import geojsonExtent from '@mapbox/geojson-extent';

export type Point = [number, number];
export type Geometry = {
  type: string,
  coordinates: Point[][] | Point[][][],
};

export type Bounds = {
  ne: {
    lat: number,
    lng: number,
  },
  sw: {
    lat: number,
    lng: number,
  },
};

export type WSENBounds = [number, number, number, number];
export const INITIAL_DEFAULT_MAP_ZOOM_LEVEL = 10;
export const MAX_ZOOM = 18;
export const DEFAULT_CENTER = [-118.3583923, 34.0225723];

/**
 * Get a bounding box from a set of Geometries
 * @param data
 */
export function getBoundingBox(geometries: Geometry[]): WSENBounds {
  return geojsonExtent({ type: 'GeometryCollection', geometries });
}
