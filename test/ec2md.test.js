var chai = require('chai');
var expect = chai.expect;

var mockEc2MetadataServer = require('./../tools/mockServer.js');

var ec2facts = {
  lib: require('..')
}

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
    ec2facts.lib.ec2md.getEc2Data('instance-id', '/meta-data/instance-id', function(metadata, value) {
      expect(metadata).to.equal('instance-id');
      expect(value).to.equal('i-1234567890abcdef0');
      done();
    });
  })

  it('returns the user data', function(done) {
    ec2facts.lib.ec2md.getEc2Data('user-data', '/user-data', function(shortname, value) {
      expect(shortname).to.equal('user-data');
      expect(value).to.equal('1234,john,reboot,true | 4512,richard, | 173,,,');
      done();
    });
  })

});
