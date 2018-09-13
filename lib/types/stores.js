// @flow
import { type CategoryStoreType } from 'lib/data-access/stores/categories';
import { type CatalogSearchStoreType } from 'lib/data-access/stores/catalog-search';
import { type UIStoreType } from 'lib/data-access/stores/ui';

export type Store = {
  categoryStore: CategoryStoreType,
  catalogSearchStore: CatalogSearchStoreType,
  uiStore: UIStoreType,
};
