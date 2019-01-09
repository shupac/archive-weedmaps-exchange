// @flow
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
export const INITIAL_DEFAULT_MAP_ZOOM_LEVEL = 10;
export const MAX_ZOOM = 18;
export const DEFAULT_CENTER = [-118.3583923, 34.0225723];

/**
 * Get a bounding box from a set of Geometries
 * Modified from this - https://gist.github.com/JamesChevalier/b03b7423bf330f959076
 * @param data
 */
export function getBoundingBox(geometries: Geometry[]): Bounds {
  const bounds = {};

  // Loop through each "feature"
  for (let i = 0; i < geometries.length; i++) {
    let { coordinates } = geometries[i];

    if (coordinates.length === 1) {
      coordinates = ((coordinates: any): Point[][]);
      // It's only a single Polygon
      // For each individual coordinate in this feature's coordinates...
      for (let j = 0; j < coordinates[0].length; j++) {
        const longitude = coordinates[0][j][0];
        const latitude = coordinates[0][j][1];

        // Update the bounds recursively by comparing the current xMin/xMax and yMin/yMax with the current coordinate
        bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
        bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
        bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
        bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
      }
    } else {
      coordinates = ((coordinates: any): Point[][][]);
      // It's a MultiPolygon
      // Loop through each coordinate set
      for (let j = 0; j < coordinates.length; j++) {
        // For each individual coordinate in this coordinate set...
        for (let k = 0; k < coordinates[j][0].length; k++) {
          const longitude = coordinates[j][0][k][0];
          const latitude = coordinates[j][0][k][1];

          // Update the bounds recursively by comparing the current xMin/xMax and yMin/yMax with the current coordinate
          bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
          bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
          bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
          bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
        }
      }
    }
  }

  const convertedBounds = {
    ne: {
      lat: bounds.yMax,
      lng: bounds.xMax,
    },
    sw: {
      lat: bounds.yMin,
      lng: bounds.xMin,
    },
  };

  // Returns an object that contains the bounds of this GeoJSON data.
  // The keys describe a box formed by the northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
  return convertedBounds;
}
