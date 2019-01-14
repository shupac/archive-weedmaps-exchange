// @flow
import { type UIStoreType } from 'lib/data-access/stores/ui';
import { type BuyerSettingsType } from 'lib/data-access/stores/buyer-settings';
import { type BuyerProductsType } from 'lib/data-access/stores/buyer-products';
import { type AddressSuggestionsType } from 'lib/data-access/stores/address-suggestions';
import { type BuyerCartType } from 'lib/data-access/stores/buyer-cart';
import { type BuyerOrdersType } from 'lib/data-access/stores/buyer-orders';
import { type AuthStoreType } from 'lib/data-access/stores/auth';
import { type SellerProductsType } from 'lib/data-access/stores/seller-products';
import { type SellerSettingsType } from 'lib/data-access/stores/seller-settings';
import { type SellerOrdersType } from 'lib/data-access/stores/seller-orders';
import { type ZonesType } from 'lib/data-access/stores/zones';

export type StoreType = {
  uiStore: UIStoreType,
  buyerSettings: BuyerSettingsType,
  buyerProducts: BuyerProductsType,
  addressSuggestions: AddressSuggestionsType,
  buyerCart: BuyerCartType,
  buyerOrders: BuyerOrdersType,
  authStore: AuthStoreType,
  sellerProducts: SellerProductsType,
  sellerSettings: SellerSettingsType,
  sellerOrders: SellerOrdersType,
  zones: ZonesType,
};
