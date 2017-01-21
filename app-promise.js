const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(geoCodeUrl).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find address');
	}
	console.log(response.data);
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/2af24699275f34e8a9b7f95cf5b6de4c/${lat},${lng}`
	return axios.get(weatherUrl);
}).then((response) => {
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;
	console.log(`Temperature: ${temp}.`)
	console.log(`Feels like: ${apparentTemp}.`)
}).catch((e) => {
	if(e.code === 'ENOTFOUND') {
		console.log('unable to connect');
	}
	else {
		console.log(e.message);
	}
});