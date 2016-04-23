var fs = require('fs');
var path = require('path');

function Fact(configs) {
  if (!configs) throw "Class fact error: No configs defined";
  if (!configs.externalFactsFolder) throw "Class fact error: No externalFactsFolder configured";
  if (!('factNamePrefix' in configs)) throw "Class fact error: No factNamePrefix configured";

  this.configs = configs;

}

Fact.prototype.createFilename = function(factName) {
  return 'ef-'+factName.replace(/\W/g, '-')+'.json';
}

Fact.prototype.getFactFilePath = function(factName) {
  return this.configs.externalFactsFolder+path.sep+this.createFilename(factName);
}

Fact.prototype.save = function(factName, factValue, callback) {

  var factFilePath = this.getFactFilePath(factName);

  var factObject = {};
  factObject[this.configs.factNamePrefix+factName] = factValue;

  var factString = JSON.stringify(factObject);

  try {
    fs.writeFile(factFilePath, factString, 'utf8', function(wfError) {
      if (wfError) throw wfError;
      if (callback) callback();
    });
  } catch(error) {
    console.error("Fact Error!", error.message);
  }

}

module.exports = Fact;
