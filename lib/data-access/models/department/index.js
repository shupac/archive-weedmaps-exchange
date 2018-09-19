import { types } from 'mobx-state-tree';
import Image from '../image';
import Category from '../category';

const Department = types.model('DepartmentModel', {
  slug: types.maybeNull(types.string),
  parentCategoryId: types.maybeNull(types.null),
  id: types.identifier,
  name: types.string,
  iconImage: types.maybeNull(Image),
  avatarImage: types.maybeNull(Image),
  categories: types.maybe(types.array(Category)),
});

export type DepartmentType = {
  id: string,
  name: string,
  position: number,
  iconImageUrl: string,
  avatarImageUrl: string,
};

export default Department;
