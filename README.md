# oxide.js [![Build Status](https://travis-ci.org/MCProHosting/oxide.svg)](https://travis-ci.org/MCProHosting/oxide)

Oxide is a Node.js client designed for easy communicating with [Carbon](https://github.com/graphite-project/carbon), a data injest tool which is a part of the Graphite project.

## Installation

oxide.js is a npm package, so installation couldn't be easier.  To install oxide.js as a dependency, simply execute:

```shell
$ npm install oxide.js --save
```

And then require oxide in your project:

```js
var Oxide = require('oxide.js');
```

## Theory of Operation

`oxide.js` is a pretty simple tool.  It aggregates metrics using the `#record` method, and then compacts them using either one of two protocols, the [pickle protocol](http://graphite.readthedocs.org/en/latest/feeding-carbon.html#the-pickle-protocol) or the [plaintext protocol](http://graphite.readthedocs.org/en/latest/feeding-carbon.html#the-plaintext-protocol).  On a given interval (see the [usage](#usage) section), the protocol will compact all of the `Metric`s in the client's queue, send them over the socket, and dump the queue.

The queuing operations are thread-safe.

## Usage

Once you have the `oxide.js` namespace in your project, usage is pretty simple.  To construct an oxide client, simply pass an object containing your arguments to the constructor, i.e.:

```js
var Oxide = require('oxide.js');

/**
 * The following options are supported:
 *   host: the hostname of your carbon server
 *   port: the port your carbon server runs on
 *   interval: the time in msec to send statistics
 *   protocol: an instance of the protocol to send statistics with
 *   type: the socket type for communicating with carbon
 */
var oxideClient = new Oxide({
  host: '127.0.0.1',
  port: 2003,
  interval: 5000
});
```

To write a metric into Oxide's aggregate queue, simply fire off the `#record` method:

```js
/**
 * #record takes three arguments, as described below:
 *   1) path - the path to write the metric to
 *   2) value - the value to write onto the metric
 *   3) [optional] timestamp - the time to record the metric
 */
oxideClient.record('my.path', 50, new Date());
```

A call to `#record` makes a `new Oxide.Metric` and dumps it in the queue.  After the time specified in the interval, `oxide.js` will collect all statistics currently in the queue, and pack them using the protocol, then send them up the wire.

That's it!

## Contributing

[Pull-requests](https://github.com/MCProHosting/oxide/pulls) are always appreciated!  If you want to add a feature, close an [issue](https://github.com/MCProHosting/oxide/issues) or otherwise, follow the following process:

1. Fork this repo
2. Cut a branch (with the convention `feature|bugfix/<branch-name>`
3. Write your feature/bugfix/etc
4. Write an accompanying test
5. Ensure that your tests pass (a call to `$ npm test` will verify this easily)
4. Submit a pull-request upstream!

## License

MIT
