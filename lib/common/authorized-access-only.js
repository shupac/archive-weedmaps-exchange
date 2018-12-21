import intersection from 'lodash.intersection';

export default function authorizedAccessOnly(props, stores, roles) {
  const { auth: authStore } = stores;
  const { user } = authStore;

  if (!user) {
    return false;
  }

  const intersect = intersection(user.roles, roles);
  const isAuthorized = intersect.length > 0;

  if (isAuthorized) {
    return true;
  }

  if (IS_SERVER) {
    props.res.send(403, 'Unauthorized');
  }

  return false;
}
