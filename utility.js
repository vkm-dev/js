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
