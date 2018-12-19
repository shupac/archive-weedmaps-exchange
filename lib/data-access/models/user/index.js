import { types } from 'mobx-state-tree';
import Organization from 'models/organization';

export const WmProfile = types.model({
  username: '',
  email: '',
  slug: '',
  avatar_url: '',
});

const Preferences = types.model('Preferences', {
  locationId: types.string,
  userContext: types.string,
});

export const User = types.model({
  id: types.string,
  wmUserId: types.number,
  preferences: Preferences,
  email: types.string,
  organization: Organization,
});

export type UserType = {
  avatarUrl: string,
  wmUserId: string,
  username: string,
  userContext: string,
};
