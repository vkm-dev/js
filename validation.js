// validate checkEmail
var checkEmail = function() {
    var email = document.getElementById('posterEmail');
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email.value)) {
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }
};


// Is url
var is_url = function(str) {
	var regEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ig;
   	if (str.match(regEx)) {
     return true;
   	} else {
   	  return false;
   	}
};

// Is Domain
var is_domain = function(str) {
	var ptrn = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ig;
 	console.log(str.match(ptrn+str));
    if (str.match(ptrn)) {
    	return true;
    }
    return false;
};


// validateEmail
var validateEmail = function(str) {
    var strLen  = str.length;
    var posAt   = str.indexOf("@");
    var posDot  = str.lastIndexOf(".");
    if (posAt > -1 && posDot > -1) {
        if (posAt < 2) { // before @ there is not 2 characters
            return "There must be at least 2 character before @ symbol.";
        } else if (posDot < posAt) {
            return "There must be one dot (.) after @ symbol.";
        } else {
            if ((strLen - posDot) < 2) {
                return "There must be at least 1 character after dot (.) symbol."
            } else if((posDot - posAt) < 3) {
                return "There must be at least 2 character after @ symbol."
            }  else {
                return false;
            }
        }
    } else {
        return "Email must contain @ and dot (.) character";
    }
    return false;
};

// Validate password

var validPassword = function(psw) { 
    if (psw.match(/[a-z]/g) && 
    psw.match(/[A-Z]/g) && 
    psw.match(/[0-9]/g) && 
    psw.match(/[^a-zA-Z\d]/g) && 
    psw.length >= 8) {
	    return true; 
    } else {
	    return false; 
    }
};

