// @flow
import { types } from 'mobx-state-tree';

const Image = types.model('ImageModel', {
  id: types.identifier,
  smallUrl: types.string,
  mediumUrl: types.string,
  largeUrl: types.string,
});

export type ImageType = {
  id: string | null,
  smallUrl: string | null,
  mediumUrl: string | null,
  largeUrl: string | null,
};

export default Image;
