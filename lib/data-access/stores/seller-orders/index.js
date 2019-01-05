// @flow
import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import queryString from 'query-string';
import PurchaseOrder, {
  PurchaseOrderFilterItem,
  type PurchaseOrderMetaType,
  type PurchaseOrderType,
} from 'models/purchase-order';

const SellerOrders = types
  .model('SellerOrders', {
    orderData: types.maybe(PurchaseOrder),
    ordersList: types.maybe(types.array(PurchaseOrder)),
    ordersLoading: false,
    ordersLocations: types.maybe(types.array(PurchaseOrderFilterItem)),
    ordersBrands: types.array(PurchaseOrderFilterItem),
    ordersZones: types.array(PurchaseOrderFilterItem),
  })
  .volatile(() => ({
    ordersListMeta: {},
  }))
  .views(self => ({
    get sellerBrandsFilterOptions() {
      const brands = get(self, 'ordersBrands', []);
      return brands.map(({ id, label }) => ({
        value: id,
        text: label,
      }));
    },
    get sellerLocationsFilterOptions() {
      const locations = get(self, 'ordersLocations', []);
      return locations.map(({ id, label }) => ({
        value: id,
        text: label,
      }));
    },
    get sellerZonesFilterOptions() {
      const zones = get(self, 'ordersZones', []);
      return zones.map(({ id, label }) => ({
        value: id,
        text: label,
      }));
    },
  }))
  .actions(self => ({
    async fetchOrders() {
      try {
        const { data } = await getEnv(self).client.fetch(`/seller/orders`);

        self.setDepartments(data);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchPOBuyers() {
      try {
        const { data: ordersBrands } = await getEnv(self).client.fetch(
          `/seller/orders/buyers`,
        );
        const { data: ordersLocations } = await getEnv(self).client.fetch(
          `/seller/orders/locations`,
        );
        const { data: ordersZones } = await getEnv(self).client.fetch(
          `/seller/orders/zones`,
        );

        self.setOrdersBuyers(ordersBrands);
        self.setOrdersZones(ordersZones);
        self.setOrdersLocations(ordersLocations);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchPurchaseOrders(query) {
      const stringifiedQuery = queryString.stringify(query, {
        arrayFormat: 'bracket',
      });

      self.setOrdersLoading(true);

      try {
        const { data: ordersData, meta } = await getEnv(self).client.fetch(
          `/seller/orders/?${stringifiedQuery}`,
        );

        self.setPurchaseOrders(ordersData);
        self.setPurchaseOrdersMeta(meta);
      } catch (e) {
        console.error(e);
      } finally {
        self.setOrdersLoading(false);
      }
    },
    setDepartments(ordersData) {
      self.ordersList = ordersData;
    },
    setOrdersBuyers(ordersBrands) {
      self.ordersBrands = ordersBrands;
    },
    setOrdersLocations(ordersLocations) {
      self.ordersLocations = ordersLocations;
    },
    setOrdersZones(ordersZones) {
      self.ordersZones = ordersZones;
    },
    setOrdersLoading(loading) {
      self.ordersLoading = loading;
    },
    setPurchaseOrders(orders) {
      self.ordersList = orders;
    },
    setPurchaseOrdersMeta(meta) {
      self.ordersListMeta = meta;
    },
  }));

export type SellerOrdersType = {
  fetchOrders: () => void,
  ordersListMeta: PurchaseOrderMetaType,
  orderData: PurchaseOrderType,
  ordersList: PurchaseOrderType[],
  ordersLoading: boolean,
  fetchPurchaseOrders: any => void,
  fetchPOBuyers: () => void,
};

export default SellerOrders;
