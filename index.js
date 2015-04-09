(function () {
	"use strict";
	
	var express = require('express'),
			http = require('http'),
			app = express();

	app.use(express.static(__dirname));
	http.createServer(app).listen(3000);


// ================= Server-Side API =================

// ---------- Bands ----------
	/* 
	* Get an array of all bands
	* Takes: {name : “val” , genre : ‘val’} 
	* Returns: band-id (-1 for fail)
	*/
	app.get("/getBands", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/* 
	* Insert a new band into the database and get the insert id
	* Takes: {name : “val” , genre : ‘val’} 
	* Returns: band-id (-1 for fail)
	*/
	app.post("/addBand", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Update an existing band by id.  A variable number of fields can be changed at once.
	* Takes: {band-id : ‘val’, field1 : ‘val’, field2 : ‘val’}  fields not included won’t be changed
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/updateBand", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

// ---------- Artists ----------

	/*
	* Get an array of all artists
	* Takes: nothing
	* Returns: array [ {artist-id : “val”, name : “val”, genre : ‘val’}, {...}, ... ]
	*/
	app.get("/getArtists", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Get a list of artists that make up a band based on band-id
	* Takes: band-id
	* Returns: [ {artist-id : ‘val’, first-name : ‘val’, last-name : ‘val’, …}, {...}, … ]
	*/
	app.get("/getArtistsForBand", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Insert a new artist into the database and get its
	* Takes: {first-name : “val”, last-name : ‘val’, instrument : ‘val’}
	* Returns : id (-1 for fail)
	*/
	app.post("/addArtist", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});
	
	/*
	* Update a given artist based on id.  A variable number of fields can be changed at once.
	* Takes: {artist-id : ‘val’, field1 : ‘val’, field2 : ‘val’, …} fields not included won’t be changed
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateArtist", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Add an artist to a band based on existing ids
	* Takes: {band-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addArtistForBand", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Remove a given artist from a given band based on existing ids
	* Takes: {band-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeArtistForBand", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

// ---------- Albums ----------

	/*
	* Get an array of all albums
	* Takes: nothing
	* Returns: [{band-id : ‘val’, name : ‘val’}, {...}, ...}]
	*/
	app.get("/getAlbums", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Get an array of albums for a given artist id
	* Takes: artist-id
	* Returns: {band-id : ‘val’, name : ‘val’}
	*/
	app.get("/getAlbumsForArtist", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Insert a new album based on a given band
	* Takes: {band-id : ‘val’, name : ‘val’}
	* Returns album-id (-1 for fail)
	*/
	app.post("/addAlbum", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Update a given album based on id.  A variable number of fields can be changed at once. 
	* Takes: {album-id : ‘val’, field1 : ‘val’, field2 : ‘val’, …} fields not included won’t be changed
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateAlbum", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Remove an existing album based on id
	* Takes: album-id
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeAlbum", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

// ---------- Songs ----------

	/*
	* Get an array of all songs
	* Takes: nothing
	* Returns: [{song-id : ‘val’, name : ‘val’}, {...}, … ]
	*/
	app.get("/getSongs", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Get an array of songs based on an existing album
	* Takes: album-id
	* Returns:[{song-id : ‘val’, name : ‘val’}, {...}, … ]
	*/
	app.get("/getSongsForAlbum", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Add a new song for a given album id
	* Takes: {album-id : ‘val’, name : ‘val’}
	* Returns: song-id
	*/
	app.post("/addSong", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Update a given song based on id.  A variable number of fields can be changed at once. 
	* Takes: {song-id : ‘val’, field1 : ‘val’, field2 : ‘val’, …} fields not included won’t be changed
	* Returns : ‘success’ or ‘failed’
	*/
	app.post("/updateSong", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Remove a song for an existing id 
	* Takes: song-id
	* Returns: 'success' or 'failed'
	*/
	app.post("/removeSong", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

// ---------- Contributers ----------

	/*
	* Get an array of artists contributing to a song based on existing song id
	* Takes: song-id
	* Returns: [ {artist-id : ‘val’, first-name : ‘val’, last-name : ‘val’, …}, {...}, … ]
	*/
	app.get("/getContributersForSong", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Add a contributer based on a given song and artist id
	* Takes: {song-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/addContributerForSong", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	/*
	* Remove a contributer based on an existing song and artist id
	* Takes: {song-id : ‘val’, artist-id : ‘val’}
	* Returns: ‘success’ or ‘failed’
	*/
	app.post("/removeContributerForSong", function(req, res) {
		if (err) {
			console.log(err);
		} else {
			res.json();
		}
	});

	console.log("Server listening on port 3000."); 

}());