const fetch = require('node-fetch');
const APP_ID = 98792731;
const APP_KEY = "5674da74eee9936d936bdb41c2b1b7c8";

var express = require('express');
var app = express();

app.get('/', function(request, response) {
		getDepartures(function(trains) {
				response.setHeader('Content-Type', 'application/json');
				response.send(JSON.stringify(trains, null, 2));
		});
});

app.listen(8000, function() {
		console.log("App started - listening on port 8000");
});


function getDepartures(callback) {
		fetch(`https://transportapi.com/v3/uk/train/station/SHF/live.json?app_id=${APP_ID}&app_key=${APP_KEY}&darwin=false&train_status=passenger`, {
				method: "get"
		}).then(function(reponse) {
				return reponse.json();

		}).then(function(json) {
				// Current departures
				let curDepartures = json.departures.all;

				// Create objects from the departures
				makeTrainObjects(curDepartures, callback);

		}).catch(function(err) {
				console.error(err);
		});
}


function makeTrainObjects(departures, callback) {
		console.log("***");
		let trainsList = [];
		let curDate = new Date();
		let curTime = `${curDate.getHours()}:${curDate.getMinutes()}`;

		// Get each departures
		for (var i = 0; i < departures.length; i++) {
				var train = departures[i];

				var curTrain = {
						service: train.service,
						operator: train.operator,
						origin: train.origin_name,
						destination: train.destination_name,
						estimate_mins: train.best_departure_estimate_mins,
						arrival_time: train.expected_arrival_time,
						departure_time: train.expected_departure_time,
						system_time: curTime
				}

				trainsList.push(curTrain);
		}
		console.log(trainsList);
		callback(trainsList);
}