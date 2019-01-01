// this is the file that controls the toolbar, i.e aside #toolbar

// lets store this as "filesystem", so we dont confuse it with node fs!
var filesystem = require('./filesystem.js');
var canvasController = require('./canvas.js');

// inits the toolbar: loads all tools, etc
//public
function Init(){
  var toolbar = document.getElementById("toolbar");

  filesystem.files.toolsJSON.forEach(function(tool) {

    var div = document.createElement("div");
    div.classList.add("tool");
    div.setAttribute("name", tool.name);
    div.setAttribute("inverted", tool.imgInverted);

    var img = document.createElement("img");
    img.setAttribute('src', tool.imgPath);
    if(tool.imgInverted){
      img.setAttribute('class', "inverted");
    }
    div.addEventListener('click', componentClicked);
    div.appendChild(img);
    toolbar.appendChild(div);
  });
}

function componentClicked(event){
  //if user clicked the element that is currently selected, we know he
  //double selected, aka double clicked the tool!
  if(this.getAttribute('id') == "selected"){
    console.log("double clicked!");
    componentDoubleClicked(this);
    return;
  }
  //first, reset the other selected element, should be unique, right?
  var selected = document.getElementById('selected');
  if(selected != null) selected.removeAttribute('id');
  this.setAttribute('id', 'selected');
}

function componentDoubleClicked(component){
  canvasController.addComponent(component);
}


module.exports = {
  Init
}
