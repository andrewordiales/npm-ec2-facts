// ec2 meta data
var http = require('http');

var METADATA_BASE_PATH = '/latest/meta-data';

var httpOptions = {
  hostname: '169.254.169.254',
  port: '80'
}

exports.changeOption = function(opt, val) {
  if(opt in httpOptions) {
    httpOptions[opt] = val;
  }
}

exports.getMetadata = function(shortname, metadataPath, callback) {

  httpOptions.path = METADATA_BASE_PATH + metadataPath;

  http.get(httpOptions, function(response) {
    var chunkedData = '';

    response.on('data', function(responseData) {
      chunkedData += responseData.toString();
    });

    response.on('error', function(err) {
      console.error('EC2MD HTTP Error:', err.message);
    });

    response.on('end', function() {
      callback(shortname, chunkedData);
    });
  });

}
