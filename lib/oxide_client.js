var _ = require('lodash'),
  dgram = require('dgram');

function Client (opts) {
  this.queue = [];
  opts = _.defaults(_.pick(opts, Object.keys(Client.defaults)), Client.defaults);

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }

  Object.defineProperty(this, 'connected', function () {
    return typeof this.socket !== 'undefined';
  })
}

Client.prototype.connect = function () {
  return this.socket = dgram.createSocket(this.type);
}

Client.prototype.send = function (protocol) {
  if (this.queue.length === 0) {
    return;
  } else {
    if (!this.connected) return;

    var tempQueue = this.queue.slice(0);
    this._writeToSocket(protocol, tempQueue, function (err) {
      if (err) {
        throw err;
      } else {
        this.queue.splice(0, tempQueue.length, tempQueue);
      }
    });
  }
}

Client.prototype._writeToSocket = function (protocol, metrics, callback) {
  var formatted = protocol.format(metrics);
  this.socket.send(formatted, formatted.length, this.port, this.host, function (err, bytes) {
    callback(err);
  });
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003,
  type: 'udp4'
}

module.exports = Client;
