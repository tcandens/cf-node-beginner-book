'use strict';

var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start( response ) {
  console.log("Request handler 'start' was called.");
  var content = "empty";

  var body = '<html>' +
    '<head>' +
    '<meta http-equv= "Content-Type" content="text/html" ' +
    'charset="UTF-8" />' +
    '<body>' +
    '<form action="/upload" method="post" enctype="multipart/form-data">' +
    '<input type="file" name="upload" />' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

};

function upload( response, request ) {
  console.log('Request handler "upload" was called.');
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    // if (error) throw error;
    fs.rename(files.upload.path, "./tmp/test.jpg", function(error) {
      console.log(files.upload.name + ' uploaded.');
      if(error) {
        fs.unlink("./tmp/test.jpg");
        fs.rename(files.upload.path, "./tmp/test.jpg");
      }
    });
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("recieved image:<br/>");
  response.write("<img src='/show' />")
  response.end();
};

function show( response ) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {"Content-Type": "image/jpeg"});
  fs.createReadStream('./tmp/test.jpg').pipe( response );
};

exports.start = start;
exports.upload = upload;
exports.show = show;
