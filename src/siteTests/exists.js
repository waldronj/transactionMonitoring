casper.test.begin('Google test, ensure logo exists', 1, function suite(test){
    casper.start('http://google.com');

    casper.then(function(){
        test.asserExists('img#hplogo123')
    });

    casper.run(function(){
        test.done();
    });
});
