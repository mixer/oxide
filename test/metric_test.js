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

  it('correctly outputs metric data in the plaintext format', function () {
    helper.freeze(function (now) {
      var metric = new Oxide.Metric({path: 'foo', value: 'bar'});
      expect(metric.asPlaintext()).to.eql('foo bar ' + Math.floor(now / 1000));
    });
  });

  it('correctly outputs metric data using the pickle protocol', function () {
    helper.freeze(function (now) {
      var metric = new Oxide.Metric({path: 'foo', value: 'bar'});
      expect(metric.asPickle()).to.eql('('+metric.path+', ('+(now / 1000 | 0)+', '+metric.value+'))')
    });
  });
});
