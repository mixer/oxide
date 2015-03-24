var Oxide = require('../index.js'),
    expect = require('expect.js'),
    sinon = require('sinon'),
    helpers = require('./test_helper.js');

describe("Oxide.Client.StatsdClient", function () {
  it('doesn\'t accept protocols at construction', function () {
    expect(Oxide.Client.StatsdClient).withArgs({ protocol: new Oxide.Protocol.Pickle() }).to.throwException();
  });
});
