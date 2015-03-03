function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
   } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, fxn);
   } else {
      elem['on' + event] = fxn;
   }
}

// bind the dragstart event on the mice  
var mice = document.querySelectorAll('#mouseContainer img');
var mouse = null;
for (var i=0; i < mice.length; i++) {
  mouse = mice[i];
  mouse.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', this.id); 
  });
}

// bind the dragover event on the cat
var cat = document.getElementById('cat');
addEvent('dragover', cat, function(event) {
  event.preventDefault();
});

// bind the drop event on the cat
addEvent('drop', cat, function(event) {
  var mouseHash = {
     mouse1: 'NOMNOMNOM',
     mouse2: 'Mreow',
     mouse3: 'Purrrrrr...'
   };

	var ch = document.getElementById('catHeading');

	// change text of the header based on which mouse was dropped
  var mouseID = event.dataTransfer.getData('text/plain');
	ch.innerHTML = mouseHash[mouseID];	
	
	// get the img element for the mouse, and then remove it
	var mousey = document.getElementById(mouseID);
  mousey.parentNode.removeChild(mousey);
	
	event.preventDefault();  
});


