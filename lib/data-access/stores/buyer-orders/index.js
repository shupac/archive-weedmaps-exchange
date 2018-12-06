// @flow
import { getEnv, types } from 'mobx-state-tree';
import get from 'lodash/get';
import queryString from 'query-string';
import uniqby from 'lodash.uniqby';
import PurchaseOrder, {
  PurchaseOrders,
  type PurchaseOrderType,
  type PurchaseOrderMetaType,
} from 'models/purchase-order';

const BuyerOrders = types
  .model('BuyerOrders', {
    orderData: types.maybe(PurchaseOrder),
    ordersList: PurchaseOrders,
    ordersListCount: 0,
    orderLoading: false,
  })
  .volatile(() => ({
    ordersListMeta: {},
  }))
  .views(self => ({
    get POSellers() {
      const sellers = get(self, 'ordersList', []);

      const allSellers = sellers.map(({ sellerData }) => ({
        text: sellerData.sellerName,
        value: sellerData.brandId,
      }));

      return uniqby(allSellers, 'text');
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
        console.error(e);
      } finally {
        self.setOrderLoading(false);
      }
    },
    async fetchPurchaseOrders(query) {
      const stringifiedQuery = queryString.stringify(query, {
        arrayFormat: 'bracket',
      });

      try {
        const { data: ordersData, meta } = await getEnv(self).client.fetch(
          `/buyer/purchase_orders/?${stringifiedQuery}`,
        );

        self.setPurchaseOrders(ordersData);
        self.setPurchaseOrdersMeta(meta);
      } catch (e) {
        console.error(e);
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
        return true;
      } catch (e) {
        console.error(e);
        self.fetchOrder(orderId);
        return false;
      }
    },
    setOrderData(orderData) {
      self.orderData = orderData;
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
  }));

export type BuyerOrdersType = {
  fetchOrder: string => void,
  orderData: PurchaseOrderType,
  buyerOrders: PurchaseOrderType[],
  fetchPurchaseOrders: any => void,
  ordersListMeta: PurchaseOrderMetaType,
  updateOrderStatus: (string, string, ?string) => boolean,
};

export default BuyerOrders;
