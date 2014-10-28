casper.start('http://google.fr/');

casper.thenEvaluate(function(term) {
    document.querySelector('input[name="q"]').setAttribute('value', term);
    document.querySelector('form[name="f"]').submit();
}, 'CasperJS');

casper.then(function() {
    // Click on 1st result link
    this.click('h3.r a');
});

casper.then(function() {
    console.log(this.getCurrentUrl());
    if(this.getCurrentUrl() == 'http://casperjs.org/'){
        console.log("success");
        this.exit([10]);
    }
    else{
        console.log("failure");
    }
});

casper.run();
