var Oxide = require('../index.js'),
    expect = require('expect.js'),
    helper = require('./test_helper.js')

describe("Oxide.Metric", function () {
  it('obeys the given arguments', function () {
    var metric = new Oxide.Metric({path: 'test', value: 'foo'})

    expect(metric).to.have.property('path', 'test');
    expect(metric).to.have.property('value', 'foo');
  });

  it('sets the time as current when no time is provided', function () {
    helper.freeze(function (now) {
      var metric = new Oxide.Metric({path: 'test', value: 'foo'});
      expect(metric.timestamp).to.eql(now);
    });
  });
});
