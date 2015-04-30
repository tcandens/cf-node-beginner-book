'use strict';

var http = require('http');
var url = require('url');

function start( route, handle ) {
  var onRequest = function( request, response ) {
    var pathname = url.parse( request.url ).pathname;
    console.log("Request for " + pathname + " recieved.");
    route( handle, pathname, response );
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server started');
};

exports.start = start;