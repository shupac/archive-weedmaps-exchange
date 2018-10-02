// @flow
import { types } from 'mobx-state-tree';

const Allocation = types.model('AllocationModel', {
  active: types.boolean,
  amount: types.maybeNull(types.number),
  currency: types.string,
  id: types.string,
  price: types.maybeNull(types.string),
});

export const Variant = types.model('VariantModel', {
  allocations: types.maybe(types.array(Allocation)),
  id: types.identifier,
  name: types.string,
  size: types.number,
  sku: types.string,
  unit: types.string,
});

export type VariantType = {
  id: string,
  name: string,
  size: number,
  unit: string,
  price: number,
  amount: number,
  inStock: boolean,
  hasQuantityAlert?: boolean,
};

export default Variant;
