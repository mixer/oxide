var _ = require('lodash'),
  net = require('net');

function Client (opts) {
  opts = _.defaults(_.pick(opts, Object.keys(Client.defaults)), Client.defaults);

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

Client.prototype.connect = function () {
  return this.socket = net.connect({ host: this.host, port: this.port });
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003
}

module.exports = Client;
