var process = require('process');

var mockServer = require('./mockServer.js');

mockServer.start();

process.on('SIGINT', function() {

  mockServer.stop();
});
