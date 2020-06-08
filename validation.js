// make variable blank if undefined
function str(variable) {
    if (typeof variable != 'undefined') {
	if (variable == null) {
	    variable = '';
	}
	return variable;
    }
    return '';
}
// check if null
function checkNull(variable) {
    if (typeof variable != 'undefined') {
	if (variable == null) {
	    return true;
	}
	return false;
    }
    return undefined;
}

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

function ValidateEmail(email) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    return (false)
}



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

// Form validation constructor function
// (function(){
    function FormValidation(formID) {
        // Note: add 'validation_field_name' in data attribute in each element to get the label of the input to be shown in error message e.g = data-fieldLabel='User Name'
        var formID              = formID || false;
        if (!formID) {
            alert('FormValidation() constructor function needs form id as required parameter');
            return;
        } else {
            formID              = '#'+formID+' ';
        }
        this.errDetailObj       = []; // object to store error details
        this.validateInputClass = ['phone','mobile','email','aadhar']; // NOTE: add these class to element for respective validation
        this.exceptionClasses   = ['no-validation', 'do-not-validate', 'no-validate']; // NOTE: add class 'no-validation' or 'do-not-validate' or 'no-validate' to element which not to be included in validation
        this.inputAll           = document.querySelectorAll(formID+'input');
        this.selectAll          = document.querySelectorAll(formID+'select');
        this.textareaAll        = document.querySelectorAll(formID+'textarea');
        this.inputValue         = null;
        this.errMessage         = false;
        
    }

    FormValidation.prototype.validate = function() {
        var errDetailObj        = [];
        var exceptionClasses    = this.exceptionClasses;
        // validate input fields
        this.inputAll.forEach((element, index) => {
            var inputName   = element.dataset.validation_field_name;
            var inputValue  = element.value;
            var inputType   = element.type;
            var isReadOnly  = element.getAttribute('readonly');
            var isDisabled  = element.getAttribute('disabled');
            var elClassList = element.getAttribute('class');
            var exceptionEl = false;
            this.inputValue = inputValue; 
            for(var i=0; i<exceptionClasses.length; i++){
                if (elClassList != null && elClassList.indexOf(exceptionClasses[i]) >= 0) {
                    exceptionEl = true;
                }
            }

            // bs selectpicker dynamically generated text box for live search
            var noNameElement = (element.name == "") ? true : false; 
            var noIDElement = (element.id == "") ? true : false; 
            var validToBeChecked =  !exceptionEl && 
                                    !noNameElement &&
                                    !noIDElement &&
                                    isReadOnly == null && 
                                    isDisabled == null && 
                                    inputType != 'button' && 
                                    inputType != 'submit' && 
                                    inputType != 'reset';
            if (validToBeChecked) {
                element.style.border = '';
                if (inputValue == '' || inputValue == null || inputValue == undefined) {
                    if (inputName != null && inputName != '' && typeof inputName !== undefined) {
                        this.errMessage = inputName + ' can not be blank.';
                    } else {
                        this.errMessage = 'Please enter all mandatory field.';
                    }
                    errDetailObj.push({"inputName":element.name, "inputID":element.id, "inputType":inputType,"errMessage": this.errMessage,"elementObj":element});
                    element.style.outline = '1px solid #f60707';
                } 
                // else if (inputType == 'radio' || inputType == 'checkbox') {
                //     this.errMessage = 'Please select all mandatory field.';
                //     alert(element.name);
                //     errDetailObj.push({"inputName":element.name, "inputID":element.id, "inputType":inputType,"errMessage": this.errMessage,"elementObj":element});
                //     element.style.outline = '1px solid #f60707';
                // } 
                else {
                    var validInput = true;
                    if (elClassList != null && (elClassList.indexOf('phone') >= 0 || elClassList.indexOf('mobile') >= 0)) {
                        validInput = this.validatePhone(inputValue);
                    }
                    if (elClassList != null && elClassList.indexOf('pincode') >= 0) {
                        validInput = this.validatePincode(inputValue);
                    }
                    if (elClassList != null && elClassList.indexOf('aadhar') >= 0) {
                        validInput = this.validateAadhar(inputValue);
                    }
                    if (elClassList != null && elClassList.indexOf('email') >= 0) {
                        validInput = this.validateEmail(inputValue);
                    }
                    console.log(validInput,this.errMessage);
                    if (!validInput) {
                        errDetailObj.push({"inputName":element.name, "inputID":element.id, "inputType":inputType,"errMessage": this.errMessage,"elementObj":element});
                        element.style.outline = '1px solid #f60707';
                    }
                }
            }
        });

        // validate select fields
        this.selectAll.forEach((element, index) => {
            var inputName   = element.dataset.inputNameDataAttr;
            var inputValue     = element.value;
            var inputType      = element.type;
            var isReadOnly  = element.getAttribute('readonly');
            var isDisabled  = element.getAttribute('disabled');
            var elClassList = element.getAttribute('class');
            var exceptionEl = false;
            var errDetail   = {};
            for(var i=0; i<exceptionClasses.length; i++){
                if (elClassList != null && elClassList.indexOf(exceptionClasses[i]) >= 0) {
                    exceptionEl = true;
                }
            }
            // bs selectpicker dynamically generated text box for live search
            var noNameElement = (element.name == "") ? true : false; 
            var noIDElement = (element.id == "") ? true : false;
            var validToBeChecked =  !exceptionEl && 
                                    !noNameElement &&
                                    !noIDElement &&
                                    isReadOnly == null && 
                                    isDisabled == null;
                                    
            if (validToBeChecked) {
                element.style.border = '';
                if (inputValue == '' || inputValue == null || inputValue == undefined) {
                    if (inputName != null && inputName != '' && typeof inputName !== undefined) {
                        this.errMessage = inputName + ' can not be blank.';
                    } else {
                        this.errMessage = 'Please select all mandatory field.';
                    }
                    errDetailObj.push({"inputName":element.name, "inputID":element.id, "inputType":inputType,"errMessage": this.errMessage,"elementObj":element});
                    element.style.border = '1px solid #f60707';
                }
            }
        });

        // validate select fields
        this.textareaAll.forEach((element, index) => {
            var inputName   = element.dataset.inputNameDataAttr;
            var inputValue     = element.innerHTML;
            var inputType      = element.type;
            var isReadOnly  = element.getAttribute('readonly');
            var isDisabled  = element.getAttribute('disabled');
            var elClassList = element.getAttribute('class');
            var exceptionEl = false;
            var errDetail   = {};
            for(var i=0; i<exceptionClasses.length; i++){
                if (elClassList != null && elClassList.indexOf(exceptionClasses[i]) >= 0) {
                    exceptionEl = true;
                }
            }
            // bs selectpicker dynamically generated text box for live search
            var noNameElement = (element.name == "") ? true : false; 
            var noIDElement = (element.id == "") ? true : false;
            var validToBeChecked =  !exceptionEl && 
                                    !noNameElement &&
                                    !noIDElement &&
                                    isReadOnly == null && 
                                    isDisabled == null;
                                    
            if (validToBeChecked) {
                element.style.border = '';
                if (inputValue == '' || inputValue == null || inputValue == undefined) {
                    if (inputName != null && inputName != '' && typeof inputName !== undefined) {
                        this.errMessage = inputName + ' can not be blank.';
                    } else {
                        this.errMessage = 'Please enter all mandatory field.';
                    }
                    errDetailObj.push({"inputName":element.name, "inputID":element.id, "inputType":inputType,"errMessage": this.errMessage,"elementObj":element});
                    element.style.border = '1px solid #f60707';
                }
            }
        });
        if (errDetailObj.length > 0) {
            this.errDetailObj = errDetailObj;
            this.errDetailObj[0].elementObj.focus();
            return false;
        } else {
            return true;
        }
    }
    
    FormValidation.prototype.getMessage =  function() {
        if (this.errDetailObj.length > 0) {
            // return first error as message because it is focused 
            return this.errDetailObj[0].errMessage; 
        }
    }

    FormValidation.prototype.validatePhone = function() {
        var regEx = /^\d{10}$/;
        if (this.inputValue.match(regEx)) {
            return true;
        } else {
            this.errMessage = "Phone/Mobile number should be 10 digit number.";
            return false;
        }
    }

    FormValidation.prototype.validateAadhar = function(inputValue) {
        var regEx = /^\d{12}$/;
        if (inputValue.match(regEx)) {
            return true;
        } else {
            this.errMessage = "AADHAR number should be 12 digit number.";
            return false;
        }
    }

    FormValidation.prototype.validatePincode = function(inputValue) {
        var regEx = /^\d{6}$/;
        if (inputValue.match(regEx)) {
            return true;
        } else {
            this.errMessage = "Pincode should be 6 digit number.";
            return false;
        }
    }
    
    FormValidation.prototype.validateEmail = function() {
        var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.inputValue.match(regEx)) {
            return true;alert();
        } else {
            this.errMessage = "Please enter valid email ID.";
            console.log(this.errMessage);
            return false;
        }
    }
// })();

