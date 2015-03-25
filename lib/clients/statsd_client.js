var OxideClient = require('./oxide_client.js'),
    util = require('util'),
    Metric = {
      Counter: require('../metrics/statsd/counter_metric.js'),
      Gauge: require('../metrics/statsd/gauge_metric.js'),
      Timer: require('../metrics/statsd/timer_metric.js')
    };

function StatsdClient (opts) {
  // Since statsd doesn't accept data in a packed format, we null out any protocol
  // given to the StatsdClient constructor
  if ((opts || {}).protocol) {
    throw 'Statsd does not accept data in a packed format, yet a protocol was provided';
  }

  OxideClient.call(this, opts);
}
util.inherits(StatsdClient, OxideClient);

StatsdClient.prototype.increment = function (path, value, sampleRate) {
  this.enqueue(new Metric.Counter({
    path: this._pathify(path),
    value: (value || 1),
    sampleRate: sampleRate
  }));
};

StatsdClient.prototype.decrement = function (path, value, sampleRate) {
  this.enqueue(new Metric.Counter({
    path: this._pathify(path),
    value: -(value || 1),
    sampleRate: sampleRate
  }));
};

StatsdClient.prototype.gauge = function (path, value) {
  this.enqueue(new Metric.Gauge({
    path: this._pathify(path),
    value: this._assertValuePresence(value)
  }));
};

StatsdClient.prototype.timing = function (path, time) {
  this.enqueue(new Metric.Timer({
    path: this._pathify(path),
    value: this._assertValuePresence(time)
  }));
};

StatsdClient.prototype._assertValuePresence = function (value) {
  if (typeof value === 'undefined') {
    throw 'cannot create this metric with the value undefined';
  } else {
    return value;
  }
}

module.exports = StatsdClient;
