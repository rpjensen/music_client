(function () {
	"use strict";
	
	var express = require('express'),
			http = require('http'),
			app = express();

	app.use(express.static(__dirname));
	http.createServer(app).listen(3000);
	
	app.get("/getMusician", function(req, res) {
		Musician.find(req.query, function(err, musician) {
			if (err) {
				console.log(err);
			} else {
				res.json(musician);
			}
		});
	});
	
	app.post("/putMusician", function(req, res) {
		var newMusician = new Musician(req.body);
		newMusician.save(function(error, data) {
			if (error) console.log(error);
		});
	});
	
	app.post("/removeMusician", function(req, res) {
		var oldMusician = new Musician(req.body);
		oldMusician.remove(function(error, data) {
			if (error) console.log(error);
		});
	});

	console.log("Server listening on port 3000."); 

}());