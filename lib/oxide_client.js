var Metric = require('./metric.js'),
    PlaintextProtocol = require('./protocol/plaintext_protocol.js'),
    net = require('net'),
    _ = require('lodash');

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
  var opts = { path: this._pathify(path), value: value }
  if (typeof timestamp !== 'undefined') {
    opts.timestamp = timestamp
  }

  return this.enqueue(new Metric(opts));
}

Client.prototype.enqueue = function(metric) {
  if (typeof this.socket !== 'undefined') {
    this.queue.push(metric);
  }
}

Client.prototype.connect = function () {
  return this.socket = net.createConnection({
    host: this.host,
    port: this.port
  });
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

Client.prototype._pathify = function (path) {
  if (this.prefix) {
    return this.prefix+"."+path;
  } else {
    return path;
  }
}

Client.prototype._writeToSocket = function (protocol, metrics, callback) {
  var formatted = protocol.format(metrics) + "\r\n";
  this.socket.write(formatted, "utf-8", callback)
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003,
  prefix: undefined,
  interval: 5000,
  protocol: new PlaintextProtocol(),
}

module.exports = Client;
