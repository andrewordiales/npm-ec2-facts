var fs = require('fs');
var path = require('path');

var CONFIG_FILENAME = 'ec2-facts.conf.json';

var PROCESS_PLATFORM = process.platform;

var PLATFORM_WINDOWS = 'win32';
var PLATFORM_LINUX = 'linux'

var configFolderMap = {
  PLATFORM_LINUX: '/etc',
  PLATFORM_WINDOWS: process.env['ALLUSERSPROFILE']+path.sep+'ec2-facts'
}

//https://docs.puppetlabs.com/facter/3.1/custom_facts.html#fact-locations
var defaultExternalFactsFolderMap = {
  PLATFORM_LINUX: '/etc/facter/facts.d',
  PLATFORM_WINDOWS: process.env['ALLUSERSPROFILE']+path.sep+'PuppetLabs'+path.sep+'facter'+path.sep+'facts.d'
}

var defaultConfigs = {
  'externalFactsFolder': defaultExternalFactsFolderMap[PROCESS_PLATFORM],
  'factNamePrefix': ''
}

function getDefaultConfigFolder() {
  return configFolderMap[PROCESS_PLATFORM];
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
