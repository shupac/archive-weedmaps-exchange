// @flow
import { types } from 'mobx-state-tree';
import Allocation, { type AllocationType } from 'models/allocation';

export const Variant = types.model('VariantModel', {
  allocations: types.maybe(types.array(Allocation)),
  id: types.identifier,
  name: types.string,
  size: types.number,
  sku: types.string,
  unit: types.string,
});

export type VariantType = {
  allocations: AllocationType[],
  id: string,
  name: string,
  size: number,
  sku: string,
  unit: string,
  isNew?: boolean,
  price: number,
  amount: number,
  inStock?: boolean,
  hasQuantityAlert?: boolean,
};

export default Variant;
