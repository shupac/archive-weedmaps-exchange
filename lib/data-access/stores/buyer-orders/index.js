// @flow
import { getEnv, types } from 'mobx-state-tree';
import get from 'lodash/get';
import queryString from 'query-string';
import PurchaseOrder, {
  PurchaseOrderFilterItem,
  type PurchaseOrderType,
  type PurchaseOrderMetaType,
} from 'models/purchase-order';
import logger from 'lib/common/logger';

const BuyerOrders = types
  .model('BuyerOrders', {
    orderData: types.maybe(PurchaseOrder),
    ordersList: types.array(PurchaseOrder),
    ordersLocations: types.array(PurchaseOrderFilterItem),
    ordersBrands: types.array(PurchaseOrderFilterItem),
    ordersListCount: 0,
    orderLoading: false,
    ordersLoading: false,
    cancelOrderId: types.maybeNull(types.string),
  })
  .volatile(() => ({
    ordersListMeta: {},
  }))
  .views(self => ({
    get brandsFilterOptions() {
      const brands = get(self, 'ordersBrands', []);
      return brands.map(({ id, label }) => ({
        value: id,
        text: label,
      }));
    },
    get locationsFilterOptions() {
      const locations = get(self, 'ordersLocations', []);
      return locations.map(({ id, label }) => ({
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
          `/buyer/purchase_orders/${orderId}`,
        );

        self.setOrderData(data);
      } catch (e) {
        logger.error(e);
      } finally {
        self.setOrderLoading(false);
      }
    },
    async fetchPurchaseOrders(query) {
      const stringifiedQuery = queryString.stringify(query, {
        arrayFormat: 'bracket',
      });

      self.setOrdersLoading(true);

      try {
        const { data: ordersData, meta } = await getEnv(self).client.fetch(
          `/buyer/purchase_orders/?${stringifiedQuery}`,
        );

        self.setPurchaseOrders(ordersData);
        self.setPurchaseOrdersMeta(meta);
      } catch (e) {
        logger.error(e);
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
          `buyer/purchase_orders/${orderId}`,
          payload,
        );

        self.setOrderData(data);
        const order = self.ordersList.find(({ id }) => id === orderId);
        if (order) order.setStatus(data.status);

        return true;
      } catch (e) {
        logger.error(e);
        self.fetchOrder(orderId);
        self.fetchPurchaseOrders();
        return false;
      }
    },
    cancelOrder(orderId) {
      self.setCancelOrderId(orderId);
      if (orderId) return self.fetchOrder(orderId);
      return null;
    },
    async reorder(orderId) {
      try {
        const { data } = await getEnv(self).client.post(
          `buyer/purchase_orders/${orderId}/reorder`,
        );

        return data;
      } catch (e) {
        logger.error(e);
        return false;
      }
    },
    async fetchPOSellers() {
      try {
        const { data: ordersLocations } = await getEnv(self).client.fetch(
          `/buyer/purchase_orders/locations`,
        );
        const { data: ordersBrands } = await getEnv(self).client.fetch(
          `/buyer/purchase_orders/brands`,
        );

        self.setOrdersLocations(ordersLocations);
        self.setOrdersBrands(ordersBrands);
      } catch (e) {
        logger.error(e);
      }
    },
    setOrderData(orderData) {
      self.orderData = orderData;
    },
    setOrderLoading(loading) {
      self.orderLoading = loading;
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
    setCancelOrderId(orderId) {
      self.cancelOrderId = orderId;
    },
    setOrdersLocations(locations) {
      self.ordersLocations = locations;
    },
    setOrdersBrands(brands) {
      self.ordersBrands = brands;
    },
  }));

export type BuyerOrdersType = {
  fetchOrder: string => void,
  orderData: PurchaseOrderType,
  orderLoading: boolean,
  ordersLoading: boolean,
  ordersList: PurchaseOrderType[],
  fetchPurchaseOrders: any => void,
  ordersList: PurchaseOrder[],
  ordersListMeta: PurchaseOrderMetaType,
  updateOrderStatus: (string, string, ?string) => boolean,
  cancelOrder: (?string) => void,
  fetchPOSellers: () => void,
  cancelOrderId: string,
  reorder: string => Promise<{ itemsAdded: number }>,
};

export default BuyerOrders;
