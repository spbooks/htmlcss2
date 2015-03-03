function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
   } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, fxn);
   } else {
      elem['on' + event] = fxn;
   }
}

function drawRectangle() {
	var canvas = document.getElementById("demo1");
	var context = canvas.getContext("2d");
	context.strokeStyle = "red";
	context.fillStyle = "rgba(0, 0, 255, 0.50)";
	context.fillRect(10,10,100,100);
	context.strokeRect(10,10,100,100);	
}

function drawPattern() {
    var canvas = document.getElementById("demo2");
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";

    var img = new Image();
    img.src = "images/bg-bike.png";
    img.onload = function() {
      var pattern = context.createPattern(img, "repeat");
      context.fillStyle = pattern;
      context.fillRect(10,10,100,100);
      context.strokeRect(10,10,100,100);  
    };
}

function drawGradient() {
  var canvas = document.getElementById("demo3");
  var context = canvas.getContext("2d");
  context.strokeStyle = "red";

  var gradient = context.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0,"blue"); 
  gradient.addColorStop(1,"white");
  context.fillStyle = gradient;
  context.fillRect(10,10,100,100);
  context.strokeRect(10,10,100,100);
}

function drawCircle(canvas) {
    var context = canvas.getContext("2d");

    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3;
    context.fill();
    context.stroke();	
}

function saveDrawing() {
	var canvas5 = document.getElementById("demo5");
	window.open(canvas5.toDataURL("image/png"));
}

function drawImageToCanvas() {
    var canvas = document.getElementById("demo6");
    var context = canvas.getContext("2d");
    var image = document.getElementById("myImageElem");
    context.drawImage(image, 0, 0);
}

function manipulateImage() {
    var canvas = document.getElementById("demo7");
    var context = canvas.getContext("2d");
    var image = document.getElementById("secondImage");
    context.drawImage(image, 60, 60);

    var imageData = context.getImageData(0, 0, 200, 200);

    var red, green, blue, greyscale;    
    for (var i = 0; i < imageData.data.length; i += 4) {
      red = imageData.data[i];
      green = imageData.data[i + 1];
      blue = imageData.data[i + 2];
        
      greyscale = red * 0.3 + green * 0.59 + blue * 0.11;
        
      imageData.data[i] = greyscale;
      imageData.data[i + 1] = greyscale;
      imageData.data[i + 2] = greyscale;
    } 
    context.putImageData(imageData, 0, 0);
}

var button = document.getElementById("saveButton");
addEvent('click', button, saveDrawing);

drawRectangle();
drawPattern();
drawGradient();

var canvas4 = document.getElementById("demo4");

drawCircle(canvas4);


var canvas5 = document.getElementById("demo5");
drawCircle(canvas5);

addEvent('load', window, drawImageToCanvas);
addEvent('load', window, manipulateImage);
