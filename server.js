// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Spin up the server
const server = app.listen(port, () => console.log(`running on localhost: ${port}`));

// Respond with JS object when a GET request is made to the homepage
app.get('/all', (request, response) => {
	response.send(projectData);
});

// POST method route
const data = [];
app.post('/add', addInfo);
function addInfo(req, res) {
	projectData['date'] = req.body.date;
	projectData['temp'] = req.body.temp;
	projectData['content'] = req.body.content;
	res.send(projectData);
}

const request = require('request');
let data = request.body;
projectData['intelligence'] = data.intelligence;

let city = 'Las Vegas';
let url = ``;

app.get('/', function(req, res) {
	request(url, function(error, response, body) {
		weather_json = JSON.parse(body);
		console.log(weather_json);

		const weather = {
			city: city,
			temperature: Math.round(weather_json.main.temp),
			description: weather_json.weather[0].description,
			icon: weather_json.weather[0].icon
		};

		const weather_data = { weather: weather };
		res.render('weather', weather_data);
	});
	res.render('weather');
});
