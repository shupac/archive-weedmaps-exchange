import { types, getEnv } from 'mobx-state-tree';
import get from 'lodash/get';
import Department, { type DepartmentType } from '../../models/department';
import CarouselCategories from '../../models/carousel-categories';

export const regionId = '64d05017-4339-4cda-9e57-0da061bf6b00';

const CategoryStore = types
  .model('CategoryStore', {
    departments: types.array(Department),
    carouselCategories: types.array(CarouselCategories),
  })
  .views(self => ({
    get departmentCards() {
      return self.departments.map(({ name, id, iconImage, avatarImage }) => ({
        name,
        id,
        iconImageUrl: get(iconImage, 'mediumUrl', ''),
        avatarImageUrl: get(avatarImage, 'mediumUrl', ''),
      }));
    },
  }))
  .actions(self => ({
    async getDepartments() {
      try {
        const departments = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image`,
        );
        self.setDepartments(departments);
      } catch (e) {
        console.log(e);
      }
    },
    async getCarouselCategories() {
      try {
        const categories = await getEnv(self).client.fetch(
          `/buyer/regions/${regionId}/departments?include=products`,
        );
        // TODO: Complete model / state once BE returns product data

        self.setCarouselProducts(categories);
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
