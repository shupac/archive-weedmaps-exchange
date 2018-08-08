import intersection from 'lodash.intersection';
import { environmentContext } from 'lib/common/universal-helpers';

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

  if (environmentContext(props).SERVER) {
    props.res.send(403, 'Unauthorized');
  }

  return false;
}
