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
app.get('/api/projectdata', (request, response) => {
	response.send(projectData);
});

// POST method route
app.post('/api/projectdata', addInfo);
function addInfo(req, res) {
	projectData['date'] = req.body.date;
	projectData['temp'] = req.body.temp;
	projectData['content'] = req.body.content;
	res.send(projectData);
}


