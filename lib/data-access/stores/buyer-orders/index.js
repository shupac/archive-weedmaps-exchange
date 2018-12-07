// @flow
import { getEnv, types, getParent } from 'mobx-state-tree';
import get from 'lodash/get';
import queryString from 'query-string';
import uniqby from 'lodash.uniqby';
import PurchaseOrder, {
  type PurchaseOrderType,
  type PurchaseOrderMetaType,
} from 'models/purchase-order';

const BuyerOrders = types
  .model('BuyerOrders', {
    orderData: types.maybe(PurchaseOrder),
    ordersList: types.array(PurchaseOrder),
    ordersListCount: 0,
    orderLoading: false,
    cancelOrderId: types.maybeNull(types.string),
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

      self.setOrderLoading(true);

      try {
        const { data: ordersData, meta } = await getEnv(self).client.fetch(
          `/buyer/purchase_orders/?${stringifiedQuery}`,
        );

        self.setPurchaseOrders(ordersData);
        self.setPurchaseOrdersMeta(meta);
      } catch (e) {
        console.error(e);
      } finally {
        self.setOrderLoading(false);
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

        getParent(self).uiStore.openModal(null);

        // Wait until modal transitions out
        setTimeout(() => {
          self.setOrderData(data);
          const order = self.ordersList.find(({ id }) => id === data.id);
          if (order) order.setStatus(data.status);
        }, 300);
      } catch (e) {
        console.error(e);
        self.fetchOrder(orderId);
        self.fetchPurchaseOrders();
      }
    },
    cancelOrder(orderId) {
      const { openModal } = getParent(self).uiStore;
      self.setCancelOrderId(orderId);
      if (orderId) {
        openModal('cancelOrder');
        self.fetchOrder(orderId);
      } else openModal(null);
    },
    async reorder(orderId) {
      try {
        const { data } = await getEnv(self).client.post(
          `buyer/purchase_orders/${orderId}/reorder`,
        );

        return data;
      } catch (e) {
        console.error(e);
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
    setCancelOrderId(orderId) {
      self.cancelOrderId = orderId;
    },
  }));

export type BuyerOrdersType = {
  fetchOrder: string => void,
  orderData: PurchaseOrderType,
  orderLoading: boolean,
  ordersList: PurchaseOrderType[],
  fetchPurchaseOrders: any => void,
  ordersList: PurchaseOrder[],
  ordersListMeta: PurchaseOrderMetaType,
  updateOrderStatus: (string, string, ?string) => boolean,
  cancelOrder: (?string) => void,
  cancelOrderId: string,
  reorder: string => Promise<{ itemsAdded: number }>,
};

export default BuyerOrders;
