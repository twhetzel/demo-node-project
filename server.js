'use strict';

const express = require('express');

const reload = require('reload');
const http = require('http');
var path = require('path')

var bodyParser = require('body-parser')
var logger = require('morgan')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
var publicDir = path.join(__dirname, 'public')

app.get('/', (req, res) => {
  // res.send('Hello world!!!\n');
  res.sendFile(path.join(publicDir, 'index.html'))
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


app.set('port', PORT)
app.use(logger('dev'))
app.use(bodyParser.json())


var server = http.createServer(app)

// Reload code here
reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README
 
  // Reload started, start web server
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'));
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err);
})


