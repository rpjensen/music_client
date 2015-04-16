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
	* Takes: nothing
	* Returns: [ {bandId : “val”, name : “val”, genre : ‘val’}, {...}, ... ]
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
	* Returns: {bandId : 'val'} (-1 for fail)
	*/
	app.post("/addBand", function(req, res) {
		var query = "INSERT INTO band SET name = ?, genre = ?";
		executeQuery(query, [req.body.name, req.body.genre], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({bandId : result.insertId});
				res.json({bandId : result.insertId});
			}
		});
	});

	/*
	* Update an existing band by id. 
	* Takes: {bandId : ‘val’, name : “val” , genre : ‘val’} 
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
	* Returns: array [ {artistId : ‘val’, first-name : ‘val’, last-name : ‘val’, instrument : ‘val’, genre : ‘val’}, {...}, … ]
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
	* Takes: {bandId : 'val'}
	* Returns: [ {artistId : ‘val’, first-name : ‘val’, last-name : ‘val’, instrument : ‘val’, genre : ‘val’}, {...}, … ]
	*/
	app.get("/getArtistsForBand", function(req, res) {
		var query = "SELECT a.id, a.first_name, a.last_name, a.instrument, a.genre FROM artist a INNER JOIN artist_for_band b ON a.id = b.artist_id WHERE b.band_id = ?";
		executeQuery(query, [req.query.bandId], function(err, result) {
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
	* Takes: {first-name : ‘val’, last-name : ‘val’, instrument : ‘val’, genre : ‘val’}
	* Returns : id (-1 for fail)
	*/
	app.post("/addArtist", function(req, res) {
		var query = "INSERT INTO artist SET first_name = ?, last_name = ?, instrument = ?, genre = ?";
		var body = req.body.
		executeQuery(query, [body['first-name'], body['last-name'], body['instrument'], body['genre']], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({artistId : result.insertId});
				res.json({artistId : result.insertId});
			}
		});
	});
	
	/*
	* Update a given artist based on id. 
	* Takes: {artistId : ‘val’, first-name : ‘val’, last-name : ‘val’, instrument : ‘val’, genre : ‘val’}
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateArtist", function(req, res) {
		var query = "UPDATE artist SET first_name = ?, last_name = ?, instrument = ?, genre = ? WHERE id = ?";
		var body = req.body;
		executeQuery(query, [body['first-name'], body['last-name'], body['instrument'], body['genre'], body['artistId']], function(err, result) {
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
	* Takes: {bandId : ‘val’, artistId : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addArtistForBand", function(req, res) {
		var query = "INSERT INTO artist_for_band SET band_id = ?, artist_id = ?";
		executeQuery(query, [req.body.bandId, req.body.artistId], function(err, result) {
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
	* Takes: {bandId : ‘val’, artistId : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeArtistForBand", function(req, res) {
		var query = "DELETE FROM artist_for_band WHERE band_id = ? AND artist_id = ?";
		var body = req.body;
		executeQuery(query, [body.bandId, body.artistId], function(err, result) {
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
	* Returns: [{albumId : 'val', bandId : ‘val’, name : ‘val’}, {...}, ...}]
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
	* Takes: {bandId : 'val'}
	* Returns: {albumId : 'val', bandId : ‘val’, name : ‘val’}
	*/
	app.get("/getAlbumsForBand", function(req, res) {
		var query = "SELECT id, band_id, name FROM album WHERE band_id = ?";
		executeQuery(query, [req.query.bandId], function(err, result) {
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
	* Takes: {bandId : ‘val’, name : ‘val’}
	* Returns {albumId : 'val'} (-1 for fail)
	*/
	app.post("/addAlbum", function(req, res) {
		var query = "INSERT INTO album SET band_id = ?, name = ?";
		executeQuery(query, [req.body.bandId, req.body.name], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({albumId : result.insertId});
				res.json({albumId : result.insertId});
			}
		});
	});

	/*
	* Update a given album based on id.
	* Takes: {albumId : ‘val’, bandId : ‘val’, name : ‘val’}
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateAlbum", function(req, res) {
		var query = "UPDATE album SET name = ?, genre = ? WHERE id = ?";
		executeQuery(query, [req.body.name, req.body.genre, req.body.albumId], function(err, result) {
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
	* Takes: {albumId : 'val'}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeAlbum", function(req, res) {
		var query = "DELETE FROM album WHRE id = ?";
		executeQuery(query, [req.body.albumId], function(err, result) {
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
	* Returns: [{songId : ‘val’, name : ‘val’, albumId : 'val'}, {...}, … ]
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
	* Takes: {albumId : 'val'}
	* Returns:[{songId : ‘val’, name : ‘val’, albumId : 'val'}, {...}, … ]
	*/
	app.get("/getSongsForAlbum", function(req, res) {
		var query = "SELECT id, album_id, name, FROM song WHERE album_id = ?";
		executeQuery(query, [req.query.albumId], function(err, result) {
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
	* Takes: {albumId : ‘val’, name : ‘val’}
	* Returns: {songId : 'val'}
	*/
	app.post("/addSong", function(req, res) {
		var query = "INSERT INTO song SET name = ?, album_id = ?";
		executeQuery(query, [req.body.name, req.query.albumId], function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log({songId : result.insertId});
				res.json({songId : result.insertId});
			}
		});
	});

	/*
	* Update a given song based on id.
	* Takes: {songId : ‘val’, albumId : ‘val’, name : ‘val’}
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateSong", function(req, res) {
		var query = "UPDATE song SET name = ?, album_id = ? WHERE id = ?";
		executeQuery(query, [req.body.name, req.body.albumId, req.body.songId], function(err, result) {
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
	* Takes: {songId : 'val'}
	* Returns: 'success' or 'failed'
	*/
	app.post("/removeSong", function(req, res) {
		var query = "DELETE FROM song WHERE id = ?";
		executeQuery(query, [req.body.songId], function(err, result) {
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
	* Takes: {songId : 'val'}
	* Returns: [ {artistId : ‘val’, first-name : ‘val’, last-name : ‘val’, …}, {...}, … ]
	*/
	app.get("/getContributersForSong", function(req, res) {
		var query = "SELECT a.id, a.first_name, a.last_name, a.instrument, a.genre FROM artist a INNER JOIN contributer_for_song s ON a.id = s.artist_id WHERE s.song_id = ?";
		executeQuery(query, [req.query.songId], function(err, result) {
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
	* Takes: {songId : ‘val’, artistId : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addContributerForSong", function(req, res) {
		var query = "INSERT INTO contributer_for_song SET song_id = ?, artist_id = ?";
		executeQuery(query, [req.body.songId, req.body.artistId], function(err, result) {
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
	* Takes: {songId : ‘val’, artistId : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeContributerForSong", function(req, res) {
		var query = "DELETE FROM contributer_for_song WHERE song_id = ? AND artist_id = ?";
		executeQuery(query, [req.body.songId, req.body.artistId], function(err, result) {
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