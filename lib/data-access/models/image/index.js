// @flow
import { types } from 'mobx-state-tree';

const Image = types.model('ImageModel', {
  id: types.identifier,
  smallUrl: types.maybe(types.string),
  mediumUrl: types.maybe(types.string),
  largeUrl: types.maybe(types.string),
});

export type ImageType = {
  id: string,
  smallUrl: string,
  largeUrl: string,
};

export default Image;
