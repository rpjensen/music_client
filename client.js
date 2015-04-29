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
    /*
    * Update service shares data between controllers
    */
    app.factory('updateService', function($rootScope) {
        var sharedService = {};
        sharedService.bands = [];
        sharedService.artists = [];
        sharedService.albums = [];

        sharedService.bandsUpdate = function(newBands) {
            this.bands = newBands;
            // broadcase the bandUpdate event to any who care to listen
            $rootScope.$broadcast('bandsUpdate');
        };

        sharedService.albumsUpdate = function(newAlbums) {
            this.albums = newAlbums;
            // broadcase the albumsUpdate event to any who care to listen
            $rootScope.$broadcast('albumsUpdate');
        };

        return sharedService;

    });
    
    // Band controller
    app.controller('BandController', ['$scope', 'updateService', function($scope, updateService) {
        
        // Holds the temporary add artist input values
        $scope.name = '';
        $scope.genre = '';

        $scope.viewHideBands = true;
        $scope.toggleText = "Hide Bands";
        
        $scope.bands = [];// holds a list of existing bands that are backed up to the server

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
                // Update the other controllers
                updateService.bandsUpdate($scope.bands);
                $scope.$apply();
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
                   updateService.bandsUpdate($scope.bands);
                   $scope.$apply();
               }
               else {
                   // some sort of 'error saving artist' message or whatever
                   // Don't clear the field so they can attempt to add the data again when the connection is better or something
               }
           });
        };
        
        //deletes an artist from the db
        $scope.remove = function(band) {
            console.log(band);
            // remove band needs the id of the band you would like to remove
            $.post('removeBand', {"id" : band.id}, function(result) {
                console.log(result);
                if (result === "success") {
                    // it was removed on the server, now make the client reflect that change
                    $scope.bands.splice($scope.bands.indexOf(band), 1);
                    updateService.bandsUpdate($scope.bands);
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

        // Convert from server names to local names
        $scope.convertFromServer = function(band) {
            var band = {
                id : band.id,
                name : band.name,
                genre : band.genre
            };
            return band;
        };

        // Fetch Data on the first pass
        $scope.getBands();    
    }]);

    //artist controller
    app.controller('ArtistController', ['$scope', 'updateService', function($scope, updateService) {
        
        // Holds the temporary add artist input values
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.bandId = '-1';
        $scope.instrument = '';

        $scope.viewHideArtists = true;
        $scope.toggleText = "Hide Artists";

        // controller version of the list of bands (used for input select)
        $scope.bands = [];
        
        $scope.artists = [];// holds a list of existing artists that are backed up to the server

        // get the stored artists
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
            });
        };

		$scope.addArtist = function() {
            // The field names need to match the serverside api
			var newArtist = {
				"first_name" : $scope.firstName,
                "last_name" : $scope.lastName,
				"band_id" : $scope.bandId,
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

        // Convert from server var names to local
        $scope.convertFromServer = function(artist) {
            console.log("Convert new artist");
            console.log(artist);
            // If it doens't have a band name (locally added)
            if (!artist.band_name) {
                for (var i = 0; i < $scope.bands.length; i++) {
                    // Look for a match in the local list of bands
                    if ($scope.bands[i].id == artist.band_id) {
                        console.log("local match");
                        console.log($scope.bands[i]);
                        // Use that band name
                        artist.band_name = $scope.bands[i].name;
                        break;
                    }
                }
            }
            var art = {
                id : artist.id,
                firstName : artist.first_name,
                lastName : artist.last_name,
                instrument : artist.instrument,
                bandId : artist.band_id,
                bandName : artist.band_name
            };
            return art;
        };

        // Check for band updates
        $scope.$on('bandsUpdate', function() {
            console.log("Artist Heard band update");
            //console.log(updateService);
            $scope.bands = updateService.bands;
        });

        // Fetch Data on the first pass
        $scope.getArtists();	
	}]);
    
    //album controller
    app.controller('AlbumController', ['$scope', 'updateService', function($scope, updateService) {
        // Holds the temporary add album input values
        $scope.bandId = -1;// this should come from whatever band we are trying to add the album to
        $scope.name = '';
        $scope.releaseDate = ''; 

        // Holds a local controller copy of the bands
        $scope.bands = [];

        $scope.viewHideAlbum = true;
        $scope.toggleText = "Hide Albums";

        // Holds the list of saved albums synced with the DB
        $scope.albums = [];
        
        $scope.getAlbum = function(){
            console.log("Get albums called");
            $.getJSON('/getAlbums', function(result){
                console.log("getAlbum()");
                // Reset local copy
                $scope.albums = [];
                for(var i = 0; i < result.length; i++){
                    console.log(result[i]);
                    $scope.albums.push($scope.convertFromServer(result[i]));
                }
                // Update the service to our changes
                updateService.albumsUpdate($scope.albums);
                $scope.$apply();
            });
        };
        
        $scope.addAlbum = function() {
            if ($scope.bandId === '-1') {
                return;
            }
            var newAlbum = {
                "band_id" : $scope.bandId,
                "name" : $scope.name,
                "release_date" : $scope.releaseDate
            };
            console.log(newAlbum);
            $.post('/addAlbum', newAlbum, function(result) {
                if (result.id != -1) {
                    newAlbum.id = result.id;
                    $scope.getAlbum(); 
                    // This adds it to the local list (basically the client copy)
                    //clear input form now that we know they were added successfully
                    //this is a repeat from above. why is that a thing?
                    // if you got values from these variables this should clear the form
                    $scope.name = '';
                    $scope.releaseDate = '';
                    // update our changes
                    updateService.albumsUpdate($scope.albums);
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
                    updateService.albumsUpdate($scope.albums);
                    $scope.$apply();
                }
                else {
                    // some sort of 'error removing album' message or whatever
                }
            });
        };
        
        // Switch from server to local variable names
        $scope.convertFromServer = function(newAlbum) {
            var releaseString = '';
            if(newAlbum.release_date){
                releaseString = newAlbum.release_date.substring(0, 16);
            }
            var album = {
                id : newAlbum.id,
                bandId : newAlbum.band_id,
                bandName : newAlbum.band_name,
                name : newAlbum.name,
                releaseDate : releaseString
            };
            return album;
        };
        
         $scope.toggleAlbum = function() {
            $scope.viewHideAlbum = ! $scope.viewHideAlbum;
            $scope.toggleText = $scope.viewHideAlbum ? "Hide Albums" : "View Albums";
        };

        // Look for band changes
        $scope.$on('bandsUpdate', function() {
            console.log("Album Heard band update");
            //console.log(updateService);
            $scope.bands = updateService.bands;
        });

        // get data on the first pass
        $scope.getAlbum();
    }]);
    
    app.controller('SongController', ['$scope', 'updateService', function($scope, updateService){
        // Local form variables
        $scope.name = '';
        $scope.albumId = '-1';
        // Local list of songs backed to the db
        $scope.songs = [];

        // Local controller version of albums
        $scope.albums = [];
		
		$scope.viewHideSongs = true;
        $scope.toggleText = "Hide Songs";
        

        $.getJSON('/getSongs', function(result) {
            $scope.songs = [];
            for (var i = 0; i < result.length; i++) {
                var song = $scope.convertFromServer(result[i]);
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

        // convert from server to local variable names
        $scope.convertFromServer = function(newSong) {
            console.log("Convert new song");
            console.log(newSong);
            if (!newSong.album_name) {
                for (var i = 0; i < $scope.albums.length; i++) {
                    console.log($scope.albums[i].id);
                    if ($scope.albums[i].id == newSong.album_id) {
                        console.log("local match");
                        console.log($scope.albums[i]);
                        newSong.album_name = $scope.albums[i].name;
                        break;
                    }
                }
            }
            var song = {};
            song.id = newSong.id;
            song.albumId = newSong.album_id;
            song.albumName = newSong.album_name;
            song.name = newSong.name;
            return song;
        };

        // get updates from album changes
        $scope.$on('albumsUpdate', function() {
            console.log("Song Heard album update");
          //  console.log(updateService);
            $scope.albums = updateService.albums;
        });
    }]);
}());
