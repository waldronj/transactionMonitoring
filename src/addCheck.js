var fs = require('fs');
module.exports = {
    add: function(json, callback){
        start(json.check.url, function(startUrl){
            exist(json.check.transaction['step1'], function(existString){
                callback(startUrl + existString);
            }); 
        });
    },
};

String.format = function() {
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}

function start(url, callback){
    var startUrl = String.format("casper.start('{0}');\n", url);
    callback(startUrl);
}

function exist(element, callback){
    var existString = String.format("casper.then(function(){\nthis.click({0});\n});", element);
    callback(existString);
};
