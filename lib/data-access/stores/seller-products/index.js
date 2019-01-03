// @flow
import { types, getEnv } from 'mobx-state-tree';
import queryString from 'query-string';
import pick from 'lodash.pick';
import SellerProduct, { type SellerProductType } from 'models/seller-product';
import { removeUndefinedProperties } from 'lib/common/universal-helpers';

const SellerProducts = types
  .model('SellerProducts', {
    fetchingProducts: false,
    fetchingProductDetails: false,
    sellerProducts: types.array(SellerProduct),
    sellerProductsTotalItems: types.maybe(types.number),
    sellerProductDetails: types.maybe(SellerProduct),
  })
  .actions(self => ({
    async fetchProducts(params) {
      const { active, categories } = params;

      const filters = removeUndefinedProperties({
        active: active === undefined ? undefined : active === 'published',
        category_ids: categories && categories.split('/'),
      });

      const filtersStringified = Object.keys(filters).reduce(
        (acc, key) => ({
          ...acc,
          [`filter[${key}]`]: filters[key],
        }),
        {},
      );

      const stringifiedQuery = queryString.stringify(
        {
          ...pick(params, ['query', 'sort']),
          ...filtersStringified,
        },
        {
          arrayFormat: 'bracket',
        },
      );

      self.setFetchingProducts(true);

      try {
        const page = `&page[number]=${params.page}&page[size]=${
          params.pageSize
        }`;

        const { data, meta } = await getEnv(self).client.fetch(
          `/seller/products?${stringifiedQuery}${page}`,
        );

        self.setSellerProducts(data);
        self.setSearchProductsTotalItems(meta.totalEntries);
      } catch (e) {
        console.log(e);
      } finally {
        self.setFetchingProducts(false);
      }
    },
    async fetchProductDetails(productId) {
      self.setFetchingProductDetails(true);

      try {
        const { data: productData } = await getEnv(self).client.fetch(
          `/seller/products/${productId}`,
        );

        self.setSellerProduct(productData);
      } catch (e) {
        console.log(e);
      } finally {
        self.setFetchingProductDetails(false);
      }
    },
    async updateSellerProduct(product) {
      const payload = {
        data: {
          attributes: {
            active: product.active,
          },
        },
      };

      try {
        const { data: productData } = await getEnv(self).client.patch(
          `/seller/products/${product.id}`,
          payload,
        );

        self.setSellerProduct(productData);
        self.setSellerProducts(
          self.sellerProducts.map(p => {
            if (p.id === product.id) return productData;
            return p;
          }),
        );
      } catch (e) {
        console.log(e);
      }
    },
    setFetchingProducts(fetching) {
      self.fetchingProducts = fetching;
    },
    setFetchingProductDetails(fetching) {
      self.fetchingProductDetails = fetching;
    },
    setSellerProducts(sellerProducts) {
      self.sellerProducts = sellerProducts;
    },
    setSearchProductsTotalItems(total) {
      self.sellerProductsTotalItems = total;
    },
    setSellerProduct(sellerProduct) {
      self.sellerProductDetails = sellerProduct;
    },
  }));

export type SellerProductsType = {
  sellerProducts: SellerProductType[],
  sellerProductDetails: SellerProduct,
  fetchingProducts: boolean,
  fetchingProductDetails: boolean,
  sellerProductsTotalItems: number,
  fetchProducts: mixed => void,
  fetchProductDetails: string => void,
  updateSellerProduct: SellerProductType => void,
};

export default SellerProducts;
