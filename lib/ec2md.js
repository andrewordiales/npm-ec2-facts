// ec2 meta data
var http = require('http');

var httpOptions = {
  hostname: '169.254.169.254',
  port: '80'
}

exports.changeOption = function(opt, val) {
  if(opt in httpOptions) {
    httpOptions[opt] = val;
  }
}

exports.getEc2Data = function(shortname, dataPath, callback) {

  httpOptions.path = '/latest' + dataPath;

  http.get(httpOptions, function(response) {
    var chunkedData = '';

    response.on('data', function(responseData) {
      if(response.statusCode == '200') {
        chunkedData += responseData.toString();
      }
    });

    response.on('error', function(err) {
      console.error('EC2MD HTTP Error:', err.message);
    });

    response.on('end', function() {
      callback(shortname, chunkedData);
    });
  });

}
