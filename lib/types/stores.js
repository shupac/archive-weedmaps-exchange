// @flow
import { type CategoryStoreType } from 'lib/data-access/stores/categories';
import { type CatalogSearchStoreType } from 'lib/data-access/stores/catalog-search';

export type Store = {
  categoryStore: CategoryStoreType,
  catalogSearchStore: CatalogSearchStoreType,
};
