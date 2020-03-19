// JS LOADER
 var js_loader = function(show, containerID) {
    /** 
     * show=1 hide=0
     * NOTE: Change image for loader below
     **/ 
    var imgURL          = 'https://vidyasagarf.accevate.com/img/ajax_loader.gif';
    var imgURL          = false;
    var append_html     = '';
    var styleDiv        = '';
    var containerWidth  = 0;
    var containerHeight = 0;
    var leftPos         = 0;
    if (typeof containerID !== 'undefined') { // position reletive
        container = $('#'+containerID);
        containerHeight = container.height();
        containerWidth  = container.width();
        styleDiv  += "position:relative;padding:2px;width:65px;height:65px;"; 
    } else { // position fixed
        container = $('body');
        styleDiv  += "position:fixed;padding:2px;z-index:999999;";
        containerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        containerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        // console.log(containerID,containerHeight);
    }
 
    leftPos         = parseInt(containerWidth/2) - 32;
    topPos          = parseInt(containerHeight/2) - 32;
    styleDiv        += "top:"+topPos+"px;left:"+leftPos+"px;padding:2px;";
    append_html     += '<div id="my_js_loader" class="text-center" style="'+ styleDiv +'">';
    if (!imgURL) {
        append_html     += '<div class="spinner-border text-info d-inline-block"></div>';
    } else {
        append_html     += '<img src="'+imgURL+'" width="64" height="64">';
    }
    append_html     += '</div>';
    append_html     += '<div id="backdrop_div" style="width: 100%;height: 100vh;position: fixed;z-index: 999999;left: 0;top: 0;background: #0000001f;"></div>';
    // show = 1 / hide = 0
    $('#backdrop_div').css({"background": "#cecece"}); 
    if (show == 1) {
        container.prepend(append_html);
        
    } else {
        // container.css({"background": "#fff"});
        $("#my_js_loader").remove();
        $("#backdrop_div").remove();
    }
};
 

// BS 4 Alert message to show after ajax or any other operation
var bs_alert_msg = function(msg, alert_class) {
    var bs_alert_msg = '';
    if (alert_class === undefined) {
        alert_class = 'success';
    }
    bs_alert_msg += '<div class="alert alert-'+alert_class+' alert-dismissible col-md-12">';
    bs_alert_msg += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    bs_alert_msg += '<strong>'+msg+'</strong>';
    bs_alert_msg += '</div>';
    return bs_alert_msg;
};

// Convert serialized array data of form in JSON
var serializeArrayToJSON = function(data, form_id) {
    // either pass form id or serializearray data of the form
    var rdata = {};
    if (data == undefined) {
        if (form_id == undefined) {
            alert("please provide either form id or serialize array data.");
        } else {
            data = $("#"+form_id).serializeArray();
        }
    }
    $.each(data, function(k,v){
        rdata[v.name] = v.value;
    });
    return rdata;
};
 
// Animate JS element after any event
var focusAnimate = function(paramObj) {
    Obj = {
        "elementID": paramObj.elementID,
        "timeToExecute": (paramObj.timeToExecute == undefined) ? 5000: paramObj.timeToExecute,
        "removeShadow": (paramObj.removeShadow == undefined) ? true: paramObj.removeShadow,
        "bgOpacityZero": (paramObj.bgOpacityZero == undefined) ? true: paramObj.bgOpacityZero,
    };
    // msTime = time in mili seconds
    var el = $("#"+Obj.elementID);
    var totalRunTime = 0;
    var original_bg =  $("body").css("background-color");
    el.css("box-shadow","10px 7px 10px #ccc");
    var A = 1; // opacity
    var intervalTime = 100; // time after which 
    stepA =  .03; 
    var interval = setInterval(function() {
        totalRunTime += intervalTime;
        var R = 255;
        var G = 170;
        var B = 90;
        if (A >= 0) {
            A = A.toFixed(2);
            var RGBA = 'rgb('+R+','+G+','+B+','+A+')';
            el.css("background-color",RGBA);
            console.log(Obj.bgOpacityZero,A,stepA);

            if (Obj.bgOpacityZero) { // if zero opacity allowed
                A -= stepA;
            } else { // don't decrease after .5 opacity
                var fixedOpacity = .7;
                A = (A > fixedOpacity) ? A - stepA : fixedOpacity;;
            }
        }
        if (totalRunTime > Obj.timeToExecute) {
            clearInterval(interval);
            if (Obj.bgOpacityZero) {
                el.css("background-color",original_bg);
            }
            if (Obj.removeShadow) {
                el.css("box-shadow","");
            }
            return;
        }
    },100);
};
 

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

//change bg color on input blur or select change
function setNonBlankfieldBG() {
	var inputs = document.querySelectorAll("input:not([type='button'])");
	var selects = document.querySelectorAll("select");
	inputs.forEach(function(input){
		if (input.value != '') {
			input.style.background = "#d9edf7";
		}
		// console.log(input);
	});
	selects.forEach(function(select){
		// console.log(select.value);
		if (select.value != '' && select.value.toLowerCase().indexOf('select') == -1) {
			select.style.background = "#d9edf7";
		}
	});
}
