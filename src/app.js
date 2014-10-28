var Hapi = require('hapi');
var server = new Hapi.Server(3000);

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Transaction Monitoring');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log(request.params.name);
        var spawn = require('child_process').spawn,
        start = new Date();
        casper = spawn('casperjs', ['test', './siteTests/' + request.params.name + '.js']);
        
        casper.stdout.on('data', function (data) {
            console.log('' + data);
        });
        
        casper.on('exit', function(code){
            end = new Date()
            elapsed = start - end
            elapsed = elapsed * -1
            if(code== 10){
                rdata = '<pingdom_http_custom_check><status>ok</status><response_time>' + elapsed + '</response_time></pingdom_http_custom_check>';
            }
            else{
                rdata = '<pingdom_http_custom_check><status>down</status><elapsed>' + elapsed + '</time><pingdom_http_custom_check>';
            }
            reply(rdata).type('text/xml');
        });
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
