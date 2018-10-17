import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import BuyerProduct, {
  type ProductCardType,
  type ProductDetailsType,
} from 'models/product';
import Image, { type ImageType } from 'models/image';
import CategoryProducts, {
  CategoryProductsType,
} from 'models/category-products';
import queryGenerator from 'lib/common/query-generator';

export const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';

const BuyerProducts = types
  .model('BuyerProducts', {
    categoryProductsData: types.array(CategoryProducts),
    productDetailsData: types.maybe(BuyerProduct),
    searchResultsData: types.array(BuyerProduct),
    searchResultsLoading: true,
    featuredProductPhoto: types.maybe(Image),
    searchResultsTotalItems: 0,
  })
  .views(self => ({
    get categoryProducts() {
      return self.categoryProductsData.map(
        ({ id, name, iconImage, avatarImage }) => ({
          id,
          name,
          iconImageUrl: get(iconImage, 'mediumUrl', ''),
          avatarImageUrl: get(avatarImage, 'mediumUrl', ''),
        }),
      );
    },
    get searchResults() {
      return self.searchResultsData.map(
        ({ unit, minPrice, maxPrice, product }) => {
          const category = get(product, 'category[0].name', false);
          const department = get(product, 'departments[0].name', false);

          return {
            id: product.id,
            name: product.name,
            imageUrl: get(product, 'avatarImage.mediumUrl', ''),
            brand: get(product, 'brand.name', ''),
            category: category || department,
            minPrice,
            maxPrice,
            priceUnit: unit,
            outOfStock: product.variants.every(
              item => item.allocations && item.allocations[0].amount < 1,
            ),
          };
        },
      );
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
        minPrice: get(self.productDetailsData, 'minPrice', ''),
        maxPrice: get(self.productDetailsData, 'maxPrice', ''),
        priceUnit: get(self.productDetailsData, 'unit', ''),
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
      try {
        const { data } = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=products`,
        );

        // TODO: Complete model / state once BE returns product data
        self.setCategoryProductsData(data);
      } catch (e) {
        console.log(e);
      }
    },
    async searchCatalog(query) {
      const queryString = queryGenerator.generateQuery(query);

      self.setSearchResultsLoading(true);

      if (!queryString) {
        self.setSearchResultsData([]);
        return;
      }

      try {
        // eslint-disable-next-line
        const page = `&page[number]=${query.page}&page[size]=${query.page_size}`;

        const { data, meta } = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/products${queryString}${page}`,
        );

        self.setSearchResultsData(data);
        self.setSearchResultsTotalItems(meta.total_entries);
      } catch (e) {
        console.log(e);
      } finally {
        self.setSearchResultsLoading(false);
      }
    },
    async getProductDetails(productId) {
      try {
        const { data } = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/products/${productId}`,
        );
        const { product } = data;

        self.setFeaturedProductPhoto(product.galleryImages[0]);
        self.setProductDetailsData(data);
      } catch (e) {
        console.log(e);
      }
    },
    setFeaturedProductPhoto(featuredProduct) {
      self.featuredProductPhoto = featuredProduct;
    },
    setCategoryProductsData(categories) {
      self.categoryProductsData = categories;
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
  }));

export type BuyerProductsType = {
  getCategoryProducts: (regionId: string) => void,
  getProductDetails: (productId: string) => void,
  searchCatalog: (query: any) => void,
  categoryProductsData: CategoryProductsType[],
  searchResultsData: ProductCardType[],
  productDetailsData: ProductDetailsType,
  featuredProductPhoto: ImageType,
};

export default BuyerProducts;
