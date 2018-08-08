/* eslint-disable no-console,import/no-dynamic-require */
require('newrelic');
require('dotenv').config();
const config = require('./config');
require('isomorphic-fetch');
const logger = require('./lib/common/logger');
const express = require('express');
const next = require('next');
const Honeybadger = require('honeybadger');
const { readFileSync } = require('fs');
const asciiLogo = require('./lib/common/ascii_logo');
const asciiRocket = require('./lib/common/ascii_rocket');
const routes = require('./lib/routes');
const configMiddleware = require('./lib/server/middleware/config');
const requestContext = require('./lib/server/request-context');
const newRelic = require('./lib/server/middleware/new-relic');
const auth = require('./lib/server/middleware/auth');
const csp = require('express-csp');
const policy = require('./lib/server/content-security-policy');
const insertNonce = require('./lib/server/insert-csp-nonce');

const port = process.env.PORT || 1620;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

// Honeybadger Config
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_API_KEY,
  environment: process.env.DEPLOY_ENVIRONMENT,
});

function notifyHoneybadger(error, opts) {
  logger.debug(`Mode: ${dev}`);
  if (!dev) {
    Honeybadger.notify(error, opts);
  } else {
    logger.error('SSR Error:', error);
  }
}

// eslint-disable-next-line import/no-dynamic-require
const getMessages = locale => require(`./lib/lang/${locale}.json`);
const localeDataCache = new Map();
const { acceptedLanguages } = config;

const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

// this preloads the locale cache Map and messages with the accepted languages
acceptedLanguages.forEach(lang => {
  getMessages(lang);
  getLocaleDataScript(lang);
});

const renderApp = async (req, res, expressNext) => {
  const locale = req.acceptsLanguages(acceptedLanguages);
  req.locale = locale;
  req.messages = getMessages(locale);
  req.localeDataScript = getLocaleDataScript(locale);

  // Match route + parse params
  if (req.url === '/favicon.ico') {
    // @ToDo: We need to return the favicon.ico
    return res.send('favicon.ico');
  }
  const { route, params } = routes.match(req.url);
  if (!route) return handle(req, res);

  // render route
  logger.info(`Admin serving ${req.url}`);

  try {
    const html = await app.renderToHTML(req, res, route.page, params);
    if (res.statusCode === 500 && res.capturedError) {
      notifyHoneybadger(res.capturedError, { context: requestContext(req) });
      app.renderError(res.capturedError, req, res, route.page, params);
    }
    if (html) res.send(insertNonce(html, res.locals.cspToken));
  } catch (e) {
    logger.error('error in catch after renderToHTML', e);
    // Something happened during the React render, pass the error up the chain
    expressNext(e);
  }

  return expressNext();
};

const afterListen = err => {
  if (err) throw err;
  if (dev) {
    console.log(asciiRocket);
    console.log(asciiLogo);
  }
  const env = process.env.NODE_ENV || 'development';
  console.log(
    `[WM Unified Admin]
> NODE_ENV  => ${env}
> envName   => ${config.envName}
>           => http://localhost:${port}`,
  );
};

const afterPrepare = () => {
  const expressApp = express();
  expressApp.set('trust proxy', true);
  // add a get method for the runtime config
  expressApp.get('/static/config.js', configMiddleware);
  // content-security-policy
  csp.extend(expressApp, policy);
  // setup handlers
  expressApp
    .use(Honeybadger.requestHandler)
    .use(newRelic)
    .use(auth)
    .use(renderApp)
    .use(Honeybadger.errorHandler)
    .listen(port, afterListen);
};

// setup app
app.prepare().then(afterPrepare);
