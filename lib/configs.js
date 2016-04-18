var fs = require('fs');
var path = require('path');

var CONFIG_FILENAME = 'ec2-facts.conf.json';
var CONFIG_FOLDER = '/etc';

var defaultConfigs = {
  //https://docs.puppetlabs.com/facter/3.1/custom_facts.html#fact-locations
  "externalFactsFolder":"/etc/facter/facts.d",
  "factNamePrefix":""
}

function getConfigPath(configPath) {
  return configPath+path.sep+CONFIG_FILENAME;
}

function readConfigFrom(configPath, callback) {
  fs.readFile(configPath, { encoding: String() },
    function(error, data) {
      if(error) {
        callback({});
      } else {
        callback(JSON.parse(data));
      }
    });
}

function loadConfig(callback, userConfigFolder) {
  userConfigFolder = userConfigFolder || CONFIG_FOLDER;

  readConfigFrom(getConfigPath(userConfigFolder), function(userConfigs) {
    var mergedConfigs = {};

    //Object.assign(mergedConfigs, defaultConfigs, userConfigs);
    mergedConfigs = JSON.parse(JSON.stringify(defaultConfigs));

    for(var userKey in userConfigs) {
      mergedConfigs[userKey] = userConfigs[userKey];
    }

    callback(mergedConfigs);
  });
}

module.exports = loadConfig;
