// this file controls the canvas, should handle all the drawing, etc
// should be required by the toolbar controller, only, i guess
//

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

function Init(){
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  canvas.style.backgroundColor = "red";
}

function component(name, imgElement, imgInverted, x, y){
  this.name = name;
  this.imgElement = imgElement;
  this.imgInverted = imgInverted;
  this.drawn = false;
  this.selected = false;
  this.x = x;
  this.y = y;
}

var components = [];

var selectedComponent = null;

// adds a tool to the drawing queue, called by the toolbar controller
// public
function addComponent(tool){
  var defaultX = 20, defaultY = 20;

  var name = tool.getAttribute("name");
  var img = tool.getElementsByTagName("img")[0];
  var imgInverted = (tool.getAttribute("inverted") === true);
  if(!selectedComponent && components.length == 0){
    var drawX = defaultX;
    var drawY = defaultY;
  }else{
    //TODO implement connection points on components. and implement actuall
    //connection and wiring.
    var drawX = selectedComponent.x + selectedComponent.imgElement.width;
    var drawY = selectedComponent.y;
  }

  var newComponent = new component(name, img, imgInverted, drawX, drawY);
  //newComponent.selected = true;
  components.push(newComponent);
  selectedComponent = newComponent;
  drawComponents();
}

function drawComponents(){
  components.forEach((component) => {
    if(component.drawn) return;
    ctx.drawImage(component.imgElement, component.x, component.y);
    if(component.imgInverted){
      invertComponentImg(component);
    }
    component.drawn = true;
  });
}

// inverts the image of the passed component
function invertComponentImg(component) {
  var data = ctx.getImageData(component.x, component.y,
    component.imgElement.width, component.imgElement.height);
  for(var i = 0; i < data.data.length; i += 4) {
    // red
    data.data[i] = 255 - data.data[i];
    // green
    data.data[i + 1] = 255 - data.data[i + 1];
    // blue
    data.data[i + 2] = 255 - data.data[i + 2];
  }
  ctx.putImageData(data, component.x, component.y);
}


module.exports = {
  addComponent,
  Init

}
