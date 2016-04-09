var http = require('http');

var mockEc2MetadataServer = {
  port: '80',
  hostname: '127.0.0.1',
  start: function() {
    this.httpServer = http.createServer(this.requestHandler);
    this.httpServer.listen(this.port, this.hostname, function() {
      console.info('>> EC2 Metadata Server Started!');
    })
  },
  stop: function() {
    this.httpServer.close(function() {
      console.info('>> Stopping EC2 Metadata Server.');
    });
  },
  requestHandler: function(request, response) {
    switch (request.url) {
      case '/latest/meta-data/instance-id':
        response.end('i-1234567890abcdef0');
        break;

      default:
        response.end('ok');
    }//end of switch
  }
}//end of mockEc2MetadataServer

module.exports = mockEc2MetadataServer;
