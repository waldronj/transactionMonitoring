var Hapi = require('hapi');
var server = new Hapi.Server();
var check = require('./addCheck.js');
var Joi = require('joi');
var fs = require('fs');

server.connection({ port: 3000 });

exports.register = function (server, options, next) {

    files.relativeTo(__dirname)
    console.log(server.realm.modifiers.route.prefix);
    return next();
};

/*
Actions: present, validate, click, fill
*/

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
    path: '/app/{param*}',
    handler: {
        directory: {
            path: './app'
        }
    }
});

server.route({
    method: 'POST',
    path: '/api/1.0/check/add',
    handler: function (request, reply) {
        check.add(request.payload);
        reply(request.payload);
    },
    config: {
        validate: {
            payload: {
                check: Joi.string().required(),
                url: Joi.string().required(),
                transaction: Joi.array().includes(Joi.object().keys({
                    action: Joi.string().valid(["present","validate","click", "fill"]).required(),
                    selector: Joi.string().required(),
                    text: Joi.string()
                })).required(),
            }
        }
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
    path: '/list',
    handler: function (request, reply) {
        var tests = fs.readdir('./siteTests', function(err, files){
            var checks = []
            for(f in files){
                check = files[f].substring(0, files[f].indexOf('.'));
                checks.push({ 'checkname': check});
            }
            reply(JSON.stringify(checks));
        });
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
            if(code == 0){
                rdata = '<pingdom_http_custom_check><status>ok</status><response_time>' + elapsed + '</response_time></pingdom_http_custom_check>';
            }
            else{
                rdata = '<pingdom_http_custom_check><status>down</status><response_time>' + elapsed + '</response_time></pingdom_http_custom_check>';
            }
            reply(rdata).type('text/xml');
        });
    }
});

server.route({
    method: 'GET',
    path: '/harness/{name}',
    handler: function (request, reply) {
        console.log(request.params.name);
        var spawn = require('child_process').spawn,
        output = []
        casper = spawn('casperjs', ['test', './siteTests/' + request.params.name + '.js', '--xunit=./results/' + request.params.name + '.log']);
        casper.stdout.on('data', function (data) {
            console.log('' + data);
            output.push('' + data);
        });
        
        casper.on('exit', function(code){
            fs.readFile('./results/' + request.params.name + '.log', function(err, data){
                reply(data).type('text/xml'); 
            });
        });
    }
});

server.route({
    method: 'GET',
    path: '/harness',
    handler: function (request, reply) {
        reply.file('views/harness.html');
    }
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
