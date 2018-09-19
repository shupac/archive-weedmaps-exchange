// @flow
import { types } from 'mobx-state-tree';

const Image = types.model('ImageModel', {
  id: types.identifier,
  hashCode: types.string,
  smallUrl: types.string,
  mediumUrl: types.string,
  largeUrl: types.string,
});

export type ImageType = {
  id: string | null,
  hashCode: string | null,
  smallUrl: string | null,
  mediumUrl: string | null,
  largeUrl: string | null,
};

export default Image;
