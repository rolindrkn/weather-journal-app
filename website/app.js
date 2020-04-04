/* Global Variables */

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
// Base URL and API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=81b3ea905300ac5f206548c2afc95a49';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//chained promises to get and post data
document.getElementById('generate').addEventListener('click', performAction);

//select the actual value of an HTML input to include in POST
function performAction(e) {
	e.preventDefault();
	const newZip = document.getElementById('zip').value;
	const content = document.getElementById('feelings').value;
	//api call
	retrieveData(baseURL, newZip, apiKey)
		// New Syntax!
		.then(function(data) {
			// Add data
			postData('/add', { date: newDate, temp: userData.main.temp, content });
		})
		//we can do this because of Async
		.then(updateUI());
}
// Async GET
const retrieveData = async (url, newZip, apiKey) => {
	const request = await fetch(url + newZip + apiKey);
	try {
		// Transform into JSON
		const allData = await request.json();
		return allData;
	} catch (error) {
		console.log('error', error);
		// appropriately handle the error
	}
};

// Async POST
const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			date: data.date,
			temp: data.temp,
			content: data.content
		}) // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

const updateUI = async () => {
	const request = await fetch('/all');
	try {
		const allData = await request.json();
		document.getElementById('date').innerHTML = allData[0].date;
		document.getElementById('temp').innerHTML = allData[0].temp;
		document.getElementById('content').innerHTML = allData[0].content;
	} catch (error) {
		console.log('error', error);
	}
};
