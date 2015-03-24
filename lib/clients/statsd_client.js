var Oxide = require('../index.js'),
    util = require('util')

function StatsdClient () {
  OxideClient.call(this);
}
util.inherits(StatsdClient, Oxide.Client);
