var _ = require('lodash'),
  dgram = require('dgram');

function Client (opts) {
  opts = _.defaults(_.pick(opts, Object.keys(Client.defaults)), Client.defaults);

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

Client.prototype.connect = function () {
  return this.socket = dgram.createSocket(this.type);
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003,
  type: 'udp4'
}

module.exports = Client;
