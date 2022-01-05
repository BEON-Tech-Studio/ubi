var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cors = require('cors');

http.createServer(function(req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    if(req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    res.writeHead(200, headers);

    if(req.url === '/') {
        fs.readFile('./index.html', function(err, data) {
            if(err) {
                throw err;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data); 
            res.end();
            return;
        });
    } else if(req.url === '/script.js') {
        fs.readFile('./script.js', function(err, data) {
            if (err) { throw err; }
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
            return;
        });
    }
}).listen(3000);