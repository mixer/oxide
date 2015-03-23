var _ = require('lodash')

var defaults = function () {
  return {
    timestamp: new Date()
  }
}

function Metric (opts) {
  opts = _.defaults(_.pick(opts, ['path', 'value', 'timestamp']), defaults());

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

Metric.prototype.asPlaintext = function () {
  return [this.path, this.value, this._formatTimestamp()].join(' ');
};

Metric.prototype.asPickle = function () {
  return "("+this.path+", ("+this._formatTimestamp()+", "+this.value+"))"
};

Metric.prototype._formatTimestamp = function () {
  return this.timestamp / 1000 | 0;
}

module.exports = Metric;
