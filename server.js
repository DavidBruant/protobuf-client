"use strict";

require('es6-shim');
require('better-log').install();

var path = require('path');
var express = require('express');
var app = express();
var compression = require('compression');
var errlog = console.error.bind(console);
 
var fs = require('fs');

var PORT = 8765;


function rand(n){
    return Math.floor(n*Math.random());
}


app.use(compression());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/browserify-bundle.js', function(req, res){
    res.sendFile(path.join(__dirname, './browserify-bundle.js'));
});


app.get('/msg', function(req, res){
    res.send(new Buffer(5).fill(0x0F));
});


app.listen(PORT, function () {
    console.log('Server running on', [
        'http://localhost:',
        PORT
    ].join(''));
});
