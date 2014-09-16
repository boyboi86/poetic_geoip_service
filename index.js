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
app.get('/locate', function(req, res) {
	//getting the ip of the client from the request headers or remoteAddress
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	var net1 = ip.split(".").slice(0,3).join("."); //aaa.bbb.ccc
	var net2 = ip.split(".").slice(0,2).join("."); //aaa.bbb
	var net3 = ip.split(".").slice(0,1).join("."); //aaa
	var reg1 = new RegExp("^"+net1);
	var reg2 = new RegExp("^"+net2);
	var reg3 = new RegExp("^"+net3);

	mongodb.connect("mongodb://127.0.0.1:27017/poetic_geoips",function(err,db){
		if(err) throw err;

		var ips = db.collection("ips");
		ips.findOne({$or: [{ip: reg3},{ip: reg2},{ip: reg1}]},function(err,result){
			if(err) throw err;

			if(result) {
				var location = result.location;
				res.end(JSON.stringify(location));				
			} else {
				res.end(JSON.stringify({message: "no location found"}));
			}

			db.close();
		});

	});

});

var server = app.listen(4000, function() {
  console.log('geoip web service listening on port ' + server.address().port);
});