(function () {
	"use strict";
	
	var express = require('express'),
		http = require('http'),
		app = express(),
		mysql = require('mysql'),
		pool = mysql.createPool({
			connectionLimit : 100,
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'music',
			debug : false
		});
	var bodyParser = require('body-parser');
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));

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
	* Takes: nothing
	* Returns: [ {id : “val”, name : “val”, genre : ‘val’}, {...}, ... ]
	*/
	app.get("/getBands", function(req, res) {
		var query = "SELECT id, name, genre FROM band";
		executeQuery(query, function(err, result) {
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
	* Returns: {id : 'val'} (-1 for fail)
	*/
	app.post("/addBand", function(req, res) {
		var query = "INSERT INTO band SET name = ?, genre = ?";
		console.log(req.body);
		executeQuery(query, [req.body.name, req.body.genre], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({"id" : result.insertId});
				res.json({"id" : result.insertId});
			}
		});
	});

	/*
	* Update an existing band by id. 
	* Takes: {id : ‘val’, name : “val” , genre : ‘val’} 
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/updateBand", function(req, res) {
		var query = "UPDATE band SET name = ?, genre = ? WHERE id = ?";
		executeQuery(query, [req.body.name, req.body.genre, req.body.bandId], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

// ---------- Artists ----------

	/*
	* Get an array of all artists
	* Takes: nothing
	* Returns: array [ {id : ‘val’, first_name : ‘val’, last_name : ‘val’, instrument : ‘val’, genre : ‘val’}, {...}, … ]
	*/
	app.get("/getArtists", function(req, res) {
		var query = "SELECT id, first_name, last_name, instrument, genre FROM artist";
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
	* Get a list of artists that make up a band based on bandId
	* Takes: {band_id : 'val'}
	* Returns: [ {id : ‘val’, first_name : ‘val’, last_name : ‘val’, instrument : ‘val’, genre : ‘val’}, {...}, … ]
	*/
	app.get("/getArtistsForBand", function(req, res) {
		var query = "SELECT a.id, a.first_name, a.last_name, a.instrument, a.genre FROM artist a INNER JOIN artist_for_band b ON a.id = b.artist_id WHERE b.band_id = ?";
		executeQuery(query, [req.query.band_id], function(err, result) {
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
	* Takes: {first_name : ‘val’, last_name : ‘val’, instrument : ‘val’, genre : ‘val’}
	* Returns : id (-1 for fail)
	*/
	app.post("/addArtist", function(req, res) {
		var query = "INSERT INTO artist SET first_name = ?, last_name = ?, instrument = ?, genre = ?";
		var body = req.body.
		executeQuery(query, [body['first_name'], body['last_name'], body['instrument'], body['genre']], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({"id" : result.insertId});
				res.json({"id" : result.insertId});
			}
		});
	});
	
	/*
	* Update a given artist based on id. 
	* Takes: {id : ‘val’, first_name : ‘val’, last_name : ‘val’, instrument : ‘val’, genre : ‘val’}
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateArtist", function(req, res) {
		var query = "UPDATE artist SET first_name = ?, last_name = ?, instrument = ?, genre = ? WHERE id = ?";
		var body = req.body;
		executeQuery(query, [body['first_name'], body['last_name'], body['instrument'], body['genre'], body['id']], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

	/*
	* Add an artist to a band based on existing ids
	* Takes: {band_id : ‘val’, artist_id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addArtistForBand", function(req, res) {
		var query = "INSERT INTO artist_for_band SET band_id = ?, artist_id = ?";
		executeQuery(query, [req.body.band_id, req.body.artist_id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({bandId : result.insertId});
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

	/*
	* Remove a given artist from a given band based on existing ids
	* Takes: {band_id : ‘val’, artist_id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeArtistForBand", function(req, res) {
		var query = "DELETE FROM artist_for_band WHERE band_id = ? AND artist_id = ?";
		var body = req.body;
		executeQuery(query, [body.band_id, body.artist_id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

// ---------- Albums ----------

	/*
	* Get an array of all albums
	* Takes: nothing
	* Returns: [{id : 'val', band_id : ‘val’, name : ‘val’}, {...}, ...}]
	*/
	app.get("/getAlbums", function(req, res) {
		var query = "SELECT id, band_id, name FROM album";
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
	* Get an array of albums for a given band id
	* Takes: {id : 'val'}
	* Returns: {id : 'val', band_id : ‘val’, name : ‘val’}
	*/
	app.get("/getAlbumsForBand", function(req, res) {
		var query = "SELECT id, band_id, name FROM album WHERE band_id = ?";
		executeQuery(query, [req.query.id], function(err, result) {
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
	* Takes: {band_id : ‘val’, name : ‘val’}
	* Returns {id : 'val'} (-1 for fail)
	*/
	app.post("/addAlbum", function(req, res) {
		var query = "INSERT INTO album SET band_id = ?, name = ?";
		executeQuery(query, [req.body.band_id, req.body.name], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({"id" : result.insertId});
				res.json({"id" : result.insertId});
			}
		});
	});

	/*
	* Update a given album based on id.
	* Takes: {id : ‘val’, band_id : ‘val’, name : ‘val’}
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateAlbum", function(req, res) {
		var query = "UPDATE album SET name = ?, genre = ? WHERE id = ?";
		executeQuery(query, [req.body.name, req.body.genre, req.body.id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

	/*
	* Remove an existing album based on id
	* Takes: {id : 'val'}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeAlbum", function(req, res) {
		var query = "DELETE FROM album WHRE id = ?";
		executeQuery(query, [req.body.id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

// ---------- Songs ----------

	/*
	* Get an array of all songs
	* Takes: nothing
	* Returns: [{id : ‘val’, name : ‘val’, album_id : 'val'}, {...}, … ]
	*/
	app.get("/getSongs", function(req, res) {
		var query = "SELECT id, album_id, name, FROM song";
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
	* Takes: {album_id : 'val'}
	* Returns:[{id : ‘val’, name : ‘val’, album_id : 'val'}, {...}, … ]
	*/
	app.get("/getSongsForAlbum", function(req, res) {
		var query = "SELECT id, album_id, name, FROM song WHERE album_id = ?";
		executeQuery(query, [req.query.album_id], function(err, result) {
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
	* Takes: {album_id : ‘val’, name : ‘val’}
	* Returns: {songId : 'val'}
	*/
	app.post("/addSong", function(req, res) {
		var query = "INSERT INTO song SET name = ?, album_id = ?";
		executeQuery(query, [req.body.name, req.query.album_id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({"id" : result.insertId});
				res.json({"id" : result.insertId});
			}
		});
	});

	/*
	* Update a given song based on id.
	* Takes: {id : ‘val’, album_id : ‘val’, name : ‘val’}
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateSong", function(req, res) {
		var query = "UPDATE song SET name = ?, album_id = ? WHERE id = ?";
		executeQuery(query, [req.body.name, req.body.album_id, req.body.id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

	/*
	* Remove a song for an existing id 
	* Takes: {id : 'val'}
	* Returns: 'success' or 'failed'
	*/
	app.post("/removeSong", function(req, res) {
		var query = "DELETE FROM song WHERE id = ?";
		executeQuery(query, [req.body.id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

// ---------- Contributers ----------

	/*
	* Get an array of artists contributing to a song based on existing song id
	* Takes: {song_id : 'val'}
	* Returns: [ {artistId : ‘val’, first-name : ‘val’, last-name : ‘val’, …}, {...}, … ]
	*/
	app.get("/getContributersForSong", function(req, res) {
		var query = "SELECT a.id, a.first_name, a.last_name, a.instrument, a.genre FROM artist a INNER JOIN contributer_for_song s ON a.id = s.artist_id WHERE s.song_id = ?";
		executeQuery(query, [req.query.song_id], function(err, result) {
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
	* Takes: {song_id : ‘val’, artist_id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addContributerForSong", function(req, res) {
		var query = "INSERT INTO contributer_for_song SET song_id = ?, artist_id = ?";
		executeQuery(query, [req.body.song_id, req.body.artist_id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

	/*
	* Remove a contributer based on an existing song and artist id
	* Takes: {song_id : ‘val’, artist_id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeContributerForSong", function(req, res) {
		var query = "DELETE FROM contributer_for_song WHERE song_id = ? AND artist_id = ?";
		executeQuery(query, [req.body.song_id, req.body.artist_id], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				if (result.affectedRows) {
					res.json('success');
				}
				else {
					res.json('failed');
				}
			}
		});
	});

	console.log("Server listening on port 3000."); 

}());