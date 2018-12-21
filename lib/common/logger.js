const Logger = require('js-logger');
const serializeError = require('serialize-error');

const env = process.env.NODE_ENV || 'development';
const defaultLevel = process.env.LOG_LEVEL
  ? Logger[process.env.LOG_LEVEL.toUpperCase()]
  : Logger.DEBUG;

// Set the log level to what the ENV is set to or debug
Logger.useDefaults({
  defaultLevel,
  formatter: (messages, context) => {
    let args = false;
    if (messages.length > 1) {
      args = messages.splice(1);
    }
    const log = {
      message: messages[0],
      component: context.name
        ? context.name.replace('@ghostgroup/exchange-fe:', 'APP:')
        : '-',
      data: args === false ? undefined : args,
      log_level: context.level.name,
      timestamp: new Date().toUTCString(),
    };
    if (env !== 'development') {
      try {
        messages[0] = JSON.stringify(log);
      } catch (e) {
        log.message = serializeError(log.message);
        log.data = serializeError(log.data);
        messages[0] = JSON.stringify(log);
      }
    } else {
      messages[0] = `[${log.timestamp}] <${log.log_level}> (${
        log.component
      }): `;
      if (typeof log.message === 'string') {
        messages[0] = `${messages[0]} ${log.message}`;
        if (args) {
          messages[1] = log.data;
        }
      } else {
        messages[1] = log.message;
        if (args) {
          messages[2] = log.data;
        }
      }
    }
  },
});

module.exports = Logger;
