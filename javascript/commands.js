const request = require('request')
const Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var ShowTweets = function(key) {
	var client = new Twitter(key)
	client.get('statuses/user_timeline', function(error, tweets, response) {
	  if(error) console.log(error)
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log(`Tweet #${[i+1]}: ${tweets[i].text}`);
	  	}
	  }
	});
}

var ShowSong = function(key, input) {
	var spotify = new Spotify(key); 
	spotify
	  .search({ type: 'track', query: input })
	  .then(function(response) {
	 		var res = response.tracks.items[0];
	 		var logged = `\nArtist: ${res.album.artists[0].name}
	 									\nTitle: ${res.name}
	 									\nPreview: ${res.album.external_urls.spotify}
	 									\nAlbum: ${res.album.name}
	 									\n
	 									\n`;
	    console.log(logged);
	  })
	  .catch(function(err) {
	    console.log(err);
	  });
}

var ShowMovie = function(key, input) {
	var url = `https://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=${key.consumer_key}`;
	request(url, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	  	var res = JSON.parse(body);
	  	var logged =  `\nTitle: ${res.Title}
							 			  \nYear: ${res.Year}
							 				\nIMDB Rating: ${res.Ratings[0].Value}
							 				\nRT Rating: ${res.Ratings[1].Value}
							 				\nCountry: ${res.Country}
							 				\nLang: ${res.Language}
							 				\nPlot: ${res.Plot}
							 				\nActors: ${res.Actors}
							 				\n
							 				\n`;
	    console.log(logged);
	  };
	});
}

exports.tweets = ShowTweets;
exports.song = ShowSong;
exports.movie = ShowMovie;