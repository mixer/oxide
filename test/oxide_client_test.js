var Oxide = require('../index.js')
var expect = require('expect.js');

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
});
