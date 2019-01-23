// @flow
import { types, getEnv } from 'mobx-state-tree';
import queryString from 'query-string';
import pick from 'lodash.pick';
import omit from 'lodash/omit';
import SellerProduct, { type SellerProductType } from 'models/seller-product';
import ProductFormError, {
  type ProductFormErrorType,
} from 'models/product-form-error';
import { removeUndefinedProperties } from 'lib/common/universal-helpers';

const SellerProducts = types
  .model('SellerProducts', {
    fetchingProducts: false,
    fetchingProductDetails: false,
    sellerProducts: types.array(SellerProduct),
    sellerProductsTotalItems: types.maybe(types.number),
    sellerProductDetails: types.maybe(SellerProduct),
    productFormErrors: types.array(ProductFormError),
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
    async updateSellerProduct(sellerProduct) {
      const removeNewId = item => {
        if (item.isNew)
          return {
            ...omit(item, ['id', 'isNew']),
            ref_id: item.id,
          };
        return {
          ...item,
          ref_id: item.id,
        };
      };

      const { variants } = sellerProduct.product;

      const payload = {
        data: {
          attributes: {
            active: sellerProduct.active,
            variants: variants.map(variant => ({
              ...removeNewId(variant),
              allocations: variant.allocations.map(allocation => ({
                ...removeNewId(allocation),
                zone_id: allocation.zone && allocation.zone.id,
              })),
            })),
          },
        },
      };

      try {
        const { data: productData } = await getEnv(self).client.patch(
          `/seller/products/${sellerProduct.id}`,
          payload,
        );

        self.setSellerProduct(productData);
        self.setSellerProducts(
          self.sellerProducts.map(p => {
            if (p.id === sellerProduct.id) return productData;
            return p;
          }),
        );
        return true;
      } catch (e) {
        if (e.response) {
          e.response.json().then(({ errors }) => {
            self.setDetailFormErrors(errors);
          });
        }
        return false;
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
    setDetailFormErrors(errors) {
      self.productFormErrors = errors;
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
  updateSellerProduct: SellerProductType => boolean,
  productFormErrors: ProductFormErrorType[],
};

export default SellerProducts;
