// @flow
import { getEnv, types } from 'mobx-state-tree';
import queryString from 'query-string';
import PurchaseOrder, {
  PurchaseOrders,
  type PurchaseOrderType,
} from 'models/purchase-order';

const BuyerOrders = types
  .model('BuyerOrders', {
    orderData: types.maybe(PurchaseOrder),
    ordersList: PurchaseOrders,
    orderLoading: false,
  })
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
      const qs = queryString.stringify(query);

      try {
        const { data: ordersData } = await getEnv(self).client.fetch(
          `buyer/purchase_orders/?${qs}`,
        );
        self.setPurchaseOrders(ordersData);
      } catch (e) {
        console.error(e);
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
  }));

export type BuyerOrdersType = {
  fetchOrder: string => void,
  orderData: PurchaseOrderType,
  buyerOrders: PurchaseOrderType[],
  fetchPurchaseOrders: string => void,
};

export default BuyerOrders;
