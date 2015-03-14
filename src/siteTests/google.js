casper.test.begin('Google test, find first h3 and select it', 1, function suite(test){
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
        test.assertUrlMatch("http://casperjs.org/")
    });
    
    casper.run(function(){
        test.done();
    });
});

