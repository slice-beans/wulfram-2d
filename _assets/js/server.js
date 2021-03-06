window = global;

var app 		= require('express')();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var ServerCore 	= require('./server/ServerCore');
var Config 		= require('./shared/Config');
var Helpers 		= require('./shared/Helpers');
var events = require('events');


global.config = new Config();
global.helpers = new Helpers();
global.isServer = true;
global.isClient = false;
global.pubsub = new events.EventEmitter();

function init() {
	app.get('/', function(req, res){
	  	res.sendFile('index.html', { root: "."});
	});

	app.get( '/*' , function( req, res, next ) {
        //This is the current file they have requested
        var file = req.params[0];
        //Send the requesting client the file.
        res.sendFile( file, { root: "."} );
    });

    var server = new ServerCore(io);
    server.init();

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});
}

init();