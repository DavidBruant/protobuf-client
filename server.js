"use strict";

require('es6-shim');
require('better-log').install();

var path = require('path');
var express = require('express');
var app = express();
var compression = require('compression');
var errlog = console.error.bind(console);
 
var fs = require('fs');

var bodyParser = require('body-parser');
var protobuf = require('protocol-buffers')

// pass a proto file as a buffer/string or pass a parsed protobuf-schema object
var messages = protobuf( fs.readFileSync(path.join(__dirname, 'SimpleMessage.proto')) );

var PORT = 8765;


function rand(n){
    return Math.floor(n*Math.random());
}


app.disable("x-powered-by");

//app.use(bodyParser.raw())


app.use(compression());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/browserify-bundle.js', function(req, res){
    res.sendFile(path.join(__dirname, './browserify-bundle.js'));
});


app.post('/msg', function(req, res){
    var buffers = []
    
    req.on('data', function(data){
        console.log('data', data.length);
        buffers.push(data);
    });
    
    req.on('end', function(){
        var buf = Buffer.concat(buffers);
        var msg = messages.SimpleMessage.decode(buf);
        
        console.log('end', msg);
        res.send();
    })
    
    
    //res.send(new Buffer(5).fill(0x0F));
});


app.listen(PORT, function () {
    console.log('Server running on', [
        'http://localhost:',
        PORT
    ].join(''));
});
