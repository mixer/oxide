module.exports = {
  Client: require('./lib/oxide_client.js'),
  Metric: require('./lib/metric.js'),
  Protocol: {
    Pickle: require('./lib/protocol/pickle_protocol.js'),
    Plaintext: require('./lib/protocol/plaintext_protocol.js'),
  }
}
