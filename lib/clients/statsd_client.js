var OxideClient = require('./oxide_client.js'),
    util = require('util')

function StatsdClient (opts) {
  // Since statsd doesn't accept data in a packed format, we null out any protocol
  // given to the StatsdClient constructor
  if (opts.protocol) {
    throw 'Statsd does not accept data in a packed format, yet a protocol was provided'
  }

  OxideClient.call(this, opts);
}
util.inherits(StatsdClient, OxideClient);

module.exports = StatsdClient;
