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
};

export default BuyerOrders;
