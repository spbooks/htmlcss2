function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
   } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, fxn);
   } else {
      elem['on' + event] = fxn;
   }
}	

function determineLocation() {
    if (navigator.onLine) {
      if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(displayOnMap);
  
        var container = Raphael(document.getElementById("spinner"), 125, 125);
        var spinner = container.image("images/spinnerBW.svg", 0, 0, 125, 125);
        var attrsToAnimate = { transform: "r720" }; 
    		spinner.animate(attrsToAnimate, 60000);        
      }
      else {
        // geolocation is not supported in this browser
        // we can use the geo-location-javascript polyfill
  	  // https://code.google.com/p/geo-location-javascript/
      }
    } 
    else {	
      alert("You must be online to use this feature.");
    }
}

function displayOnMap(position) {
    document.getElementById("spinner").style.display = "none";
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    // Let's use Google Maps to display the location 
    var myOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById("geoForm"), myOptions);
    
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    
    var marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: "Hello World!"
    });
    
    map.setCenter(initialLocation);   
}

var geobutton = document.getElementById('geobutton');
addEvent('click', geobutton, determineLocation);