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

// getSelectedOptionText
function getSelectedOptionText(selectElelentID) {
  var sel	= document.getElementById(selectElelentID);
  var selOpt = sel.options[sel.selectedIndex];
  if (selOpt !== undefined) {
    return selOpt.innerText;
  } else {
    return '';
  }
}

// setNonBlankfieldBG
document.querySelectorAll("select").forEach(function(sel,i){
    	sel.addEventListener("change",setNonBlankfieldBG);
	});
	document.querySelectorAll("input").forEach(function(sel,i){
    	sel.addEventListener("blur",setNonBlankfieldBG);
	});
	// on change of input change bg color if value not blank 
	function setNonBlankfieldBG() {
		$("input:not([type='button']):not([type='submit']):not([type='reset'])").css({"background":"#fff"});
		$("select").css({"background":"#fff"});
		var inputs = document.querySelectorAll("input:not([type='button']):not([type='submit']):not([type='reset'])");
		var selects = document.querySelectorAll("select");
		console.log(inputs);
		inputs.forEach(function(input){
			if (input.value != null && input.value.trim() != '') {
				input.style.background = "#eafbfb";
			}
		});
		selects.forEach(function(select){
			// //console.log(select.value);
			if (select.value != '' && select.value != '0' && select.value != 'null' && select.value.toLowerCase().indexOf('select') == -1) {
				select.style.background = "#eafbfb";
			}
		});
	}


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
