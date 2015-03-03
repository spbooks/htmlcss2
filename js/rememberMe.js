function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
   } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, fxn);
   } else {
      elem['on' + event] = fxn;
   }
}
 
function loadStoredDetails(){
	if (Modernizr.localstorage) {
		var name = localStorage.getItem("name");
		var email = localStorage.getItem("email");
		var remember = localStorage.getItem("remember");
		
		if (name) {
			document.getElementById("name").value = name;
		}
		
		if (email) {
			document.getElementById("email").value = email;
		}
		
		if (remember === "true") //stored as a string, not a bool
		{
			document.getElementById("rememberme").setAttribute("checked", "checked");
		}
	}
	else {
		// no native support for HTML5 storage :(
	}
	
}
	
function saveData(){
	if (Modernizr.localstorage) {
	// We need to check that the checkbox is ON, not just 
	// that's it's been clicked (the change event is also fired for
	// UNchecking the box).
		if (document.getElementById("rememberme").checked === true) {
			var name = document.getElementById("name").value;
			var email = document.getElementById("email").value;
			
			localStorage.setItem("name", name);
			localStorage.setItem("email", email);
			localStorage.setItem("remember", true);
		}
		// if they uncheck the "remember me" checkbox, clear out
		// all the values
		else {
			localStorage.clear();			
		}
	}
	else {
		// no native support for Web storage :(
	}
}	

loadStoredDetails();
var rememberMe = document.getElementById("rememberme");
addEvent('change', rememberMe, saveData);