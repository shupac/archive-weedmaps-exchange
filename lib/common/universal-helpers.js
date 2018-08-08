import NProgress from 'nprogress';
import has from 'lodash.has';

export const BROWSER = 'BROWSER';
export const SERVER = 'SERVER';

/**
 * Return true if we are running in a server environment
 * This method is not useful while running in JSDom test environment since
 * there is a window variable. Use this method when you need to be absolutely sure
 * @returns {boolean}
 */
export const isServer = () =>
  !(typeof window !== 'undefined' && window.document);

/**
 * Return the environment context based on props. Assumes the
 * presence of a `req` means you are running in the server context. This method
 * can be used more safely inside a test environment, since the props can be mocked
 */
export const environmentContext = props => {
  const serverSide = has(props, 'req');
  if (serverSide) {
    return { SERVER };
  }
  return { BROWSER };
};

export function startLoading() {
  if (!isServer()) {
    NProgress.start();
  }
}

export function stopLoading() {
  if (!isServer()) {
    NProgress.done();
  }
}

export function pluralizeLinkType(type) {
  if (type === 'delivery') {
    return 'deliveries';
  } else if (type === 'pickup') {
    return 'dispensaries';
  }
  return null;
}

export function singularizeLinkType(type) {
  if (type === 'delivery') {
    return 'delivery';
  } else if (type === 'pickup') {
    return 'dispensary';
  }
  return null;
}

export default {
  isServer: isServer(),
  environmentContext,
  BROWSER,
  SERVER,
  startLoading,
  stopLoading,
};
