var Metric = require('./metric.js'),
    PickleProtocol = require('./protocol/pickle_protocol.js'),
    _ = require('lodash'),
    dgram = require('dgram');

function Client (opts) {
  this.queue = [];
  opts = _.defaults(_.pick(opts, Object.keys(Client.defaults)), Client.defaults);

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }

}

Client.prototype.start = function () {
  this.interval = setInterval((function () {
    this.send(this.protocol);
  }).bind(this), this.interval);
}

Client.prototype.stop = function () {
  if (this.interval) {
    this.interval.clearInterval();
  }
}

Client.prototype.record = function (path, value, timestamp) {
  var opts = { path: path, value: value }
  if (typeof timestamp !== 'undefined') {
    opts.timestamp = timestamp
  }

  return this.enqueue(new Metric(opts));
}

Client.prototype.enqueue = function(metric) {
  this.queue.push(metric);
}

Client.prototype.connect = function () {
  return this.socket = dgram.createSocket(this.type);
}

Client.prototype.send = function (protocol) {
  if (this.queue.length === 0) {
    return;
  } else {
    if (typeof this.socket === 'undefined') return;

    var tempQueue = this.queue.slice(0);

    this._writeToSocket(protocol, tempQueue, function (err) {
      if (err) {
        throw err;
      } else {
        this.queue = _.difference(this.queue, tempQueue);
      }
    }.bind(this));
  }
}

Client.prototype._writeToSocket = function (protocol, metrics, callback) {
  var formatted = protocol.format(metrics);
  this.socket.send(formatted, formatted.length, this.port, this.host, function (err, bytes) {
    return callback(err);
  });
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003,
  interval: 5000,
  protocol: new PickleProtocol(),
  type: 'udp4'
}

module.exports = Client;
