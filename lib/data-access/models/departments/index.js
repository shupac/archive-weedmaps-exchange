import { types } from 'mobx-state-tree';

const Department = types.model({
  id: types.identifier,
  name: types.string,
  position: types.number,
  iconImageUrl: types.string,
  avatarImageUrl: types.string,
});

export default Department;
