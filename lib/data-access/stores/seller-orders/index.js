// @flow
import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import queryString from 'query-string';
import PurchaseOrder, {
  PurchaseOrderFilterItem,
  type PurchaseOrderMetaType,
  type PurchaseOrderType,
} from 'models/purchase-order';
import logger from 'lib/common/logger';

const SellerOrders = types
  .model('SellerOrders', {
    orderData: types.maybe(PurchaseOrder),
    ordersList: types.maybe(types.array(PurchaseOrder)),
    ordersLoading: false,
    orderLoading: false,
    ordersLocations: types.maybe(types.array(PurchaseOrderFilterItem)),
    ordersBrands: types.array(PurchaseOrderFilterItem),
    ordersZones: types.array(PurchaseOrderFilterItem),
    cancelOrderId: types.maybeNull(types.string),
  })
  .volatile(() => ({
    ordersListMeta: {},
    fetchOrdersQuery: {},
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
      self.setOrderLoading(true);

      try {
        const { data } = await getEnv(self).client.fetch(
          `/seller/orders/${orderId}`,
        );

        self.setOrderData(data);
      } catch (e) {
        logger.error(e);
      } finally {
        self.setOrderLoading(false);
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
        logger.error(e);
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
        self.setFetchOrdersQuery(query);
      } catch (e) {
        logger.error(e);
      } finally {
        self.setOrdersLoading(false);
      }
    },
    getOrderById(orderId) {
      if (self.orderData && self.orderData.id === orderId)
        return self.orderData;
      if (self.ordersList)
        return self.ordersList.find(({ id }) => id === orderId);
      return null;
    },
    async cancelOrder(orderId) {
      self.setCancelOrderId(orderId);

      if (orderId) {
        await self.fetchOrder(orderId);
        if (self.ordersList) self.refreshOrderInList(self.orderData);
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

        if (self.ordersList) {
          const listOrder = self.ordersList.find(({ id }) => id === orderId);
          listOrder.setStatus(data.status);
        }
        self.orderData.setStatus(data.status);

        return true;
      } catch (e) {
        logger.error(e);
        self.fetchOrder(orderId);
        self.fetchPurchaseOrders(self.fetchOrdersQuery);
        return false;
      }
    },
    refreshOrderInList(newOrder) {
      const order = self.ordersList.find(({ id }) => id === newOrder.id);
      if (order) order.setStatus(newOrder.status);
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
    setOrderLoading(loading) {
      self.orderLoading = loading;
    },
    setPurchaseOrders(orders) {
      self.ordersList = orders;
    },
    setPurchaseOrdersMeta(meta) {
      self.ordersListMeta = meta;
    },
    setCancelOrderId(orderId) {
      self.cancelOrderId = orderId;
    },
    setFetchOrdersQuery(query) {
      self.fetchOrdersQuery = query;
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
  cancelOrderId: string,
  cancelOrder: (?string) => void,
  refreshOrderInList: PurchaseOrderType => void,
};

export default SellerOrders;
