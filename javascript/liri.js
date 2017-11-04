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
				choices: ["song", "movie", "tweets", "roll dice", "random", "exit"]
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
							    		setTimeout(prompt, 1000);
							        break;
							    case "roll dice":
							    		dice()
							        break;   
							    case "random":
							    		computerChoice();
							        break;   
							    case "exit":
							    		console.log(`\n\nThank you! Come again!\n\n`);
							        break;        
							    default:
							        break;
							}
		});
	}

	function movieSearch() {
		if (randomizer) {
			new showMovie(omdb, 'back to the future');	
			setTimeout(prompt, 1000);
		} else {
			inquirer.prompt({
				type: "input",
				message: "What Movie?",
				name: "movie",
			}).then(function(res) {
					new showMovie(omdb, res.movie);
					setTimeout(prompt, 1000);
			});
		}
		randomizer = false;	
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
		setTimeout(prompt, 1000);
	}

	function dice() {
		run.dice()
		setTimeout(prompt, 1000);
	}

	function random() {
	  var functionNumber  = ['songSearch', 'movieSearch', 'dice'];
	  var x = functionNumber[Math.floor(Math.random() * functionNumber.length)];
	  return x;
	};

	function computerChoice() {
		randomizer = true;
	  var x = random();
	  eval(`${[x]}()`);
	};

	prompt();



