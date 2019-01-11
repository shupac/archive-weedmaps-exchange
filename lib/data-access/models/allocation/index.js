// @flow
import { types } from 'mobx-state-tree';
import Zone, { type ZoneType } from 'models/zone';

const Allocation = types.model('AllocationModel', {
  active: types.boolean,
  amount: types.maybeNull(types.number),
  currency: types.string,
  id: types.identifier,
  price: types.maybeNull(types.string),
  zone: types.maybe(Zone),
});

export type AllocationType = {
  active: boolean,
  amount: number,
  currency: string,
  id: string,
  price: string,
  zone: ZoneType,
};

export default Allocation;
