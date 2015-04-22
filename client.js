(function() {
    //'music' is the name of the module to create or retrieve
    //[] if specified then new module is being created. If unspecified then the module is being retrieved for further configuration. (optional)
    //returns new module with the angular.Module api
    var app = angular.module('music', []);
    
    //https://docs.angularjs.org/guide/scope
    //https://docs.angularjs.org/guide/controller

    //artist controller
    app.controller('ArtistController', ['$scope', function($scope) {
		// Holds the temporary add artist input values
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.genre = '';
        $scope.instrument = '';
        
        $scope.artists = [];// holds a list of existing artists that are backed up to the server
        //how does this work? Makes a web call, triggers a function that queries the DB for all the songs and returns the formatted result
		$scope.getArtists = function(){
            console.log("Get artists called");
            $.getJSON('/getArtists', function(result) {
                // This 'should' reset the client list you have with what the database returned
                console.log("Get artist");
                console.log(result);
                $scope.artists = [];
                for (var i = 0; i < result.length; i++) {
                    var art = {
                        id : result[i].id,
                        firstName : result[i].first_name,
                        lastName : result[i].last_name,
                        instrument : result[i].instrument,
                        genre : result[i].genre
                    };
                    console.log(art);
                    $scope.artists.push(art);
                }
                //$scope.artists = result;
            });
        };

		$scope.addArtist = function() {
            // The field names need to match the serverside api
			var newArtist = {
				"first_name" : $scope.firstName,
                "last_name" : $scope.lastName,
				"genre" : $scope.genre,
				"instrument" : $scope.instrument
			};
            console.log("New artist");
            console.log(newArtist); // for testing
			$.post('/addArtist', newArtist, function(result) {
               // result is the new artist's id or -1 if it failed to insert
               if (result.id != -1) {
                   newArtist.id = result.id;// add the id to the object before putting it in the array
                   $scope.artists.push(newArtist); 
                   // This adds it to the local list (basically the client copy)
                   // clear input form now that we know they were added successfully
                   // this is a repeat from above. why is that a thing?
                   // if you got values from these variables this should clear the form
                   $scope.firstName = '';
                   $scope.lastName = '';
                   $scope.genre = '';
                   $scope.instrument = '';
               }
               else {
                   // some sort of 'error saving artist' message or whatever
                   // Don't clear the field so they can attempt to add the data again when the connection is better or something
               }
           });
		};
		
        //deletes an artist from the db?
		$scope.remove = function(artist) {
            // remove artist needs the id of the artist you would like to remove
			$.post('removeArtist', {"id" : artist.id}, function(result) {
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that change
                    $scope.artists.splice($scope.artists.indexOf(artist), 1);
                }
                else {
                    // some sort of 'error removing album' message or whatever
                    // don't remove it so they can try again later
                }
            });
		};	

        $scope.getArtists();	
        console.log($scope.artists);							 
	}]);
    
    //album controller
    app.controller('AlbumController', ['$scope', function($scope) {
        // Holds the temporary add album input values
        $scope.bandId = -1;// this should come from whatever band we are trying to add the album to
        $scope.album = '';
       // $scope.release_date = ''; // not messing with release_date yet

        $scope.albums = [];
        
        $.getJSON('getAlbums', function(result){
            // Kate: The result is an array of ALL existing albums [{albumId : 'val', bandId : ‘val’, name : ‘val’}, {...}, ...}]
            // Use /getAlbumForBand if you want the albums for a particular band
           /*
            * Get an array of all albums
            * Takes: nothing
            * Returns: [{id : 'val', band_id : ‘val’, name : ‘val’}, {...}, ...}]
            */
            $scope.albums = result;
        });
        
        $scope.add = function() {
            // Kate: needs band id and the api field for album name is just 'name' (right now I haven't done anything with release date since its harder to display nicely)
            // We can get bandId by making the person add albums in the context of a band (like an add button off a band row)
            // Might even be something like $scope.band.id if we have a reference to a band object instead of just its id
            var newAlbum = {
                "id" : $scope.bandId,
                "name" : $scope.album,
            };
            // "release_date" : $scope.release_date
            $.post('addAlbum', newAlbum, function(result) {
                if (result != -1) {
                    newAlbum.id = result;
                    $scope.albums.push(newAlbum); //does this add to the db?
                    // This adds it to the local list (basically the client copy)
                    //clear input form now that we know they were added successfully
                    //this is a repeat from above. why is that a thing?
                    // if you got values from these variables this should clear the form
                    $scope.bandId = '';
                    $scope.album = '';
                    //$scope.release_date = '';
                }
                else {
                    // some sort of 'error saving album' message or whatever
                    // Don't clear the field so they can attempt to add the data again when the connection is better or something
                }
            });
        };
        
        $scope.remove = function(album) {
            // api takes the album id that we have been holding onto for each album and removes using that id
            $.post('removeAlbum', {"id" : album.id}, function(result) {
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that
                    $scope.album.splice($scope.albums.indexOf(albums), 1);
                }
                else {
                    // some sort of 'error removing album' message or whatever
                }
            });
        };
    }]);
    
    app.controller('SongController', ['$scope', function($scope){
        $scope.name = '';
        $scope.songs = [];
        
        $getJSON('getSongs', function(result) {
            $scope.songs = result;
        });
        
        $scope.add = function() {
            var newSong = {
                "name" : $scope.name,
                "album_id" : $scope.albumId
            };

            $.post('addSong', newSong, function(result) {
                // result has the id of the newly inserted song or -1 if it failed to insert
                if (result != -1) {
                    newSong.id = result;
                    $scope.songs.push(newSong); //does this add to the db?
                    // This adds it to the local list (basically the client copy)
                    //clear input form now that we know they were added successfully
                    //this is a repeat from above. why is that a thing?
                    // if you got values from these variables this should clear the form
                    $scope.name = '';
                }
                else {
                    // some sort of 'error saving song' message or whatever
                    // Don't clear the field so they can attempt to add the data again when the connection is better or something
                }
            });
        };
        
        $scope.remove = function(song) {
            // api takes the song id and removes based on that value
            $.post('removeSong', {"id" : song.id}, function(result) {
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that
                    $scope.songs.splice($scope.songs.indexOf(song), 1);
                }
                else {
                    // some sort of 'error removing song' message or whatever
                }
            });
        };
    }]);
}());
