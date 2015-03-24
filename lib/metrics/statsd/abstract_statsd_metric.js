var _ = require('lodash');

function AbstractStatsdMetric (opts) {
  opts = _.pick(opts, ['path', 'value', 'type']);

  if (opts.type.length > 1) {
    throw 'Invalid property type!';
  }

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

AbstractStatsdMetric.prototype.format = function () {
  return this.path+":"+this.value+"|"+this.type;
};

module.exports = AbstractStatsdMetric;
