// ec2 meta data
var http = require('http');

var METADATA_BASE_PATH = '/latest/meta-data/';

var httpOptions = {
  hostname: '169.254.169.254',
  port: '80'
}

var metaDataCategoryPathMap = {
  "availability-zone":"placement/availability-zone",
  "instance-id":"instance-id",
  "instance-type":"instance-type",
  "ami-id":"ami-id",
  "ami-launch-index":"ami-launch-index"
}

function getMetaData(metaDataCategory, callback) {

  httpOptions.path = METADATA_BASE_PATH + metaDataCategoryPathMap[metaDataCategory];

  http.get(httpOptions, function(response) {
    var chunkedData = '';

    response.on('data', function(responseData) {
      chunkedData += responseData.toString();
    });

    response.on('error', function(err) {
      console.error('AWSMD HTTP Error:', err.message);
    });

    response.on('end', function() {
      callback(metaDataCategory, chunkedData);
    });
  });

}

exports.changeOption = function(opt, val) {
  if(opt in httpOptions) {
    httpOptions[opt] = val;
  }
}

exports.getInstanceId = function(callback) {
  getMetaData('instance-id', callback);
}

exports.getAvailabilityZone = function(callback) {
  getMetaData('availability-zone', callback);
}

exports.getInstanceType = function(callback) {
  getMetaData('instance-type', callback);
}

exports.getAmiId = function(callback) {
  getMetaData('ami-id', callback);
}

exports.getAmiLaunchIndex = function(callback) {
  getMetaData('ami-launch-index', callback);
}
