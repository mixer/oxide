var Oxide = require('../index.js'),
    expect = require('expect.js'),
    sinon = require('sinon');

describe("Oxide.Client", function () {
  it('obeys given arguments', function () {
    var client = new Oxide.Client({host: 'foo', port: 'bar'})

    expect(client).to.have.property('host', 'foo');
    expect(client).to.have.property('port', 'bar');
  });

  it('set values to their defaults when no arguemnts are provided', function () {
    var client = new Oxide.Client({host: 'foo'});

    expect(client).to.have.property('port', Oxide.Client.defaults.port);
  });

  it('discads values that aren\'t in the default values', function () {
    var client = new Oxide.Client({ randomProperty: 'randomValue' });

    expect(client).to.not.have.property('randomProperty');
  });

  it('returns a socket with #connect', function () {
    var client = new Oxide.Client();
    expect(client.connect()).to.not.be(null);
  });

  it('stores enqueued items in its queue', function () {
    var client = new Oxide.Client();
    var metric = new Oxide.Metric({path: 'foo', value: 'bar'});

    client.enqueue(metric);

    expect(client.queue).to.contain(metric);
  });

  describe("#send", function () {
    before(function () {
      // Before this group of tests start, stub the _writeToSocket method
      // to just call the callback
      sinon.stub(Oxide.Client.prototype, "_writeToSocket").callsArg(2);
    });

    after(function () {
      // Once we're done, restore the original behavior of the method
      Oxide.Client.prototype._writeToSocket.restore();
    });

    var pickle = Oxide.Protocol.Pickle();

    var m1 = new Oxide.Metric({path: 'foo', value: 'bar'});
    var m2 = new Oxide.Metric({path: 'foo', value: 'bar'});

    it('removes items from the queue upon sending', function () {
      var client = new Oxide.Client();

      client.connect();
      client.enqueue(m1);
      client.send(pickle);

      expect(client.queue).to.be.empty();
    });

    it('only removes items in the queue before calling #send', function () {
      var client = new Oxide.Client();

      client.connect();
      client.enqueue(m1);
      client.send(pickle);
      client.enqueue(m2);

      expect(client.queue).to.not.contain(m1);
      expect(client.queue).to.contain(m2);
    });
  });
});
