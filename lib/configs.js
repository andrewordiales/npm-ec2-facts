var fs = require('fs');

var CONFIG_FILENAME = 'aws-facts.conf.json';
var CONFIG_FOLDER = '/etc';

var CONFIG_PATH = CONFIG_FOLDER+'/'+CONFIG_FILENAME;

var defaultConfigs = {
  //https://docs.puppetlabs.com/facter/3.1/custom_facts.html#fact-locations
  "externalFactsFolder":"/etc/facter/facts.d"
}

var readConfigFrom = function(path, callback) {
  fs.readFile(
    path, { encoding: String() },
    function(error, data) {
      if(error) {
        callback({});
      } else {
        callback(JSON.parse(data));
      }
    });

}

var loadConfig = function(callback) {
  readConfigFrom(CONFIG_PATH, function(userConfigs) {
    var mergedConfigs = {};

    Object.assign(mergedConfigs, defaultConfigs, userConfigs);

    callback(mergedConfigs);
  });

}

module.exports = loadConfig;
