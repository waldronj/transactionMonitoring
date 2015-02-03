var fs = require('fs');
module.exports = {
    add: function(json){
        start(json["url"]);
        for(var i in json["transaction"]){
            var action = json["transaction"][i]["action"];
            var selector = json["transaction"][i]["selector"];
            var text = json["transaction"][i]["text"];
            switch(action){
                case "exist":
                    exists(selector);
                    break;
                case "validate":
                    validate(selector, text);
                    break;
                case "fill":
                    fill(selector, text);
                    break;
                default:
                    console.log("invalid action passed");
            }
        }    
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

function start(url){
    var startUrl = String.format("casper.start('{0}');\n", url);
    console.log(startUrl);
}

function exists(selector){
    var existString = String.format("casper.then(function(){\nthis.assert({0});\n});\n", selector);
    console.log(existString);
};

function validate(selector, text){
    var existString = String.format("casper.then(function(){\nthis.contains({0});\n});\n", selector, text);
    console.log(existString);
};

function click(selector){
    var existString = String.format("casper.then(function(){\nthis.click({0});\n});\n", selector);
    console.log(existString);
};

function fill(selector, text){
    var existString = String.format("this.sendKeys(json['selector'], json['text']);\n", selector);
    console.log(existString);
};
