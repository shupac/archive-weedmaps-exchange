import { Router } from 'lib/routes';
import config from 'config';
import logger from 'lib/common/logger';

export function redirectTo(props, to, external = false) {
  logger.debug('Redirecting to: ', to);
  if (IS_SERVER) {
    // Domain specific redirection flag to set cookies and do the redirection
    props.res.WMredirecting = to;
  } else if (external) {
    window.location.assign(to);
  } else {
    Router.pushRoute(to);
  }
}

function generateReturnUrlOnClient(path) {
  if (!path) {
    return window.location.href;
  }
  return `${window.location.origin}${path}`;
}

function generateReturnUrlOnServer(props, path) {
  const { req } = props;
  if (path !== null) {
    return `${config.siteUrl}${`/${path}`.replace('//', '/')}`;
  }
  return `${config.siteUrl}${`/${req.originalUrl}`.replace('//', '/')}`;
}

export function redirectToLoginPage(returnPath = null, props) {
  logger.debug('User is not logged in, redirecting...');
  logger.debug('Using returnPath?', returnPath);
  let returnUrl;
  if (IS_SERVER) {
    returnUrl = generateReturnUrlOnServer(props, returnPath);
    logger.debug('returnUrl on server:', returnUrl);
  } else {
    returnUrl = generateReturnUrlOnClient(returnPath);
    logger.debug('returnUrl on client:', returnUrl);
  }
  if (config.envName === 'development') {
    redirectTo(props, `/login?return_url=${returnUrl}`, true);
  } else {
    redirectTo(
      props,
      `${config.coreBaseUrl}/login?return_url=${returnUrl}`,
      true,
    );
  }
}

/**
 * Redirects and unauthenticated user to WM's login page.
 * Optionally you can pass in a return path.
 * @param {object} props - Server props
 * @param {object} stores - KeyValue of stores
 * @param {string} [returnPath] - Optional return path
 * @return {boolean} - Whether or not we did redirect the user
 */
export function redirectUnauthenticatedUser(props, stores, returnPath = null) {
  const { authStore } = stores;
  if (!authStore.loggedIn) {
    redirectToLoginPage(returnPath, props);
    return true; // It did redirect
  }
  return false; // It didn't redirect
}
