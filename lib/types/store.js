// @flow
import { type UIStoreType } from 'lib/data-access/stores/ui';
import { type BuyerSettingsType } from 'lib/data-access/stores/buyerSettings';
import { type BuyerProductsType } from 'lib/data-access/stores/buyerProducts';

export type StoreType = {
  uiStore: UIStoreType,
  buyerSettings: BuyerSettingsType,
  buyerProducts: BuyerProductsType,
};
