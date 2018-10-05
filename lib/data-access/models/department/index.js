import { types } from 'mobx-state-tree';
import Image from '../image';
import Category, { type CategoryType } from '../category';

const Department = types.model('DepartmentModel', {
  avatarImage: types.maybeNull(Image),
  categories: types.array(Category),
  iconImage: types.maybeNull(Image),
  id: types.identifier,
  name: types.string,
  position: types.number,
  slug: types.maybeNull(types.string),
});

export type DepartmentType = {
  id: string,
  categories: CategoryType[],
  name: string,
  position: number,
  iconImageUrl: string,
  avatarImageUrl: string,
};

export default Department;
