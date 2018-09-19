// @flow
import { types } from 'mobx-state-tree';

const Allocation = types.model('AllocationModel', {
  sellerId: types.string,
  price: types.maybeNull(types.string),
  currency: types.string,
  amount: types.maybeNull(types.number),
  active: types.boolean,
  id: types.string,
  zone: types.null,
  variant: types.null,
});

export const Variant = types.model('VariantModel', {
  unit: types.string,
  sku: types.string,
  size: types.number,
  sellerId: types.maybeNull(types.string),
  name: types.string,
  description: types.maybeNull(types.string),
  defaultPrice: types.maybeNull(types.string),
  defaultCurrency: types.maybeNull(types.string),
  id: types.identifier,
  product: types.maybeNull(types.null),
  allocations: types.array(Allocation),
});

export default Variant;
