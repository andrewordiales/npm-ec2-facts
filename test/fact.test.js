var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

var ec2facts = {
  lib: require('..')
}

var testConfig = {
  externalFactsFolder: fs.realpathSync(__dirname+'/tmp')
}


describe('ec2facts.lib.Fact', function() {

  var fact = new ec2facts.lib.Fact(testConfig);

  var testKey   = 'test-key';
  var testValue = 'test-value';

  after(function() {
    fs.unlinkSync(fact.getFactFilePath(testKey));
  })

  it('saves the fact key & value in configs.externalFactsFolder', function() {

    fact.save(testKey, testValue, function() {
      var savedFact = JSON.parse(fs.readFileSync(
        fact.getFactFilePath(testKey),
        { encoding: String() }
      ));

      expect(
        savedFact[testKey]
      ).to.equal(testValue);
    });

  })

});
