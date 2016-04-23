var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var path = require('path');

var ec2facts = {
  lib: require('..')
}

describe('ec2facts.lib.configs', function() {

  describe('No config file', function() {

    it('loads the default externalFactsFolder value', function(done) {
      ec2facts.lib.configs(function(configs) {

        switch (process.platform) {
          case 'win32':
            expect(configs.externalFactsFolder).to.equal(process.env['ALLUSERSPROFILE']+path.sep+'PuppetLabs'+path.sep+'facter'+path.sep+'facts.d');
            break;
          default:
            expect(configs.externalFactsFolder).to.equal('/etc/facter/facts.d');
        }

        done();
      });
    });
  });

  describe('With config file', function() {

    var customConfigPath = '';

    before(function() {
      customConfigPath = fs.realpathSync(__dirname+'/etc');
    })

    it('loads the externalFactsFolder in config file', function(done) {
      ec2facts.lib.configs(function(configs) {
        expect(configs.externalFactsFolder).to.equal('/sample/external/facts/folder');
        done();
      }, customConfigPath);
    })

  })



});
