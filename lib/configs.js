var fs = require('fs');
var path = require('path');

var CONFIG_FILENAME = 'ec2-facts.conf.json';

var configFolderMap = {
  "linux":"/etc",
  "win32":process.env['ALLUSERSPROFILE']+path.sep+'ec2-facts'
}

var defaultConfigs = {
  //https://docs.puppetlabs.com/facter/3.1/custom_facts.html#fact-locations
  "externalFactsFolder":"/etc/facter/facts.d",
  "factNamePrefix":""
}

function getDefaultConfigFolder() {
  return configFolderMap[process.platform];
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
  userConfigFolder = userConfigFolder || getDefaultConfigFolder();

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
