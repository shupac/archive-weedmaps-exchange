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
    async fetchOrder(orderId) {
      self.setOrdersLoading(true);

      try {
        const { data } = await getEnv(self).client.fetch(
          `/seller/orders/${orderId}`,
        );

        self.setOrderData(data);
      } catch (e) {
        console.error(e);
      } finally {
        self.setOrdersLoading(false);
      }
    },
    async fetchOrders() {
      try {
        const { data } = await getEnv(self).client.fetch(`/seller/orders`);

        self.setPurchaseOrders(data);
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
    async updateOrderStatus(orderId, status, statusReason) {
      const payload = {
        data: {
          attributes: {
            status,
            status_reason: statusReason,
          },
        },
      };

      try {
        const { data } = await getEnv(self).client.put(
          `seller/orders/${orderId}`,
          payload,
        );

        self.setOrderData(data);
        const order = self.ordersList.find(({ id }) => id === orderId);
        if (order) order.setStatus(data.status);

        return true;
      } catch (e) {
        console.error(e);
        self.fetchOrder(orderId);
        self.fetchPurchaseOrders();
        return false;
      }
    },
    setOrderData(orderData) {
      self.orderData = orderData;
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
  fetchOrder: string => void,
  updateOrderStatus: (string, string, ?string) => boolean,
  ordersListMeta: PurchaseOrderMetaType,
  orderData: PurchaseOrderType,
  ordersList: PurchaseOrderType[],
  ordersLoading: boolean,
  fetchPurchaseOrders: any => void,
  fetchPOBuyers: () => void,
};

export default SellerOrders;
