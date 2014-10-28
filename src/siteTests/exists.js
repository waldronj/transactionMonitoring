casper.start('http://google.com');

casper.then(function(){
    if(this.exists('img#hplogo123')){
        console.log("success");
        this.exit([10]);
    }
    else{
        console.log("failed");
        this.exit();
    }
});

casper.run();
