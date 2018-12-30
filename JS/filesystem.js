// handles all the file managment, and all the data that should be accessed
// multiple times. 

var fs = require('fs');
var _ = require('underscore');
var files = {
  toolsjson: null
}

// this is set uppon calling Init.
// handles callbacking after all async functions are done
// should be called in every load function!
var finished = null;
// this is true if an error is encountered during the loading process.
// in that case, the callback will not be called!
var crashFlag = false;
// this contains all the errors encountered during the loading process!
var errorArray = [];

// loads all the critical files. should be called on app start, as the first
// function
// public
function Init(cb){
  // cb will be called, after all files are loaded
  finished = _.after(Object.keys(files).length, () => {
    if(crashFlag){
      console.error("Filesystem failed initializing!");
      console.log(errorArray);
      //TODO Properly handle errors, with error page, etc
      return;
    }
    cb();
  });
  fs.readFile('./JSON/tools.json',(err, data) => setParseData("toolsJSON", err, data));
}

// this is the callback of all the async read functions for JSON
// filevar should be the variable in the file object, in which we want to store
// in. rawdata is the data that is passed by the read function
function setParseData(key, err, rawdata){
  if(err) {
    crashFlag = true;
    errorArray.push(err);
    finished();
    return;
  }
  files[key] = JSON.parse(rawdata);
  finished();
}


module.exports = {
  Init,
  files
}
