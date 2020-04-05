// /* Global Variables */
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const button = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// // Base URL and API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '81b3ea905300ac5f206548c2afc95a49'

// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// //chained promises to get and post data
button.addEventListener('click', performAction);

//select the actual value of an HTML input to include in POST
function performAction(e) {
	const newZip = zip.value;
	const feeling = feelings.value;
	//api call
	retrieveData(baseURL, newZip, apiKey)
		.then(function(data) {
			postData('/', { date: newDate, temp : data.temp, content :feeling});
		})
		.then(updateUI());
}
// // Async GET
const retrieveData = async (baseURL, zip, apiKey) => {
	const request = await fetch(`${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`);
	try {
		const allData = await request.json();
		return allData;
	} catch (error) {
		console.log('error', error);
	}
};

// // Async POST
const postData = async (path, data = {}) => {
	const response = await fetch(path, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

const updateUI = async (temperature, newDate, feelings) => {
		date.innerHTML = newDate;
		temp.innerHTML = `${temperature} deg`;
		content.innerHTML = feelings;
	};





