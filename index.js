module.exports = {
  Client: require('./lib/oxide_client.js'),
  CarbonClient: require('./lib/carbon_client.js'),
  Metrics: {
    CarbonMetric: require('./lib/metrics/metric.js'),
    Statsd: {
      AbstractMetric: require('./lib/metrics/statsd/abstract_statsd_metric.js'),
      Gauge: require('./lib/metrics/statsd/gauge.js'),
      Counter: require('./lib/metrics/statsd/counter.js'),
      // Timer: require('./lib/metrics/statsd/timer.js'),
      // Histogram: require('./lib/metrics/statsd/histogram.js'),
      // Meter: require('./lib/metrics/statsd/meter.js')
    }
  },
  Protocol: {
    Pickle: require('./lib/protocol/pickle_protocol.js'),
    Plaintext: require('./lib/protocol/plaintext_protocol.js'),
  }
}
