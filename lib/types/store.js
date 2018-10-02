// @flow
import { type UIStoreType } from 'lib/data-access/stores/ui';
import { type BuyerSettingsType } from 'lib/data-access/stores/buyer-settings';
import { type BuyerProductsType } from 'lib/data-access/stores/buyer-products';

export type StoreType = {
  uiStore: UIStoreType,
  buyerSettings: BuyerSettingsType,
  buyerProducts: BuyerProductsType,
};
