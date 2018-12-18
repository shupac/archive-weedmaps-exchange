import { types } from 'mobx-state-tree';

export const WmProfile = types.model({
  username: '',
  email: '',
  slug: '',
  avatar_url: '',
});

export const User = types.model({
  id: types.string,
  wmUserId: types.number,
  preferences: types.model({
    userContext: types.string,
    locationId: types.string,
  }),
  email: types.string,
  organization: types.model({
    id: types.string,
  }),
});

export type UserType = {
  avatarUrl: string,
  wmUserId: string,
  username: string,
  userContext: string,
};
