import Logger from 'js-logger';
import serializeError from 'serialize-error';

const env = process.env.NODE_ENV || 'development';
const defaultLevel = env === 'development' ? Logger.DEBUG : Logger.ERROR;

// the default level should be the process.env.LOG_LEVEL uppercased
const logLevel = process.env.LOG_LEVEL
  ? Logger[process.env.LOG_LEVEL.toUpperCase()]
  : defaultLevel;

// Set the log level to what the ENV is set to or debug
Logger.useDefaults({
  defaultLevel: logLevel,
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
      env,
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
      messages[0] = `[${log.timestamp}:${log.log_level}:${log.env}] (${
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

export default Logger;
