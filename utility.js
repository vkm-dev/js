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

// timer 
function Timer(dateTimeString,elementIDToShowTimer) {
    this.timer = null;
    this.dateTimeString = dateTimeString; // format "Jan 5, 2021 15:37:25"
    this.elementIDToShowTimer = elementIDToShowTimer;
}

Timer.prototype.countDown = function(callBack) {
    // console.log(this.dateTimeString,this.elementIDToShowTimer);
    var countDownDate = new Date(this.dateTimeString).getTime();
    // Update the count down every 1 second
    var elID = this.elementIDToShowTimer;
    var timer = this.timer;
    timer = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var el = document.getElementById(elID);
        if (el && el != null && el != undefined) {
            el.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(timer);
                el.innerHTML = "";
                if (typeof callBack != undefined) {
                    callBack();
                }
            }
        } else {
            clearInterval(timer);
        }
    }, 1000);
};

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#profile_img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}
// use readURL
$("body").on("change", "#pic_btn", function() {
    readURL(this);
});

// javascript search in table and recalculate sum in table foote
$(document).ready(function(){
    var noSearchClass = ['no-search','child']; // search will not be made in tr having this class (like table header)
    $(".jsSearchInTable").on("keyup", function(){
        // variable to calculte and manage sum in table footer
        var trSumFooter = '';
        var totalSum = [];
        var filteredTrList = [];
        var hiddenColsIndex = [];
        var numericColsIndex = [];
        var currencyColsIndex = [];
        var txtAlignClsColIndex = [];
        var currency = "{{session('currency')}}";
        if ($("#reportData table thead tr.mainHeader").length > 0) {
            var allCols = $("#reportData table thead tr.mainHeader th");
        } else {
            var allCols = $("#reportData table thead tr th");
        }
        $.each(allCols, function(i,th){
            if($(th).hasClass('numericCol')) {
                numericColsIndex.push(i);
            }
            if($(th).hasClass('d-none') || $(th).css('display') == 'none') {
                hiddenColsIndex.push(i);
            }
            if($(th).hasClass('text-center')) {
                txtAlignClsColIndex[i] = 'text-center';
            } else if($(th).hasClass('text-left')) {
                txtAlignClsColIndex[i] = 'text-left';
            } else if($(th).hasClass('text-right')) {
                txtAlignClsColIndex[i] = 'text-right';
            } else {
                txtAlignClsColIndex[i] = '';
            }
        });

        //console.log(allCols,numericColsIndex,hiddenColsIndex);
        var q = $(this).val();
        var searchT;
        var trList = $("#reportData table tr");
        if (q.length > 0) {
            clearTimeout(searchT);
            searchT = setTimeout(function(){
                $.each(trList, function(i,tr){
                    if (tr.parentNode.nodeName != 'THEAD') {
                        var innerTxt = tr.innerText;
                        innerTxt = innerTxt.toString().replace("\t", " ");
                        if (innerTxt.toLowerCase().indexOf(q.toLowerCase()) < 0) {
                            tr.style.display = 'none';
                        } else {
                            filteredTrList.push(tr); // get all filtered tr 
                            tr.style.display='';
                        }
                        // if last row of table and row is for showing total sum of all rows data
                        if(i == trList.length - 1 && innerTxt.toLowerCase().indexOf('total') < 0) {
                            tr.style.display = 'none';
                        }
                    }
                });
                // Code to calculate sum in table footer
                if (numericColsIndex) {
                    // initialize sum array
                    for (i=0;i<allCols.length;i++) {
                        totalSum[i] = "";
                    }
                    // calculate sum and store in array
                    $.each(filteredTrList, function(i,tr){
                        var tds = tr.children;
                        //console.log(tds,numericColsIndex);
                        $.each(numericColsIndex, function(i,v){
                            let totStr = tds[v].innerText;
                            if (totStr.toString().indexOf(currency) >= 0) {
                               currencyColsIndex[v] = v;
                            }
                            totStr = totStr.replace(currency,"");
                            totStr = totStr.toString().trim();
                            let tot = parseFloat(totStr);
                            let oldSum = (totalSum[v] == "") ? 0 : totalSum[v];
                            totalSum[v] = (oldSum + tot);
                        });
                    });
                    // create tr element to be appended in last 
                    for (i=0;i<allCols.length;i++) {
                        var hidden = hiddenColsIndex.includes(i) ? "style='display:none;'" : '';
                        let moneySign = currencyColsIndex.includes(i) ? currency : '';
                        let totalAmt = currencyColsIndex.includes(i) ?  totalSum[i].toFixed(2): totalSum[i];
                        let txtAlignCls = txtAlignClsColIndex[i];
                        trSumFooter += `
                           <td ${hidden} class="${txtAlignCls} text-bold">${moneySign + totalAmt}</td>     
                        `;
                    }
                    trSumFooter = `<tr class="jsSumTr">${trSumFooter}</tr>`;
                    $("#reportData table").append(trSumFooter);
                    //console.log(totalSum);
                }
            }, 10);
        } else {
            trList.css("display","");
            $("#reportData table tr.jsSumTr").remove();
        }

    });

});
