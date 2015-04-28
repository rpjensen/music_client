(function() {
    "use strict";
    // JQuery Stuff
    var main = function() {
        $('.toggle-controller').hide();
        $('.band').show();
        $('#band').addClass('selected-tab');
        $('.form-toggle-button').on('click', function(event) {
            $('.form-toggle-button').removeClass('selected-tab');
            $(this).addClass('selected-tab');
            $('.toggle-controller').hide();
            $('.' + this.id).show();
        });
    };

    $(document).ready(main);


    //'music' is the name of the module to create or retrieve
    //[] if specified then new module is being created. If unspecified then the module is being retrieved for further configuration. (optional)
    //returns new module with the angular.Module api
    var app = angular.module('music', []);
    
    //https://docs.angularjs.org/guide/scope
    //https://docs.angularjs.org/guide/controller

    // Band controller
    app.controller('BandController', ['$scope', function($scope) {
        
        // Holds the temporary add artist input values
        $scope.name = '';
        $scope.genre = '';
        $scope.viewHideBands = true;
        $scope.toggleText = "Hide Bands";
        
        $scope.bands = [];// holds a list of existing bands that are backed up to the server
        //how does this work? Makes a web call, triggers a function that queries the DB for all the songs and returns the formatted result
        $scope.getBands = function(){
            console.log("Get bands called");
            $.getJSON('/getBands', function(result) {
                // This 'should' reset the client list you have with what the database returned
                console.log("Get Bands");
                $scope.bands = [];
                for (var i = 0; i < result.length; i++) {
                    var band = $scope.convertFromServer(result[i]);
                    console.log(band);
                    $scope.bands.push(band);
                }
                $scope.$apply();
                //$scope.artists = result;
            });
        };

        $scope.addBand = function() {
            // The field names need to match the serverside api
            var newBand = {
                "name" : $scope.name,
                "genre" : $scope.genre
            };
            console.log("New Band");
            console.log(newBand); // for testing
            $.post('/addBand', newBand, function(result) {
               // result is the new artist's id or -1 if it failed to insert
               if (result.id != -1) {
                   newBand.id = result.id;// add the id to the object before putting it in the array
                   $scope.bands.push($scope.convertFromServer(newBand)); 
                   // This adds it to the local list (basically the client copy)
                   // clear input form now that we know they were added successfully
                   // this is a repeat from above. why is that a thing?
                   // if you got values from these variables this should clear the form
                   $scope.name = '';
                   $scope.genre = '';
                   $scope.$apply();
               }
               else {
                   // some sort of 'error saving artist' message or whatever
                   // Don't clear the field so they can attempt to add the data again when the connection is better or something
               }
           });
        };
        
        //deletes an artist from the db?
        $scope.remove = function(band) {
            console.log(band);
            // remove band needs the id of the band you would like to remove
            $.post('removeBand', {"id" : band.id}, function(result) {
                console.log(result);
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that change
                    $scope.bands.splice($scope.bands.indexOf(band), 1);
                    $scope.$apply();
                }
                else {
                    // some sort of 'error removing album' message or whatever
                    // don't remove it so they can try again later
                }
            });
            
        };  

         $scope.toggleBands = function() {
            $scope.viewHideBands = ! $scope.viewHideBands;
            $scope.toggleText = $scope.viewHideBands ? "Hide Bands" : "View Bands";
        };

        $scope.convertFromServer = function(band) {
            var band = {
                id : band.id,
                name : band.name,
                genre : band.genre
            };
            return band;
        };

        $scope.getBands();    
        console.log($scope.bands);                             
    }]);

    //artist controller
    app.controller('ArtistController', ['$scope', function($scope) {
        
        // Holds the temporary add artist input values
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.genre = '';
        $scope.instrument = '';
        $scope.viewHideArtists = true;
        $scope.toggleText = "Hide Artists";
        
        $scope.artists = [];// holds a list of existing artists that are backed up to the server
        //how does this work? Makes a web call, triggers a function that queries the DB for all the songs and returns the formatted result
		$scope.getArtists = function(){
            console.log("Get artists called");
            $.getJSON('/getArtists', function(result) {
                // This 'should' reset the client list you have with what the database returned
                console.log("Get artist");
                $scope.artists = [];
                for (var i = 0; i < result.length; i++) {
                    var art = $scope.convertFromServer(result[i]);
                    console.log(art);
                    $scope.artists.push(art);
                }
                $scope.$apply();
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
                   $scope.artists.push($scope.convertFromServer(newArtist)); 
                   // This adds it to the local list (basically the client copy)
                   // clear input form now that we know they were added successfully
                   // this is a repeat from above. why is that a thing?
                   // if you got values from these variables this should clear the form
                   $scope.firstName = '';
                   $scope.lastName = '';
                   $scope.genre = '';
                   $scope.instrument = '';
                   $scope.$apply();
               }
               else {
                   // some sort of 'error saving artist' message or whatever
                   // Don't clear the field so they can attempt to add the data again when the connection is better or something
               }
           });
		};
		
        //deletes an artist from the db?
		$scope.remove = function(artist) {
            console.log(artist);
            // remove artist needs the id of the artist you would like to remove
			$.post('removeArtist', {"id" : artist.id}, function(result) {
                console.log(result);
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that change
                    $scope.artists.splice($scope.artists.indexOf(artist), 1);
                    $scope.$apply();
                }
                else {
                    // some sort of 'error removing album' message or whatever
                    // don't remove it so they can try again later
                }
            });
            
		};	

        $scope.toggleArtists = function() {
            $scope.viewHideArtists = ! $scope.viewHideArtists;
            $scope.toggleText = $scope.viewHideArtists ? "Hide Artists" : "View Artists";
        };

        $scope.convertFromServer = function(artist) {
            var art = {
                id : artist.id,
                firstName : artist.first_name,
                lastName : artist.last_name,
                instrument : artist.instrument,
                genre : artist.genre
            };
            return art;
        };

        $scope.getArtists();	
        console.log($scope.artists);							 
	}]);
    
    //album controller
    app.controller('AlbumController', ['$scope', function($scope) {
        // Holds the temporary add album input values
        $scope.bandId = -1;// this should come from whatever band we are trying to add the album to
        $scope.name = '';
        $scope.releaseDate = ''; // not messing with release_date yet

        $scope.viewHideAlbum = true;
        $scope.toggleText = "Hide Albums";

        $scope.albums = [];
        
        $scope.getAlbum = function(){
            console.log("Get albums called");
            $.getJSON('/getAlbums', function(result){
                console.log("getAlbum()");
                // Kate: The result is an array of ALL existing albums [{albumId : 'val', bandId : ‘val’, name : ‘val’}, {...}, ...}]
                // Use /getAlbumForBand if you want the albums for a particular band
               /*
                * Get an array of all albums
                * Takes: nothing
                * Returns: [{id : 'val', band_id : ‘val’, name : ‘val’}, {...}, ...}]
                */
                $scope.albums = [];
                for(var i = 0; i < result.length; i++){
                    console.log(result[i]);
                    $scope.albums.push($scope.convertFromServer(result[i]));
                }
                $scope.$apply();
                //$scope.albums = result;
            });
        };
        
        $scope.addAlbum = function() {
            var newAlbum = {
                "band_id" : $scope.bandId,
                "name" : $scope.name,
                "release_date" : $scope.releaseDate
            };
            console.log(newAlbum);
            // "release_date" : $scope.release_date
            $.post('/addAlbum', newAlbum, function(result) {
                if (result.id != -1) {
                    newAlbum.id = result.id;
                    $scope.getAlbum();//albums.push($scope.convertFromServer(newAlbum)); //does this add to the db?
                    // This adds it to the local list (basically the client copy)
                    //clear input form now that we know they were added successfully
                    //this is a repeat from above. why is that a thing?
                    // if you got values from these variables this should clear the form
                    $scope.bandId = '';
                    $scope.name = '';
                    $scope.releaseDate = '';
                    $scope.$apply();
                }
                else {
                    // some sort of 'error saving album' message or whatever
                    // Don't clear the field so they can attempt to add the data again when the connection is better or something
                }
            });
        };
        
        $scope.remove = function(album) {
            // api takes the album id that we have been holding onto for each album and removes using that id
            $.post('/removeAlbum', {"id" : album.id}, function(result) {
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that
                    $scope.albums.splice($scope.albums.indexOf(album), 1);
                    $scope.$apply();
                }
                else {
                    // some sort of 'error removing album' message or whatever
                }
            });
        };
        
        $scope.convertFromServer = function(newAlbum) {
            var releaseString = '';
            if(newAlbum.release_date){
                releaseString = newAlbum.release_date.substring(0, 16);
            }
            var album = {
                id : newAlbum.id,
                bandId : newAlbum.band_id,
                name : newAlbum.name,
                releaseDate : releaseString
            };
            return album;
        };
        
         $scope.toggleAlbum = function() {
            $scope.viewHideAlbum = ! $scope.viewHideAlbum;
            $scope.toggleText = $scope.viewHideAlbum ? "Hide Albums" : "View Albums";
        };
        $scope.getAlbum();
    }]);
    
    app.controller('SongController', ['$scope', function($scope){
        $scope.name = '';
        $scope.albumId = '';
        $scope.songs = [];
		
		$scope.viewHideSongs = true;
        $scope.toggleText = "Hide Songs";
        
        $.getJSON('/getSongs', function(result) {
            $scope.songs = [];
            for (var i = 0; i < result.length; i++) {
                var song = $scope.convertFromServer(result[i]);
                console.log(song);
                $scope.songs.push(song);
            }
            $scope.$apply();
        });
        
        $scope.addSong = function() {
            var newSong = {
                "name" : $scope.name,
                "album_id" : $scope.albumId
            };
            console.log("Add song");
            console.log(newSong);

            $.post('/addSong', newSong, function(result) {
                // result has the id of the newly inserted song or -1 if it failed to insert
                console.log(result);
                if (result.id != -1) {
                    newSong.id = result.id;
                    $scope.songs.push($scope.convertFromServer(newSong)); //does this add to the db?
                    // This adds it to the local list (basically the client copy)
                    //clear input form now that we know they were added successfully
                    $scope.name = '';
                    $scope.albumId = '';
                    $scope.$apply();
                }
                else {
                    // some sort of 'error saving song' message or whatever
                    // Don't clear the field so they can attempt to add the data again when the connection is better or something
                }
            });
        };
        
        $scope.remove = function(song) {
            // api takes the song id and removes based on that value
            $.post('/removeSong', {"id" : song.id}, function(result) {
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that
                    $scope.songs.splice($scope.songs.indexOf(song), 1);
                    $scope.$apply();
                }
                else {
                    // some sort of 'error removing song' message or whatever
                }
            });
        };
		
		$scope.toggleSongs = function() {
            $scope.viewHideSongs = ! $scope.viewHideSongs;
            $scope.toggleText = $scope.viewHideSongs ? "Hide Songs" : "View Songs";
        };

        $scope.convertFromServer = function(newSong) {
            var song = {};
            song.id = newSong.id;
            song.albumId = newSong.album_id;
            song.name = newSong.name;
            return song;
        };
    }]);
}());
