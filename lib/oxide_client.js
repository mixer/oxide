var _ = require('lodash');

function Client (opts) {
  opts = _.pick(opts, ['host', 'port'])
  opts = _.defaults(optss, {
    host: '127.0.0.1',
    port: 2003
  })

  opts = _.pick(_.defaults(opts, Client.defaults), Object.keys(Client.defaults))

  this.host = opts.host;
  this.port = port.port;
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003
}

module.exports = Client;
