import { types } from 'mobx-state-tree';
import Image from '../image';

const Department = types.model('DepartmentModel', {
  avatarImage: types.maybeNull(Image),
  iconImage: types.maybeNull(Image),
  id: types.identifier,
  name: types.string,
  position: types.number,
  slug: types.maybeNull(types.string),
});

export type DepartmentType = {
  id: string,
  name: string,
  position: number,
  iconImageUrl: string,
  avatarImageUrl: string,
};

export default Department;
