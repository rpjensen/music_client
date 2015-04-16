(function() {
    //'music' is the name of the module to create or retrieve
    //[] if specified then new module is being created. If unspecified then the module is being retrieved for further configuration. (optional)
    //returns new module with the angular.Module api
    var app = angular.module('music', []);
    
    //https://docs.angularjs.org/guide/scope
    //https://docs.angularjs.org/guide/controller

    //artist controller
    app.controller('ArtistController', ['$scope', function($scope) {
		$scope.name = '';
        $scope.genre = '';
        $scope.instrument = '';
        
        //how does this work?
		$.getJSON('getArtist', function(result) {
			$scope.artist = result;
		});

		$scope.add = function() {
			var newArtist = {
				"name" : $scope.name,
				"genre" : $scope.genre,
				"instrument" : $scope.instrument
			};
            //***HELP PLEASE! :) ***
            //needs output to look like this: body['first-name'], body['last-name'], body['instrument'], body['genre']
			$scope.artist.push(newArtist); //does this add to the db?
			$.post('putArtist', newArtist); //or does this add to the db?
            
            //this is a repeat from above. why is that a thing?
            $scope.name = '';
            $scope.genre = '';
            $scope.instrument = '';
		};
		
        //deletes an artist from the db?
		$scope.remove = function(artist) {
			$scope.artist.splice($scope.artist.indexOf(artist), 1);
			$.post('removeArtist', artist);
		};									 
	}]);
    
    //album controller
    app.controller('AlbumController', ['$scope', function($scope) {
        $scope.album = '';
        $scope.release_date = '';
        
        $.getJSON('getAlbum', function(result){
            $scope.album = result;
        });
        
        $scope.add = function() {
            var newAlbum = {
                "album" : $scope.album,
                "release_date" : $scope.release_date
            };
            $scope.album.push(newAlbum);
            $.post('putAlbum', newAlbum);
            
            $scope.album = '';
            $scope.release_date = '';
        };
        
        $scope.remove = function(album) {
            $scope.album.splice($scope.album.indexOf(album), 1);
            $.post('removeAblum', album);
        };
    }]);
    
    app.controller('SongController', ['$scope', function($scope){
        $scope.song_name = '';
        $scope.album = '';
        
        $getJSON('getSong', function(result) {
            $scope.song = result;
        });
        
        $scope.add = function() {
            var newSong = {
            "song name" : $scope.song_name,
            "album" : $scope.album
        };
        $scope.song_name.push(newSong);
        $.post('putSong', newSong);
        
        $scope.song_name = '';
        $scope.album = '';
        };
        
        $scope.remove = function(song_name) {
            $scope.song_name.splice($scope.song_name.indexOf(song_name), 1);
            $.post('removeSong', song_name);
        };
    }]);
    
}());
