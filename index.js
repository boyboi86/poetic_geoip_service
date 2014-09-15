var express = require('express');
var mongodb = require('mongodb');

var app = express();

//ENABLE CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

//LOCATE CODE HERE
//.....

var server = app.listen(4000, function() {
  console.log('geoip web service listening on port ' + server.address().port);
});