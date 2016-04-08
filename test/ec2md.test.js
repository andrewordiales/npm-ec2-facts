var chai = require('chai');
var expect = chai.expect;
var http = require('http');

var ec2facts = {
  lib: require('..')
}

var mockEc2MetadataServer = {
  port: '9999',
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


describe('ec2facts.lib.ec2md', function() {

  before(function() {
    mockEc2MetadataServer.start();
    ec2facts.lib.ec2md.changeOption('hostname', mockEc2MetadataServer.hostname);
    ec2facts.lib.ec2md.changeOption('port', mockEc2MetadataServer.port);
  })

  after(function() {
    mockEc2MetadataServer.stop();
  })

  it('returns the instance id', function(done) {
    ec2facts.lib.ec2md.getInstanceId(function(metadata, value) {
      expect(metadata).to.equal('instance-id');
      expect(value).to.equal('i-1234567890abcdef0');
      done();
    });
  })

});
