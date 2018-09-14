import { types, getEnv } from 'mobx-state-tree';
import Product, { type ProductType } from 'lib/data-access/models/product';
// import mockResponse from 'lib/mocks/product-search';

// TODO: use real regionId
const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';
// const regionId = `4915c2ea-0755-40c1-b539-8b74044690cc`;

export const transform = products =>
  products.map(product => {
    const {
      id,
      minPrice,
      maxPrice,
      unit: priceUnit,
      product: { brand, avatarImage, name, departments, categories },
    } = product;

    return Product.create({
      id,
      imageUrl: avatarImage.mediumUrl,
      brand: brand.name,
      name,
      priceUnit,
      minPrice,
      maxPrice,
      category:
        (categories[0] && categories[0].name) ||
        (departments[0] && departments[0].name),
    });
  });

const CatalogSearchStore = types
  .model('CatalogSearchStore', {
    products: types.array(Product),
  })
  .actions(self => ({
    async getProducts(query) {
      if (!query) {
        self.setProducts([]);
        return;
      }

      try {
        const products = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/products?query=${query}`,
        );

        const transformed = transform(products);
        self.setProducts(transformed);
      } catch (e) {
        console.log(e);
      }
    },
    setProducts(products) {
      self.products = products;
    },
  }));

export type CatalogSearchStoreType = {
  getProducts: (query: string) => void,
  products: Array<ProductType>,
};

export default CatalogSearchStore;
