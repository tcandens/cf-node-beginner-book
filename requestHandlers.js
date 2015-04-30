'use strict';

var exec = require('child_process').exec;

function start( response ) {
  console.log("Request handler 'start' was called.");
  var content = "empty";

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });

  return content;

};

function upload( response ) {
  console.log('Request handler "upload" was called.');
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello world");
  response.end();
  return "Hello Upload"
};

exports.start = start;
exports.upload = upload;