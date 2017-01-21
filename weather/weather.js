const request = require('request');
var getWeather = (lat, lng, callback) => {
	// https://api.darksky.net/forecast/2af24699275f34e8a9b7f95cf5b6de4c/37.8267,-122.4233
	request({
			url: `https://api.darksky.net/forecast/2af24699275f34e8a9b7f95cf5b6de4c/${lat},${lng}`,
			json: true
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				})
			}
			else {
				callback('Unable to connect to forecast.io');
			}
		});
}

module.exports.getWeather = getWeather;
