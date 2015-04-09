(function () {
	"use strict";
	
	var express = require('express'),
		http = require('http'),
		app = express();
		mysql = require('mysql'),
		pool = mysql.createPool({
			connectionLimit : 100,
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'music',
			debug : false
		});

	app.use(express.static(__dirname));
	http.createServer(app).listen(3000);

// ================= Database Utilities =================

var executeQuery = function(query, parameters, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
			console.log({"code" : 100, "status" : "Error in connection database"});
		}
		else if (parameters.length > 0) {
			connection.query(query, parameters, function(err, result) {
				connection.release();
				callback(err, result);
			});
		}
		else {
			connection.query(query, function(err, result) {
				connection.release();
				callback(err, result);
			})
		}
			
		connection.on("error", function(err) {
			console.json({"code" : 100, "status" : "Error in connection database"});
			return;
		});
	});
};
	


// ================= Server-Side API =================

// ---------- Bands ----------
	/* 
	* Get an array of all bands
	* Takes: {name : “val” , genre : ‘val’} 
	* Returns: band-id (-1 for fail)
	*/
	app.get("/getBands", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/* 
	* Insert a new band into the database and get the insert id
	* Takes: {name : “val” , genre : ‘val’} 
	* Returns: band-id (-1 for fail)
	*/
	app.post("/addBand", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Update an existing band by id.  A variable number of fields can be changed at once.
	* Takes: {band-id : ‘val’, field1 : ‘val’, field2 : ‘val’}  fields not included won’t be changed
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/updateBand", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

// ---------- Artists ----------

	/*
	* Get an array of all artists
	* Takes: nothing
	* Returns: array [ {artist-id : “val”, name : “val”, genre : ‘val’}, {...}, ... ]
	*/
	app.get("/getArtists", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Get a list of artists that make up a band based on band-id
	* Takes: band-id
	* Returns: [ {artist-id : ‘val’, first-name : ‘val’, last-name : ‘val’, …}, {...}, … ]
	*/
	app.get("/getArtistsForBand", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Insert a new artist into the database and get its
	* Takes: {first-name : “val”, last-name : ‘val’, instrument : ‘val’}
	* Returns : id (-1 for fail)
	*/
	app.post("/addArtist", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});
	
	/*
	* Update a given artist based on id.  A variable number of fields can be changed at once.
	* Takes: {artist-id : ‘val’, field1 : ‘val’, field2 : ‘val’, …} fields not included won’t be changed
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateArtist", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Add an artist to a band based on existing ids
	* Takes: {band-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addArtistForBand", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Remove a given artist from a given band based on existing ids
	* Takes: {band-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeArtistForBand", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

// ---------- Albums ----------

	/*
	* Get an array of all albums
	* Takes: nothing
	* Returns: [{band-id : ‘val’, name : ‘val’}, {...}, ...}]
	*/
	app.get("/getAlbums", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Get an array of albums for a given artist id
	* Takes: artist-id
	* Returns: {band-id : ‘val’, name : ‘val’}
	*/
	app.get("/getAlbumsForArtist", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Insert a new album based on a given band
	* Takes: {band-id : ‘val’, name : ‘val’}
	* Returns album-id (-1 for fail)
	*/
	app.post("/addAlbum", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Update a given album based on id.  A variable number of fields can be changed at once. 
	* Takes: {album-id : ‘val’, field1 : ‘val’, field2 : ‘val’, …} fields not included won’t be changed
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateAlbum", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Remove an existing album based on id
	* Takes: album-id
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeAlbum", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

// ---------- Songs ----------

	/*
	* Get an array of all songs
	* Takes: nothing
	* Returns: [{song-id : ‘val’, name : ‘val’}, {...}, … ]
	*/
	app.get("/getSongs", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Get an array of songs based on an existing album
	* Takes: album-id
	* Returns:[{song-id : ‘val’, name : ‘val’}, {...}, … ]
	*/
	app.get("/getSongsForAlbum", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Add a new song for a given album id
	* Takes: {album-id : ‘val’, name : ‘val’}
	* Returns: song-id
	*/
	app.post("/addSong", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Update a given song based on id.  A variable number of fields can be changed at once. 
	* Takes: {song-id : ‘val’, field1 : ‘val’, field2 : ‘val’, …} fields not included won’t be changed
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateSong", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Remove a song for an existing id 
	* Takes: song-id
	* Returns: 'success' or 'failed'
	*/
	app.post("/removeSong", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

// ---------- Contributers ----------

	/*
	* Get an array of artists contributing to a song based on existing song id
	* Takes: song-id
	* Returns: [ {artist-id : ‘val’, first-name : ‘val’, last-name : ‘val’, …}, {...}, … ]
	*/
	app.get("/getContributersForSong", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Add a contributer based on a given song and artist id
	* Takes: {song-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addContributerForSong", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	/*
	* Remove a contributer based on an existing song and artist id
	* Takes: {song-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeContributerForSong", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, [], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.json(result);
			}
		});
	});

	console.log("Server listening on port 3000."); 

}());