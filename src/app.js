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
        casper = spawn('casperjs', ['test', './siteTests/' + request.params.name + '.js']);

        results = casper.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
        });
        reply(results);
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
