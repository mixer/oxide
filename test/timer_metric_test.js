var Oxide = require('../index.js'),
    expect = require('expect.js'),
    helper = require('./test_helper.js')

describe("Oxide.Metrics.Statsd.Timer", function () {
  it("has the metric type 'ms'", function () {
    expect(new Oxide.Metrics.Statsd.Timer()).to.have.property('type', 'ms');
    expect(new Oxide.Metrics.Statsd.Timer({}, 'k')).to.have.property('type', 'ms');
  });

  it("formats itself correctly", function () {
    expect(new Oxide.Metrics.Statsd.Timer({path: 'response_time', value: 12}).format()).to.be('response_time:12|ms');
  });
});
