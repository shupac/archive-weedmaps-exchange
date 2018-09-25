// @flow
import { types } from 'mobx-state-tree';

const Category = types.model('CategoryModel', {
  id: types.identifier,
  name: types.string,
  slug: types.string,
});

export type CategoryType = {
  id?: string,
  name?: string,
  slug?: string,
};

export default Category;
