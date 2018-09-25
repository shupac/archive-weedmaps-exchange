// @flow
import { types } from 'mobx-state-tree';

const Allocation = types.model('AllocationModel', {
  active: types.boolean,
  amount: types.maybeNull(types.number),
  currency: types.string,
  id: types.string,
  price: types.maybeNull(types.string),
  sellerId: types.string,
  // zone: types.null,
  // variant: types.null,
});

export const Variant = types.model('VariantModel', {
  allocations: types.maybe(types.array(Allocation)),
  id: types.identifier,
  name: types.string,
  size: types.number,
  sku: types.string,
  unit: types.string,
  // sellerId: types.maybeNull(types.string),
  // description: types.maybeNull(types.string),
  // defaultPrice: types.maybeNull(types.string),
  // defaultCurrency: types.maybeNull(types.string),
  // product: types.maybeNull(types.null),
});

export default Variant;
