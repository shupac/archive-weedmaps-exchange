import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import BuyerProduct, { type ProductCardType } from '../../models/product';

export const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';

const ProductStore = types
  .model('ProductStore', {
    products: types.maybe(types.array(BuyerProduct)),
    productDetails: types.maybe(BuyerProduct),
  })
  .views(self => ({
    get productDetail() {
      return {
        name: get(self.productDetails, 'product.name', ''),
        id: get(self.productDetails, 'id', ''),
        description: get(self.productDetails, 'product.description', ''),
        minPrice: get(self.productDetails, 'minPrice', ''),
        maxPrice: get(self.productDetails, 'maxPrice', ''),
        brand: get(self.productDetails, 'brand.name', ''),
      };
    },
    get productPriceRange() {
      return {
        minPrice: 200,
        maxPrice: 400,
      };
    },
    get productCards() {
      if (self.products && self.products.length > 0) {
        return self.products.map(({ unit, product }) => ({
          id: product.id,
          name: product.name,
          priceUnit: unit,
          imageUrl: get(product, 'avatarImage.mediumUrl', ''),
          brand: get(product, 'brand.name', ''),
          ...self.productPriceRange,
          outOfStock: product.variants.every(
            item => item.allocations[0].amount < 1,
          ),
          category:
            (product.categories[0] && product.categories[0].name) ||
            (product.departments[0] && product.departments[0].name),
        }));
      }
      return null;
    },
    get productImages() {
      const galleryImages = get(self.product, 'product.galleryImages', []);
      return galleryImages.map(({ smallUrl, largeUrl, id }) => ({
        smallUrl,
        largeUrl,
        id,
      }));
    },
    get productVariants() {
      const variants = get(self.product, 'variants', []);
      return variants.map(({ unit, name, id, defaultPrice, size }) => ({
        unit,
        name,
        id,
        defaultPrice,
        size,
      }));
    },
  }))
  .actions(self => ({
    async getProductDetail(productId) {
      try {
        const productDetail = await getEnv(self).client.fetch(
          `buyer/regions/${regionId}/products/${productId}`,
        );
        self.setProductDetail(productDetail);
      } catch (e) {
        console.log(e);
      }
    },
    async searchProducts(query) {
      if (!query) {
        self.setProducts([]);
        return;
      }
      try {
        const trimmedQuery = query.trim();
        const results = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/products?query=${trimmedQuery}`,
        );

        self.setProducts(results);
      } catch (e) {
        console.log(e);
      }
    },
    setProducts(products) {
      self.products = products;
    },
    setProductDetail(singleProduct) {
      self.product = singleProduct;
    },
  }));

export type ProductStoreType = {
  getProductDetail: (productId: string) => void,
  searchProducts: (query: string) => void,
  productCards: Array<ProductCardType>,
};

export default ProductStore;
