// @flow
import { type CategoryStoreType } from 'lib/data-access/stores/categories';
import { type UIStoreType } from 'lib/data-access/stores/ui';
import { type ProductStoreType } from 'lib/data-access/stores/products';

export type Store = {
  categoryStore: CategoryStoreType,
  uiStore: UIStoreType,
  productsStore: ProductStoreType,
};
