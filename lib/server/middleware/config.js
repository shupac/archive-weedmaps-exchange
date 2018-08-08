const appConfig = require('../../../config');
// Stringify on module load, not at request time
const configJSON = JSON.stringify(appConfig);
module.exports = function ConfigMiddleware(req, res) {
  res.type('application/javascript');
  res.send(`window.config = ${configJSON};`);
};
