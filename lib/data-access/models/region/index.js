// @flow
import { types } from 'mobx-state-tree';

const Region = types.model('RegionModel', {
  id: types.identifier,
  name: types.string,
});

export default Region;

export type RegionType = {
  id: string,
  name: string,
};
