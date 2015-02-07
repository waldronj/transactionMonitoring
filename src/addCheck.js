var fs = require('fs');
module.exports = {
    add: function(json){
        var casperTest = [];
        casperTest.push(start(json["check"], json["transaction"].length, json["url"]));
        for(var i in json["transaction"]){
            var action = json["transaction"][i]["action"];
            var selector = json["transaction"][i]["selector"];
            var text = json["transaction"][i]["text"];
            switch(action){
                case "present":
                    casperTest.push(present(selector));
                    break;
                case "validate":
                    casperTest.push(validate(selector, text));
                    break;
                case "fill":
                    casperTest.push(fill(selector, text));
                    break;
                case "click":
                    casperTest.push(click(selector));
                default:
                    console.log("invalid action passed");
            }
        }
        casperTest.push(end());
        console.log(casperTest);
        saveCheck(json["check"], casperTest);
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

function start(checkName, testCount, url){
    var testStart = String.format("casper.test.begin(\"{0}\", {1}, function suite(test) {casper.start(\"{2}\");" , checkName, testCount, url);
    return testStart;
}

function present(selector){
    var stringPresent = String.format("casper.then(function(){test.assertExists(\"{0}\",\"{0} found\");});" , selector);
    return stringPresent;
};

function validate(selector, text){
    var validate = String.format("casper.then(function(){test.assertExists(\"{0}\",\"{0} found\");});", selector, text);
    return existString;
};

function click(selector){
    var existString = String.format("casper.then(function(){this.click({0});});", selector);
    return existString;
};

function fill(selector, text){
    var existString = String.format("this.sendKeys(json['selector'], json['text']);", selector);
    return existString;
};

function end(){
    var end = String.format("casper.run(function(){test.done();});});")
    return end;
}

function saveCheck(check, casperTest){
    for(var i in casperTest){
        console.log(casperTest[i]);
        fs.appendFile("./siteTests/" + check + ".js", casperTest[i], function(err) {
            if(err) return console.log(err);
        });
    }
}
