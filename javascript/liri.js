const inquirer = require('inquirer');
const run = require('./commands.js');
const keys = require('./keys.js');

const twitter = keys.twitter;
const spotify = keys.spotify;
const omdb = keys.omdb;

const showTweets = run.tweets;
const showSong = run.song;
const showMovie = run.movie;

var randomizer;

	function prompt() {
		inquirer.prompt({
				type: "list",
				message: "What do you want to do?",
				name: "choices",
				choices: ["song", "movie", "tweets", "random", "exit"]
		}).then(function(res) {
				switch (res.choices) 
							{
							    case "song":
							    		songSearch();
							        break;
							    case "movie":
							    		movieSearch();
							        break;
							    case "tweets":
							    		new showTweets(twitter);
							    		setTimeout(prompt, 3000);
							        break;
							    case "random":
							    		computerChoice();
							        break;   
							    case "exit":
							    		console.log("Thank you! Come again!")
							        break;        
							    default:
							        break;
							}
		});
	}

	function movieSearch() {
		if (randomizer) {
			new showMovie(omdb, 'back to the future');	
		} else {
			inquirer.prompt({
				type: "input",
				message: "What Movie?",
				name: "movie",
			}).then(function(res) {
					new showMovie(omdb, res.movie);
				
			});
		}
		randomizer = false;
		setTimeout(prompt, 3000);
	}
	
	function songSearch() {
		if (randomizer) {
			new showSong(spotify, 'brain damage');
		} else {
			inquirer.prompt({
				type: "input",
				message: "What Song?",
				name: "song",
			}).then(function(res) {
					new showSong(spotify, res.song);
			});
		}	
		randomizer = false;
		setTimeout(prompt, 3000);
	}

	function random() {
	  var functionNumber  = ['songSearch', 'movieSearch'];
	  var x = functionNumber[Math.floor(Math.random() * functionNumber.length)];
	  return x;
	};

	function computerChoice() {
		randomizer = true;
	  var x = random();
	  eval(`${[x]}()`);
	};

	prompt();



