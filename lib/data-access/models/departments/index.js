import { types } from 'mobx-state-tree';

const Department = types.model({
  id: types.identifier,
  name: types.string,
  position: types.number,
  iconImageUrl: types.string,
  avatarImageUrl: types.string,
});

export type DepartmentType = {
  id: string,
  name: string,
  position: number,
  iconImageUrl: string,
  avatarImageUrl: string,
};

export default Department;
