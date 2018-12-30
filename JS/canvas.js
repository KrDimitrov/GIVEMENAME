// this file controls the canvas, should handle all the drawing, etc
// should be required by the toolbar controller, only, i guess
//

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

function component(name, imgElement, imgInverted, x, y){
  this.name = name;
  this.imgElement = imgElement;
  this.imgInverted = imgInverted;
  this.drawn = false;
  this.x = x;
  this.y = y;
}

var components = [];

// adds a tool to the drawing queue, called by the toolbar controller
// public
function addComponent(tool){
  var name = tool.getAttribute("name");
  var img = tool.getElementsByTagName("img")[0];
  var imgInverted = tool.getAttribute("inverted");

  var newComponent = new component(name, img, imgInverted, 20, 20);
  components.push(newComponent);
  drawComponents();
}

function drawComponents(){
  components.forEach((component) => {
    if(component.drawn) return;
    ctx.drawImage(component.imgElement, component.x, component.y);
    if(component.imgInverted){
      var data = ctx.getImageData(component.x, component.y,
        component.imgElement.width, component.imgElement.height);
      console.log("data before\n");
      console.log(data);
      for(var i = 0; i < data.data.length; i += 4) {
        // red
        data.data[i] = 255 - data.data[i];
        // green
        data.data[i + 1] = 255 - data.data[i + 1];
        // blue
        data.data[i + 2] = 255 - data.data[i + 2];
      }
      ctx.putImageData(data, component.x, component.y);
      console.log(data);
    }
  });
}

module.exports = {
  addComponent

}
