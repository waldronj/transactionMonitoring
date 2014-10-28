casper.start('http://google.com');

casper.then(function(){
    if(this.exists('img#hplogo')){
        console.log("success");
        this.exit([10])
    }
    else{
        console.log("failed");
    }
});

casper.run();
