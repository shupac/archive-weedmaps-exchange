// @flow
import axios from 'axios';
import type { Axios, $AxiosXHR, $AxiosError, AxiosXHRConfig } from 'axios';
import urlConfig from 'lib/common/url-config';
import get from 'lodash.get';
import cookieHelper from '../common/cookie-helper';

const appConfig = require('../../config');

axios.defaults.headers = {
  WM_CLIENT: `admin/${appConfig.sha}`,
};

declare interface AxiosWrapperXHRConfig<T> extends AxiosXHRConfig<T> {
  isRetry?: boolean;
}

declare interface AxiosWrapperError<T> extends $AxiosError<T> {
  config: AxiosWrapperXHRConfig<T>;
}

export default class AxiosWrapper {
  req: ?express$Request;
  res: ?express$Response;
  client: Axios;

  constructor(req: ?express$Request, res: ?express$Response) {
    this.req = req;
    this.res = res;
    this.client = axios.create();
    this.client.interceptors.request.use(this.requestSuccessInterceptor);
    this.client.interceptors.response.use(
      this.responseSuccessInterceptor,
      this.responseErrorInterceptor,
    );
  }

  requestSuccessInterceptor = (
    config: AxiosWrapperXHRConfig<any>,
  ): Promise<AxiosWrapperXHRConfig<any>> => {
    logger.debug('request interceptor');
    const token = this.getToken();
    if (!token) {
      return Promise.resolve(config);
    }
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    logger.debug('decorated config', config);
    return Promise.resolve(config);
  };

  responseSuccessInterceptor(res: $AxiosXHR<any>) {
    return res;
  }

  responseErrorInterceptor = (err: AxiosWrapperError<any>) => {
    if (!err) return (Promise.reject(err): Promise<Error>);

    const { config } = err;
    const { status } = err.response;

    // only use the refresh token if we have not tried to refresh previously and was not authorized
    const shouldRefreshToken =
      !(get(err, 'response.config.url') === urlConfig.weedmapsOauthUrl) &&
      status === 401;

    if (shouldRefreshToken) {
      return this.refreshToken().then(() =>
        this.request(({ ...config, isRetry: true }: any)),
      );
    }

    if (status === 422) {
      return (Promise.reject(err): Promise<any>);
    }

    return (Promise.reject(
      new Error(`Unable to authenticate ${status}`),
    ): Promise<Error>);
  };

  getCookieString() {
    let cookieString;
    if (this.req && this.req.headers.cookie) {
      cookieString = this.req.headers.cookie;
    } else if (global.document) {
      cookieString = global.document.cookie;
    }
    return cookieString;
  }

  getToken() {
    return cookieHelper.getToken(this.getCookieString());
  }

  getRefreshToken() {
    return cookieHelper.getRefreshToken(this.getCookieString());
  }

  refreshToken() {
    const params = {
      grant_type: 'refresh_token',
      refresh_token: this.getRefreshToken(),
    };
    return this.post(urlConfig.weedmapsOauthUrl, params).then(res => {
      this.updateTokenCookie(res.data);
      return res.data;
    });
  }

  updateTokenCookie(payload: { access_token: string, refresh_token: string }) {
    cookieHelper.setAuthCookie(payload, this.res);
  }

  request(config: AxiosWrapperXHRConfig<*>) {
    return this.client.request(config);
  }

  delete(url: string, config?: AxiosWrapperXHRConfig<*>) {
    return this.client.delete(url, config);
  }

  get(url: string, config?: AxiosWrapperXHRConfig<*>) {
    return this.client.get(url, config);
  }

  head(url: string, config?: AxiosWrapperXHRConfig<*>) {
    return this.client.head(url, config);
  }

  post(url: string, data?: mixed, config?: AxiosWrapperXHRConfig<*>) {
    return this.client.post(url, data, config);
  }

  put(url: string, data?: mixed, config?: AxiosWrapperXHRConfig<*>) {
    return this.client.put(url, data, config);
  }

  patch(url: string, data?: mixed, config?: AxiosWrapperXHRConfig<*>) {
    return this.client.patch(url, data, config);
  }
}
