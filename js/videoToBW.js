function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
   } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, fxn);
   } else {
      elem['on' + event] = fxn;
   }
}	

function makeVideoOldTimey ()
{
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvasOverlay");
    var context = canvas.getContext("2d");
    
    var still = document.getElementById("video-still");
    
    // draw a black and white version of the video poster to display by default
    drawOneFrame(still,context,canvas);
	
    video.addEventListener("play", function(){
      draw(video,context,canvas);
    },false);

}

function draw(video, context, canvas) {
  if (video.paused || video.ended) return false;
    
	drawOneFrame(video, context, canvas);
	
  // Start over!
  setTimeout(function(){ draw(video, context, canvas); }, 0);
}

function drawOneFrame(video, context, canvas){
	// draw the video onto the canvas
	context.drawImage(video, 0, 0, canvas.width, canvas.height);

	// wrap the call to getImageData in a try/catch
	// if the page is viewed locally from the computer in Chrome
	// or Firefox, a Security exception will be thrown, and we'll skip
	// the canvas manipulation, simply playing the color video	
	try {
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var pixelData = imageData.data;
		// Loop through the red, green and blue pixels, turning them grayscale
    var red, green, blue, greyscale;
		for (var i = 0; i < pixelData.length; i += 4) {
			red = pixelData[i];
			green = pixelData[i + 1];
			blue = pixelData[i + 2];
			//we'll ignore the alpha value, which is in position i+3
			
			greyscale = red * 0.3 + green * 0.59 + blue * 0.11;
			
			pixelData[i] = greyscale;
			pixelData[i + 1] = greyscale;
			pixelData[i + 2] = greyscale;
		}
				
		context.putImageData(imageData, 0, 0);
	} 
	catch (err) {
		
		// clear the canvas 
		context.clearRect (0,0,canvas.width,canvas.height);
		
		canvas.style.backgroundColor = "transparent";
		//write an error message to the canvas
		context.fillStyle = "white";
		context.textAlign = "left";
		context.font = "18px LeagueGothic, Tahoma, Geneva, sans-serif";
		context.fillText("There was an error rendering ",10,20);
		context.fillText("the video to the canvas.",10,40);
		context.fillText("Perhaps you are viewing this page from",10,70);
		context.fillText("a file on your computer?",10,90);
		context.fillText("Try viewing this page online instead.",10,130);
		
		return false;
	}
}

addEvent("DOMContentLoaded", document, makeVideoOldTimey);
