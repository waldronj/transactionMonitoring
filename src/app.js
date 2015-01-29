var Hapi = require('hapi');
var fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 3000 });

exports.register = function (server, options, next) {

    files.relativeTo(__dirname)
    console.log(server.realm.modifiers.route.prefix);
    return next();
};

function getData(file, callback){
    var rData = "";
    fs.readFile(file, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            callback(data);
        }
        else{
            console.log(err);
        }
    });
}

server.route({
    method: 'POST',
    path: '/api/1.0/check/add',
    handler: function (request, reply) {
        console.log(request.payload);
        getData('/Users/jwaldron/data.json', function(data){
            reply(data);
        });
    }
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('./views/index.html');
    }
});

server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
        directory: {
            path: './public'
        }
    }
});

server.route({
    method: 'GET',
    path: '/checks/{name}',
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
            elapsed = (end - start) / 1000
            if(code == 10){
                rdata = '<pingdom_http_custom_check><status>ok</status><response_time>' + elapsed + '</response_time></pingdom_http_custom_check>';
            }
            else{
                rdata = '<pingdom_http_custom_check><status>down</status><response_time>' + elapsed + '</response_time></pingdom_http_custom_check>';
            }
            reply(rdata).type('text/xml');
        });
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
