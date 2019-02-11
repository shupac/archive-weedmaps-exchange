// @flow
import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import BuyerProduct, {
  type ProductCardType,
  type ProductDetailsType,
} from 'models/buyer-product';
import Image, { type ImageType } from 'models/image';
import { type VariantType } from 'models/variant';
import { type CategoryType } from 'models/category';
import CategoryProducts, {
  CategoryProductsType,
} from 'models/category-products';
import { generateQuery } from 'lib/common/query-generator';
import logger from 'lib/common/logger';

const getProductCards = buyerProducts =>
  buyerProducts.map(({ priceRanges, product }) => {
    const category = get(product, 'category[0].name', false);
    const department = get(product, 'departments[0].name', false);
    return {
      id: product.id,
      name: product.name,
      imageUrl: get(product, 'avatarImage.mediumUrl', ''),
      brand: get(product, 'brand.name', ''),
      category: category || department,
      priceRanges: priceRanges.map(price => ({
        minPrice: get(price, 'minPrice'),
        maxPrice: get(price, 'maxPrice'),
        unit: get(price, 'unit'),
      })),
      outOfStock: product.variants.every(
        item => get(item, ['allocations', 0, 'amount'], 0) < 1,
      ),
    };
  });

const BuyerProducts = types
  .model('BuyerProducts', {
    categoryProductsData: types.array(CategoryProducts),
    categoryProductsLoading: false,
    productDetailsData: types.maybe(BuyerProduct),
    productDetailsSuccess: true,
    searchResultsData: types.array(BuyerProduct),
    searchResultsLoading: false,
    featuredProductPhoto: types.maybe(Image),
    searchResultsTotalItems: 0,
    featuredProductsData: types.array(BuyerProduct),
  })
  .views(self => ({
    get categoryProducts() {
      return self.categoryProductsData.map(({ id, name, buyerProducts }) => ({
        id,
        name,
        products: getProductCards(buyerProducts),
      }));
    },
    get featuredProducts() {
      return getProductCards(self.featuredProductsData);
    },
    get searchResults() {
      return getProductCards(self.searchResultsData);
    },
    get productDetails() {
      const galleryImages = get(
        self.productDetailsData,
        'product.galleryImages',
        [],
      ).map(({ smallUrl, largeUrl, id }) => ({
        id,
        smallUrl,
        largeUrl,
      }));

      return {
        id: get(self.productDetailsData, 'id', ''),
        name: get(self.productDetailsData, 'product.name', ''),
        description: get(self.productDetailsData, 'product.description', ''),
        brand: get(self.productDetailsData, 'product.brand.name', ''),
        priceRanges: get(self.productDetailsData, 'priceRanges', []),
        licenses: get(self.productDetailsData, 'product.brand.licenses', []),
        galleryImages,
      };
    },
    get productVariants() {
      return get(self.productDetailsData, 'product.variants', []).map(
        ({ unit, name, id, size, allocations }) => {
          const variantAmount = get(allocations, '[0].amount', null);
          return {
            id,
            name,
            size,
            unit,
            price: Number(get(allocations, '[0].price', null)),
            amount: variantAmount,
            inStock: variantAmount >= 1,
          };
        },
      );
    },
    get productBreadcrumb() {
      return get(self.productDetailsData, 'product.departments', []);
    },
  }))
  .actions(self => ({
    async getCategoryProducts() {
      self.setCategoryProductsLoading(true);

      try {
        const { data } = await getEnv(self).client.fetch(`/buyer/departments`);

        self.setCategoryProductsData(data);
      } catch (e) {
        logger.error(e);
      } finally {
        self.setCategoryProductsLoading(false);
      }
    },
    async searchCatalog(query) {
      const queryString = generateQuery(query);

      if (!queryString) {
        self.setSearchResultsData([]);
        return;
      }

      self.setSearchResultsLoading(true);

      try {
        // eslint-disable-next-line
        const page = `&page[number]=${query.page}&page[size]=${
          query.page_size
        }`;

        const { data, meta } = await getEnv(self).client.fetch(
          `/buyer/products${queryString}${page}`,
        );

        self.setSearchResultsData(data);
        self.setSearchResultsTotalItems(meta.totalEntries);
      } catch (e) {
        logger.error(e);
      } finally {
        self.setSearchResultsLoading(false);
      }
    },
    async getProductDetails(productId) {
      try {
        const { data } = await getEnv(self).client.fetch(
          `/buyer/products/${productId}`,
        );
        const { product } = data;

        self.setFeaturedProductPhoto(product.galleryImages[0]);
        self.setProductDetailsData(data);
        self.setproductDetailsSuccess(true);
      } catch (e) {
        self.setproductDetailsSuccess(false);
      }
    },
    async getFeaturedProducts() {
      try {
        const { data } = await getEnv(self).client.fetch(
          '/buyer/products/featured',
        );
        self.setFeaturedProducts(data);
      } catch (e) {
        logger.error(e);
      }
    },
    setFeaturedProductPhoto(featuredProduct) {
      self.featuredProductPhoto = featuredProduct;
    },
    setCategoryProductsData(categories) {
      self.categoryProductsData = categories;
    },
    setCategoryProductsLoading(loading) {
      self.categoryProductsLoading = loading;
    },
    setSearchResultsData(products) {
      self.searchResultsData = products;
    },
    setSearchResultsLoading(loading) {
      self.searchResultsLoading = loading;
    },
    setSearchResultsTotalItems(total) {
      self.searchResultsTotalItems = total;
    },
    setProductDetailsData(product) {
      self.productDetailsData = product;
    },
    setproductDetailsSuccess(flag) {
      self.productDetailsSuccess = flag;
    },
    setFeaturedProducts(products) {
      self.featuredProductsData = products;
    },
  }));

export type BuyerProductsType = {
  categoryProductsData: CategoryProductsType[],
  categoryProductsLoading: boolean,
  productDetailsData: ProductDetailsType,
  productDetailsSuccess: boolean,
  searchResults: ProductCardType[],
  searchResultsLoading: boolean,
  featuredProductPhoto: ImageType,
  searchResultsTotalItems: number,
  productDetails: ProductDetailsType,
  productVariants: VariantType,
  productBreadcrumb: CategoryType[],
  getCategoryProducts: (regionId: string) => void,
  getProductDetails: (productId: string) => void,
  searchCatalog: (query: any) => void,
  setSearchResultsData: (BuyerProductsType[]) => void,
  setFeaturedProductPhoto: ImageType => void,
  featuredProductsData: BuyerProductsType[],
  setFeaturedProductsData: (BuyerProductsType[]) => void,
  getFeaturedProducts: () => void,
};

export default BuyerProducts;
