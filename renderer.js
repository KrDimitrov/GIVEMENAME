// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var filesystem = require('./JS/filesystem.js');
var toolbar = require('./JS/toolbar.js');
var pagesystem = require('./JS/pagesystem.js');

document.getElementById("statusLine").innerHTML = "Initializing Filesystem...";

filesystem.Init(() => filesystemInitialized());
// execution proceeds after filesystem is done initializing
// if an error is encountered during initialization, the callback will never be
// called. The error should be handeled in filesystem.js
function filesystemInitialized() {
  document.getElementById("statusLine").innerHTML = " Initializing Toolbar...";
  toolbar.Init();

  doneLoading();
}

function doneLoading(){
  document.getElementById("statusLine").innerHTML = "Done!";
  pagesystem.switchToPage("mainPage");
}
