"use strict";

var protobuf = require('protocol-buffers')

// pass a proto file as a buffer/string or pass a parsed protobuf-schema object
var messages = protobuf( document.querySelector('[type="protobuf-description"]').textContent );

var buf = messages.SimpleMessage.encode({
    a: 42,
    b: 'ping'
})

console.log(buf) // should print a buffer

function sendReq(method, url, data){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();

        xhr.open(method, url);
        if(data !== undefined && typeof data !== 'string' && !(data instanceof FormData) && !(data instanceof Uint8Array))
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.responseType = 'json';

        xhr.addEventListener('load', function(){
            if(xhr.status < 400)
                resolve(xhr.response);
            else{
                reject(new Error('HTTP error ' + xhr.status + ' ' + xhr.responseText));
            }

        });

        xhr.addEventListener('error', reject);

        if(data === undefined || 
           typeof data === 'string' || 
           data instanceof FormData ||
           data instanceof Uint8Array
          ){
            xhr.send(data);
        }
        else
            xhr.send(JSON.stringify(data));
    });
}

sendReq('POST', '/msg', buf);



