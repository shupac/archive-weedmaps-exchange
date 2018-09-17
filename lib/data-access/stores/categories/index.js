import { mockProduct } from 'lib/mocks/product-search.js';
import { types, getEnv } from 'mobx-state-tree';
import Department, { type DepartmentType } from '../../models/departments';
import CarouselCategories from '../../models/carousel-categories';

const transformDepartments = departments =>
  departments.map(department => {
    const { id, name, position, iconImage, avatarImage } = department;

    return Department.create({
      id,
      name,
      position,
      iconImageUrl: iconImage ? iconImage.mediumUrl : '',
      avatarImageUrl: avatarImage ? avatarImage.mediumUrl : '',
    });
  });

const transformCarouselCategories = categories =>
  categories.map(category => ({
    ...category,
    products: category.products.map(p => ({
      ...mockProduct,
      id: p.id,
    })),
  }));

const CategoryStore = types
  .model('CategoryStore', {
    departments: types.array(Department),
    carouselCategories: types.array(CarouselCategories),
  })
  .actions(self => ({
    async getDepartments(regionId) {
      try {
        const departments = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image`,
        );

        const transformed = transformDepartments(departments);

        self.setDepartments(transformed);
      } catch (e) {
        console.log(e);
      }
    },
    async getCarouselCategories(regionId) {
      try {
        const categories = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=products`,
        );

        const transformed = transformCarouselCategories(categories);

        self.setCarouselProducts(transformed);
      } catch (e) {
        console.log(e);
      }
    },
    setDepartments(departments) {
      self.departments = departments;
    },
    setCarouselProducts(carouselCategories) {
      self.carouselCategories = carouselCategories;
    },
  }));

export type CategoryStoreType = {
  getDepartments: (regionId: string) => void,
  getCarouselCategories: (regionId: string) => void,
  departments: Array<DepartmentType>,
};

export default CategoryStore;
