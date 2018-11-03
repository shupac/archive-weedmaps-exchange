// @flow
import { type UIStoreType } from 'lib/data-access/stores/ui';
import { type BuyerSettingsType } from 'lib/data-access/stores/buyer-settings';
import { type BuyerProductsType } from 'lib/data-access/stores/buyer-products';
import { type AddressSuggestionsType } from 'lib/data-access/stores/address-suggestions';
import { type BuyerCartType } from 'lib/data-access/stores/buyer-cart';
import { type AuthStoreType } from 'lib/data-access/stores/auth';

export type StoreType = {
  uiStore: UIStoreType,
  buyerSettings: BuyerSettingsType,
  buyerProducts: BuyerProductsType,
  addressSuggestions: AddressSuggestionsType,
  buyerCart: BuyerCartType,
  authStore: AuthStoreType,
};
